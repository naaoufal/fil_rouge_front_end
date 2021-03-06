import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../ClientComponent/Header';
import SideBar from './SideBar';

function AdminDashboard () {

    // init history:
    let history = useHistory()

    const token = localStorage.getItem('token')
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
        // check if token exist or not:
        if(token) {
            console.log(info)
            // var doughnutData = [{
            //     value: 70,
            //     color: "#FF6B6B"
            //   },
            //   {
            //     value: 30,
            //     color: "#fdfdfd"
            //   }
            // ];
            // var myDoughnut = new Chart(document.getElementById("serverstatus01").getContext("2d")).Doughnut(doughnutData);
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
                <section className="wrapper site-min-height">
                    <h3><i className="fa fa-angle-right"></i> G??n??rales Informations</h3>
                    <div className="row mt">
                        <div class="col-lg-12">
                            <div class="row content-panel">
                                <h4><i class="fa fa-angle-right"></i>Informations G??n??rales</h4>
                                <div class="col-md-4 profile-text">
                                    <h3>{info.firstname} {info.lastname}</h3>
                                    <h6>Role Administrateur</h6>
                                    <p>Mon Email : {info.email}</p>
                                    <p>Mon T??l??phone : +212 {info.phone}</p>
                                    <p>Mon Addresse : {info.adress}</p>
                                </div>
                                <div className="col-md-4 centered">
                                    <div class="profile-pic">
                                        <p><img src="" class="img-circle" /></p>
                                        <p>
                                            <button class="btn btn-theme"><i class="fa fa-check"></i> Follow</button>
                                            <button class="btn btn-theme02">Add</button>
                                        </p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row mt">
                            <div class="col-md-4 col-sm-4 mb">
                                <div class="grey-panel pn donut-chart">
                                    <div class="grey-header">
                                        <h5>SERVER LOAD</h5>
                                    </div>
                                    <canvas id="serverstatus01" height="120" width="120"></canvas>
                                    <div class="row">
                                        <div class="col-sm-6 col-xs-6 goleft">
                                            <p>Usage<br/>Increase:</p>
                                        </div>
                                        <div class="col-sm-6 col-xs-6">
                                            <h2>21%</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default AdminDashboard