import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import { publications } from '../data/publications'
import './Research.css'

export default function Research() {
  const { t } = useLanguage()
  const years = publications.map(p => p.year)
  const [activeYear, setActiveYear] = useState(years[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveYear(Number(entry.target.dataset.year))
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    document.querySelectorAll('.research-year-group').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToYear = (year) => {
    const el = document.getElementById(`year-${year}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="research">
      <div className="page-header">
        <div className="container">
          <h1 className="section-title">{t('research_title')}</h1>
          <p className="section-subtitle">{t('research_subtitle')}</p>
        </div>
      </div>

      <div className="section">
        <div className="container research-layout">
          <aside className="research-sidebar">
            <nav className="year-nav">
              {years.map(year => (
                <button
                  key={year}
                  className={`year-nav-btn ${activeYear === year ? 'active' : ''}`}
                  onClick={() => scrollToYear(year)}
                >
                  {year}
                </button>
              ))}
            </nav>
          </aside>

          <div className="research-main">
            {publications.map(({ year, papers }) => (
              <div
                key={year}
                id={`year-${year}`}
                data-year={year}
                className="research-year-group"
              >
                <h2 className="research-year">{year}</h2>
                <div className="research-papers">
                  {papers.map((paper, i) => (
                    <article key={i} className="paper-card">
                      <div className="paper-content">
                        <h3 className="paper-title">
                          {paper.title}
                          {paper.award && (
                            <span className="paper-award">
                              {paper.award}
                            </span>
                          )}
                        </h3>
                        <p className="paper-authors">{paper.authors}</p>
                        <p className="paper-venue">{paper.venue}</p>
                      </div>
                      <div className="paper-links">
                        {paper.preprint && (
                          <a href={assetUrl(paper.preprint)} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                            {t('view_preprint')}
                          </a>
                        )}
                        {paper.publisherUrl && (
                          <a href={paper.publisherUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                            {t('view_publisher')}
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
