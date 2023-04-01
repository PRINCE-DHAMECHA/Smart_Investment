import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Button from "../components/Button";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  LineSeries,
} from "@syncfusion/ej2-react-charts";

function Sip() {
  const [selectedComponent, setSelectedComponent] = useState("sipcalc");
  const { currentColor, currentMode } = useAppContext();
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [lumpsum, setLumpSum] = useState("");
  const [year, setYear] = useState([]);
  const [yeararr, setYeararr] = useState([]);
  const [tinvestedarr, setTinvestedarr] = useState([]);
  const [tyearlyi, setTyearlyi] = useState([]);
  const [yearlymat, setYearlymat] = useState([]);
  const [Amtdp, setAmtdp] = useState([]);
  const [returnsEarned, setReturnsEarned] = useState([]);
  const [yearend, setYearEnd] = useState([]);
  const [maturityValue, setMaturityValue] = useState("0");
  const [chartData, setChartData] = useState([]);

  const calculateMaturityValue = () => {
    // parses the input values of lumpsum, principal, interestRate, and tenure to float
    const l = parseFloat(lumpsum);
    let p = parseFloat(principal);
    const r = parseFloat(interestRate);
    const n = parseFloat(tenure);

    //const maturity = p * (((Math.pow(1 + (r)), 12 * n) - 1) / (r));
    let totalp = l; //total principal given initially
    //let yearlymat = []; // yearly maturity
    let yearlymati = l; //yearly maturity total interest
    let totalInt = 0;
    let st = l;
    for (var i = 1; i <= n; i++) {
      st += p * 12;
      yearlymati += p;
      let temp = yearlymati;
      for (let j = 1; j <= 12; j++) {
        totalInt += temp * (r / 1200);
        temp += p;
      }
      tyearlyi.push(totalInt);
      tinvestedarr.push(st);
      yearlymati += totalInt + 11 * p;
      yearlymat.push(yearlymati);
    }
    console.log("yearlymat", yearlymat);
    console.log("yearlumati", yearlymati);
    setMaturityValue(yearlymati);
    const tamt = n * 12 * p + l;
    setYear([...year, n]);
    console.log("year", year);
    setAmtdp([...Amtdp, tamt]);
    console.log("tamt and amtdp", tamt);
    console.log("tinvestedarr", tinvestedarr);
    setReturnsEarned([...returnsEarned, totalInt]);
    setYearEnd([...yearend, yearlymati]);
    for (let i = 1; i <= n; i++) {
      yeararr.push(i);
    }
    console.log("arr is", yeararr);
  };

  useEffect(() => {
    console.log(`Selected component: ${selectedComponent}`);
  }, [selectedComponent]);

  useEffect(() => {
    setSelectedComponent("sipcalc");
    setPrincipal("");
    setInterestRate("");
    setTenure("");
    setLumpSum("");
    setYear([]);
    setYeararr([]);
    setTinvestedarr([]);
    setTyearlyi([]);
    setYearlymat([]);
    setAmtdp([]);
    setReturnsEarned([]);
    setYearEnd([]);
    setMaturityValue("0");
  }, []);

  const handleChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <div>
      <div className=" text-lg:text-3xl text-2xl font-extrabold pb-2 dark:text-white text-black border-solid border-b-2 m-4 text-center">
        Systematic Investment Plan
        <select
          className="ml-10 outline-none dark:text-black bg-white"
          value={selectedComponent}
          onChange={handleChange}
        >
          <option value="sipcalc">Input</option>
          <option value="sipreport">Report</option>
          <option value="sipgraph">Graph</option>
          <option value="sipinfo">Info</option>
        </select>
      </div>
      {selectedComponent === "sipcalc" && (
        <Sipcalc
          lumpsum={lumpsum}
          principal={principal}
          interestRate={interestRate}
          tenure={tenure}
          currentColor={currentColor}
          maturityValue={maturityValue}
          calculateMaturityValue={calculateMaturityValue}
          setLumpSum={setLumpSum}
          setPrincipal={setPrincipal}
          setInterestRate={setInterestRate}
          setTenure={setTenure}
        />
      )}
      {selectedComponent === "sipreport" && (
        <Sipreport
          yeararr={yeararr} //1
          tinvestedarr={tinvestedarr} //2
          tyearlyi={tyearlyi} //3
          returnsEarned={yearlymat}
          yearend={yearend}
        />
      )}
      {selectedComponent === "sipgraph" && (
        <Sipgraph
          yeararr={yeararr} //1
          tinvestedarr={tinvestedarr} //2
          tyearlyi={tyearlyi} //3
          returnsEarned={yearlymat}
        />
      )}
      {selectedComponent === "sipinfo" && <Sipinfo />}
    </div>
  );
}

function Sipcalc(props) {
  const { currentColor } = useAppContext();
  return (
    <div className="md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-5 md:p-6 dark:bg-secondary-dark-bg rounded-3xl flex flex-col lg:flex-col lg:items-center">
      <div
        style={{
          borderLeft: `2px solid ${currentColor}`,
          borderRadius: "10px",
        }}
        className="mb-10 relative flex flex-row p-3"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-row p-3">
            <p className="w-3/4 md:text-xl text-base m-auto -ml-0 block  mr-0 tarcking-tight dark:text-white text-black">
              Lumpsum Amount:
            </p>
            <input
              className="w-1/3 h-8 mx-auto  text-center border-1 border-solid border-black rounded-md"
              type="number"
              id="lumpsum"
              value={props.lumpsum}
              onInput={(e) => props.setLumpSum(e.target.value)}
            />
            <br />
            <br />
          </div>
          <div className="flex flex-row p-3">
            <p className="w-3/4 md:text-xl text-base m-auto -ml-0 block  mr-0 tarcking-tight dark:text-white text-black">
              Monthly Deposit:
            </p>
            <input
              className="w-1/3 h-8 mx-auto  text-center border-1 border-solid border-black rounded-md"
              type="number"
              id="principal"
              value={props.principal}
              onInput={(e) => props.setPrincipal(e.target.value)}
            />
            <br />
            <br />
          </div>
          <div className="flex flex-row p-3">
            <p className="w-3/4 md:text-xl text-base m-auto -ml-0 block  mr-0 tarcking-tight dark:text-white text-black">
              Expected Return:
            </p>
            <input
              className="w-1/3 h-8 mx-auto  text-center border-1 border-solid border-black rounded-md"
              type="number"
              id="interestRate"
              value={props.interestRate}
              onInput={(e) => props.setInterestRate(e.target.value)}
            />
            <br />
            <br />
          </div>
          <div className="flex flex-row p-3">
            <p className="w-3/4 md:text-xl text-base m-auto -ml-0 block  mr-0 tarcking-tight dark:text-white text-black">
              Tenure (in years):
            </p>
            <input
              className="w-1/3 h-8 mx-auto  text-center border-1 border-solid border-black rounded-md"
              type="number"
              id="tenure"
              value={props.tenure}
              onInput={(e) => props.setTenure(e.target.value)}
            />
            <br />
            <br />
          </div>
          <div className="text-center">
            <p className="dark:text-white text-black font-bold p-2 items-center text-2xl m-auto">
              Maturity Value: {Number(props.maturityValue).toFixed(2)}
            </p>
          </div>
          <br />
          <br />
          <div className="text-center">
            <button
              style={{ background: props.currentColor }}
              className="m-auto flex gap-2 p-2 px-7 text-xl mb-5 rounded-md text-white"
              onClick={props.calculateMaturityValue}
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Sipreport(props) {
  const year = props.yeararr;
  const Amtdp = props.tinvestedarr;
  const returnsEarned = props.tyearlyi;
  const yearend = props.returnsEarned;
  if (!returnsEarned) {
    console.log("null");
    return null; // or return an error message
  }
  return (
    <div className="md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg rounded-3xl flex flex-col lg:flex-col lg:items-center">
      <div className="mb-10 relative flex flex-row">
        <table className="dark:text-white p-4">
          <thead>
            <tr>
              <th>Year</th>
              <th>Amt Deposited</th>
              <th>Returns Earned</th>
              <th>Year end balance</th>
            </tr>
          </thead>
          <tbody>
            {Amtdp.map((val, index) => (
              <tr className="p-5" key={index}>
                <td>{Number(year[index]).toFixed(2)}</td>
                <td>{Number(Amtdp[index]).toFixed(2)}</td>
                <td>{Number(returnsEarned[index]).toFixed(2)}</td>
                <td>{Number(yearend[index]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Sipgraph(props) {
  const { yeararr, tinvestedarr, tyearlyi, returnsEarned } = props;
  const { currentColor, currentMode } = useAppContext();
  const primaryxAxis = {
    labelPlacement: "OnTicks",
    majorGridLines: {
      color: currentColor,
      width: 0,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };
  const primaryyAxis = {
    majorGridLines: {
      width: 0.1,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
    rangePadding: "Additional",
  };
  const data = yeararr.map((y, index) => {
    return {
      year: y,
      invested: tinvestedarr[index],
      maturity: tyearlyi[index],
      returns: returnsEarned[index],
    };
  });

  return (
    <div className="md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg rounded-3xl flex flex-col lg:flex-col lg:items-center">
      <div className="mb-10 relative flex flex-row dark:text-white">
        <ChartComponent
          title="SIP Growth Chart"
          titleStyle={{ color: currentMode === "Dark" ? "white" : "black" }}
          legendSettings={{ visible: true }}
          chartArea={{ border: { width: 0 } }}
          background="none"
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
        >
          <Inject services={[LineSeries, Tooltip]}></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Line"
              dataSource={data}
              xName="year"
              yName="invested"
              name="Invested Amount"
            ></SeriesDirective>
            <SeriesDirective
              type="line"
              dataSource={data}
              xName="year"
              yName="maturity"
              name="Maturity Value"
            ></SeriesDirective>
            <SeriesDirective
              type="line"
              dataSource={data}
              xName="year"
              yName="returns"
              name="Maturity Value"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
function Sipinfo() {
  const [selected, setSelected] = useState(null);
  const data = [
    {
      question: "What is SIP?",
      answer:
        "SIP stands for Systematic Investment Plan. SIP is a systematic method of investing your money in mtual funds. A SIP is a planned approach towards investment and it helps you to develop the habit of saving and building wealth for the future.",
    },
    {
      question: "How does SIP works?",
      answer:
        "Choose a mutual fund scheme that you want to invest. Decide the investment amount and the term. Decide the investment frequency . As you invest, units are allocated as per ongoing market rate (called NAV or Net Asset Value). You will get more units when the price is high. At the end of the term, you can redeem the units and get the accumulated amount. You also have the option to redeem partially and extend the investment further.",
    },
    {
      question: "Is SIP financial product?",
      answer:
        "No. SIP is not a financial product. It is just a method to invest your money in Mutual Funds scheme that allows individuals to invest a fixed amount of money at regular intervals, typically on a monthly basis, into mutual funds or other investment vehicles. It is a popular method for long-term wealth creation and is commonly used by individuals to achieve their financial goals.",
    },
    {
      question: "Features",
      answer:
        "Regular Investments: SIP allows investors to invest regularly in a mutual fund scheme, typically on a monthly basis. \\n Flexibility: Investors have the flexibility to choose the amount they wish to invest, the frequency of investment, and the duration of the investment period. Rupee-Cost Averaging: SIP uses the rupee-cost averaging method, which involves investing a fixed amount of money at regular intervals, regardless of the market conditions. This helps to reduce the impact of market volatility on the investment. Long-term Investment: SIPs are designed for long-term investments, typically for a period of 5 years or more. This helps to build wealth over a period of time and achieve long-term financial goals. Diversification: SIP allows investors to diversify their portfolio by investing in multiple mutual fund schemes across different asset classes and sectors. Automatic Investment: SIP investments are automated and can be scheduled in advance. This ensures that the investor continues to invest regularly, without having to worry about manually making the investment.Affordable: SIPs are an affordable investment option as they allow investors to invest small amounts of money on a regular basis. This makes it accessible to a wide range of investors, including those with a small investment capacity. ",
    },
    {
      question: "Drawbacks of SIP",
      answer:
        "Market Risk: Like any other mutual fund investment, SIPs are also subject to market risks. The value of your investment may go up or down depending on market conditions. No Guaranteed Returns: There is no guarantee that you will earn returns on your investment through SIPs. The returns are dependent on the performance of the mutual fund scheme. Exit Load: If you withdraw your investment before the minimum holding period, you may have to pay an exit load. The exit load can range from 0.5% to 2% of the investment amount. Mutual Fund Manager Risk: The performance of a mutual fund is dependent on the skills and expertise of the fund manager. If the fund manager underperforms, it can negatively impact the returns on your investment. Over Diversification: Investing in too many mutual fund schemes through SIPs can lead to over diversification, which can dilute the returns on your investment.",
    },
  ];
  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <>
      {data.map((item, i) => (
        <div className="md:m-5 mb-5 mt-5 md:mx-5 mx-5 p-2 md:p-4 dark:bg-secondary-dark-bg rounded-3xl flex flex-col lg:flex-col lg:items-start">
          <div className="m-auto relative flex flex-col">
            <div
              className="flex flex-row dark:text-white justify-between cursor-pointer text-lg "
              onClick={() => toggle(i)}
            >
              {item.question}
              <br />
              <br />
              <span className="items-end">
                <div>{selected === i ? "-" : "+"}</div>
              </span>
            </div>
            <div
              className={`dark:text-white h-auto transition-all duration-500 ${
                selected === i ? "max-h-screen" : "max-h-0 overflow-hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default Sip;
