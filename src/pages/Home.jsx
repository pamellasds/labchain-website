import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import { activities } from '../data/news'
import './Home.css'

/* ── Custom SVG icons (palette #7663cf) ── */
const IconChain = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="2" y="10" width="12" height="16" rx="3" stroke="#7663cf" strokeWidth="2.2"/>
    <rect x="22" y="10" width="12" height="16" rx="3" stroke="#7663cf" strokeWidth="2.2"/>
    <path d="M14 18h8" stroke="#7663cf" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="14" cy="18" r="1.5" fill="#7663cf"/>
    <circle cx="22" cy="18" r="1.5" fill="#7663cf"/>
  </svg>
)

const IconHealth = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="6" width="24" height="24" rx="5" stroke="#7663cf" strokeWidth="2.2"/>
    <path d="M18 12v12M12 18h12" stroke="#7663cf" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

const IconDoc = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M10 4h12l8 8v20a2 2 0 01-2 2H10a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#7663cf" strokeWidth="2.2"/>
    <path d="M22 4v8h8" stroke="#7663cf" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 20h10M13 25h6" stroke="#7663cf" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconCrypto = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="14" stroke="#7663cf" strokeWidth="2.2"/>
    <path d="M18 8v2M18 26v2" stroke="#7663cf" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M14 15c0-1.7 1.8-3 4-3s4 1.3 4 3-1.8 3-4 3-4 1.3-4 3 1.8 3 4 3 4-1.3 4-3" stroke="#7663cf" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
)

const researchIcons = [<IconChain />, <IconHealth />, <IconDoc />, <IconCrypto />]

const stats = [
  { key: 'numbers_publications', value: '25+' },
  { key: 'numbers_members', value: '5+' },
  { key: 'numbers_years', value: '6+' },
  { key: 'numbers_projects', value: '4' },
]

function formatDate(dateStr, lang, t) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const month = t(`month_${m - 1}`)
  return lang === 'pt'
    ? `${String(d).padStart(2, '0')} de ${month} de ${y}`
    : `${month} ${d}, ${y}`
}

export default function Home() {
  const { lang, t } = useLanguage()
  const tickerRef = useRef(null)

  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    let frame
    let pos = 0
    const speed = 0.4
    const step = () => {
      pos -= speed
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0
      el.style.transform = `translateX(${pos}px)`
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    const pause = () => cancelAnimationFrame(frame)
    const resume = () => { frame = requestAnimationFrame(step) }
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
    }
  }, [])

  const recentActivities = activities.slice(0, 5)
  const tickerItems = [...recentActivities, ...recentActivities]

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
          <div className="hero-orb hero-orb--3" />
        </div>
        <div className="container hero-content">
          <img src={assetUrl('/logo.png')} alt="Labchain" className="hero-logo" />
          <p className="hero-subtitle">{t('hero_subtitle')}</p>
          <Link to="/pesquisas" className="btn btn-primary hero-cta">
            {t('hero_cta')}
            <span className="btn-arrow">→</span>
          </Link>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="var(--white)"/>
          </svg>
        </div>
      </section>

      {/* ── Quem Somos ── */}
      <section className="section about">
        <div className="container about-layout">
          <div className="about-text">
            <h2 className="section-title">{t('about_title')}</h2>
            <p className="section-subtitle">{t('about_subtitle')}</p>
            <p>{t('about_text')}</p>
            <p>{t('about_text2')}</p>
          </div>
          <div className="about-image-wrap">
            <img
              src={assetUrl('/images/about-lab.jpg')}
              alt="Labchain team"
              className="about-image"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="about-image-fallback">
              <img src={assetUrl('/logo.png')} alt="Labchain" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Linhas de Pesquisa ── */}
      <section className="section research-lines">
        <div className="container">
          <h2 className="section-title">{t('research_lines_title')}</h2>
          <p className="section-subtitle">{t('research_lines_subtitle')}</p>
          <div className="rl-grid">
            {[1, 2, 3, 4].map((n, i) => (
              <div className="rl-card" key={n}>
                <div className="rl-icon">{researchIcons[i]}</div>
                <h3>{t(`rl_${n}_title`)}</h3>
                <p>{t(`rl_${n}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Números ── */}
      <section className="section numbers">
        <div className="container">
          <h2 className="section-title">{t('numbers_title')}</h2>
          <p className="section-subtitle numbers-sub">{t('numbers_subtitle')}</p>
          <div className="numbers-grid">
            {stats.map(({ key, value }) => (
              <div className="number-card" key={key}>
                <span className="number-value gradient-text">{value}</span>
                <span className="number-label">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Atividades ── */}
      <section className="section activities-home">
        <div className="container">
          <div className="activities-home-header">
            <h2 className="section-title">{t('activities_title')}</h2>
            <Link to="/atividades" className="btn btn-sm btn-outline">{t('activities_see_all')}</Link>
          </div>
        </div>
        <div className="ticker-wrap">
          <div className="ticker" ref={tickerRef}>
            {tickerItems.map((item, i) => (
              <div className="ticker-card" key={i}>
                <div className="ticker-photo-wrap">
                  {item.photos && item.photos[0] ? (
                    <img
                      src={assetUrl(item.photos[0])}
                      alt=""
                      className="ticker-photo"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('no-photo')
                      }}
                    />
                  ) : null}
                  <div className="ticker-photo-fallback">
                    <img src={assetUrl('/logo.png')} alt="" />
                  </div>
                </div>
                <div className="ticker-info">
                  <div className="ticker-meta">
                    <span className="ticker-date">{formatDate(item.date, lang, t)}</span>
                    {item.tag && (
                      <span className={`ticker-tag ticker-tag--${item.tag}`}>
                        {t(`tag_${item.tag}`)}
                      </span>
                    )}
                  </div>
                  <span className="ticker-text">{item.title[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vinculação Institucional ── */}
      <section className="section affiliation">
        <div className="container">
          <h2 className="section-title">{t('affiliation_title')}</h2>
          <p className="section-subtitle">{t('affiliation_subtitle')}</p>
          <div className="affiliation-grid">
            <a href="https://www.uece.br" target="_blank" rel="noopener noreferrer" className="affiliation-card">
              <img
                src={assetUrl('/images/uece-logo.png')}
                alt="UECE"
                className="affiliation-logo"
              />
            </a>
            <a href="https://www.uece.br/ppgcc" target="_blank" rel="noopener noreferrer" className="affiliation-card">
              <img
                src={assetUrl('/images/ppgcc-logo.jpg')}
                alt="PPGCC"
                className="affiliation-logo"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
