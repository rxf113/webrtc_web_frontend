import React, {useState, useImperativeHandle} from "react";
import './Message.css'


const Message = (props) => {

    const style = props.style

    const [cusAnimate, setCusAnimate] = useState("");

    useImperativeHandle(props.onRef, () => {
        return {
            show: show,
        };
    });

    function show(ms = 2000) {
        setCusAnimate("fadeIn")
        setTimeout(() => {
            setCusAnimate("bounceOutUp")
        }, ms)
    }

    return (
        <div>
            <div style={style} className={cusAnimate}>
                {props.data.msg}
            </div>
        </div>
    )
}

export default Message