export default function ScheduleCard({ schedule, onDelete, onStartChat }) {
  return (
    <article className="schedule-card">
      <div>
        <p className="schedule-date">{schedule.date_label}</p>
        <h3>{schedule.full_address}</h3>
        <div className={`status-pill status-${schedule.status.toLowerCase()}`}>
          {schedule.status} · {schedule.days_left_label}
        </div>
      </div>
      <div className="card-actions">
        <button type="button" className="ghost" onClick={() => onStartChat(schedule)}>
          Mulai Chat
        </button>
        <button type="button" className="ghost danger" onClick={() => onDelete(schedule.id)}>
          Hapus
        </button>
      </div>
    </article>
  )
}
