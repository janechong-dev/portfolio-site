import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'

export default async function BlogPosts() {
  const allBlogs = await getBlogPosts()
  const formatMonthYear = (date: string) =>
    new Date(date.includes('T') ? date : `${date}T00:00:00`).toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    })

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 w-[100px] tabular-nums">
                {formatMonthYear(post.metadata.publishedAt)}
              </p>
              <p className="text-neutral-900 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
