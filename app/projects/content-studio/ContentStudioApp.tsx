'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'

type Stage = 'inbox' | 'writing' | 'filming' | 'editing' | 'publishing'

type FieldValue = {
  text: string
  done: boolean
}

type StageData = Record<Stage, Record<string, FieldValue>>

type ProjectItem = {
  id: string
  title: string
  tags: string[]
  contentType: string
  dueDate: string
  status: Stage
  stageData: StageData
}

type FieldDefinition = {
  key: string
  label: string
  placeholder: string
}

const STORAGE_KEY = 'content_studio_projects_v1'

const STAGE_FLOW: Stage[] = ['inbox', 'writing', 'filming', 'editing', 'publishing']

const STAGE_LABELS: Record<Stage, string> = {
  inbox: 'Inbox',
  writing: 'Writing',
  filming: 'Filming',
  editing: 'Editing',
  publishing: 'Publishing',
}

const STAGE_FIELDS: Record<Stage, FieldDefinition[]> = {
  inbox: [
    { key: 'idea', label: 'Idea', placeholder: 'Content idea' },
    { key: 'is_it_useful', label: 'Is It Useful', placeholder: 'Why this helps the viewer' },
    { key: 'core_outcome', label: 'Core Outcome', placeholder: 'What result should viewer get' },
    { key: 'angle', label: 'Angle', placeholder: 'Your specific take' },
  ],
  writing: [
    { key: 'titles', label: 'Titles', placeholder: 'Possible titles' },
    { key: 'thumbnail', label: 'Thumbnail', placeholder: 'Thumbnail concept' },
    { key: 'opening_script', label: 'Opening Script', placeholder: 'First 15-30 seconds script' },
    { key: 'outline_rest', label: 'Outline The Rest', placeholder: 'Outline the remainder of the video' },
  ],
  filming: [
    { key: 'primary_shot', label: 'Primary Shot', placeholder: 'Main shot setup' },
    { key: 'b_roll_list', label: 'B-Roll List', placeholder: 'List of b-roll to capture' },
    { key: 'film', label: 'Film', placeholder: 'Recording notes / completion details' },
    {
      key: 'performance_check',
      label: 'Performance Check',
      placeholder: 'Delivery confidence, clarity, pacing check',
    },
  ],
  editing: [
    { key: 'cut', label: 'Cut', placeholder: 'Cut structure and notes' },
    { key: 'subtitles', label: 'Subtitles', placeholder: 'Subtitle completion notes' },
    { key: 'music', label: 'Music', placeholder: 'Music choices and levels' },
    {
      key: 'retention_check',
      label: 'Retention Check',
      placeholder: 'Retention audit for first 30-60 seconds and drop-offs',
    },
  ],
  publishing: [
    { key: 'description', label: 'Description', placeholder: 'Final video description' },
    { key: 'pinned_comments', label: 'Pinned Comments', placeholder: 'Pinned comment copy' },
    { key: 'test', label: 'Test', placeholder: 'Final pre-publish checks' },
    { key: 'review', label: 'Review', placeholder: 'Post-publish review plan' },
  ],
}

const TOTAL_FIELDS = Object.values(STAGE_FIELDS).reduce((sum, defs) => sum + defs.length, 0)

function emptyStageData(): StageData {
  const data = {} as StageData
  for (const stage of STAGE_FLOW) {
    data[stage] = {}
    for (const def of STAGE_FIELDS[stage]) {
      data[stage][def.key] = { text: '', done: false }
    }
  }
  return data
}

function sampleProjects(): ProjectItem[] {
  const writingStageData = emptyStageData()
  writingStageData.inbox.idea = {
    text: 'generic educational YouTube video with clear takeaway and simple structure',
    done: true,
  }
  writingStageData.inbox.is_it_useful = {
    text: 'gives viewers a repeatable framework they can apply right away',
    done: true,
  }
  writingStageData.inbox.core_outcome = {
    text: 'viewer leaves with one concrete action step',
    done: true,
  }
  writingStageData.inbox.angle = {
    text: 'simple explanation + practical examples + quick recap',
    done: true,
  }
  writingStageData.writing.titles = {
    text: 'how to make your first youtube video',
    done: true,
  }
  writingStageData.writing.thumbnail = {
    text: '',
    done: false,
  }
  writingStageData.writing.opening_script = {
    text: '',
    done: false,
  }
  writingStageData.writing.outline_rest = {
    text: '',
    done: false,
  }

  const publishingStageData = emptyStageData()
  publishingStageData.inbox.idea = {
    text: 'personal creator story: why i started YouTube despite low confidence',
    done: true,
  }
  publishingStageData.inbox.is_it_useful = {
    text: 'helps beginner creators push through perfectionism and start posting',
    done: true,
  }
  publishingStageData.inbox.core_outcome = {
    text: 'viewer understands a practical path to publish first videos consistently',
    done: true,
  }
  publishingStageData.inbox.angle = {
    text: 'honest turning points + concrete system for showing up weekly',
    done: true,
  }
  publishingStageData.writing.titles = { text: 'why i started youtube', done: true }
  publishingStageData.writing.thumbnail = {
    text: 'portrait + camera setup, text: "Why I Started"',
    done: true,
  }
  publishingStageData.writing.opening_script = {
    text: 'I avoided posting for years. This is why I finally started YouTube and the exact process that kept me consistent.',
    done: true,
  }
  publishingStageData.writing.outline_rest = {
    text: 'fear phase\nfirst uploads\nwhat improved\nmistakes\nframework to start',
    done: true,
  }
  publishingStageData.filming.primary_shot = {
    text: 'A-cam desk shot with soft key light and practical background',
    done: true,
  }
  publishingStageData.filming.b_roll_list = {
    text: 'old drafts, first upload screen, notebook planning shots',
    done: true,
  }
  publishingStageData.filming.film = {
    text: 'recorded full A-roll in 3 takes + capture for b-roll inserts',
    done: true,
  }
  publishingStageData.filming.performance_check = {
    text: 'trimmed filler words and increased pacing in key sections',
    done: true,
  }
  publishingStageData.editing.cut = {
    text: 'tightened intro to 25s and removed repeated points',
    done: true,
  }
  publishingStageData.editing.subtitles = {
    text: 'captions reviewed and corrected for names/terms',
    done: true,
  }
  publishingStageData.editing.music = {
    text: 'light lo-fi bed at -28 LUFS under voice',
    done: true,
  }
  publishingStageData.editing.retention_check = {
    text: 'kept visual change every 6-10s in first minute',
    done: true,
  }
  publishingStageData.publishing.description = {
    text: 'An honest look at why I started creating videos and what changed after taking the first step.',
    done: true,
  }
  publishingStageData.publishing.pinned_comments = {
    text: 'If you are starting this week, reply with your channel topic and first upload date.',
    done: true,
  }
  publishingStageData.publishing.test = {
    text: 'checked playback, links, end screen, and mobile subtitle readability',
    done: true,
  }
  publishingStageData.publishing.review = {
    text: 'review CTR + first 30s retention after 24 hours and iterate title/thumbnail if needed',
    done: true,
  }

  return [
    {
      id: 'seed-1',
      title: 'how to make your first youtube video',
      tags: ['youtube'],
      contentType: 'long-form',
      dueDate: '2026-04-01',
      status: 'writing',
      stageData: writingStageData,
    },
    {
      id: 'seed-2',
      title: 'why i started youtube',
      tags: ['creator'],
      contentType: 'long-form',
      dueDate: '2026-04-08',
      status: 'publishing',
      stageData: publishingStageData,
    },
  ]
}

function stageComplete(project: ProjectItem, stage: Stage) {
  return STAGE_FIELDS[stage].every((def) => project.stageData[stage][def.key]?.done)
}

function nextStage(stage: Stage): Stage | null {
  const idx = STAGE_FLOW.indexOf(stage)
  if (idx < 0 || idx === STAGE_FLOW.length - 1) return null
  return STAGE_FLOW[idx + 1]
}

function completion(project: ProjectItem) {
  let completed = 0
  for (const stage of STAGE_FLOW) {
    for (const def of STAGE_FIELDS[stage]) {
      if (project.stageData[stage][def.key]?.done) completed += 1
    }
  }

  return {
    completed,
    total: TOTAL_FIELDS,
    percent: Math.round((completed / TOTAL_FIELDS) * 100),
  }
}

export default function ContentStudioApp() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [currentId, setCurrentId] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [saveState, setSaveState] = useState('Loading...')
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTags, setNewTags] = useState('')
  const [newType, setNewType] = useState('short')
  const [newDueDate, setNewDueDate] = useState('')

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? (JSON.parse(raw) as ProjectItem[]) : []
      const base = parsed.length ? parsed : sampleProjects()
      setProjects(base)
      setCurrentId(base[0]?.id || '')
      setSaveState('Ready')
    } catch {
      const base = sampleProjects()
      setProjects(base)
      setCurrentId(base[0]?.id || '')
      setSaveState('Loaded fallback data')
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
      setSaveState('Saved locally')
    } catch {
      setSaveState('Could not persist locally')
    }
  }, [projects, hydrated])

  const current = useMemo(
    () => projects.find((project) => project.id === currentId) || null,
    [projects, currentId]
  )

  function updateProject(mutator: (project: ProjectItem) => ProjectItem) {
    setProjects((prev) => prev.map((item) => (item.id === currentId ? mutator(item) : item)))
  }

  function setMeta<K extends keyof ProjectItem>(key: K, value: ProjectItem[K]) {
    if (!current) return
    updateProject((project) => ({ ...project, [key]: value }))
  }

  function setFieldText(stage: Stage, key: string, text: string) {
    if (!current) return
    updateProject((project) => ({
      ...project,
      stageData: {
        ...project.stageData,
        [stage]: {
          ...project.stageData[stage],
          [key]: {
            ...project.stageData[stage][key],
            text,
          },
        },
      },
    }))
    setSaveState('Unsaved changes...')
  }

  function toggleComplete(stage: Stage, key: string) {
    if (!current) return
    const field = current.stageData[stage][key]

    if (!field.done && !field.text.trim()) {
      setSaveState('Add text before marking complete')
      return
    }

    updateProject((project) => {
      const nextProject = {
        ...project,
        stageData: {
          ...project.stageData,
          [stage]: {
            ...project.stageData[stage],
            [key]: {
              ...project.stageData[stage][key],
              done: !project.stageData[stage][key].done,
            },
          },
        },
      }

      if (stageComplete(nextProject, stage)) {
        const next = nextStage(stage)
        if (next) {
          nextProject.status = next
        }
      }

      return nextProject
    })
  }

  function createProject() {
    const trimmed = newTitle.trim()
    if (!trimmed) return

    const created: ProjectItem = {
      id: `p-${Date.now()}`,
      title: trimmed,
      tags: newTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      contentType: newType,
      dueDate: newDueDate,
      status: 'inbox',
      stageData: emptyStageData(),
    }

    setProjects((prev) => [created, ...prev])
    setCurrentId(created.id)
    setShowNew(false)
    setNewTitle('')
    setNewTags('')
    setNewType('short')
    setNewDueDate('')
  }

  if (!current) {
    return (
      <section className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brand}>Content Studio</div>
          <button type="button" className={styles.newBtn} onClick={() => setShowNew((v) => !v)}>
            New
          </button>
        </header>
        <div className={styles.emptyState}>No project selected.</div>
      </section>
    )
  }

  const currentIndex = STAGE_FLOW.indexOf(current.status)
  const stats = completion(current)

  return (
    <section className={styles.shell}>
      <div className={`${styles.bgShape} ${styles.bgOne}`} />
      <div className={`${styles.bgShape} ${styles.bgTwo}`} />

      <header className={styles.topbar}>
        <div className={styles.brand}>Content Studio</div>
        <button type="button" className={styles.newBtn} onClick={() => setShowNew((v) => !v)}>
          New
        </button>
      </header>

      {showNew ? (
        <div className={styles.newRow}>
          <input
            className={styles.metaInput}
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="Topic"
          />
          <input
            className={styles.metaInput}
            value={newTags}
            onChange={(event) => setNewTags(event.target.value)}
            placeholder="tags: writing, social"
          />
          <select
            className={styles.metaSelect}
            value={newType}
            onChange={(event) => setNewType(event.target.value)}
          >
            <option value="short">Short</option>
            <option value="long-form">Long-form</option>
            <option value="podcast_clip">Podcast Clip</option>
            <option value="tutorial">Tutorial</option>
            <option value="vlog">Vlog</option>
          </select>
          <input
            className={styles.metaInput}
            type="date"
            value={newDueDate}
            onChange={(event) => setNewDueDate(event.target.value)}
          />
          <button type="button" className={styles.updateBtn} onClick={createProject}>
            Create
          </button>
        </div>
      ) : null}

      <main className={styles.layout}>
        <section className={`${styles.panel} ${styles.boardPanel}`}>
          <h2 className={styles.heading}>Workflow Board</h2>
          <div className={styles.boardGrid}>
            {STAGE_FLOW.map((stage) => {
              const stageProjects = projects.filter((project) => project.status === stage)

              return (
                <div key={stage} className={styles.stageBox}>
                  <div className={styles.stageHead}>{STAGE_LABELS[stage]}</div>
                  <div className={styles.stageList}>
                    {stageProjects.map((project) => {
                      const projectStats = completion(project)
                      const active = project.id === current.id

                      return (
                        <button
                          key={project.id}
                          type="button"
                          className={`${styles.cardItem} ${active ? styles.active : ''}`}
                          onClick={() => setCurrentId(project.id)}
                        >
                          <p className={styles.cardTitle}>{project.title}</p>
                          <div className={styles.cardCats}>
                            <span className={styles.badge}>{project.contentType || 'short'}</span>
                            {project.dueDate ? <span className={styles.date}>{project.dueDate}</span> : null}
                            {project.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className={styles.date}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className={styles.progressRow}>
                            <div className={styles.progressTrack}>
                              <div className={styles.progressFill} style={{ width: `${projectStats.percent}%` }} />
                            </div>
                            <span className={styles.progressNum}>{projectStats.percent}%</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className={`${styles.panel} ${styles.editorPanel}`}>
          <div className={styles.editorMeta}>
            <input
              className={styles.metaInput}
              value={current.title}
              onChange={(event) => setMeta('title', event.target.value)}
            />
            <input
              className={styles.metaInput}
              value={current.tags.join(', ')}
              onChange={(event) =>
                setMeta(
                  'tags',
                  event.target.value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                )
              }
            />
            <select
              className={styles.metaSelect}
              value={current.contentType}
              onChange={(event) => setMeta('contentType', event.target.value)}
            >
              <option value="short">Short</option>
              <option value="long-form">Long-form</option>
              <option value="podcast_clip">Podcast Clip</option>
              <option value="tutorial">Tutorial</option>
              <option value="vlog">Vlog</option>
            </select>
            <input
              className={styles.metaInput}
              type="date"
              value={current.dueDate}
              onChange={(event) => setMeta('dueDate', event.target.value)}
            />
            <button type="button" className={styles.updateBtn} onClick={() => setSaveState('Saved locally')}>
              Update
            </button>
          </div>

          <div className={styles.stageEditorHead}>
            <div className={styles.stageEditorTitle}>
              {STAGE_LABELS[current.status]} Stage Fields • {stats.completed}/{stats.total} complete ({stats.percent}%)
            </div>
            <div className={styles.stageEditorHint}>
              Use the Complete button in each field. Fill text first, then mark complete.
            </div>
          </div>

          <div className={styles.noteBoxes}>
            {STAGE_FLOW.slice(0, currentIndex + 1).map((stage) => (
              <div key={stage} className={styles.stageSection}>
                <div className={styles.stageSubhead}>
                  {STAGE_LABELS[stage]} {stage === current.status ? '(Current)' : '(Completed)'}
                </div>
                <div className={styles.stageFieldsGrid}>
                  {STAGE_FIELDS[stage].map((field) => {
                    const fieldState = current.stageData[stage][field.key]
                    return (
                      <article key={field.key} className={styles.noteBox}>
                        <div className={styles.fieldHead}>
                          <span className={styles.label}>{field.label}</span>
                          <button
                            type="button"
                            className={`${styles.completeBtn} ${fieldState.done ? styles.done : ''}`}
                            onClick={() => toggleComplete(stage, field.key)}
                          >
                            {fieldState.done ? 'Update' : 'Complete'}
                          </button>
                        </div>
                        <textarea
                          className={styles.readonlyArea}
                          placeholder={field.placeholder}
                          value={fieldState.text}
                          onChange={(event) => setFieldText(stage, field.key, event.target.value)}
                        />
                      </article>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.saveState}>{saveState}</div>
        </section>
      </main>
    </section>
  )
}
