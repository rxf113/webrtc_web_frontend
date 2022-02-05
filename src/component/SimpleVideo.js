import React, {useImperativeHandle,useState} from "react";
import * as SimpleVideoStyle from './SimpleVideo.module.css'

export default (props) => {


    const [username, setUsername] = useState("")

    useImperativeHandle(props.onRef, () => {
        return {
            updateUser: updateUser,
        };
    });

    function updateUser(newUserName){
        setUsername(newUserName)
    }

    return (
        <div className={SimpleVideoStyle.total} style={props.styles.total}>
            <div className={SimpleVideoStyle.username}>{props.usernameDes} {username === "" ? props.username : username}</div>

            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <span style={{color:"#166e6c",fontSize:"13px"}}>{props.cameraDes}</span>
                <video id={props.videoId} style={props.styles.video} className={SimpleVideoStyle.video} autoPlay/>
            </div>

        </div>
    )
}