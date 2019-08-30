/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

const HomePageFooter = () => {
  return (
    <footer className="footer" data-background-color="black">
        {/* <hr style={{ backgroundColor: '#007bff'}}/>    */}
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://www.creative-tim.com?ref=nukr-dark-footer"
                target="_blank"
              >
                Contact us
              </a>
            </li>
            <li>
              <a
                href="http://presentation.creative-tim.com?ref=nukr-dark-footer"
                target="_blank"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="http://blog.creative-tim.com?ref=nukr-dark-footer"
                target="_blank"
              >
                Upcoming Events
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed and Coded by{" "}
          <a
            href="https://www.invisionapp.com?ref=nukr-dark-footer"
            target="_blank"
          >
            Toyeeb Adesokan
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default HomePageFooter;