import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/redline`)
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [])

  return (
    <>
      <h1>Redliner</h1>
      <p>{data || "Loading..."}</p>
    </>
  )
}

export default App
