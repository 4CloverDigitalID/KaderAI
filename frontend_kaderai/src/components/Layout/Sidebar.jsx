const navItems = [
  { id: 'visits', label: 'Posyandu Copilot' },
  { id: 'schedules', label: 'Jadwal Posyandu' },
  { id: 'chat', label: 'Chat Dokter Anak' },
]

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">KA</span>
        <div>
          <p className="brand-title">KaderAI</p>
          <p className="brand-subtitle">MVP+ Posyandu</p>
        </div>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p className="sidebar-note">
          Edukasi & triage aman. Bukan pengganti tenaga medis.
        </p>
      </div>
    </aside>
  )
}
