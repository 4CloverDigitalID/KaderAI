import { useEffect, useState } from 'react'
import { createSession, sendMessage } from '../../api/chat'
import PageHeader from '../../components/Layout/PageHeader'
import ChatBubble from '../../components/Chat/ChatBubble'
import ChatInput from '../../components/Chat/ChatInput'

export default function ChatPage({ presetSession }) {
  const [session, setSession] = useState(presetSession || null)
  const [title, setTitle] = useState('')
  const [scheduleId, setScheduleId] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (presetSession) {
      setSession(presetSession)
      setScheduleId(presetSession.schedule_id || '')
    }
  }, [presetSession])

  const handleCreateSession = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        title: title || undefined,
        schedule_id: scheduleId ? Number(scheduleId) : undefined,
      }
      const created = await createSession(payload)
      setSession(created)
      setMessages([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    if (!session || !input.trim()) return
    setLoading(true)
    setError('')
    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    try {
      const response = await sendMessage(session.id, userMessage.content)
      setMessages((prev) => [...prev, { role: 'model', content: response.answer }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <PageHeader
        title="Chat Dokter Anak"
        subtitle="Gunakan chat untuk edukasi cepat, triage ringan, dan tanya jawab aman."
      />
      <div className="grid two">
        <section className="card">
          <h2>Mulai Sesi Chat</h2>
          <div className="form-grid">
            <label>
              Judul (opsional)
              <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label>
              Schedule ID (opsional)
              <input value={scheduleId} onChange={(event) => setScheduleId(event.target.value)} />
            </label>
            <button type="button" className="primary" onClick={handleCreateSession} disabled={loading}>
              Buat Sesi
            </button>
          </div>
          {session && (
            <div className="session-meta">
              <p>Sesi aktif: #{session.id}</p>
              <p className="muted">{session.title || 'Tanpa judul'}</p>
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </section>
        <section className="card chat-panel">
          <div className="chat-stream">
            {messages.length === 0 && (
              <div className="empty-state">
                <p>Belum ada pesan. Tanyakan gejala atau edukasi kesehatan anak.</p>
              </div>
            )}
            {messages.map((message, index) => (
              <ChatBubble key={`${message.role}-${index}`} role={message.role} content={message.content} />
            ))}
          </div>
          <ChatInput value={input} onChange={setInput} onSend={handleSend} disabled={!session || loading} />
        </section>
      </div>
    </div>
  )
}
