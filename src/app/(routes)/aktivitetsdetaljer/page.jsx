"use client";
import Button from "../../components/button/button";
import Image from "next/image";
import "./aktivitetsdetaljer.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Kilde: Repitition /Users/qlara/Desktop/coding/next/next-repetition/src/app/(routes)/dashboard/update/[kageid]/page.jsx
export default function AktivitetsDetaljer({ params }) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    // Kilde: https://nextjs.org/docs/app/api-reference/functions/use-search-params
    
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:4000/api/v1/activities/${id}`)
        .then(res => res.json())
        .then(data => setActivity(data));
    }, [id]);

    if (!activity) return <p>Loading...</p>
    
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

            </div>

        </div>
        
        </>
    )
}