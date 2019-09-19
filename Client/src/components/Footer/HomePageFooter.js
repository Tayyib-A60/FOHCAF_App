/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom';
 
// reactstrap components
import { Container } from "reactstrap";
import './Footer.styles.scss';

const HomePageFooter = () => {
  return (
    <footer className="footer" data-background-color="black">
      <Container className="md-footer">
        <nav>
          <ul>
            <li className="md-margin">
              <Link to='/'>
                Contact us
              </Link>
            </li>
            <li>
              <Link to='/blogs'>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright md-copyright" id="copyright">
          © {new Date().getFullYear()}, Designed and Coded by{" "}
          <a href='https://www.linkedin.com/in/adesokan-toyeeb-taiwo-8b0038141/'>
            Toyeeb Adesokan
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default HomePageFooter;