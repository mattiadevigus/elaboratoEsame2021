import axios from 'axios';
import { Component } from 'react';
import Base from './../../Modules/Base';
import ChartJS from './../../Modules/Chart';

class Chart extends Component {

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let sesId = (window.location.href).split("/")[4];
        let driverId = (window.location.href).split("/")[5];
        ChartJS.lineChart("laps");
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/session/${sesId}/${driverId}`)
            .then(() => {
                /* ChartJS.lineChart(); */
            })
    }

    render = () => {
        return (
            <div>
                <section id="sessionDetailSection">
                    <div id="sessionTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>LAPS OF MATTIA</h1>
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
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>STATS</h1>
                    </div>
                    <div id="chartContainer">
                        <div className="row">
                            <div className="col-lg-6">
                                <h2>LAPS COMPARE</h2>
                                <canvas id="laps"></canvas>
                            </div>
                            <div className="col-lg-6">
                                <i className="fas fa-tachometer-alt"></i>
                                <h1>AVERAGE SPEED</h1>
                                <h1>452.65km/h</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <i className="fas fa-tachometer-alt"></i>
                                <h1>AVERAGE SPEED</h1>
                                <h1>452.65km/h</h1>
                            </div>
                            <div className="col-lg-6">
                                <i className="fas fa-tachometer-alt"></i>
                                <h1>AVERAGE SPEED</h1>
                                <h1>452.65km/h</h1>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}

export default Chart;