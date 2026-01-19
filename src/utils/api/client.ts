import porturl from "@utils/route";
import getCookieValue from "@utils/auth/getCookieValue";
import getUserFriendlyError from "./errorMessages";

function buildUrl(path: string) {
    return porturl + path;
}

function defaultHeaders() {
    const token = getCookieValue("token");
    const headers: Record<string, string> = {};
    if (typeof token === "string" && token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

function mergeHeaders(
    base: Record<string, string>,
    extra?: HeadersInit
): Record<string, string> {
    const result = { ...base } as Record<string, string>;
    if (!extra) return result;

    if (extra instanceof Headers) {
        extra.forEach((value, key) => {
            result[key] = value;
        });
    } else if (Array.isArray(extra)) {
        for (const [key, value] of extra) {
            result[key] = value;
        }
    } else {
        Object.assign(result, extra);
    }
    return result;
}

export async function apiFetch<T = any>(
    path: string,
    options: RequestInit & { expectJson?: boolean; returnStatus?: boolean } = {}
): Promise<T | string | number | undefined> {
    const url = buildUrl(path);
    const method = (options.method || "GET").toUpperCase();

    let finalBody: BodyInit | null | undefined = options.body;
    const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
    const needsJsonHeader = options.body && !isFormData && typeof options.body === "object";

    if (needsJsonHeader && typeof finalBody === "object") {
        finalBody = JSON.stringify(options.body);
    }

    const jsonHeader: Record<string, string> = needsJsonHeader ? { "Content-Type": "application/json" } : {};
    const headers = mergeHeaders(defaultHeaders(), { ...jsonHeader, ...options.headers });


    const shouldReturnStatus = method === "DELETE" ? (options.returnStatus ?? true) : options.returnStatus;

    const fetchOptions: RequestInit = {
        ...options,
        method,
        headers,
        body: finalBody,
        credentials: options.credentials ?? "include",
    };
    console.log("Fetching:", url, fetchOptions);
    const response = await fetch(url, fetchOptions);
    
    const contentType = response.headers.get("content-type") || "";
    const canParseJson = contentType.includes("application/json") && options.expectJson !== false;

    if (!response.ok) {
        let technicalMessage = `HTTP error! status: ${response.status}`;
        if (canParseJson) {
            try {
                const errJson = await response.json();
                if (errJson?.message) technicalMessage = errJson.message;
            } catch {}
        } else {
            try {
                const text = await response.text();
                if (text) technicalMessage = text;
            } catch {}
        }
        
        const userFriendlyMessage = getUserFriendlyError(response.status, technicalMessage);
        throw new Error(userFriendlyMessage);
    }

    if (shouldReturnStatus) {
        return response.status;
    }
    if (canParseJson) {
        return (await response.json()) as T;
    }
    return await response.text();
}

export default apiFetch;
