import OptimizedImage from "@/components/common/OptimizedImage"
import Link from "next/link"
import { Home } from "lucide-react"

type Props = {
  isTextWhite?: boolean
  isTextShow?: boolean
  size?: number
}

const Logo = ({ isTextWhite = false, isTextShow = true, size = 50 }: Props) => {
  const logoLink = { text: "Home", href: "/", src: "/favicon.ico", icon: <Home />, alt: "LevelUp Logo", title: "LevelUp" }
  return (
    <Link href={logoLink.href} className={`flex items-center justify-center text-xl font-bold ${isTextWhite && "text-white"}`}>
      <OptimizedImage
        src={logoLink.src}
        alt={logoLink.alt}
        height={size}
        width={size}
        className={`h-[${size}px] w-[${size}px]`}
      />
      {isTextShow && <span className="ms-2">{logoLink.title}</span>}
    </Link>
  )
}

export default Logo