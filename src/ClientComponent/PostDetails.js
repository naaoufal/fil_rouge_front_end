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
        const db = firebase.firestore();
        if(info != null) {
            db.collection('comments').add({
                articlID : data._id,
                comment : message,
                name : info.firstname + info.lastname,
                user_id : info._id,
                postStatus : data.stat_post,
                dateComment : Date.now()
            }).then(res => {
                setMessage(" ")
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

    // delete a comment :
    const deleteComment = async () => {
        await firebase.firestore().collection("comments").orderBy("dateComment").onSnapshot(snap => {
            const data = snap.docs.map(doc => {
                if(doc.data().user_id == info._id) {
                    return doc.data()
                } else {
                    return null
                }
            })
            
            // filred for emtpy comments value :
            const filtred = data.filter(element => {
                return element !== null && typeof element !== 'undefined'
            })

            // console.log(filtred)

        })
    }

    // handle delete of a comment :
    const handleDelete = async (e) => {
        console.log(e.value.comment)
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    // window.addEventListener('load', () => {
    //     fetchComments();
    // }) 

    const fetchComments = async () => {
        const arr = []
        await firebase.firestore().collection("comments").orderBy("dateComment").onSnapshot(snap => {
            const arr = snap.docs.map(doc => {
                console.log(doc.id)
                // id : doc.id
                //return doc.data()
                return doc.data()
            })

            console.log(arr)

            const filtredArr = arr && arr.map(i => {
                if(i.articlID == data._id) {
                    return i
                } else {
                    return false
                }
            })

            // console.log(filtredArr)
            setComments(filtredArr)
        })
        
        //console.log(all)

        // all.docs.map(snap => {
        //     //console.log(snap.data())
        //     arr.push(snap.data())
        // })

        //console.log(arr)

        //setComments(arr)


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
        fetchComments()
        deleteComment()
    }, [1])

    
    //console.log(comments)

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
                                            {comments && comments.map((j) => (
                                                <>
                                                    {j != "" ?
                                                    <div className="card p-3" style={{height : "auto"}}>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="user d-flex flex-row align-items-center">
                                                                <span>
                                                                    <small className="font-weight-bold text-primary">
                                                                        {j.name}
                                                                    </small>
                                                                </span>
                                                            </div>
                                                            <small>{Date(j.dateComment)}</small>
                                                        </div>
                                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                                            <div className="replay px-4">
                                                                <small>
                                                                    {j.comment}
                                                                </small>
                                                            </div>
                                                            <button onClick={handleDelete(j.comment)}>
                                                                {/* <p>{j.comment}</p> */}
                                                                <i className='fa fa-cog'></i>
                                                            </button>
                                                            {/* {j.postStatus == "Pending" ? 
                                                            <span className="badge bg-warning">En Attente</span>
                                                            :
                                                            <span className="badge bg-error">Pas Une Solution</span>
                                                            } */}
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                    }
                                                </>
                                            ))}
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
                                            <textarea onChange={handleChange} id="message" value={message} rows="4" type="text" class="form-control" ></textarea>
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