export default function CryptoCard({ coin }) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="relative w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center text-center">
      {/* Glowing border */}
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30 blur-xl animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center">
        <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-3" />
        <h2 className="text-white font-bold text-lg">
          {coin.name}{" "}
          <span className="text-gray-200 text-sm uppercase">
            ({coin.symbol})
          </span>
        </h2>

        <p className="text-white text-xl font-semibold mt-2">
          ${coin.current_price.toLocaleString()}
        </p>

        <p
          className={`mt-1 font-medium ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>

        <p className="text-gray-300 text-xs mt-2">
          Market Cap: ${coin.market_cap.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
