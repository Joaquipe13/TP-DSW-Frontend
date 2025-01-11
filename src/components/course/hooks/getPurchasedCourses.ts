import { porturl } from "../../../common/utils";

export async function getPurchasedCourses(
  user: number | null,
  title: string | undefined
) {
  const url =
    porturl + `/api/coursePurchaseRecords/courses?user=${user}&title=${title}`;
  let loading = true;
  let error = null;
  let courses = null;

  try {
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      courses = data.data;
      loading = false;
    } else {
      const errorData = await response.json();
      error = errorData.message;
      loading = false;
    }
  } catch (err) {
    console.error("Error en la solicitud para obtener cursos comprados:", err);
    error = "Error en la solicitud";
    loading = false;
  }

  return { loading, error, courses };
}
