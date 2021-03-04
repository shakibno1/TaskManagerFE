import React, { Component } from 'react'
import Http from '../../services/http.service';
import { API_URL } from '../constant/Constants';

class UserList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userList: [],
            loding: true,
            showList: true,
            showCreate: false,
        }
    }
    componentDidMount = () => {
        this.userList();
        // console.log("Loding");
    }

    addNew = () => {
        this.setState({
            showCreate: true,
            showList: false,
        })
    }

    backToList = () => {
        this.setState({
            showCreate: false,
            showList: true,
        })
    }

    userList = () => {
        const path = "user/list";
        Http.get(path).then(res => {
            this.setState({
                userList : res.data.userList
            })
        });
    }


    render() {
        const { userList } = this.state;
        const data = userList.map((user, index) => {
            return (
                <tr key={index+1}>
                    <td scope="row">{index+1}</td>
                    <td>Mark</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                </tr>
            )
        })

        return (
            <div>
                <section className="content">
                    <div className="container-fluid">
                        {this.state.showList &&
                            (<div className="row clearfix">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="card">
                                        <div className="header">
                                            <h2>
                                                User List
                                        </h2>
                                            <ul className="header-dropdown m-r--5">
                                                <button type="button" class="btn bg-teal waves-effect" onClick={this.addNew.bind(this)}>
                                                    +
                                            </button>
                                            </ul>
                                        </div>
                                        <div className="body table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>SL No.</th>
                                                        <th>FIRST NAME</th>
                                                        <th>User Name</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   {data}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}

                        {this.state.showCreate &&
                            (
                                <div className="row clearfix">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="card">
                                            <div className="header">
                                                <h2>
                                                    Create User
                                                </h2>
                                                <ul className="header-dropdown m-r--5">
                                                    <li className="dropdown">
                                                        <a href="javascript:void(0);" onClick={this.backToList.bind(this)} role="button" >
                                                            <i className="material-icons">keyboard_backspace</i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="body">
                                                <form>
                                                    <label for="email_address">Email Address</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="email_address" className="form-control" placeholder="Enter your email address" />
                                                        </div>
                                                    </div>
                                                    <label for="password">Password</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="password" id="password" className="form-control" placeholder="Enter your password" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <button type="button" className="btn bg-pink waves-effect">Save</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                    </div>
                </section>
            </div>
        )
    }
}
export default UserList;


