"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Share2, Search, SlidersHorizontal } from "lucide-react"
import tradersData from "../data/traders.json"

export default function LeaderboardTable() {
  const [timeFrame, setTimeFrame] = useState("Daily")
  const [searchQuery, setSearchQuery] = useState("")

  const getRankStyle = (rank) => {
    if (rank === 1) return "bg-[#FFD700]"
    if (rank === 2) return "bg-[#C0C0C0]"
    if (rank === 3) return "bg-[#CD7F32]"
    return ""
  }

  const formatWallet = (wallet) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
  }

  return (
    <div className="w-full px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button className="px-5 py-2 bg-[#1E1B2C] text-white rounded-3xl border-[#464558]">Traders</button>
          <button className="px-5 py-2 text-[#6B7280] font-medium  rounded-3xl">Groups</button>
        </div>
        <div className="flex items-center space-x-2">
          {["Daily", "Weekly", "Monthly", "All-Time"].map((period) => (
            <button
              key={period}
              className={`px-5 py-2 font-medium rounded-3xl border-[#464558] ${
                timeFrame === period ? "bg-[#1E1B2C] text-white" : "text-[#6B7280]"
              }`}
              onClick={() => setTimeFrame(period)}
            >
              {period}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
            <input
              type="text"
              placeholder="Search by name or wallet"
              className="w-[320px] pl-10 pr-4 py-2 bg-[#1E1B2C] text-white rounded-lg border border-[#2E2A3D] focus:outline-none focus:border-[#8B5CF6]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 bg-[#1E1B2C] rounded-lg text-[#6B7280] hover:text-white relative">
            <SlidersHorizontal size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B5CF6] rounded-full text-[10px] flex items-center justify-center text-white">
              2
            </span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-[#1E1B2C] rounded-lg">
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">Rank</th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">Trader</th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Followers</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Tokens</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Win Rate</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Trades</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Avg Buy</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Avg Entry</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Avg Hold</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Realized PNL</span>
                  <ChevronDown size={16} />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">Share</th>
            </tr>
          </thead>
          <tbody>
            {tradersData.traders.map((trader) => (
              <tr key={trader.id} className="border-b border-[#1E1B2C] hover:bg-[#1E1B2C]/50 cursor-pointer">
                <td className="py-4 px-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankStyle(trader.rank)}`}>
                    {trader.rank}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={trader.avatar || "/placeholder.png"}
                      alt={trader.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-white">{trader.name}</div>
                      <div className="text-sm text-[#6B7280]">{formatWallet(trader.wallet)}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-white">{trader.followers}</span>
                    <span className="text-[#6B7280]">{trader.twitter}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white">{trader.tokens}</td>
                <td className="py-4 px-4">
                  <span className={trader.winRate >= "50%" ? "text-[#22C55E]" : "text-[#EF4444]"}>
                    {trader.winRate}
                  </span>
                </td>
                <td className="py-4 px-4 text-white">
                  <span className="text-[#22C55E]">{trader.trades.wins}</span>
                  <span className="text-[#6B7280]">/{trader.trades.total}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center space-x-2">
                    <span className="text-white">{trader.avgBuy.sol}</span>
                    <Image
                      src="/solana.png"
                      alt="Solana"
                      width={16}
                      height={16}
                    />
                    </div>
                    <span className="text-[#6B7280]">${trader.avgBuy.usd}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white">${trader.avgEntry}</td>
                <td className="py-4 px-4 text-white">{trader.avgHold}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center flex-col">
                    <div className="flex flex-row items-center space-x-2">
                      <span className={trader.realizedPNL.isPositive ? "text-[#22C55E]" : "text-[#EF4444]"}>
                      {trader.realizedPNL.isPositive ? "+" : ""}
                      {trader.realizedPNL.sol}
                    </span>
                    <Image
                      src="/solana.png"
                      alt="Solana"
                      width={16}
                      height={16}
                    /></div>
                    <span className="text-[#6B7280]">${trader.realizedPNL.usd}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-[#8B5CF6] hover:text-[#9F7AEA]">
                    <Share2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

