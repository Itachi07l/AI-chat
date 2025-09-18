import React from 'react'

const Composer = ({ input, setInput, onSend, loading, inputRef }) => {
  return (
    <div className="composer-wrap" role="region" aria-label="Message composer">
      <form className="composer" onSubmit={onSend}>
        <button type="button" className="left-plus" title="New">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

  <input
          aria-label="Message"
          className="composer-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={loading ? 'Waiting for response...' : 'Ask anything'}
          disabled={loading}
        />

        <div className="icons-right">
          <button type="button" className="icon-btn" title="Voice">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 12a7 7 0 01-14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button type="submit" className="icon-btn" title="Send" disabled={loading || !input.trim()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2l-7 20 -3-9 -9-3 20-7z" stroke="currentColor" strokeWidth="0"/></svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Composer
