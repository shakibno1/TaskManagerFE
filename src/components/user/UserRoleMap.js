/*
  Note : This dropdown list using for system ::
  https://www.npmjs.com/package/multiselect-react-dropdown
*/
import React, { Component } from 'react'
import Http from '../../services/http.service';
import { API_URL } from '../constant/Constants';
import { Multiselect } from 'multiselect-react-dropdown';
import { withAlert } from 'react-alert';


class UserRoleMap extends Component {

    constructor(props) {
        super(props)

        this.state = {
            roleList: [],
            userList: [],
            roleMappingList: [],
            loading: true,
            showList: true,
            showCreate: false,
        }
        this.singleRef = React.createRef();
        this.multiRef = React.createRef();
    }

    componentDidMount = () => {
        this.userList();
        this.roleList();
        this.mappingList();
    }

    componentDidUpdate = (pP,pS,sS) => {
         if(this.state.loading !== pS.loading){
            this.mappingList();
            this.setState({
                loading : false,
            })
         }
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
                userList: res.data.userList,
                loading: false,
            })
        });
    }

    roleList = () => {
        const path = "role/list";
        Http.list(path).then(res => {
            console.log(res.data.roleList);
            this.setState({
                roleList: res.data.roleList,
                loading: false,
            })
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const { alert } = this.props;
        const path = "userRoleMap";
        var roleList = [];
        var data = new FormData();
        this.singleRef.current.getSelectedItems().map((user) => {
            data.append("username", user.username);
        });
        this.multiRef.current.getSelectedItems().map((role) => {
            roleList.push(role.name);
        });
        data.append("roleList", roleList)
        Http.save(path, data).then((res) => {
            if (!res.data.error) {
                this.setState({
                    loading: true,
                    showCreate: false,
                    showList: true,
                });
                alert.success(res.data.success);
            } else {
                alert.error(res.data.error);
            }
        });

        // for (var value of data.values()) {
        //     console.log(value);
        //  }
        // console.log(data);

    }

    mappingList = () => {
        let path = "userRoleMaps";
        Http.get(path).then((res) => {
            this.setState({
                roleMappingList: res.data,
                loading: false
            })
            //   console.log(res.data);
        });
    }

    render() {
        const { roleMappingList } = this.state;
        const data = roleMappingList.map((roleMapping, index) => {
            return (
                <tr key={index + 1}>
                    <td scope="row">{index + 1}</td>
                    <td>{roleMapping.user_name}</td>
                    <td>{roleMapping.role_name}</td>
                </tr>
            );
        });
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
                                                User Role Map
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
                                                        <th>Role Name</th>
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
                                                    Create User Role Map
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
                                                <form onSubmit={this.onSubmitHandler.bind(this)}>
                                                    <label>User Name</label>
                                                    <div className="form-group">
                                                        <Multiselect
                                                            options={this.state.userList}
                                                            singleSelect
                                                            ref={this.singleRef}
                                                            displayValue="username"
                                                        />
                                                    </div>

                                                    <label>Role</label>
                                                    <div className="form-group">
                                                        <Multiselect
                                                            options={this.state.roleList}
                                                            ref={this.multiRef}
                                                            displayValue="name"
                                                        />
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
export default withAlert()(UserRoleMap);