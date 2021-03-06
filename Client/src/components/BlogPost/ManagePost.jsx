import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { selectBlogPosts } from '../../redux/blog-posts/blog-post.selector';
import { FetchBlogPosts } from 'redux/blog-posts/blog-post.actions';
import { fetchBlogPostsAPI, deleteBlogPostAPI } from 'apis/fohcafapis';
import { DeleteBlogPost } from 'redux/blog-posts/blog-post.actions';
import PaginationComponent from '../shared/Pagination';


class ManagePost extends React.Component{
    state = {
        blogs: [],
        pageSize: 5,
        currentPage: 1
    };

    getBlogPosts = async () => {
        const queryParams = {
            pageSize: this.state.pageSize,
            currentPage: this.state.currentPage
        };
        const blogs = await fetchBlogPostsAPI(queryParams);
        this.setState({ totalItems: blogs.data.totalItems, blogs: blogs.data.blogPosts });
        this.props.fetchBlogPosts(blogs.data);
    }

    async componentDidMount () {
        this.getBlogPosts();
    }

    showPagination = () => {
        if(this.state.totalItems) {
            return (
                <PaginationComponent onPageChange={this.pageChanged} totalItems={this.state.totalItems} pageSize={this.state.pageSize} />
                );
        }
    };
    pageChanged = async (p) => {
        await this.setState({ currentPage: p });
        this.getBlogPosts();
    };

    deletePost = async post => {
        if(window.confirm("Are you sure you want to delete the post")) {
            const res = await deleteBlogPostAPI(post.id);
            if (res.status === 200) {
                const index = this.state.blogs.indexOf(post);
                this.state.blogs.splice(index, 1);
                this.setState({ blogs: this.state.blogs });
            }
            console.log(res);
        }
    }
    render() {
        if(this.state.blogs.length < 1) {
           return <Loader type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} />
        }
        return (
        <>
            <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Author</th>
                    <th scope="col">Heading</th>
                    <th scope="col">Date</th>
                    <th scope="col">Upload Picture(s)</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.blogs.map(post => {
                            const date = new Date(post.date);
                        return (
                            <tr key={post.id}>
                                <th scope="row">{post.id}</th>
                                <td>{post.author}</td>
                                <td>{post.heading}</td>
                                <td>{date.toLocaleDateString()}</td>
                                <td><Link to={`/uploadPhoto/${post.id}`}>Upload Picture</Link></td>
                                <td><Link to={`/editBlogPost/${post.id}`}>Edit</Link></td>
                                <td><a onClick={() => this.deletePost(post)}>Delete</a></td>
                            </tr>
                        );
                    })
                    }
                </tbody>
                
            </table>
            <div>
                {this.showPagination()}
            </div>
            </div>
            </>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    blogPosts: selectBlogPosts
});

const mapDispatchToProps = dispatch => ({
    fetchBlogPosts: blogPosts => 
        dispatch(FetchBlogPosts(blogPosts)),
    deleteBlogPost: blogPostId => 
        dispatch(DeleteBlogPost(blogPostId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ManagePost);