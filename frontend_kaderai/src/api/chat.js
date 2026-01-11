import { apiFetch } from './http'

export function createSession(payload) {
  return apiFetch('/chat/sessions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function sendMessage(sessionId, message) {
  return apiFetch(`/chat/sessions/${sessionId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}
