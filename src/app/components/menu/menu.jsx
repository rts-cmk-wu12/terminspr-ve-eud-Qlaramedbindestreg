
import { FaHome, FaSearch, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import "./menu.scss";

export default function Menu() {

  return (
    <nav className="menu">
      <ul className="menu-list">
        <li className="menu-item">
          <Link href="/" className="icon-circle">
            <FaHome className="icon" ></FaHome>
         
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/sogeside" className="icon-circle">
            <FaSearch className="icon"></FaSearch>
         
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/kalender" className="icon-circle">
            <FaCalendarAlt className="icon"></FaCalendarAlt>
          
          </Link>
        </li>
      </ul>
    </nav>
  );
}