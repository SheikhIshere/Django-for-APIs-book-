import React, { useState } from 'react'

export default function CreatePost({ apiBase, token, onCreated }){
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const headers = {'Content-Type':'application/json'}
      if(token) headers['Authorization'] = `Token ${token}`
      const res = await fetch(`${apiBase}/api/v1/posts/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, body })
      })
      const json = await res.json()
      if(res.ok){
        setSuccess('Post created.')
        setTitle(''); setBody('')
        if(onCreated) onCreated(json)
      } else {
        setError(JSON.stringify(json))
      }
    } catch (e) {
      setError(String(e))
    }
    setLoading(false)
  }

  return (
    <form onSubmit={submit}>
      <h3 style={{marginTop:0}}>Create Post</h3>
      <div className="form-row">
        <label className="small">Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} type="text" />
      </div>
      <div className="form-row">
        <label className="small">Body</label>
        <textarea value={body} onChange={e=>setBody(e.target.value)} />
      </div>

      <div style={{display:'flex', gap:8}}>
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create'}</button>
      </div>

      {success && <div style={{marginTop:10, color:'green'}}>{success}</div>}
      {error && <div style={{marginTop:10, color:'crimson'}}><strong>Error:</strong> <pre style={{whiteSpace:'pre-wrap'}}>{String(error)}</pre></div>}
    </form>
  )
}
