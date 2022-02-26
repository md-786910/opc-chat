import React, { useState } from 'react'
import { Link } from 'react-router-dom'

let user;

const sendName = () => {
    user = document.getElementById("joinInput").value

    document.getElementById("joinInput").value = ""
}


function Join() {

    const [name, setName] = useState("")

    return (
        <>
            <div className="wrapper">
                <div className="join_container">
                    <h1 style={{ fontSize: "40px" }}>
                        Join The Chat 💫
                    </h1>

                </div>


                <div className="box_main">
                    <h1 style={{ fontSize: "35px", textAlign: "center" }}>
                        Hi!
                    </h1>
                    <div style={{ backgroundColor: "black", height: "5px", width: "20%", margin: "4px auto" }}></div>

                    <div className="formJoin">
                        <input type="text" name="name" id="joinInput" placeholder="Enter Name" onChange={(e) => {
                            setName(e.target.value);
                        }} />

                        <Link to="/chat"
                            onClick={(e) => !name ? e.preventDefault() : null}

                        >
                            <button className="joinBtn" onClick={sendName}>
                                Join Chat
                            </button>

                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Join
export { user }