import './App.css';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Header from "./ClientComponent/Header"
import Login from './ClientComponent/Login'
import AdminLogin from './AdminComponent/AdminLogin'
import Register from './ClientComponent/Register'
import AdminDashboard from './AdminComponent/AdminDashboard'
import SideBar from './AdminComponent/SideBar';
import ModManagement from './AdminComponent/ModManagement';
import PostManagement from './AdminComponent/PostManagement'
import TagManagement from './AdminComponent/TagManagement'
import ContManagement from './AdminComponent/ContManagement'
import HeaderStaff from './StaffComponent/Header'
import SideBarStaff from './StaffComponent/SideBar'
import StaffLogin from './StaffComponent/StaffLogin'
import StaffDashboard from './StaffComponent/StaffDashboard'
import MembersManagement from './StaffComponent/Members'
import Events from './StaffComponent/Events'
import CompManagement from './StaffComponent/Competitions'
import StaffConManagement from './StaffComponent/StaffContact'
import UserHome from './ClientComponent/home';
import PostDetails from './ClientComponent/PostDetails';


function App() {
  return (
    <Router>
      <Route path="/" exact component={Header} />
      <Route path="/" exact component={SideBar} />
      <Route path="/" exact component={HeaderStaff} />
      <Route path="/" exact component={SideBarStaff} />
      {/* URL ROUTE COMPONENT */}
      <Switch>
        {/* Staff Part */}
        <Route path="/StaffLogin" exact component={StaffLogin} />
        <Route path="/StaffDashboard" exact component={StaffDashboard} />
        <Route path="/members" exact component={MembersManagement} />
        <Route path="/events" exact component={Events} />
        <Route path="/competitions" exact component={CompManagement} />
        <Route path="/staffcontacts" exact component={StaffConManagement} />
        {/* User Part */}
        <Redirect exact from="/" to="/UserHome" />
        <Route path="/UserLogin" exact component={Login} />
        <Route path="/UserRegister" exact component={Register} />
        <Route path="/UserHome" exact component={UserHome} />
        <Route path="/PostDetail" exact component={PostDetails} />
        {/* Super Admin Part */}
        <Route path="/AdminLogin" exact component={AdminLogin} />
        <Route path="/UserRegister" exact component={Register} />
        <Route path="/AdminDashboard" exact component={AdminDashboard} />
        <Route path="/staff" exact component={ModManagement} />
        <Route path="/posts" exact component={PostManagement} />
        <Route path="/tags" exact component={TagManagement} />
        <Route path="/contacts" exact component={ContManagement} />
      </Switch>
    </Router>
  );
}

export default App;
