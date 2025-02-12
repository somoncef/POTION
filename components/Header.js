import Image from "next/image"
import Link from "next/link"
import { FaXTwitter ,FaDiscord  } from "react-icons/fa6";


export default function Header() {
  return (
    <header className="bg-[#060611] flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-12">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Potion Leaderboard"
            width={180}
            height={100}
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/leaderboards" className="text-white hover:text-[#8B5CF6] font-medium">
            Leaderboards
          </Link>
          <Link href="" className="text-[#6B7280] hover:text-white font-medium">
            Learn
          </Link>
          <Link href="/prizes" className="text-[#6B7280] hover:text-white font-medium">
            Prizes
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="https://twitter.com" className="text-[#6B7280] hover:text-white">
          <FaXTwitter size={24} />
        </Link>
        <Link href="https://discord.com" className="text-[#6B7280] hover:text-white">
          <FaDiscord size={24} />
        </Link>
        <Image
          src="/profile.png"
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </header>
  )
}

