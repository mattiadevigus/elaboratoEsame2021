import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Base from './../../../Modules/Base';
import Navbar from './../../Partials/Navbar';
import Footer from './../../Partials/Footer';

class Timetable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        Base.checkLogin();
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/timetable`)
            .then((res) => {
                this.setState({ data: res.data });
            })
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section className="w3-animate-opacity" id="sessionSection">
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
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    this.state.data.map((time, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td className="only-desktop">{time.tim_sessionDate}</td>
                                                <td>{Base.getFullTime((time.tim_totalTime * 1000))}</td>
                                                <td><i onClick={() => {
                                                    axios.post(`http://${Base.getIp()}:${Base.getPort()}/delete/${time.tim_id}`)
                                                        .then(() => {window.location.replace("/timetable")});
                                                }} className="i-link far fa-trash-alt"></i></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Timetable;