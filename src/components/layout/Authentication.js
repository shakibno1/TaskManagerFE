import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from "../constant/Constants";
import AlertMsg from "../constant/AlertMsg";
import Auth from '../../services/auth.service'



class Authentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            username: "",
            email: "",
            password: ""
        }
    }

    inputs = {
        username: "",
        email: "",
        password: ""
    }

    onClickLogIn = (event) => {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password,
        }
        Auth.login(userInfo).then((response) => {
            // if (data.role.includes("ROLE_ADMIN"))
            if (response.token) {
                this.props.history.push("/adminDashboard")
                window.location.reload(true);
            }
        })
    }

    onClickRegistration = (event) => {
        event.preventDefault();
        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post(API_URL + "signUp", data).then((response) => {
            let res = response.data;
            if (res !== "") {
                this.setState({
                    username: "",
                    email: "",
                    password: "",
                    message: res,
                });
                // this.props.history.push("#logIn");
                window.location.reload("/");
            }
        });
    }

    changeHander = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                {this.state.message !== "" ? <AlertMsg /> : null}
                <body class="login">
                    <div>
                        <a class="hiddenanchor" id="signup"></a>
                        <a class="hiddenanchor" id="logIn"></a>

                        <div class="login_wrapper">
                            <div class="animate form login_form">
                                <section class="login_content">
                                    <form>
                                        <h1>Login</h1>
                                        <div>
                                            <input type="text" class="form-control" name="username"
                                                id="username" placeholder="Username"
                                                onChange={this.changeHander.bind(this)} required="" />
                                        </div>
                                        <div>
                                            <input type="password" name="password" id="password" class="form-control"
                                                placeholder="Password" onChange={this.changeHander.bind(this)} required="" />
                                        </div>
                                        <div>
                                            <button class="btn btn-secondary btn-lg" onClick={this.onClickLogIn.bind(this)}>Log in</button>
                                            {/* <a class="reset_pass" href="#">Lost your password?</a> */}
                                        </div>

                                        <div class="clearfix"></div>

                                        <div class="separator">
                                            <p class="change_link">New to site?
                                                <a href="#signup" class="to_register"> Create Account </a>
                                            </p>

                                            <div class="clearfix"></div>
                                            <br />

                                            <div>
                                                <h1><i class="fa fa-paw"></i>  Task Manager</h1>
                                                <p>©2020 All Rights Reserved. Task Manager</p>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>

                            <div id="register" class="animate form registration_form">
                                <section class="login_content">
                                    <form>
                                        <h1>Create Account</h1>
                                        <div>
                                            <input type="text" class="form-control" name="username"
                                                id="username" placeholder="username" value={this.state.username} onChange={this.changeHander.bind(this)} required="" />
                                        </div>
                                        <div>
                                            <input type="email" class="form-control" name="email"
                                                id="email" placeholder="email" value={this.state.email} onChange={this.changeHander.bind(this)} required="" />
                                        </div>
                                        <div>
                                            <input type="password" class="form-control" name="password"
                                                id="password" placeholder="Password" value={this.state.password} onChange={this.changeHander.bind(this)} required="" />
                                        </div>
                                        <div>
                                            <button class="btn btn-secondary btn-lg" onClick={this.onClickRegistration.bind(this)}>Submit</button>
                                        </div>

                                        <div class="clearfix"></div>

                                        <div class="separator">
                                            <p class="change_link">Already a member ?
                                                <a href="#logIn" class="to_register"> Log in </a>
                                            </p>

                                            <div class="clearfix"></div>
                                            <br />

                                            <div>
                                                <h1><i class="fa fa-paw"></i>  Task Manager</h1>
                                                <p>©2020 All Rights Reserved. Task Manager</p>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                </body>

            </div>
        )
    }
}
export default Authentication;
