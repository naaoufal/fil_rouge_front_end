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

<<<<<<< HEAD
    const fetchTest = async () => {
        await fetch(process.env.REACT_APP_PUBLIC_URL+`/tags/publicTags`).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            setTest(data)
        })
    }
=======
    // const fetchTest = () => {
    //     fetch(process.env.REACT_APP_PUBLIC_URL+`/tags/publicTags`).then(res => {
    //         return res.json()
    //     }).then(data => {
    //         console.log(data)
    //         setTest(data)
    //     })
    // }
>>>>>>> 4d7f5457c7d7333ba88c3fd6354f116d88f9c03d

    const sendComment = (e) => {
        if(info != null) {
            // firebase.firestore().collection('comments').add({
            //     articlID : location.state._id,
            //     comment : message,
            //     name : info.firstname + info.lastname,
            //     user_id : info._id
            // }).then(res => {
            //     setMessage("")
            // })
            // const db = admin.database().ref("posts/comments");
            // const userRef = db.child("subComments");
            // userRef.set({
            //     articlID : location.state._id,
            //     comment : message,
            //     name : info.firstname,
            //     user_id : info._id,
            //     dateComment : new Date()
            // })
            fetch("http://localhost:3001/api/comments/addComment", {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    //idComment : Math.random() * (1 - 100) + 1,
                    articleID : location.state._id,
                    comment : message,
                    name : info.firstname,
                    userID : info._id,
                    //dateComment : new Date()
                })
            }).then(res => {
                res.json()
            }).then(data => {
                console.log(data)
            })
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    // window.addEventListener('load', () => {
    //     fetchComments();
    // }) 

    const fetchComments = async () => {
        // firebase.firestore().collection('comments').orderBy('dateComment').get().then((snap) => {
        //     snap.forEach(async(e) => {
        //         var data = e.data()
        //         await setComments(arr => [...arr, data])
        //     })
        // })
        fetch("http://localhost:3001/api/comments/allComments", {
            headers : {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        })
    }

    useEffect(() => {
<<<<<<< HEAD
        //fetchComments();
        fetchTest();
    }, []);
    //console.log(tests)
    // tests.map(cmt => {
        //console.log(cmt.comment, cmt.articlID, data._id)
        // if(cmt.articlID == data._id){
            
        // }
    // })
=======
        fetchComments();
        //fetchTest()
    }, [])


    console.log(comments)
>>>>>>> 4d7f5457c7d7333ba88c3fd6354f116d88f9c03d

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
                                                {tests && tests.map((i) => {
                                                    <p>{i.name}</p>
                                                })}
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
<<<<<<< HEAD
                                    
                                    <div className="row">
                                        <div className="col-md">
                                            {/* <button onClick={setTest(!tests)}>test</button> */}
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tests && tests.map(i => {
                                                        <tr>
                                                            <td>{i._id}</td>
                                                            <td>{i.name}</td>
                                                        </tr>
                                                    })}  
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
=======
>>>>>>> 4d7f5457c7d7333ba88c3fd6354f116d88f9c03d
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