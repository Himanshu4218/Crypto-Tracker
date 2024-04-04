import axios from "axios";
import { useParams } from "react-router-dom";
import Coinchart from "../components/Coinchart.jsx";
import { useEffect, useState } from "react";
import { useCurrency } from "../Contexts/CryptoContext";
import { numberWithCommas } from "../config/api";
import { SingleCoin } from "../config/api";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const { currency, symbol, user, setAlert, watchlist } = useCurrency();
  const [loading, setLoading] = useState(false);

  const isInWatchlist = watchlist.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.length ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );
      setAlert({
        open: true,
        message: "Coin Added Successfully",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
      });
    }
  };

  const removeFromWatchlist = async() => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  const fetchCoin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  return (
    <div className="coinpage">
      {loading ? (
        "...loading"
      ) : (
        <div className="info">
          <img src={coin?.image?.large} alt={coin.id} />
          <span className="name">{coin.name}</span>
          <p>{coin.description?.en.split(".")[0]}.</p>
          <div className="market-info">
            <div className="rank">
              <span>Rank:</span> &nbsp;{numberWithCommas(coin?.market_cap_rank)}
            </div>
            <div className="price">
              <span>Currency Price:</span> &nbsp;{symbol}{" "}
              {coin?.market_data?.current_price?.[currency.toLowerCase()]
                ? numberWithCommas(
                    coin?.market_data?.current_price[currency.toLowerCase()]
                  )
                : "N/A"}
            </div>
            <div className="market-cap">
              <span>Market Cap:</span> &nbsp;{symbol}{" "}
              {coin?.market_data?.market_cap?.[currency.toLowerCase()]
                ? numberWithCommas(
                    coin?.market_data?.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )
                : "N/A"}
              M
            </div>
          </div>
          {user && (
            <button
              className={isInWatchlist? "removefromwatchlist" :"addtowatchlist"}
              onClick={isInWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {isInWatchlist ? "Remove From Watchlist" : "Add To Watchlist"}
            </button>
          )}
        </div>
      )}
      {coin.id && <Coinchart coin={coin} />}
    </div>
  );
};

export default CoinPage;
