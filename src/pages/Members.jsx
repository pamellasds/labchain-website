import { useLanguage } from '../i18n/LanguageContext'
import { assetUrl } from '../utils'
import { coordinator, researchers, collaborators } from '../data/members'
import './Members.css'

function MemberCard({ member }) {
  const { lang, t } = useLanguage()

  return (
    <div className="member-card">
      <div className="member-photo-wrap">
        <img
          src={assetUrl(member.photo)}
          alt={member.name}
          className="member-photo"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=ddebf7&color=195d82&size=200`
          }}
        />
      </div>
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-title">{member.title[lang]}</p>
        <p className="member-university">{member.university[lang]}</p>
        <div className="member-interests">
          <span className="interests-label">{t('members_interests')}:</span>
          <div className="interests-tags">
            {member.interests[lang].map((interest, i) => (
              <span key={i} className="interest-tag">{interest}</span>
            ))}
          </div>
        </div>
        <div className="member-links">
          {member.lattes && (
            <a href={member.lattes} target="_blank" rel="noopener noreferrer" className="member-link" title="Lattes">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm-2-15h4v1h-4V7zm0 2h4v1h-4V9zm-2 2h8v1H8v-1zm0 2h8v1H8v-1zm2 2h4v1h-4v-1z"/></svg>
              Lattes
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-link" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          )}
          {member.orcid && (
            <a href={member.orcid} target="_blank" rel="noopener noreferrer" className="member-link" title="ORCID">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.397-.759-3.722-3.853-3.722h-2.466z"/></svg>
              ORCID
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Members() {
  const { t } = useLanguage()

  return (
    <div className="members">
      <div className="page-header">
        <div className="container">
          <h1 className="section-title">{t('members_title')}</h1>
          <p className="section-subtitle">{t('members_subtitle')}</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Coordinator */}
          <h2 className="members-group-title">{t('members_coordinator')}</h2>
          <div className="members-grid coordinator-grid">
            <MemberCard member={coordinator} />
          </div>

          {/* Researchers */}
          <h2 className="members-group-title">{t('members_researchers')}</h2>
          <div className="members-grid">
            {researchers.map((m, i) => (
              <MemberCard key={i} member={m} />
            ))}
          </div>

          {/* Collaborators */}
          <h2 className="members-group-title">{t('members_collaborators')}</h2>
          <div className="members-grid">
            {collaborators.map((m, i) => (
              <MemberCard key={i} member={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
