"use server";

import { cookies } from "next/headers";
import {revalidatePath} from "next/cache";

//Kilde: Repitition: /Users/qlara/Desktop/coding/next/next-repetition/src/actions/create-kageperson.js

export default async function enrollActivity(prevState, formData) {
    const activityId = formData.get("activityId");
    const userId = formData.get("userId");

    const cookieStore = await cookies();
    const access_token = cookieStore.get("hallojsovs");

    const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, {
        headers: {
            Authorization: "Bearer" + access_token.value,
        },
        method: "POST",
});

      revalidatePath(`/aktiviteter/${activityId}`);
     
    return response.ok ? {
        success: true
    } : {
        success: false
    };
}
