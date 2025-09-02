"use client";
import { useState, useEffect } from "react";
import ActivitiesList from "@/app/components/activity-list/activity-list"
import "./sogeside.scss";
import { FaSearch } from "react-icons/fa";

export default function Search() {
    //Kilde: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes & https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch?utm_source=chatgpt.com#supplying_request_parameters
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
            <div className="searchBar">
            <input type="text"

            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <FaSearch className="searchIcon"></FaSearch>
            </div>
        <ActivitiesList activities={activities}></ActivitiesList>
       
        </div>
        </>
    )
}