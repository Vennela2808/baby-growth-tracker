import { useState } from "react";

import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer
} from "recharts";

function Growth(){

 const [records,setRecords] = useState([])

 const [weight,setWeight] = useState("")
 const [height,setHeight] = useState("")

 const addRecord=(e)=>{

  e.preventDefault()

  const newData={
   month:records.length+1,
   weight:Number(weight),
   height:Number(height)
  }

  setRecords([...records,newData])

  setWeight("")
  setHeight("")
 }

 return(

  <div className="container">

   <div className="card">

    <h3>Add Growth</h3>

    <form onSubmit={addRecord}>

     <input
      placeholder="Weight (kg)"
      value={weight}
      onChange={(e)=>setWeight(e.target.value)}
     />

     <input
      placeholder="Height (cm)"
      value={height}
      onChange={(e)=>setHeight(e.target.value)}
     />

     <button>Add</button>

    </form>

   </div>


   <div className="card">

    <h3>Growth Chart</h3>

    <ResponsiveContainer width="100%" height={300}>

     <LineChart data={records}>

      <CartesianGrid strokeDasharray="3 3"/>

      <XAxis dataKey="month"/>

      <YAxis/>

      <Tooltip/>

      <Line dataKey="weight" stroke="#ff7a5c"/>
      <Line dataKey="height" stroke="#4a90e2"/>

     </LineChart>

    </ResponsiveContainer>

   </div>

  </div>

 )

}

export default Growth