import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componetes/Navbar'
import { Allroutes } from './componetes/Allroutes'
import Footer from './componetes/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Allroutes />
      <Footer />

    </>
  )
}

export default App
