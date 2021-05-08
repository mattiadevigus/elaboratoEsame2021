import axios from 'axios';
import { Component } from 'react';
import Base from './../../../Modules/Base';
import Navbar from './../../Partials/Navbar';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }
    }

    componentDidMount = () => {
        if(sessionStorage.getItem("token") !== null) {
            window.location.replace("/dashboard");
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandle = (e) => {
        e.preventDefault();
        axios.post(`http://${Base.getIp()}:${Base.getPort()}/login`, this.state)
            .then(res => {
                if(res.data[0].usr_check === 0) {
                    this.setState({ errorMessage: "Wrong Credentials!" });
                } else {
                    sessionStorage.setItem("token", this.state.email);
                    window.location.replace("/dashboard");
                }
            })
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="formSection">

                    <form method="post" className="w3-animate-top" onSubmit={this.submitHandle}>

                        <img src="/img/helmet.png" alt="logo" />
                        <hr />
                        <span>Please, insert your credentials to access in private area</span>
                        <hr />

                        <input type="email" name="email" id="email" placeholder="EMAIL" value={this.state.username} onChange={this.changeHandler} />
                        <input type="password" name="password" id="password" placeholder="PASSWORD" value={this.state.password} onChange={this.changeHandler} />

                        <hr />
                        <p className="red">{this.state.errorMessage}</p>
                        <button>Go</button>
                    </form>
                </section>
            </div>
        )
    }

}

export default Login;