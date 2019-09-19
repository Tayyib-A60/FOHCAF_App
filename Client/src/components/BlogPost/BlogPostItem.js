import React from 'react';
import { Link } from 'react-router-dom';

import { fetchBlogPostPhoto } from '../../apis/fohcafapis';
import './BlogPostItem.styles.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';

class BlogPostItem extends React.Component {
    state = {
        photoUrl: '',
        loading: true
    };

    async componentDidMount() {
        const { id } = this.props; 
        const photo = await fetchBlogPostPhoto(id);
        this.setState({ photoUrl: photo.data.fileName, loading: false });
    }
    render() { 
        const { author, heading, id } = this.props; 
            if(this.state.loading) {
                return (
                    <div className="md-wrapper" style={{ padding: '240px 50px 100px 600px' }}>
                        <Loader type="RevolvingDot"
                        color="blue"
                        height={1000}
                        width={1000}
                        timeout={300000} 
                         />
                    </div>
                );
            }
            if(!this.state.loading && this.state.photoUrl) {
                return (
                <>
                <div className='wrapper'>
                    <div className='collection-section'>
                    <Link className='post-link' to={`/blog/${id}`}>
                    <div className='collection-item'>
                        <div className='image'
                        style={{ 
                            backgroundImage: `url(https://localhost:5001/uploads/${this.state.photoUrl})`
                            }} />
                        <div className='collection-footer'>
                            <span className='blog-title'>{author}: </span>
                            <span>{heading}</span> 
                        </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </>
            )}
            return (
                <>
                <div className='wrapper'>
                    <div className='collection-section'>
                    <Link className='post-link' to={`/blog/${id}`}>
                    <div className='collection-item'>
                        <div className='image'
                        style={{ 
                            // backgroundImage: "url(" + require('assets/img/' + this.state.photoUrl) + ")"
                            }} />
                        <div className='collection-footer'>
                            <span className='blog-title'>{author}: </span>
                            <span className="md-heading">{heading}</span> 
                        </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </>
            );
    };
}
export default BlogPostItem;