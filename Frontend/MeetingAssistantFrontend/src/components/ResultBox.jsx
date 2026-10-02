import ReactMarkdown from 'react-markdown';

export default function ResultBox({ result, loading, error }) {
  if (loading) {
    return <p className="result-status">Loading...</p>;
  }
  if (error) {
    return <p className="result-error">{error}</p>;
  }
  if (!result) {
    return null;
  }

  return <div className="result-box"><ReactMarkdown>{result}</ReactMarkdown></div>;
}