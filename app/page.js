"use client";

import { useEffect, useState } from "react";
import CryptoCard from "../components/CryptoCard";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("market_cap");

  // Modal
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  // Fetch coins
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    )
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const sortedCoins = [...coins]
    .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === "price" ? b.current_price - a.current_price : b.market_cap - a.market_cap
    );

  // Open chart modal using sparkline last 7 days
  const openChart = async (coin) => {
    setSelectedCoin(coin);
    setChartLoading(true);

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&sparkline=true`
      );
      const data = await res.json();
      if (data[0] && data[0].sparkline_in_7d) {
        const last24h = data[0].sparkline_in_7d.price.slice(-24);
        setChartData(last24h);
      } else {
        setChartData([]);
      }
    } catch {
      setChartData([]);
    } finally {
      setChartLoading(false);
    }
  };

  const closeChart = () => {
    setSelectedCoin(null);
    setChartData([]);
  };

  return (
    <main className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Title */}
      <h1 className="text-white text-3xl sm:text-4xl font-bold text-center mb-8 drop-shadow-lg">
        🔎 CryptoTracker
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search cryptocurrency..."
        className="w-full sm:max-w-md mx-auto block mb-6 p-3 rounded-2xl border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sort Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSortBy("market_cap")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            sortBy === "market_cap"
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105"
              : "bg-gray-200 text-gray-800 hover:scale-105"
          }`}
        >
          Market Cap
        </button>

        <button
          onClick={() => setSortBy("price")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            sortBy === "price"
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105"
              : "bg-gray-200 text-gray-800 hover:scale-105"
          }`}
        >
          Price
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-200 mt-10 text-lg font-semibold">
          ❌ Failed to load data. Please try again later.
        </p>
      )}

      {/* Crypto Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCoins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} onClick={() => openChart(coin)} />
          ))}
        </div>
      )}

      {/* Chart Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-3xl p-6 w-11/12 max-w-3xl relative">
            <button
              onClick={closeChart}
              className="absolute top-4 right-4 text-white text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-white text-2xl font-bold mb-4">
              {selectedCoin.name} 24h Chart
            </h2>

            {chartLoading ? (
              <p className="text-white text-center">Loading chart...</p>
            ) : chartData.length > 0 ? (
              <Line
                data={{
                  labels: chartData.map((_, i) => `${i}h`),
                  datasets: [
                    {
                      label: `${selectedCoin.symbol.toUpperCase()} Price`,
                      data: chartData,
                      borderColor: "rgba(99, 102, 241, 1)",
                      backgroundColor: "rgba(99, 102, 241, 0.2)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true, position: "top" } },
                }}
              />
            ) : (
              <p className="text-white text-center">No data available</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
