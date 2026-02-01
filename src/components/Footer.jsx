import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={assetUrl('/logo.png')} alt="Labchain" className="footer-logo" />
          <p className="footer-university">{t('footer_uece')}</p>
        </div>

        <div className="footer-nav">
          <Link to="/">{t('nav_home')}</Link>
          <Link to="/pesquisas">{t('nav_research')}</Link>
          <Link to="/membros">{t('nav_members')}</Link>
          <Link to="/atividades">{t('nav_activities')}</Link>
          <Link to="/projetos">{t('nav_projects')}</Link>
          <Link to="/contato">{t('nav_contact')}</Link>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Labchain. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  )
}
