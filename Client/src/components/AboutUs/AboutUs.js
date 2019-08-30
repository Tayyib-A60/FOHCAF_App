import React from "react";
// reactstrap components
import { 
    Button,
    Container,
    Row,
    Col,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    UncontrolledTooltip } 
from "reactstrap";

// core components

const AboutUs = () =>  {
    const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
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
                      src={require("assets/img/avatar.jpg")}
                    ></img>
                    <h4 className="title">Romina Hadid</h4>
                    <h5 className="category text-info">Model</h5>
                    <h5 className="">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some links for people to be able to follow them outside the site.
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
                      src={require("assets/img/ryan.jpg")}
                    ></img>
                    <h4 className="title">Ryan Tompson</h4>
                    <h5 className="category text-info">Designer</h5>
                    <h5 className="">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some links for people to be able to follow them outside the site.
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
                    <h4 className="title">Eva Jenner</h4>
                    <h5 className="category text-info">Fashion</h5>
                    <h5 className="">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some links for people to be able to follow them outside the site.
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
        <div className="section section-contact-us text-center" style={{backgroundColor: '#2c2c2c !important'}} data-background-color="black">
          <Container>
            <h2 className="title">Do you have something for us?</h2>
            <p className="">Your project is very important to us.</p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Type a message..."
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div
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
        </div>
    </div>
    </>
  );
}

export default AboutUs;
