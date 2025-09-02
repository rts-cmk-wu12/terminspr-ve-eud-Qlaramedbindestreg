"use client";
import { useState, useEffect } from "react";
import ActivitiesList from "@/app/components/activity-list/activity-list"
import "./sogeside.scss";
import { FaSearch } from "react-icons/fa";

export default function Search() {
    const [query, setQuery] = useState("");
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        if (!query) return;

        fetch(`http://localhost:4000/api/v1/activities?search=${query}`)
        .then((res) => res.json())
        .then((data) => setActivities(data))

    }, [query])
    return (
        <>
        <div className="searchPage">
            <h1>Søg </h1>
            <input type="text"

            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <FaSearch className="searchIcon"></FaSearch>
        <ActivitiesList activities={activities}></ActivitiesList>
        </div>
        </>
    )
}