/*!
 * Copyright © 2025 Kirk Jackson
 * Licensed under the GNU Affero General Public License version 3
 */

import { useState, useEffect, useRef } from 'react'
import './App.css'
import ChatBubble from './ChatBubble'
import type { Author, Message } from './types.ts'

const redlinerApiOrigin = import.meta.env.VITE_REDLINER_API_ORIGIN

function App() {
  // App state
  const [chatHistory, setChatHistory] = useState<Message[]>([{
    author: 'chatbot',
    content: "Ready to redline! Please enter the first version of the text.",
    isHtml: false,
  }])
  const [textInput, setTextInput] = useState('')
  const [firstVersionOfText, setFirstVersionOfText] = useState<string|null>(null)

  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const textInputRef = useRef<HTMLTextAreaElement>(null)

  // Ensure that new messages are always visible.
  useEffect(() => {
    const chatHistoryElement = chatHistoryRef.current
    if (chatHistoryElement) {
      chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight
    }
  }, [chatHistory])

  // Add a message to the chat history.
  const addMessageToChatHistory = (author: Author, content: string, isHtml: boolean = false) => {
    setChatHistory(pendingChatHistory => [...pendingChatHistory, {author, content, isHtml}])
  }

  // Append a chunk of HTML/text to the last message in the chat history.
  const appendToLastMessageInChatHistory = (chunk: string) => {
    setChatHistory(pendingChatHistory => {
      if (pendingChatHistory.length === 0) return pendingChatHistory

      const lastMessage = pendingChatHistory.at(-1) as Message
      return [
        ...pendingChatHistory.slice(0, -1),
        {
          ...lastMessage,
          content: lastMessage.content + chunk,
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

    textInputRef.current?.focus() // Refocus the text input so the user can keep typing.

    // Process the user's input and let the chatbot respond.
    if (firstVersionOfText === null) {
      // The chatbot now has the first version of the text, but it still needs the second.
      setFirstVersionOfText(textInput)
      addMessageToChatHistory('chatbot', "Now please enter the second version of the text.")
    } else {
      // The chatbot now has both versions of the text, so it can redline them.
      addMessageToChatHistory('chatbot', "Thanks. Please give me a moment...")

      // Call the API and stream the response.
      const requestUrlParams = new URLSearchParams({ textv1: firstVersionOfText, textv2: textInput })
      try {
        // Call the API and check the response for errors.
        const response = await fetch(`${redlinerApiOrigin}/redline?${requestUrlParams}`)
        if (!response.body) throw new Error("API response has no body")
        if (!response.ok) {
          const error = await response.json()
          if (error.code === 'openai_authentication') {
            addMessageToChatHistory('chatbot', "Oh dear, OpenAI won't talk to me. I might not have a valid API key. 😕")
            return
          }
          throw new Error("API error")
        }

        // Stream the API response to the chat history.
        const responseReader = response.body.getReader()
        const textDecoder = new TextDecoder()
        addMessageToChatHistory('chatbot', "", true) // Add an empty HTML chat bubble to stream the response into.
        while (true) {
          const { done, value } = await responseReader.read()
          if (done) break
          if (value) {
            appendToLastMessageInChatHistory(textDecoder.decode(value))
          }
        }
      } catch {
        addMessageToChatHistory('chatbot', "Sorry, something went wrong and I couldn't complete the task. 😕")
      } finally {
        // Reset, ready to start again.
        setFirstVersionOfText(null)
        addMessageToChatHistory('chatbot', "Ready to go again? Please enter the first version of the text.")
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Pressing Enter submits the message, unless Shift is also pressed.
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
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
          ref={textInputRef}
          onKeyDown={handleKeyDown}
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
