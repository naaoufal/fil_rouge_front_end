import Header from '../ClientComponent/Header';
import SideBar from './SideBar';
import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function PostManagement () {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    // const [userID, setUserID] = useState("")
    // const [isValid, setIsValid] = useState(false)
    // const [statPost, setStatPost] = useState("")
    // const [date, setDate] = useState("")
    
    // initialise toast config
    toast.configure()

    // init history:
    let history = useHistory()

    const token = localStorage.getItem('token')
    const info = JSON.parse(localStorage.getItem('adminInfo'))
    const [admin, setAdmin] = useState([])
    const [posts, setPosts] = useState([])

    // logout function
    function logOut () {
        localStorage.clear()
        toast.configure()
        toast.warning("Vous etes Deconnecter")
        history.push("/AdminLogin")
    }

    // function to render Posts data :
    const renderPosts = () => {
        fetch("http://localhost:3001/api/posts/all").then(res => {
            return res.json()
        }).then(data => {
            setPosts(data)
        })
    }

    // function to edit post status :
    const editStat = (id, is_valid) => {
        //console.log(id, !JSON.parse(is_valid))
        fetch(`http://localhost:3001/api/posts/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                is_valid : !JSON.parse(is_valid)
            })
        }).then(res => {
            renderPosts()
        })
        if(is_valid == "false") {
            toast.success("Post a ete valider avec success", {
                position : "bottom-right"
            })
        } else {
            toast.error("Post a ete de-Valider avec success", {
                position : "bottom-right"
            })
        }
    }

    // function to edit post status :
    const editSolution = (id, stat_post) => {
        //console.log(id, stat_post)
        if(stat_post == "Pending") {
            fetch(`http://localhost:3001/api/posts/edit/${id}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    stat_post : "done"
                })
            }).then(res => {
                renderPosts()
            })
            toast.success("Post a ete resolu avec success", {
                position : "bottom-right"
            })
        } else {
            fetch(`http://localhost:3001/api/posts/edit/${id}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    stat_post : "Pending"
                })
            }).then(res => {
                renderPosts()
            })
            toast.warning("Post n aucune solution pour le moment !!", {
                position : "bottom-right"
            })
        }
    }

    // function to delete a post by ID :
    const deletePost = (id) => {
        fetch(`http://localhost:3001/api/posts/delete/${id}`, {
            method : 'DELETE'
        }).then(res => {
            renderPosts()
            toast.error("Post a ete supprimer avec success !!!", {
                position : "bottom-right"
            })
        })
    }

    useEffect(() => {
        // check if token exist or not:
        if(token) {
            //console.log(info)
            renderPosts()
        } else {
            history.push("/AdminLogin")
        }
    }, [])

    return (
        <section id="container">
            <header className="header black-bg">
                <div class="sidebar-toggle-box">
                    <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
                </div>
                <Link class="logo"><b>You<span>Forum</span></b></Link>
                <div class="top-menu">
                    <ul class="nav pull-right top-menu">
                        <li><Link onClick={logOut} class="logout">Se Deconnecter</Link></li>
                    </ul>
                </div>
            </header>
            <SideBar />
            <section id="main-content">
                <section className="wrapper">
                    <h3><i className="fa fa-angle-right"></i>Dashboard</h3>
                    <div className="row">
                        <div class="col-md-12">
                            <div class="content-panel">
                                {/* <h4><i class="fa fa-angle-right"></i> Gestion des Tags et Themes</h4> */}
                                {/* <a className="btn btn-primary" id="add" data-toggle="modal" href="#myModal">Ajouter Nouveau Tag</a> */}
                                {/* modal start */}
                                {/* <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Ajotuer Nouveau Post</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div className="group-control">
                                                <p>Entrer Le Titre de Votre Probleme :</p>
                                                <input onChange={event => setTitle(event.target.value)} type="text" name="nm" autocomplete="off" class="form-control placeholder-no-fix" id="nm"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Enter Description du Tag :</p>
                                                <textarea onChange={event => setDesc(event.target.value)} className="form-control" name="desc" rows="8" cols="80" id="desc"></textarea>
                                            </div>
                                            <br/>
                                            <div id="err"></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button data-dismiss="modal" class="btn btn-default" type="button">Retour</button> */}
                                            {/* <button data-dismiss="modal" class="btn btn-theme" onClick={addNewPost} type="button">Ajouter</button> */}
                                        {/* </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* modal end */}
                                
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nom du Tag</th>
                                            <th>CreatedAt</th>
                                            <th>Post Valider/Non</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="modifier">
                                        {posts.map((i) => (
                                            <tr key={i._id}>
                                                <td>{i.title}</td>
                                                <td>{i.createdAt}</td>
                                                {i.is_valid == "false" ?
                                                <td>
                                                    <button className="btn btn-info" onClick={() => {editStat(i._id, i.is_valid)}}>Valider</button>
                                                </td> 
                                                : 
                                                <td>
                                                    <button className="btn btn-warning" onClick={() => {editStat(i._id, i.is_valid)}}>De-Valider</button>
                                                </td>
                                                }
                                                <td>{i.stat_post == "Pending" ?
                                                    <button className="btn btn-warning" onClick={() => {editSolution(i._id, i.stat_post)}}>En Attente</button>
                                                    :
                                                    <button className="btn btn-info" onClick={() => {editSolution(i._id, i.stat_post)}}>Resolu</button>
                                                }</td>
                                                <td><button className="btn btn-danger" onClick={() => {deletePost(i._id)}}>Supprimer</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {/* modal start */}
                                    <div aria-hidden="true" aria-labelledby="myModalLabel1" role="dialog" tabindex="-1" id="mymodal1" class="modal fade">
                                        <div class="modal-dialog">
                                            
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Modifier un Tag</h4>
                                            </div>
                                            <div class="modal-body">
                                            <form>
                                                <div className="group-control">
                                                    <p>Entrer Le Nom de Tag :</p>
                                                    {/* <input onChange={event => setCurrName(event.target.value)} type="text" name="nm1" class="form-control" id="nm1"/> */}
                                                </div>
                                                <div className="group-control">
                                                    <p>Enter Description du Tag :</p>
                                                    {/* <textarea onChange={event => setCurrDesc(event.target.value)} className="form-control" name="desc1" rows="8" cols="80" id="desc1"></textarea> */}
                                                </div>
                                                <br/>
                                                <div id="err1"></div>
                                            </form>
                                            </div>
                                            <div class="modal-footer" id="modifier">
                                                {/* <button data-dismiss="modal" class="btn btn-default" type="button">Retour</button>
                                                <button data-dismiss="modal" class="btn btn-theme" id="btnmod" type="submit" onClick={()=>editTagData()}>Modifier</button> */}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* modal end */}
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default PostManagement