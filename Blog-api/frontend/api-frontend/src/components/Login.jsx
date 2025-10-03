import React, { useState } from 'react'

export default function Login({ apiBase, onLogin }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiBase}/api/v1/rest-auth/login/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ username, password })
      })
      const json = await res.json()
      // try common token fields
      const token = json.key || json.token || json.access || json.access_token || json.auth_token
      if(token){
        onLogin(token)
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
      <h3 style={{marginTop:0}}>Login</h3>
      <div className="form-row">
        <label className="small">Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} type="text" />
      </div>
      <div className="form-row">
        <label className="small">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      </div>

      <div style={{display:'flex', gap:8}}>
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
      </div>

      {error && <div style={{marginTop:10, color:'crimson'}}><strong>Error:</strong> <pre style={{whiteSpace:'pre-wrap'}}>{String(error)}</pre></div>}
    </form>
  )
}
