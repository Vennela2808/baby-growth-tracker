import { useState, useEffect } from "react";

function Dashboard() {

const [babies,setBabies] = useState([])
const [activeBaby,setActiveBaby] = useState(null)

const [name,setName] = useState("")
const [dob,setDob] = useState("")
const [photo,setPhoto] = useState("")

const vaccineSchedule = [
{ name:"BCG", days:0 },
{ name:"OPV", days:42 },
{ name:"DPT", days:70 },
{ name:"MMR", days:270 }
]

useEffect(()=>{

const saved = JSON.parse(localStorage.getItem("babies"))

if(saved){
setBabies(saved)
setActiveBaby(saved[0])
}

},[])

useEffect(()=>{
localStorage.setItem("babies",JSON.stringify(babies))
},[babies])


/* Upload Photo */

const handlePhotoUpload=(e)=>{

const file = e.target.files[0]

if(file){

const reader = new FileReader()

reader.onloadend=()=>{
setPhoto(reader.result)
}

reader.readAsDataURL(file)

}

}


/* Add Baby */

const addBaby=(e)=>{

e.preventDefault()

if(!name || !dob) return

const newBaby={
id:Date.now(),
name,
dob,
photo,
growth:[]
}

const updated=[...babies,newBaby]

setBabies(updated)
setActiveBaby(newBaby)

setName("")
setDob("")
setPhoto("")

}


/* Age Calculator */

const calculateAge=(dob)=>{

const birth = new Date(dob)
const today = new Date()

let months = (today.getFullYear()-birth.getFullYear())*12
months += today.getMonth()-birth.getMonth()

return months + " months"

}


/* Next Vaccine */

const getNextVaccine=()=>{

if(!activeBaby) return null

const today = new Date()

for(let v of vaccineSchedule){

const due = new Date(activeBaby.dob)

due.setDate(due.getDate()+v.days)

if(due > today){

const diff = Math.ceil((due - today)/(1000*60*60*24))

return {name:v.name,days:diff}

}

}

return null

}

const next = getNextVaccine()


/* Vaccine Progress */

const vaccinesTaken = activeBaby?.growth?.length || 0
const totalVaccines = vaccineSchedule.length

const progress = Math.min((vaccinesTaken/totalVaccines)*100,100)


return(

<div className="container">

<h2>👶 Baby Dashboard</h2>


<div className="card">

<h3>Add Baby</h3>

<form onSubmit={addBaby}>

<input
placeholder="Baby Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="date"
value={dob}
onChange={(e)=>setDob(e.target.value)}
/>

<input
type="file"
accept="image/*"
onChange={handlePhotoUpload}
/>

<button>Add Baby</button>

</form>

</div>


{babies.length>0 && (

<div className="card">

<h3>Select Baby</h3>

<select
value={activeBaby?.id}
onChange={(e)=>{

const b = babies.find(x=>x.id == e.target.value)

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


{activeBaby && (

<div className="card">

<h3>Baby Profile</h3>

{activeBaby.photo ? (

<img
src={activeBaby.photo}
alt="baby"
style={{
width:"120px",
height:"120px",
borderRadius:"50%",
objectFit:"cover"
}}
/>

):( <p>No photo uploaded</p> )}

<h3>{activeBaby.name}</h3>

<p>DOB: {activeBaby.dob}</p>

<p>Age: {calculateAge(activeBaby.dob)}</p>

</div>

)}


{activeBaby && (

<div className="card">

<h3>💉 Vaccine Progress</h3>

<div
style={{
height:"20px",
background:"#eee",
borderRadius:"10px",
overflow:"hidden"
}}
>

<div
style={{
width:progress+"%",
background:"#7b6cff",
height:"100%"
}}
></div>

</div>

<p>{Math.round(progress)}% Completed</p>

</div>

)}


{activeBaby && next && (

<div className="next-vaccine-card">

<h3>Next Vaccine</h3>

<h1>{next.name}</h1>

<p>Due in {next.days} days</p>

</div>

)}

</div>

)

}

export default Dashboard
