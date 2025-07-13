/*!
 * Copyright © 2025 Kirk Jackson
 * Licensed under the GNU Affero General Public License version 3
 */

import type { Message } from './types.ts'
import clsx from 'clsx'

function ChatBubble({ message }: { message: Message }) {
  return (
    <p className={clsx('chat-bubble', `author-${message.author}`)}>
      {message.text}
    </p>
  )
}

export default ChatBubble
