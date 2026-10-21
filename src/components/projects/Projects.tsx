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
          // Links can't nest, so the card isn't one big <a>: the art is a mouse-only
          // shortcut to the source, the title link stretches over the body, and the
          // optional demo link sits above that.
          return (
            <article key={project.id} className="card">
              <a className="card__art" href={project.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                <Preview />
                <span className="card__volume">vol.{trackNumber(i)}</span>
              </a>
              <div className="card__body">
                <h3 className="card__title">
                  <a className="card__source" href={project.href} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="card__summary">{project.summary}</p>
                <div className="card__meta">
                  <span>{project.stack.join(' · ')}</span>
                  <span className="card__links">
                    {project.demo && (
                      <a className="card__demo" href={project.demo} target="_blank" rel="noreferrer">
                        link ↗
                      </a>
                    )}
                    <span aria-hidden="true">github ↗</span>
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
