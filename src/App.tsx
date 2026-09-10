import { useState } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import { Hero, About, Work, SelectedWork, Contact } from './sections/Sections'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && <Loader onDone={() => setBooted(true)} />}
      <Nav />
      <main className={`page ${booted ? 'page--in' : ''}`}>
        <Hero />
        <About />
        <Work />
        <SelectedWork />
        <Contact />
      </main>
    </>
  )
}
