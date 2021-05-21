import { Component } from 'react';

class Footer extends Component {
    render = () => {
        return (
            <footer>
                <div className="row">
                    <div className="col">
                        <i className="fa-2x fab fa-react"></i>
                        <i className="fa-2x fab fa-node"></i>
                        <i className="fa-2x fas fa-chart-area"></i>
                        <i className="fa-2x fas fa-database"></i>
                        <i className="fa-2x fab fa-github"></i>
                    </div>
                </div>
            </footer >
        )
    }
}

export default Footer;