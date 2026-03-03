function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline mx-1"
      aria-hidden="true"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-16">
      <div className="mt-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 px-3 py-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Hiring for remote roles? Contact me:{' '}
          <ArrowIcon />
          <a
            className="underline underline-offset-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/janechongdev"
          >
            linkedin
          </a>
          <ArrowIcon />
          <a
            className="underline underline-offset-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/janechong-dev"
          >
            github
          </a>
          <ArrowIcon />
          <a
            className="underline underline-offset-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            href="mailto:janechong.dev@gmail.com"
          >
            email
          </a>
        </p>
      </div>
    </footer>
  )
}
