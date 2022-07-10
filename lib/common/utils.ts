import createCache from '@emotion/cache';

export const createEmotionCache = () => {
  const cache = createCache({ key: 'css', prepend: true })
  return cache;
};

export const getImage = (image:any) => getImageProps(image).url;

export const getImageProps = (image:any) => {
  return image.data.attributes;
};

export const getImages = (images:any) => {
  return images.map(getImage);
};