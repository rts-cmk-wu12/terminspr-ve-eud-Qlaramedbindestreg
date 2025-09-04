"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function leaveActivity({ userId, activityId }) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("hallojsovs");

  const response = await fetch(
    `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`,
    {
      headers: {
        Authorization: "Bearer " + access_token.value,
      },
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return {
      success: false,
      errors: ["Noget gik galt på serveren. Prøv igen senere"],
    };
  }

  revalidatePath(`/aktiviteter/${activityId}`);

  return { success: true };
}
