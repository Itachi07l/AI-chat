import React from 'react'
import MessageList from './MessageList'
import Composer from './Composer'

const ChatMain = ({ activeChatId, title, messages, bottomRef, input, setInput, onSend, loading, inputRef, onDelete }) => {
  return (
    <main className="chat-main">
      <header className="chat-header">
        <div className="chat-header-title">
          <span className="brand">ChatGPT</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        {/* <div className="controls"> */}
          {/* <button className="header-delete" title="Delete current chat" onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (typeof onDelete === 'function') onDelete() }}>✕</button> */}
        {/* </div> */}
      </header>

      <section className="chat-main-content">
        {messages && messages.length > 0 ? (
          <MessageList messages={messages} bottomRef={bottomRef} />
        ) : (
          <div className="empty-chat muted" style={{ padding: 40, textAlign: 'center' }}>
            Select a chat to start the conversation or click + to create one.
          </div>
        )}
      </section>

  {/* render composer when an active chat is selected */}
  {activeChatId ? (
    <Composer input={input} setInput={setInput} onSend={onSend} loading={loading} inputRef={inputRef} />
  ) : null}
    </main>
  )
}

export default ChatMain
