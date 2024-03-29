import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Gallery, GalleryItem } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <Gallery>
    {images.map(image => (
      <GalleryItem key={image.id}>
        <ImageGalleryItem image={image} />
      </GalleryItem>
    ))}
  </Gallery>
);