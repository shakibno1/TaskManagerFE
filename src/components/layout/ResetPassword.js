import React, { Component } from 'react'
import Http from '../../services/http.service';
import { Multiselect } from 'multiselect-react-dropdown';
import moment from 'moment';
import { withAlert } from 'react-alert';
import AuthService from '../../services/auth.service';



class ResetPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            roleList: [],
            userList: [],
            passwordHistoryList: [],
            loding: true,
            showList: true,
            showCreate: false,
            password: "",
            remarks: "",
        }
        this.singleSelect = React.createRef();
    }


    componentDidMount = () => {
        this.passwordHistoryList();
        this.userList();
    }

    componentDidUpdate = (pP, pS, sS) => {
        if (this.state.loding !== pS.loding) {
            this.passwordHistoryList();
            this.setState({
                loding: false,
            });
        }
    }

    addNew = () => {
        this.setState({
            showCreate: true,
            showList: false,
        });
    }

    backToList = () => {
        this.setState({
            showCreate: false,
            showList: true,
        });
    }

    userList = () => {
        const path = "user/list";
        Http.get(path).then(res => {
            this.setState({
                userList: res.data.userList
            });
        });
    }

    passwordHistoryList = () => {
        const path = "reset/restHistoryList";
        Http.get(path).then(res => {
            this.setState({
                passwordHistoryList: res.data,
                loding: false,
            });
        });
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onSubmitFrom = (event) => {
        event.preventDefault();
        const { alert } = this.props;
        let path = "reset/resetPassword";
        var data = new FormData(); // Currently empty
        this.singleSelect.current.getSelectedItems().map(user => {
            data.append("username", user.username);
        });
        data.append("password", this.state.password);
        data.append("remarks", this.state.remarks);

        Http.save(path, data).then(res => {
            if (!res.data.error) {
                this.setState({
                    loding: true,
                    showList: true,
                    showCreate: false,
                    password: "",
                    remarks: "",
                });
                alert.success(res.data.success);
                AuthService.logout();
                // window.location.replace("/logIn");
            } else {
                alert.error(res.data.error);
            }
        });
    }


    render() {

        const { passwordHistoryList } = this.state;
        const data = passwordHistoryList.map((history, index) => {
            return (
                <tr key={index + 1}>
                    <td scope="row">{index + 1}</td>
                    <td>{history.username}</td>
                    <td>{history.change_by}</td>
                    <td>{moment(history.change_date).format("DD/MM/YYYY")}</td>
                    <td>{history.remarks}</td>
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
                                                Reset Password History
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
                                                        <th>User Name</th>
                                                        <th>Change By</th>
                                                        <th>Change Date</th>
                                                        <th>Remarks</th>
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
                                                    Reset Password
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
                                                <form onSubmit={this.onSubmitFrom.bind(this)}>
                                                    <label>User Name</label>
                                                    <div className="form-group">
                                                        <Multiselect
                                                            options={this.state.userList}
                                                            singleSelect
                                                            ref={this.singleSelect}
                                                            displayValue="username"
                                                        />
                                                    </div>

                                                    <label>New Password</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="password" class="form-control" name="password" id="passowrd"
                                                                value={this.state.password} placeholder="Password" onChange={this.onChangeHandler.bind(this)} />
                                                        </div>
                                                    </div>

                                                    <label>Remarks</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="remarks" name="remarks" className="form-control" value={this.state.remarks}
                                                                placeholder="Enter your remarks" onChange={this.onChangeHandler.bind(this)} />
                                                        </div>
                                                    </div>

                                                    <br />
                                                    <button type="submit" className="btn bg-pink waves-effect">Save</button>
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
export default withAlert()(ResetPassword); 