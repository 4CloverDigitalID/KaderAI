import { apiFetch } from './http'

export function listSchedules() {
  return apiFetch('/schedules')
}

export function createSchedule(payload) {
  return apiFetch('/schedules', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateSchedule(id, payload) {
  return apiFetch(`/schedules/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteSchedule(id) {
  return apiFetch(`/schedules/${id}`, {
    method: 'DELETE',
  })
}

export function getSchedule(id) {
  return apiFetch(`/schedules/${id}`)
}
