import { StyledItem, StyledImage } from './ImagesFinder.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, onClick }) {
    return (
        <>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <StyledItem key={id} onClick={() => onClick(largeImageURL)}>
                    <StyledImage src={webformatURL} alt={tags} />
                </StyledItem>
            ))}
        </>
    )
}

ImageGalleryItem.propTypes = {
     images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
    })),
    onClick: PropTypes.func,
}