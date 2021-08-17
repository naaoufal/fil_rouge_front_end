import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import Header from './Header';
import SideBar from './SideBar';

function AdminDashboard () {

    // init history:
    let history = useHistory()

    const token = localStorage.getItem('token')
    console.log(token)

    // check if token exist or not:
    if(token) {
        console.log("this is good")
    } else {
        history.push("/AdminLogin")
    }

    return (
        <section id="container">
            <Header />
            <SideBar />
            <section id="main-content">
                <section className="wrapper">
                    <h3><i className="fa fa-angle-right"></i>Dashboard</h3>
                    <div className="row">
                        <div class="col-md-12">
                            <div class="content-panel">
                                <h4><i class="fa fa-angle-right"></i>Informations Générales</h4>
                                <hr />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default AdminDashboard