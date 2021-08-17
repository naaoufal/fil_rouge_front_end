import Header from '../ClientComponent/Header';
import { Link, useHistory } from "react-router-dom";
import SideBar from './SideBar';
import { useEffect } from 'react';

function ContManagement () {
    // init history
    let history = useHistory()

    function renderContactData () {
        console.log("Work")
    }

    // check if token exist:
    const token = localStorage.getItem('token')
    const info = JSON.parse(localStorage.getItem('adminInfo'))

    function logOut () {
        
    }

    useEffect(() => {
        if(token) {
            // put some code here !!
            // renderContactData()
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
                                <h4><i class="fa fa-angle-right"></i> Gestion des Contacts</h4>
                                <hr />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default ContManagement