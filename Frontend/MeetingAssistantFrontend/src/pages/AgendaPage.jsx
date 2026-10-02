import { useState } from 'react';
import { createAgenda } from '../api/aiApi';
import ResultBox from '../components/ResultBox';

export default function AgendaPage() {
  const [rows, setRows] = useState([{ topic: '', hours: '' }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  function updateRow(index, field, value) {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [...prev, { topic: '', hours: '' }]);
  }

  function removeRow(index) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const points = Object.fromEntries(
        rows
          .filter((r) => r.topic.trim())
          .map((r) => [r.topic.trim(), Number(r.hours)])
      );
      const text = await createAgenda({ points });
      setResult(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Agenda</h2>
      <form onSubmit={handleSubmit}>
        {rows.map((row, i) => (
          <div className="agenda-row" key={i}>
            <input
              type="text"
              value={row.topic}
              onChange={(e) => updateRow(i, 'topic', e.target.value)}
              placeholder="Agenda point"
              required
            />
            <input
              type="number"
              value={row.hours}
              onChange={(e) => updateRow(i, 'hours', e.target.value)}
              placeholder="Hours"
              min="0"
              step="0.25"
              required
            />
            {rows.length > 1 && (
              <button type="button" onClick={() => removeRow(i)}>✕</button>
            )}
          </div>
        ))}

        <button type="button" onClick={addRow}>+ Add point</button>
        <button disabled={loading}>Create agenda</button>
      </form>

      <ResultBox loading={loading} error={error} result={result} />
    </section>
  );
}