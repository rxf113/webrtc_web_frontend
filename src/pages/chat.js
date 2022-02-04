import React from "react";

const Chat = (props) => {
    const username = props.location.state.username["username"]
    return <div>chat + {username}</div>
}

export default Chat;