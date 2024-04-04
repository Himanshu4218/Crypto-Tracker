import axios from "axios";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { CoinList } from "../config/api";
import { useCurrency } from "../Contexts/CryptoContext";
import { numberWithCommas } from "../config/api";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const { symbol,loading,coins } = useCurrency();
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const coinsPerPage = 10;

  const handlePageNumber = (n) => {
    setPage(n);
  };

  const handleSearchInput = () => {
    return coins?.filter((coin) => {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  return (
    <div className="table-container">
      <div className="table-title">Cryptocurrency Prices by Market Cap</div>
      <div id="input">
        <input
          id="search"
          className="table-search"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
        <label htmlFor="search">Search for a Crypto Currency...</label>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th
                style={{
                  flexGrow: "2",
                  alignSelf: "flex-start",
                  textAlign: "start",
                }}
              >
                Coin
              </th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {handleSearchInput()
              .slice((page - 1) * coinsPerPage, coinsPerPage * page)
              .map((coin) => {
                const change = coin.price_change_percentage_24h.toFixed(2);
                const color = change>0? "rgb(14, 203, 129)" : "red";
                return (
                  <tr key={coin.id} onClick={() => navigate(`/coins/${coin.id}`)}>
                    <td
                      className="coin-info"
                      style={{ flexGrow: "2", alignSelf: "flex-start" }}
                    >
                      <div className="image">
                        <img src={coin.image} alt={coin.id} />
                      </div>
                      <div className="coin-detail">
                        <span>{coin.symbol}</span>
                        <span>{coin.name}</span>
                      </div>
                    </td>
                    <td>
                      {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                    </td>
                    <td style={{color: color}}>{change}%</td>
                    <td>
                      {symbol} {numberWithCommas(coin.market_cap.toString().slice(0,-6))}M
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <IoChevronBackOutline />
        </button>
        {[...Array(Math.ceil(handleSearchInput().length / coinsPerPage))].map((_, i) => {
          return (
            <button key={i + 1} onClick={() => handlePageNumber(i + 1)}>
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={page === Math.ceil(handleSearchInput().length / coinsPerPage)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default CoinsTable;
