/**
 * Shared card: 32px rounded corners, border. Used across Website, Ordering, Booking, Shopping, Neighborhoods, Business profile, Sales channels.
 * Variations: header (title, sub text, button), dividers (16px), rows (icon box 48×60 or 84×40, title, side text, pill, chevron), thumbnail-below-row.
 */
import './Card.css'

export function Card({ className = '', title, subtitle, headerAction, children, padding = true }) {
  return (
    <div className={`card ${padding ? 'card--padding' : ''} ${className}`}>
      {(title || headerAction) && (
        <div className="card-header">
          <div className="card-header-text">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && (
            <button
              type="button"
              className={`card-header-btn ${headerAction.primary ? 'card-header-btn--primary' : 'card-header-btn--secondary'}`}
              onClick={headerAction.onClick}
            >
              {headerAction.label}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export function CardDivider() {
  return <hr className="card-divider" />
}

/**
 * Row: icon box (size 'default' 48×60 or 'wide' 84×40), title, side text, pill, chevron.
 * iconContent: React node (e.g. initial, img, or text for 84×40)
 */
export function CardRow({ iconContent, iconSize = 'default', title, subtitle, sideText, pill, chevron, thumbnails, onClick, hasDividerAfter = true }) {
  const iconClass = iconSize === 'wide' ? 'card-row-icon-box card-row-icon-box--wide' : 'card-row-icon-box'
  return (
    <div className="card-row-wrapper">
      <div className={`card-row ${onClick ? 'card-row--clickable' : ''}`} onClick={onClick}>
        <div className={iconClass}>
          {iconContent}
        </div>
        <div className="card-row-content">
          <div className="card-row-title-group">
            <h4 className="card-row-title">{title}</h4>
            {subtitle && <span className="card-row-subtitle">{subtitle}</span>}
          </div>
          {sideText && <span className="card-row-side-text">{sideText}</span>}
          {pill && <span className={`card-row-pill ${pill.variant || 'live'}`}>{pill.label}</span>}
          {chevron && <span className="card-row-chevron">{chevron}</span>}
        </div>
      </div>
      {thumbnails && thumbnails.length > 0 && (
        <div className="card-row-thumbnails">
          {thumbnails.map((t, i) => (
            <div key={i} className="card-thumbnail" onClick={t.onClick}>
              {t.label && <span className="thumbnail-label">{t.label}</span>}
              {t.node}
            </div>
          ))}
        </div>
      )}
      {hasDividerAfter && <CardDivider />}
    </div>
  )
}

export default Card
