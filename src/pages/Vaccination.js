import { useState } from "react";

function Vaccination(){

const vaccines = [

{ name:"BCG", age:"Birth", done:true },
{ name:"Hepatitis B", age:"Birth", done:true },
{ name:"OPV", age:"6 weeks", done:false },
{ name:"DPT", age:"10 weeks", done:false },
{ name:"MMR", age:"9 months", done:false }

]

const [data,setData] = useState(vaccines)


const toggleStatus=(index)=>{

const updated = [...data]

updated[index].done = !updated[index].done

setData(updated)

}


return(

<div className="container">

<h2>Vaccination Schedule</h2>

<table>

<thead>

<tr>
<th>Vaccine</th>
<th>Age</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{data.map((v,i)=>(

<tr key={i}>

<td>{v.name}</td>

<td>{v.age}</td>

<td>

<button onClick={()=>toggleStatus(i)}>

{v.done ? "Completed" : "Pending"}

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default Vaccination