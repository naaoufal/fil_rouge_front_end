import { Link, useHistory } from "react-router-dom";

function SideBar () {

    // init history:
    const history = useHistory()

    // check token if exist:
    const token = localStorage.getItem('token')
    const info = JSON.parse(localStorage.getItem('adminInfo'))

    // if(token) {
    //     // put some code here
    // } else {
    //     history.push("/AdminLogin")
    // }

    return (
        <aside>
            <div id="sidebar" class="nav-collapse">
                <ul class="sidebar-menu" id="nav-accordion">
                <p class="centered"><Link><img src="" class="img-circle" width="80" /></Link></p>
                {/* <h5 class="centered">{info.firstname} {info.lastname}</h5> */}
                <br /> <br />
                    <li>
                        <Link to="/AdminDashboard">
                        <span>Informations Générales</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staff">
                        <span>Gestion des Modérateurs</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/posts">
                        <span>Gestion des Posts</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tags">
                        <span>Gestion des Tags et Themes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacts">
                        <span>Gestion des Contacts</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar