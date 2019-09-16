import React from 'react';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
  } from "reactstrap";
import { postSubscriberAPI } from '../../apis/fohcafapis';
import Notifications, { notify } from 'react-notify-toast';
  
class Subscribe extends React.Component {
    state = {

    };

    handleChange = (event) => {
        const { value, name } = event.target;
        
        this.setState({ [name]: value });
    };

    subscribe = async () => {
        postSubscriberAPI({email: this.state.email}).then(res => {
            if(res.status === 200) {
                notify.show('We have added you to our mail list', 'success', 5000);
            }
            notify.show('An unexpected error occured', 'error', 5000);
        });
    };

    render() {
        return (
            <>
            <Notifications options={{zIndex: 500, top: '450px'}} />
            <div style={{ backgroundColor: '#2c2c2c'}}>
                <InputGroup>
                <Input name='email' onChange={this.handleChange} typeof='email' placeholder="Your email..." type="text"></Input>
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <button style={{ border: '1px hidden', backgroundColor: '#2c2c2c', color: '#2CA8FF'}}  onClick={this.subscribe}>Subscribe</button>
                    </InputGroupText>
                </InputGroupAddon>
                </InputGroup>   
            </div>
            </>
        );
    }
}

export default Subscribe;