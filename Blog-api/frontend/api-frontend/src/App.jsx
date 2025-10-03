import React, { useEffect, useState } from 'react'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import Login from './components/Login'
import CreatePost from './components/CreatePost'

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || ''

export default function App(){
  const [page, setPage] = useState('list') // list, detail, create, login
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('api_token') || '')

  useEffect(()=> {
    fetchPosts()
  }, [])

  async function fetchPosts(){
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/v1/posts/`)
      const json = await res.json()
      setPosts(Array.isArray(json) ? json : (json.results || []))
    } catch (e) {
      console.error('Failed to fetch posts', e)
    }
    setLoading(false)
  }

  async function openPost(id){
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/v1/posts/${id}/`)
      const json = await res.json()
      setSelectedPost(json)
      setPage('detail')
    } catch(e){ console.error(e) }
    setLoading(false)
  }

  function onLogin(tokenValue){
    setToken(tokenValue)
    localStorage.setItem('api_token', tokenValue)
    setPage('list')
  }

  function onLogout(){
    setToken('')
    localStorage.removeItem('api_token')
  }

  async function onCreated(){
    // refresh posts and show list
    await fetchPosts()
    setPage('list')
  }

  return (
    <div className="app">
      <div className="header">
        <div className="brand">Simple Blog</div>
        <div className="actions">
          <div className="small">API: <span className="small">{API_BASE || 'same origin'}</span></div>
          {token ? (
            <>
              <button className="btn secondary" onClick={()=> setPage('create')}>New Post</button>
              <button className="btn" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button className="btn" onClick={()=> setPage('login')}>Login</button>
          )}
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <h3 style={{marginTop:0}}>Posts</h3>
          <div style={{marginTop:12}}>
            <PostList posts={posts} onOpen={openPost} loading={loading} />
          </div>
        </div>

        <div>
          <div className="card" style={{minHeight:200}}>
            {page === 'detail' && selectedPost && (
              <PostDetail post={selectedPost} />
            )}

            {page === 'create' && (
              <CreatePost apiBase={API_BASE} token={token} onCreated={onCreated} />
            )}

            {page === 'login' && (
              <Login apiBase={API_BASE} onLogin={onLogin} />
            )}

            {page === 'list' && (
              <div>
                <h3 style={{marginTop:0}}>Welcome</h3>
                <p className="small">Select a post on the left to view details. Use Login to create posts.</p>
              </div>
            )}
          </div>

          <div style={{height:12}} />
          <div className="card small">
            <div><strong>Notes</strong></div>
            <ul>
              <li>The app expects your Django API endpoints under <code>/api/v1/</code>.</li>
              <li>Login posts to <code>/api/v1/rest-auth/login/</code> and expects a token in the response.</li>
              <li>If CORS blocks fetches, add `django-cors-headers` to Django and allow localhost during development.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer">Built quickly — tell me what UI polish you'd like next (fonts, layout, dark mode).</div>
    </div>
  )
}
