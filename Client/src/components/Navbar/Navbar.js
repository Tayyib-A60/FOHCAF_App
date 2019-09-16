import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from "redux/user/user.selector";
import './Navbar.styles.scss';
import { signOutUser } from './../../redux/user/user.actions';
// https://www.linkedin.com/in/faysol-oluwakemi-6752a112b
// https://facebook.com/fohcaf.international/
const IndexNavbar = (props) => {
  
  const { currentUser } = props;
  
  
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 99 ||
        document.body.scrollTop > 99
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={`fixed-top ${navbarColor} `} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <Link to='/'>
            <NavbarBrand
              target="/"
              id="navbar-brand"
            > 
                FOHCAF
            </NavbarBrand>
              </Link>
            <UncontrolledTooltip target="#navbar-brand">
              Faysol Oluwakemi Dahoud Foundation
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink>
                  <Link className='link' to='/blogs'>Blog</Link>
                </NavLink>
              </NavItem>
              <NavItem style={{ display: `${currentUser? '' : 'none' }`}}>
                <NavLink>
                  <Link className='link' to='/manage'>Manage</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  {
                    currentUser? 
                    <Link to='/login' >Logout</Link> :
                    <Link to='/login'>Login</Link>

                  }
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://twitter.com/CreativeTim?ref=creativetim"
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
                  <i className="fab fa-facebook-square"></i>
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
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  signOutUser: user =>
            dispatch(signOutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps) (IndexNavbar);
