import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

import { signInUser } from '../../redux/user/user.actions';
import { createUserAPI, signInAPI } from '../../apis/fohcafapis';
import { connect } from 'react-redux';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        email: '',
        password: '',
        wantToSignIn: true
    };
}
  // applyStyles = () => {
  //   React.useEffect(() => {
  //     document.body.classList.add("login-page");
  //     document.body.classList.add("sidebar-collapse");
  //     document.documentElement.classList.remove("nav-open");
  //     window.scrollTo(0, 0);
  //     document.body.scrollTop = 0;
  //     return () => {
  //       document.body.classList.remove("login-page");
  //       document.body.classList.remove("sidebar-collapse");
  //     };
  //   });
  // }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    // console.log(this.state);
  };

  signInOrCreateUser = async event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    if (this.state.wantToSignIn) {
      const loggedInUser = await signInAPI({ email, password });
      this.props.signInUser(loggedInUser.data);
      return loggedInUser.data;
    }
    
    return await createUserAPI({ name, email, password });
  };
  wantToCreatAccount = event => {
    event.preventDefault();
    this.setState({ wantToSignIn: false });
  };
  wantToSignIn = event => {
    event.preventDefault();
    this.setState({ wantToSignIn: true });
  }

  // firstFocus = () => React.useState(false);
  // setFirstFocus = () => React.useState(false);
  // lastFocus = () => React.useState(false);
  // setLastFocus = () => React.useState(false);
  render () {
    return (
      <>
  <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" md="4">
                <Card className="card-login card-plain">
                  <Form onSubmit={this.createUser} className="form">
                    <CardHeader className="text-center">
                      <div className="logo-container">
                        <img
                          alt="..."
                          src={require("assets/img/now-logo.png")}
                        ></img>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        style={{ display: `${this.state.wantToSignIn? 'none' : 'flex' }`}}
                        className={
                          "no-border input-lg" +
                          (this.firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        onChange={this.handleChange}
                          placeholder="First Name..."
                          type="text"
                          name='name'
                          // onFocus={() => this.setFirstFocus(true)}
                          // onBlur={() => this.setFirstFocus(false)}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        onChange={this.handleChange}
                          placeholder="Email..."
                          type="email"
                          name='email'
                          // onFocus={() => this.setLastFocus(true)}
                          // onBlur={() => this.setLastFocus(false)}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        onChange={this.handleChange}
                          placeholder="Password..."
                          type="password"
                          name='password'
                          // onFocus={() => this.setLastFocus(true)}
                          // onBlur={() => this.setLastFocus(false)}
                        ></Input>
                      </InputGroup>
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        href="#pablo"
                        size="lg"
                        onClick={this.signInOrCreateUser}
                      >
                        Get Started
                      </Button>
                    </CardBody>
                    </Form>
                    <CardFooter className="text-center">
                      <div className="pull-left">
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={this.wantToCreatAccount}
                          >
                            Create Account
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={this.wantToSignIn}
                          >
                            Login
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
                    </Card>
                    <CardFooter className="text-center">
                      <div>
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                          >
                            Forgot password?
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
              </Col>
            </Container>
          </div>
      </>
    );

  }
}

const mapDispatchToProps = dispatch => ({
  signInUser: loggedInUser => 
          dispatch(signInUser(loggedInUser))
});

export default connect(null, mapDispatchToProps)(Login);

