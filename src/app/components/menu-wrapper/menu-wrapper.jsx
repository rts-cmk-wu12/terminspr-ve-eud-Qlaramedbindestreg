"use client";

import { usePathname } from "next/navigation";
import Menu from "../menu/menu";

// Kilde: https://nextjs.org/docs/app/api-reference/functions/use-pathname
export default function MenuWrapper() {
    const pathname = usePathname();

    const hideMenuPaths = ["/", "/login"];

    if (hideMenuPaths.includes(pathname)) return null;
    return <Menu></Menu>;
}