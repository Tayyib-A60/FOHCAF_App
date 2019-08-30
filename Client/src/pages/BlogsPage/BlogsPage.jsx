import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchBlogPostsAPI } from '../../apis/fohcafapis';
import BlogPostItem from '../../components/BlogPost/BlogPostItem';
import './BlogsPage.styles.scss';
import { selectBlogPosts } from 'redux/blog-posts/blog-post.selector';
import { FetchBlogPosts } from 'redux/blog-posts/blog-post.actions';

class BlogPage extends React.Component {

    async componentDidMount() {
        const blogs = await fetchBlogPostsAPI();
        this.props.fetchBlogPosts(blogs.data);
    }
    renderBlogPosts = () => {
        // const blogPost = this.props.blogPosts.blogPosts[0];
        // console.log(blogPost.photo);
        
        return this.props.blogPosts.blogPosts.map( blogPost => {
            return <BlogPostItem
                        className='collection-item'
                        key={blogPost.id}
                        id={blogPost.id}
                        heading={blogPost.heading}
                        author={blogPost.author}
                        body={blogPost.body}
                        date={blogPost.date}
                    />
        });
    }
    render() {
        return (
            <>
            <div className='collection-page'>
                <div className='items'>
                    {
                        this.renderBlogPosts()
                    }
                </div>
                <div className='preview'>
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
        dispatch(FetchBlogPosts(blogPosts))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);