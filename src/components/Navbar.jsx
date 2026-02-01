import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import './Navbar.css'

const navLinks = [
  { path: '/', key: 'nav_home' },
  { path: '/pesquisas', key: 'nav_research' },
  { path: '/membros', key: 'nav_members' },
  { path: '/atividades', key: 'nav_activities' },
  { path: '/projetos', key: 'nav_projects' },
  { path: '/contato', key: 'nav_contact' },
]

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src={assetUrl('/logo.png')} alt="Labchain" />
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ path, key }) => (
            <Link
              key={path}
              to={path}
              className={`navbar-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>

        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
