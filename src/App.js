import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import { Container } from './Components/ImagesFinder.styled';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <Container>
        <Toaster />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </Container>
    );
  }
}