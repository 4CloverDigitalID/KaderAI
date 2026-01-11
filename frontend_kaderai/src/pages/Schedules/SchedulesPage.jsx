import { useEffect, useState } from 'react'
import { createSchedule, deleteSchedule, listSchedules } from '../../api/schedules'
import PageHeader from '../../components/Layout/PageHeader'
import ScheduleCard from '../../components/Schedules/ScheduleCard'

const initialForm = {
  scheduled_at: '',
  city: '',
  district: '',
  street: '',
  rt_rw: '',
  description: '',
}

export default function SchedulesPage({ onStartChat }) {
  const [data, setData] = useState({ total: 0, items: [] })
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refresh = () => {
    setLoading(true)
    listSchedules()
      .then((payload) => {
        setData(payload)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
  }, [])

  const updateForm = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await createSchedule(form)
      setForm(initialForm)
      refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    setError('')
    try {
      await deleteSchedule(id)
      refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <PageHeader
        title="Jadwal Posyandu"
        subtitle="Kelola jadwal, pantau status, dan mulai chat dari jadwal terpilih."
      />
      <div className="grid two">
        <section className="card">
          <h2>Tambah Jadwal</h2>
          <form className="form-grid" onSubmit={handleCreate}>
            <label>
              Tanggal & Waktu
              <input type="datetime-local" value={form.scheduled_at} onChange={updateForm('scheduled_at')} required />
            </label>
            <label>
              Kota
              <input value={form.city} onChange={updateForm('city')} required />
            </label>
            <label>
              Kecamatan
              <input value={form.district} onChange={updateForm('district')} required />
            </label>
            <label>
              Jalan
              <input value={form.street} onChange={updateForm('street')} required />
            </label>
            <label>
              RT/RW
              <input value={form.rt_rw} onChange={updateForm('rt_rw')} required />
            </label>
            <label className="span-two">
              Catatan
              <input value={form.description} onChange={updateForm('description')} />
            </label>
            <button type="submit" className="primary" disabled={loading}>
              Simpan Jadwal
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>
        <section className="card">
          <div className="card-header">
            <h2>Ringkasan Jadwal</h2>
            <span className="counter">{data.total} Total</span>
          </div>
          <div className="schedule-list">
            {data.items.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                onDelete={handleDelete}
                onStartChat={onStartChat}
              />
            ))}
          </div>
          {loading && <p className="muted">Memuat jadwal...</p>}
        </section>
      </div>
    </div>
  )
}
