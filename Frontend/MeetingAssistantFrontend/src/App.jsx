import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SummarizePage from './pages/SummarizePage'
import InvitationPage from './pages/InvitationPage';
import AgendaPage from './pages/AgendaPage'


function App() {
  const [page, setPage] = useState('summarize');

  return (
    <>
      <Header page={page} setPage={setPage} />
      <main>
        {page === 'summarize' && <SummarizePage />}
        {page === 'invitation' && <InvitationPage />}   
        {page === 'agenda' && <AgendaPage />}     
      </main>
    </>
  )
}

export default App
