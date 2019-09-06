import React from 'react';

import { fetchBlogPostAPI, fetchBlogPostPhotos, fetchCommentsAPI, postCommentAPI } from '../../apis/fohcafapis';
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

class BlogDetails extends React.Component {
    state = {
        blogPost: {},
        photos: [],
        count: 1,
        comments: [],
        blogPostId: null,
        totalComments: null
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
        this.setState({ 
            blogPost: blogPost.data,
            photos: photos.data,
            comments: comments.blogPosts,
            blogPostId: id,
            totalComments: comments.totalItems
        });
        console.log(this.state);
        
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
        const res = await postCommentAPI(comment);
        if(res.status === 200) {
            await this.setState({ count: this.state.count + 1 });
            const commentParams = {
                currentCount: this.state.count
            };
            const comments = await this.fetchComments(this.state.blogPostId);
            this.setState({ comments: comments.blogPosts });
        }
    }
    thereIsMore = () => {
        if(this.state.totalComments > this.state.comments.length) {
            return true;
        }
        return false;
    }
    
    render() {
        return (
            <>
            <div>
            <Card className="mb-3 blog-card"> 
                {/* <CardImg className='blog-cardImage' alt="..." src={require('assets/img/9b727d99-8ef5-49e6-a311-909a0c628f0d.jpg')} top></CardImg> */}
                <CardBody>
                <BlogPostImages className='blog-cardImage' photos={this.state.photos}/>
                <CardTitle tag="h4">Card title</CardTitle>
                <CardText>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nesciunt ut, voluptatem quas aut corporis quo alias cumque labore esse voluptatibus fugit deserunt iusto, laborum, dolor ipsam molestias delectus. Beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa exercitationem odit eius corporis, illum deleniti repudiandae aliquid impedit fugiat asperiores magni hic dolore necessitatibus maxime iusto ea enim dolor quasi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, magni sequi eos consequuntur nostrum magnam soluta atque id, debitis odit, ducimus dolore reiciendis quod omnis voluptatum provident modi corrupti ratione! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio facere rem porro minima nostrum velit sapiente nam, nihil consequuntur ex laudantium laborum facilis, possimus aperiam vel quam tempora repudiandae optio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit hic, sapiente tenetur saepe quos quae blanditiis tempore dolorum eligendi sint autem, incidunt provident atque vero iure. Molestias maiores ipsum earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odio ducimus non quia, cupiditate laborum in obcaecati accusamus voluptatibus quis dolorem earum qui, inventore omnis, maiores quidem quod et repudiandae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, nostrum! Possimus vero sed unde sit accusantium pariatur, nam debitis, facere quos reiciendis, perferendis magnam corrupti accusamus ratione cupiditate vitae commodi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quis rem et similique, impedit dolorem officia, error blanditiis accusamus suscipit ipsam, quo aspernatur. Dignissimos reiciendis placeat soluta molestias culpa at?
                </CardText>
                <CardText>
                    <small className="text-muted">Last updated 3 mins ago</small>
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
                    >Load more <i class="fas fa-spinner"></i></Button>
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
                    <h2>Do u care to leave a comment on the post?</h2>
                    <Form>
                    <FormGroup>
                    <InputGroup>
                    <Input
                        aria-describedby="madeBy"
                        id="madeBy"
                        name='madeBy'
                        placeholder="Please enter your name"
                        type="text"
                        onChange={this.handleChange}
                    >
                    </Input>
                    </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    <div className="textarea-container">
                        <Input style={{maxHeight: '300px'}}
                            cols="80"
                            name="commentMade"
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