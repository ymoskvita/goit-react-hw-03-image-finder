import React, { Component } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import imagesApi from '../services/images-api';
import Modal from './Modal';
import Button from './Button';
import { ImageGalleryList, StyledLoader } from './ImagesFinder.styled';

export default class ImageGallery extends Component {
    state = {
        images: null,
        loading: false,
        error: null,
        showModal: false,
        selectedImage: null,
        page: 1,
        status: 'idle',
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({ page: 1, status: 'pending' });

            imagesApi
                .fetchImages(this.props.searchQuery, this.state.page)
                .then(images => {
                    if (!images.hits.length) {
                        this.setState({ status: 'idle'});
                        return toast.error(`No matches found`)
                    }
                    this.setState({ images: images.hits, status: 'resolved', page: this.state.page + 1 })
                })
                .catch(error => this.setState({ error, status: 'rejected'}))
        }
    }

    handleImageClick = link => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
        this.setState({ selectedImage: link });
    }

    handleLoadMoreBnt = () => {
        this.setState({ page: this.state.page + 1 });

        imagesApi
            .fetchImages(this.props.searchQuery, this.state.page)
            .then(images => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...images.hits],
                }));
            })
    }

    render() {
        const { images, error, status, showModal, selectedImage } = this.state;

        if (status === 'idle') {
            return <div></div>;
        }
        if (status === 'pending') {
            return (
                <StyledLoader
                    type="BallTriangle"
                    color="#000"
                    height={50}
                    width={50}
                />
            )
        }
        if (status === 'rejected') {
            return <h2>{error.message}</h2>;
        }
        if (status === 'resolved') {
            return (
                <div>
                    <ImageGalleryList>
                        <ImageGalleryItem images={images} onClick={this.handleImageClick}/>
                    </ImageGalleryList>
                    {showModal &&
                        <Modal onClose={this.handleImageClick}>
                            <img src={selectedImage} alt="" onClick={this.handleImageClick}/>
                        </Modal>
                    }
                    {images.length > 11 && <Button onClick={this.handleLoadMoreBnt}/>}
                </div>
            );
        }
    }
}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string,
}