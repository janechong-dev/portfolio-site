import { notFound } from 'next/navigation'
import { formatProjectTitleWithBadges, letterProjects } from 'app/projects/data'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  return letterProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = letterProjects.find((p) => p.slug === params.slug.toLowerCase())
  if (!project) return

  const ogImage = project.image
    ? project.image.startsWith('http')
      ? project.image
      : `${baseUrl}${project.image}`
    : `${baseUrl}/og?title=${encodeURIComponent(project.title)}`

  const decoratedTitle = formatProjectTitleWithBadges(project)

  return {
    title: decoratedTitle,
    description: project.summary,
    openGraph: {
      title: decoratedTitle,
      description: project.summary,
      type: 'article',
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: decoratedTitle,
      description: project.summary,
      images: [ogImage],
    },
  }
}

export default function Project({ params }: { params: { slug: string } }) {
  const project = letterProjects.find((p) => p.slug === params.slug.toLowerCase())
  if (!project) notFound()

  const ogImage = project.image
    ? project.image.startsWith('http')
      ? project.image
      : `${baseUrl}${project.image}`
    : `${baseUrl}/og?title=${encodeURIComponent(project.title)}`

  const decoratedTitle = formatProjectTitleWithBadges(project)

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: decoratedTitle,
            description: project.summary,
            image: ogImage,
            url: `${baseUrl}/projects/${project.slug}`,
            author: {
              '@type': 'Person',
              name: 'Jane Chong',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">{decoratedTitle}</h1>
      <div className="mt-4 space-y-4">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800" />
        ) : null}
        <p className="text-neutral-700 dark:text-neutral-300">{project.summary}</p>
        <div>
          <h2 className="font-semibold tracking-tight mb-2">What I Built</h2>
          <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300">
            {project.whatBuilt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold tracking-tight mb-2">Impact</h2>
          <p className="text-neutral-700 dark:text-neutral-300">{project.impact}</p>
        </div>
        <div>
          <h2 className="font-semibold tracking-tight mb-2">What I&apos;d Improve</h2>
          <p className="text-neutral-700 dark:text-neutral-300">{project.next}</p>
        </div>
      </div>
    </section>
  )
}
