import apiFetch from "@utils/api/apiFetch";

async function checkSubscription(
): Promise<boolean | null> {

  try {
    const data = await apiFetch<any>(`/api/subsPurchaseRecords/check`, {
      method: "GET",
    });
    return data.purchased ?? false;
  } catch (error) {
    console.error("Error verifying subscription:", error);
    return null;
  }
}

export default checkSubscription;
