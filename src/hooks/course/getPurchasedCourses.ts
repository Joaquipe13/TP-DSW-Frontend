import apiFetch from "@utils/api/client";

async function getPurchasedCourses(
  title: string | undefined
) {
  const url = `/api/coursePurchaseRecords/courses?title=${title}`;
  let loading = true;
  let error = null;
  let courses = null;

  try {
    const data: any = await apiFetch(url, { method: "GET" });
    courses = data.data;
    loading = false;
  } catch (err) {
    console.error("Error en la solicitud para obtener cursos comprados:", err);
    error = "Error en la solicitud";
    loading = false;
  }

  return { loading, error, courses };
}

export default getPurchasedCourses;
