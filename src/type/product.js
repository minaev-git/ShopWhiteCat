// @flow
export type ChildProduct = {
  id: number,
  name: string,
  status: string,
  price: number,
  sale_price: number
}

export type Color = {
  id: number,
  name: string,
  hex: string
}

export type Product = {
  id: number,
  name: string,
  status: string,
  seo_description: string,
  price: number,
  sale_price: number,
  images: string,
  brand: string,
  child_products: ChildProduct[],
  colors: Color[]
}
