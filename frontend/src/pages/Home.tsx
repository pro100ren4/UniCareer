import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
  const [text, setText] = useState() 
  const getText = async () => {
    const resp = await axios.get("/api/")
    setText(resp.data)
  }

  useEffect(() => {
    getText()
  }, [])

  return (
    <div>
      { text }
    </div>
  )
}

export default Home
