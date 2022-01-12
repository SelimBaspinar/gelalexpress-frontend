import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref'

import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getMatch } from '../redux/actions/matchMessageAction'
import { addMatch } from '../redux/actions/matchMessageAction'
import { editMatch } from '../redux/actions/matchMessageAction'
import { deleteMatch } from '../redux/actions/matchMessageAction'
import { getActiveMatch } from '../redux/actions/matchMessageAction'

import { getMessage } from '../redux/actions/messageAction'
import { getActiveMessage } from '../redux/actions/messageAction'
import { addMessage } from '../redux/actions/messageAction'
import { deleteMessage } from '../redux/actions/messageAction'
import { editMessage } from '../redux/actions/messageAction'

import { getActiveUser } from '../redux/actions/userActions'
import { getUsers } from '../redux/actions/userActions'

import "../Css/message.css"

import axios from "axios";
import qs from "qs"

import {
    Container,
    Row,
    Col,
    Nav,
} from 'reactstrap';
import $ from "jquery"
import { deleteProduct } from '../redux/actions/productActions';
import { getProduct } from '../redux/actions/productActions';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import useWebSocket, { ReadyState } from 'react-use-websocket';


function Message({ getUsers, getActiveUser, getMatch, addMatch, editMatch, deleteMatch, getActiveMatch, getMessage, getActiveMessage, addMessage, deleteMessage, editMessage,
    matchmessage, message, activeuser, activemessage, activematchmessage, users, deleteProduct, getProduct, product, ...props }) {
    const matchmessageid = useRef("");
    const [state, setState, stateref] = useState({
        Content: [],
        WhoSend: '',
        Date: '',
        room: 'vacad',
        M_Id: '',
        MakeDealU: '',
        MakeDealOU: '',
    }
    );
    const [statedeal, setStateDeal, statedealref] = useState({
        WhoSend: '',
        M_Id: '',
        MakeDealU: '',
        MakeDealOU: '',
    }
    );

    const [client, setClient, clientref] = useState(new W3CWebSocket('ws://localhost:8000/ws/chat/' + stateref.current.room + '/'));



    const history = useNavigate();
    /* eslint eqeqeq: 0 */
    /*eslint no-mixed-operators: 0 */

    useEffect(() => {
        getActiveUser(JSON.parse(localStorage.getItem("activeuser")))
        getProduct();
        getUsers();
        getMatch();
        getMessage();
        clientref.current.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer.type);
            if (dataFromServer) {
                if (dataFromServer.MakeDealOU.length == 0||dataFromServer.MakeDealU.length==0) {
                    const state1 = {
                        Content: [...stateref.current.Content,
                        {
                            msg: dataFromServer.Content,
                            WhoSend: dataFromServer.WhoSend,
                            Date: dataFromServer.Date,
                        }],
                        WhoSend: dataFromServer.WhoSend,
                        M_Id: dataFromServer.M_Id,
                        MakeDealU: dataFromServer.MakeDealU,
                        MakeDealOU: dataFromServer.MakeDealOU,
                    }
                    console.log(stateref.current);

                    setState(state1);
                } else {
                    setStateDeal({
                        WhoSend: dataFromServer.WhoSend,
                        M_Id: dataFromServer.M_Id,
                        MakeDealU:dataFromServer.MakeDealU,
                        MakeDealOU: dataFromServer.MakeDealOU,
                    }
                    )
                    console.log(statedealref.current);
                }

            }
        };

    }, [client])
    useEffect(() => {

        clientref.current.onopen = () => {
            console.log('WebSocket Client Connected');
        };

    })
    useEffect(async () => {
        let a=false;
        if(activematchmessage.length==0){
           a=false;
        }
        {
            a=true;
        }
        if (a==true) {
            console.log("asdas");
            $(".chat-history ul li").empty();
            matchmessageid.current = activematchmessage.M_Id
            setClient(new W3CWebSocket('ws://localhost:8000/ws/chat/' + matchmessageid.current + '/'))
            let message1 = []
            await axios.get("/api/message/").then(response => {
                message1 = response.data
            });
            let matchtable = []
            await axios.get("/api/matchtable/").then(response => {
                matchtable = response.data
            });


            matchtable.map((match) => {
                if (match.M_Id == matchmessageid.current) {
                    let statedeal1 = {
                        Content: "",
                        WhoSend: match.U_Id.toString(),
                        Date: "",
                        Deal:"",
                        M_Id: match.M_Id,
                        MakeDealU: match.MakeDealU,
                        MakeDealOU: match.MakeDealOU,
                    }
                    setStateDeal(statedeal1);
                    clientref.current.onopen = ()=> clientref.current.send(JSON.stringify({
                        type: "message",
                        Content: "",
                        WhoSend: match.U_Id.toString(),
                        Date: "",
                        M_Id: match.M_Id,
                        MakeDealU: match.MakeDealU,
                        MakeDealOU: match.MakeDealOU,
                    }));
                }
            })

            if (message1 != null) {
                message1.map((msg) => {
                    if (msg.M_Id == matchmessageid.current) {

                        if (msg.WhoSend == activeuser.id) {
                            var li1 = $("<li></li>").addClass("clearfix");
                            var div1 = $("<div></div>").addClass("message-data text-right");
                            var span1 = $("<span></span>").addClass("message-data-time").text(msg.Date)
                            var div3 = $("<div></div>").addClass("message other-message float-right").text(msg.Content);

                            div1.append(span1);
                            li1.append(div1, div3);
                            $(".chat-history ul").append(li1);

                        } else {
                            var li1 = $("<li></li>").addClass("clearfix");
                            var div1 = $("<div></div>").addClass("message-data");
                            var span1 = $("<span></span>").addClass("message-data-time").text(msg.Date)
                            var div3 = $("<div></div>").addClass("message other-message").text(msg.Content);

                            div1.append(span1);
                            li1.append(div1, div3);
                            $(".chat-history ul").append(li1);
                        }



                    }
                });
            }
            getActiveMatch([]);
            $("#matchlist div").map(function() {
               var a= $(this).text().split(" ",1);
               if(a==activematchmessage.ProductName)
                    $(".chat-about h6").text($(this).text());

            })
        }


    }, []);



    function matchlist() {
        $("#matchlist").empty();

        matchmessage.map((matchm) => {


            if (matchm.U_Id == activeuser.id || matchm.OU_Id == activeuser.id) {
                var li1 = $("<li></li>").addClass("matchmessage" + " " + matchm.M_Id + " clearfix")
                var div1 = $("<div></div>");
                var img1 = $("<img></img>");

                img1 = $("<img></img>").attr("src", matchm.ProductImg)


                if (matchm.U_Id == activeuser.id) {
                    users.map((user) => {
                        if (user.id == matchm.OU_Id) {
                            div1 = $("<div></div>").text(matchm.ProductName.substring(0,8) + " (" + user.Name + ")")
                        }
                    });
                } else if (matchm.OU_Id == activeuser.id) {
                    users.map((user) => {
                        if (user.id == matchm.U_Id) {
                            div1 = $("<div></div>").text(matchm.ProductName.substring(0,8) + " (" + user.Name + ")")
                        }
                    })
                }


                div1.append(img1);
                li1.append(div1);

                $("#matchlist").append(li1);
            }
        });
    };




    $(document).ready(async function () {
        $(".matchmessage").unbind().one("click", async function () {
            clientref.current.close();
            clientref.current.onclose = () => {
                console.log('Client Closed');
            };

            var getClass = this.className;
            let txt = getClass.split(" ")


            setClient(new W3CWebSocket('ws://localhost:8000/ws/chat/' + txt[1] + '/'))
            $(".chat-about h6").text($(this).children("div").text());
            $(".chat-history ul li").empty();
            matchmessageid.current = txt[1]
            let message1 = []
            await axios.get("/api/message/").then(response => {
                message1 = response.data
            });
            let matchtable = []
            await axios.get("/api/matchtable/").then(response => {
                matchtable = response.data
            });


            matchtable.map((match) => {
                if (match.M_Id == txt[1]) {
                    let statedeal1 = {
                        Content: "",
                        WhoSend: match.U_Id.toString(),
                        Date: "",
                        Deal:"",
                        M_Id: match.M_Id,
                        MakeDealU: match.MakeDealU,
                        MakeDealOU: match.MakeDealOU,
                    }
                    setStateDeal(statedeal1);
                    clientref.current.onopen = ()=> clientref.current.send(JSON.stringify({
                        type: "message",
                        Content: "",
                        WhoSend:match.U_Id.toString(),
                        Date: "",
                        Deal:"",
                        M_Id: match.M_Id,
                        MakeDealU: match.MakeDealU,
                        MakeDealOU: match.MakeDealOU,
                    }));
                }
            })

            if (message1 != null) {
                message1.map((msg) => {
                    if (msg.M_Id == txt[1]) {

                        if (msg.WhoSend == activeuser.id) {
                            var li1 = $("<li></li>").addClass("clearfix");
                            var div1 = $("<div></div>").addClass("message-data text-right");
                            var span1 = $("<span></span>").addClass("message-data-time").text(msg.Date)
                            var div3 = $("<div></div>").addClass("message other-message float-right").text(msg.Content);

                            div1.append(span1);
                            li1.append(div1, div3);
                            $(".chat-history ul").append(li1);

                        } else {
                            var li1 = $("<li></li>").addClass("clearfix");
                            var div1 = $("<div></div>").addClass("message-data");
                            var span1 = $("<span></span>").addClass("message-data-time").text(msg.Date)
                            var div3 = $("<div></div>").addClass("message other-message").text(msg.Content);

                            div1.append(span1);
                            li1.append(div1, div3);
                            $(".chat-history ul").append(li1);
                        }



                    }
                });
            }


        });
    });

    const sendMessage = async () => {

        if (matchmessageid.current != "") {


            let txt = document.getElementById("chattxt").value;
            const d = new Date(Date.now());
            const msg = {
                Content: txt,
                Date: d.toDateString(),
                M_Id: matchmessageid.current,
                WhoSend: activeuser.id.toString(),
            }
            await addMessage(msg);

           clientref.current.send(JSON.stringify({
                type: "message",
                Content: txt,
                WhoSend: activeuser.id.toString(),
                Date: d.toDateString(),
                M_Id: matchmessageid.current,
                Deal:'',
                MakeDealU: '',
                MakeDealOU: '',
            }));
            document.getElementById("chattxt").value = "";



        }
    }

    $("#chattxt").unbind().one().on('keyup', async function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (matchmessageid.current != "") {


                let txt = document.getElementById("chattxt").value;
                const d = new Date(Date.now());
                const msg = {
                    Content: txt,
                    Date: d.toDateString(),
                    M_Id: matchmessageid.current,
                    WhoSend: activeuser.id.toString(),
                }
                await addMessage(msg);

                clientref.current.onopen = ()=>  clientref.current.send(JSON.stringify({
                    type: "message",
                    Content: txt,
                    WhoSend: activeuser.id.toString(),
                    Date: d.toDateString(),
                    M_Id: matchmessageid.current,
                }));
                document.getElementById("chattxt").value = "";



            }
        }
    });

    const makedeal=async ()=> {
        let matchmessage1 = []


        if (statedealref.current.MakeDealU == true && statedealref.current.MakeDealOU == true){
            matchmessage.map((m)=>{
                if(m.M_Id=matchmessageid.current){
                    deleteProduct(m.Product);
                }
            })
        }
        await axios.get("/api/matchtable/").then(response => {
            matchmessage1 = response.data
        });
        await matchmessage1.map((matchm) => {
            if (matchm.M_Id == matchmessageid.current) {
                if (matchm.U_Id == activeuser.id) {
                    if (statedealref.current.MakeDealU == false && statedealref.current.MakeDealOU == true){
                        matchmessage.map((m)=>{
                            if(m.M_Id=matchmessageid.current){
                                deleteProduct(m.Product);
                            }
                        })
                    }
                    matchm.MakeDealU = !matchm.MakeDealU;
                } else {
                    matchm.MakeDealOU = !matchm.MakeDealOU;
                    if (statedealref.current.MakeDealU == true && statedealref.current.MakeDealOU == false){
                        matchmessage.map((m)=>{
                            if(m.M_Id=matchmessageid.current){
                                deleteProduct(m.Product);
                            }
                        })
                    }
                }
             
               clientref.current.send(JSON.stringify({
                    type: "message",
                    Content: "",
                    WhoSend: activeuser.id.toString(),
                    Date: "",
                    Deal:'',
                    M_Id: matchmessageid.current,
                    MakeDealU: matchm.MakeDealU,
                    MakeDealOU: matchm.MakeDealOU,
                }));
                editMatch(matchm)
            }

        })
    }

    function RenderBtn(props) {
        if (statedealref.current.WhoSend == activeuser.id) {
            if (statedealref.current.MakeDealU == false && statedealref.current.MakeDealOU == false){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right'>Make Deal</button>);}
            else if (statedealref.current.MakeDealU == true && statedealref.current.MakeDealOU == false){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right'>Waiting Answer</button>);}
            else if (statedealref.current.MakeDealU == false && statedealref.current.MakeDealOU == true){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right'>Deal Request</button>);}
            else if (statedealref.current.MakeDealU == true && statedealref.current.MakeDealOU == true){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right' disabled>Deal Done</button>);}
        } else {
            if (statedealref.current.MakeDealU == false && statedealref.current.MakeDealOU == false){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right'>Make Deal</button>);}
            else if (statedealref.current.MakeDealU == false && statedealref.current.MakeDealOU == true){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right'>Waiting Answer</button>);}
            else if (statedealref.current.MakeDealU == true && statedealref.current.MakeDealOU == false){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right'>Deal Request</button>);}
            else if (statedealref.current.MakeDealU == true && statedealref.current.MakeDealOU == true){
                return (<button onClick={()=>makedeal()} className='btn-primary float-right' disabled>Deal Done</button>);}
        }
    }
    return (

        <div className="col-lg-12">
            <div className="card chat-app">
                <div id="plist" className="people-list">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                    <ul id="matchlist" className="list-unstyled chat-list mt-2 mb-0">
                        {matchlist()}

                    </ul>
                </div>
                <div className="chat">
                    <div className="chat-header clearfix">
                        <div className="row">
                            <div className="col-lg-6">
                                {statedealref.current.M_Id == matchmessageid.current ?
                                    <RenderBtn></RenderBtn> : null}
                                <a href="#" data-toggle="modal" data-target="#view_info">
                                </a>
                           
                            </div>
                            <div className="col-lg-6 hidden-sm text-right">
                                <a href="#" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                                <a href="#" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                                <a href="#" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                                <a href="#" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="chat-history">
                        <ul className="m-b-0">
                            {stateref.current.M_Id == matchmessageid.current ?
                                stateref.current.Content.map(message =>
                                    message.WhoSend == activeuser.id ? <>
                                        <li className='clearfix'>
                                            <div className='message-data text-right'>
                                                <span className='message-data-user'>{message.WhoSend}</span>
                                                <span className='message-data-time'>{message.Date}</span>
                                            </div>
                                            <div className='message other-message float-right'>{message.msg}</div>
                                        </li>
                                    </>
                                        : <>
                                            <li className='clearfix'>
                                                <div className='message-data'>
                                                    <span className='message-data-user'>{message.WhoSend}</span>
                                                    <span className='message-data-time'>{message.Date}</span>
                                                </div>
                                                <div className='message other-message '>{message.msg}</div>
                                            </li>
                                        </>) : null}
                        </ul>
                    </div>
                    <div className="chat-message-clearfix">
                        <div className="input-group mb-0">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-send"></i></span>
                            </div>
                            <input id="chattxt" type="text" className="form-control" placeholder="Enter text here..." />
                            <button className="btn-primary" onClick={() => sendMessage()}>Send</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}
function mapStateToProps(state, ownProps) {
    return {
        matchmessage: state.matchMessageReducers,
        message: state.messageReducers,
        activeuser: state.activeUserReducers,
        activemessage: state.activeMessageReducers,
        activematchmessage: state.activeMatchMessageReducers,
        users: state.userReducers,
        product: state.productReducers,
    }
}
const mapDispatchToProps = {
    getMatch, addMatch, editMatch, deleteMatch, getActiveMatch, getMessage, getActiveMessage, addMessage, deleteMessage, editMessage,
    getUsers, getActiveUser, deleteProduct, getProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)