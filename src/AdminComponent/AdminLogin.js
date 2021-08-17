import React, { useEffect, useState } from "react"
import { toast, ToastContainer, Zoom } from "react-toastify"
import { useHistory } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin () {

    // init history:
    let history = useHistory()

    // get data from input
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const Admin = () => {

        // initialise toast config
        toast.configure()

        // check auth with JWT:
        fetch("http://localhost:3001/api/admins/Auth", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : email,
                password : password
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data.accessToken)
            localStorage.setItem('token', data.accessToken)
            if(data.accessToken){
                // fetch for data to login:
                fetch("http://localhost:3001/api/admins/all", {
                    headers : {
                        'Authorization' : 'Bearer ' + data.accessToken
                    }
                }).then(res => {
                    return res.json()
                }).then(data => {
                    // map for data:
                    data.map(admin => {
                        //check email & password if the same to log in:
                        if(email == admin.email && password == admin.password){
                            toast.info("Vous etes Connecté")
                            localStorage.setItem('adminInfo', JSON.stringify(admin))
                            //console.log(JSON.parse(localStorage.getItem('adminInfo')))
                            history.push("/AdminDashboard");
                        }
                    })
                })
            } else {
                toast.error("Vérifiez vos Informations !!!")
            }
        })

    }

    useEffect(() => {

    }, [])

    return (
        <div id="login-page">
            <div class="container">
            <div class="form-login" action="index.html">
                <h2 class="form-login-heading">Se Connecter</h2>
                <div class="login-wrap">
                <input type="email" class="form-control" onChange={event => setEmail(event.target.value)} placeholder="Email d'administrateur" autofocus required/>
                <br />
                <input type="password" class="form-control" onChange={event => setPassword(event.target.value)} placeholder="Mot de Passe d'administrateur" required/>
                <div id="result"></div>
                <label class="checkbox">
                    <span class="pull-right">
                        <br />
                    {/* <a data-toggle="modal" href="login.html#myModal">Mot de passe oublié ?</a> */}
                    </span>
                    </label>
                <button class="btn btn-theme btn-block" href="index.html" onClick={Admin} type="submit"><i class="fa fa-lock"></i> S'identifier</button>
                </div>
                <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        
                        {/* <h4 class="modal-title">Mot de passe oublié ?</h4> */}
                    </div>
                    {/* <div class="modal-body">
                        <p>Entrez Votre Email Pour Récuperer Votre Mot de Passe.</p>
                        <input type="email" name="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix" required/>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">Retour</button>
                        <button class="btn btn-theme" type="button">Valider</button>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AdminLogin