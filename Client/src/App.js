import React from 'react';
import { Route, Switch } from "react-router-dom";

// pages for this kit
import Navbar from './components/Navbar/Navbar';

import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
import HomePage from 'pages/HomePage/HomePage';
import AdminLogin from 'pages/AdminPages/AdminLogin';
import BlogPage from 'pages/BlogsPage/BlogsPage';
import HomePageFooter from 'components/Footer/HomePageFooter';
import UploadPhoto from './pages/AdminPages/UploadPhoto';
import ManageBlogPost from './pages/AdminPages/ManageBlogPosts';

const App = () => (
    <div>
        <Navbar />
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={AdminLogin} />
            <Route exact path='/blog' component={BlogPage} />
            <Route exact path='/manage' component={ManageBlogPost} />
            <Route exact path='/uploadPhoto/:id' component={UploadPhoto} />
      </Switch>
      <HomePageFooter/>
    </div>
);

export default App;