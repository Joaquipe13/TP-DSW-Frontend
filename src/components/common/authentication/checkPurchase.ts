import { porturl } from "../utils";

export async function checkPurchase(
  user: number,
  course: number | string
): Promise<boolean | null> {
  if (!user || !course) {
    console.error("Invalid userId or courseId", user, course);
    return false;
  }
  const userId = user.toString();
  const courseId = course.toString();
  const url = `${porturl}/api/coursePurchaseRecords/check/${userId}/${courseId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.purchased ?? false;
    } else {
      const errorData = await response.json();
      console.error("Error verifying purchase:", errorData.message);
      return null;
    }
  } catch (error) {
    console.error("Error in the purchase verification request:", error);
    return null;
  }
}
