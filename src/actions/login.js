"use server"
import { cookies } from "next/headers";
import z  from "zod";
import { redirect } from "next/navigation";

// Kilde: Repitition /Users/qlara/Desktop/coding/next/next-repetition/src/actions/do-the-login-thing.js

export default async function loginAction(prevState, formData) {
const username = formData.get("username");
const password = formData.get("password");

const schema = z.object({
    username: z.string().min(1, {message: "Brugernavn skal være udfyldt"}),
    password: z.string().min(1, { message: "Adgangskode skal være udfyldt"})
});
 

const validated = schema.safeParse({
    username, password
});

  if (!validated.success) return {
		...validated,
		...(z.treeifyError(validated.error))
	}
const response = await fetch("http://localhost:4000/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password})
});
if (!response.ok) {
    return {errors: ["Forkert brugernavn eller adgangskode"] };
}
const data = await response.json();
const token = data.token

const cookieStore = cookies();
cookieStore.set("hallojsovs", token, {
    httpOnly: true,
    path: "/"
});

//Kilde: https://nextjs.org/docs/app/api-reference/functions/redirect
redirect("/aktiviteter" );
}
