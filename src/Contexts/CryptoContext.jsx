import { auth,db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot,doc } from "firebase/firestore";
import { CoinList } from "../config/api";
import axios from 'axios';
import { useContext, createContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);
function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [coins,setCoins] = useState([])
  const [loading,setLoading] = useState(false)
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    if (user) {
        const coinRef = doc(db, "watchlist", user?.uid);
        var unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            setWatchlist(coin.data().coins);
          } else {
            console.log("No Items in Watchlist");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
  },[user])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchCoins = async() => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  }
  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "INR") {
      setSymbol("₹");
    }
    fetchCoins()
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        setUser,
        watchlist,
        setWatchlist,
        loading,
        setLoading,
        coins
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export default CryptoContext;
