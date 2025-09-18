import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
const ChatSidebar = ({ chats = [], activeChatId = null, onOpen = () => {}, onNew = () => {} }) => {
  const [creating, setCreating] = useState(false)
  const [title, setTitle] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (creating) inputRef.current?.focus()
  }, [creating])

  function startCreate(e) {
    e?.stopPropagation()
    setCreating(true)
    setTitle('')
  }

  function cancelCreate(e) {
    e?.stopPropagation()
    setCreating(false)
    setTitle('')
  }

  async function submitCreate(ev) {
    ev.preventDefault()
    const trimmed = (title || '').trim()
    if (!trimmed) return
    // call onNew with provided title if the parent supports it
    try {  
     const res=await axios.post('http://localhost:3000/chat/', { title: trimmed },{withCredentials:true})
      onNew(res.data.chat.title)
    } catch (err) { onNew && onNew() }
    setCreating(true)
    setTitle('')
  }

  return (
    <aside className="sidebar" aria-label="Previous chats">
      <div className="sidebar-header" onClick={(e) => { if (!creating) startCreate(e) }} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label="Create new chat">
        {!creating ? (
          <>
            <div>
              <h3>Chats</h3>
              <div className="muted">Recent conversations</div>
            </div>
            <button className="new-chat-btn" onClick={(e) => { e.stopPropagation(); startCreate(e) }} aria-label="New chat">+</button>
          </>
        ) : (
          <form className="new-chat-form" onSubmit={submitCreate} onClick={(e) => e.stopPropagation()}>
            <input ref={inputRef} className="new-chat-input" placeholder="Name your chat" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="New chat title" />
            <div className="new-chat-actions">
              <button type="submit" className="new-chat-submit" aria-label="Create">Create</button>
              <button type="button" className="new-chat-cancel" onClick={cancelCreate} aria-label="Cancel">✕</button>
            </div>
          </form>
        )}
      </div>

      <ul className="chat-list">
        {chats.length === 0 && <li className="empty muted">No chats</li>}
        {chats.map((c) => (
          <li key={c._id} className={c._id === activeChatId ? 'active' : ''}>
            <ChatListItem chat={c} active={c._id=== activeChatId } onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default ChatSidebar

function ChatListItem({ chat, active, onOpen }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(chat.title)
  const ref = useRef(null)

  useEffect(() => { if (editing) ref.current?.focus() }, [editing])

  function handleOpen() {
    const el = ref?.current?.closest('li') || null
    if (el) { el.classList?.add('selected-anim'); setTimeout(() => el.classList?.remove('selected-anim'), 380) }
    onOpen(chat._id)
  }

  function startEdit(e) {
    e.stopPropagation()
    setEditing(true)
    setVal(chat.title)
  }

  function cancelEdit(e) {
    e.stopPropagation()
    setEditing(false)
    setVal(chat.title)
  }

  function submitEdit(e) {
    e.preventDefault()
    const newTitle = (val || '').trim()
    if (!newTitle || newTitle === chat.title) {
      setEditing(false)
      return
    }
    // signal parent to rename: special onOpen command 'rename:<id>:<title>'
    onOpen(`rename:${chat._id}:${newTitle}`)
    setEditing(false)
  }

  return (
    <div onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        {!editing ? (
          <>
            <div className="chat-title">{chat.title}</div>
            <div className="chat-preview muted">{(chat.messages && chat.messages.slice(-1)[0]?.text) || ''}</div>
          </>
        ) : (
          <form onSubmit={submitEdit} onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input ref={ref} value={val} onChange={(e) => setVal(e.target.value)} className="new-chat-input" />
            <button type="submit" className="new-chat-submit">Save</button>
            <button type="button" className="new-chat-cancel" onClick={cancelEdit}>✕</button>
          </form>
        )}
      </div>
      {!editing && <div style={{ display: 'flex', gap: 8 }}>
        <button className="chat-edit" onClick={startEdit} title="Rename chat">✎</button>
        <button className="chat-delete" onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); onOpen('delete:' + chat._id) }} title="Delete chat">✕</button>
      </div>}
    </div>
  )
}
