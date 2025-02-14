"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  SlidersVertical,
  RefreshCcw,
} from "lucide-react";
import tradersData from "../data/traders.json";

export default function TraderProfile({ traderId }) {
  const [trader, setTrader] = useState(null);
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [activeTab, setActiveTab] = useState("Trades");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "lastTrade",
    direction: "asc",
  });
  const DefaultArrow = () => (
    <svg
      fill="#AA00FF"
      viewBox="-96 100 512 512"
      width="25px"
      height="25px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
    </svg>
  );

  const ClickedArrow = () => (
    <svg
      fill="#CCAD59"
      width="25px"
      height="25px"
      viewBox="-96 100 512 512"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#CCAD59"
    >
      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
    </svg>
  );
  const formatWallet = (wallet) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };

  const formatTime = (minutes) => {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0
            ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} min`
            : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`; // Format as millions, remove trailing zero
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`; // Format as thousands, remove trailing zero
    }
    return num; // Return the number as is if less than 1000
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

  const handleSort = (key) => {
    setSortConfig((currentSort) => {
        if (currentSort.key === key) {
            // If the same key is clicked, reset to default (lastTrade ascending)
            return { key: "lastTrade", direction: "asc" };
        } else {
            // Set to ascending for any new key clicked
            return { key, direction: "asc" };
        }
    });
  };

  if (!trader) {
    return null;
  }

  const sortedTokenTrades = [...trader.tokenTrades].sort((a, b) => {
    if (sortConfig.direction === null) {
      return 0; // No sorting
    }

    switch (sortConfig.key) {
      case "lastTrade":
          return sortConfig.direction === "asc"
              ? a.lastTrade - b.lastTrade // Treat as number
              : b.lastTrade - a.lastTrade; // Treat as number
      case "mc":
          return sortConfig.direction === "desc"
              ? a.mc - b.mc // Already a number
              : b.mc - a.mc; // Already a number
      case "invested":
          return sortConfig.direction === "desc"
              ? a.invested.sol - b.invested.sol // Compare the invested amounts
              : b.invested.sol - a.invested.sol; // Compare the invested amounts
      case "realizedPNL":
          const aPNL = parseFloat(a.realizedPNL.sol) * (a.realizedPNL.isPositive ? 1 : -1);
          const bPNL = parseFloat(b.realizedPNL.sol) * (b.realizedPNL.isPositive ? 1 : -1);
          return sortConfig.direction === "desc" ? aPNL - bPNL : bPNL - aPNL;
      case "roi":
          return sortConfig.direction === "desc"
              ? parseFloat(a.roi) - parseFloat(b.roi)
              : parseFloat(b.roi) - parseFloat(a.roi);
      case "trades":
          return sortConfig.direction === "desc"
              ? a.trades.total - b.trades.total
              : b.trades.total - a.trades.total;
      case "holding":
          return sortConfig.direction === "desc"
              ? a.holding.sol - b.holding.sol
              : b.holding.sol - a.holding.sol;
      case "avgBuy":
          return sortConfig.direction === "desc"
              ? a.avgBuy - b.avgBuy // Already a number
              : b.avgBuy - a.avgBuy; // Already a number
      case "avgSell":
          return sortConfig.direction === "desc"
              ? a.avgSell - b.avgSell // Already a number
              : b.avgSell - a.avgSell; // Already a number
      case "held":
          return sortConfig.direction === "asc"
              ? a.held - b.held // Compare held values as numbers
              : b.held - a.held; // Compare held values as numbers
      default:
          return 0;
  }
  });

  return (
    <div className="min-h-screen bg-[#060611] text-white">
      <div className="px-6 py-4">
        <div className="flex items-start max-md:flex-col gap-6 max-md:items-center">
          {/* Left Column */}
          <div className="w-[400px] max-md:w-full ">
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

            <div className="bg-[#11121B] ">
              <div className="flex justify-between items-center border-b border-[#23242C] p-4">
                <span className="text-white">X Account</span>
                <div className="text-right">
                  <p className="text-white">{trader.twitter}</p>
                  <p className="text-sm text-[#6B7280]">
                    {trader.followers} followers
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-white">Last Trade</span>
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
          <div className="w-full flex-1">
            <div className="mb-8 flex flex-col">
              {/* Time Period Filters */}
              <div className="flex justify-between items-center max-md:flex-col gap-4 max-md:mb-6 mb-5 ">
                <div className="flex space-x-2 max-md:flex-wrap max-md:justify-center max-md:space-x-1">
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
                <div className="flex items-center gap-4 text-[#6B7280] max-md:w-full max-md:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Last refreshed seconds ago</span>
                    <RefreshCcw size={16} />
                  </div>
                  <button className="text-[#AA00FF] hover:text-[#9F7AEA]">
                    <svg
                      fill="#AA00FF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 256 256"
                      id="Flat"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#AA00FF"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path d="M229.65723,109.65723l-48,48A8.00066,8.00066,0,0,1,168,152V112a87.94718,87.94718,0,0,0-85.22852,65.99414,7.99961,7.99961,0,0,1-15.49414-3.98828A103.9414,103.9414,0,0,1,168,96V56a8.00066,8.00066,0,0,1,13.65723-5.65723l48,48A8.00122,8.00122,0,0,1,229.65723,109.65723ZM192,208H40V88a8,8,0,0,0-16,0V208a16.01833,16.01833,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 max-md:grid-cols-1 max-md:gap-y-2 gap-px bg-[#11121B] ">
                {/* Left Column */}
                <div className="bg-[#11121B] grid grid-rows-3  border-r max-md:border-b border-[#23242C]">
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Tokens</span>
                      <span className="text-white text-base">
                        {trader.tokens}
                      </span>
                    </div>
                  </div>
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Win Rate</span>
                      <span className="text-[#59CC6C] text-base">
                        {trader.winRate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Trades</span>
                      <div>
                        <span className="text-[#59CC6C] text-base">
                          {trader.trades.wins}
                        </span>
                        <span className="text-[#6B7280] text-base">
                          /{trader.trades.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Column */}
                <div className="bg-[#11121B] grid grid-rows-3 border-r max-md:border-b border-[#23242C]">
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Average Buy</span>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center space-x-2">
                          <span className="text-white text-base">
                            {trader.avgBuy.sol}
                          </span>
                          <Image
                            src="/solana.png"
                            alt="Solana"
                            width={16}
                            height={16}
                          />
                        </div>

                        <span className="text-[#6B7280] text-base">
                          ${trader.avgBuy.usd}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Average Entry</span>
                      <span className="text-white text-base">
                        ${trader.avgEntry}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Average Hold</span>
                      <span className="text-white text-base">
                        {trader.avgHold}
                      </span>
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
                          <span className="text-white text-base">
                            {trader.totalInvested.sol}
                          </span>
                          <Image
                            src="/solana.png"
                            alt="Solana"
                            width={16}
                            height={16}
                          />
                        </div>
                        <span className="text-[#6B7280] text-base">
                          ${trader.totalInvested.usd}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-[#23242C]">
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">ROI</span>
                      <span className="text-[#59CC6C] text-base">
                        {trader.roi.percentage}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 h-full flex justify-between items-center">
                      <span className="text-white text-sm">Realized PNL</span>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center space-x-2">
                          <span className="text-[#59CC6C] text-base">
                            +{trader.realizedPNL.sol}
                          </span>
                          <Image
                            src="/solana.png"
                            alt="Solana"
                            width={16}
                            height={16}
                          />
                        </div>
                        <span className="text-[#6B7280] text-base">
                          ${trader.realizedPNL.usd}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                    {/* Tabs and Search */}
                    <div className="flex justify-between  max-md:flex-col gap-6 items-center mb-6 ">
              <div className="flex space-x-2">
                {["Trades", "Tokens", "Groups"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-3xl font-medium ${
                      activeTab === tab
                        ? "bg-[#25223D] text-white border border-[#464558]"
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
                    <th className="py-3 px-4 text-sm font-medium text-white">
                      Token
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("lastTrade")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Last Trade</span>
                        {sortConfig.key === "lastTrade" ? (
                            <ClickedArrow />
                        ) : (
                            <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("mc")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>MC</span>
                        {sortConfig.key === "mc" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("invested")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Invested</span>
                        {sortConfig.key === "invested" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("realizedPNL")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Realized PNL</span>
                        {sortConfig.key === "realizedPNL" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("roi")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>ROI</span>
                        {sortConfig.key === "roi" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("trades")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Trades</span>
                        {sortConfig.key === "trades" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("holding")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Holding</span>
                        {sortConfig.key === "holding" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("avgBuy")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Avg Buy</span>
                        {sortConfig.key === "avgBuy" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("avgSell")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Avg Sell</span>
                        {sortConfig.key === "avgSell" && sortConfig.direction !== null ? (
                          <ClickedArrow />
                        ) : (
                          <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort("held")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Held</span>
                        {sortConfig.key === "held" ? (
                            sortConfig.direction === "asc" ? <DefaultArrow /> : <ClickedArrow />
                        ) : (
                            <DefaultArrow />
                        )}
                      </div>
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-white">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTokenTrades.map((trade) => (
                    <tr
                      key={trade.id}
                      className="border-b border-[#1E1B2C] bg-[#11121B] hover:bg-[#1E1B2C]/50"
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
                      <td className="py-4 px-4 text-end">{formatTime(trade.lastTrade)}</td>
                      <td className="py-4 px-4 text-end">{formatNumber(trade.mc)}</td>
                      <td className="py-4 px-4 text-end">
                        <div className="flex flex-col items-center">
                          <div className="flex flex-row items-center space-x-2">
                            <span>{trade.invested.sol}</span>
                            <Image
                              src="/solana.png"
                              alt="Solana"
                              width={16}
                              height={16}
                            />
                          </div>
                          <span className="text-[#6B7280]">${trade.invested.usd}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-end">
                        <div className="flex flex-col items-center">
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              className={
                                trade.realizedPNL.isPositive
                                  ? "text-[#59CC6C]"
                                  : "text-[#EF4444]"
                              }
                            >
                              {trade.realizedPNL.isPositive ? "+" : ""}
                              {trade.realizedPNL.sol}
                            </span>
                            <Image
                              src="/solana.png"
                              alt="Solana"
                              width={16}
                              height={16}
                            />
                          </div>
                          <span className="text-[#6B7280]">${trade.realizedPNL.usd}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-end text-[#59CC6C]">
                        {trade.roi}
                      </td>
                      <td className="py-4 px-4 text-end">
                        <span className="text-[#59CC6C]">{trade.trades.wins}</span>
                        <span className="text-[#6B7280]">/{trade.trades.total}</span>
                      </td>
                      <td className="py-4 px-4 text-end">
                        <div className="flex flex-col items-center">
                          <div className="flex flex-row items-center space-x-2">
                            <span>{trade.holding.sol}</span>
                            <Image
                              src="/solana.png"
                              alt="Solana"
                              width={16}
                              height={16}
                            />
                          </div>
                          <span className="text-[#6B7280]">${trade.holding.usd}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-end">{formatNumber(trade.avgBuy)}</td>
                      <td className="py-4 px-4 text-end">{formatNumber(trade.avgSell)}</td>
                      <td className="py-4 px-4 text-end">{formatTime(trade.held)}</td>
                      <td className="py-4 px-4 text-end"><button className="text-[#8B5CF6] hover:text-[#9F7AEA]">
                      <svg
                        fill="#AA00FF"
                        width="20px"
                        height="20px"
                        viewBox="0 0 256 256"
                        id="Flat"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#AA00FF"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M229.65723,109.65723l-48,48A8.00066,8.00066,0,0,1,168,152V112a87.94718,87.94718,0,0,0-85.22852,65.99414,7.99961,7.99961,0,0,1-15.49414-3.98828A103.9414,103.9414,0,0,1,168,96V56a8.00066,8.00066,0,0,1,13.65723-5.65723l48,48A8.00122,8.00122,0,0,1,229.65723,109.65723ZM192,208H40V88a8,8,0,0,0-16,0V208a16.01833,16.01833,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></path>{" "}
                        </g>
                      </svg>
                    </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </div>
    </div>
  );
}
