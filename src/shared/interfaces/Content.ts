import { Document } from "@contentful/rich-text-types"

export interface Content {
  name: string
  image: {
    title: string
    url: string
  }
  price: number
  slug: string
  description: {
    json: Document
  }
}
