"use client";

import "./activity-list.scss";
import Image from "next/image";
import Link from "next/link";


const activityImages = {
  "Tango": "/images/1632381947468tango.jpg",
  "Fitness Dance": "/images/1632382020024fitnessdance.jpg",
  "Ballroom": "/images/1632386764699ballroom.jpg",
  "Pole Dance": "/images/1632386988204poledance.jpg",
  "Senior": "/images/1632387200478senior.jpg",
};

export default function ActivitiesList({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="activities-container">
        <p className="activity-card no-results">
          Der blev ikke fundet nogle aktiviteter.
        </p>
      </div>
    );
  }

  return (
    <div className="activities-container">
      {activities.map((activity) => {
        const imgSrc = activityImages[activity.name] || "/images/splash-image.jpg";

        return (
          <div className="activity-card" key={activity.id}>
            <Image
              src={imgSrc}
              alt={activity.name || "Aktivitet"}
              className="activity-image"
              width={400}
              height={250}
            />
            <div className="activity-overlay">
              <Link href={`/aktivitetsdetaljer?id=${activity.id}`}>
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
