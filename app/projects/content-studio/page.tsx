import ContentStudioApp from './ContentStudioApp'

export const metadata = {
  title: 'Content Studio',
  description: 'Interactive Content Studio workflow app.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">Content Studio</h1>
      <p className="text-neutral-800 mb-2">
        <strong>Plan, produce, and publish video ideas with a clear stage-by-stage workflow.</strong>
      </p>
      <p className="text-neutral-700 mb-4">
        Select a sample project (or click New), fill in each field for the current stage, then click Update on a field to mark it complete. When all fields in a stage are complete, the project advances to the next stage automatically.
      </p>
      <ContentStudioApp />
    </section>
  )
}
