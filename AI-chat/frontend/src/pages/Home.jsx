import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import '../styles/theme.css'
import ChatSidebar from '../components/ChatSidebar'
import ChatMain from '../components/ChatMain'
import { useSelector, useDispatch } from 'react-redux'
import { addChat, setActiveChat, deleteChat, renameChat, addMessage, replaceMessages, setChats } from '../store/chatSlice'
import { io } from "socket.io-client";
const Home = () => {
  const chats = useSelector((s) => s.chat.chats)
  let activeChatId = useSelector((s) => s.chat.activeChatId)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([]);


  // when creating a chat we want it active and focus the composer
  function createAndOpen(title) {
    const id = Date.now().toString()
    dispatch(addChat({ id, title }))
    dispatch(setActiveChat(id))
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  useEffect(() => {
    const tempSocket = io('http://localhost:3000', { withCredentials: true })
    setSocket(tempSocket);
    tempSocket.on("ai-response", (messageplayload) => {
      // if(messageplayload.chat!==activeChatId) return;
      console.log("recive ai respone:", messageplayload.content);
      setMessages((prevMessages) => [...prevMessages, { role: 'ai', text: messageplayload.content }])
    });
    console.log(messages)
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/chat/', { withCredentials: true }).then((res) => {
      dispatch(setChats(res.data.chats.reverse()))
      
      if(activeChatId){
        axios.get(`http://localhost:3000/chat/message/${activeChatId}`, { withCredentials: true }).then((res) => {
          res.data.messages.map((e)=>{
            console.log(e)
            setMessages((prevMessages) => [...prevMessages, {role:(e.role=="model"?"ai":"user"),text:e.content}])
          })
        })
        activeChatId=null;
      }
      setMessages([]);
    })
    try { bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) } catch (e) { }
  }, [activeChatId])

  function openChat(chatId) {
    dispatch(setActiveChat(chatId))
    const chat = chats.find((c) => c._id === chatId) || {}
    const lastUser = (chat.messages || []).slice().reverse().find((m) => m.role === 'user')
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
        if (lastUser) setInput()
      }, 80)
    }
  }

  async function sendMessage(e) {
    e?.preventDefault()
    if (!input.trim()) return
    socket.emit("ai-message", { chat: activeChatId, content: input.trim() });
    setMessages((prevMessages) => [...prevMessages, { role: 'user', text: input.trim() }])
    setInput('')
    setLoading(false)
  }

  return (
    <div className="app-shell">
      <div className="chat-container">
        {/* left icon rail (desktop only) */}
        <nav className="left-rail" aria-hidden="false">
          <ul className="rail-list">
            <li className="rail-item" title="New chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </li>
            <li className="rail-item" title="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" /></svg>
            </li>
            <li className="rail-item" title="Library">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5V5.5a1 1 0 011-1h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 20.5V6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </li>
          </ul>

          <div className="rail-bottom">
            <div className="avatar">N</div>
          </div>
        </nav>

        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          onOpen={(idOrCmd) => {
            // special commands from sidebar: delete:<id> or rename:<id>:<newTitle>
            if (typeof idOrCmd === 'string' && idOrCmd.startsWith('delete:')) {
              const id = idOrCmd.split(':')[1]
              if (window.confirm('Delete this chat?')) {
                dispatch(deleteChat(id))
              }
              return
            }
            if (typeof idOrCmd === 'string' && idOrCmd.startsWith('rename:')) {
              // format: rename:<id>:<newTitle>
              const parts = idOrCmd.split(':')
              const id = parts[1]
              const newTitle = parts.slice(2).join(':') || ''
              if (id && newTitle) dispatch(renameChat({ id, title: newTitle }))
              return
            }
            const id = idOrCmd
            // if no chats exist, clicking the list area should create and open
            if (!id) return createAndOpen('Chat ' + (chats.length + 1))
            openChat(id)
          }}
          onNew={(title) => {
            if (typeof title === 'string' && title.trim()) createAndOpen(title.trim())
            else createAndOpen('Chat ' + (chats.length + 1))
          }}
        />
        <ChatMain
          activeChatId={activeChatId}
          title={chats.find((x) => x._id === activeChatId)?.title}
          messages={messages ? messages : []}
          bottomRef={bottomRef}
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          loading={loading}
          inputRef={inputRef}
          onDelete={() => {
            if (!activeChatId) return
            if (window.confirm('Delete current chat?')) dispatch(deleteChat(activeChatId))
          }}
        />
      </div>
    </div>
  )
}

export default Home
