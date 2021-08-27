import { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from "react-toastify"
import Header from './Header'
import './styles/index.css'
import ModalConn from "./Modals/ModalConn"
import io from 'socket.io-client';
import './styles/index.css'
// import firebase from 'firebase';
// import firestore from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyB5qVfIxocmlU7yDhhcQuOhFYQyLauWykg",
//     authDomain: "comments-56966.firebaseapp.com",
//     projectId: "comments-56966",
//     storageBucket: "comments-56966.appspot.com",
//     messagingSenderId: "893622129199",
//     appId: "1:893622129199:web:16c9a7846001e6a5b06cda"
// };

// firebase.initializeApp(firebaseConfig);
// firebase.firestore();

function PostDetails () {

    //const token = sessionStorage.getItem('token')
    const info = JSON.parse(localStorage.getItem('clientInfo'))
    //console.log(info)

    // const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [comments, setComments] = useState([]);
    const [tests, setTest] = useState([])

    const location = useLocation()
    //console.log(location.state)
    const data = location.state

    const fetchTest = async () => {
        await fetch(process.env.REACT_APP_PUBLIC_URL+`/tags/publicTags`).then(res => {
            return res.json()
        }).then(data => {
            setTest(data)
        })
    }

    const sendComment = (e) => {
        // firebase.firestore().collection('comments').add({
        //     comment : message,
        //     name : info.firstname + info.lastname,
        //     user_id : info._id,
        //     articlID : data._id
        // }).then(res => {
        //     setMessage("")
        // })
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const fetchComments = async () => {
        const cmts = []
        // const response = firebase.firestore().collection('comments').onSnapshot(snap => {
        //     //
        //     snap.docs.map(item => {
        //         //console.log(item.data())
        //         cmts.push(item.data())
        //     })
        // })
        // const response = firebase.firestore().collection('comments').onSnapshot(snap => {
        //     snap.docs.forEach(item => {
        //         //console.log(item.data())

        //         cmts.push(item.data())
        //     })
        //     //console.log(cmts)
        //     setComments(cmts)
        // })

        // const data = await response.get()
        // data.docs.forEach(item => {
        //     //console.log(item.data())
        //     setComments([...comments,item.data()])
        // })
        //console.log(cmts)
    }

    useEffect(() => {
        //fetchComments();
        fetchTest();
    }, [])

    //console.log(tests)
    // tests.map(cmt => {
        //console.log(cmt.comment, cmt.articlID, data._id)
        // if(cmt.articlID == data._id){
            
        // }
    // })

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
                                <h3>{data.title} + {data._id}</h3>
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
                                <div class="room-box">
                                    <div class="row">
                                        <div class="col-md">
                                            <div class="headings d-flex justify-content-between align-items-center mb-3">
                                                <h5>Les Commentaires</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-md">
                                            {/* <button onClick={setTest(!tests)}>test</button> */}
                                            {tests.map(i => {
                                                <p>{i.name}</p>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="room-box">
                                    <div class="row">
                                        <div className="col-md-10">
                                            <input type="hidden" value={info.firstname} class="form-control" />
                                        </div>
                                        <div className="col-md-10">
                                            <textarea onChange={handleChange} value={message} rows="4" type="text" class="form-control" ></textarea>
                                        </div>
                                        <div className="col-md-2">
                                            <button onClick={sendComment} class="btn btn-theme">Send</button>
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