import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { ImageGalleryList } from './ImagesFinder.styled';

export default function ImageGallery ({ images, onImageClick}) {
    return (
            <div>
                <ImageGalleryList>
                    <ImageGalleryItem images={images} onClick={onImageClick}/>
                </ImageGalleryList>
            </div>
        );

}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string,
}