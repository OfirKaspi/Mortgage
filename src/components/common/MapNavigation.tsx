"use client"

import { CONFIG } from "@/config/config"
import { redirectToPlatform } from "@/utils/redirectToPlatform"
import OptimizedImage from "@/components/common/OptimizedImage"

const MapNavigation = () => {
	const { contactAddress } = CONFIG
	
	// URL-encode the address to handle Hebrew characters properly
	const encodedAddress = encodeURIComponent(contactAddress)

	const buttons = [
		{
			_id: "1",
			link: `https://waze.com/ul?q=${encodedAddress}`,
			image: {
				src: "waze.svg",
				alt: "Waze"
			},
			label: "נווט עם Waze"
		}, {
			_id: "2",
			link: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
			image: {
				src: "google-maps.svg",
				alt: "Google Maps"
			},
			label: "נווט עם Google Maps"
		}
	]

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		
		// Only intercept on mobile to enable native app deep linking
		// On desktop, let the anchor tag handle it naturally (won't be blocked)
		if (isMobile) {
			e.preventDefault();
			redirectToPlatform(link);
		}
		// On desktop, let the default anchor behavior work (opens in new tab)
	}

	return (
		<div className="flex gap-3 mt-2">
			{buttons.map((button) => (
				<a
					key={button._id}
					href={button.link}
					target="_blank"
					rel="noopener noreferrer"
					onClick={(e) => handleClick(e, button.link)}
					className="relative w-12 h-12 min-w-[48px] min-h-[48px] rounded-lg border-2 border-border bg-background hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all flex items-center justify-center group p-2"
					aria-label={button.label}
				>
					<OptimizedImage
						src={`/maps/${button.image.src}`}
						alt={button.image.alt}
						width={18}
						height={18}
						className="object-contain group-hover:scale-110 transition-transform"
					/>
				</a>
			))}
		</div>
	)
}

export default MapNavigation
