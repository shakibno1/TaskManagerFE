import React, { Component } from 'react'
import Http from '../../services/http.service';
import { withAlert } from 'react-alert';
import {Multiselect} from "multiselect-react-dropdown";
import AuthService from '../../services/auth.service';

class ProjectList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectList: [],
            userList: [],
            loading: true,
            showList: true,
            showCreate: false,
            id: "",
            name: "",
            isAdminCheck : AuthService.isAdmin()
        }

        this.multiRef = React.createRef();
    }
    componentDidMount = () => {
        this.projectList();
    }

    componentDidUpdate = (prevProps, prevState, sS) => {
        if (this.state.loading !== prevState.loading) {
            this.userList();
            this.projectList();
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
            id: this.state.id,
            name: this.state.name,
        }

        /*:: NOTE: If Id is found then data will be update ::
          :: So you should put the hidden filed in your submit form ::
         */
        if (this.state.id !== "") {
            path = "project/update";
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
            path = "project/save";
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

    backToList = () => {
        this.setState({
            showCreate: false,
            showList: true,
        })
    }

    projectList = () => {
        const path = "project/list";
        Http.list(path).then(res => {
            console.log(" auth "+res);
            this.setState({
                projectList: res.data,
                loading: false,
            })
        }).catch(error=>{
            console.log("error "+error);
        })
    }

    userList = () => {
        const path = "user/list";
        Http.get(path).then(res => {
            console.log(res.data.userList);
            this.setState({
                userList : res.data.userList
            })
        });
    }

    selectHandler = (id, data) => {
        let project = JSON.stringify(data)
        this.setState({
            id: data.id,
            name: data.name,
            showCreate: true,
            showList: false
        })
    }

    deleteHandler = (id) => {
        let path = "project/delete";
        const { alert } = this.props;
        let data = {
            projectId: id,
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

    onUserSelectHandler = (event) => {
        const path = "project/listByUser";
        let params = '';
        event.map((user,index)=>{
            console.log("user "+user.id+" index "+index);
            params += user.username + ','
        })
        console.log(" test "+JSON.stringify(params) +" reter "+ params)
        Http.get(path,params).then(res=>{
            console.log(res.data)
            this.setState({
                projectList: res.data,
                loading: false,
            })
        })
    }


    render() {
        const { projectList } = this.state;
        console.log(projectList);
        const data = projectList.map((project, index) => {
            return (
                <tr key={index+1}>
                    <td scope="row">{index+1}</td>
                    <td>{project.name}</td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.selectHandler(project.id, project)}>edit</i>
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" onClick={() => this.deleteHandler(project.id)}>delete</i>
                    </td>
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
                                                Project List
                                        </h2>
                                            <ul className="header-dropdown m-r--5">
                                                <button type="button" className="btn bg-teal waves-effect" onClick={this.addNew.bind(this)}>
                                                    +
                                            </button>
                                            </ul>
                                        </div>
                                        {console.log(" isAdmin "+this.state.isAdminCheck)}
                                        {this.state.isAdminCheck && (
                                            <div>
                                                <label htmlFor="user">User</label>
                                                <div className="form-group">
                                                    <Multiselect
                                                        options={this.state.userList}
                                                        ref={this.multiRef}
                                                        displayValue="username"
                                                        onSelect={this.onUserSelectHandler.bind(this)}
                                                        onRemove={this.onUserSelectHandler.bind(this)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="body table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>SL No.</th>
                                                        <th>Name</th>
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
                                                    Create Project
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
                                                    <label htmlFor="project_name">Project Name</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="name" name="name" className="form-control" value={this.state.name}
                                                                   placeholder="Enter your project name" onChange={this.onChangeHandler.bind(this)} />
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
export default withAlert()(ProjectList);


