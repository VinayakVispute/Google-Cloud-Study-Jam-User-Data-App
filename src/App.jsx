/** @format */

import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file here
import Navbar from "./componets/Navbar";
import jsonData from "./data.json"; // Import the JSON data

function App() {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [totalStarted, setTotalStarted] = useState(0);
  const [totalReg, setTotalReg] = useState(0);

  const compare = (a, b) => {
    if (
      parseInt(a["# of Courses Completed"]) >
      parseInt(b["# of Courses Completed"])
    ) {
      return -1;
    }
    if (
      parseInt(a["# of Courses Completed"]) <
      parseInt(b["# of Courses Completed"])
    ) {
      return 1;
    }
    return 0;
  };

  const updateData = (filterValue) => {
    let filteredData = jsonData.data;
    if (filterValue !== "") {
      filteredData = jsonData.data.filter((el) =>
        el["Student Name"].toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    filteredData.sort(compare);

    let totalStartedCount = 0;
    filteredData.forEach((d, i) => {
      totalStartedCount += d["Redemption Status"] === "Yes" ? 1 : 0;
    });

    setFilter(filterValue);
    setData(filteredData);
    setTotalStarted(totalStartedCount);
    setTotalReg(filteredData.length);
  };

  useEffect(() => {
    updateData("");
  }, []);

  const handleInputChange = (event) => {
    updateData(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center bg-gray-900 text-white">
        <div className="container mx-auto py-20">
          <div className="text-center my-5">
            <div className="relative mx-auto w-3/4 mt-5">
              <input
                id="input"
                className="px-4 py-2 w-full text-black rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="gccp_search"
                value={filter}
                onChange={handleInputChange}
                placeholder="Search by Name"
              />
              <i className="absolute top-2 right-2 text-gray-400 fas fa-search"></i>
            </div>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">
                  <b>Sr. No.</b>
                </th>
                <th className="px-4 py-2">
                  <b>Name</b>
                </th>
                <th className="px-4 py-2">
                  <b>Redemption Status</b>
                </th>
                <th className="px-4 py-2">
                  <b>Course Completed</b>
                </th>
                <th className="px-4 py-2">
                  <b>GenAI Completed</b>
                </th>
                <th className="px-4 py-2">
                  <b>Total Completion</b>
                </th>
              </tr>
            </thead>
            <tbody id="gccp_body">
              {data.map((d, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">
                    <a
                      href={d["Google Cloud Skills Boost Profile URL"]}
                      target="_blank"
                      className="text-blue-500"
                    >
                      {d["Student Name"]}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    {d["Redemption Status"] === "Yes" ? "✅" : "⚠️"}
                  </td>
                  <td className="px-4 py-2">{d["# of Courses Completed"]}</td>
                  <td className="px-4 py-2">
                    {d["# of GenAI Game Completed"]}
                  </td>
                  <td className="px-4 py-2">
                    {d["Total Completions of both Pathways"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;