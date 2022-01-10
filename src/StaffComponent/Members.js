import Header from './Header';
import SideBar from './SideBar';
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

function MembersManagement () {

    // initialise toast config
    toast.configure()

    //  init states :
    const [members, setMembers] = useState([])

    // render members :
    const renderMembers = async () => {
        fetch("http://localhost:3001/api/clients/all").then(res => {
            return res.json()
        }).then(data => {
            // console.log(data)
            setMembers(data)
        })
    }

    // edit on member status :
    const editMember = async (id, is_valid) => {
        // console.log(id, status)
        fetch(`http://localhost:3001/api/clients/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                is_valid : !is_valid
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            renderMembers()
            toast.dark(data.message)
        })
    }

    // renderMembers()

    useEffect(() => {
        renderMembers()
    }, [])

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
                                            {/* <th>Date de naissance</th> */}
                                            <th>Address</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((i) => (
                                            <tr key={i._id}>
                                                <td>{i._id}</td>
                                                <td>{i.firstname}</td>
                                                <td>{i.lastname}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                <td>{i.adress}</td>
                                                <td>{i.is_valid == false ?
                                                    <button onClick={() => {editMember(i._id, i.is_valid)}} className="btn btn-warning">Not Valid</button>
                                                    :
                                                    <button onClick={() => {editMember(i._id, i.is_valid)}} className="btn btn-success">Is Valid</button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                        {/* <tr>
                                            <td>1</td>
                                            <td>Naoufal</td>
                                            <td>Benmansour</td>
                                            <td>naoufelbenmensour@gmail.com</td>
                                            <td>0614675855</td>
                                            <td>27-06-1996</td>
                                            <td>Rue 1 Lotissement 1</td>
                                            <td><button className="btn btn-info">Modifier</button> <button className="btn btn-danger">Supprimer</button> <button className="btn btn-warning">Suspendre</button></td>
                                        </tr> */}
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