"use client";
import "./activity-list.scss";
import Image from "next/image";
import Link from "next/link";
import fetchImages from "@/actions/fetch-images";


export default function ActivitiesList({ activities }) {
   const { images, loading } = fetchImages();
    
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
      {activities.map((activity) => (
        <div className="activity-card" key={activity.id}>
          <Image
            src={(activity, images)}
            alt={activity.title || "Aktivitet"}
            className="activity-image"
            width={400}
            height={250}
          />
          <div className="activity-overlay">
            <Link href={`/aktivitetsdetaljer?id=${activity.id}`}>
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}