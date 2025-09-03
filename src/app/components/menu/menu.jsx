"use client"; 

import "./menu.scss";

import { FaHome, FaSearch, FaCalendarAlt} from "react-icons/fa";
import Link from "next/link";

export default function Menu() {

    return (
        <>
          <div className="menu">
            <div className="menu-item">
                <div className="icon-circle">
                   

                    <Link
                    href="/">
                        <FaHome></FaHome>

                    </Link>
                   
                </div>
            </div>

                <div className="menu-item">
                <div className="icon-circle">
                  
                    <Link href="/sogeside">
                    <FaSearch></FaSearch>
                    </Link>
                  
                </div>
            </div>

                <div className="menu-item">
                <div className="icon-circle">
                   
                    <Link  href="/kalender">
                    <FaCalendarAlt></FaCalendarAlt>
                    </Link>
                   
                </div>
            </div>


          </div>
        </>
    )
}