import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import '../Styles/Performance.css'

const Performance = () => {
  const barData = [
    { name: "Algorithms structures", score: 85.3 },
    { name: "Object programming", score: 64.7 },
    { name: "Database programs", score: 84.2 },
    { name: "Web development", score: 45.6 },
    { name: "Mobile application", score: 48.5 },
    { name: "Machine learning", score: 76.4 },
  ];

  // Data for Pie Chart
  const pieData = [
    { name: "Algorithms", value: 85.3 },
    { name: "Object ", value: 64.7 },
    { name: "Database ", value: 84.2 },
    { name: "Web ", value: 45.6 },
    { name: "Mobile", value: 48.5 },
    { name: "Machine ", value: 76.4 },
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0", "#3F51B5"];

  return (
    <>
   
     {/* Pie Chart */}
     <div style={{ flex: "1 1 45%", backgroundColor: "#2c2c3e",marginLeft:"350px", width:"330px", borderRadius: "10px", padding: "10px",position:"relative",bottom:"29%" ,right:"355px",height:"420px"}}>
          <h4>Performance Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: "white" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
      style={{
        backgroundColor: "rgb(70, 93, 169)",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        width:"300px",
        margin: "0 auto",
        marginTop:"70px",
        marginLeft:"20px",
        height:"670px",
        position:"relative",
bottom:"800px",
left:"390px",
width:"370px"
        
      }}
    >
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
        <h2>Performance</h2>
        <select
          style={{
            backgroundColor: "#2c2c3e",
            color: "white",
            border: "none",
            padding: "4px",
            borderRadius: "5px",
            marginTop:"30px"
          }}
        >
          <option style={{marginTop:"30px"}}>December</option>
          <option>November</option>
          <option>October</option>
        </select>
      </div>

      {/* Highlighted Score Section */}
      <div style={{ margin: "20px 0", fontSize: "40px", fontWeight: "bold" }}>
        95.4 <span style={{ fontSize: "20px", fontWeight: "normal" }}>Introduction to programming</span>
      </div>

      <button
        style={{
          backgroundColor: "#3F51B5",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        All Lessons
      </button>

      {/* Charts Section */}
      <div style={{  display:"flex", height:"100px", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
        {/* Bar Chart */}
        <div style={{ flex: "1 1 45%", backgroundColor: "#2c2c3e", width:"550px", marginBottom:"30px", borderRadius: "10px", padding: "15px" }}>
          <h4>Lesson Scores</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: "white" }} />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

       
      
    </div>
    </div>
        
    </>
  );
};

export default Performance;
