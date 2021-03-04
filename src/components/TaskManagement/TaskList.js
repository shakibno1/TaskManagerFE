import React, { Component } from 'react'
import Http from '../../services/http.service';
import { API_URL } from '../constant/Constants';
import {Multiselect} from "multiselect-react-dropdown";
import {withAlert} from "react-alert";
import AuthService from "../../services/auth.service";

class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskList: [],
            projectList: [],
            statusList: [
                {
                    name:'open'
                },
                {
                    name:'in_progress'
                },
                {
                    name:'closed'
                }
            ],
            loading: true,
            showList: true,
            showCreate: false,
            id: "",
            description: "",
            status: [
            ],
            project:[],
            dueDate:"",
            isAdminCheck : AuthService.isAdmin(),
            userList: [],
            isExpiredFilterChecked: false,
            styles: {
                top: 0,
                left: 0
            }
        }
        this.singleRef = React.createRef();
        this.singleRef2 = React.createRef();
    }
    componentDidMount = () => {
        this.taskList();
        this.projectList();
        this.setState({
            styles: {
                // Note: computeTopWith and computeLeftWith are placeholders. You
                // need to provide their implementation.
                top: "10",
                left: "10"
            }
        })
    }

    componentDidUpdate = (prevProps, prevState, sS) => {
        if (this.state.loading !== prevState.loading) {
            this.taskList();
            this.userList();
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
            description: "",
            status: [
            ],
            project:[],
            dueDate:"",
        })
    }

    onChangeHandler = (event) => {
        console.log(" event ++    "+event);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let path = "";
        const { alert } = this.props;
        console.log(this.singleRef2.current.getSelectedItems());
        console.log(" singleRef2   "+this.singleRef.current.getSelectedItems()[0].id);
        console.log(this.state.dueDate);
        let data = {
            taskId: this.state.id,
            description: this.state.description,
            dueDate: this.state.dueDate,
            projectId:this.singleRef.current.getSelectedItems()[0].id,
            status:this.singleRef2.current.getSelectedItems()[0].name,
        }
        console.log(data);

        if (this.state.id !== "") {
            path = "task/update";
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
            path = "task/save";
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

    taskList = () => {
        const path = "task/list";
        Http.get(path).then(res => {
            console.log(res)
            this.setState({
                taskList : res.data
            })
        });
    }

    projectList = () => {
        const path = "project/list";
        Http.list(path).then(res => {
            this.setState({
                projectList: res.data,
                loading: false,
            })
        })
    }

    selectHandler = (id, data) => {
        // let project = JSON.stringify(data)
        console.log(" task list   "+data.project.id);
        this.setState({
            id: data.id,
            description: data.description,
            status: [{
                name:data.status
            }],
            project:[{name:data.project.name,id:data.project.id}],
            dueDate:data.dueDate,
            showCreate: true,
            showList: false
        }, () => (
            console.log(this.state.project),
                console.log(this.state.status)
        ));
    }

    deleteHandler = (id) => {
        let path = "task/delete";
        const { alert } = this.props;
        let data = {
            taskId: id,
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

    userList = () => {
        const path = "user/list";
        Http.get(path).then(res => {
            console.log(res.data.userList);
            this.setState({
                userList : res.data.userList
            })
        });
    }

    onSelectHandler = (event) => {
        const path = "task/listByUser";
        let params = '';
        event.map((user,index)=>{
            console.log("user "+user.id+" index "+index);
            params += user.username + ','
        })
        console.log(" test "+JSON.stringify(params) +" reter "+ params)
        Http.get(path,params).then(res=>{
            console.log(res.data)
            this.setState({
                taskList: res.data,
                loading: false,
            })
        })
    }

    onSelectHandlerProjectSearch = (event) => {
        const path = "task/listByProject";
        let params = '';
        event.map((project,index)=>{
            console.log("user "+project.id+" index "+index);
            params += project.id + ','
        })
        console.log(" test "+JSON.stringify(params) +" reter "+ params)
        Http.get(path,params).then(res=>{
            console.log(res.data)
            this.setState({
                taskList: res.data,
                loading: false,
            })
        })
    }

    onSelectHandlerStatusSearch = (event) => {
        const path = "task/listByStatus";
        let params = '';
        event.map((status,index)=>{
            console.log("user "+status.name+" index "+index);
            params += status.name + ','
        })
        console.log(" test "+JSON.stringify(params) +" reter "+ params)
        Http.get(path,params).then(res=>{
            console.log(res.data)
            this.setState({
                taskList: res.data,
                loading: false,
            })
        })
    }

    onClickLoadExpiredTaskFilter = (event) => {
        const path = "task/listByExpiredTask";
        Http.get(path).then(res=>{
            console.log(res.data)
            this.setState({
                taskList: res.data,
                loading: false,
            })
        })
    }




    render() {
        const { taskList } = this.state;
        const data = taskList.map((task, index) => {
            return (
                <tr key={index+1}>
                    <td scope="row">{index+1}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>{task.project.name}</td>
                    <td>{task.dueDate}</td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" key={index+1} onClick={() => this.selectHandler(task.id, task)}>edit</i>
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <i className="material-icons" key={index+1} onClick={() => this.deleteHandler(task.id)}>delete</i>
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
                                                Task List
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
                                                        onSelect={this.onSelectHandler.bind(this)}
                                                        onRemove={this.onSelectHandler.bind(this)}
                                                    />

                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <label htmlFor="project">Project</label>
                                            <div className="form-group">
                                                <Multiselect
                                                    options={this.state.projectList}
                                                    ref={this.multiRef}
                                                    displayValue="name"
                                                    onSelect={this.onSelectHandlerProjectSearch.bind(this)}
                                                    onRemove={this.onSelectHandlerProjectSearch.bind(this)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="user">Status</label>
                                            <div className="form-group">
                                                <Multiselect
                                                    options={this.state.statusList}
                                                    ref={this.multiRef}
                                                    displayValue="name"
                                                    onSelect={this.onSelectHandlerStatusSearch.bind(this)}
                                                    onRemove={this.onSelectHandlerStatusSearch.bind(this)}
                                                />
                                            </div>
                                        </div>
                                        <div className="button-place">
                                            <button name="loadExpiredTask" onClick={this.onClickLoadExpiredTaskFilter.bind(this)}> Load Expired Task </button>
                                        </div>
                                        <div className="body table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>SL No.</th>
                                                        <th>Description</th>
                                                        <th>Status</th>
                                                        <th>Project</th>
                                                        <th>Due Date</th>
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
                                                    Create Task
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
                                                    <input type="hidden" id="projectId" name="projectId" className="form-control" value={this.state.project.id} />
                                                    <label htmlFor="description">Description</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="description" name="description" className="form-control" placeholder="Enter task description"
                                                                   value={this.state.description} onChange={this.onChangeHandler.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="status">Status</label>
                                                    <div className="form-group">
                                                        <Multiselect
                                                            options={this.state.statusList}
                                                            singleSelect
                                                            ref={this.singleRef2}
                                                            displayValue="name"
                                                            onChange={this.onChangeHandler.bind(this)}
                                                            selectedValues={this.state.status}
                                                        />
                                                    </div>
                                                    <label htmlFor="project">Project</label>
                                                    <div className="form-group">
                                                        <Multiselect
                                                            options={this.state.projectList}
                                                            singleSelect
                                                            ref={this.singleRef}
                                                            displayValue="name"
                                                            onChange={this.onChangeHandler.bind(this)}
                                                            selectedValues={this.state.project}
                                                        />
                                                    </div>
                                                    <label htmlFor="dueDate">Due Date</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="date" id="dueDate" name="dueDate" className="form-control"
                                                                   value={this.state.dueDate} onChange={this.onChangeHandler.bind(this)}/>
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
export default withAlert()(TaskList);


