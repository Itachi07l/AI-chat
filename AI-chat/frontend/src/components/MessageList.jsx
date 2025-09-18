
const MessageList = ({ messages = [], bottomRef = null }) => {
  return (
    <div className="messages">
      {messages.map((m, idx) => (
        <div key={idx} className={`message ${m.role}`}>
          <div className="message-body">{m.text}</div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
