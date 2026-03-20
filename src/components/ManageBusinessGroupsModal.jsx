import { useState, useEffect, useRef } from 'react'
import BrandGroupDialog from './BrandGroupDialog'
import './ManageBusinessGroupsModal.css'

const BRAND_GROUP_COLORS = [
  '#7C3AED', '#2563EB', '#0891B2', '#059669',
  '#D97706', '#DC2626', '#DB2777', '#7C2D12',
  '#4338CA', '#0D9488', '#CA8A04', '#9333EA'
]

function EditorMoreMenu({ onDelete }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="manage-business-groups-more-wrap" ref={ref}>
      <button
        type="button"
        className="manage-business-groups-more-btn"
        onClick={() => setOpen((p) => !p)}
        aria-label="More actions"
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="4" cy="10" r="1.5" fill="currentColor" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          <circle cx="16" cy="10" r="1.5" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="manage-business-groups-more-menu" role="menu">
          <button
            type="button"
            className="manage-business-groups-more-item manage-business-groups-more-item--danger"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              onDelete()
            }}
          >
            Delete brand group
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {Array<{ id: string, name: string, businessIds?: string[] }>} props.brandGroups
 * @param {(next: typeof props.brandGroups) => void} props.onBrandGroupsChange
 * @param {Array<{ id: string, name: string, handle: string, enabled?: boolean }>} props.orgBusinesses
 * @param {Record<string, { name: string, color?: string, handle?: string }>} props.mergedBrandData
 * @param {Record<string, string>} props.brandLogos
 * @param {'returning' | 'new-1' | 'new-2'} props.customerViewMode
 * @param {(group: { id: string }) => void} [props.onEditGroupBranding] — full-screen edit for the group as its own brand
 * @param {string | null} [props.openToEditGroupId] — when modal opens, jump straight to Edit brand group for this id (consumed via onOpenToEditGroupConsumed)
 * @param {() => void} [props.onOpenToEditGroupConsumed]
 * @param {(message: string) => void} [props.onShowToast]
 */
function ManageBusinessGroupsModal({
  isOpen,
  onClose,
  brandGroups = [],
  onBrandGroupsChange,
  orgBusinesses = [],
  mergedBrandData = {},
  brandLogos = {},
  customerViewMode = 'returning',
  onEditGroupBranding,
  openToEditGroupId = null,
  onOpenToEditGroupConsumed,
  onShowToast
}) {
  const [groupEditor, setGroupEditor] = useState(null) // null | { mode: 'create' } | { mode: 'edit', group }
  const brandGroupEditorRef = useRef(null)
  const [editorCanSave, setEditorCanSave] = useState(false)

  useEffect(() => {
    if (!isOpen) setGroupEditor(null)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !openToEditGroupId) return
    const g = brandGroups.find((x) => x.id === openToEditGroupId)
    if (g) setGroupEditor({ mode: 'edit', group: { ...g } })
    onOpenToEditGroupConsumed?.()
  }, [isOpen, openToEditGroupId, brandGroups, onOpenToEditGroupConsumed])

  useEffect(() => {
    if (!isOpen || groupEditor) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, groupEditor, onClose])

  const handleSaveGroup = (payload) => {
    if (payload.id) {
      onBrandGroupsChange(
        brandGroups.map((g) => {
          if (g.id !== payload.id) return g
          return {
            ...g,
            name: payload.name,
            businessIds: payload.businessIds,
            color: payload.color !== undefined ? payload.color : g.color || '#7C3AED',
            about: payload.about !== undefined ? payload.about : g.about || ''
          }
        })
      )
    } else {
      const id = `bg-${Date.now().toString(36)}`
      const usedColors = new Set(brandGroups.map((g) => g.color))
      const nextColor = typeof payload.color === 'string'
        ? payload.color
        : BRAND_GROUP_COLORS.find((c) => !usedColors.has(c)) || BRAND_GROUP_COLORS[brandGroups.length % BRAND_GROUP_COLORS.length]
      onBrandGroupsChange([
        ...brandGroups,
        {
          id,
          name: payload.name,
          businessIds: payload.businessIds,
          color: nextColor,
          about: typeof payload.about === 'string' ? payload.about : ''
        }
      ])
    }
    onClose()
    onShowToast?.('Brand group saved.')
  }

  const handleDeleteGroupById = (id) => {
    onBrandGroupsChange(brandGroups.filter((g) => g.id !== id))
    onClose()
    onShowToast?.('Brand group deleted.')
  }

  const handleDeleteFromList = (id, displayName) => {
    const label = displayName || 'this brand group'
    if (typeof window !== 'undefined' && window.confirm(`Delete "${label}"? Any locations using this brand group will need to be reassigned.`)) {
      onBrandGroupsChange(brandGroups.filter((g) => g.id !== id))
    }
  }

  const handleBackFromEditor = () => setGroupEditor(null)

  if (!isOpen) return null

  const overlayClick = () => {
    if (groupEditor) {
      handleBackFromEditor()
      return
    }
    onClose()
  }

  const titleId = groupEditor ? 'manage-business-groups-editor-title' : 'manage-business-groups-title'
  const editorHeadline = groupEditor?.mode === 'edit' ? 'Edit brand group' : 'New brand group'

  return (
    <div className="manage-business-groups-overlay" role="presentation" onClick={overlayClick}>
      <div
        className={`manage-business-groups-modal${groupEditor ? ' manage-business-groups-modal--editor' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        {groupEditor ? (
          <div className="manage-business-groups-modal-editor-top">
            <div className="manage-business-groups-modal-editor-header-row">
              <button
                type="button"
                className="manage-business-groups-modal-close manage-business-groups-modal-back"
                onClick={handleBackFromEditor}
                aria-label="Back"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="manage-business-groups-modal-editor-actions" role="group" aria-label="Form actions">
                {groupEditor.mode === 'edit' && onEditGroupBranding && groupEditor.group && (
                  <button
                    type="button"
                    className="manage-business-groups-editor-action manage-business-groups-editor-action--secondary"
                    onClick={() =>
                      onEditGroupBranding(
                        brandGroups.find((x) => x.id === groupEditor.group.id) || groupEditor.group
                      )
                    }
                  >
                    Edit branding
                  </button>
                )}
                <button type="button" className="manage-business-groups-editor-action manage-business-groups-editor-action--primary" onClick={() => brandGroupEditorRef.current?.save()} disabled={!editorCanSave}>
                  Save
                </button>
                {groupEditor.mode === 'edit' && (
                  <EditorMoreMenu onDelete={() => brandGroupEditorRef.current?.deleteGroup()} />
                )}
              </div>
            </div>
            <div className="manage-business-groups-modal-editor-title-block">
              <h2 id={titleId} className="manage-business-groups-modal-editor-title">
                {editorHeadline}
              </h2>
              <p className="manage-business-groups-modal-editor-subtext">
                Brand groups let you apply the same branding across multiple businesses.
              </p>
            </div>
          </div>
        ) : (
          <div className="manage-business-groups-modal-top">
            <div className="manage-business-groups-modal-header-row">
              <button type="button" className="manage-business-groups-modal-close" onClick={onClose} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <button type="button" className="manage-business-groups-primary" onClick={() => setGroupEditor({ mode: 'create' })}>
                New brand group
              </button>
            </div>
            <h2 id={titleId} className="manage-business-groups-modal-title">
              Manage brand groups
            </h2>
          </div>
        )}

        {!groupEditor ? (
          <>
            <p className="manage-business-groups-modal-lede">Use brand groups for shared branding at locations.</p>

            <div className="manage-business-groups-section">
              {brandGroups.length === 0 ? (
                <p className="manage-business-groups-empty">No brand groups yet.</p>
              ) : (
                <ul className="manage-business-groups-list">
                  {brandGroups.map((g) => {
                    const n = (g.businessIds || []).length
                    const nameTrim = (g.name || '').trim()
                    return (
                      <li key={g.id} className="manage-business-groups-row">
                        <span className="manage-business-groups-row-avatar" style={{ background: g.color || '#7C3AED' }}>
                          {(nameTrim || 'U')[0].toUpperCase()}
                        </span>
                        <div className="manage-business-groups-row-main">
                          <span className={`manage-business-groups-row-name${nameTrim ? '' : ' manage-business-groups-row-name--placeholder'}`}>
                            {nameTrim || 'Unnamed brand group'}
                          </span>
                          <span className="manage-business-groups-row-meta">
                            {n === 0 ? 'No businesses' : `${n} business${n === 1 ? '' : 'es'}`}
                          </span>
                        </div>
                        <div className="manage-business-groups-row-actions">
                          <button type="button" className="manage-business-groups-row-btn" onClick={() => setGroupEditor({ mode: 'edit', group: { ...g } })}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="manage-business-groups-row-btn manage-business-groups-row-btn--danger"
                            onClick={() => handleDeleteFromList(g.id, nameTrim)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </>
        ) : (
          <div className="manage-business-groups-editor-body">
            <BrandGroupDialog
              ref={brandGroupEditorRef}
              embedded
              embeddedHostActions
              isOpen
              onClose={handleBackFromEditor}
              mode={groupEditor.mode}
              existingGroup={groupEditor.mode === 'edit' ? groupEditor.group : null}
              orgBusinesses={orgBusinesses}
              mergedBrandData={mergedBrandData}
              brandLogos={brandLogos}
              customerViewMode={customerViewMode}
              onSave={handleSaveGroup}
              onDelete={groupEditor.mode === 'edit' ? handleDeleteGroupById : undefined}
              onCanSaveChange={setEditorCanSave}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageBusinessGroupsModal
