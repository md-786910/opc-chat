import React from 'react'
import ReactHtmlParser from 'react-html-parser';

const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`} >
                {user}
                {ReactHtmlParser(message)}

            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                {
                    ReactHtmlParser(`You: ${message}`)
                }
            </div>
        )
    }
}

export default Message
