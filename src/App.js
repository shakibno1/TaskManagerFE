import React, { Component } from 'react'
import LeftMenu from './components/dashboard/LeftMenu';
import Navbar from './components/dashboard/Navbar';
import { BrowserRouter as Router, Switch, Route , Redirect } from "react-router-dom";
import Login from './components/layout/Login';
import SignUp from './components/layout/SignUp';
import ForgetPassword from './components/layout/ForgetPassword'
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserList from './components/user/UserList';
import RoleList from './components/role/RoleList';
import UserRoleMap from './components/user/UserRoleMap';
import AuthService from './services/auth.service';
import ResetPassword from './components/layout/ResetPassword';
import TaskList from './components/TaskManagement/TaskList'
import ProjectList from "./components/TaskManagement/ProjectList";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        AuthService.getCurrentUser() !== null
            ? <Component {...props} />
            : <Redirect to='/logIn' />
    )} />
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div className="theme-red">

        <Router>
          { AuthService.getCurrentUser() !== null ? (<Navbar />) : (null)}
          { AuthService.getCurrentUser() !== null ? (<LeftMenu />) : (null)}
          <Switch>
            <PrivateRoute exact path="/adminDashboard" component={AdminDashboard} />
            <Route exact path="/forgetPassword" component={ForgetPassword} />
            <PrivateRoute exact path="/userList" component={UserList} />
            <PrivateRoute exact path="/projectList" component={ProjectList} />
            <PrivateRoute exact path="/taskList" component={TaskList} />
            <PrivateRoute exact path="/roleList" component={RoleList} />
            <PrivateRoute exact path="/userRoleMap" component={UserRoleMap} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            {AuthService.getCurrentUser() === null ? (<Route exact path="/logIn" component={Login} />) : (null)}
            {AuthService.getCurrentUser() === null ? (<Route exact path="/" component={Login} />) : (null)}
            {AuthService.getCurrentUser() === null ? (<Route exact path="/signUp" component={SignUp} />) : (null)}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
