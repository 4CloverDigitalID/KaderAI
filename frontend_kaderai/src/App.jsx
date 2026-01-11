import { useState } from 'react'
import './App.css'
import { createSession } from './api/chat'
import Sidebar from './components/Layout/Sidebar'
import ChatPage from './pages/Chat/ChatPage'
import SchedulesPage from './pages/Schedules/SchedulesPage'
import VisitsPage from './pages/Visits/VisitsPage'

export default function App() {
  const [activeTab, setActiveTab] = useState('visits')
  const [chatPresetSession, setChatPresetSession] = useState(null)
  const [notice, setNotice] = useState('')

  const handleStartChat = async (schedule) => {
    try {
      const session = await createSession({
        title: `Chat Jadwal ${schedule.date_label}`,
        schedule_id: schedule.id,
      })
      setChatPresetSession(session)
      setActiveTab('chat')
      setNotice('')
    } catch (err) {
      setNotice(err.message)
    }
  }

  return (
    <div className="app-shell">
      <Sidebar active={activeTab} onSelect={setActiveTab} />
      <main className="main">
        {notice && <div className="notice">{notice}</div>}
        {activeTab === 'visits' && <VisitsPage />}
        {activeTab === 'schedules' && <SchedulesPage onStartChat={handleStartChat} />}
        {activeTab === 'chat' && <ChatPage presetSession={chatPresetSession} />}
      </main>
    </div>
  )
}
