import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: [], // each chat: { id, title, messages: [{role,text}] }
  activeChatId: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(state, action) {
      const { id, title } = action.payload
      state.chats.unshift({ id, title, messages: [] })
      state.activeChatId = id
    },
    setActiveChat(state, action) {
      state.activeChatId = action.payload
    },
    deleteChat(state, action) {
      const id = action.payload
      state.chats = state.chats.filter((c) => c.id !== id)
      if (state.activeChatId === id) {
        state.activeChatId = state.chats.length ? state.chats[0].id : null
      }
    },
    renameChat(state, action) {
      const { id, title } = action.payload
      const chat = state.chats.find((c) => c.id === id)
      if (chat) chat.title = title
    },
    addMessage(state, action) {
      const { chatId, message } = action.payload
      const chat = state.chats.find((c) => c._id === chatId)
      if (chat) {
        chat.messages.push(message)
      }
    },
    replaceMessages(state, action) {
      const { chatId, messages } = action.payload
      const chat = state.chats.find((c) => c._id === chatId)
      if (chat) chat.messages = messages
    },
    setChats(state, action) {
      state.chats = action.payload
    },
  },
})

export const { addChat, setActiveChat, deleteChat, renameChat, addMessage, replaceMessages ,setChats} = chatSlice.actions
export default chatSlice.reducer
