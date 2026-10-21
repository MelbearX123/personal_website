import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Nav from './components/Nav'
import Hero from './components/hero/Hero'
import Projects from './components/projects/Projects'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Contact />
    </>
  )
}
