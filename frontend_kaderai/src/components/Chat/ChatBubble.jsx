export default function ChatBubble({ role, content }) {
  return (
    <div className={`chat-bubble ${role}`}>
      <p>{content}</p>
    </div>
  )
}
