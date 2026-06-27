import { publicPath } from './publicPath';

const preloadedImages = new Set();

export function preloadImage(path) {
  const src = publicPath(path);

  if (typeof window === 'undefined' || preloadedImages.has(src)) {
    return;
  }

  preloadedImages.add(src);

  const image = new Image();
  image.decoding = 'async';
  image.src = src;
}

export function preloadImages(paths) {
  paths.forEach(preloadImage);
}
