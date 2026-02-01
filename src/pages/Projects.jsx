import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import { projects } from '../data/projects'
import './Projects.css'

export default function Projects() {
  const { lang, t } = useLanguage()

  const getName = (name) => (typeof name === 'string' ? name : name[lang])

  return (
    <div className="projects">
      <div className="page-header">
        <div className="container">
          <h1 className="section-title">{t('projects_title')}</h1>
          <p className="section-subtitle">{t('projects_subtitle')}</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-image-wrap">
                  <img
                    src={assetUrl(project.image)}
                    alt={getName(project.name)}
                    className="project-image"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.classList.add('no-image')
                    }}
                  />
                  <div className="project-image-fallback">
                    {getName(project.name).charAt(0)}
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-name">{getName(project.name)}</h3>
                  <p className="project-desc">{project.description[lang]}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      {t('view_project')} →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
