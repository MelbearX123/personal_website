import { HOBBIES } from '../content'
import { trackNumber } from '../lib/format'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <article className="panel about__intro">
        <div className="panel__bar">
          <span>about_me.txt</span>
          <span className="about__lights" aria-hidden="true">
            <span /><span /><span />
          </span>
        </div>
        <div className="about__body">
          <h2 className="heading">About me</h2>
          <p className="about__lead">
            I'm a computer engineering student at the University of Waterloo. I like building software that makes
            people's lives easier and more fun. Currently interested and dabbling in computer vision.
          </p>
          <p className="mono">
            BASc Computer Engineering · Honours
            <br />
            3× Excellent Standing
          </p>
        </div>
      </article>

      <aside className="panel about__hobbies" aria-label="Hobbies">
        <div className="panel__bar">off_hours.m3u</div>
        <ol className="playlist">
          {HOBBIES.map((hobby, i) => (
            <li key={hobby}>
              <span className="playlist__number">{trackNumber(i)}</span>
              {hobby}
            </li>
          ))}
        </ol>
      </aside>
    </section>
  )
}
