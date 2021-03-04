import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from '../../services/auth.service'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorMsg: "",
            username: "",
            password: "",
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleHideMsg = (event) =>{
        this.setState({
            errorMsg : "",
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password,
        }
        Auth.login(userInfo).then((response) => {
            if (response.token) {
                window.location.replace("/adminDashboard")
            }
        }).catch(error => {
            if (error.response) {
                this.setState({
                    errorMsg: error.response.data.error
                })
            }
        });
    }

    render() {
        return (
            <div class="login-page">
                <div class="login-box">
                    <div class="logo">
                        <a href="javascript:void(0);">Login</a>
                    </div>
                    <div className="card">
                        <div className="body">
                            <form id="signIn" onSubmit={this.onSubmitHandler.bind(this)}>
                                {this.state.errorMsg == "" ?
                                    null 
                                    : 
                                    (
                                        <div className="alert alert-danger" role="alert" style={{textAlign:"center"}} >
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true" onClick={this.handleHideMsg}>×</span>
                                            </button>
                                             {"Invalid username or password"}
                                        </div>
                                    )

                                }
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons">person</i>
                                    </span>
                                    <div className="form-line">
                                        <input type="text" className="form-control" id="username"
                                            name="username" onChange={this.changeHandler.bind(this)} placeholder="Username" required autofocus />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons">lock</i>
                                    </span>
                                    <div className="form-line">
                                        <input type="password" className="form-control" id="password"
                                            name="password" onChange={this.changeHandler.bind(this)} placeholder="Password" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8 p-t-5">
                                        <input type="checkbox" name="rememberme" id="rememberme" className="filled-in chk-col-pink" />
                                        <label for="rememberme">Remember Me</label>
                                    </div>
                                    <div className="col-xs-4">
                                        <button className="btn btn-block bg-pink waves-effect" type="submit">SIGN IN</button>
                                    </div>
                                </div>
                                <div className="row m-t-15 m-b--20">
                                    <div className="col-xs-6">
                                        <Link to={"/signUp"}>Register Now!</Link>
                                    </div>
                                    <div className="col-xs-6 align-right">
                                        <Link to="/forgetPassword">Forgot Password?</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;