import './ConfirmDialog.css'

function ConfirmDialog({ isOpen, isClosing, title, children, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel, variant = 'default' }) {
  if (!isOpen && !isClosing) return null

  return (
    <div className={`confirm-dialog-overlay ${isClosing ? 'closing' : ''}`} onClick={onCancel}>
      <div className={`confirm-dialog ${isClosing ? 'closing' : ''} confirm-dialog--${variant}`} onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-dialog-title">{title}</h3>
        <div className="confirm-dialog-body">{children}</div>
        <div className="confirm-dialog-actions">
          <button type="button" className="confirm-dialog-cancel" onClick={onCancel}>{cancelLabel}</button>
          <button type="button" className={`confirm-dialog-confirm confirm-dialog-confirm--${variant}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
