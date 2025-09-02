"use client";
import "./activity-list.scss";
import Image from "next/image";
import Link from "next/link";

export default function ActivitiesList({ activities }) {
    if (!activities || activities.length === 0) {
        return (
            <div className="activities-container">
        <p className="activity-card noResults">
            Der blev ikke fundet nogle aktiviteter. </p>
        </div>
    );
    } 

        return (
            <>
            <div className="activities-container">
            {activities.map((activity) => (
                <div className="activity-card" key={activity.id} >
                   <Image
                    src={activity.image?.url || "/images/download (1).jpeg"}
                    alt={activity.title || "Aktivitet"}
                    className="activity-image"
                    width={400}
                    height={250}

                   >
                   </Image>
                   <div className="activity-overlay">
                    <Link
                    href={`/aktivitetsdetaljer?id=${activity.id}`}
                  
                    >
                      <h2>{activity.title}</h2>
                      <p>{activity.description}</p>
                    </Link>

                   </div>
                </div>
                   
            ))}
        </div>
            </>
        )
}