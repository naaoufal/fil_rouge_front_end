import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../ClientComponent/Header';
import SideBar from './SideBar';
import './style/main.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function TagManagement () {

    // initialise toast config
    toast.configure()

    const token = localStorage.getItem('token')
    const [name, setName] = useState("")
    const [err, setError] = useState("")
    const [idTag, setID] = useState("")
    const [desc, setDesc] = useState("")
    const [tags, setTags] = useState([])
    const [currName, setCurrName] = useState("")
    const [currDesc, setCurrDesc] = useState("")

    // clear Inputs after submit :
    function resetInputs () {
        document.querySelector('#nm').value = ""
        document.querySelector('#desc').value = ""
    }

    // render tags data :
    function renderTags () {
        fetch("http://localhost:3001/api/tags/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            setTags(data)
        })
    }

    // add new tag : 
    function addNewTag () {
        const name = document.getElementById('nm').value
        const desc = document.getElementById('desc').value
        if(name && desc) {
           fetch("http://localhost:3001/api/tags/add", {
               method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body : JSON.stringify({
                    name : name,
                    desc : desc
                })
            }).then(res => {
                resetInputs()
                renderTags()
            })
            toast.success("Les Informations Sont Bien Insérer", {
                position : "bottom-right"
            })
        } else {
            toast.warning("Remplir les Inputs SVP !!!", {
                position: "bottom-right"
            })
        }
        renderTags()
    }

    // delete tag by Id :
    function deleteTag (id) {
        fetch(`http://localhost:3001/api/tags/delete/${id}`, {
            method : 'DELETE'
        }).then(res => {
            renderTags()
            toast.error("Tag Est Bien Supprimer !!!", {
                position: "bottom-right"
            })
        })
    }

    // edit a tag : 
    function editTag (id) {
        setID(id)
        fetch("http://localhost:3001/api/tags/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            data.map(i => {
                if(i._id == id) {
                    document.getElementById('nm1').value = i.name
                    document.getElementById('desc1').value = i.desc
                }
            })
        })
    }
    function editTagData(){
        //console.log("working", idTag, currName, currDesc, name, desc)
        if(idTag && currName && currDesc) {
            fetch(`http://localhost:3001/api/tags/edit/${idTag}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body : JSON.stringify({
                    name : currName,
                    desc : currDesc
                })
            }).then(res => {
                //resetEditedInputs()
                renderTags()
            })
            toast.success("Les Informations Sont Bien Modifier", {
                position : "bottom-right"
            })
        } else {
            toast.warning("Remplir les Inputs SVP !!!", {
                position : "bottom-right"
            })
        }
    }

    // init history:
    let history = useHistory()
    const info = JSON.parse(localStorage.getItem('adminInfo'))

    // logout function
    function logOut () {
        localStorage.clear()
        toast.configure()
        toast.warning("Vous etes Deconnecter " + info.firstname)
        history.push("/AdminLogin")
    }

    useEffect(() => {
        renderTags()
        if(token) {
            console.log(info)
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
                    <h3><i className="fa fa-angle-right"></i> Gestion des Tags et Themes</h3>
                    <div className="row">
                        <div class="col-md-12">
                            <div class="content-panel">
                                {/* <h4><i class="fa fa-angle-right"></i> Gestion des Tags et Themes</h4> */}
                                <a className="btn btn-primary" id="add" data-toggle="modal" href="#myModal">Ajouter Nouveau Tag</a>
                                {/* modal start */}
                                <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Ajotuer Nouveau Tag</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div className="group-control">
                                                <p>Entrer Le Nom de Tag :</p>
                                                <input onChange={event => setName(event.target.value)} type="text" name="nm" autocomplete="off" class="form-control placeholder-no-fix" id="nm"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Enter Description du Tag :</p>
                                                <textarea onChange={event => setDesc(event.target.value)} className="form-control" name="desc" rows="8" cols="80" id="desc"></textarea>
                                            </div>
                                            <br/>
                                            <div id="err"></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button data-dismiss="modal" class="btn btn-default" type="button">Retour</button>
                                            <button data-dismiss="modal" class="btn btn-theme" onClick={addNewTag} type="button">Ajouter</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal end */}
                                
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nom du Tag</th>
                                            <th>Description du Tag</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="modifier">
                                        {tags.map((i) => (
                                            <tr key={i._id}>
                                                <td>{i.name}</td>
                                                <td>{i.desc}</td>
                                                <td><button data-toggle="modal" href="#mymodal1" className="btn btn-success" onClick={() => editTag(i._id)}>Modifier</button> <button onClick={() => deleteTag(i._id)} className="btn btn-danger">Supprimer</button></td>
                                                {/* <input type="text" value={i._id} id="full_id"/> */}
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
                                                    <input onChange={event => setCurrName(event.target.value)} type="text" name="nm1" class="form-control" id="nm1"/>
                                                </div>
                                                <div className="group-control">
                                                    <p>Enter Description du Tag :</p>
                                                    <textarea onChange={event => setCurrDesc(event.target.value)} className="form-control" name="desc1" rows="8" cols="80" id="desc1"></textarea>
                                                </div>
                                                <br/>
                                                <div id="err1"></div>
                                            </form>
                                            </div>
                                            <div class="modal-footer" id="modifier">
                                                <button data-dismiss="modal" class="btn btn-default" type="button">Retour</button>
                                                <button data-dismiss="modal" class="btn btn-theme" id="btnmod" type="submit" onClick={()=>editTagData()}>Modifier</button>
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

export default TagManagement