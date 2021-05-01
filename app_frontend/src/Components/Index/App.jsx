import { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../Partials/Navbar';
import Base from '../../Modules/Base';
import axios from 'axios';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        axios.get(`http://${Base.getIp()}:${Base.getPort()}`)
            .then((res) => {
                this.setState({ data: res.data });
            });
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="homeSection" className="w3-animate-opacity">
                    <div id="homeContainer">
                        <img src="/img/icon.png" alt="" />
                        <hr />
                        <p id="homeDesc">Car session timing system. Powered by Assetto Corsa Competizione Server <br /> Created by <a href="#">Mattia Devigus</a></p>
                        <hr />
                    </div>
                    <div id="arrowCont">
                        <a href="#2">
                            <div className="arrow">
                                <span></span>
                                <span></span>
                            </div>
                        </a>
                    </div>
                </section>
                <a name="2"></a>
                <section id="homeSection2" className="w3-animate-opacity">
                    <div id="homeTitle">
                        <i className="fas fa-clock"></i>
                        <hr />
                        <h1>SESSIONS LIST</h1>
                    </div>
                    <div id="homeContainer2">
                        <table id="sessionList">
                            <thead>
                                <tr>
                                    <th>Server Name</th>
                                    <th>Date</th>
                                    <th>Track</th>
                                    <th>Weather</th>
                                    <th>Type</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((session, i) => {
                                        return (
                                            <tr>
                                                <td>{session.ses_serverName}</td>
                                                <td>{session.ses_creation.split("GMT")[0]}</td>
                                                <td><img src={session.tra_flag} alt="" /> | <img src={session.tra_track} /></td>
                                                <td> {(session.ses_weather < 0.1 ? <i className="fas fa-sun"></i> : <i className="fas fa-cloud-rain"></i>)} </td>
                                                <td>{session.ses_type}</td>
                                                <td><Link target="_blank" to={`session/${session.ses_id}`}><i className="fas fa-arrow-circle-right"></i></Link></td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div >
        )
    }
}

export default App;