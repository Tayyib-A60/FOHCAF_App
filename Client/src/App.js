import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

// pages for this kit
import Navbar from './components/Navbar/Navbar';
import Navigation from './components/MdbNavBar/Navigation';
import NavbarPage from './components/MdbNavBar/Nav';
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
import CreateBlog from './components/BlogPost/CreateBlogPost';
import BlogDetails from 'components/BlogPost/BlogDetails';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'redux/user/user.selector';

const App = ({ currentUser }) =>  {
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    // console.log(currentUser);
    return (
    <div>
        <Navigation />
        {/* <NavbarPage /> */}
        <Switch> 
            <Route onclick={() => console.log('Home')
            } exact path='/' component={HomePage} />
            <Route exact path='/editBlogPost/:id' component={CreateBlog} />
            <Route exact path='/uploadPhoto/:id' component={UploadPhoto} />
            <Route exact path='/blog/:id' component={BlogDetails} />
            <Route exact path='/login' component={AdminLogin} />
            <Route onLoad={() => console.log('Blogs')
            } exact path='/blogs' component={BlogPage} />
            <Route exact path='/manage'
                render={() => !currentUser? 
                (<Redirect to='/' />): <ManageBlogPost/>}    
            />
            <Redirect to='/' />
      </Switch>
      <HomePageFooter/>
    </div>
)};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps, null)(App);