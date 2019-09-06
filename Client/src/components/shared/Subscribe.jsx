import React from 'react';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
  } from "reactstrap";
import { postSubscriberAPI } from '../../apis/fohcafapis';
  
class Subscribe extends React.Component {
    state = {

    };

    handleChange = (event) => {
        const { value, name } = event.target;
        
        this.setState({ [name]: value });
    };

    subscribe = async () => {
        const res = await postSubscriberAPI({email: this.state.email});
        console.log(res);
    };

    render() {
        return (
            <>
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