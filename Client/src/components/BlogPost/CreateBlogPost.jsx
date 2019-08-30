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

import { createBlogPostAPI } from '../../apis/fohcafapis';
import './CreateBlogPost.styles.scss';

class CreateBlogPost extends React.Component {
    state = {
        author: '',
        heading: '',
        body: '',
        createNew: true
    };

    handleChange = (event) => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
    
      createOrEditBlogPost = async event => {
        event.preventDefault();
        const { author, heading, body } = this.state;
        if (this.state.createNew) {
          const blogPostCreated = await createBlogPostAPI({ author, heading, body });
          console.log(blogPostCreated);
          return blogPostCreated;
        }
      };

        render() {
             return (
                <>
                <div className="createBlogSection section-contact-us" style={{backgroundColor: '#2c2c2c !important', }} data-background-color="black">
                <Container>
                <Row>
                <Col className=" ml-auto mr-auto" lg="10" md="8">
                    <h2>Create a blog post</h2>
                <Form>
                    <FormGroup>
                    <InputGroup>
                    <Input
                        aria-describedby="author"
                        id="author"
                        name='author'
                        placeholder="Enter author's name"
                        type="text"
                        onChange={this.handleChange}
                        >
                    </Input>
                    </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    <Input
                        aria-describedby="heading"
                        id="heading"
                        name='heading'
                        placeholder="Enter heading for the post"
                        type="text"
                        onChange={this.handleChange}
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                    <div className="textarea-container">
                        <Input style={{maxHeight: '300px'}}
                            cols="80"
                            name="body"
                            placeholder="The body of the blog post goes here..."
                            rows="15"
                            type="textarea"
                            onChange={this.handleChange}
                            ></Input>
                    </div>
                    </FormGroup>
                    <Button color="primary" type='button' onClick={this.createOrEditBlogPost}>
                    Submit
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

export default CreateBlogPost;