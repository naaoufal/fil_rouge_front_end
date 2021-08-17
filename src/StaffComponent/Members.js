import Header from './Header';
import SideBar from './SideBar';

function MembersManagement () {



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
                                <h4><i class="fa fa-angle-right"></i> Gestion des Members</h4>
                                <hr />
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Prenom</th>
                                            <th>Email</th>
                                            <th>Telephone</th>
                                            <th>Date de naissance</th>
                                            <th>Address</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Naoufal</td>
                                            <td>Benmansour</td>
                                            <td>naoufelbenmensour@gmail.com</td>
                                            <td>0614675855</td>
                                            <td>27-06-1996</td>
                                            <td>Rue 1 Lotissement 1</td>
                                            <td><button className="btn btn-info">Modifier</button> <button className="btn btn-danger">Supprimer</button> <button className="btn btn-warning">Suspendre</button></td>
                                        </tr>
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

export default MembersManagement