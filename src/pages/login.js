import React, {useState, useEffect, useRef} from 'react';
import * as loginStyle from './login.module.css'
import {Link} from "gatsby"
import Message from "../component/Message";

export default function Login() {

    //描述(连接服务器失败或成功)
    const [des, setDes] = useState("Welcome");
    //用户名
    const [username, setUsername] = useState("");
    //弹框提示
    const [msgVisibility, setMsgVisibility] = useState("hidden");
    //弹框消息
    const [noticeMsg, setNoticeMsg] = useState("");
    //控制显示用户名为空提示
    const [nullNotice, setNullNotice] = useState("hidden");

    const routePageRef = useRef();

    let smgNoticeRef = useRef();

    useEffect(() => {
        //打开websocket连接
        simpleSdk.openWebSocketConnection("ws://127.0.0.1:9000/ws");

        //监听服务器连接
        simpleSdk.on("connection-server-success", () => {
            setDes("连接服务器成功,输入用户名开始聊天!")
        });

        simpleSdk.on("connection-server-fail", () => {
            setDes("连接服务器失败!")
        });

        //监听登录成功/失败
        simpleSdk.on('login-success', function (e) {
            //跳转页面
            if (routePageRef.current) {
                routePageRef.current.click()
            }
        });

        simpleSdk.on('login-fail', function (e) {
            //弹框提示
            if (smgNoticeRef.current) {
                popNoticeFunc(e.data.msg)
            }
        });
    }, []);




    /**
     * 检查input用户名
     * @param val
     */
    function checkInput(val) {
        val = val.replace(/\s+/g, '');
        setUsername(val)
    }

    /**
     * 显示为空提示
     * @param millisecond
     */
    function showNotice(millisecond) {
        setNullNotice("visible")
        setTimeout(() => {
            setNullNotice("hidden")
        }, millisecond);
    }

    function popNoticeFunc(msg) {
        setNoticeMsg(msg)
        setMsgVisibility("visible")
        smgNoticeRef.current.show(1000)
        setTimeout(() => {
            setMsgVisibility("hidden")
        }, 2000)
    }

    function login() {
        if (!username) {
            showNotice(1500);
            return
        }
        simpleSdk.login(username)
        // popNoticeFunc("dasdasdas")
    }

    return <div className={loginStyle.out}>
        <Message onRef={smgNoticeRef}
                 data={{msg: noticeMsg}}
                 style={{
                     width: "300px",
                     height: "40px",
                     backgroundColor: "#fff2f0",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     borderRadius: "3px",
                     visibility: msgVisibility,
                     marginBottom: "50%",
                     border: "1px solid #ffffff",
                     fontSize: "14px",
                     lineHeight: "1.571",
                     color: "#f56c6c"
                 }}>

        </Message>
        <Link to={"/chat"} state={{username: {username}}}>
            <div ref={routePageRef} style={{display: "none"}}> ignore</div>
        </Link>
        <div className={loginStyle.login}>
            <div className={loginStyle.server}>
                {des}
            </div>

            <div className={loginStyle.inputAndStar}>
                <svg t="1643784048204" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="1568" width="6px" height="6px">
                    <path
                        d="M927 679.5L635.7 511.7 927 343.9c29.1-14.6 43.7-58.3 22.1-87.4-14.6-29.1-58.3-43.7-87.4-22.1L570.5 402.2V67.8c7-36.7-22.1-65.8-58.3-65.8-36.1 0-65.8 29.1-65.8 65.8v335L155.1 235c-22.1-21.6-65.8-7-80.4 22.1-14.6 29.1-7.6 72.8 22.1 87.4l291.3 167.8L96.9 680.1c-29.1 14.6-43.7 58.3-21.6 87.4 14.6 22.1 36.7 29.1 58.3 29.1 7 0 21.6 0 29.1-7.6L454 621.2v335c-7.6 36.7 22.1 65.8 58.3 65.8 36.1 0 65.2-29.1 65.2-65.8v-335L868.7 789c7.6 7.6 22.1 7.6 29.1 7.6 22.1 0 43.7-14.6 58.3-29.1 7-29.8 0-73.5-29.1-88z"
                        fill="#E52323" p-id="1569"/>
                </svg>
                <input className={loginStyle.input} placeholder={"输入用户名"} onChange={e => checkInput(e.target.value)}
                       value={username}/>
                <span style={{
                    paddingLeft: "7px",
                    fontSize: "13px",
                    color: "#de0c0c",
                    visibility: nullNotice
                }}>用户名不能为空!</span>
            </div>

            <button className={loginStyle.loginButton} onClick={() => login()}>登录</button>
        </div>
    </div>
}