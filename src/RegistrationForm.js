import React, { useState } from 'react';
import axios from 'axios'
import './App.css'


function RegistrationForm() 
{


    const [name,setName]=useState("")
    const [validName,setValidName]=useState("Name should be atleast 3 letters")
    const [dob,setDob]=useState("");
    const [grade,setGrade]=useState("");
    const [timezone,setTimeZone]=useState("");
    const [countryCode,setCountryCode]=useState("91");
    const [phNo,setPhNo]=useState();
    const [validPhno,setValidPhNo]=useState("Invalid Mobile Number");
    const [email,setEmail]=useState("");
    const [validEmail,setValidEmail]=useState("Invalid Email");

    const [valid,setValid]=useState(false);
    // console.log(valid)    

    const handleName=(e)=>{

        if(e.target.name.length < 3){
            setValidName("Name should be atleast 3 letters")
        }
        else{
            setValidName("Correct")
            setName(e.target.value)
            isValidForm();
        }
        
    }

    const handleDob=(e)=>{
        setDob(e.target.value)
        isValidForm()
    }

    const handleGrade=(e)=>{
        setGrade(e.target.value)
        isValidForm()
    }

    const handleTimezone=(e)=>{
        setTimeZone(e.target.value)
        isValidForm()
    };

    const handleCountryCode=(e)=>{
        setCountryCode(e.target.value)
        isValidForm();
    }

    const handlePhNo=(e)=>{
        // console.log(e.target.value.length)
        if(e.target.value.length !== 10){
            setValidPhNo("Invalid Mobile Number")
        }
        else{
           // console.log("valid")
            setValidPhNo("Correct")
            setPhNo(e.target.value) 
            isValidForm();       
        }
    };

    const handleEmail = (e)=>{
            function isValidEmail(val) {
                let regEmail = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
                if (!regEmail.test(val)) {
                    //console.log("invalid")
                    setValidEmail("Invalid")
                }
                else{
                    //console.log("valid")
                    setValidEmail("Correct")
                    setEmail(e.target.value)
                    isValidForm();
                }
              }
              isValidEmail(e.target.value);
    }


    const isValidForm = () => {
        if(name !== '' && dob!=='' && grade!=='' && phNo !==''  && email !=='')
        {
            setValid(true);
        }else {
            setValid(false);
        }
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
    
        let stuData={
            name:name,
            dob:dob,
            grade:grade,
            timeZone:timezone,
            whatAppContact:countryCode+phNo,
            Email:email,
        }
    
        axios({
            method:"POST",
            url:'https://her-shreersc-express-server.herokuapp.com/v1/admin/registerStudent',
            data:stuData,
            headers:{
                    'Content-Type': 'application/x-www-form-urlencoded' 
                    }
                })
            .then(response=>{
                console.log(response)
                alert("Success")
            })
            .catch(err=>alert("Error"))
            e.target.reset();
        }
    

  return <div>
              <h1>Register a new Student</h1>
              <h3>Personal Details:</h3>

            <form onSubmit={handleSubmit}>
                <div className='resBlock'>
                    
                    <input type="text" placeholder="Enter Student Name" name="name" onChange={handleName} />
                    <span>{validName}</span>

                    <input placeholder="Date of Birth:"  type="date" id="date"  name='dob' onChange={handleDob}/>

                    <input type="text" placeholder="Grade" name="grade" onChange={handleGrade}/>

                    <select name="timezone" onChange={handleTimezone}>
                        <option value="">--Select Time Zone--</option>
                        <option value="(UTC-5) Estern Standard Time">  (UTC-5) Estern Standard Time</option>
                        <option value="UTC Western Europe Time">  UTC Western Europe Time</option>
                        <option value="(UTC+5:30) Indian Standard Time">  (UTC+5:30) Indian Standard Time</option>
                    </select>

                    <select id="countrycode" name='countryCode' onChange={handleCountryCode}>
                        <option value="91">IN +91</option>
                        <option value="1">US +1</option>
                        <option value="81">UK +44</option>
                        <option value="46">SE +46</option>
                        <option value="65">SG +65</option>
                        <option value="7">RU +7</option>
                    </select>
                    
                    <input id="phno"  placeholder="Whatsapp Mobile Number" type="number" name="phNo" onChange={handlePhNo}/>
                    <span>{validPhno}</span>

                    <input type="email" placeholder="  E-Mail" name="email" onChange={handleEmail}/>
                    <span>{validEmail}</span>
                </div>
                <button className ={valid ? 'buttonSave' : 'disableBtn'} disabled= {valid ? false : true} >Register New Student</button>
            </form>
            
            
        </div>;
}

export default RegistrationForm;
