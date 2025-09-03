"use client";
import { useEffect, useState } from "react";

export default function FetchImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/assets");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setImages(data); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { images, loading };
}
