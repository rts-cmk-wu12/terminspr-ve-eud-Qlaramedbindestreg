"use client";

import Button from "../../components/button/button";
import Image from "next/image";
import "./aktivitetsdetaljer.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import enrollActivity from "@/actions/create-activity";
import leaveActivity from "@/actions/delete-activity";
import { useActionState } from "react";

// Kilde: Repitition /Users/qlara/Desktop/coding/next/next-repetition/src/app/(routes)/dashboard/update/[kageid]/page.jsx
export default function AktivitetsDetaljer({ params }) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    // Kilde: https://nextjs.org/docs/app/api-reference/functions/use-search-params
    
    const [activity, setActivity] = useState(null);
    const [user, setUser] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [conflictingActivity, setConflictingActivity] = useState(false);



    const [enrollState, enrollAction, enrolling] = useActionState(enrollActivity, 
        { success: null});
    const [leaveState, leaveAction, leaving] = useActionState(leaveActivity, 
        { success: null});

   useEffect(() => {
            if (!id) return;

    const fetchData = async () => {
        //Kilde: https://nextjs.org/docs/app/getting-started/fetching-data
      const token = localStorage.getItem("hallojsovs");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {

  
        const activityRes = await fetch(`http://localhost:4000/api/v1/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!activityRes.ok) throw new Error("Fejl ved hentning af aktivitet");
        const activityData = await activityRes.json();
        setActivity(activityData);

       
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.data.id; 

       
        const userRes = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Fejl ved hentning af bruger");
        const userData = await userRes.json();
        setUser(userData);

      
        const rosterRes = await fetch(`http://localhost:4000/api/v1/users/${userId}/roster/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!rosterRes.ok) throw new Error("Fejl ved hentning af brugerens aktiviteter");
        const rosterData = await rosterRes.json();
        setIsEnrolled(rosterData.some((a) => a.id === activityData.id));

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);


    if (!activity) return <p>Loading...</p>

    // Kilde: repitition: /Users/qlara/Desktop/coding/next/next-repetition/src/components/ui/kage-table/page.jsx
    return (
        <>
        <div className="activity-detail-page">
            <div className="activity-image-container">
                <Image
                src={activity.image?.url || "/images/download (1).jpeg"}
                alt={activity.title || "Aktivitet"}
                fill
                ></Image>

                <div className="button-overlay">
                  <Button>Tilmeld</Button>
                </div>

            </div>
            <div className="activity-info">
                <h1>{activity.title}</h1>
                <p>{activity.description}</p>
                <p>Aldersgrænse: {activity.ageLimit}</p>
                <p>{activity.weekday} Kl. {activity.time}</p>

                {user && (
                    <form action={isEnrolled ? leaveAction : enrollAction}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="activityId" value={activity.id} />
                        <Button type="submit" disabled={enrolling || leaving}>
                            {isEnrolled ? "Forlad" : "Tilmeld"} 
                        </Button>
                    </form>
                )}

                {enrollState?.errors && <p>{enrollState.errors}</p>}
                {leaveState?.errors && <p>{leaveState.errors}</p>}

            </div>

        </div>
        
        </>
    )
}