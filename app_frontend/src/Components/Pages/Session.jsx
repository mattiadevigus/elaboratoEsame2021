import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Base from '../../Modules/Base';
import axios from 'axios';

class Session extends Component {
    render = () => {
        return (
            <div>
                <Navbar />
                <h5>Ciao</h5>
            </div>
        )
    }
}

export default Session;