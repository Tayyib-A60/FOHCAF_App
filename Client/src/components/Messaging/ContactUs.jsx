import React from 'react';

import {
    Container,
    Row,
    Col,
    Input,
    InputGroupAddon,
    Button,
    InputGroupText,
    InputGroup } from 'reactstrap';

import Notifications, { notify } from 'react-notify-toast';
import { sendSingleMessageAPI } from "./../../apis/fohcafapis";

class ContactUs extends React.Component {
    state = {

    };
    handleChange = (event) => {
        const { value, name } = event.target;
        
        this.setState({ [name]: value });
    };
    sendMessage = () => {
      const message = {
        subject: this.state.fromName,
        from: {
            name: this.state.fromName,
            email: this.state.fromEmail
        },
        to: {
            name: 'Fohcaf',
            email: 'fohcafinternational@gmail.com'
        },
        message: this.state.message
    };
      sendSingleMessageAPI(message).then(res => {
          if(res.status === 200) {
            notify.show('Your message was recieved', 'success', 5000);
            this.setState({ fromName: '', fromEmail: '', message: '' });
            return;
          }
          notify.show('An unexpected error occured', 'error', 5000);
      });
    }

    render() {
      const { fromName, fromEmail, message } = this.state;
        return (
            <>
        <div className="section section-contact-us text-center" style={{backgroundColor: '#2c2c2c !important'}} data-background-color="black">
        <Notifications options={{zIndex: 500, top: '450px'}} />
          <Container>
            <h2 className="title">Do you have something for us?</h2>
            <p className="">Your project is very important to us.</p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className="input-lg"
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Your Name..."
                    type="text"
                    name='fromName'
                    onChange={this.handleChange}
                    value={fromName}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className="input-lg"
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    name='fromEmail'
                    value={fromEmail}
                    onChange={this.handleChange}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="message"
                    placeholder="Type a message..."
                    rows="4"
                    type="textarea"
                    value={message}
                    onChange={this.handleChange}
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    onClick={() => this.sendMessage()}
                    size="lg"
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
            </>
        )
    }
}

export default ContactUs;