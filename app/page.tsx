import BlogPosts from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jane Chong
      </h1>
      <p className="mb-4">
        {`SF Software Engineer sharing AI learning journey`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
