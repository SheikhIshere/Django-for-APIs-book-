import React from 'react'

export default function PostList({ posts = [], onOpen, loading }){
  if(loading) return <div className="small">Loading posts...</div>
  if(!posts || posts.length === 0) return <div className="small">No posts yet.</div>
  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      {posts.map(p => (
        <div key={p.id} className="post-item" onClick={() => onOpen(p.id)}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:600}}>{p.title}</div>
            <div className="small">{p.author ? p.author.username || p.author : '—'}</div>
          </div>
          <div className="small" style={{marginTop:6, color:'#475569'}}>
            {p.body ? (p.body.length > 120 ? p.body.slice(0,120) + '...' : p.body) : ''}
          </div>
        </div>
      ))}
    </div>
  )
}
