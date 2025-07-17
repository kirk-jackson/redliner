export type Author = 'chatbot' | 'user'

export interface Message {
  author: Author
  content: string
  isHtml: boolean
}
