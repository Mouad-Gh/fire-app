import axios from 'axios';
import { useEffect, useState } from 'react'
import { Bar, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPie } from 'victory';
import Navbar from './components/Navbar';



function App() {
  const [burnedStargaze, setBurnedStargaze ] = useState(null);
  const [distributedStargaze, setDistributedStargaze ] = useState(null);
  //console.log("burn",burnedStargaze, burnedStargaze[0][1], new Date(burnedStargaze[0][0]));
  console.log("distr",distributedStargaze);
  useEffect(()=>{
    const getData = async() =>{
      
      const burnData = await axios.post("http://localhost:4000/api",{
        apiUrl: "https://metabase.constellations.zone/api/public/card/3f4acb97-796f-40ae-af2c-d3163d09667a/query"
      });
      setBurnedStargaze([...burnData.data.slice(Math.max(burnData.data.length - 6, 0))]);
      
       //distributed stargaze api call
      const distributedCoin = await axios.post("http://localhost:4000/api",{
        apiUrl: "https://metabase.constellations.zone/api/public/card/dfedf8e8-fd13-4cfb-9d87-e6a13ab45a7f/query"
      });

      setDistributedStargaze([...distributedCoin.data.slice(Math.max(distributedCoin.data.length - 6, 0))]);

    }
    const intervalId = setInterval(() => {
      getData();
      //console.log("interval", burnedStargaze[5][2]);
    }, 5000);
  
    return () => clearInterval(intervalId);
    
  }, [])

  //
  const dateFormat = (date) => {
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm ;

  }
  
  if(!burnedStargaze || !distributedStargaze) return ;
  return (
    <div className="select-none font-poppins">
      <Navbar />
      <main className="p-10 m-auto">
        <div className=" flex flex-col md:flex-row gap-3 justify-around">
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-xl mb-3">Stargaze Fair Burn 🔥</h2>
            <p className="">Real-time tracker of burned & distributed stars</p>
          </div>
          <div className=" p-5 border border-bleu flex flex-col items-center justify-center text-xl gap-3">
            <h3 className="font-poppins capitalize">Total amount burned</h3>
            <span className="uppercase font-bold">{burnedStargaze.at(-1)[2]} stars</span>
          </div>
          <div className="p-4 border border-lightBleu flex flex-col items-center justify-center text-xl gap-3">
            <h3 className="font-poppins capitalize">Total amount distributed</h3>
            <span className="uppercase font-bold">{distributedStargaze.at(-1)[2]} stars</span>
          </div>
        </div>

        <div className="my-10 mx-auto grid gap-10 grid-cols-mobile" aria-label='charts'>
          
            <div className="relative py-4 px-6 border-4 border-bleu shadow-card overflow-visible">
              <VictoryChart height={300} width={370} className="overflow-visible"
                domainPadding={{ x: 20, y: [70, 20] }}
                scale={{ x: "time" }}
              >
                <VictoryAxis
                  // tickValues specifies both the number of ticks and where
                  // they are placed on the axis
                  tickFormat={(x) => dateFormat(x)}
                />
                <VictoryAxis
                  dependentAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${x / 1000}k`)}
                />
                <VictoryBar
                  dataComponent={
                    <Bar />
                  }
                  style={{data: { fill: "#fdf59f" }}}
                  data={[
                    { x: new Date(burnedStargaze[0][0]), y: burnedStargaze[0][1] },
                    { x: new Date(burnedStargaze[1][0]), y: burnedStargaze[1][1] },
                    { x: new Date(burnedStargaze[2][0]), y: burnedStargaze[2][1] },
                    { x: new Date(burnedStargaze[3][0]), y: burnedStargaze[3][1] },
                    { x: new Date(burnedStargaze[4][0]), y: burnedStargaze[4][1] },
                    { x: new Date(burnedStargaze[5][0]), y: burnedStargaze[5][1] }
                  ]}
                />
              </VictoryChart>
              <h3 className="absolute top-0 mx-auto capitalize mt-6 text-center">Burn History for the last 6 days </h3>
            </div>
            <div className="relative py-4 px-6 border-4 border-bleu shadow-card overflow-visible">
              <VictoryChart height={300} width={370} className="overflow-visible"
                domainPadding={{ x: 20, y: [70, 20] }}
                scale={{ x: "time" }}
              >
                <VictoryAxis
                  // tickValues specifies both the number of ticks and where
                  // they are placed on the axis
                  
                  tickFormat={(x) => dateFormat(x)}
                />
                <VictoryAxis
                  dependentAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${x / 1000}k`)}
                />
                <VictoryBar
                  dataComponent={
                    <Bar />
                  }
                  style={{data: { fill: "#fdf59f" }}}
                  data={[
                    { x: new Date(distributedStargaze[0][0]), y: distributedStargaze[0][1] },
                    { x: new Date(distributedStargaze[1][0]), y: distributedStargaze[1][1] },
                    { x: new Date(distributedStargaze[2][0]), y: distributedStargaze[2][1] },
                    { x: new Date(distributedStargaze[3][0]), y: distributedStargaze[3][1] },
                    { x: new Date(distributedStargaze[4][0]), y: distributedStargaze[4][1] },
                    { x: new Date(distributedStargaze[5][0]), y: distributedStargaze[5][1] }
                  ]}
                />
              </VictoryChart>
              <h3 className="absolute top-0 mx-auto capitalize mt-6 text-center">Distributed History for the last 6 days </h3>
            </div>

            <div className='relative py-4 px-6 border-4 border-bleu shadow-card '>
              <svg viewBox="0 0 400 400" >
                <VictoryPie
                  colorScale={["#71b1e0", "#9ef0cb"]}
                  standalone={false}
                  width={400} height={400}
                  data={[
                    { x: 'distributed', y: distributedStargaze[5][2] }, { x: "burned", y: burnedStargaze[5][2] }
                  ]}
                  innerRadius={68} labelRadius={75}
                  style={{ labels: { fontSize: 15, fill: "white" } }}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 20 }}
                  x={200} y={200}
                  text="vs"
                />
              </svg>
              <h3 className="absolute top-0 mx-auto capitalize mt-6 text-center">Distributed History for the last 6 days </h3>
            </div>
          

        </div>
      </main>
    </div>
  )
}

export default App


/**
 * import axios from 'axios';
import { useEffect, useState } from 'react'
import { VictoryBar, VictoryChart } from 'victory';

const getAxios = async(apiUrl) => {
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const { data } = await axios.get(corsProxyUrl + apiUrl, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  return data.data.rows ;
}

function App() {
  const [burnedStargaze, setBurnedStargaze ] = useState(null);
  const [distributedStargaze, setDistributedStargaze ] = useState(null);
  console.log("burn",burnedStargaze);
  useEffect(()=>{
    const getData = async() =>{
      const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = 'https://metabase.constellations.zone/api/public/card/3f4acb97-796f-40ae-af2c-d3163d09667a/query';
      const burnres = await axios.get(corsProxyUrl + apiUrl, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      const burnData = burnres.data.data.rows ;
      setBurnedStargaze([...burnData.slice(Math.max(burnData.length - 5, 0))]);

      //distributed stargaze api call
      const distributedres = await axios.get(corsProxyUrl + apiUrl, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      const burnData = distributedres.data.data.rows ;
      setBurnedStargaze([...burnData.slice(Math.max(burnData.length - 5, 0))]);

    }
    getData()
  }, [])
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  if(!burnStargaze) return ;
  return (
    <div className="App p-10 m-auto">
      <div className=" flex justify-around">
        <div className="p-4 border border-bleu flex flex-col items-center-justify-center gap-3">
          <h3 className="capitalize">Total amount burned</h3>
          <span className="uppercase font-bold">{burnedStargaze.at(-1)[2]} stars</span>
        </div>
        <div className="p-4 border bg-lightBleu flex flex-col items-center-justify-center gap-3">
          <h3 className="capitalize">Total amount distributed</h3>
          <span className="uppercase font-bold">{burnedStargaze.at(-1)[2]} stars</span>
        </div>
      </div>
      <VictoryChart domainPadding={20}>
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    </div>
  )
}

export default App

 */