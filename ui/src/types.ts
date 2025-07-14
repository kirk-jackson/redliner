export type Author = 'chatbot' | 'user'

export interface Message {
  author: Author
  text: string
}
