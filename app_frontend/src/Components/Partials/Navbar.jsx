import { Component } from 'react';

class Navbar extends Component {
    render = () => {
        return (
            <nav className="navbar fixed-top">
                <span className="navbar-brand"><img src="/img/helmet.png" alt="logo"/></span>
                <div className="navbar-right justify-content-end">
                    <i className="fas fa-sliders-h"></i>
                </div>
            </nav>
        )
    }
}

export default Navbar;