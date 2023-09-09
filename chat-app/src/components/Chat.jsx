import React,{useEffect, useState} from 'react'
import {addDoc, collection,onSnapshot,serverTimestamp,query,where, orderBy} from "firebase/firestore";
import {auth,db} from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
 const {room} = props;
    const[message,setMessage]= useState('');
    const[messages,setMessages] = useState([]);
    const messagesRef = collection(db,"messages")

    useEffect(()=>{
        const queryMessages = query(messagesRef, where("room", "==" ,room),orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id})

            });
            setMessages(messages);
        });
        return ()=>unsuscribe();
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(message === "") return;

        await addDoc(messagesRef, {
            text: message,
            createdAt: serverTimestamp(),
            user:auth.currentUser.displayName,
            room,
        })
        setMessage("");
    };
  return (
    <div className='chat-app'>
        <div className='header'>
            <h1>HeartMessages:{room.toUpperCase()}</h1>
        </div>
        <div className='messages'>
            {messages.map((message,index)=>(
                <div className='message'key={message.id}>
                    <span className='user'>{message.user}</span>
                    <span>{message.text}</span>
                </div>
            ))}
        </div>
        <form className='new-message-form' onSubmit={handleSubmit}>
            <input className='new-message-input'value={message} placeholder='Type something...'onChange={(e)=>setMessage(e.target.value)}/>
            <button type='submit' className='send-button'>Send</button>

        </form>
    </div>
  )
}
