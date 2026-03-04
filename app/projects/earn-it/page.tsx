import styles from './page.module.css'

export default function EarnItPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">Earn It</h1>
      <p className="text-neutral-800 mb-2">
        <strong>Turn daily effort into points and spend those points on self-defined rewards.</strong>
      </p>
      <p className="text-neutral-700 mb-4">
        Add an activity and points to earn points, create wish list items with a point cost, then click Buy when you have enough remaining points. Use the x buttons to remove entries, wish list items, or purchased items.
      </p>
      <section className={styles.shell}>
        <iframe src="/projects/earn-it/index.html" title="Earn It" className={styles.frame} />
      </section>
    </section>
  )
}
