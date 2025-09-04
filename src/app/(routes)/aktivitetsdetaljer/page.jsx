"use client";

import "./aktivitetsdetaljer.scss";
import Button from "../../components/button/button";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginButton from "@/app/components/login-button/login-button";


export default function AktivitetsDetaljer() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [activity, setActivity] = useState(null);
  const [user, setUser] = useState(null);
  const [userRoster, setUserRoster] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const activityImages = {
  "Tango": "/images/1632381947468tango.jpg",
  "Fitness Dance": "/images/1632382020024fitnessdance.jpg",
  "Ballroom": "/images/1632386764699ballroom.jpg",
  "Pole Dance": "/images/1632386988204poledance.jpg",
  "Senior": "/images/1632387200478senior.jpg",
};


  useEffect(() => {
    const storedToken = localStorage.getItem("hallojsovs");
    const storedUser = localStorage.getItem("user");
    const storedRoster = JSON.parse(localStorage.getItem("roster") || "[]");

    if (!storedToken || !storedUser) return;

    setUser(JSON.parse(storedUser));
    setUserRoster(storedRoster);
  }, []);


  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem("hallojsovs");
        const res = await fetch(`http://localhost:4000/api/v1/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Kunne ikke hente aktiviteten");

        const data = await res.json();
        setActivity(data);

        
        const roster = JSON.parse(localStorage.getItem("roster") || "[]");
        setIsEnrolled(roster.some((a) => a.id === data.id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivity();
  }, [id]);

  const handleTilmeld = async () => {
    if (!user) return alert("Login for at tilmelde dig");
    if (isEnrolled) return alert("Du er allerede tilmeldt denne aktivitet");
    if (user.age < (activity.ageLimit ?? activity.minAge ?? 0))
      return alert(`Du skal være mindst ${activity.ageLimit ?? activity.minAge ?? 0} år`);
    if (userRoster.some((a) => a.weekday === activity.weekday))
      return alert("Du kan ikke tilmelde dig to aktiviteter på samme dag");

    try {
      const token = localStorage.getItem("hallojsovs");
      const res = await fetch(
        `http://localhost:4000/api/v1/users/${user.id}/activities/${activity.id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Kunne ikke tilmelde");

      const updatedRoster = [...userRoster, activity];
      setUserRoster(updatedRoster);
      setIsEnrolled(true);
      localStorage.setItem("roster", JSON.stringify(updatedRoster));
      alert("Du er nu tilmeldt aktiviteten!");
      router.push("/kalender");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleForlad = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("hallojsovs");
      const res = await fetch(
        `http://localhost:4000/api/v1/users/${user.id}/activities/${activity.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Kunne ikke afmelde");

      const updatedRoster = userRoster.filter((a) => a.id !== activity.id);
      setUserRoster(updatedRoster);
      setIsEnrolled(false);
      localStorage.setItem("roster", JSON.stringify(updatedRoster));
      alert("Du har forladt aktiviteten.");
      router.push("/kalender");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <div className="activity-detail-page">
      <LoginButton></LoginButton>

      <div className="activity-image-container">
         <Image
         src={activityImages[activity.name] || "/images/splash-image.jpg"}
         alt={activity.name || "Aktivitet"}
         fill
         ></Image>

        <div className="button-overlay">
          {!isEnrolled && <Button onClick={handleTilmeld}>Tilmeld</Button>}
          {isEnrolled && <Button onClick={handleForlad}>Forlad</Button>}
        </div>
      </div>

      <div className="activity-info">
        <h1>{activity.name}</h1>
        <p>{activity.description}</p>
        <p>Aldersgrænse: {activity.ageLimit ?? activity.minAge ?? "N/A"}</p>
        <p>
          {activity.weekday} Kl. {activity.time}
        </p>
      </div>
    </div>
  );
}
