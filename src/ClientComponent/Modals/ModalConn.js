import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from "react-toastify"

function ModalConn () {

    let history = useHistory()
    // initialise toast config
    toast.configure()
    // statse for connextion :
    const [emailCon, setEmailCon] = useState("")
    const [passCon, setPassCon] = useState("")
    const [check, setCheck] = useState("")
    // states for inscription :
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [emailIns, setEmailIns] = useState("")
    const [imageIns, setImageIns] = useState("")
    const [genderIns, setGenderIns] = useState("")
    const [addIns, setAddIns] = useState("")
    const [teleIns, setTeleIns] = useState("")
    const [passIns, setPassIns] = useState("")

    // check if user conencted or not to publish a new post :
    const checkPost = (event) => {
        //console.log(event.target.value)
        setCheck(event.target.value)
    }

    // function for connexion :
    const connectTo = () => {

        fetch("http://localhost:3001/api/clients/auth", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : emailCon,
                password : passCon
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data.accessToken || data.message)
            if(data.accessToken) {
                sessionStorage.setItem('token', data.accessToken)
                toast.success("Connecté(e)")
                fetch("http://localhost:3001/api/clients/all", {
                    headers : {
                        'Authorization' : 'Bearer ' + data.accessToken
                    }
                }).then(res => {
                    return res.json()
                }).then(info => {
                    info.map((j) => {
                        if(j.email == emailCon && j.password == passCon) {
                            //console.log(j)
                            localStorage.setItem('clientInfo', JSON.stringify(j))
                            //window.location.reload()
                            history.push("/")
                        }
                    })
                })
                //window.location.reload()
            } else {
                toast.error(data.message)
            }
        })
    }

    // function to create new client :
    const createClient = () => {
        console.log(fname, lname, imageIns, genderIns, emailIns, addIns, teleIns, passIns)
    }

    return (
        <div class="modal fade" id="sign" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Inscription / Connexion</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div className="d-flex">
                        <div className="col-md-6">
                            <button style={{padding : "16px"}} class="btn btn-theme btn-block" value="insc" onClick={checkPost}>Inscription</button>
                        </div>
                        <div className="col-md-6">
                            <button style={{padding : "16px"}} class="btn btn-theme btn-block" value="conn" onClick={checkPost}>Connexion</button>
                        </div>
                    </div>
                    {/* <div className="group-control">
                        <label>Ecrire Votre Question :</label>
                        <input className="form-control placeholder-no-fix" />
                    </div> */}
                    {check == "conn" ?
                    <>
                        <hr></hr>
                        <div className="group-control">
                            {/* <label>Entrer Votre Email</label> */}
                            <input onChange={event => setEmailCon(event.target.value)} placeholder="Entrer Votre Email" type="text" className="form-control placeholder-no-fix" />
                        </div>
                        <br />
                        <div className="group-control">
                            {/* <label>Entrer Votre Mot de passe</label> */}
                            <input onChange={event => setPassCon(event.target.value)} placeholder="Entrer Votre Mot de passe" type="password" className="form-control placeholder-no-fix" />
                        </div>
                        <hr></hr>
                    </>
                    :
                    check == "insc" ?
                    <>
                        <hr></hr>
                        <div className="group-control">
                            <input  onChange={event => setFname(event.target.value)} placeholder="Entrer Votre Nom" type="text" className="form-control placeholder-no-fix" />
                        </div>
                        <br />
                        <div className="group-control">
                            <input onChange={event => setLname(event.target.value)} placeholder="Entrer Votre Prenom" type="text" className="form-control placeholder-no-fix" />
                        </div>
                        <br />
                        <div className="group-control">
                            <input onChange={event => setImageIns(event.target.value)} placeholder="Entrer Votre Email" type="file" className="form-control placeholder-no-fix" />
                        </div>
                        <br />
                        <div className="group-control">
                            <select onChange={event => setGenderIns(event.target.value)} id="sel" className="form-control placeholder-no-fix">
                                <option>Selectionner Votre Sexe</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <br />
                        <div className="group-control">
                            <input onChange={event => setAddIns(event.target.value)} placeholder="Entrer Votre address" type="text" className="form-control placeholder-no-fix" />
                        </div>
                        <br />
                        <div className="group-control">
                            <input onChange={event => setTeleIns(event.target.value)} placeholder="Entrer Votre Telephone" type="text" className="form-control placeholder-no-fix" />
                        </div>
                        <br />
                        <div className="group-control">
                            <input onChange={event => setPassIns(event.target.value)} placeholder="Entrer Votre Mot de passe" type="password" className="form-control placeholder-no-fix" />
                        </div>
                        <hr></hr>
                    </>
                    :
                    null
                    }
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
                    {check == "conn" ?
                        <button type="button" class="btn btn-theme" data-dismiss="modal" onClick={connectTo}>Connexion</button>
                    :
                    check == "insc" ?
                        <button type="button" data-dismiss="modal" onClick={createClient} class="btn btn-theme">Inscription</button>
                    :
                    null
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default ModalConn;