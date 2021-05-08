import { Component } from 'react';
import { Link } from 'react-router-dom';
import Base from './../../../Modules/Base';
import Navbar from './../../Partials/Navbar';

class Dashboard extends Component {

    componentDidMount = () => {
        Base.checkLogin();
    }

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
                                <Link to="/timetable">
                                    <button><i className="fas fa-3x fa-stream" /> <hr /> <h5>MANAGE SESSION TIMETABLE</h5></button>
                                </Link>
                            </div>
                            <div className="col">
                                <button onClick={() => {
                                    sessionStorage.removeItem("token");
                                    window.location.replace("/");
                                }} ><i className="fas fa-3x fa-sign-in-alt"></i> <hr /> <h5>EXIT FROM YOUR ACCOUNT</h5></button>
                            </div>
                        </div>
                        <hr />
                    </div>
                </section>
            </div >
        )
    }
}

export default Dashboard;