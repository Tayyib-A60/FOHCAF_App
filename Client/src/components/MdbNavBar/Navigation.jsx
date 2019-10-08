import React, { Component } from "react";
import { MDBNavbar,
    MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink,
    MDBNavbarToggler, MDBCollapse, MDBDropdown,MDBDropdownToggle,
    MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

import {
    NavItem,
    NavLink,
    UncontrolledTooltip
  } from "reactstrap";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from "redux/user/user.selector";
import { signOutUser } from './../../redux/user/user.actions';
import './Navigation.styles.scss';


class Navigation extends Component {
    state = {
    isOpen: false,
    currentUser: null,
    collapseID: ""
    };

    componentDidMount() {
        const { currentUser } = this.props;
        this.setState({ currentUser });      
    }
    toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
    // toggleCollapse = () => {
    //   console.log('Toggle clicked');
    //   console.log(this.state);
      
    //   this.setState({ isOpen: !this.state.isOpen });
    // }

    render() {
    return (
        <MDBNavbar fixed='top'  color="blue" dark expand="md">
            <MDBNavbarBrand style={{ cursor: 'pointer' }} id='foundation-tooltip' className='nav-brand-element'>
            <strong className="white-text">FOHCAF</strong>
            <UncontrolledTooltip target="#foundation-tooltip">
                  Faysol Oluwakemi Foundation
            </UncontrolledTooltip>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
            <MDBNavbarNav left>
                <MDBNavItem >
                <MDBNavLink className="nav-element" to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink className="nav-element" to='/blogs'>Blog</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink className="nav-element" to='/manage'>Manage
                </MDBNavLink>
                </MDBNavItem>
                {
                this.props.currentUser != null? 
                <MDBNavItem>
                <MDBNavLink className='nav-element' to='/login'>Logout
                </MDBNavLink>
                </MDBNavItem> :
                <MDBNavItem>
                <MDBNavLink className='nav-element' to='/login'>Login
                </MDBNavLink>
                </MDBNavItem>
                }
            </MDBNavbarNav>
            <MDBNavbarNav right>
            <NavItem>
                <NavLink
                  href="https://twitter.com"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
            </NavItem>
            <NavItem>
                <NavLink
                  href="https://facebook.com/fohcaf.international/"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <MDBIcon fab icon="facebook" />
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/fohcaf_international/"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
                {/* <MDBNavItem>
                    <Link to="https://twitter.com">
                <MDBNavLink className="waves-effect waves-light" to='/'>
                    <MDBIcon fab icon="twitter" />
                </MDBNavLink>
                    </Link>
                </MDBNavItem> */}
                {/* <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="facebook" />
                </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="instagram" />
                </MDBNavLink>
                </MDBNavItem> */}
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
        );
    }
    }

const mapStateToProps = createStructuredSelector({
currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
signOutUser: user =>
            dispatch(signOutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps) (Navigation);
