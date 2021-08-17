import { useEffect, useState } from 'react';
import Header from '../ClientComponent/Header';
import SideBar from './SideBar';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';

function ModManagement () {

    // initialise toast config
    toast.configure()

    const token = localStorage.getItem('token')
    const [staffs, setStaffs] = useState([])
    const [firstname, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [email, setEmail] = useState([])
    const [adress, setAdress] = useState([])
    const [phone, setPhone] = useState([])
    const [password, setPassword] = useState([])
    const [birth, setBirth] = useState([])
    const [idStaff, setID] = useState("")
    // set Current values :
    const [currFirstname, setCurrFirstName] = useState("")
    const [currLastname, setCurrLastName] = useState("")
    const [currEmail, setCurrEmail] = useState("")
    const [currAdress, setCurrAdress] = useState("")
    const [currPhone, setCurrPhone] = useState("")
    const [currPassword, setCurrPassword] = useState("")
    const [currBirth, setCurrBirth] = useState("")

    // clear Input function :
    function clearInputs () {
        document.getElementById('nm').value = ""
        document.getElementById('pr').value = ""
        document.getElementById('em').value = ""
        document.getElementById('ad').value = ""
        document.getElementById('ph').value = ""
        document.getElementById('ps').value = ""
        document.getElementById('gender').value = ""
        document.getElementById('br').value = ""
    }

    // email and phone regex :
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phoneformat = /^\d{10}$/;

    // render staffs data :
    function renderStaff () {
        fetch("http://localhost:3001/api/staffs/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            setStaffs(data)
        })
    }

    // add new staff :
    function addMod () {
        const em = document.querySelector('#em').value
        const gender = document.querySelector('#gender').value

        // check if data fields not Empty !!! :
        if (firstname && lastName && email && adress && phone && password && birth != "") {
            // check for validation email and phone :
            if(em.match(mailformat) && phone.match(phoneformat)){

                // post new staff
                fetch("http://localhost:3001/api/staffs/add", {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    },
                    body : JSON.stringify({
                        firstname : firstname,
                        lastname : lastName,
                        gender : gender,
                        email : email,
                        adress : adress,
                        phone : phone,
                        password : password,
                        birth : birth,
                        is_reseted : false,
                        suspended : false
                    })
                }).then(res => {
                    clearInputs()
                    renderStaff()
                })
                toast.success("Modérateur Bien Ajouter !!!", {
                    position : "bottom-right"
                })
            } else {
                toast.warning("Y a Un Erreur En Email ou Téléphone !!!", {
                    position : "bottom-right"
                })
            }
        } else {
            toast.warning("Remplir les Inputs SVP !!!", {
                position : "bottom-right"
            })
        }
        renderStaff()
    }

    // edit account if suspended or NOT !! :
    function editStat (id, suspended) {
        console.log(id, suspended)
        fetch(`http://localhost:3001/api/staffs/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                suspended : !suspended
            })
        }).then(res => {
            renderStaff()
            toast.dark("Status a Bien Modifier ", {
                position : "bottom-right"
            })
        })
    }

    // delete staff function :
    function deleteMod (id) {
        //console.log(id)
        fetch(`http://localhost:3001/api/staffs/delete/${id}`, {
            method : 'DELETE',
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            renderStaff()
            toast.error("Modérateur Est Bien Supprimer !!!", {
                position: "bottom-right"
            })
        })
    }

    // edit staff function : 
    function editStaff (id) {
        //console.log(id)
        setID(id)
        fetch("http://localhost:3001/api/staffs/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            data.map(i => {
                if(i._id == id) {
                    document.getElementById('nm1').value = i.firstname
                    document.getElementById('pr1').value = i.lastname
                    document.getElementById('em1').value = i.email
                    document.getElementById('ad1').value = i.adress
                    document.getElementById('ph1').value = i.phone
                    document.getElementById('ps1').value = i.password
                }
            })
        })
    }

    function editStaffData () {
        const gr = document.getElementById('gender1').value
        //console.log(idStaff, currFirstname, currLastname, gr, currEmail, currAdress, currPhone, currPassword, currBirth)
        if(currFirstname && currLastname && currEmail && currAdress && currPhone && currPassword && currBirth != ""){
            if(currEmail.match(mailformat) && currPhone.match(phoneformat)) {
                fetch(`http://localhost:3001/api/staffs/edit/${idStaff}`, {
                    method : 'PATCH',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    },
                    body : JSON.stringify({
                        firstname : currFirstname,
                        lastname : currLastname,
                        gender : gr,
                        email : currEmail,
                        adress : currAdress,
                        phone : currPhone,
                        password : currPassword,
                        birth : currBirth
                    })
                }).then(res => {
                    renderStaff()
                })
                toast.success("Les Informations Sont Bien Modifier", {
                    position : "bottom-right"
                })
            } else {
                toast.warning("Y a Un Erreur En Email ou Téléphone !!!", {
                    position : "bottom-right"
                })
            }
        } else {
            toast.warning("Remplir les Inputs SVP !!!", {
                position : "bottom-right"
            })
        }
    }

    // init history:
    let history = useHistory()
    
    const info = JSON.parse(localStorage.getItem('adminInfo'))
    const [admin, setAdmin] = useState([])
    //console.log(token)

    // logout function
    function logOut () {
        localStorage.clear()
        toast.configure()
        toast.warning("Vous etes Deconnecter " + info.firstname)
        history.push("/AdminLogin")
    }

    useEffect(() => {
        if(token) {
            renderStaff()
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
                    <h3><i className="fa fa-angle-right"></i> Gestion des Modérateurs</h3>
                    <div className="row">
                        <div class="col-md-12">
                            <div class="content-panel">
                                {/* <h4><i class="fa fa-angle-right"></i> Gestion des Modérateurs</h4> */}
                                <a className="btn btn-primary" id="add" data-toggle="modal" href="#myModal">Ajouter Nouveau Modérateur</a>
                                {/* modal start */}
                                <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Ajotuer Nouveau Modérateur</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div className="group-control">
                                                <p>Entrer Le nom de Modérateur :</p>
                                                <input onChange={event => setFirstName(event.target.value)} type="text" name="nm" autocomplete="off" class="form-control placeholder-no-fix" id="nm"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Le Prenom de Modérateur :</p>
                                                <input onChange={event => setLastName(event.target.value)} type="text" name="pr" autocomplete="off" class="form-control placeholder-no-fix" id="pr"/>
                                            </div>
                                            <div className="form-group">
                                                <p>Choisir Votre Sexe :</p>
                                                <select id="gender" className="form-control">
                                                    <option className="">Choisir Votre Sexe</option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                </select>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Email de Modérateur :</p>
                                                <input onChange={event => setEmail(event.target.value)} type="email" name="em" autocomplete="off" class="form-control placeholder-no-fix" id="em"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer L'address de Modérateur :</p>
                                                <input onChange={event => setAdress(event.target.value)} type="text" name="ad" autocomplete="off" class="form-control placeholder-no-fix" id="ad"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Téléphone de Modérateur :</p>
                                                <input onChange={event => setPhone(event.target.value)} type="text" name="ph" autocomplete="off" class="form-control placeholder-no-fix" id="ph"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Mot de Passe de Modérateur :</p>
                                                <input onChange={event => setPassword(event.target.value)} type="password" name="ps" autocomplete="off" class="form-control placeholder-no-fix" id="ps"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Date de Naissance de Modérateur :</p>
                                                <input onChange={event => setBirth(event.target.value)} type="date" name="em" autocomplete="off" class="form-control placeholder-no-fix" id="br"/>
                                            </div>
                                            <br/>
                                            <div id="err"></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button data-dismiss="modal" class="btn btn-default" type="button">Retour</button>
                                            <button data-dismiss="modal" class="btn btn-theme" onClick={addMod} type="button">Ajouter</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal end */}
                                {/* edit modal start */}
                                <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="mymodal1" class="modal fade">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Modifier Un Modérateur</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div className="group-control">
                                                <p>Entrer Le nom de Modérateur :</p>
                                                <input onChange={event => setCurrFirstName(event.target.value)} type="text" name="nm" autocomplete="off" class="form-control placeholder-no-fix" id="nm1"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Le Prenom de Modérateur :</p>
                                                <input onChange={event => setCurrLastName(event.target.value)} type="text" name="pr" autocomplete="off" class="form-control placeholder-no-fix" id="pr1"/>
                                            </div>
                                            <div className="form-group">
                                                <p>Choisir Votre Sexe :</p>
                                                <select id="gender1" className="form-control">
                                                    <option className="">Choisir Votre Sexe</option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                </select>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Email de Modérateur :</p>
                                                <input onChange={event => setCurrEmail(event.target.value)} type="email" name="em" autocomplete="off" class="form-control placeholder-no-fix" id="em1"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer L'address de Modérateur :</p>
                                                <input onChange={event => setCurrAdress(event.target.value)} type="text" name="ad" autocomplete="off" class="form-control placeholder-no-fix" id="ad1"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Téléphone de Modérateur :</p>
                                                <input onChange={event => setCurrPhone(event.target.value)} type="text" name="ph" autocomplete="off" class="form-control placeholder-no-fix" id="ph1"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Mot de Passe de Modérateur :</p>
                                                <input onChange={event => setCurrPassword(event.target.value)} type="password" name="ps" autocomplete="off" class="form-control placeholder-no-fix" id="ps1"/>
                                            </div>
                                            <div className="group-control">
                                                <p>Entrer Date de Naissance de Modérateur :</p>
                                                <input onChange={event => setCurrBirth(event.target.value)} type="date" name="em" autocomplete="off" class="form-control placeholder-no-fix" id="br1"/>
                                            </div>
                                            <br/>
                                            <div id="err1"></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button data-dismiss="modal" class="btn btn-default" type="button">Retour</button>
                                            <button data-dismiss="modal" class="btn btn-theme" onClick={editStaffData} type="button">Modifier</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal end */}
                                <hr />
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Nom</th>
                                            <th>Prenom</th>
                                            <th>Sexe</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Date de naissance</th>
                                            <th>Address</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs.map((i) => (
                                            <tr key={i._id}>
                                                <td>{i.firstname}</td>
                                                <td>{i.lastname}</td>
                                                <td>{i.gender}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                <td>{i.birth.slice(0, 10)}</td>
                                                <td>{i.adress}</td>
                                                <td> 
                                                    { i.suspended == false ?
                                                    <button onClick={() => editStat(i._id)} className="btn btn-primary">Activer</button> 
                                                    : 
                                                    <button onClick={() => editStat(i._id, i.suspended)} className="btn btn-warning">Désactiver</button>
                                                    } <button className="btn btn-success" data-toggle="modal" href="#mymodal1" onClick={() => editStaff(i._id)}>Modifier</button> <button onClick={() => deleteMod(i._id)} className="btn btn-danger">Supprimer</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default ModManagement