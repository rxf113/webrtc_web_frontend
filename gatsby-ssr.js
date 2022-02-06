const React = require("react")

exports.onRenderBody = ({setHeadComponents}) => {
    setHeadComponents([
        <script key='1' type="text/javascript" src={"http://localhost:9000/simpleSdk.js"}/>
    ]);
};