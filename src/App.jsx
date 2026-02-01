import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Research from './pages/Research'
import Members from './pages/Members'
import Activities from './pages/Activities'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesquisas" element={<Research />} />
          <Route path="/membros" element={<Members />} />
          <Route path="/atividades" element={<Activities />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
