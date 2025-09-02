
import "./aktiviteter.scss";

import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ActivitiesList from "@/app/components/activity-list/activity-list";



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

  const response = await fetch("http://localhost:4000/api/v1/activities", {
    headers: {
        Authorization: "Bearer " + access_token.value,
    },
    method: "GET",
  });

  if (response.status !== 200) {
    return {
        errors: ["Noget gik galt på serveren. Prøv igen senere"],
    };
  }
  const activities = await response.json();
// Kilde: Repitition. /Users/qlara/Desktop/coding/next/next-repetition/src/components/ui/kage-table/page.jsx
    return (
    <>
    
    <div className="activities-page">
       <h1>Aktiviteter</h1>
       {activities.length === 0 ? (
        <p>Ingen aktiviteter fundet.</p>
       ) : ( 
     <ActivitiesList activities={activities}></ActivitiesList>
        )}
        
        </div>
     
    </>
    );
} 