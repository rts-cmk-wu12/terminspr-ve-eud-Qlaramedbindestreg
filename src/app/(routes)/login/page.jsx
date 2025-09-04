"use client";

import "./login.scss";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/button/button";

export default function LogIn() {
    const [formState, setFormState] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true);

        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await fetch("http://localhost:4000/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error("Forkert brugernavn eller adgangskode");

            const data = await res.json();
            const token = data.token;

           
            localStorage.setItem("hallojsovs", token);

       
            window.location.href = "/aktiviteter";
        } catch (err) {
            setFormState({ errors: [err.message] });
        } finally {
            setIsPending(false);
        }
    };

    return (
      
        <>
        <div className="login-container">
            <Image 
                src="/images/splash-image.jpg" 
                fill
                alt="Login Image"
                className="backgroundImage" ></Image>
            

            <form onSubmit={handleSubmit}>
                <label>
                    
                    <input type="text" name="username" placeholder="brugernavn" />
                    {formState?.properties?.username?.errors && (
                        <p>{formState.properties.username.errors}</p>
                    )}
                </label>

                <label>
                 
                    <input type="password" name="password" placeholder="adgangskode" />
                    {formState?.properties?.password?.errors && (
                        <p>{formState.properties.password.errors}</p>
                    )}
                </label>

                <Button type="submit" className="login-button" disabled={isPending}>
                    {isPending ? "Logger ind..." : "Log ind"}
                </Button>

                {formState?.errors && <p>{formState.errors}</p>}
            </form>
        </div>
        </>
    );
}
