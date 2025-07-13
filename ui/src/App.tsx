/*!
 * Copyright © 2025 Kirk Jackson
 * Licensed under the GNU Affero General Public License version 3
 */

import { useState, useEffect, useRef } from 'react'
import './App.css'
import ChatBubble from './ChatBubble'
import type { Message } from './types.ts'

type AppState = 'firstPrompt' | 'secondPrompt'

function App() {
  // The chat advances through a sequence of states and then resets.
  const states: AppState[] = ['firstPrompt', 'secondPrompt']

  // App state
  const [stateIndex, setStateIndex] = useState(0)
  const [chatHistory, setChatHistory] = useState<Message[]>([{
    author: 'chatbot',
    text: 'Ready to redline! Please enter the first version of the text.',
  }])
  const [textInput, setTextInput] = useState('')

  const chatHistoryRef = useRef<HTMLDivElement>(null)

  // Ensure that new messages are always visible.
  useEffect(() => {
    const chatHistoryElement = chatHistoryRef.current
    if (chatHistoryElement) {
      chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight
    }
  }, [chatHistory])

  function handleSubmit() {
    // Don't accept an empty message from the user.
    if (textInput.trim() === '') return

    const newMessages: Message[] = [{author: 'user', text: textInput}]

    switch (states[stateIndex]) {
      case 'firstPrompt':
        newMessages.push({author: 'chatbot', text: 'Now please enter the second version of the text.'})
        break

      case 'secondPrompt':
        newMessages.push({author: 'chatbot', text: 'The two versions of the text differ in the following ways...'})
        newMessages.push({author: 'chatbot', text: 'Ready to go again? Please enter the first version of the text.'})
        break
    }

    setChatHistory([...chatHistory, ...newMessages]) // Add new messages to the chat history.
    setTextInput('') // Blank the text area.
    setStateIndex((stateIndex + 1) % states.length) // Keep track of where we're up to in the chat.
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
