import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchBlogPostsAPI } from '../../apis/fohcafapis';
import BlogPostItem from '../../components/BlogPost/BlogPostItem';
import './BlogsPage.styles.scss';
import { selectBlogPosts } from 'redux/blog-posts/blog-post.selector';
import { FetchBlogPosts } from 'redux/blog-posts/blog-post.actions';
import PaginationComponent from 'components/shared/Pagination';

class BlogPage extends React.Component {
    state = {
        pageSize: 5,
        currentPage: 1,
        totalItems: null
    };
    getBlogPosts = async () => {
        const queryParams = {
            pageSize: this.state.pageSize,
            currentPage: this.state.currentPage
        };
        const blogs = await fetchBlogPostsAPI(queryParams);
        this.setState({ totalItems: blogs.data.totalItems });
        this.props.fetchBlogPosts(blogs.data);
    }
    async componentDidMount() {
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
    
    renderBlogPosts = () => {
        // const blogPost = this.props.blogPosts.blogPosts[0];
        // console.log(blogPost.photo);
        
        return this.props.blogPosts.blogPosts.map( blogPost => {
            return <BlogPostItem className='collection-item'
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
                {
                    this.showPagination()
                }
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