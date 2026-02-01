import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import { activities } from '../data/news'
import PhotoModal from '../components/PhotoModal'
import './Activities.css'

const ITEMS_PER_PAGE = 3

const tagClasses = {
  evento: 'activity-tag--evento',
  premiacao: 'activity-tag--premiacao',
  publicacao: 'activity-tag--publicacao',
}

function formatDate(dateStr, lang, t) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const month = t(`month_${m - 1}`)
  return lang === 'pt'
    ? `${String(d).padStart(2, '0')} de ${month} de ${y}`
    : `${month} ${d}, ${y}`
}

export default function Activities() {
  const { lang, t } = useLanguage()
  const [modalPhotos, setModalPhotos] = useState(null)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE)
  const paged = activities.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const showMoments = (tag) => tag === 'evento' || tag === 'premiacao'

  return (
    <div className="activities">
      <div className="page-header">
        <div className="container">
          <h1 className="section-title">{t('activities_title')}</h1>
          <p className="section-subtitle">{t('activities_subtitle')}</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="activities-timeline">
            {paged.map((item) => (
              <article key={item.id} className="activity-card">
                <div className="activity-content">
                  <div className="activity-meta">
                    <span className="activity-date">{formatDate(item.date, lang, t)}</span>
                    {item.tag && (
                      <span className={`activity-tag ${tagClasses[item.tag] || ''}`}>
                        {t(`tag_${item.tag}`)}
                      </span>
                    )}
                  </div>
                  <h3 className="activity-title">{item.title[lang]}</h3>
                  <p className="activity-desc">{item.description[lang]}</p>
                  {showMoments(item.tag) && item.photos && item.photos.length > 0 && (
                    <div className="activity-moments">
                      <div className="activity-thumbs">
                        {item.photos.slice(0, 3).map((photo, i) => (
                          <img
                            key={i}
                            src={assetUrl(photo)}
                            alt=""
                            className="activity-thumb"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        ))}
                      </div>
                      <button
                        className="btn btn-sm btn-outline activity-photos-btn"
                        onClick={() => setModalPhotos(item.photos)}
                      >
                        {t('view_moments')}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-sm btn-outline"
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
              >
                {t('pagination_prev')}
              </button>
              <span className="pagination-info">{page + 1} / {totalPages}</span>
              <button
                className="btn btn-sm btn-outline"
                disabled={page === totalPages - 1}
                onClick={() => setPage(p => p + 1)}
              >
                {t('pagination_next')}
              </button>
            </div>
          )}
        </div>
      </div>

      {modalPhotos && (
        <PhotoModal photos={modalPhotos} onClose={() => setModalPhotos(null)} />
      )}
    </div>
  )
}
