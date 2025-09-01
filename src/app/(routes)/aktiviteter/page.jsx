
import "./aktiviteter.scss";
import Menu from "../../components/menu/menu.jsx";
import { cookies } from "next/headers";


export const metadata = {
  title: "Aktiviteter",
}

export default async function AktiviteterPage() {

    const cookieStore = await cookies();
	const access_token = cookieStore.get("hallojsovs");

    if (!access_token) {
        return (
            <p>Du er ikke logget ind.</p>
        )
    }

  const response = await fetch("http://localhost:4000/api/v1/activities/1", {
    headers: {
        Authorization: "Bearer" + access_token.value,
    },
    method: "GET",
  });

  if (response.status !== 200) {
    return {
        success: false,
        errors: ["Noget gik galt på serveren. Prøv igen senere"],
    };
  }
  const activities = await response.json();

    return (
    <>
    <div className="aktiviteter-page">
       <h1>Aktiviteter</h1>
    </div>
    <Menu></Menu>
    </>
    )
} 