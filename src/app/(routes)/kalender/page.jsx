"use client";

import "./kalender.scss";
import Button from "@/app/components/button/button";
import { useEffect, useState } from "react";

export default function Kalender() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const storedToken = localStorage.getItem("hallojsovs");
    const storedUser = localStorage.getItem("user");

    if (!storedToken || !storedUser) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (!user) return;

    const storedRoster = JSON.parse(localStorage.getItem("roster") || "[]");
    setRoster(storedRoster);
    setLoading(false);
  }, [user]);


  const handleAfmeld = async (activityId) => {
    if (!user || !token) return;

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/users/${user.id}/activities/${activityId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Kunne ikke afmelde");

    
      const updatedRoster = roster.filter((a) => a.id !== activityId);
      setRoster(updatedRoster);
      localStorage.setItem("roster", JSON.stringify(updatedRoster));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p className="loading">Loading roster...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="kalender-container">
      <h1 className="kalender-title">Kalender</h1>

      {roster.length === 0 ? (
        <p className="kalender-empty">Du er ikke tilmeldt nogen aktiviteter.</p>
      ) : (
        <ul className="kalender-list">
          {roster.map((activity) => (
            <li key={activity.id} className="kalender-item">
              <div className="kalender-card">
                <span className="kalender-name">{activity.title}</span>
                <span className="kalender-time">
                  {activity.weekday} kl. {activity.time}
                </span>
                <Button onClick={() => handleAfmeld(activity.id)}>Afmeld</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
