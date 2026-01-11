const riskStyles = {
  low: 'badge badge-low',
  medium: 'badge badge-medium',
  high: 'badge badge-high',
}

export default function RiskBadge({ level = 'medium' }) {
  return <span className={riskStyles[level] || riskStyles.medium}>{level}</span>
}
