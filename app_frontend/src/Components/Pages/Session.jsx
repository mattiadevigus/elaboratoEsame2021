import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Base from '../../Modules/Base';
import axios from 'axios';

class Session extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            serverName: "",
            weatherValue: "",
            totalDrivers: 0,
            bestTime: ""
        }

    }

    componentDidMount = () => {
        window.scrollTo(0,0);
        let id = (window.location.href).split("/")[4];
        document.title = `Session ${id}`
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/session/${id}`)
            .then(res => {
                console.log(res.data[1]);
                this.setState({ data: res.data[0], serverName: res.data[1][0].ses_serverName, weatherValue: res.data[1][0].ses_weather, totalDrivers: res.data[1][1].tim_driverCount, bestTime: res.data[1][2].tim_totalTime });
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
                        <h3>TIMETABLE</h3>
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((time, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{time.tim_driverName}</td>
                                                <td>{time.tim_sectorOne}</td>
                                                <td>{time.tim_sectorTwo}</td>
                                                <td>{time.tim_sectorTree}</td>
                                                <td>{Base.getFullTime((time.tim_totalTime * 1000))}</td>
                                                <td>{Base.getGap((this.state.bestTime * 1000), (time.tim_totalTime * 1000))}</td>
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
                        <h3>DETAILS</h3>
                    </div>
                    <div id="sessionContainer">
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4">
                                <h1 className="statRed" id="statSession"><i className="fas fa-server"></i></h1>
                                <hr/>
                                <h3 id="statSession">{ this.state.serverName }</h3>
                            </div>
                            <div className="col-lg-4">
                                <h1 id="statSession" className="statRed">{ Base.getFullTime((this.state.bestTime * 1000)) }</h1>
                                <hr/>
                                <h3 id="statSession">BEST TIME</h3>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4">
                                <h1 className="statRed" id="statSession"> {this.state.totalDrivers}</h1>
                                <hr/>
                                <h3 id="statSession">TOTAL DRIVERS</h3>
                            </div>
                            <div className="col-lg-4">
                                <h1 className="rotate statRed" id="statSession"> { (this.state.weatherValue <= 0 ? <div className="fa-1x"><i className="fas fa-sun fa-spin"></i></div> : <i className="fas fa-cloud-rain"></i>)   } </h1>
                                <hr/>
                                <h3 id="statSession">WEATHER</h3>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Session;