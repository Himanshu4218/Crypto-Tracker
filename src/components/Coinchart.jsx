import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import Spinner from "./Spinner.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import { useCurrency } from "../Contexts/CryptoContext";
import SelectedButton from "./SelectedButton.jsx";

const Coinchart = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useCurrency();

  ChartJS.register(
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Title
  );

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, [days, currency]);
  return (
    <div className="chart">
      {historicData.length ===0 ? (
        <Spinner/>
      ) : (
        <>
          <Line
            data={{
              labels: historicData?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData?.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="btns">
            {chartDays.map((data) => (
              <SelectedButton
                key={data.value}
                data={data}
                onClick={() => setDays(data.value)}
                selected={days === data.value}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Coinchart;
