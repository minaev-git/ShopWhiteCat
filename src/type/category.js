// @flow
import type { Product } from "./product"

export type ChildCategory = {
  id: number,
  name: string,
  count?: string
}

export type Category = {
  id: number,
  name: string,
  seo_description: string,
  count: number,
  child_categories: ChildCategory[],
  Products: Product[]
}
