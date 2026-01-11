export default function ChatInput({ value, onChange, onSend, disabled }) {
  return (
    <div className="chat-input">
      <textarea
        rows={2}
        placeholder="Tulis pertanyaan kamu di sini..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="button" className="primary" onClick={onSend} disabled={disabled}>
        Kirim
      </button>
    </div>
  )
}
