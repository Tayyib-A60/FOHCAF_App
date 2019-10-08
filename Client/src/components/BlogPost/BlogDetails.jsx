import React from 'react';

import { 
        fetchBlogPostAPI,
        fetchBlogPostPhotos,
        fetchCommentsAPI,
        postCommentAPI }
from '../../apis/fohcafapis';
import { 
        Card,
        CardBody, 
        CardText, 
        CardTitle, 
        Form, 
        Input, 
        InputGroup, 
        FormGroup, 
        Container, 
        Row, 
        Col, 
        Button } 
from 'reactstrap';

import './BlogDetails.styles.scss';
import BlogPostImages from './BlogPostImages';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';
import Notifications, { notify } from 'react-notify-toast';

class BlogDetails extends React.Component {
    state = {
        blogPost: {},
        photos: [],
        count: 1,
        comments: [],
        blogPostId: null,
        totalComments: null,
        loading: true
    };
    fetchComments = async id => {
        const commentParams = {
            currentCount: this.state.count
        };
        const comments = await fetchCommentsAPI(id, commentParams);
        return comments.data;
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const blogPost = await fetchBlogPostAPI(id);
        const photos = await fetchBlogPostPhotos(id);
        const comments = await this.fetchComments(id);
        document.documentElement.classList.remove('nav-open');
        this.setState({ 
            blogPost: blogPost.data,
            photos: photos.data,
            comments: comments.blogPosts,
            blogPostId: id,
            totalComments: comments.totalItems,
            loading: false
        });        
    }
    
    loadMoreComments = async () => {
        await this.setState({ count: this.state.count + 1 });
        const commentParams = {
            currentCount: this.state.count
        };
        
        const res = await fetchCommentsAPI(this.state.blogPostId, commentParams);
        const comments = res.data;
        this.setState({ comments: [...this.state.comments, ...comments.blogPosts]});
    };
    
    renderComments = () => {
        return this.state.comments.map(comment => {
            return (
                <div key={comment.id}>
                <i className="far fa-comment-dots" style={{ fontSize: '160%'}}></i>
                    <blockquote className="blockquote">
                    <p className="mb-0">
                        {comment.commentMade}
                    </p>
                    <footer className="blockquote-footer">
                        Comment made by <cite title="Source Title">{comment.madeBy}</cite>
                    </footer>
                    </blockquote>
                </div>
            );
        })
    };
    
    handleChange = (event) => {
        const { value, name } = event.target;
        
        this.setState({ [name]: value });
    };
    postComment = async () => {
        const { id } = this.props.match.params;
        const comment = {
            blogPostId: id,
            madeBy: this.state.madeBy,
            commentMade: this.state.commentMade
        };
        postCommentAPI(comment).then( async res => {
            if(res.status === 200) {
                notify.show('Your comment has been added', 'success', 5000);
                await this.setState({ count: 1 });
                const commentParams = {
                    currentCount: this.state.count
                };
                const comments = await this.fetchComments(this.state.blogPostId, commentParams);
                this.setState({ comments: comments.blogPosts, madeBy: '', commentMade: '' });
            }
        }).catch(err => {
            notify.show('Failed to post comment', 'error', 5000)
        })
    }
    thereIsMore = () => {
        if(this.state.totalComments > this.state.comments.length) {
            return true;
        }
        return false;
    }
    
    render() {
        if(this.state.loading) {
            return (
                <div style={{ padding: '240px 50px 100px 600px' }}>
                    <Loader type="RevolvingDot"
                    color="blue"
                    height={1000}
                    width={1000}
                    timeout={60000} 
                     />
                </div>
            );
        }
        return (
            <>
            <div>
            <Notifications options={{zIndex: 500, top: '450px'}} />
            <Card className="mb-3 blog-card"> 
                {/* <CardImg className='blog-cardImage' alt="..." src={require('assets/img/9b727d99-8ef5-49e6-a311-909a0c628f0d.jpg')} top></CardImg> */}
                <CardBody>
                <BlogPostImages className='blog-cardImage' photos={this.state.photos}/>
                <CardTitle tag="h4" className="md-h4">{this.state.blogPost.author}: {this.state.blogPost.heading}</CardTitle>
                <CardText className="md-h4">
                    {this.state.blogPost.body}
                </CardText>
                <CardText>
                    {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                </CardText>
                    { 
                        this.renderComments()
                    }
                    <Button 
                        onClick={this.loadMoreComments} 
                        color='success' 
                        type='button'
                        // disabled={this.thereIsMore()}
                        className={`${this.thereIsMore()? '': 'none'}`}
                        // style={{ display: `${this.thereIsMore()}? none !important: none !important`}}
                    >Load more <i className="fas fa-spinner"></i></Button>
                </CardBody>
                </Card>
                <Container>
                <Row>
                <Col>
                <div>
                </div>
                </Col>
                </Row>
                </Container>
                <div className='comment-fields'>
                <Container>
                <Row>
                <Col className=" ml-auto mr-auto" lg="10" md="8">
                    <h2 className="md-blog-head">Do u care to leave a comment on the post?</h2>
                    <Form className="md-form">
                    <FormGroup>
                    <InputGroup>
                    <Input
                        aria-describedby="madeBy"
                        id="madeBy"
                        name='madeBy'
                        value={this.state.madeBy}
                        placeholder="Please enter your name"
                        type="text"
                        onChange={this.handleChange}
                    >
                    </Input>
                    </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    <div className="textarea-container">
                        <Input className="md-query" style={{maxHeight: '300px'}}
                            cols="80"
                            name="commentMade"
                            value={this.state.commentMade}
                            placeholder="Please enter your comment"
                            rows="7"
                            type="textarea"
                            onChange={this.handleChange}
                            ></Input>
                    </div>
                    </FormGroup>
                    <Button color="primary" type='button' onClick={this.postComment}>
                    Submit
                    </Button>
                </Form>
                </Col>
                </Row>
                </Container>
                </div>
            </div>
            </>
        );
    }
}

export default BlogDetails;