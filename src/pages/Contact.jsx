import { useLanguage } from '../i18n/LanguageContext'
import './Contact.css'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <div className="contact">
      <div className="page-header">
        <div className="container">
          <h1 className="section-title">{t('contact_title')}</h1>
          <p className="section-subtitle">{t('contact_subtitle')}</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-main">
              <p className="contact-text">{t('contact_text')}</p>

              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="contact-icon">✉</div>
                  <div>
                    <h3>{t('contact_email')}</h3>
                    <p>labchain@uece.br</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h3>{t('contact_location')}</h3>
                    <p>{t('contact_location_value')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-collab">
              <h3 className="collab-title">{t('contact_collab_title')}</h3>
              <ul className="collab-list">
                <li>{t('contact_collab_1')}</li>
                <li>{t('contact_collab_2')}</li>
                <li>{t('contact_collab_3')}</li>
                <li>{t('contact_collab_4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
