/*!
 * Copyright © 2025 Kirk Jackson
 * Licensed under the GNU Affero General Public License
 */

import { useState } from 'react'
import './App.css'
import ChatBubble from './ChatBubble'

function App() {
  const [textInput, setTextInput] = useState('')
  const [chatHistory, setChatHistory] = useState(['aaa', 'bbb', 'ccc'])

  function handleSubmit() {
    // Don't accept an empty prompt.
    if (textInput.trim() === '') return;

    setChatHistory([...chatHistory, textInput])
    setTextInput('')
  }

  return (
    <>
      <header>
        <h1>Redliner</h1>
        Highlight text differences
      </header>
      <main>
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
