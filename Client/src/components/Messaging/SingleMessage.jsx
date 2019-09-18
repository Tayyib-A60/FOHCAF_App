import React from 'react';

import {
    Form,
    FormGroup,
    Input,
    Button,
    Container,
    Row,
    Col,
    InputGroup
  } from "reactstrap";

import './Messaging.styles.scss';
import { sendSingleMessageAPI } from '../../apis/fohcafapis';
import Notifications, { notify } from 'react-notify-toast';

class SingleMessage extends React.Component {

    handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
    };
    sendMessage = async () => {
        console.log(this.state);
        
        const message = {
            subject: this.state.subject,
            from: {
                name: this.state.fromName,
                email: this.state.fromEmail
            },
            to: {
                name: this.state.toName,
                email: this.state.toEmail
            },
            message: this.state.message
        };

        sendSingleMessageAPI(message).then(res => {
            console.log(res);
            
            if(res.status === 200) {
                notify.show('Message sent successfully', 'success', 20000);
                this.setState({ subject: '', fromName: '', fromEmail: '', toName: '', toEmail: '', message: ''});
              } 
        }).catch(err => {
            notify.show(`Failed: ${err.message}`, 'error', 20000);
        });
        
    }

    render() {
        return (
            <>
                <Notifications options={{zIndex: 5000, top: '450px'}} />
                <div className="messagingSection section-contact-us" style={{backgroundColor: '#2c2c2c !important', }} data-background-color="black">
                <Container>
                <Row>
                <Col className=" ml-auto mr-auto" lg="10" md="8">
                    <h2>Send Broadcast Message</h2>
                <Form>
                    <FormGroup>
                    <InputGroup>
                    <Input
                        aria-describedby="subject"
                        id="subject"
                        name='subject'
                        placeholder="Enter subject..."
                        type="text"
                        onChange={this.handleChange}
                        >
                    </Input>
                    </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    <Input
                        aria-describedby="name"
                        id="name"
                        name='fromName'
                        placeholder="Enter sender's name.."
                        type="text"
                        onChange={this.handleChange}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                    <Input
                        aria-describedby="email"
                        id="email"
                        name='fromEmail'
                        placeholder="Enter sender's email"
                        type="text"
                        onChange={this.handleChange}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                    <Input
                        aria-describedby="toname"
                        id="toname"
                        name='toName'
                        placeholder="Enter reciever's name.."
                        type="text"
                        onChange={this.handleChange}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                    <Input
                        aria-describedby="toemail"
                        id="toemail"
                        name='toEmail'
                        placeholder="Enter reciever's email"
                        type="email"
                        onChange={this.handleChange}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                    <div className="textarea-container">
                        <Input style={{maxHeight: '300px'}}
                            cols="80"
                            name="message"
                            placeholder="The message goes here..."
                            rows="15"
                            type="textarea"
                            onChange={this.handleChange}
                            ></Input>
                    </div>
                    </FormGroup>
                    <Button color="primary" type='button' onClick={this.sendMessage}>
                    Send
                    </Button>
                </Form>
                </Col>
                </Row>
                </Container>
                </div>
            </>
        );
    }
}

export default SingleMessage;