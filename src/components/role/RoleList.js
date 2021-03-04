import React, { Component } from 'react'
import Http from '../../services/http.service';
import { withAlert } from 'react-alert';

class RoleList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loding: true,
            showList: true,
            showCreate: false,
            id: "",
            name: "",
            remarks: "",
            roleList: []
        }
    }

    componentDidMount = () => {
        this.roleList();
    }

    componentDidUpdate = (prevProps, prevState, sS) => {
        if (this.state.loading !== prevState.loading) {
            this.roleList();
            this.setState({
                loading: false,
            });
        }
    }

    addNew = () => {
        this.setState({
            showCreate: true,
            showList: false,
            id: "",
            name: "",
            remarks: "",
        })
    }

    backToList = () => {
        this.setState({
            showCreate: false,
            showList: true,
        })
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let path = "";
        const { alert } = this.props;
        let data = {
            roleId: this.state.id,
            name: this.state.name,
            remarks: this.state.remarks,
        }

        /*:: NOTE: If Id is found then data will be update ::  
          :: So you should put the hidden filed in your submit form ::
         */
        if (this.state.id !== "") {
            path = "role/update";
            Http.update(path, data).then(res => {
                if (!res.data.error) {
                    alert.success(res.data.update)
                    this.setState({
                        showCreate: false,
                        showList: true,
                        loading: true,
                    });
                }else{
                 alert.error(res.data.error)
                }
            })
        } else {
            path = "role/save";
            Http.save(path, data).then(res => {
                if (!res.data.error) {
                    alert.success(res.data.success)
                    this.setState({
                        showCreate: false,
                        showList: true,
                        loading: true,
                    });
                }else{
                    alert.error(res.data.error)
                }
            })
        }

    }

    roleList = () => {
        const path = "role/list";
        Http.list(path).then(res => {
            this.setState({
                roleList: res.data.roleList,
                loading: false,
            })
        })
    }

    selectHandler = (id, data) => {
        let role = JSON.stringify(data)
        this.setState({
            id: data.id,
            name: data.name,
            remarks: data.remarks,
            showCreate: true,
            showList: false
        })
    }

    deleteHandler = (id) => {
        let path = "role/delete";
        const { alert } = this.props;
        let data = {
            roleId: id,
        }
        Http.delete(path, data).then(res => {
            console.log(res)
            if (!res.data.error) {
                alert.success(res.data.delete)
                this.setState({
                    loading: true,
                });
            } else {
                alert.error(res.data.error)
            }
        })
    }


    render() {
        const { roleList } = this.state
        const data = roleList.map((role, index) => {
            return (
                <tr key={index + 1}>
                    <td scope="row">{index + 1}</td>
                    <td>{role.name}</td>
                    <td>{role.remarks}</td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.selectHandler(role.id, role)}>edit</i>
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.deleteHandler(role.id)}>delete</i>
                    </td>
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
                                                Role List
                                             </h2>
                                            <ul className="header-dropdown m-r--5">
                                                <button type="button" className="btn bg-teal waves-effect" onClick={this.addNew.bind(this)}>
                                                    +
                                            </button>
                                            </ul>
                                        </div>
                                        <div className="body table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>SL NO.</th>
                                                        <th>Role Type</th>
                                                        <th>Remarks</th>
                                                        <th colSpan="2" style={{ textAlign: "center" }}>Action</th>
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
                                                    Create Role
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
                                                    <input type="hidden" id="id" name="id" className="form-control" value={this.state.id} />

                                                    <label>Name</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="name" name="name" className="form-control" value={this.state.name}
                                                                placeholder="Enter your role" onChange={this.onChangeHandler.bind(this)} />
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
                                                    {this.state.id == "" ?
                                                        (<button type="submit" className="btn bg-pink waves-effect">Save</button>)
                                                        :
                                                        (<button type="submit" className="btn bg-pink waves-effect">Update</button>)
                                                    }

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
export default withAlert()(RoleList);
// export default RoleList;


