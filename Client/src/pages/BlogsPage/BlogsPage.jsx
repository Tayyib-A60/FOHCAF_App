import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchBlogPostsAPI } from '../../apis/fohcafapis';
import BlogPostItem from '../../components/BlogPost/BlogPostItem';
import './BlogsPage.styles.scss';
import { selectBlogPosts } from 'redux/blog-posts/blog-post.selector';
import { FetchBlogPosts } from 'redux/blog-posts/blog-post.actions';
import PaginationComponent from 'components/shared/Pagination';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';
class BlogPage extends React.Component {
    state = {
        pageSize: 5,
        currentPage: 1,
        totalItems: 0,
        loading: true
    };

    getBlogPosts = async () => {
        const queryParams = {
            pageSize: this.state.pageSize,
            currentPage: this.state.currentPage
        };
        fetchBlogPostsAPI(queryParams).then(
            async res => {
                const blogs = res.data;
                await this.setState({ totalItems: blogs.totalItems, loading: false });
                this.props.fetchBlogPosts(blogs);
            }
        )
        
    }
    
    async componentDidMount() {
        const queryParams = {
            pageSize: this.state.pageSize,
            currentPage: this.state.currentPage
        };
        document.documentElement.classList.remove('nav-open');
        fetchBlogPostsAPI(queryParams).then(
            async res => {
                const blogs = res.data;
                await this.setState({ totalItems: blogs.totalItems, loading: false });
                this.props.fetchBlogPosts(blogs);
            }
        );   
          
    }
    showPagination = () => {
        if(this.state.totalItems) {
            return (
                <div style={{display: `${this.state.totalItems<= this.state.pageSize? 'none': ''}`}}>
                    <PaginationComponent onPageChange={this.pageChanged} totalItems={this.state.totalItems} pageSize={this.state.pageSize} />
                </div>
            );
        }
    };
    
    pageChanged = async (p) => {
        await this.setState({ currentPage: p });
        this.getBlogPosts();
    };
    
    renderBlogPosts = () => {
        while(this.state.totalItems > 0) {
            
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
        return (
            <>
                <br/>
                <br/>
                <br/>
                <h2 style={{ margin: '0 auto', padding: '10px'}}>No blog posts</h2>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </>
        )
    }
    render() {
        if(this.state.loading) {
            return (
                <div style={{ padding: '240px 50px 100px 600px' }}>
                    <Loader type="RevolvingDot"
                    color="blue"
                    height={1000}
                    width={1000}
                    timeout={300000} 
                     />
                </div>
            );
        }
        return (
            <>
            <div className='collection-page'>
                <br/>
                <br/>
                <br/>
                <br/>
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