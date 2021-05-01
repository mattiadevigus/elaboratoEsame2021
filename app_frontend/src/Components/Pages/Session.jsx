import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './../Partials/Navbar';
import Base from '../../Modules/Base';


class Session extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            serverName: "",
            weatherValue: "",
            totalDrivers: 0,
            bestTime: "",
            bestSessions: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let id = (window.location.href).split("/")[4];
        document.title = `Session detail: ${id}`;
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/session/${id}`)
            .then(res => {
                this.setState({ data: res.data[0], serverName: res.data[1][0].ses_serverName, weatherValue: res.data[1][0].ses_weather, totalDrivers: res.data[1][1].tim_driverCount, bestTime: res.data[1][2].tim_totalTime, bestSessions: res.data[1][3] });
            })

    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="sessionSection" className="w3-animate-opacity">
                    <div id="sessionTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>TIMETABLE</h1>
                    </div>
                    <div id="sessionContainer">
                        <table id="sessionList">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>S1</th>
                                    <th>S2</th>
                                    <th>S3</th>
                                    <th>Time</th>
                                    <th>Gap</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    this.state.data.map((time, i) => {
                                        let driverLink = "/chart/" + time.tim_driverName;
                                        return (
                                            <tr>
                                                <td>{ i + 1 }</td>
                                                <td>{ time.tim_driverName }</td>
                                                <td>{ ((time.tim_sectorOne === this.state.bestSessions.bestSectorOne ? <span className="bestEle">{time.tim_sectorOne}</span> : time.tim_sectorOne)) }</td>
                                                <td>{ (time.tim_sectorTwo === this.state.bestSessions.bestSectorTwo ? <span className="bestEle">{time.tim_sectorTwo}</span> : time.tim_sectorTwo) }</td>
                                                <td>{ (time.tim_sectorTree === this.state.bestSessions.bestSectorTree ? <span className="bestEle">{time.tim_sectorTree}</span> : time.tim_sectorTree) }</td>
                                                <td>{ Base.getFullTime((time.tim_totalTime * 1000)) }</td>
                                                <td>{ Base.getGap((this.state.bestTime * 1000), (time.tim_totalTime * 1000)) }</td>
                                                <td><Link to={driverLink}><i className="fas fa-chart-line"></i></Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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
                <section id="sessionSection2">
                    <div id="sessionTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>DETAILS</h1>
                    </div>
                    <div id="sessionContainer">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-5">
                                <h1 id="statSession"><i className="fas fa-server"></i></h1>
                                <hr />
                                <h3 id="statSession">{ this.state.serverName }</h3>
                            </div>
                            <div className="col-lg-5">
                                <h1 id="statSession" className="bestEle">{ Base.getFullTime((this.state.bestTime * 1000)) }</h1>
                                <hr />
                                <h3 id="statSession">BEST TIME</h3>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-5">
                                <h1 id="statSession"> { this.state.totalDrivers }</h1>
                                <hr />
                                <h3 id="statSession">TOTAL DRIVERS</h3>
                            </div>
                            <div className="col-lg-5">
                                <h1 className="rotate" id="statSession"> { (this.state.weatherValue <= 0 ? <i className="fas fa-sun fa-spin "></i> : <i className="fas fa-cloud-rain"></i>) } </h1>
                                <hr />
                                <h3 id="statSession">WEATHER</h3>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Session;