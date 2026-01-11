import apiFetch from "@utils/api/apiFetch";

async function checkPurchase(
  course: number | string
): Promise<boolean | null> {
  if (!course) {
    console.error("Invalid courseId",  course);
    return false;
  }

  try {
    const data = await apiFetch<any>(
      `/api/coursePurchaseRecords/check/${course}`,
      {
        method: "GET",
        requiresAuth: true,
      }
    );
    return data.data ? data.data : false;
  } catch (error) {
    console.error("Error verifying purchase:", error);
    return null;
  }
}
export default checkPurchase;
