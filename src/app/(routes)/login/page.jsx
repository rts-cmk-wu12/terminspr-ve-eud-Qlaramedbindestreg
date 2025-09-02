"use client"
import "./login.scss";
import Image from "next/image"
import { useActionState } from "react";
import loginAction from "@/actions/login";
import Button from "../../components/button/button";




export default function LogIn() {
    const [formState, formAction, isPending] = useActionState(loginAction) 
    return (
        <>
    <div className="loginContainer">
   
   <Image 
   src="/images/splash-image.jpg" 
   fill
   alt="Login Image"
   className="backgroundImage">
   </Image>
            <form action={formAction}>
            <div>
                <label>
                 
                    <input type="text" name="username" placeholder="brugernavn"/>
                    <p>{formState?.properties?.username?.errors}</p>
                </label>
            </div>
            <div>
                <label>
                   
                    <input type="password" name="password" placeholder="adgangskode"/>
                       <p>{formState?.properties?.password?.errors}</p>
                </label>
            </div>
            <Button type="submit" className="loginButton">Log ind</Button>
            	<p>{formState?.errors}</p>
        </form>
    
   
   </div>
    </>
    )
}