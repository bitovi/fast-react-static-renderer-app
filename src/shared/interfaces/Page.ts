import { Document } from "@contentful/rich-text-types"

export interface Page {
  title: string
  image: {
    title: string
    url: string
  }
  tag: string
  slug: string
  description: {
    json: Document
  }
}
