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

import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from "redux/user/user.selector";
import { signInUser, signOutUser } from '../../redux/user/user.actions';
import { createUserAPI, signInAPI } from '../../apis/fohcafapis';
import { connect } from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';


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
  componentDidMount() {
    console.log(this.props);
  }
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  signInOrCreateUser = async event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    if (this.state.wantToSignIn) {
       signInAPI({ email, password }).then(loggedInUser => {
           this.props.signInUser(loggedInUser.data);
           if(loggedInUser.status === 200) {
             notify.show('Login successful', 'success', 20000);
           }
         }).catch(err => {
           notify.show('Login failed', 'error', 20000);
         });
         return;
    } 
    createUserAPI({ name, email, password }).then(res => {
        if(res.status === 200) {
          notify.show('Sign up successful', 'success', 20000);
        } 
      }).catch(err => {

          notify.show('Sign up failed', 'error', 20000);
        });
  };
  wantToCreatAccount = event => {
    event.preventDefault();
    this.setState({ wantToSignIn: false });
  };
  wantToSignIn = event => {
    event.preventDefault();
    this.setState({ wantToSignIn: true });
  }
  logout = () => {
    this.props.signOutUser(this.props.currentUser);
    notify.show('Signed out', 'success', 2000);
  }

  render () {
    if(this.props.currentUser) {
      return (
        <>
        <Notifications options={{zIndex: 500, top: '450px'}} />
        <div style={{ paddingTop: '250px'}}>
          <Container>
              <Col className="ml-auto mr-auto" md="4">
                <Card className="card-login card-plain">
                  <Form onSubmit={this.createUser} className="form">
                    <CardHeader className="text-center">
                      <h3>Are u sure you want to logout?</h3>
                      <Button color='error' onClick={() => this.logout()}>Logout</Button>
                    <Button color='error'><Link  to='/'>No</Link> </Button>  
                    </CardHeader>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        </>
      );
    }
    return (
      <>
      <Notifications options={{zIndex: 500, top: '450px'}} />
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
                        { this.state.wantToSignIn? 'Login': 'Sign up'}
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
          dispatch(signInUser(loggedInUser)),
  signOutUser: user =>
      dispatch(signOutUser(user))
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

