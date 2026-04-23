import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// Edit flow
function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/posts/${id}`)
        if (!res.ok) {
          throw new Error('Failed to load post')
        }

        const data = await res.json()
        setPost(data)
      } catch (err) {
        setError(err.message || 'Error loading post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  // Submit updated post
  async function handleSubmit(values) {
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        throw new Error('Failed to update post')
      }

      await res.json()

      navigate(`/posts/${id}`)
    } catch (err) {
      setError(err.message || 'Error updating post')
      setSubmitting(false)
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>
  if (error && !post) return <p className="status-msg error">{error}</p>
  if (!post) return <p className="status-msg">Post not found.</p>

  return (
    <div>
      <h1 className="page-title">Edit post</h1>
      {error && <p className="status-msg error">{error}</p>}

      <PostForm
        key={post._id}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

export default EditPostPage
