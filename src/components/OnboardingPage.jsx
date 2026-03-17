import { useState, useEffect, useRef } from 'react'
import AppleMap from './AppleMap'
import jbLogo from '../assets/joy-bakeshop-logo.svg'
import './Dashboard.css'

const DUMMY_RESULTS = [
  { name: 'Joy Bakeshop', address: '3100 Lanier Dr NE, Brookhaven, GA 30319' },
  { name: 'Joy Bakery', address: '1414 Zenith Way, Oklahoma City OK, 69220' },
  { name: 'Joy Bakes Cakes', address: '90210 Moonbeam Dr, Beverly Hills CA, 33303' },
]

const BRAND_COLORS = ['#0000FF', '#00C853', '#E040FB']

function OnboardingPage({ brand, onEnterDashboard }) {
  const [phase, setPhase] = useState('intro')
  const [typedHeading, setTypedHeading] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])
  const [visibleResults, setVisibleResults] = useState(0)
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [selectedLogoIdx, setSelectedLogoIdx] = useState(0)
  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [brandTyped, setBrandTyped] = useState('')
  const inputRef = useRef(null)
  const searchTimerRef = useRef(null)

  useEffect(() => {
    const timers = []
    timers.push(setTimeout(() => setPhase('move-up'), 2800))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase !== 'move-up') return
    const fullText = "Let's build your business profile"
    let i = 0
    setTypedHeading('')
    const type = () => {
      if (i < fullText.length) {
        setTypedHeading(fullText.slice(0, i + 1))
        i++
        setTimeout(type, 30)
      } else {
        setTimeout(() => setPhase('input-ready'), 400)
      }
    }
    setTimeout(type, 600)
  }, [phase])

  useEffect(() => {
    if (phase === 'input-ready' && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [phase])

  useEffect(() => {
    if (!businessName.trim()) {
      setSearching(false)
      setResults([])
      setVisibleResults(0)
      return
    }
    setSearching(true)
    setResults([])
    setVisibleResults(0)

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    searchTimerRef.current = setTimeout(() => {
      setSearching(false)
      setResults(DUMMY_RESULTS)
    }, 1500)

    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current) }
  }, [businessName])

  useEffect(() => {
    if (results.length === 0) return
    let i = 0
    const show = () => {
      i++
      setVisibleResults(i)
      if (i < results.length) setTimeout(show, 150)
    }
    setTimeout(show, 100)
  }, [results])

  const handleSelectBusiness = (biz) => {
    setSelectedBusiness(biz)
    setPhase('brand-step')
  }

  useEffect(() => {
    if (phase !== 'brand-step') return
    const fullText = 'Create your brand card'
    let i = 0
    setBrandTyped('')
    const type = () => {
      if (i < fullText.length) {
        setBrandTyped(fullText.slice(0, i + 1))
        i++
        setTimeout(type, 30)
      }
    }
    setTimeout(type, 800)
  }, [phase])

  const monogram = (brand?.name || 'JB').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const brandColor = brand?.color || '#0000FF'

  const phaseClass = `onboarding-phase-${phase}`
  const showInput = phase === 'input-ready' || phase === 'brand-step'
  const showMoveUpContent = phase === 'move-up' || phase === 'input-ready' || phase === 'brand-step'

  return (
    <div className="onboarding-fullscreen">
      {phase !== 'brand-step' ? (
        <div className={`onboarding-stage ${phaseClass}`}>
          <button type="button" className="onboarding-logo-btn" onClick={() => onEnterDashboard?.()} aria-label="Go to home">
            <svg className="onboarding-square-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.652 0H5.348C2.394 0 0 2.394 0 5.347V26.651C0 29.606 2.394 32 5.348 32H26.652C29.606 32 32 29.606 32 26.651V5.347C32 2.394 29.606 0 26.652 0ZM26.181 24.495C26.181 25.427 25.427 26.183 24.495 26.183H7.508C6.576 26.183 5.821 25.427 5.821 24.495V7.507C5.821 6.575 6.576 5.819 7.508 5.819H24.495C25.427 5.819 26.181 6.575 26.181 7.507V24.495Z" fill="currentColor"/>
              <path d="M12.6 20.341C11.866 20.341 11.632 19.87 11.632 19.369V12.588C11.632 12.088 12.066 11.615 12.6 11.615H19.4C19.934 11.615 20.368 12.088 20.368 12.588V19.369C20.368 19.87 19.934 20.341 19.4 20.341H12.6Z" fill="currentColor"/>
            </svg>
            <svg className="onboarding-blink-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect className="onboarding-blink-body" x="2" y="2" width="20" height="20" rx="5" />
              <rect className="blink-eye blink-eye-left" x="8.66" y="8.11" width="1.67" height="2.78" rx="0.2" />
              <rect className="blink-eye blink-eye-right" x="17" y="8.11" width="1.67" height="2.78" rx="0.2" />
              <path className="blink-mouth" d="M6.47 14.78C6.94 15.1 7.45 15.33 7.96 15.52C8.97 15.9 10.48 16.26 12.55 16.26C14.63 16.26 16.14 15.9 17.15 15.52C17.66 15.33 18.16 15.1 18.61 14.78" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="onboarding-welcome-text">
            <h1 className={`onboarding-title ${showMoveUpContent ? 'onboarding-title--shrunk' : ''}`}>Welcome to Square</h1>
            {showMoveUpContent && (
              <p className="onboarding-heading-typed">{typedHeading}</p>
            )}
          </div>

          {showInput && (
            <div className="onboarding-input-area">
              <div className={`onboarding-field-wrapper ${businessName ? 'has-value' : ''}`}>
                {businessName && <label className="onboarding-field-label">What's your business name</label>}
                <input
                  ref={inputRef}
                  type="text"
                  className="onboarding-name-input"
                  placeholder="What's your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
                <button type="button" className={`onboarding-submit-btn ${businessName ? 'active' : ''}`} aria-label="Submit">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              {searching && (
                <div className="onboarding-searching">
                  <div className="onboarding-search-spinner"></div>
                  <span>searching for existing businesses that match...</span>
                </div>
              )}

              {results.length > 0 && !searching && (
                <div className="onboarding-results">
                  <p className="onboarding-results-label">Businesses with matching names</p>
                  {results.slice(0, visibleResults).map((biz, i) => (
                    <button key={i} type="button" className="onboarding-result-row" onClick={() => handleSelectBusiness(biz)}>
                      <div className="onboarding-result-info">
                        <span className="onboarding-result-name">{biz.name}</span>
                        <span className="onboarding-result-address">{biz.address}</span>
                      </div>
                      <svg className="onboarding-result-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="onboarding-brand-step">
          <div className="onboarding-brand-left">
            <button type="button" className="onboarding-logo-btn onboarding-logo-btn--small" onClick={() => onEnterDashboard?.()} aria-label="Go to home">
              <svg className="onboarding-blink-svg" style={{ opacity: 1 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className="onboarding-blink-body" x="2" y="2" width="20" height="20" rx="5" />
                <rect className="blink-eye blink-eye-left" x="8.66" y="8.11" width="1.67" height="2.78" rx="0.2" style={{ fill: 'var(--app-bg, #fff)', opacity: 1 }} />
                <rect className="blink-eye blink-eye-right" x="17" y="8.11" width="1.67" height="2.78" rx="0.2" style={{ fill: 'var(--app-bg, #fff)', opacity: 1 }} />
                <path className="blink-mouth" d="M6.47 14.78C6.94 15.1 7.45 15.33 7.96 15.52C8.97 15.9 10.48 16.26 12.55 16.26C14.63 16.26 16.14 15.9 17.15 15.52C17.66 15.33 18.16 15.1 18.61 14.78" strokeWidth="1.2" strokeLinecap="round" style={{ stroke: 'var(--app-bg, #fff)', opacity: 1 }} />
              </svg>
            </button>

            <div className="onboarding-biz-summary">
              <span className="onboarding-biz-summary-label">Business information</span>
              <div className="onboarding-biz-summary-row">
                <div className="onboarding-biz-summary-details">
                  <p className="onboarding-biz-detail-main">{selectedBusiness?.name || brand?.name} · ${brand?.handle?.replace('$', '') || 'joybakeshop'} · Bakery</p>
                  <p className="onboarding-biz-detail-sub">{selectedBusiness?.address || '3100 Lanier Dr NE, Brookhaven, GA 30319'}</p>
                  <p className="onboarding-biz-detail-sub">Mon-Fri 8am-8pm, Sat-Sun 9am-6pm</p>
                </div>
                <button type="button" className="onboarding-edit-btn">Edit</button>
              </div>
              <p className="onboarding-synced-note">
                <span>Synced from your Google Business Profile</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3M7 9h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </p>
            </div>

            <div className="onboarding-brand-divider"></div>

            <div className="onboarding-brand-card-section">
              <h2 className="onboarding-brand-heading">{brandTyped}</h2>

              <div className="onboarding-brand-logo-section">
                <label className="onboarding-brand-label">Logo</label>
                <div className="onboarding-logo-options">
                  <button type="button" className={`onboarding-logo-option ${selectedLogoIdx === 0 ? 'selected' : ''}`} onClick={() => setSelectedLogoIdx(0)}>
                    <div className="onboarding-logo-option-inner" style={{ background: brandColor }}>
                      <span className="onboarding-logo-monogram">{monogram}</span>
                    </div>
                  </button>
                  <button type="button" className={`onboarding-logo-option ${selectedLogoIdx === 1 ? 'selected' : ''}`} onClick={() => setSelectedLogoIdx(1)}>
                    <div className="onboarding-logo-option-inner" style={{ background: brandColor }}>
                      <img src={jbLogo} alt="Logo" className="onboarding-logo-img" />
                    </div>
                  </button>
                  <button type="button" className="onboarding-logo-option onboarding-logo-add">
                    <div className="onboarding-logo-option-inner onboarding-logo-option-add-inner">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                  </button>
                </div>
              </div>

              <div className="onboarding-brand-color-section">
                <label className="onboarding-brand-label">Background color</label>
                <div className="onboarding-color-options">
                  {BRAND_COLORS.map((c, i) => (
                    <button key={c} type="button" className={`onboarding-color-btn ${selectedColorIdx === i ? 'selected' : ''}`} onClick={() => setSelectedColorIdx(i)}>
                      <span className="onboarding-color-inner" style={{ background: c }}>
                        {selectedColorIdx === i && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </span>
                    </button>
                  ))}
                  <button type="button" className="onboarding-color-btn onboarding-color-add">
                    <span className="onboarding-color-inner onboarding-color-add-inner">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="onboarding-brand-actions">
              <button type="button" className="onboarding-back-btn" onClick={() => { setSelectedBusiness(null); setPhase('input-ready') }}>Back</button>
              <button type="button" className="onboarding-next-btn">Next</button>
            </div>
          </div>

          <div className="onboarding-brand-right">
            <div className="onboarding-brand-map">
              <AppleMap />
              <div className="onboarding-brand-map-pin">
                <div className="onboarding-map-brand-card" style={{ background: BRAND_COLORS[selectedColorIdx] }}>
                  {selectedLogoIdx === 0 ? (
                    <span className="onboarding-map-monogram">{monogram}</span>
                  ) : (
                    <img src={jbLogo} alt="" className="onboarding-map-logo-img" />
                  )}
                </div>
                <svg className="onboarding-map-pin-tail" width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <path d="M12 12L4 0H20L12 12Z" fill={BRAND_COLORS[selectedColorIdx]} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OnboardingPage
