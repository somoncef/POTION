"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  SlidersVertical,
  Share2,
  RefreshCcw,
  ChevronDown,
} from "lucide-react";
import tradersData from "../data/traders.json";

export default function TraderProfile({ traderId }) {
  const [trader, setTrader] = useState(null);
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [activeTab, setActiveTab] = useState("Trades");
  const [searchQuery, setSearchQuery] = useState("");

  const formatWallet = (wallet) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };

  useEffect(() => {
    // Ensure traderId is a number
    const id =
      typeof traderId === "string" ? Number.parseInt(traderId) : traderId;
    const traderData = tradersData.traders.find((t) => t.id === id);

    if (traderData) {
      setTrader(traderData);
    } else {
      setError(`No trader found with ID ${id}`);
    }
  }, [traderId]);

  if (!trader) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#060611] text-white">
      <div className="px-6 py-4">
        <div className="flex items-start gap-6">
          {/* Left Column */}
          <div className="w-[300px]">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={trader.avatar || "/placeholder.png"}
                alt={trader.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold">{trader.name}</h1>
                <p className="text-sm text-[#6B7280]">
                  {formatWallet(trader.wallet)}
                </p>
              </div>
            </div>

            <div className="bg-[#1E1B2C] rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">X Account</span>
                <div className="text-right">
                  <p className="text-white">{trader.twitter}</p>
                  <p className="text-sm text-[#6B7280]">
                    {trader.followers} followers
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Last Trade</span>
                <div className="flex items-center gap-2">
                  <span>{trader.lastTrade.time}</span>
                  <span>
                    <Image src="/bull.png" alt="bull" width={16} height={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <div className="mb-8">
              {/* Time Period Filters */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  {["Daily", "Weekly", "Monthly", "All-Time"].map((period) => (
                    <button
                      key={period}
                      className={`px-4 py-2 rounded-3xl font-medium ${
                        timeFrame === period
                          ? "bg-[#25223D] text-white border border-[#464558]"
                          : "text-[#6B7280] hover:text-white"
                      }`}
                      onClick={() => setTimeFrame(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Last refreshed seconds ago</span>
                    <RefreshCcw size={16} />
                  </div>
                  <button className="text-[#8B5CF6] hover:text-[#9F7AEA]">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-px bg-[#11121B]">
                {/* Left Column */}
                <div className="bg-[#11121B] grid grid-rows-3 border-r border-[#23242C]">
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Tokens</span>
                      <span className="text-white text-base">{trader.tokens}</span>
                    </div>
                  </div>
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Win Rate</span>
                      <span className="text-[#59CC6C] text-base">{trader.winRate}</span>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Trades</span>
                      <div>
                        <span className="text-[#59CC6C] text-base">{trader.trades.wins}</span>
                        <span className="text-[#6B7280] text-base">/{trader.trades.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Column */}
                <div className="bg-[#11121B] grid grid-rows-3 border-r border-[#23242C]">
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Average Buy</span>
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-center space-x-2">
                            <span className="text-white text-base">{trader.avgBuy.sol}</span>
                            <Image src="/solana.png" alt="Solana" width={16} height={16} />
                            </div>
                        
                        <span className="text-[#6B7280] text-base">${trader.avgBuy.usd}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Average Entry</span>
                      <span className="text-white text-base">${trader.avgEntry}</span>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Average Hold</span>
                      <span className="text-white text-base">{trader.avgHold}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="bg-[#11121B] grid grid-rows-3">
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Total Invested</span>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center space-x-2">
                        <span className="text-white text-base">{trader.totalInvested.sol}</span>
                        <Image src="/solana.png" alt="Solana" width={16} height={16} />
                        </div> 
                        <span className="text-[#6B7280] text-base">${trader.totalInvested.usd}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">ROI</span>
                      <span className="text-[#59CC6C] text-base">{trader.roi.percentage}</span>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Realized PNL</span>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center space-x-2">
                          <span className="text-[#59CC6C] text-base">+{trader.realizedPNL.sol}</span>
                        <Image src="/solana.png" alt="Solana" width={16} height={16} />
                        </div> 
                        <span className="text-[#6B7280] text-base">${trader.realizedPNL.usd}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs and Search */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                {["Trades", "Tokens", "Groups"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === tab
                        ? "bg-[#1E1B2C] text-white"
                        : "text-[#6B7280]"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
            <input
              type="text"
              placeholder="Search by name or wallet"
              className="w-[320px] pl-10 pr-4 py-2 bg-[#060611] text-white rounded-full border border-[#464558] focus:outline-none focus:border-[#8B5CF6]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
                </div>
                <button className="px-4 py-2 bg-[#25223D] rounded-full text-[#6B7280] border-[#464558] border hover:text-white relative ">
            <SlidersVertical size={20} />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#8B5CF6] rounded-full text-[10px] flex items-center justify-center text-white">
              2
            </span>
          </button>
              </div>
            </div>

            {/* Trades Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-[#1E1B2C] rounded-lg">
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Token
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      <div className="flex items-center space-x-1 cursor-pointer">
                        <span>Last Trade</span>
                        <ChevronDown size={16} />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      MC
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Invested
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Realized PNL
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      ROI
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Trades
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Holding
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Avg Buy
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Avg Sell
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Held
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-[#6B7280]">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trader.tokenTrades
                    .filter(
                      (trade) =>
                        trade.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        trade.wallet
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    )
                    .map((trade) => (
                      <tr
                        key={trade.id}
                        className="border-b border-[#1E1B2C] hover:bg-[#1E1B2C]/50"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <Image
                              src="/profile.png"
                              alt={trade.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <div className="font-medium">{trade.name}</div>
                              <div className="text-sm text-[#6B7280]">
                                {formatWallet(trade.wallet)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">{trade.lastTrade}</td>
                        <td className="py-4 px-4">{trade.mc}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Image
                              src="/solana.png"
                              alt="Solana"
                              width={16}
                              height={16}
                            />
                            <span>{trade.invested.sol}</span>
                            <span className="text-[#6B7280]">
                              ${trade.invested.usd}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <span
                              className={
                                trade.realizedPNL.isPositive
                                  ? "text-[#59CC6C]"
                                  : "text-[#EF4444]"
                              }
                            >
                              {trade.realizedPNL.isPositive ? "+" : "-"}
                              {trade.realizedPNL.sol}
                            </span>
                            <span className="text-[#6B7280]">
                              ${trade.realizedPNL.usd}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#59CC6C]">
                          {trade.roi}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-[#59CC6C]">
                            {trade.trades.wins}
                          </span>
                          <span className="text-[#6B7280]">
                            /{trade.trades.total}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <span>{trade.holding.sol}</span>
                            <span className="text-[#6B7280]">
                              ${trade.holding.usd}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">${trade.avgBuy}</td>
                        <td className="py-4 px-4">${trade.avgSell}</td>
                        <td className="py-4 px-4">{trade.held}</td>
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
        </div>
      </div>
    </div>
  );
}
