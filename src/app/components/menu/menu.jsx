"use client"; 

import "./menu.scss";
import { FaHome, FaSearch, FaCalendarAlt} from "react-icons/fa";

export default function Menu() {
    return (
        <>
          <div className="menu">
            <div className="menu-item">
                <div className="icon-circle">
                   <FaHome></FaHome>
                </div>
            </div>

                <div className="menu-item">
                <div className="icon-circle">
                   <FaSearch></FaSearch>
                </div>
            </div>

                <div className="menu-item">
                <div className="icon-circle">
                   <FaCalendarAlt></FaCalendarAlt>
                </div>
            </div>


          </div>
        </>
    )
}