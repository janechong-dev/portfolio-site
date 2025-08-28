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
  },
]
const fact = 'My official name is Ching Chong (yes, really). Coincidentally my hobbies are ping pong and sing song 🎤🏓.'
const seeking = 'Remote full time roles, AI consulting opportunities'

export default function Page() {
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
        <h2 className="mb-2 font-semibold">Fun Fact</h2>
        {fact}
      </div>

      <div className="my-8">
        <h2 className="mb-2 font-semibold">Open To</h2>
        {seeking}
      </div>
    </section>
  )
}
