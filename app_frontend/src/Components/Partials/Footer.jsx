import { Component } from 'react';

class Footer extends Component {
    render = () => {
        return (
            <footer>
                <div className="row">
                    <div className="col">
                        <a href="https://it.reactjs.org/">
                            <i className="fa-2x fab fa-react"></i>
                        </a>
                        <a href="https://nodejs.org/it/">
                            <i className="fa-2x fab fa-node"></i>
                        </a>
                        <a href="https://www.chartjs.org/">
                            <i className="fa-2x fas fa-chart-area"></i>
                        </a>
                        <a href="https://www.npmjs.com/package/mysql2">
                            <i className="fa-2x fas fa-database"></i>
                        </a>
                        <a href="https://github.com/mattiadevigus/elaboratoEsame2021">
                            <i className="fa-2x fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </footer >
        )
    }
}

export default Footer;