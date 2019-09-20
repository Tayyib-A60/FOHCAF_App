import React from "react";

import { 
    Button,
    Container,
    Row,
    Col } 
from "reactstrap";

import Subscribe from "components/shared/Subscribe";
import ContactUs from "components/Messaging/ContactUs";


// const sendUsAMessage = () => {
//     sendSingleMessageAPI()
// }

const AboutUs = () =>  {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return () => {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
    <div className='wrapper'>
        
      <div className="section section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <h2 className="title">About us</h2>
              <h5 className="">
              FOHCAF in a healthcare initiative founded in the year 2015 by Faysol Oluwakemi, a young On air Person and a health show presenter who creates passion for people wellbeing. The project is aimed at dragging medical and health information/ awareness to the door step of the common man and grass root through the media. The project and initiative is tagged FOHCAF Get Informed Get Healthy Project.
              </h5>
            </Col>
            <Col lg="6" md="12">
              <div className="icons-container">
                <i className="far fa-heart"></i>
                <i className="fas fa-stethoscope"></i>
                <i className="fas fa-user-md"></i>
                <i className="fas fa-medkit"></i>
                <i className="fas fa-procedures"></i>
                <i className="now-ui-icons emoticons_satisfied"></i>
                <i className="fas fa-first-aid"></i>
                <i className="fas fa-heartbeat"></i>
                <i className="fas fa-weight"></i>
                <i className="far fa-salad"></i>
                <i className="fas fa-running"></i>
                <i className="fas fa-walking"></i>
                <i className="fad fa-files-medical"></i>
                <i className="fas fa-star-of-life"></i>
                <i className="fas fa-x-ray"></i>
                <i className="fad fa-files-medical"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Our Mission:</h2>
                <h5 className="">To expose the general public to verified and reliable health information. Organizing health seminars, outreaches, public lectures and social campaigns among others. Reaching out to large number of people through health shows featuring medical and health professionals. Providing free medical screening to less privilege with the supports from philanthropists and like minds.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                        backgroundImage:
                        "url(" + require("assets/img/login.jpg") + ")"
                    }}
                    >
                  </div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                      "url(" + require("assets/img/bg1.jpg") + ")"
                    }}
                    ></div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">Here is our team</h2>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/tayyib.jpg")}
                    ></img>
                    <h4 className="title">Adesokan Toyeeb</h4>
                    <h5 className="category text-info">Software Engineer</h5>
                    <h5 className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eveniet quam minima quaerat voluptate, molestiae dolorem deserunt et eius. Magnam non, exercitationem quidem laudantium nostrum necessitatibus architecto esse facilis inventore.
                    </h5>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/faysol.jpg")}
                    ></img>
                    <h4 className="title">Faysol Oluwakemi</h4>
                    <h5 className="category text-info">Founder/C.E.O</h5>
                    <h5 className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eveniet quam minima quaerat voluptate, molestiae dolorem deserunt et eius. Magnam non, exercitationem quidem laudantium nostrum necessitatibus architecto esse facilis inventore.
                    </h5>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/eva.jpg")}
                    ></img>
                    <h4 className="title">Someone else</h4>
                    <h5 className="category text-info">Health Advocate</h5>
                    <h5 className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eveniet quam minima quaerat voluptate, molestiae dolorem deserunt et eius. Magnam non, exercitationem quidem laudantium nostrum necessitatibus architecto esse facilis inventore.
                    </h5>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                    
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <ContactUs/>
        <div
        className="section "
        data-background-color="black"
        id="download-section">
        <Container>
        <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
            <h3>Subscribe to our news letter</h3>
            <Subscribe />
            </Col>
        </Row>
        </Container>
        </div>
        {/* <div
        className="section "
        data-background-color="black"
        id="download-section">
        <Container>
        <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Thank you for supporting us!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-neutral btn-icon btn-round"
                color="twitter"
                href="https://www.twitter.com/creativetim?ref=creativetim"
                id="tooltip86114138"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip86114138">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="facebook"
                href="https://www.facebook.com/creativetim?ref=creativetim"
                id="tooltip735272548"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip735272548">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="linkedin"
                href="https://www.linkedin.com/company-beta/9430489/?ref=creativetim"
                id="tooltip647117716"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip647117716">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="github"
                href="https://github.com/creativetimofficial/now-ui-kit-react?ref=creativetim"
                id="tooltip331904895"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-github"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip331904895">
                Star on Github
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
        </div> */}
    </div>
    </>
  );
}

export default AboutUs;
