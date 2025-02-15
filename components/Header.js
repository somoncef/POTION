"use client";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import dynamic from 'next/dynamic';
import { FaSignOutAlt } from 'react-icons/fa';


const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });

export default function Header() {
  const { connected, disconnect } = useWallet();
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
 
     
  return (
    <header className="bg-[#060611] flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4 md:space-x-12">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Potion Leaderboard" width={180} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-[#8B5CF6] font-medium">
            Leaderboards
          </Link>
          <Link 
            href="http://docs.potionleaderboard.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#6B7280] hover:text-white font-medium"
          >
            Learn
          </Link>
          <Link href="/" className="text-[#6B7280] hover:text-white font-medium">
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
        
        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu size={24} className="text-white" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#25223D] p-4">
              <nav className="flex flex-col space-y-6 mt-4">
                <Link href="/leaderboards" className="text-white hover:text-[#8B5CF6] font-medium">
                  Leaderboards
                </Link>
                <Link 
                  href="http://docs.potionleaderboard.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#6B7280] hover:text-white font-medium"
                >
                  Learn
                </Link>
                <Link href="/prizes" className="text-[#6B7280] hover:text-white font-medium">
                  Prizes
                </Link>
                {connected ? (
                  <button onClick={disconnect} className="bg-red-600 text-white px-4 py-2 rounded">
                    Disconnect
                  </button>
                ) : (
                  <WalletMultiButton className="!bg-[#8B5CF6]" />
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {connected ? (
          <div className="relative flex items-center">
          <button  className="focus:outline-none">
            <Image src="/profile.png" alt="Profile" width={32} height={32} className="rounded-full cursor-pointer" />
          </button>
          <button onClick={disconnect} className="ml-2 text-red-600 hover:text-red-400">
            <FaSignOutAlt size={24} color="#AA00FF" />
          </button>
        </div>
        ) : (
          <div className="hidden md:block">
            <WalletMultiButton className="!bg-[#8B5CF6]" />
          </div>
        )}
      </div>

      { showConnectWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#25223D] p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Connect Your Wallet
            </h3>
            <p className="text-[#6B7280] mb-6">
              Please connect your wallet to access this feature.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-[#6B7280]"
                onClick={() => setShowConnectWalletModal(false)}
              >
                Cancel
              </button>
              <WalletMultiButton className="!bg-[#8B5CF6]" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}