import React, { Component } from 'react'
import{Link} from 'react-router-dom';
import axios from "axios";
import {API_URL} from "../constant/Constants"
import { withAlert } from 'react-alert'


class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    changeHander = (event) =>{
        this.setState({
          [event.target.name] : event.target.value
        })
    }

    submitHandler = (event) =>{
        event.preventDefault();
        const { alert } = this.props;
        let data = {
            username : this.state.username,
            email : this.state.email ,
            password : this.state.password,
        }
        axios.post(API_URL + "signUp",data).then((response)=>{
           if(!response.data.userExit){
               alert.success(response.data.success);
               this.props.history.push('/');
           }else{
            alert.error(response.data.userExit);
           }
        })
    }
    
    render() {
        return (
            <div className="signup-page">
                <div className="signup-box">
                    <div className="logo">
                        <a href="javascript:void(0);">Sign up</a>
                        {/* <small>Admin BootStrap Based - Material Design</small> */}
                    </div>
                    <div className="card">
                        <div className="body">
                            <form id="signUp" onSubmit={this.submitHandler.bind(this)}>
                                {/* <div className="msg">Register a new membership</div> */}
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons">person</i>
                                    </span>
                                    <div className="form-line">
                                        <input type="text" className="form-control" id="username" name="username"
                                            placeholder="User name" onChange={this.changeHander.bind(this)} required autofocus />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons">email</i>
                                    </span>
                                    <div className="form-line">
                                        <input type="email" className="form-control" id="email"
                                            name="email" onChange={this.changeHander.bind(this)} placeholder="Email Address" required />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons">lock</i>
                                    </span>
                                    <div className="form-line">
                                        <input type="password" className="form-control" id="password" name="password"
                                            maxlength="6" onChange={this.changeHander.bind(this)} placeholder="Password" required />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons">lock</i>
                                    </span>
                                    <div className="form-line">
                                        <input type="password" className="form-control"
                                            name="confirm" minlength="6"  id="confirm"
                                            onChange={this.changeHander.bind(this)} placeholder="Confirm Password" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="terms" id="terms" className="filled-in chk-col-pink" />
                                    <label for="terms">I read and agree to the <a href="javascript:void(0);">terms of usage</a>.</label>
                                </div>

                                <button className="btn btn-block btn-lg bg-pink waves-effect" type="submit">SIGN UP</button>

                                <div className="m-t-25 m-b--5 align-center">
                                    <Link to={"/logIn"}>You already have a membership?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default  withAlert()(SignUp);
