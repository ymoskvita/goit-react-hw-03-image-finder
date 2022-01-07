import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { SearchbarStyled, SearchForm, SearchFormButton, SearchFormInput } from './ImagesFinder.styled';

export default class Searchbar extends Component {
    state = {
        searchQuery: '',
    };

    handleQueryChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchQuery.trim() === '') {
            toast.error(`Enter query`)
            return;
        }

        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    };

    render() {
        return (
            <SearchbarStyled>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchFormButton type="submit"><BsSearch /></SearchFormButton>
                    <SearchFormInput
                        type="text"
                        name="searchQuery"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.searchQuery}
                        onChange={this.handleQueryChange}
                    />
                </SearchForm>
            </SearchbarStyled>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}