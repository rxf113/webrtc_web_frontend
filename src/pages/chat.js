import React, {useState,useEffect,useRef} from "react";
import SimpleVideo from '../component/SimpleVideo'
import * as chatStyle from "./chat.module.css";
import simpleSdk from "../lib/simpleSdk";
import Message from "../component/Message";

const Chat = (props) => {

    const username = props.location.state.username["username"]

    const mineUserDesc = "我方用户: "

    const remoteUserDesc = "对方用户: "

    const localVideoId = "localVideo"

    const remoteVideoId = "remoteVideo"

    const [nullNotice, setNullNotice] = useState("hidden");

    const [remoteUser, setRemoteUser] = useState("")

    const remoteUserRef = useRef()

    const msgNoticeRef = useRef();

    const msgWarningNoticeRef = useRef();

    const [noticeMsg, setNoticeMsg] = useState("");

    const [msgVisibility, setMsgVisibility] = useState("hidden");

    const [msgWarningVisibility, setMsgWarningVisibility] = useState("hidden");

    useEffect(()=>{
        // //打开websocket连接
        // simpleSdk.openWebSocketConnection("ws://127.0.0.1:9000/ws");
        //设置视频video标签
        simpleSdk.setVideoTag(localVideoId,remoteVideoId);
    },[])


    useEffect(()=>{
        //监听 呼叫成功
        simpleSdk.on('call-success', function (e) {
            if (msgNoticeRef.current) {
                popNoticeFunc(e.data.msg)
            }
        });

        //不在线/忙
        simpleSdk.onMulti(['not-online','busy'], function (e) {
            if (msgWarningNoticeRef.current) {
                popWarningNoticeFunc(e.data.msg)
            }
        });


        //监听 被呼叫
        simpleSdk.on('called', function (e) {
            console.log(e);
            let caller = e.data.msg;
            if (msgNoticeRef.current) {
                popNoticeFunc(`收到来自 [${caller}] 的视频邀请,3秒后将自动接受`,4000,4000)
            }
            setTimeout(() => {
                simpleSdk.accept();
            }, 3000);
        });

        //监听 对方已接受
        simpleSdk.on('accepted', function () {
            console.log("对方接受");
        });

        //监听 对方已挂断
        simpleSdk.on('hang-up', function (e) {

        });



    },[])

    function popNoticeFunc(msg,showMs=1000,hiddenMs=2000) {
        setNoticeMsg(msg)
        setMsgVisibility("visible")
        msgNoticeRef.current.show(showMs)
        setTimeout(() => {
            setMsgVisibility("hidden")
        }, hiddenMs)
    }

    function popWarningNoticeFunc(msg) {
        setNoticeMsg(msg)
        setMsgWarningVisibility("visible")
        msgWarningNoticeRef.current.show(1000)
        setTimeout(() => {
            setMsgWarningVisibility("hidden")
        }, 2000)
    }

    function call() {
        if (!remoteUser) {
            showNotice(1500);
            return;
        }
        simpleSdk.call(remoteUser)
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

    /**
     * 检查input用户名
     * @param val
     */
    function checkInput(val) {
        val = val.replace(/\s+/g, '');
        setRemoteUser(val)
        remoteUserRef.current.updateUser(val)
    }

    if (!username) {
        return <div>404</div>
    }

    const msgCommonStyle = {
        width: "300px",
        height: "40px",
        backgroundColor: "#aed3ae",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "3px",
        visibility: msgVisibility,
        border: "1px solid #ffffff",
        fontSize: "14px",
        lineHeight: "1.571",
        color: "#24ab15"
    }

    const msgWarningStyle = Object.assign({},msgCommonStyle)
    msgWarningStyle.backgroundColor = "#fff2f0"
    msgWarningStyle.color = "#f56c6c"
    msgWarningStyle.visibility = msgWarningVisibility

    return (
        <div>
            <div style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}>

               <div>
                   <Message onRef={msgNoticeRef}
                            data={{msg: noticeMsg}}
                            style={msgCommonStyle}/>
                   <Message onRef={msgWarningNoticeRef}
                            data={{msg: noticeMsg}}
                            style={msgWarningStyle}/>
               </div>
                <div className={chatStyle.des}>
                    我打尼玛的啊？
                </div>


                <div style={{
                    width: "410px",
                    display: "flex",
                    flexFlow: "row wrap",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    <svg t="1643784048204" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="1568" width="6px" height="6px">
                        <path
                            d="M927 679.5L635.7 511.7 927 343.9c29.1-14.6 43.7-58.3 22.1-87.4-14.6-29.1-58.3-43.7-87.4-22.1L570.5 402.2V67.8c7-36.7-22.1-65.8-58.3-65.8-36.1 0-65.8 29.1-65.8 65.8v335L155.1 235c-22.1-21.6-65.8-7-80.4 22.1-14.6 29.1-7.6 72.8 22.1 87.4l291.3 167.8L96.9 680.1c-29.1 14.6-43.7 58.3-21.6 87.4 14.6 22.1 36.7 29.1 58.3 29.1 7 0 21.6 0 29.1-7.6L454 621.2v335c-7.6 36.7 22.1 65.8 58.3 65.8 36.1 0 65.2-29.1 65.2-65.8v-335L868.7 789c7.6 7.6 22.1 7.6 29.1 7.6 22.1 0 43.7-14.6 58.3-29.1 7-29.8 0-73.5-29.1-88z"
                            fill="#E52323" p-id="1569"/>
                    </svg>
                    <input className={chatStyle.input} placeholder={"输入对方用户名呼叫"}
                           onChange={e => checkInput(e.target.value)}
                           value={remoteUser}
                    />

                    <button className={chatStyle.callBtn} onClick={() => call()}>呼叫</button>
                    <span style={{
                        paddingLeft: "7px",
                        fontSize: "13px",
                        color: "#de0c0c",
                        visibility: nullNotice
                    }}>用户名不能为空!</span>
                </div>


                <div style={{
                    height: "480px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                    <SimpleVideo
                        videoId={localVideoId}
                        cameraDes={"我方摄像头"}
                        usernameDes={mineUserDesc}
                        username={username}
                        styles={{
                            total: {width: "640px", height: "480px"},
                            video: {width: "640px", height: "400px"}
                        }}/>


                    <SimpleVideo
                        onRef={remoteUserRef}
                        videoId={remoteVideoId}
                        cameraDes={"对方摄像头"}
                        usernameDes={remoteUserDesc}
                        username={remoteUser}
                        styles={{
                            total: {width: "640px", height: "480px"},
                            video: {width: "300px", height: "200px"}
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default Chat;