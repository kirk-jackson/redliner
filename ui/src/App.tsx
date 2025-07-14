/*!
 * Copyright © 2025 Kirk Jackson
 * Licensed under the GNU Affero General Public License version 3
 */

import { useState, useEffect, useRef } from 'react'
import './App.css'
import ChatBubble from './ChatBubble'
import type { Author, Message } from './types.ts'

function App() {
  // App state
  const [chatHistory, setChatHistory] = useState<Message[]>([{
    author: 'chatbot',
    text: 'Ready to redline! Please enter the first version of the text.',
  }])
  const [textInput, setTextInput] = useState('')
  const [firstVersionOfText, setFirstVersionOfText] = useState<string|null>(null)

  const chatHistoryRef = useRef<HTMLDivElement>(null)

  // Ensure that new messages are always visible.
  useEffect(() => {
    const chatHistoryElement = chatHistoryRef.current
    if (chatHistoryElement) {
      chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight
    }
  }, [chatHistory])

  const addMessageToChatHistory = (author: Author, text: string) => {
    setChatHistory(pendingChatHistory => [...pendingChatHistory, {author, text}])
  }

  const appendToLastMessageInChatHistory = (textChunk: string) => {
    setChatHistory(pendingChatHistory => {
      if (pendingChatHistory.length === 0) return pendingChatHistory

      const lastMessage = pendingChatHistory.at(-1) as Message
      return [
        ...pendingChatHistory.slice(0, -1),
        {
          ...lastMessage,
          text: lastMessage.text + textChunk,
        },
      ]
    })
  }

  const handleSubmit = async () => {
    // Don't accept an empty message from the user.
    if (textInput.trim() === '') return

    // Post the user's message to the chat history.
    addMessageToChatHistory('user', textInput)
    setTextInput('')

    // Process the user's input and let the chatbot respond.
    if (firstVersionOfText === null) {
      // The chatbot now has the first version of the text, but it still needs the second.
      setFirstVersionOfText(textInput)
      addMessageToChatHistory('chatbot', 'Now please enter the second version of the text.')
    } else {
      // The chatbot now has both versions of the text, so it can redline them.
      addMessageToChatHistory('chatbot', '')
      const params = new URLSearchParams({ textv1: firstVersionOfText, textv2: textInput })
      const response = await fetch(`http://localhost:5000/redline?${params}`)
      const data = await response.json()
      appendToLastMessageInChatHistory(data.message)

      // Reset, ready to start again.
      setFirstVersionOfText(null)
      addMessageToChatHistory('chatbot', 'Ready to go again? Please enter the first version of the text.')
    }
  }

  return (
    <>
      <header>
        <h1>Redliner</h1>
        Highlight text differences
      </header>
      <main ref={chatHistoryRef}>
        {chatHistory.map((message, index) => <ChatBubble message={message} key={index} />)}
      </main>
      <div id="input">
        <textarea
          rows={3}
          placeholder="Enter text"
          value={textInput}
          onChange={event => setTextInput(event.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"></path>
          </svg>
        </button>
      </div>
    </>
  )
}

export default App
