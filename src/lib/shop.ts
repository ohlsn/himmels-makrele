import { shopData, type Product } from "../../content/shop";

export function getProductPath(product: Product) {
  return `/shop/${product.id}`;
}

export function getProductById(productId: string) {
  return shopData.find((product) => product.id === productId) ?? null;
}

export function getProductHeroImage(product: Product) {
  return product.colors.find((color) => color.images.length > 0)?.images[0];
}

export function getAvailableColorCount(product: Product) {
  return product.colors.length;
}

export function getAvailableSizeCount(product: Product) {
  return product.sizes.length;
}
