import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

function App() {
  const [records, setRecords] = useState([] as any[]);
  const [barRecords, setBarRecords] = useState([] as any[]);

  const fetchRecords = async () => {
    const response = await axios.get("http://localhost:8080");
    const rawRecords = response.data;

    const todayRecords = rawRecords.filter((record: any) => {
      const today = new Date();
      const recordDate = new Date(record.started_at);
      return (
        today.getDate() === recordDate.getDate() &&
        today.getMonth() === recordDate.getMonth() &&
        today.getFullYear() === recordDate.getFullYear()
      );
    });
    let data = todayRecords.map((record: any) => {
      return [
        "Caja1",
        "",
        new Date(record.started_at),
        new Date(record.ended_at),
      ];
    });
    setRecords(data);

    let dict: any = {};
    data = rawRecords.map((record: any) => {
      const cosa = new Date(record.started_at);
      const month = new Date(record.started_at).toLocaleString("default", {
        month: "long",
      });

      if (month in dict) {
        dict[month] += 1;
      } else {
        dict[month] = 1;
      }
    });

    let barRecords = [];
    for (const key in dict) {
      barRecords.push([key, dict[key]]);
    }
    setBarRecords(barRecords);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const options = {
    timeline: { showRowLabels: false },
    avoidOverlappingGridLines: false,
  };

  const data = [
    [
      { type: "string", id: "Room" },
      { type: "string", id: "Name" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
    ...records,
  ];

  const barData = [["Month", "Popotimes"], ...barRecords];
  console.log(barRecords);

  const options2 = {
    chart: {
      title: "Instancias Al Mes",
    },
  };

  return (
    <div className="App w-4/5 m-auto flex flex-col mt-[200px] items-center">
      <img
        src="https://www.santevet.es/uploads/images/es_ES/razas/gatocomuneuropeo.jpeg"
        className="w-[500px] h-[500px] object-cover rounded-full m-auto shadow-lg border-[5px] border-black"
      />
      <div className="text-center">
        <h1 className=" font-bold text-2xl">Nombre del Gato</h1>
        <h1 className="text-lg">10 anos</h1>
      </div>

      <div className="w-full my-10">
        <div className="border-2 h-fit p-4">
          <Chart
            chartType="Timeline"
            data={data}
            width="100%"
            height="100px"
            options={options}
          />
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={barData}
            options={options2}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
