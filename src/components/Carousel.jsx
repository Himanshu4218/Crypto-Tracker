import { TrendingCoins } from "../config/api";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCurrency } from "../Contexts/CryptoContext";
import { numberWithCommas } from "../config/api";
import { useNavigate} from 'react-router-dom'
import AliceCarousel from "react-alice-carousel";

const Carousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const navigate = useNavigate()  
  const { currency, symbol } = useCurrency();

  const fetchData = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
    750:{
      items: 3,
    },
    1024:{
      items: 4
    }
  };

  const items = trendingCoins.map((coins) => {
    const change = coins?.price_change_percentage_24h?.toFixed(2);
    const color = change > 0 ? "rgb(14, 203, 129)" : "red";
    return (
      <div className="trending-coins" onClick={() => navigate(`/coins/${coins.id}`)}>
        <img src={coins.image} alt={coins.id} />
        <div>
          <span style={{textTransform: "uppercase"}}>{coins.symbol}</span> &nbsp;
          <span style={{ color: color }}>
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
        </div>
        <div className="price" style={{fontSize: "20px"}}>
          {symbol}
          {numberWithCommas(coins.current_price.toFixed(2))}
        </div>
      </div>
    );
  });


  useEffect(() => {
    fetchData();
  }, [currency]);
  return (
    <div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
