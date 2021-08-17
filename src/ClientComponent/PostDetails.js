import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from "react-toastify"
import Header from './Header'
import './styles/index.css'
import ModalConn from "./Modals/ModalConn"

function PostDetails () {

    const location = useLocation()
    //console.log(location.state)
    const data = location.state


    return (
        <section id="container">
            <Header />
            {/*  */}
            <ModalConn />
            <section id="main">
                <section class="wrapper site-min-height">
                    <div class="chat-room mt">
                        <aside class="mid-side">
                            <div class="chat-room-head">
                                <h3>{data.title}</h3>
                                <hr></hr>
                                <div>
                                    {data.stat_post == "Pending" ?
                                    <span class="label label-warning">En Attente</span>
                                    :
                                    <span class="label label-success">Resolu</span>
                                    }
                                </div>
                            </div>
                            <div className="room-desk">
                                <div class="room-box" style={{
                                    backgroundColor : "white"
                                }}>
                                    <p>{data.desc}</p>
                                </div>
                                <div className="">
                                    <div class="group-rom">
                                        <div class="first-part">
                                            <span>User1</span>
                                        </div>
                                        <div class="second-part">
                                            <p>Solution is working <span class="badge bg-success">Done</span></p>
                                        </div>
                                        <div class="third-part">12:33</div>
                                    </div>
                                    <div class="group-rom">
                                        <div class="first-part">
                                            <span>User2</span>
                                        </div>
                                        <div class="second-part">
                                            <p>Answer is in Pending <span class="badge bg-warning">Cool</span></p>
                                        </div>
                                        <div class="third-part">12:33</div>
                                    </div>
                                    <div class="group-rom">
                                        <div class="first-part">
                                            <span>User2</span>
                                        </div>
                                        <div class="second-part">
                                            <p>Solution not working <span class="badge bg-important">Now</span></p>
                                        </div>
                                        <div class="third-part">12:33</div>
                                    </div>
                                </div>
                                <div className="room-box">
                                    <div class="row">
                                        <div className="col-md-10">
                                            <textarea rows="4" type="text" class="form-control" ></textarea>
                                        </div>
                                        <div className="col-md-2">
                                            <button class="btn btn-theme">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </section>
        </section>
    )
}


export default PostDetails;