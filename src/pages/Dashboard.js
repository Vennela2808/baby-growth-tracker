import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dashboard() {

const [image,setImage] = useState(null)
const [dob,setDob] = useState("")
const [age,setAge] = useState("")

const vaccinesTaken = 6
const totalVaccines = 12

useEffect(()=>{

const savedImage = localStorage.getItem("babyImage")
const savedDob = localStorage.getItem("babyDOB")

if(savedImage) setImage(savedImage)
if(savedDob){
setDob(savedDob)
calculateAge(savedDob)
}

},[])


const uploadImage=(e)=>{

const file = e.target.files[0]

if(file){

const url = URL.createObjectURL(file)

setImage(url)

localStorage.setItem("babyImage",url)

}

}


const handleDOB=(e)=>{

const date = e.target.value

setDob(date)

localStorage.setItem("babyDOB",date)

calculateAge(date)

}


const calculateAge=(date)=>{

const birth = new Date(date)
const today = new Date()

let months = (today.getFullYear()-birth.getFullYear())*12
months += today.getMonth()-birth.getMonth()

setAge(months+" months")

}


return(

<div className="container">

<div className="profile-card">

{image ?
<img src={image} alt="baby"/> :
<div className="avatar">👶</div>
}

<h2>Baby Profile</h2>

<input type="file" onChange={uploadImage}/>

<br/><br/>

<label>Baby DOB</label>

<input type="date" value={dob} onChange={handleDOB}/>

<h3>Age: {age}</h3>

</div>


<div className="stats">

<div className="card">

<h3>Vaccination Progress</h3>

<CircularProgressbar
value={(vaccinesTaken/totalVaccines)*100}
text={`${vaccinesTaken}/${totalVaccines}`}
/>

</div>

<div className="card">

<h3>Next Vaccine</h3>

<p>OPV</p>
<p>Due in 10 days</p>

</div>

<div className="card">

<h3>Latest Weight</h3>

<p>8.4 kg</p>

</div>

</div>

</div>

)

}

export default Dashboard