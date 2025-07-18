/*!
 * Copyright © 2025 Kirk Jackson
 * Licensed under the GNU Affero General Public License version 3
 */

export type Author = 'chatbot' | 'user'

export interface Message {
  author: Author
  content: string
  isHtml: boolean
}
