import Link from 'next/link'
import { getProjects } from 'app/projects/utils'
import { getBlogPosts } from 'app/blog/utils'

const summary = "SF based SWE who enjoys experimenting with AI and bringing ideas to life. This site is my sandbox of ideas, projects, and learnings."
const experiences = [
  {
    date: 'Present',
    role: 'SWE @ Capital One',
  },
  {
    date: 'Previous',
    role: 'SWE Intern @ Fidelity, Amazon, MLH',
  },
  {
    date: 'Education',
    role: 'CS @ UPenn, Econ @ UQ (Australia 🦘)',
  }
]

export default async function Page() {
  const [allProjects, allBlogs] = await Promise.all([
    getProjects(),
    getBlogPosts()
  ])

  const latestProject = allProjects.sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )[0]

  const latestBlog = allBlogs.sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )[0]

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jane Chong
      </h1>
      <p className="mb-4">
        {summary}
      </p>
      
      <div className="my-8">
        <h2 className="mb-2 font-semibold">Experiences</h2>
        {experiences.map((exp, idx) => (
          <div key={idx} className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mb-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {exp.date}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {exp.role}
            </p>
          </div>
        ))}
      </div>

      <div className="my-8">
        <h2 className="mb-2 font-semibold">Latest Project</h2>
        {latestProject && (
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mb-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {latestProject.metadata.publishedAt.split('-')[0]}
            </p>
            <Link 
              href={`/projects/${latestProject.slug}`}
              className="text-neutral-900 dark:text-neutral-100 tracking-tight hover:underline"
            >
              {latestProject.metadata.title}
            </Link>
          </div>
        )}
      </div>

      <div className="my-8">
        <h2 className="mb-2 font-semibold">Latest Blog</h2>
        {latestBlog && (
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 mb-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {latestBlog.metadata.publishedAt.split('-')[0]}
            </p>
            <Link 
              href={`/blog/${latestBlog.slug}`}
              className="text-neutral-900 dark:text-neutral-100 tracking-tight hover:underline"
            >
              {latestBlog.metadata.title}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
