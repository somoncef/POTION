"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, SlidersVertical, AlertCircle } from "lucide-react";
import tradersData from "../data/traders.json";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function LeaderboardTable() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: null,
  });
  const [activeTab, setActiveTab] = useState("traders");
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);

  const handleProtectedAction = () => {
    if (!connected) {
      setShowConnectWalletModal(true);
      return false;
    }
    return true;
  };

  const handleSearch = (e) => {
    if (handleProtectedAction()) {
      setSearchQuery(e.target.value);
    }
  };

  const handleFilter = () => {
    if (handleProtectedAction()) {
      // Your filter logic here
    }
  };

  const handleSort = (key) => {
    if (handleProtectedAction()) {
      setSortConfig((currentSort) => {
        if (currentSort.key === key) {
          if (currentSort.direction !== null) {
            return { key: "rank", direction: null };
          }
          return { key, direction: "asc" };
        }
        return { key, direction: "asc" };
      });
    }
  };

  const handleTraderClick = (traderId) => {
    if (handleProtectedAction()) {
      router.push(`/profile/${traderId}`);
    }
  };

  const formatFollowers = (followers) => {
    if (followers === "-") return "-";

    const num = parseInt(followers);

    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  const sortedTraders = [...tradersData.traders].sort((a, b) => {
    if (sortConfig.direction === null) {
      return a.rank - b.rank;
    }

    switch (sortConfig.key) {
      case "rank":
        return sortConfig.direction === "asc"
          ? a.rank - b.rank
          : b.rank - a.rank;

      case "followers":
        const aFollowers = a.followers === "-" ? -1 : parseInt(a.followers);
        const bFollowers = b.followers === "-" ? -1 : parseInt(b.followers);
        return sortConfig.direction === "asc"
          ? aFollowers - bFollowers
          : bFollowers - aFollowers;

      case "tokens":
        return sortConfig.direction === "asc"
          ? a.tokens - b.tokens
          : b.tokens - a.tokens;

      case "winRate":
        const aWinRate = parseFloat(a.winRate.replace("%", ""));
        const bWinRate = parseFloat(b.winRate.replace("%", ""));
        return sortConfig.direction === "asc"
          ? aWinRate - bWinRate
          : bWinRate - aWinRate;

      case "trades":
        return sortConfig.direction === "asc"
          ? a.trades.total - b.trades.total
          : b.trades.total - a.trades.total;

      case "avgBuy":
        return sortConfig.direction === "asc"
          ? parseFloat(a.avgBuy.sol) - parseFloat(b.avgBuy.sol)
          : parseFloat(b.avgBuy.sol) - parseFloat(a.avgBuy.sol);

      case "avgEntry":
        return sortConfig.direction === "asc"
          ? parseFloat(a.avgEntry) - parseFloat(b.avgEntry)
          : parseFloat(b.avgEntry) - parseFloat(a.avgEntry);

      case "avgHold":
        // Assuming avgHold is in a format that can be compared directly
        return sortConfig.direction === "asc"
          ? a.avgHold.localeCompare(b.avgHold)
          : b.avgHold.localeCompare(a.avgHold);

      case "realizedPNL":
        const aPNL =
          parseFloat(a.realizedPNL.sol) * (a.realizedPNL.isPositive ? 1 : -1);
        const bPNL =
          parseFloat(b.realizedPNL.sol) * (b.realizedPNL.isPositive ? 1 : -1);
        return sortConfig.direction === "asc" ? aPNL - bPNL : bPNL - aPNL;

      default:
        return 0;
    }
  });

  const getRankStyle = (rank) => {
    if (rank === 1) return "bg-[#CCAD59] text-black";
    if (rank === 2) return "bg-[#BFBFBF] text-black";
    if (rank === 3) return "bg-[#B2835F] text-black";
    return "";
  };

  const formatWallet = (wallet) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };

  // Define the default and clicked SVGs
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

  return (
    <div className="w-full px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button
            className={`px-5 py-2 rounded-3xl ${
              activeTab === "traders"
                ? "bg-[#25223D] text-white border border-[#464558]"
                : "text-[#6B7280]"
            }`}
            onClick={() => setActiveTab("traders")}
          >
            Traders
          </button>
          <button
            className={`px-5 py-2 rounded-3xl ${
              activeTab === "groups"
                ? "bg-[#25223D] text-white border border-[#464558]"
                : "text-[#6B7280]"
            }`}
            onClick={() => setActiveTab("groups")}
          >
            Groups
          </button>
        </div>

        {activeTab === "traders" ? (
          <>
            <div className="flex items-center space-x-2">
              {["Daily", "Weekly", "Monthly", "All-Time"].map((period) => (
                <button
                  key={period}
                  className={`px-5 py-2 font-medium rounded-3xl  ${
                    timeFrame === period
                      ? "bg-[#25223D] text-white border border-[#464558]"
                      : "text-[#6B7280]"
                  }`}
                  onClick={() => setTimeFrame(period)}
                >
                  {period}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name or wallet"
                  className="w-[320px] pl-10 pr-4 py-2 bg-[#060611] text-white rounded-full border border-[#464558] focus:outline-none focus:border-[#8B5CF6]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <button
                className="px-4 py-2 bg-[#25223D] rounded-full text-[#6B7280] border-[#464558] border hover:text-white relative"
                onClick={handleFilter}
              >
                <SlidersVertical size={20} />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#8B5CF6] rounded-full text-[10px] flex items-center justify-center text-white">
                  2
                </span>
              </button>
            </div>
          </>
        ) : (
          <div />
        )}
      </div>

      {/* Alerts Section */}
      <div className="mb-6 space-y-2">
        {!connected && (
          <div className="flex items-center justify-between p-4 bg-[#25223D] rounded-lg border border-[#464558]">
            <div className="flex items-center space-x-2">
              <AlertCircle size={20} className="text-[#8B5CF6]" />
              <span className="text-white">
                Connect your wallet to access all features
              </span>
            </div>
          </div>
        )}
        {/* ... other alerts ... */}
      </div>

      {/* Connect Wallet Modal */}
      {showConnectWalletModal && (
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

      {activeTab === "traders" ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-[#25223D] rounded-lg">
                <th className="py-3 px-4 text-sm font-medium text-white ">
                  <div className="flex items-center space-x-1">
                    <span style={{ userSelect: 'none' }}>Rank</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-sm font-medium text-white">
                  Trader
                </th>
                <th
                  className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                  onClick={() => handleSort("followers")}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span style={{ userSelect: 'none' }}>Followers</span>
                    {sortConfig.key === "followers" &&
                    sortConfig.direction !== null ? (
                      <ClickedArrow />
                    ) : (
                      <DefaultArrow />
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                  onClick={() => handleSort("tokens")}
                >
                  <div className="flex items-center space-x-1">
                    <span style={{ userSelect: 'none' }}>Tokens</span>
                    {sortConfig.key === "tokens" &&
                    sortConfig.direction !== null ? (
                      <ClickedArrow />
                    ) : (
                      <DefaultArrow />
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                  onClick={() => handleSort("winRate")}
                >
                  <div className="flex items-center space-x-1">
                    <span style={{ userSelect: 'none' }}>Win Rate</span>
                    {sortConfig.key === "winRate" &&
                    sortConfig.direction !== null ? (
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
                    <span style={{ userSelect: 'none' }}>Trades</span>
                    {sortConfig.key === "trades" &&
                    sortConfig.direction !== null ? (
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
                    <span style={{ userSelect: 'none' }}>Avg Buy</span>
                    {sortConfig.key === "avgBuy" &&
                    sortConfig.direction !== null ? (
                      <ClickedArrow />
                    ) : (
                      <DefaultArrow />
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                  onClick={() => handleSort("avgEntry")}
                >
                  <div className="flex items-center space-x-1">
                    <span style={{ userSelect: 'none' }}>Avg Entry</span>
                    {sortConfig.key === "avgEntry" &&
                    sortConfig.direction !== null ? (
                      <ClickedArrow />
                    ) : (
                      <DefaultArrow />
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-sm font-medium text-white cursor-pointer"
                  onClick={() => handleSort("avgHold")}
                >
                  <div className="flex items-center space-x-1">
                    <span style={{ userSelect: 'none' }}>Avg Hold</span>
                    {sortConfig.key === "avgHold" &&
                    sortConfig.direction !== null ? (
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
                    <span style={{ userSelect: 'none' }}>Realized PNL</span>
                    {sortConfig.key === "realizedPNL" &&
                    sortConfig.direction !== null ? (
                      <ClickedArrow />
                    ) : (
                      <DefaultArrow />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-sm font-medium text-white">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTraders.map((trader) => (
                <tr
                  key={trader.id}
                  className="border-b border-[#1E1B2C] bg-[#23242C] hover:bg-[#1E1B2C]/50 cursor-pointer"
                  onClick={() => handleTraderClick(trader.id)}
                >
                  <td className="py-4 px-4 text-end">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankStyle(
                        trader.rank
                      )}`}
                    >
                      {trader.rank}
                    </div>
                  </td>
                  <td className="py-4 px-4 ">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={trader.avatar || "/placeholder.png"}
                        alt={trader.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {trader.name}
                        </div>
                        <div className="text-sm text-[#6B7280]">
                          {formatWallet(trader.wallet)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-end">
                    <div className="flex flex-col items-end space-x-1">
                      <span className="text-white">
                        {formatFollowers(trader.followers)}
                      </span>
                      <span className="text-[#6B7280]">{trader.twitter}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-end text-white">
                    {trader.tokens}
                  </td>
                  <td className="py-4 px-4 text-end">
                    <span
                      className={
                        trader.winRate >= "50%"
                          ? "text-[#59CC6C]"
                          : "text-[#CC5959]"
                      }
                    >
                      {trader.winRate}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-end text-white">
                    <span className="text-[#59CC6C]">{trader.trades.wins}</span>
                    <span className="text-[#6B7280]">
                      /{trader.trades.total}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-end">
                    <div className="flex flex-col items-end justify-end">
                      <div className="flex flex-row items-center space-x-2">
                        <span className="text-white">{trader.avgBuy.sol}</span>
                        <Image
                          src="/solana.png"
                          alt="Solana"
                          width={16}
                          height={16}
                        />
                      </div>
                      <span className="text-[#6B7280]">
                        ${trader.avgBuy.usd}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-end text-white">
                    ${trader.avgEntry}
                  </td>
                  <td className="py-4 px-4 text-end text-white">
                    {trader.avgHold}
                  </td>
                  <td className="py-4 px-4 text-end">
                    <div className="flex items-center flex-col">
                      <div className="flex flex-row items-center space-x-2">
                        <span
                          className={
                            trader.realizedPNL.isPositive
                              ? "text-[#59CC6C]"
                              : "text-[#CC5959]"
                          }
                        >
                          {trader.realizedPNL.isPositive ? "+" : ""}
                          {trader.realizedPNL.sol}
                        </span>
                        <Image
                          src="/solana.png"
                          alt="Solana"
                          width={16}
                          height={16}
                        />
                      </div>
                      <span className="text-[#6B7280]">
                        ${trader.realizedPNL.usd}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-end">
                    <button className="text-[#8B5CF6] hover:text-[#9F7AEA]">
                      <svg
                        fill="#AA00FF"
                        width="20px"
                        height="20px"
                        viewBox="0 0 256 256"
                        id="Flat"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#AA00FF"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M229.65723,109.65723l-48,48A8.00066,8.00066,0,0,1,168,152V112a87.94718,87.94718,0,0,0-85.22852,65.99414,7.99961,7.99961,0,0,1-15.49414-3.98828A103.9414,103.9414,0,0,1,168,96V56a8.00066,8.00066,0,0,1,13.65723-5.65723l48,48A8.00122,8.00122,0,0,1,229.65723,109.65723ZM192,208H40V88a8,8,0,0,0-16,0V208a16.01833,16.01833,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Coming Soon!</h3>
            <p className="text-[#6B7280]">
              Group leaderboards are currently under development.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
