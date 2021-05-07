import { Component } from 'react';
import axios from 'axios';
import Navbar from './../Partials/Navbar';
import Base from '../../Modules/Base';
import Chart from '../../Modules/Chart';


class Session extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            sessionDate: "",
            bestSectors: [],
            totalLaps: 0,
            optimalTime: 0,
            totalLaps: 0,
            bestTime: 0
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let id = (window.location.href).split("/")[4];
        id = id.split("#")[0];
        document.title = `Session detail: ${id}`;

        axios.get(`http://${Base.getIp()}:${Base.getPort()}/timing/${id}`)
            .then(res => {
                console.log(res);
                this.setState({ data: res.data[0], sessionDate: id, bestSectors: res.data[1][0], bestTime: res.data[2][0], totalLaps: res.data[3][0] });
                Chart.lineChart("laps", res.data[0]);
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
                                    <th className="only-desktop">S1</th>
                                    <th className="only-desktop">S2</th>
                                    <th className="only-desktop">S3</th>
                                    <th>Time</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((time, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td className="only-desktop">{((time.tim_sectorOne === this.state.bestSectors.bestSectorOne ? <span className="bestEle">{time.tim_sectorOne}</span> : time.tim_sectorOne))}</td>
                                                <td className="only-desktop">{(time.tim_sectorTwo === this.state.bestSectors.bestSectorTwo ? <span className="bestEle">{time.tim_sectorTwo}</span> : time.tim_sectorTwo)}</td>
                                                <td className="only-desktop">{(time.tim_sectorTree === this.state.bestSectors.bestSectorTree ? <span className="bestEle">{time.tim_sectorTree}</span> : time.tim_sectorTree)}</td>
                                                <td>{(time.tim_totalTime === this.state.bestTime.tim_totalTime ? <span className="bestEle">{Base.getFullTime((time.tim_totalTime * 1000))}</span> : Base.getFullTime((time.tim_totalTime * 1000)))}</td>
                                                <td><i className="fas fa-chart-line"></i></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="only-desktop" id="tableFooter">
                            <h5>OPTIMAL TIME: <span className="bestEle"> {Base.getFullTime((this.state.bestSectors.bestSectorOne * 1000) + (this.state.bestSectors.bestSectorTwo * 1000) + (this.state.bestSectors.bestSectorTree * 1000))} </span> </h5>
                        </div>
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
                            <div className="col-6 col-lg-6">
                                <h1 id="statSession"><i className="fas fa-calendar"></i></h1>
                                <hr />
                                <h3 id="statSession">{this.state.sessionDate}</h3>
                            </div>
                            <div className="col-6 col-lg-6">
                                <h1 id="statSession" className="bestEle">{Base.getFullTime((this.state.bestTime.tim_totalTime * 1000))}</h1>
                                <hr />
                                <h3 id="statSession">BEST TIME</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <h1 id="statSession"> {this.state.totalLaps.tim_totalLaps}</h1>
                                <hr />
                                <h3 id="statSession">TOTAL LAPS</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="sessionSection2">
                    <div id="sessionTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>LAP TREND</h1>
                    </div>
                    <div id="chartContainer">
                        <canvas id="laps"></canvas>
                    </div>
                    <div id="legend">
                        <div className="row">
                            <div className="col-6">
                                <h5><i className="fas fa-square red"></i></h5> <h5>Session times</h5>
                            </div>
                            <div className="col-6">
                                <h5><i className="fas fa-square"></i></h5> <h5>Average</h5>
                            </div>
                        </div>
                    </div>


                </section>
            </div >
        )
    }
}

export default Session;