import Header from './Header';
import SideBar from './SideBar';

function CompManagement () {



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
                                <h4><i class="fa fa-angle-right"></i> Gestion des Compétitions</h4>
                                <hr />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default CompManagement