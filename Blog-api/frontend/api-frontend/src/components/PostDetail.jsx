import React from 'react'

export default function PostDetail({ post }){
  if(!post) return null
  return (
    <div>
      <h2 style={{marginTop:0}}>{post.title}</h2>
      <div className="small">By: {post.author ? (post.author.username || post.author) : '—'}</div>
      <div style={{marginTop:12, whiteSpace:'pre-wrap'}}>{post.body}</div>
    </div>
  )
}
