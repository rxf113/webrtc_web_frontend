import React, {useState, useEffect} from 'react';
import * as loginStyle from './login.module.css'

export default function Login() {

    //用户名
    const [username, setUsername] = useState(null);

    //控制显示用户名为空提示
    const [nullNotice, setNullNotice] = useState("hidden");


    useEffect(() => {
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.backgroundColor = "#96d0ce";
        document.body.style.height = "80vh";
    });

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


    function login() {
        if (!username) {
            showNotice(1500);
        }
    }

    return <div>
        <div className={loginStyle.login}>
            <div className={loginStyle.server}>
                连接服务器成功!
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