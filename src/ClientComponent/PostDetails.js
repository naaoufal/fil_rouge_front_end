import { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from "react-toastify"
import Header from './Header'
import './styles/index.css'
import ModalConn from "./Modals/ModalConn"
import './styles/index.css'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5qVfIxocmlU7yDhhcQuOhFYQyLauWykg",
    authDomain: "comments-56966.firebaseapp.com",
    projectId: "comments-56966",
    storageBucket: "comments-56966.appspot.com",
    messagingSenderId: "893622129199",
    appId: "1:893622129199:web:16c9a7846001e6a5b06cda"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();


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

    // const fetchTest = () => {
    //     fetch(process.env.REACT_APP_PUBLIC_URL+`/tags/publicTags`).then(res => {
    //         return res.json()
    //     }).then(data => {
    //         console.log(data)
    //         setTest(data)
    //     })
    // }

    const sendComment = (e) => {
        if(info != null) {
            firebase.firestore().collection('comments').add({
                articlID : location.state._id,
                comment : message,
                name : info.firstname + info.lastname,
                user_id : info._id
            }).then(res => {
                fetchComments()
            })
            // const db = admin.database().ref("posts/comments");
            // const userRef = db.child("subComments");
            // userRef.set({
            //     articlID : location.state._id,
            //     comment : message,
            //     name : info.firstname,
            //     user_id : info._id,
            //     dateComment : new Date()
            // })
            // fetch("http://localhost:3001/api/comments/addComment", {
            //     method : 'POST',
            //     headers : {
            //         'Content-Type' : 'application/json'
            //     },
            //     body : JSON.stringify({
            //         //idComment : Math.random() * (1 - 100) + 1,
            //         articleID : location.state._id,
            //         comment : message,
            //         name : info.firstname,
            //         userID : info._id,
            //         //dateComment : new Date()
            //     })
            // }).then(res => {
            //     //res.json()
            //     fetchComments()
            // })
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    // window.addEventListener('load', () => {
    //     fetchComments();
    // }) 

    const fetchComments = async () => {
        const arr = []
        await firebase.firestore().collection("comments").onSnapshot(snap => {
            snap.docs.map(com => {
                //console.log(com.data())
                arr.push(com.data())
            })
        })
        
        //console.log(all)

        // all.docs.map(snap => {
        //     //console.log(snap.data())
        //     arr.push(snap.data())
        // })

        //console.log(arr)

        setComments(arr)


        // await fetch("http://localhost:3001/api/comments/allComments", {
        //     headers : {
        //         'Content-Type' : 'application/json',
        //         // 'Accept': 'application/json'
        //     }
        // }).then(res => {
        //     return res.json()
        // }).then(data => {
        //     //console.log(data)
        //     setComments(data)
        // })
    }

    useEffect(() => {
        fetchComments();
        //fetchTest()
    }, [1])

    
    console.log(comments)

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
                                                {/* {tests && tests.map((i) => {
                                                    <p>{i.name}</p>
                                                })} */}
                                            </div>
                                            {comments.length != 0 ? 
                                            <>
                                                {comments && comments.map((j) => (
                                                    <p>{j.comment}</p>
                                                ))}
                                            </>
                                            : <p>they is no comment yet</p>}
                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                                <div className="room-box">
                                    {info != null ?
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
                                    :
                                    null}
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