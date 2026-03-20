import { useState, useEffect } from 'react'
import multiBrandIcon from '../assets/multi-brand.svg'
import './BrandGroupBrandingModal.css'

/** Same preset row as single-business edit (joy-bakeshop default) for a consistent color picker. */
const GROUP_BRAND_COLOR_PRESETS = ['#0000FF', '#3D5AFE', '#82B1FF', '#1A237E']

/**
 * Full-screen editor for a brand group's branding — mirrors the single-business edit layout (Branding + Business information).
 */
function BrandGroupBrandingModal({
  isOpen,
  isClosing,
  onClose,
  group,
  mergedBrandData = {},
  brandLogos = {},
  orgBusinesses = [],
  customerViewMode = 'returning',
  onSave
}) {
  const [activeSection, setActiveSection] = useState('brand')
  const [displayName, setDisplayName] = useState('')
  const [about, setAbout] = useState('')
  const [color, setColor] = useState('#7C3AED')

  useEffect(() => {
    if (!isOpen || !group) return
    setDisplayName((group.name || '').trim())
    setAbout(typeof group.about === 'string' ? group.about : '')
    setColor(typeof group.color === 'string' && group.color ? group.color : '#7C3AED')
    setActiveSection('brand')
  }, [isOpen, group])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen || !group) return null

  const showMono = customerViewMode === 'new-1' || customerViewMode === 'new-2'
  const words = (displayName || 'Group').trim().split(/\s+/).filter(Boolean)
  const monogram =
    words.length >= 2
      ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
      : (displayName || 'G').substring(0, 2).toUpperCase()

  const handleSave = () => {
    onSave?.({
      id: group.id,
      name: displayName.trim(),
      about: about.trim(),
      color,
      businessIds: group.businessIds || []
    })
  }

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className="modal-container business-edit-modal brand-group-branding-modal">
        <div className="modal-header">
          <div className="modal-header-inner">
            <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h2 className="modal-title">{displayName.trim() || group.name?.trim() || 'Business'}</h2>
            <div className="modal-actions">
              <button type="button" className="modal-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="modal-send" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="location-modal-body">
          <nav className="location-modal-sidebar location-modal-sidebar-left v3-business-edit-sidebar">
            <button
              type="button"
              className={`v3-business-edit-nav-item v3-business-edit-nav-text-only ${activeSection === 'brand' ? 'active' : ''}`}
              onClick={() => setActiveSection('brand')}
            >
              <span>Branding</span>
            </button>
            <button
              type="button"
              className={`v3-business-edit-nav-item v3-business-edit-nav-text-only ${activeSection === 'business-info' ? 'active' : ''}`}
              onClick={() => setActiveSection('business-info')}
            >
              <span>Business information</span>
            </button>
          </nav>

          <div className="modal-content fading-in v3-edit-content">
            {activeSection === 'brand' && (
              <div id="brand-section" className="v3-edit-section">
                <div className="card card-modal card--no-divider">
                  <div className="card-header">
                    <div className="card-header-info">
                      <h3 className="card-title">Logo</h3>
                      <p className="card-subtitle">Upload or choose a logo for your brand card</p>
                    </div>
                  </div>
                  <div className="v3-form-fields">
                    <div className="v3-brand-card-preview v4-brand-card-preview-large">
                      <div className="v4-preview-brand-card" style={{ background: color }}>
                        {showMono ? (
                          <span className="v4-preview-monogram-text">{monogram}</span>
                        ) : (
                          <img src={multiBrandIcon} alt="" className="v4-preview-logo-img" style={{ width: 48, height: 48 }} />
                        )}
                      </div>
                    </div>
                    <div className="v3-logo-field">
                      <label className="form-label">Logo</label>
                      <div className="image-upload">
                        <div className="image-preview v4-logo-thumb selected">
                          <div className="v4-logo-thumb-monogram" style={{ background: color }}>
                            <span>{monogram}</span>
                          </div>
                        </div>
                        <div className="image-preview v4-logo-thumb">
                          <img src={multiBrandIcon} alt="" />
                        </div>
                        <button type="button" className="image-upload-button v4-logo-thumb" aria-label="Add logo">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#101010" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-modal card--no-divider">
                  <div className="card-header">
                    <div className="card-header-info">
                      <h3 className="card-title">Color</h3>
                      <p className="card-subtitle">Choose a background color for your brand card</p>
                    </div>
                  </div>
                  <div className="v3-form-fields">
                    <div className="v4-color-field">
                      <label className="form-label">Brand colors</label>
                      <div className="v4-color-circles-row">
                        {GROUP_BRAND_COLOR_PRESETS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            className={`v4-color-circle-btn${color === c ? ' selected' : ''}`}
                            onClick={() => setColor(c)}
                            aria-label={`Color ${c}`}
                          >
                            <span className="v4-color-circle-inner" style={{ background: c }} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'business-info' && (
              <div id="business-info-section" className="v3-edit-section">
                <div className="card card-modal card--no-divider">
                  <div className="card-header">
                    <div className="card-header-info">
                      <h3 className="card-title">Business name</h3>
                      <p className="card-subtitle">Your business identity</p>
                    </div>
                  </div>
                  <div className="v3-form-fields">
                    <div className={`form-input-container${displayName.trim() ? ' has-value' : ''}`}>
                      <label className="form-label" htmlFor="bg-display-business-name">
                        Display business name
                      </label>
                      <input
                        id="bg-display-business-name"
                        type="text"
                        className="form-input-text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                <div className="card card-modal card--no-divider">
                  <div className="card-header">
                    <div className="card-header-info">
                      <h3 className="card-title">About</h3>
                      <p className="card-subtitle">Tell customers about your business</p>
                    </div>
                  </div>
                  <div className="v3-form-fields">
                    <div className={`form-input-container${about.trim() ? ' has-value' : ''} v3-textarea-field`}>
                      <label className="form-label" htmlFor="bg-about-description">
                        Description
                      </label>
                      <textarea
                        id="bg-about-description"
                        className="form-input-text v3-textarea"
                        rows={4}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandGroupBrandingModal
