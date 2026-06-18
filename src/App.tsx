import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Music from './pages/Music'
import Resume from './pages/Resume'

// App is the root component — think of it like Angular's AppComponent.
// In Angular, a component is a class with a separate .html template.
// In React, a component is just a function that RETURNS the markup (JSX).
// The markup lives in the same file, which is the biggest mental shift
// coming from Angular.
export default function App() {
  return (
    <div>
      {/* The Header shows on every page because it lives outside <Routes>. */}
      <Header />

      {/*
        <Routes> is the React equivalent of Angular's <router-outlet>.
        Each <Route> maps a URL path to the component to show there.
        Only the route matching the current URL renders.
      */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/music" element={<Music />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
    </div>
  )
}
