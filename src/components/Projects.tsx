/*
  Projects
  --------
  A grid of blocks, one per project. Each block has a title, a short blurb,
  and some tags. Add or edit entries in the `projects` array below.
*/

type Project = {
  title: string
  description: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: 'Project Alpha',
    description: 'A short description of what this project does and why you built it.',
    tags: ['React', 'TypeScript'],
  },
  {
    title: 'Project Beta',
    description: 'Another project blurb. Swap this text for the real details later.',
    tags: ['C++', 'Embedded'],
  },
  {
    title: 'Project Gamma',
    description: 'Describe a cool thing you made — the problem, your approach, the result.',
    tags: ['Python', 'ML'],
  },
  {
    title: 'Project Delta',
    description: 'One more placeholder block so you can see the grid layout fill out.',
    tags: ['Hardware', 'FPGA'],
  },
]

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <h2 className="section-title">Projects</h2>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
