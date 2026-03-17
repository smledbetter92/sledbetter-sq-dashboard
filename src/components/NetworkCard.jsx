import { useState, useRef, useEffect } from 'react'
import CaretDownIcon from '../assets/16/caret-down.svg'
import TrendTriangleUp from '../assets/Product review 12/Trend triangle up.svg'
import MapImage from '../assets/mapnetwork.png'
import BrandPinIcon from '../assets/brandpin.svg'
import './NetworkCard.css'

function NetworkCard({ customerViewMode = 'returning', locationInHeader = false, selectedLocation = 'Brookhaven' }) {
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false)
  const locationDropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(e.target)) {
        setLocationDropdownOpen(false)
      }
    }
    if (locationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [locationDropdownOpen])

  const isNew = (customerViewMode === 'new-1' || customerViewMode === 'new-2')
  const headerDescription = isNew
    ? "Your neighborhood network is now live. Customers can discover and follow you in the Cash App Neighborhoods tab."
    : "Your neighborhood network is now live. You're tapped into 12% of your network."

  return (
    <div className="card network-card-v3">
      <div className="card-header">
        <div className="card-header-info">
          <h3 className="card-title">Network</h3>
          <p className="card-subtitle network-card-subtext">{headerDescription}</p>
        </div>
        {!locationInHeader && (
          <div className="network-card-location-wrap" ref={locationDropdownRef}>
            <button
              type="button"
              className="page-title-location-btn network-location-btn"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              aria-expanded={locationDropdownOpen}
            >
              <span className="page-title-location-text">{selectedLocation}</span>
              <img src={CaretDownIcon} alt="" width="16" height="16" className="page-title-location-chevron" />
            </button>
            {locationDropdownOpen && (
              <div className="popover-menu network-location-popover">
                <div className="popover-option selected" onClick={() => setLocationDropdownOpen(false)}>
                  <span className="option-label">Brookhaven</span>
                  <div className="radio-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="#101010"/>
                      <circle cx="10" cy="10" r="3" fill="#FFFFFF"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <hr className="card-divider" />
      <div className="network-card-body">
        <div className="network-map-container">
          <img src={MapImage} alt="Network map" className="network-map-image" />
          <div className="network-map-pin-center" aria-hidden="true">
            <img src={BrandPinIcon} alt="" className="network-map-brandpin" />
          </div>
          <div className="network-map-overlay">
            <div className="network-map-overlay-row">
              <span className="network-map-overlay-line">Cash App locals 315,000</span>
              <span className="network-na-pill">
                <span>N/A</span>
                <img src={TrendTriangleUp} alt="" className="trend-triangle-up" width="16" height="16" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkCard
