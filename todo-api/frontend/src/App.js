import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/');
      setTodos(res.data || []);
    } catch (err) {
      setError('Failed to load todos. Is the API running at http://127.0.0.1:8000/api/?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = todos.filter(t =>
    (t.title || '').toLowerCase().includes(query.toLowerCase()) ||
    (t.body || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app-root">
      <style>{`
        :root{--bg:#eaf6ff;--card:#ffffff;--accent:#1890ff;--muted:#6b7280}
        *{box-sizing:border-box}
        body,html,#root{height:100%}
        .app-root{
          min-height:100vh;
          padding:36px 20px;
          background:linear-gradient(180deg,var(--bg),#f6fbff);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          color:#0f172a;
        }
        .header{
          max-width:1100px;margin:0 auto 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;
        }
        .brand{display:flex;align-items:center;gap:12px}
        .logo{width:48px;height:48px;border-radius:10px;background:linear-gradient(135deg,var(--accent),#6ec1ff);display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
        .title{font-size:20px;font-weight:600}
        .controls{display:flex;gap:10px;align-items:center}
        .search{padding:10px 12px;border-radius:10px;border:1px solid rgba(15,23,42,0.06);min-width:220px}
        .btn{padding:10px 14px;border-radius:10px;border:none;background:var(--accent);color:#fff;font-weight:600;cursor:pointer}
        .btn:active{transform:translateY(1px)}
        .grid{max-width:1100px;margin:18px auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
        .card{background:var(--card);padding:18px;border-radius:14px;box-shadow:0 8px 24px rgba(2,6,23,0.06);transition:transform .22s ease,box-shadow .22s ease;cursor:pointer}
        .card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(2,6,23,0.12)}
        .card h3{color:var(--accent);margin:0 0 8px;font-size:16px}
        .card p{margin:0;color:var(--muted);font-size:14px;line-height:1.4}
        .meta{margin-top:12px;display:flex;justify-content:space-between;align-items:center}
        .empty{max-width:1100px;margin:40px auto;text-align:center;color:var(--muted)}
        .spinner{width:36px;height:36px;border-radius:50%;border:4px solid rgba(0,0,0,0.06);border-top-color:var(--accent);animation:spin 1s linear infinite;margin:auto}
        @keyframes spin{to{transform:rotate(360deg)}}
        /* modal */
        .modal-back{position:fixed;inset:0;background:rgba(2,6,23,0.35);display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:var(--card);padding:20px;border-radius:12px;max-width:720px;width:100%;box-shadow:0 30px 60px rgba(2,6,23,0.2)}
        .modal h2{margin:0 0 8px;color:var(--accent)}
        .close{background:transparent;border:0;font-size:18px;cursor:pointer}
        @media(max-width:520px){.header{flex-direction:column;align-items:flex-start}.controls{width:100%;justify-content:space-between}.search{flex:1}}
      `}</style>

      <div className="header">
        <div className="brand">
          <div className="logo">TD</div>
          <div>
            <div className="title">Spooky Magic — Todos</div>
            <div style={{fontSize:12,color:'#4b5563',marginTop:4}}>Connected to: http://127.0.0.1:8000/api/</div>
          </div>
        </div>

        <div className="controls">
          <input
            className="search"
            placeholder="Search title or body..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn" onClick={fetchTodos} title="Refresh list">Refresh</button>
        </div>
      </div>

      {loading ? (
        <div className="empty">
          <div style={{height:120,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12}}>
            <div className="spinner" />
            <div style={{color:'var(--muted)'}}>Loading todos...</div>
          </div>
        </div>
      ) : error ? (
        <div className="empty">
          <p style={{color:'#b91c1c',fontWeight:600}}>{error}</p>
          <p style={{color:'var(--muted)'}}>Make sure your Django API is running and CORS allows requests from this app.</p>
          <div style={{marginTop:12}}>
            <button className="btn" onClick={fetchTodos}>Try again</button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <h3 style={{marginBottom:8}}>No todos found</h3>
          <div style={{color:'var(--muted)'}}>Try changing your search or add todos from the backend.</div>
        </div>
      ) : (
        <div className="grid">
          {filtered.map(item => (
            <article key={item.id} className="card" onClick={() => setSelected(item)}>
              <h3>{item.title || 'Untitled'}</h3>
              <p>{(item.body && item.body.length > 140) ? item.body.slice(0,140) + '...' : item.body}</p>
              <div className="meta">
                <small style={{color:'var(--muted)'}}>ID: {item.id}</small>
                <small style={{color:'var(--muted)'}}>{item.completed ? 'Completed' : 'Open'}</small>
              </div>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <div className="modal-back" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
              <h2>{selected.title}</h2>
              <button className="close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <p style={{color:'var(--muted)',marginTop:8}}>{selected.body || '— no description —'}</p>
            <div style={{marginTop:16,display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn" onClick={() => {navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(selected)); alert('Copied to clipboard');}}>Copy JSON</button>
              <button className="btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
