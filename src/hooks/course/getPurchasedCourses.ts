import apiFetch from "@utils/api/client";

async function getPurchasedCourses(
  user: number | null,
  title: string | undefined
) {
  const url = `/api/coursePurchaseRecords/courses?user=${user}&title=${title}`;
  let loading = true;
  let error = null;
  let courses = null;

  try {
    console.log(url);
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
