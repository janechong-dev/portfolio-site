import Projects from 'app/components/projects'

export const metadata = {
  title: 'Projects',
  description: 'My projects',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">Projects</h1>
      <p className="text-neutral-700 mb-5">
        Building 26 tools (A-Z) to solve everyday problems.
        <br />
        3 hackathon wins 🏆 2 with active customers 👤 1 revenue-generating 💵
      </p>
      <Projects />
    </section>
  )
}
