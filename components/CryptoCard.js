export default function CryptoCard({ coin }) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-5 flex flex-col items-center text-center">
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
  );
}
