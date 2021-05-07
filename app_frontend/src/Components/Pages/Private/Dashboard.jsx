import { Component } from 'react';
import Navbar from './../../Partials/Navbar';

class Dashboard extends Component {
    render = () => {
        return (
            <div>
                <Navbar />
                <section className="w3-animate-opacity" id="dashboardSection">
                    <img src="/img/icon.png" alt="" />
                    <div className="container">
                        <hr />
                        <div className="row">
                            <div className="col">
                                <button><i className="fas fa-3x fa-stream" /> <hr /> <h5>MANAGE SESSION TIMETABLE</h5></button>
                            </div>
                            <div className="col">
                                <button><i className="fas fa-3x fa-user-circle" /> <hr /> <h5>EDIT YOUR ACCOUNT PROFILE</h5></button>
                            </div>
                            <div className="col">
                                <button><i className="fas fa-3x fa-sign-in-alt"></i> <hr /> <h5>EXIT FROM YOUR ACCOUNT</h5></button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Dashboard;