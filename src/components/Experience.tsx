/*
  Experience
  ----------
  A simple "menu" of places you've worked. Edit the `jobs` array to update it —
  the markup rebuilds itself from the data, so you never touch the layout.
*/

type Job = {
  company: string
  role: string
  period: string
}

const jobs: Job[] = [
  { company: 'Company One', role: 'Software Engineer Intern', period: '2025' },
  { company: 'Company Two', role: 'Firmware Intern', period: '2024' },
  { company: 'Company Three', role: 'Web Developer', period: '2023' },
]

export default function Experience() {
  return (
    // The full-width band carries the dark background; the inner .section keeps
    // the content centered. `id` lets the hero's "scroll" link jump here.
    <section className="experience-band" id="experience">
      <div className="section">
        <h2 className="section-title">Previous Roles</h2>

        <ul className="role-list">
          {jobs.map((job) => (
            // Each role is its own block.
            <li className="role-block" key={job.company}>
              <span className="job-company">{job.company}</span>
              <span className="job-role">{job.role}</span>
              <span className="job-period">{job.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
