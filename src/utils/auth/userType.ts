import { getUser } from "@utils/index";

export async function userType() {
  const user = await getUser();
  if (user) {
    return user.admin === true ? "admin" : "member";
  } else {
    console.log("No user found.");
    return null;
  }
}
