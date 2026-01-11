import { useEffect, useMemo, useState } from 'react'
import { analyzeVisit, createVisit, listVisits, planVisit, reportVisit } from '../../api/visits'
import PageHeader from '../../components/Layout/PageHeader'
import RiskBadge from '../../components/Visits/RiskBadge'

const initialForm = {
  visited_at: '',
  city: '',
  district: '',
  street: '',
  rt_rw: '',
  description: '',
  child_name: '',
  child_age_months: '',
  weight_kg: '',
  height_cm: '',
  symptoms: '',
  eating_pattern: '',
  immunization_status: 'tidak_tahu',
}

export default function VisitsPage() {
  const [visits, setVisits] = useState([])
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [analysis, setAnalysis] = useState(null)
  const [plan, setPlan] = useState(null)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedId = selectedVisit?.id

  const selectedSummary = useMemo(() => {
    if (!selectedVisit) return null
    return `${selectedVisit.child_name || 'Anak'} · ${selectedVisit.child_age_months} bulan`
  }, [selectedVisit])

  useEffect(() => {
    let active = true
    setLoading(true)
    listVisits()
      .then((data) => {
        if (!active) return
        setVisits(data.data || data)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message)
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (selectedVisit?.ai_output) {
      setAnalysis(selectedVisit.ai_output)
      setPlan(selectedVisit.ai_output.plan_7_days || null)
      setReport(selectedVisit.ai_output.report_text || null)
    } else {
      setAnalysis(null)
      setPlan(null)
      setReport(null)
    }
  }, [selectedVisit])

  const updateForm = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...form,
        child_age_months: Number(form.child_age_months),
        weight_kg: Number(form.weight_kg),
        height_cm: Number(form.height_cm),
      }
      const created = await createVisit(payload)
      const visitItem = created.data || created
      setVisits((prev) => [visitItem, ...prev])
      setSelectedVisit(visitItem)
      setForm(initialForm)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedId) return
    setLoading(true)
    setError('')
    try {
      const triage = await analyzeVisit(selectedId)
      setAnalysis(triage)
      setSelectedVisit((prev) => ({
        ...prev,
        ai_output: {
          ...(prev?.ai_output || {}),
          ...triage,
        },
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePlan = async () => {
    if (!selectedId) return
    setLoading(true)
    setError('')
    try {
      const planData = await planVisit(selectedId)
      setPlan(planData)
      setSelectedVisit((prev) => ({
        ...prev,
        ai_output: {
          ...(prev?.ai_output || {}),
          plan_7_days: planData,
        },
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReport = async () => {
    if (!selectedId) return
    setLoading(true)
    setError('')
    try {
      const reportData = await reportVisit(selectedId)
      setReport(reportData.report_text)
      setSelectedVisit((prev) => ({
        ...prev,
        ai_output: {
          ...(prev?.ai_output || {}),
          report_text: reportData.report_text,
        },
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <PageHeader
        title="Posyandu Copilot"
        subtitle="Input data kunjungan anak, lalu minta AI menilai risiko, rencana 7 hari, dan laporan ringkas."
      />
      <div className="grid two">
        <section className="card">
          <h2>Kunjungan Baru</h2>
          <form className="form-grid" onSubmit={handleCreate}>
            <label>
              Tanggal Kunjungan
              <input type="datetime-local" value={form.visited_at} onChange={updateForm('visited_at')} required />
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
            <label>
              Info Tambahan
              <input value={form.description} onChange={updateForm('description')} />
            </label>
            <label>
              Nama Anak
              <input value={form.child_name} onChange={updateForm('child_name')} />
            </label>
            <label>
              Usia (bulan)
              <input type="number" value={form.child_age_months} onChange={updateForm('child_age_months')} required />
            </label>
            <label>
              Berat (kg)
              <input type="number" step="0.01" value={form.weight_kg} onChange={updateForm('weight_kg')} required />
            </label>
            <label>
              Tinggi (cm)
              <input type="number" step="0.01" value={form.height_cm} onChange={updateForm('height_cm')} required />
            </label>
            <label className="span-two">
              Gejala
              <textarea rows={2} value={form.symptoms} onChange={updateForm('symptoms')} />
            </label>
            <label className="span-two">
              Pola Makan
              <textarea rows={2} value={form.eating_pattern} onChange={updateForm('eating_pattern')} />
            </label>
            <label>
              Status Imunisasi
              <select value={form.immunization_status} onChange={updateForm('immunization_status')}>
                <option value="lengkap">Lengkap</option>
                <option value="belum_lengkap">Belum lengkap</option>
                <option value="tidak_tahu">Tidak tahu</option>
              </select>
            </label>
            <button type="submit" className="primary" disabled={loading}>
              Simpan Kunjungan
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>
        <section className="card">
          <h2>Daftar Kunjungan</h2>
          {loading && visits.length === 0 ? <p>Memuat...</p> : null}
          <div className="visit-list">
            {visits.map((visit) => (
              <button
                key={visit.id}
                type="button"
                className={`visit-item ${selectedId === visit.id ? 'active' : ''}`}
                onClick={() => setSelectedVisit(visit)}
              >
                <div>
                  <p>{visit.child_name || 'Anon'}</p>
                  <span>{visit.visited_at}</span>
                </div>
                {visit.ai_output?.risk_level && <RiskBadge level={visit.ai_output.risk_level} />}
              </button>
            ))}
          </div>
          {selectedVisit && (
            <div className="visit-detail">
              <h3>{selectedSummary}</h3>
              <p className="muted">
                {selectedVisit.street} · {selectedVisit.rt_rw} · {selectedVisit.district}
              </p>
              <div className="button-row">
                <button type="button" className="primary" onClick={handleAnalyze} disabled={loading}>
                  Analisis Risiko
                </button>
                <button type="button" className="ghost" onClick={handlePlan} disabled={loading}>
                  Rencana 7 Hari
                </button>
                <button type="button" className="ghost" onClick={handleReport} disabled={loading}>
                  Generate Laporan
                </button>
              </div>
              {analysis && (
                <div className="result-block">
                  <div className="result-header">
                    <h4>Hasil Triage</h4>
                    <RiskBadge level={analysis.risk_level} />
                  </div>
                  <ul>
                    {analysis.reasons?.map((item, index) => (
                      <li key={`reason-${index}`}>{item}</li>
                    ))}
                  </ul>
                  {analysis.red_flags?.length ? (
                    <>
                      <p className="label">Red Flags</p>
                      <ul>
                        {analysis.red_flags.map((item, index) => (
                          <li key={`flag-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              )}
              {plan && (
                <div className="result-block">
                  <h4>Rencana 7 Hari</h4>
                  <p className="muted">{plan.goal}</p>
                  <div className="plan-grid">
                    {plan.daily_plan?.map((day) => (
                      <div key={day.day} className="plan-day">
                        <h5>Hari {day.day}</h5>
                        <p className="small">{day.habit}</p>
                        <ul>
                          {day.meals?.map((meal, idx) => (
                            <li key={`${day.day}-${idx}`}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {report && (
                <div className="result-block">
                  <h4>Laporan Kunjungan</h4>
                  <pre className="report-text">{report}</pre>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
