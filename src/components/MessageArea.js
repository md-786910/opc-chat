import React, { useState, useEffect } from 'react'

import ReactScrollToBottom from 'react-scroll-to-bottom'



import Message from "./Message"

import { user } from "./Join"

import socketIo from "socket.io-client";

import ReactQuill, { Quill } from 'react-quill';

import quillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;
Quill.register({
    'formats/emoji': EmojiBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji
}, true);

let socket;
const ENDPOINT = "http://localhost:5000/"

// import Emoji from "quill-emoji";
// Quill.register("modules/emoji", Emoji);

function MessageArea(props) {

    const [textMessage, setMessage] = useState("")

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = textMessage;

        socket.emit('message', { message, id });

        setMessage(" ");
    }


    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);
        })


        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])


    return (

        <div className="mainApp">

            <div className="container" >
                <h1>
                    Capcount Solution Chat Service 🧿</h1>
            </div>
            <div className="chatPage">
                <div className="chatContainer">
                    <div className="header">
                        <h2>C CHAT</h2>
                        <a href="/">
                            <i class="fa-solid fa-circle-left"></i>
                        </a>
                    </div>
                    <ReactScrollToBottom className="chatBox">
                        {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                    </ReactScrollToBottom>
                    <div className="inputBox">
                        {/* <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" /> */}

                        <ReactQuill
                            theme="snow"
                            modules={MessageArea.modules}
                            formats={MessageArea.formats}
                            value={textMessage}
                            onChange={(e) => setMessage(e)}
                        ></ReactQuill>

                        <button onClick={send} className="sendBtn">
                            <i class="fa-solid fa-paper-plane"></i>
                            {/* send */}
                        </button>

                    </div>
                </div>

            </div>
            {/* form */}


            {/* end */}

        </div >

    )
}


MessageArea.modules = {
    toolbar: [
        [{ 'header': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['emoji'],
        ['link', 'image'],
        ['clean']
    ],
    'emoji-toolbar': true,
    "emoji-textarea": true,
    "emoji-shortname": true,
}


MessageArea.formats = [
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "ordered",
    "image",
    "link",
    "emoji",
    "blockquote",
    "code-block",
    "align",
    "bold",
    "direction"
]

export default MessageArea