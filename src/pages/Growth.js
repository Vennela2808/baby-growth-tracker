import { useState,useEffect } from "react"
import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts"

function Growth(){

const [babies,setBabies] = useState([])
const [activeBaby,setActiveBaby] = useState(null)

const [weight,setWeight] = useState("")
const [height,setHeight] = useState("")

useEffect(()=>{

const saved = JSON.parse(localStorage.getItem("babies"))

if(saved){
setBabies(saved)
setActiveBaby(saved[0])
}

},[])


const addRecord=(e)=>{

e.preventDefault()

if(!activeBaby) return

const newRecord={
date:new Date().toLocaleDateString(),
weight:Number(weight),
height:Number(height)
}

const updated=babies.map(b=>{

if(b.id===activeBaby.id){

return{
...b,
growth:[...b.growth,newRecord]
}

}

return b

})

setBabies(updated)
setActiveBaby(updated.find(b=>b.id===activeBaby.id))

localStorage.setItem("babies",JSON.stringify(updated))

setWeight("")
setHeight("")

}


return(

<div className="container">

<h2>📈 Growth Tracker</h2>


{babies.length>0 && (

<div className="card">

<h3>Select Baby</h3>

<select
value={activeBaby?.id}
onChange={(e)=>{

const b=babies.find(x=>x.id==e.target.value)

setActiveBaby(b)

}}
>

{babies.map(b=>(
<option key={b.id} value={b.id}>
{b.name}
</option>
))}

</select>

</div>

)}


<div className="card">

<h3>Add Growth Record</h3>

<form onSubmit={addRecord}>

<input
type="number"
placeholder="Weight (kg)"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
/>

<input
type="number"
placeholder="Height (cm)"
value={height}
onChange={(e)=>setHeight(e.target.value)}
/>

<button>Add Record</button>

</form>

</div>


{activeBaby && activeBaby.growth.length>0 && (

<div className="card">

<h3>Growth Chart</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={activeBaby.growth}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line type="monotone" dataKey="weight" stroke="#7b6cff"/>

</LineChart>

</ResponsiveContainer>

</div>

)}


<div className="card">

<h3>Growth History</h3>

{activeBaby && activeBaby.growth.map((g,i)=>(

<div key={i} className="record">

<span>{g.date}</span>

<span>{g.weight} kg</span>

<span>{g.height} cm</span>

</div>

))}

</div>

</div>

)

}

export default Growth