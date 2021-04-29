import { Component } from 'react';
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
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/`)
            .then((res) => {
                this.setState({ data: res.data });
            })
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
                        <h3>SESSIONS LIST</h3>
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
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((session, i) => {
                                    return(
                                    <tr>
                                        <td>{session.ses_serverName}</td>
                                        <td>{session.ses_creation.split("GMT")[0]}</td>
                                        <td>{session.ses_track}</td>
                                        <td>{session.ses_weather}</td>
                                        <td>{session.ses_type}</td>
                                    </tr>)
                                })}
                                <tr>
                                    <td>Nome del server</td>
                                    <td>20 Novembre 2021</td>
                                    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png" alt="flag" /> | <img src="https://www.formula1.it/admin/foto/circuiti/circuito_3.png" alt="" /></td>
                                    <td><i className="fas fa-cloud-rain"></i></td>
                                    <td>FP</td>
                                </tr>
                                <tr>
                                    <td>Nome del server</td>
                                    <td>20 Novembre 2021</td>
                                    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png" alt="flag" /> | <img src="https://www.formula1.it/admin/foto/circuiti/circuito_3.png" alt="" /></td>
                                    <td><i className="fas fa-cloud-rain"></i></td>
                                    <td>FP</td>
                                </tr>
                                <tr>
                                    <td>Nome del server</td>
                                    <td>20 Novembre 2021</td>
                                    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png" alt="flag" /> | <img src="https://www.formula1.it/admin/foto/circuiti/circuito_3.png" alt="" /></td>
                                    <td><i className="fas fa-cloud-rain"></i></td>
                                    <td>FP</td>
                                </tr>
                                <tr>
                                    <td>Nome del server</td>
                                    <td>20 Novembre 2021</td>
                                    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png" alt="flag" /> | <img src="https://www.formula1.it/admin/foto/circuiti/circuito_3.png" alt="" /></td>
                                    <td><i className="fas fa-cloud-rain"></i></td>
                                    <td>FP</td>
                                </tr>
                                <tr>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                </tr>
                                <tr>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                </tr>
                                <tr>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                    <td>Sas</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        )
    }
}

export default App;