"use client";

import "./kalender.scss";
import Button from "@/app/components/button/button";
import { useEffect, useState } from "react";
import leaveActivity from "@/actions/delete-activity";


export default function Kalender() {
  const [user, setUser] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);


    const storedRoster = JSON.parse(localStorage.getItem("roster") || "[]");
    setRoster(storedRoster);
    setLoading(false);
  }, []);

  const handleAfmeld = async (activityId) => {
    if (!user) return;

    try {
      await leaveActivity(user.id, activityId);

      const updatedRoster = roster.filter((a) => a.id !== activityId);
      setRoster(updatedRoster);
      localStorage.setItem("roster", JSON.stringify(updatedRoster));

      alert("Du har forladt aktiviteten.");
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
