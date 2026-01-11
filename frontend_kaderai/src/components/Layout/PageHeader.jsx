export default function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">KaderAI Dashboard</p>
        <h1>{title}</h1>
      </div>
      <p className="subtitle">{subtitle}</p>
    </header>
  )
}
