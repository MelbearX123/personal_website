import { useState } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import { Hero, About, Work, SelectedWork, Contact } from './sections/Sections'

/*
  The whole site is a single page. The nav links are in-page anchors, so
  clicking one glides the viewport to that section (smooth scroll lives in
  index.css). On first load we show the boot Loader; when it finishes it flips
  `booted` and the real page is revealed underneath.
*/
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
