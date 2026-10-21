import { EXPERIENCE } from '../content'
import { trackNumber } from '../lib/format'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section-head">
        <h2 className="heading">Experience</h2>
        <span className="mono">tracklist · side A</span>
      </div>

      <ol className="panel tracklist">
        {EXPERIENCE.map((item, i) => (
          <li key={item.title} className="track">
            <span className="track__number">{trackNumber(i)}</span>
            <div className="track__body">
              <h3 className="track__title">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">{item.title}</a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="track__summary">{item.summary}</p>
            </div>
            <span className="mono">{item.dates}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
