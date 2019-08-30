import React from 'react';

import { fetchBlogPostPhoto } from '../../apis/fohcafapis';
import './BlogPostItem.styles.scss';

class BlogPostItem extends React.Component {
    state = {
        photoUrl: ''
    };

    async componentDidMount() {
        const { id } = this.props; 
        const photo = await fetchBlogPostPhoto(id);
        // console.log(photo);
        
        this.setState({ photoUrl: photo.data.fileName});
        // console.log(this.state);
        
    }
    render() { 
        const { author, heading } = this.props; 
        console.log('photo url ', this.state.photoUrl);
        // if(this.state.photoUrl) {
            return(
            <>
            <div className='wrapper'>
                <div className='collection-section'>
                <div className='collection-item'>
                    <div className='image' 
                    style={{ 
                        // backgroundImage: "url(" + require('assets/img/' + this.state.photoUrl) + ")"
                        }} />
                    <div className='collection-footer'>
                        <span className='blog-title'>{author}: </span>
                        <span>{heading}</span> 
                    </div>
                    </div>
                </div>
            </div>
            </>
        )};
        //    return (
        //    <div className='wrapper'>
        //     <div className='collection-section'>
        //     <div>loading....</div></div></div>
        //    )
    // }
}
export default BlogPostItem;