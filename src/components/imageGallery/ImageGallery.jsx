import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <Gallery>
    {images.map(image => (
      <ImageGalleryItem key={image.id} image={image} />
    ))}
  </Gallery>
);