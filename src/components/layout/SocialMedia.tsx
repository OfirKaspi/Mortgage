"use client";

import { CONFIG } from "@/config/config";
import { redirectToPlatform } from "@/utils/redirectToPlatform";
import OptimizedImage from "@/components/common/OptimizedImage";

const SocialMedia = () => {
  const { whatsappNumber, facebookUsername, instagramUsername } = CONFIG

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const facebookUrl = `https://www.facebook.com/${facebookUsername}`;
  const instagramUrl = `https://www.instagram.com/${instagramUsername}`;

  const socials = [
    { 
      name: "facebook", 
      href: facebookUrl,
      label: "עקבו אחרינו בפייסבוק"
    },
    { 
      name: "instagram", 
      href: instagramUrl,
      label: "עקבו אחרינו באינסטגרם"
    },
    { 
      name: "whatsapp", 
      href: whatsappUrl,
      label: "שלחו לנו הודעה בוואטסאפ"
    },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Only intercept on mobile to enable native app deep linking
    // On desktop, let the anchor tag handle it naturally (won't be blocked)
    if (isMobile) {
      e.preventDefault();
      redirectToPlatform(href);
    }
    // On desktop, let the default anchor behavior work (opens in new tab)
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-foreground">השאר מחובר</span>
      <ul className="flex gap-3" role="list">
        {socials.map((social) => (
          <li
            key={social.name}
            role="listitem"
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleClick(e, social.href)}
              className="relative w-12 h-12 min-w-[48px] min-h-[48px] rounded-lg border-2 border-border bg-background hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all flex items-center justify-center group p-2"
              aria-label={social.label}
            >
              <OptimizedImage
                src={`/social-media/${social.name}.svg`}
                alt={`${social.name} logo`}
                width={18}
                height={18}
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialMedia
