import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Base from '../../Modules/Base';
import axios from 'axios';

class Session extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

    }

    componentDidMount = () => {
        let id = (window.location.href).split("/")[4];
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/session/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ data: res.data });
            })

    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="sessionSection">
                    <div id="homeTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h3>TIMETABLE</h3>
                    </div>
                    <div id="homeContainer2">
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
                                                <td>{ i + 1 }</td>
                                                <td>{ time.tim_driverName }</td>
                                                <td>{ time.tim_sectorOne }</td>
                                                <td>{ time.tim_sectorTwo }</td>
                                                <td>{ time.tim_sectorTree }</td>
                                                <td>{ Base.getFullTime((time.tim_totalTime*1000)) }</td>
                                                <td>+0.456</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        )
    }
}

export default Session;