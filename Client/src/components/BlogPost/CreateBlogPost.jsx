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

import { createBlogPostAPI, fetchBlogPostAPI, updateBlogPostAPI } from '../../apis/fohcafapis';
import { CreateBlogPost } from '../../redux/blog-posts/blog-post.actions';
import './CreateBlogPost.styles.scss';
import { connect } from 'react-redux';

class CreateBlog extends React.Component {
    state = {
        author: '',
        heading: '',
        body: '',
        createNew: true,
        id: null
    };
    async componentDidMount() {
        console.log(this.props);
        
        if(this.props.match) {
            const blogPostId = this.props.match.params.id;
            const res = await fetchBlogPostAPI(blogPostId);
            const { author, heading, body, id } = res.data;
            this.setState({ author, heading, body, id, createNew: false });
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
    
      createOrEditBlogPost = async event => {
        event.preventDefault();
        const { author, heading, body } = this.state;
        if (this.state.createNew) {
          const blogPostCreated = await createBlogPostAPI({ author, heading, body });
          this.props.createBlogPost(blogPostCreated.data);
          console.log(blogPostCreated);
        //   return blogPostCreated;
        }
        else if(this.state.createNew === false) {
            const blogPostUpdated = await updateBlogPostAPI(this.state.id, { author, heading, body, id: this.state.id });
            console.log(blogPostUpdated.data);
        }
      };

        render() {
            const { author, heading, body } = this.state;
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
                        value={author}
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
                        value={heading}
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
                            value={body}
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
const mapDispatchToProps = dispatch => ({
    createBlogPost: blogPost =>
            dispatch(CreateBlogPost(blogPost))
});

export default connect(null, mapDispatchToProps)(CreateBlog);