import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import './Home.css'

// The Home page just stacks the three sections in order. Each section is its
// own component (see ../components), which keeps this file easy to read.
export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Experience />
      <Projects />
    </div>
  )
}
