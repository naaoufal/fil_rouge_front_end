

function Register () {

    

    return (
        <div id="login-page">
            <div class="container">
            <div class="form-login" action="index.html">
                <h2 class="form-login-heading">S'inscrire</h2>
                <div class="login-wrap">
                <input type="text" class="form-control" placeholder="Entrer Votre Nom" autofocus />
                <br />
                <input type="text" class="form-control" placeholder="Entrer Votre Prenom" autofocus />
                <br />
                <input type="email" class="form-control" placeholder="Entrer Votre Email" autofocus />
                <br />
                <input type="text" class="form-control" placeholder="Entrer Votre Numéro de Téléphone" autofocus />
                <br />
                <input type="date" class="form-control" autofocus />
                <br />
                <input type="text" class="form-control" placeholder="Entrer Votre Addresse" autofocus />
                <br />
                <input type="password" class="form-control" placeholder="Mot de Passe" />
                <br />
                <button class="btn btn-theme btn-block" type="button" ><i class="fa fa-lock"></i> S'identifier</button>
                <hr />
                <div class="registration">
                    Si vous etes deja inscrit ?<br/>
                    <a class="" href="#">
                    Se Connecter
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register