import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectBlogPosts } from '../../redux/blog-posts/blog-post.selector';
import { FetchBlogPosts } from 'redux/blog-posts/blog-post.actions';
import { fetchBlogPostsAPI } from 'apis/fohcafapis';

class ManagePost extends React.Component{

    async componentDidMount () {
        const blogs = await fetchBlogPostsAPI();
        this.props.fetchBlogPosts(blogs.data);
    }
    render() {
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
                        this.props.blogPosts.blogPosts.map(post => {
                            const date = new Date(post.date);
                        return (
                            <tr key={post.id}>
                                <th scope="row">{post.id}</th>
                                <td>{post.author}</td>
                                <td>{post.heading}</td>
                                <td>{date.toLocaleDateString()}</td>
                                <td><Link to={`/uploadPhoto/${post.id}`}>Upload Picture</Link></td>
                                <td><a>Edit</a></td>
                                <td><a>Delete</a></td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
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
        dispatch(FetchBlogPosts(blogPosts))
});
export default connect(mapStateToProps, mapDispatchToProps)(ManagePost);