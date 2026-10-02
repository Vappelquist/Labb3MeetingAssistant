import { useEffect, useState } from 'react';
import { getStaff, getRooms, createInvitation } from '../api/aiApi';
import ResultBox from '../components/ResultBox';
export default function InvitationPage() {
    const [external, setExternal] = useState('');
    const [staff, setStaff] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [title, setTitle] = useState('');
    const [host, setHost] = useState('');
    const [guest, setGuest] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getStaff().then(setStaff).catch(() => setError('Could not load staff'));
        getRooms().then(setRooms).catch(() => setError('Could not load rooms'));
    }, []);

    function toggleGuest(name) {
        setGuest((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult('');
        try {
const externalGuests = external.split(',').map((s) => s.trim()).filter(Boolean);

            const text = await createInvitation({
                title,
                host,
                guest: [...guest, ...externalGuests],
                place,
                time: `${time}:00`,
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
            <h2>Create meeting invitation</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Meeting title"
                    required
                />

                <select value={host} onChange={(e) => setHost(e.target.value)} required>
                    <option value="">Select host</option>
                    {staff.map((s) => (
                        <option key={s.name} value={s.name}>
                            {s.name} ({s.role})
                        </option>
                    ))}
                </select>

                <fieldset>
                    <legend>Guests</legend>
                    {staff
                    .filter((s) => s.name !== host)
                    .map((s) => (
                        <label key={s.name}>
                            <input
                                type="checkbox"
                                checked={guest.includes(s.name)}
                                onChange={() => toggleGuest(s.name)}
                            />
                            {s.name} ({s.role})
                        </label>
                    ))}

                </fieldset>
                    <input
                        type="text"
                        value={external}
                        onChange={(e) => setExternal(e.target.value)}
                        placeholder="External guests, comma separated"
                    />

                <select value={place} onChange={(e) => setPlace(e.target.value)} required>
                    <option value="">Select place</option>
                    {rooms.map((r) => (
                        <option key ={r} value={r}>{r}</option>
                    ))}
                </select>

                <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                />

                <button disabled={loading}>Create Invitation</button>
            </form>

            <ResultBox loading={loading} error={error} result={result} />
        </section>
    );
}