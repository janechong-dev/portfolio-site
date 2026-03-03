'use client'

import Link from 'next/link'
import { useState } from 'react'
import { letterProjects, type ProjectHighlight } from 'app/projects/data'

export default function Projects() {
  const emojiMap = {
    winner: '🏆',
    customers: '👤',
  } as const satisfies Record<ProjectHighlight, string>

  const getEmojiSuffix = (highlights?: ProjectHighlight[]) =>
    (highlights || []).map((tag) => emojiMap[tag]).join('')

  const renderStylizedTitle = (title: string) => (
    <>
      <span className="font-bold">{title.slice(0, 1)}</span>
      {title.slice(1)}
    </>
  )

  const [view, setView] = useState<'list' | 'cards'>('cards')
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const projectByLetter = new Map(
    letterProjects.map((project) => [project.letter.toUpperCase(), project])
  )
  const sharedWidthClass = 'mx-auto w-full max-w-[560px]'

  return (
    <div>
      <div className="flex gap-2 mb-5 justify-center">
        <button
          type="button"
          onClick={() => setView('cards')}
          className={`text-sm rounded-full border px-3 py-1 ${
            view === 'cards'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300'
          }`}
        >
          Cards
        </button>
        <button
          type="button"
          onClick={() => setView('list')}
          className={`text-sm rounded-full border px-3 py-1 ${
            view === 'list'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300'
          }`}
        >
          List
        </button>
      </div>

      {view === 'list' ? (
        <div className={sharedWidthClass}>
          {alphabet.map((letter) => {
            const project = projectByLetter.get(letter)
            const isLive = project?.status === 'live'

            const row = isLive && project ? (
              <p className="text-neutral-900 tracking-tight">
                {renderStylizedTitle(project.title)}{' '}
                <span className="text-sm text-neutral-600">
                  - {project.blurb} {getEmojiSuffix(project.highlights)}
                </span>
              </p>
            ) : (
              <p className="text-neutral-600 tracking-tight">{letter}</p>
            )

            if (isLive && project) {
              return (
                <Link
                  key={letter}
                  className="flex flex-col space-y-0.5 mb-2.5"
                  href={`/projects/${project.slug}`}
                >
                  {row}
                </Link>
              )
            }

            return (
              <div key={letter} className="flex flex-col space-y-0.5 mb-2.5">
                {row}
              </div>
            )
          })}
        </div>
      ) : (
        <div className={`${sharedWidthClass} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
          {alphabet.map((letter) => {
            const project = projectByLetter.get(letter)
            const isLive = project?.status === 'live'
            const href = project ? project.liveUrl || `/projects/${project.slug}` : ''
            const isExternal = href.startsWith('http://') || href.startsWith('https://')

            const cardBody = (
              <>
                {project?.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[16/9] object-cover rounded-sm mb-1"
                  />
                ) : (
                  <div className="w-full aspect-[16/9] rounded-sm mb-1 bg-neutral-300" />
                )}
                {isLive && project ? (
                  <div className="leading-tight">
                    <p className="text-neutral-900">
                      {renderStylizedTitle(project.title)}
                    </p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      {project.blurb} {getEmojiSuffix(project.highlights)}
                    </p>
                  </div>
                ) : (
                  <p className="tracking-tight text-neutral-500">
                    {letter}
                  </p>
                )}
              </>
            )

            if (isLive && project) {
              if (isExternal) {
                return (
                  <a
                    key={letter}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-neutral-200 p-1 hover:shadow-sm transition-all"
                  >
                    {cardBody}
                  </a>
                )
              }

              return (
                <Link
                  key={letter}
                  href={href}
                  className="rounded-md border border-neutral-200 p-1 hover:shadow-sm transition-all"
                >
                  {cardBody}
                </Link>
              )
            }

            return (
              <div
                key={letter}
                className="rounded-md border border-neutral-200 p-1"
              >
                {cardBody}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
