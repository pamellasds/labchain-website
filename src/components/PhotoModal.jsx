import { useEffect, useCallback, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import './PhotoModal.css'

export default function PhotoModal({ photos, onClose }) {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)

  const goNext = useCallback(() => {
    setCurrent(prev => (prev + 1) % photos.length)
  }, [photos.length])

  const goPrev = useCallback(() => {
    setCurrent(prev => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  if (!photos || photos.length === 0) return null

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="photo-modal-close" onClick={onClose} aria-label={t('close')}>
          &times;
        </button>

        <div className="photo-modal-content">
          <button className="photo-modal-arrow left" onClick={goPrev} aria-label="Previous">
            &#8249;
          </button>

          <img src={assetUrl(photos[current])} alt={`Foto ${current + 1}`} className="photo-modal-img" />

          <button className="photo-modal-arrow right" onClick={goNext} aria-label="Next">
            &#8250;
          </button>
        </div>

        <div className="photo-modal-counter">
          {current + 1} / {photos.length}
        </div>
      </div>
    </div>
  )
}
