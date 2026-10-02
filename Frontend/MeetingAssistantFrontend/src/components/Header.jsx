const pages = [
  { id: 'summarize', label: 'Summarize' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'invitation', label: 'Invitation' },
];

export default function Header({ page, setPage }) {
  return (
    <header>
        <h1>Meeting Assistant</h1>
        <nav>
            {pages.map((p) => (
  <button
    key={p.id}
    className={p.id === page ? 'active' : ''}
    onClick={() => setPage(p.id)}
  >
    {p.label}
  </button>
))}
        </nav>
    </header>
  );
}