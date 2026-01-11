import { apiFetch } from './http'

export function listVisits() {
  return apiFetch('/visits')
}

export function createVisit(payload) {
  return apiFetch('/visits', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getVisit(id) {
  return apiFetch(`/visits/${id}`)
}

export function analyzeVisit(id) {
  return apiFetch(`/visits/${id}/analyze`, {
    method: 'POST',
  })
}

export function planVisit(id) {
  return apiFetch(`/visits/${id}/plan`, {
    method: 'POST',
  })
}

export function reportVisit(id) {
  return apiFetch(`/visits/${id}/report`, {
    method: 'POST',
  })
}
