import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import { Container } from './Components/ImagesFinder.styled';
import imagesApi from './services/images-api'
import Modal from './Components/Modal';
import Button from './Components/Button';
import { StyledLoader } from './Components/ImagesFinder.styled';

export default class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    selectedImage: null,
    images: null,
    error: null,
    page: 1,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ page: 1, status: 'pending' });

      imagesApi
        .fetchImages(this.state.searchQuery, this.state.page)
        .then(images => {
          if (!images.hits.length) {
            this.setState({ status: 'idle', images: null});
            return toast.error(`No matches found`)
          }
          this.setState({ images: images.hits, status: 'resolved'})
        })
        .catch(error => this.setState({ error, status: 'rejected'}))
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleImageClick = link => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
    this.setState({ selectedImage: link });
  };

  handleLoadMoreBnt = () => {
    this.setState({ page: this.state.page + 1 });

    imagesApi
      .fetchImages(this.state.searchQuery, this.state.page + 1)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));
      })
  }

  render() {
    const {showModal, selectedImage, images, status, error } = this.state;

    return (
      <Container>
        <Toaster />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <div></div>}
        {status === 'pending' &&
          <StyledLoader
            type="BallTriangle"
            color="#000"
            height={50}
            width={50} />
        }
        {status === 'rejected' && <h2>{error.message}</h2>}
        {status === 'resolved' &&
          <ImageGallery
            images={images}
            onImageClick={this.handleImageClick} />
        }
        {images && images.length > 11 && <Button onClick={this.handleLoadMoreBnt}/>}
        {showModal &&
          <Modal onClose={this.handleImageClick}>
            <img src={selectedImage} alt="" onClick={this.handleImageClick}/>
          </Modal>
        }
      </Container>
    );
  }
}