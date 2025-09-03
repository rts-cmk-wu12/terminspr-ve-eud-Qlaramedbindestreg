"use client";
import "./login-button.scss";
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";

export default function LoginButton() {
    return (
        <>
        <div className="login-button-container">
              <Link
              href="/login" className="login-button"
              >
                <div className="icon-circle">
                    <BiLogIn size={20} ></BiLogIn>
                </div>

              </Link>
        </div>
        </>
    )
}