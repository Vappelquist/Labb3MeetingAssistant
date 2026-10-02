import { useEffect, useState } from 'react';
import { getStaff, summarize } from '../api/aiApi';
import ResultBox from '../components/ResultBox';

export default function SummarizePage() {
  const [staff, setStaff] = useState([]);
  const [notes, setNotes] = useState('');
  const [internal, setInternal] = useState([]);
  const [external, setExternal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getStaff().then(setStaff).catch(() => setError('Could not load staff'));
  }, []);

  function toggle(name) {
    setInternal((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const text = await summarize({
        notes,
        internalAttendees: internal,
        externalAttendees: external.split(',').map((s) => s.trim()).filter(Boolean),
      });
      setResult(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Summarize meeting notes</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your meeting notes…"
          rows={10}
          required
        />

        <fieldset>
          <legend>Internal attendees</legend>
          {staff.map((s) => (
            <label key={s.name}>
              <input
                type="checkbox"
                checked={internal.includes(s.name)}
                onChange={() => toggle(s.name)}
              />
              {s.name} ({s.role})
            </label>
          ))}
        </fieldset>

        <input
          value={external}
          onChange={(e) => setExternal(e.target.value)}
          placeholder="External attendees, comma separated"
        />

        <button disabled={loading}>Summarize</button>
      </form>

      <ResultBox loading={loading} error={error} result={result} />
    </section>
  );
}