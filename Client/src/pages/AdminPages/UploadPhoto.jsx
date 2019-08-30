import React from 'react';
import { connect } from 'react-redux';

import { Col, Row, Button } from 'reactstrap';
import { uploadPictureAPI, fetchBlogPostPhotos, makeMainPhotoAPI, deletePhotoAPI } from '../../apis/fohcafapis';
import { UploadBlogPostPhoto } from 'redux/blog-posts/blog-post.actions';
import './UploadPhoto.styles.scss';

class UploadPhoto extends React.Component {
    state = {
        photos: [],
        blogPostId: null
    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        const pictures = await fetchBlogPostPhotos(id);
        this.setState({ photos: pictures.data, blogPostId: id });
        console.log(this.state);
    }

    handleChange = async event => {
            const file = Array.from(event.target.files);
            const formData = new FormData();
            formData.append('file', file[0]);
            console.log(file, formData);
            
            const { id } = this.props.match.params;
            const response = await uploadPictureAPI(id, formData);
            if(response.status === 200) {
                const pictures = await fetchBlogPostPhotos(id);
                this.setState({ photos: pictures.data });
            }  
        };
    deletePhoto = async (photo) => {
        const res = await deletePhotoAPI(this.state.blogPostId, photo.id);
        if (res.status === 200) {
            const index = this.state.photos.indexOf(photo);
            this.state.photos.splice(index, 1);
            this.setState({ photos: this.state.photos });
        }
        console.log(res);
        
    }

    renderPhoto = () => {
        return this.state.photos.map(p => {
            return (
                <Col sm="2" className='space-between-pics'>
                    <img
                    alt="..."
                    className="rounded img-raised"
                    src={require(`assets/img/${p.fileName}`)}
                    ></img>
                    <Button onClick={() => this.makeMainPhoto(p) } color='success' disabled={p.isMain}>IsMain</Button>
                    <Button onClick={() => this.deletePhoto(p) } color='danger'>Delete</Button>
                </Col>
            );
        });
    }
    makeMainPhoto = async (photo) => {
        const res = await makeMainPhotoAPI(photo.blogPostId, photo.id);
        if(res.status === 200) {
            const currentMain = this.state.photos.filter(p => p.isMain === true)[0];
            photo.isMain = true;
            if(currentMain)
                currentMain.isMain = false;
            this.setState({ photos: this.state.photos });
        }
        console.log(res.statusText);
    }
    render() {
        if(this.state.photos.length < 1 ) {
            return <div>Loading...</div>
        }
        return (
            <>
            <div className="section">
                <div style={{ padding: '6rem' }}>
                    <h2>Upload Photo</h2>
                    <input type='file' className='btn' name='photo' onChange={this.handleChange} />
                </div>
                <div className="space-90">
                    <div id="images">
                        <Row>
                            {this.renderPhoto()}
                        </Row>
                    </div>
                </div>
            </div>
            </>
            );
        };
    }

const mapDispatchToProps = dispatch => ({
    uploadPhoto: uploadedPhoto => 
                dispatch(UploadBlogPostPhoto(uploadedPhoto))
});

export default connect(null, mapDispatchToProps)(UploadPhoto);