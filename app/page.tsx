import Image from 'next/image'
import Link from 'next/link'

const experienceLogos = [
  { src: '/assets/home/amazon.png', alt: 'Amazon' },
  { src: '/assets/home/capital-one.png', alt: 'Capital One' },
  { src: '/assets/home/fidelity.png', alt: 'Fidelity' },
  { src: '/assets/home/mlh.png', alt: 'Major League Hacking' },
]

const educationLogos = [
  { src: '/assets/home/upenn.png', alt: 'University of Pennsylvania' },
  { src: '/assets/home/uq.png', alt: 'University of Queensland' },
]

export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8">
        <Image
          src="/assets/home/portrait.png"
          alt="Jane Chong portrait"
          width={112}
          height={112}
          className="rounded-full"
          priority
        />
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">Jane Chong</h1>
          <p className="text-neutral-700 dark:text-neutral-300 mt-1">
            Currently a SDE @ Amazon
          </p>
        </div>
      </div>

      <div className="mb-8 space-y-1 text-neutral-700 dark:text-neutral-300">
        <p>
          Technical, yet business and design savvy{' '}
          <Link
            href="/projects"
            className="font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            (<span>↗ </span>
            <span className="underline underline-offset-2">projects</span>)
          </Link>
        </p>
        <p>
          {'AI-native and curious '}
          <Link
            href="/blog"
            className="font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            (<span>↗ </span>
            <span className="underline underline-offset-2">blog</span>)
          </Link>
        </p>
      </div>

      <div className="my-8">
        <h2 className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">Experience</h2>
        <div className="flex flex-wrap items-center gap-4 mb-2">
          {experienceLogos.map((logo) => (
            <div
              key={logo.alt}
              className="h-10 px-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>
        <h2 className="mb-2 mt-6 text-sm text-neutral-600 dark:text-neutral-400">Education</h2>
        <div className="flex flex-wrap items-center gap-4 mb-2">
          {educationLogos.map((logo) => (
            <div
              key={logo.alt}
              className="h-10 px-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
