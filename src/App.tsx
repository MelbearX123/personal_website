import About from './components/About'
import Experience from './components/Experience'
import Nav from './components/Nav'
import Hero from './components/hero/Hero'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
      </main>
    </>
  )
}
