import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import multiBrandIcon from '../assets/multi-brand.svg'
import './BrandGroupDialog.css'

/**
 * @typedef {{ save: () => void, deleteGroup: () => void }} BrandGroupDialogHandle
 */

/**
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {'create' | 'edit'} props.mode
 * @param {{ id: string, name: string, businessIds?: string[] } | null} props.existingGroup
 * @param {Array<{ id: string, name: string, handle: string, enabled?: boolean }>} props.orgBusinesses
 * @param {Record<string, { name: string, color?: string, handle?: string }>} props.mergedBrandData
 * @param {Record<string, string>} props.brandLogos
 * @param {'returning' | 'new-1' | 'new-2'} props.customerViewMode
 * @param {(payload: { id?: string, name: string, businessIds: string[] }) => void} props.onSave
 * @param {(id: string) => void} [props.onDelete]
 * @param {boolean} [props.embedded] — no overlay or outer card; omit title/lede (host supplies chrome)
 * @param {boolean} [props.embeddedHostActions] — when embedded, hide footer; parent calls ref.save() / ref.deleteGroup()
 * @param {(canSave: boolean) => void} [props.onCanSaveChange] — called when save validity changes
 */
const BrandGroupDialog = forwardRef(function BrandGroupDialog(
  {
    isOpen,
    onClose,
    mode,
    existingGroup = null,
    orgBusinesses = [],
    mergedBrandData = {},
    brandLogos = {},
    customerViewMode = 'returning',
    onSave,
    onDelete,
    embedded = false,
    embeddedHostActions = false,
    onCanSaveChange
  },
  ref
) {
  const enabledBusinesses = orgBusinesses.filter((b) => b.enabled !== false && mergedBrandData[b.id])
  const [name, setName] = useState('')
  const [selectedIds, setSelectedIds] = useState(() => new Set())

  useEffect(() => {
    if (!isOpen) return
    setName(existingGroup?.name ?? '')
    setSelectedIds(new Set(existingGroup?.businessIds ?? []))
  }, [isOpen, existingGroup])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const canSave = name.trim().length > 0

  useEffect(() => {
    onCanSaveChange?.(canSave)
  }, [canSave, onCanSaveChange])

  const handleSave = useCallback(() => {
    const trimmed = name.trim()
    if (!trimmed) return
    const businessIds = [...selectedIds]
    if (mode === 'edit' && existingGroup?.id) {
      onSave({
        id: existingGroup.id,
        name: trimmed,
        businessIds,
        color: existingGroup.color ?? '#7C3AED',
        about: existingGroup.about ?? ''
      })
    } else {
      onSave({ name: trimmed, businessIds })
    }
  }, [name, selectedIds, mode, existingGroup, onSave])

  const handleDelete = useCallback(() => {
    if (!existingGroup?.id || !onDelete) return
    if (typeof window !== 'undefined' && window.confirm('Delete this brand group? Any locations using this brand group will need to be reassigned.')) {
      onDelete(existingGroup.id)
    }
  }, [existingGroup, onDelete])

  useImperativeHandle(
    ref,
    () => ({
      save: handleSave,
      deleteGroup: handleDelete,
      canSave
    }),
    [handleSave, handleDelete, canSave]
  )

  if (!isOpen) return null

  const toggleBiz = (businessId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(businessId)) next.delete(businessId)
      else next.add(businessId)
      return next
    })
  }

  const showMono = customerViewMode === 'new-1' || customerViewMode === 'new-2'

  const showFooterActions = !(embedded && embeddedHostActions)

  const body = (
    <>
      {!embedded && (
        <>
          <h2 id="brand-group-dialog-title" className="brand-group-dialog-title">
            {mode === 'edit' ? 'Edit brand group' : 'New brand group'}
          </h2>
          <p className="brand-group-dialog-lede">Choose a name and which businesses belong in this brand group for shared locations.</p>
        </>
      )}

      <div className="v3-form-fields">
        <div className={`form-input-container${name.trim() ? ' has-value' : ''}`}>
          <label className="form-label" htmlFor="brand-group-name-input">
            Brand group name
          </label>
          <input
            id="brand-group-name-input"
            type="text"
            className="form-input-text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <fieldset
        className="brand-group-dialog-fieldset"
        aria-labelledby="brand-group-businesses-heading"
      >
        <div id="brand-group-businesses-heading" className="brand-group-dialog-fieldset-heading">
          Businesses in this brand group
        </div>
        {enabledBusinesses.length === 0 ? (
          <p className="brand-group-dialog-empty">No businesses available in your organization.</p>
        ) : (
          <ul className="brand-group-dialog-checklist">
            {enabledBusinesses.map((b) => {
              const bd = mergedBrandData[b.id]
              const checked = selectedIds.has(b.id)
              const logo = brandLogos[b.id] || multiBrandIcon
              const mono =
                b.name.split(' ').length >= 2
                  ? (b.name.split(' ')[0][0] + b.name.split(' ')[1][0]).toUpperCase()
                  : b.name.substring(0, 2).toUpperCase()
              const handleStr = b.handle?.startsWith('$') ? b.handle : `$${b.handle || ''}`
              return (
                <li key={b.id}>
                  <label className="brand-group-dialog-check-row">
                    <input type="checkbox" checked={checked} onChange={() => toggleBiz(b.id)} />
                    <span className="brand-group-dialog-check-media">
                      {showMono ? (
                        <span className="brand-group-dialog-check-mono" style={{ background: bd?.color || '#6B7280' }}>
                          {mono}
                        </span>
                      ) : (
                        <img src={logo} alt="" width={22} height={22} />
                      )}
                    </span>
                    <span className="brand-group-dialog-check-text">
                      <span className="brand-group-dialog-check-name">{bd?.name || b.name}</span>
                      <span className="brand-group-dialog-check-handle">{handleStr}</span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        )}
      </fieldset>

      {showFooterActions && (
        <div className="brand-group-dialog-actions">
          {mode === 'edit' && onDelete && (
            <button type="button" className="brand-group-dialog-delete" onClick={handleDelete}>
              Delete brand group
            </button>
          )}
          <div className="brand-group-dialog-actions-main">
            <button type="button" className="brand-group-dialog-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="brand-group-dialog-save" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  )

  if (embedded) {
    return (
      <div className="brand-group-dialog brand-group-dialog--embedded" onClick={(e) => e.stopPropagation()}>
        {body}
      </div>
    )
  }

  return (
    <div className="brand-group-dialog-overlay" role="presentation" onClick={onClose}>
      <div
        className="brand-group-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-group-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        {body}
      </div>
    </div>
  )
})

BrandGroupDialog.displayName = 'BrandGroupDialog'

export default BrandGroupDialog
