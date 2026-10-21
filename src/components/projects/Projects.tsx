import type { ComponentType } from 'react'
import { PROJECTS, type ProjectId } from '../../content'
import { trackNumber } from '../../lib/format'
import ChromaPreview from './ChromaPreview'
import CursorPreview from './CursorPreview'
import LampPreview from './LampPreview'
import RoutePreview from './RoutePreview'
import './Projects.css'

const PREVIEWS: Record<ProjectId, ComponentType> = {
  lamp: LampPreview,
  chromaforge: ChromaPreview,
  handcursorx: CursorPreview,
  digivolve: RoutePreview,
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="section-head">
        <h2 className="heading">Selected work</h2>
        <span className="mono">{PROJECTS.length} releases</span>
      </div>

      <div className="projects__grid">
        {PROJECTS.map((project, i) => {
          const Preview = PREVIEWS[project.id]
          return (
            <a key={project.id} className="card" href={project.href} target="_blank" rel="noreferrer">
              <div className="card__art" aria-hidden="true">
                <Preview />
                <span className="card__volume">vol.{trackNumber(i)}</span>
              </div>
              <div className="card__body">
                <h3 className="card__title">{project.title}</h3>
                <p className="card__summary">{project.summary}</p>
                <div className="card__meta">
                  <span>{project.stack.join(' · ')}</span>
                  <span className="card__link">github ↗</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
