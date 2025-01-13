import { porturl } from "@utils/index.ts";

export async function checkSubscription(
  user: number | string
): Promise<boolean | null> {
  if (!user) {
    console.error("Invalid userId", user);
    return false;
  }
  const url = `${porturl}/api/subsPurchaseRecords/check/${user}`;

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
