import axios from 'axios';
import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Base from './../../Modules/Base';
import ChartJS from './../../Modules/Chart';

class Chart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            driverName: (((window.location.href).split("/")[5]).split("#")[0]).replace("%20", " "),
            times: [""],
            avgSpeed: 0,
            bestTime: 0,
            bestDriverTime: 0
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let sesId = (window.location.href).split("/")[4];
        let driverId = (window.location.href).split("/")[5];

        axios.get(`http://${Base.getIp()}:${Base.getPort()}/session/${sesId}/${driverId}`)
            .then((res) => {
                console.log(res);
                this.setState({ times: res.data[0], avgSpeed: res.data[1], bestTime: res.data[2], bestDriverTime: res.data[3] });
                ChartJS.lineChart("laps", this.state.times);
            })
    }

    render = () => {
        return (
            <div>
                <section id="sessionDetailSection">
                    <Navbar />
                    <div id="sessionTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>LAPS OF <span className="baseEle">{this.state.driverName}</span></h1>
                    </div>
                    <div id="sessionContainer">
                        <table id="sessionList">
                            <thead>
                                <tr>
                                    <th>Lap</th>
                                    <th>S1</th>
                                    <th>S2</th>
                                    <th>S3</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    this.state.times.map((time, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{time.tim_sectorOne}</td>
                                                <td>{time.tim_sectorTwo}</td>
                                                <td>{time.tim_sectorTree}</td>
                                                <td>{(time.tim_totalTime === this.state.bestDriverTime ? <span className="personalBestEle"> {Base.getFullTime((time.tim_totalTime * 1000))}</span> : Base.getFullTime((time.tim_totalTime * 1000)))}</td>
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
                            </div>
                        </a>
                    </div>
                </section>
                <a name="2"></a>
                <section id="sessionDetailSection2">
                    <div id="sessionTitle">
                        <i className="fas fa-chart-line"></i>
                        <hr />
                        <h1>STATS</h1>
                    </div>
                    <div id="chartContainer">
                        <div className="row">
                            <div className="col col-lg-6">
                                <i className="fas fa-flag-checkered"></i>
                                <h3 className="only-desktop" id="statSession">AVERAGE SPEED (FL)</h3>
                                <hr />
                                <h2>{this.state.avgSpeed} KM/H</h2>
                            </div>
                            <div className="col col-lg-6">
                                <i className="fas fa-road"></i>
                                <h3 className="only-desktop" id="statSession">GAP FROM THE FIRST</h3>
                                <hr />
                                <h2 id="statSession">{Base.getGap((this.state.bestTime * 1000), (this.state.bestDriverTime * 1000))}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <i className="far fa-chart-bar"></i>
                                <h3>LAP TREND:</h3>
                                <canvas id="laps"></canvas>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}

export default Chart;