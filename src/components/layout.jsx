import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

import ReactMarkdown from "react-markdown";
function Layout(){
    const [messages,setmessages]=useState([])
    const [input,setinput]=useState("")
 const sendmessage= async()=>{
   if(input.trim()=="") return <h1>error</h1> ;
    console.log("loading...")
    const usermessage={sender:"user",text:input}
    setmessages(prev=>[...prev,usermessage])
    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY
    })
 
 try{
    const response = await  ai.models.generateContent({model:"gemini-3-flash-preview",contents:input})
    const aimessage={sender:"ai",text:response.text}
   setmessages(prev=>[...prev,aimessage])
   setinput("")
 }catch(error){
    console.log(error)
 }
 
 }

    return(
<>
<h1>Simple chat UI</h1>

<div style={{height:"500px",width:"100%",backgroundColor:"lightgrey", overflowY:"scroll",display:"flex",flexDirection:"column"}}>

{messages && messages.map((msg,index)=>(
    <div key={index} style={{height:"auto",width:"fit-content",backgroundColor:msg.sender=="user" ? "lightgrey" :"lightblue",alignSelf:msg.sender=="user" ? "flex-end" :"flex-start",borderRadius:"10px",border:"2px solid " + (msg.sender=="user" ? "grey" :"blue"),padding:"10px" ,color:"black" }}>
        <ReactMarkdown>
            
           {msg.text}
        </ReactMarkdown>
      
   </div>
))}


</div>
<div style={{height:"70px",backgroundColor:"lightcyan",display:"flex", justifyContent:"space-evenly",alignItems:"center"}}>
<input value={input} style={{width:"60%",height:"50px",backgroundColor:"white",border:"2px solid black", borderRadius:"10px",color:"black"}}  type="text" placeholder="enter your question" onChange={(e)=>(setinput(e.target.value))}></input>
<button onClick={sendmessage} style={{textAlign:"center",height:"50px",width:"20%",fontFamily:"monospace",fontSize:"16px",border:"2px solid black",borderRadius:"10px"}}>Send</button>
</div>
</>
    )
}
export default Layout;