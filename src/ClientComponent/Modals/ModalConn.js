import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from "react-toastify"
import FacebookAuth from 'react-facebook-auth'

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
        // console.log(fname, lname, imageIns, genderIns, emailIns, addIns, teleIns, passIns)
        fetch("http://localhost:3001/api/clients/add", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                firstname : fname,
                lastname : lname,
                gender : genderIns,
                email : emailIns,
                adress : addIns,
                phone : teleIns,
                password : passIns,
                is_valid : false,
                suspended : false
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data) {
                toast.success("You Register Successfuly plz Wait to Valid your account")
            }
        })
    }

    // facebook auth :
    const handleAuth = async () => {
        console.log("working")
        // fetch("http://localhost:3001/facebook/auth").then(res => {
        //     return res.json()
        // })
    }

    const MyFacebookButton = ({ onClick }) => (
        <button onClick={onClick}>
          Login with facebook
        </button>
    )
       
    const authenticate = (response) => {
        let [fname, lname] = response.name.split(' ', 2)
        // console.log(fname)
        // console.log(lname)
        // console.log(response)
        if(response) {
            fetch("http://localhost:3001/api/clients/add", {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    firstname : fname,
                    lastname : lname,
                    gender : "Empty Value",
                    email : response.email,
                    adress : "Empty Value",
                    phone : 1223344551,
                    password : fname,
                    is_valid : false,
                    suspended : false
                })
            }).then(res => {
                if(res) {
                    toast.info("User added Successfuly Plz Wait to Valid Your Request")
                }
            })
        }
    }
       

    // Google Auth :
    // const submitGoogleAuth = () => {
    //     //console.log("this is work")
    //     fetch("http://localhost:3001/auth/google").then(res => {
    //         return res.json()
    //     })
    // }

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
                        <br />
                        <div className="row">
                            <div className="col-md-4">
                                <hr></hr>
                            </div>
                            <div className="col-md-4">
                                <center style={{marginTop : "10px"}}>
                                    <p>OU</p>
                                </center>
                            </div>
                            <div className="col-md-4">
                                <hr></hr>
                            </div>
                        </div>
                        <div className="d-flex">
                            <FacebookAuth
                            appId="1631059897234576"
                            callback={authenticate}
                            component={MyFacebookButton}
                            ></FacebookAuth>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a onClick={handleAuth} style={{
                                    color : "white",
                                    padding : "10px 93px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-facebook">
                                    <i class="fa fa-facebook fa-fw"></i> 
                                    Se Connecter avec Facebook
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a href="http://localhost:3001/auth/google" style={{
                                    color : "white",
                                    backgroundColor : "#dd4b39",
                                    padding : "10px 102px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-google">
                                    <i class="fa fa-google fa-fw"></i> 
                                    Se Connecter avec Google
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a style={{
                                    color : "white",
                                    // backgroundColor : "#dd4b39",
                                    padding : "10px 104px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-twitter">
                                    <i class="fa fa-twitter fa-fw"></i> 
                                    Se Connecter avec Twitter
                                </a>
                            </div>
                        </div>
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
                            <input onChange={event => setImageIns(event.target.value)} type="file" className="default" />
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
                        <br />
                        <div className="row">
                            <div className="col-md-4">
                                <hr></hr>
                            </div>
                            <div className="col-md-4">
                                <center style={{marginTop : "10px"}}>
                                    <p>OU</p>
                                </center>
                            </div>
                            <div className="col-md-4">
                                <hr></hr>
                            </div>
                        </div>
                        <div className="d-flex">
                            <FacebookAuth
                            appId="1631059897234576"
                            callback={authenticate}
                            component={MyFacebookButton}
                            ></FacebookAuth>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a onClick={handleAuth} style={{
                                    color : "white",
                                    padding : "10px 93px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-facebook">
                                    <i class="fa fa-facebook fa-fw"></i> 
                                    Se Connecter avec Facebook
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a href="http://localhost:3001/auth/google" style={{
                                    color : "white",
                                    backgroundColor : "#dd4b39",
                                    padding : "10px 102px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-google">
                                    <i class="fa fa-google fa-fw"></i> 
                                    Se Connecter avec Google
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a style={{
                                    color : "white",
                                    // backgroundColor : "#dd4b39",
                                    padding : "10px 104px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-twitter">
                                    <i class="fa fa-twitter fa-fw"></i> 
                                    Se Connecter avec Twitter
                                </a>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <br />
                        <div className="row">
                            <div className="col-md-4">
                                <hr></hr>
                            </div>
                            <div className="col-md-4">
                                <center style={{marginTop : "10px"}}>
                                    <p>OU</p>
                                </center>
                            </div>
                            <div className="col-md-4">
                                <hr></hr>
                            </div>
                        </div>
                        <div className="d-flex">
                            <FacebookAuth
                            appId="1631059897234576"
                            callback={authenticate}
                            component={MyFacebookButton}
                            ></FacebookAuth>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a onClick={handleAuth} style={{
                                    color : "white",
                                    padding : "10px 93px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-facebook">
                                    <i class="fa fa-facebook fa-fw"></i> 
                                    Se Connecter avec Facebook
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a href="http://localhost:3001/auth/google" style={{
                                    color : "white",
                                    backgroundColor : "#dd4b39",
                                    padding : "10px 102px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-google">
                                    <i class="fa fa-google fa-fw"></i> 
                                    Se Connecter avec Google
                                </a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-12">
                                <a style={{
                                    color : "white",
                                    // backgroundColor : "#dd4b39",
                                    padding : "10px 104px",
                                    margin : "22px 0px 0px 0px"
                                }} class="btn btn-lg btn-social btn-twitter">
                                    <i class="fa fa-twitter fa-fw"></i> 
                                    Se Connecter avec Twitter
                                </a>
                            </div>
                        </div>
                    </>
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