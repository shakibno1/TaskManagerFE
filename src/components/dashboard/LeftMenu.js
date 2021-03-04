import React, { Component } from 'react'
import { Link } from "react-router-dom";

class LeftMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <section>
                <aside id="leftsidebar" className="sidebar">

                    <div className="menu">
                        <ul className="list">
                            <li className="active">
                                <Link to="/adminDashboard">
                                    <i className="material-icons">home</i>
                                    <span>Home</span>
                                </Link>
                            </li>

                            <li>
                                <a href="#" className="menu-toggle">
                                    <i className="material-icons">group</i>
                                    <span>User Management</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="/userList">User</Link>
                                    </li>
                                    <li>
                                        <Link to="/roleList">Role</Link>
                                    </li>
                                    <li>
                                        <Link to="/userRoleMap">User Role Mapping</Link>
                                    </li>
                                    <li>
                                        <Link to="/resetPassword">Reset Password</Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#" className="menu-toggle">
                                    <i className="material-icons">group</i>
                                    <span>Task Management</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <Link to="/projectList">Project</Link>
                                    </li>
                                    <li>
                                        <Link to="/taskList">Task</Link>
                                    </li>
                                </ul>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="legal">
                        <div className="copyright">
                            &copy; 2020 - 2021 <a href="#">Task Manager</a>.
                    </div>
                    </div>
                </aside>
            </section>
        );
    }
}
export default LeftMenu;
