/*!
 * Copyright © 2025 Kirk Jackson
 * Licensed under the GNU Affero General Public License
 */

function ChatBubble({ message }: {message: string}) {
  return (
    <p className="chat-bubble">
      {message}
    </p>
  )
}

export default ChatBubble
