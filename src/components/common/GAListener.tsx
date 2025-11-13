"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CONFIG } from "@/config/config";

export default function GAListener() {
	const pathname = usePathname();

	useEffect(() => {
		if (CONFIG.GOOGLE_ANALYTICS_ID && typeof window.gtag === "function") {
			window.gtag("config", CONFIG.GOOGLE_ANALYTICS_ID, {
				page_path: pathname,
			});
		}
	}, [pathname]);

	return null;
}
