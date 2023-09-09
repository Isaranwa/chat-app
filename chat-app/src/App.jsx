import React,{useState,useRef} from 'react';
import "./App.css";
import {Auth } from "./components/Auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import {Chat} from "./components/Chat"
import {signOut} from "firebase/auth"
import {auth} from "./firebase-config";

function App (){
    const[isAuth,setIsAuth]=useState(cookies.get("auth-token"));
    const[room,setRoom]=useState(null);

    const roomInputRef = useRef(null);

    const signUserOut = async ()=>{
        await signOut(auth)
        cookies.remove("auth-token")
        setIsAuth(false);
        setRoom(null);
    }

    if(!isAuth){
    return (
        <div>
            <Auth setIsAuth={setIsAuth}/>
        </div>
    );
    }
   return (
    <div>
        {room ? (
          <Chat room={room}/>
        ):
        (
            <div className='room'>
                <label>Enter room Name</label>
                <input ref={roomInputRef}/>
                <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter chat</button>
                </div>
        )}

        <div className='sign-out'>
            <button onClick={signUserOut}>Sign Out</button>

        </div>
    </div>
   )
}
export default App