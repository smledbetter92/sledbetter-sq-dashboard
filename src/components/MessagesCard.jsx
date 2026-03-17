import { useState } from 'react'
import './MessagesCard.css'
import './AnalyticsModal.css'
import ArrowRightIcon from '../assets/Product review 12/Right arrow.svg'
import ArrowLeftIcon from '../assets/Product review 12/Left arrow.svg'
import ChevronRightIcon from '../assets/Chevron right.svg'
import messagePhoneImage from '../assets/Product review 12/jb-message-phone.png'
import PlusIcon from '../assets/Product review 12/Plus16.svg'
import SendIcon from '../assets/Product review 12/send-icon.svg'
import messageImage1 from '../assets/Product review 12/message-image1.png'
import messageImage2 from '../assets/Product review 12/message-image2.png'
// Blast message images
import hcBlastImage from '../assets/Product review 12/hc-new-item.png'
import bfbBlastImage from '../assets/Product review 12/bfb-Granola.png'
import kjBlastImage from '../assets/Product review 12/kj-Amazon Acai Bowl.png'
import pscBlastImage from '../assets/Product review 12/psc-new-item.png'
import sotBlastImage from '../assets/Product review 12/sot-new-item.png'
import vcBlastImage from '../assets/Product review 12/vc-new-item-Crunchy Oatmeal.png'
const blastImages = {
  'joy-bakeshop': hcBlastImage, // Using HC as default
  'brooklyn-french-bakers': bfbBlastImage,
  'keva-juice': kjBlastImage,
  'spot-of-tea': sotBlastImage,
  'vanilla-cafe': vcBlastImage,
  'tea-monks': hcBlastImage, // Using HC as default
  'paper-son-coffee': pscBlastImage
}

function MessagesCard({ activeBrand = 'joy-bakeshop', pageState = 'day-one', customerViewMode = 'returning', externalCreateMessageOpen, onExternalCreateMessageClose, useV3Layout = false }) {
  const [createMessageOpen, setCreateMessageOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [messageTitle, setMessageTitle] = useState("Black Friday Promotion")
  const [messageText, setMessageText] = useState("Croissants are on the house today!")
  const [isShaking, setIsShaking] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const maxCharacters = 50
  const blastImage = blastImages[activeBrand] || hcBlastImage
  
  // Determine if modal should be open from either internal or external state
  const isModalOpen = createMessageOpen || externalCreateMessageOpen
  
  const handleOpenCreateMessage = () => {
    setCreateMessageOpen(true)
    setIsClosing(false)
  }
  
  const handleCloseCreateMessage = () => {
    setIsClosing(true)
    setTimeout(() => {
      setCreateMessageOpen(false)
      setIsClosing(false)
      if (onExternalCreateMessageClose) {
        onExternalCreateMessageClose()
      }
    }, 300)
  }
  
  const handleMessageChange = (e) => {
    const newText = e.target.value
    if (newText.length <= maxCharacters) {
      setMessageText(newText)
    } else {
      // Trigger shake when trying to type beyond limit
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 400)
    }
  }
  
  const getMessagesDescription = () => {
    if (pageState === 'day-one') {
      return "Create and automate messages to engage customers and drive sales."
    } else {
      return "Welcome messages engage new followers. Blast messages promote items and drive visits."
    }
  }

  if (useV3Layout) {
    return (
      <>
        <div className="card messages-card-v3">
          <div className="card-header">
            <div className="card-header-info">
              <h3 className="card-title">Messages</h3>
              <p className="card-subtitle">{getMessagesDescription()}</p>
            </div>
            <button type="button" className="card-action" onClick={handleOpenCreateMessage}>Create message</button>
          </div>
          <hr className="card-divider" />
          <div className="card-rows">
            <div className="card-row">
              <div className="v3-icon-container messages-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.707 16.793C23.8946 16.9805 24 17.2348 24 17.5C24 17.7321 23.9193 17.9558 23.7734 18.1338L23.707 18.207L19.207 22.707L17.793 21.293L20.5859 18.5H13V16.5H20.5859L17.793 13.707L19.207 12.293L23.707 16.793Z" fill="currentColor"/>
                  <path d="M12 12C13.346 12 14.6345 12.2115 15.8125 12.5986L15.1875 14.499C14.2138 14.1791 13.1367 14 12 14C7.84138 14 4.74385 16.3079 4.11816 19H11V21H3C2.44772 21 2 20.5523 2 20C2 15.3624 6.72559 12 12 12Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2.5C14.2091 2.5 16 4.29086 16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5ZM12 4.5C10.8954 4.5 10 5.39543 10 6.5C10 7.60457 10.8954 8.5 12 8.5C13.1046 8.5 14 7.60457 14 6.5C14 5.39543 13.1046 4.5 12 4.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h4 className="service-title">Welcome</h4>
              <span className="v3-service-subtitle">Welcome new followers</span>
              <span className="messages-status-badge messages-status-badge--active">
                <span className="messages-status-badge-dot" aria-hidden="true" />
                <span>Active</span>
              </span>
              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
            </div>

            {pageState !== 'day-one' && (
              <div className="card-row">
                <div className="v3-icon-container messages-icon-wrap">
                  <img src={blastImage} alt="" width="24" height="24" className="messages-blast-thumb" />
                </div>
                <h4 className="service-title">New item</h4>
                <span className="v3-service-subtitle">Sent March 16, 2025</span>
                <span className="messages-status-badge messages-status-badge--active">
                  <span className="messages-status-badge-dot" aria-hidden="true" />
                  <span>Active</span>
                </span>
                <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
              </div>
            )}
          </div>
        </div>

        {(isModalOpen || isClosing) && (
          <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleCloseCreateMessage}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-header-inner">
                  <button className="modal-close" onClick={handleCloseCreateMessage} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h2 className="modal-title">Create message</h2>
                  <div className="modal-actions">
                    <button className="modal-cancel" onClick={handleCloseCreateMessage}><span>Cancel</span></button>
                    <button className="modal-send"><span>Send</span></button>
                  </div>
                </div>
              </div>
              <div className="modal-content">
                <div className="modal-summary-wrapper">
                  <p className="modal-description">Customize and send your first message. Here&apos;s one that&apos;s likely to get solid engagement.</p>
                </div>
                <div className="modal-section create-message-section">
                  <div className="create-message-content">
                    <div className="message-form-card">
                      <h3 className="form-section-title">Create message</h3>
                      <div className="form-fields-group">
                        <div className="form-field">
                          <div className={`form-input-container ${messageTitle ? 'has-value' : ''}`}>
                            <label className="form-label">Message title</label>
                            <input type="text" className="form-input-text" value={messageTitle} onChange={(e) => setMessageTitle(e.target.value)} />
                          </div>
                        </div>
                        <div className="form-field">
                          <div className={`form-textarea-container ${isShaking ? 'shake' : ''}`}>
                            <label className="form-label">Your message</label>
                            <textarea className="form-textarea-text" value={messageText} onChange={handleMessageChange}></textarea>
                            <span className={`form-helper ${messageText.length >= maxCharacters ? 'max-reached' : ''}`}>{messageText.length} / {maxCharacters} characters</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-field">
                          <div className="form-info-box">
                            <div className="info-label-wrapper"><span className="info-label">Audience</span><span className="info-edit-text">Edit</span></div>
                            <div className="info-details"><div className="info-detail-label">Reachable customers</div><div className="info-value">8,427</div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Messages</h2>
        <p className="card-description">
          {getMessagesDescription()}
        </p>
        <button type="button" className="card-header-create-btn" onClick={handleOpenCreateMessage}>Create message</button>
      </div>

      <div className="card-section">
        <div className="automated-messages-section">
          <div className="subsection-header">
            <h3 className="subsection-title">Automated messages</h3>
          </div>
          <div className="message-row">
            <div className="message-item">
              <div className="message-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.707 16.793C23.8946 16.9805 24 17.2348 24 17.5C24 17.7321 23.9193 17.9558 23.7734 18.1338L23.707 18.207L19.207 22.707L17.793 21.293L20.5859 18.5H13V16.5H20.5859L17.793 13.707L19.207 12.293L23.707 16.793Z" fill="#101010"/>
                  <path d="M12 12C13.346 12 14.6345 12.2115 15.8125 12.5986L15.1875 14.499C14.2138 14.1791 13.1367 14 12 14C7.84138 14 4.74385 16.3079 4.11816 19H11V21H3C2.44772 21 2 20.5523 2 20C2 15.3624 6.72559 12 12 12Z" fill="#101010"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2.5C14.2091 2.5 16 4.29086 16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5ZM12 4.5C10.8954 4.5 10 5.39543 10 6.5C10 7.60457 10.8954 8.5 12 8.5C13.1046 8.5 14 7.60457 14 6.5C14 5.39543 13.1046 4.5 12 4.5Z" fill="#101010"/>
                </svg>
              </div>
              <div className="message-content">
                <div className="message-info">
                  <span className="message-name">Welcome</span>
                  <span className="message-description">Welcome new followers</span>
                </div>
              </div>
              <div className="message-trailing">
                <span className="status-badge">Active</span>
                <img src={ArrowRightIcon} alt="" className="hover-arrow" width="16" height="16" />
              </div>
            </div>
          </div>
        </div>

        <div className="blast-messages-section">
          <div className="subsection-header">
            <h3 className="subsection-title">Blast messages</h3>
          </div>
          {pageState !== 'day-one' && (
          <div className="message-row">
            <div className="message-item">
              <img src={blastImage} alt="New item" className="message-icon-image" />
              <div className="message-content">
                <div className="message-info">
                  <span className="message-name">New item</span>
                  <span className="message-description">Sent March 16, 2025</span>
                </div>
              </div>
              <div className="message-trailing">
                <span className="status-badge active-badge">Active</span>
                <img src={ArrowRightIcon} alt="" className="hover-arrow" width="16" height="16" />
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {(isModalOpen || isClosing) && (
        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleCloseCreateMessage}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-inner">
                <button className="modal-close" onClick={handleCloseCreateMessage} aria-label="Close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <h2 className="modal-title">Create message</h2>
                <div className="modal-actions">
                  <button className="modal-cancel" onClick={handleCloseCreateMessage}>
                    <span>Cancel</span>
                  </button>
                  <button className="modal-send">
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-content">
              <div className="modal-summary-wrapper">
                <p className="modal-description">
                  Customize and send your first message. Here's one that's likely to get solid engagement.
                </p>
              </div>

              <div className="modal-section create-message-section">
                <div className="create-message-content">
                  <div className="message-form-card">
                    <h3 className="form-section-title">Create message</h3>
                    
                    <div className="form-fields-group">
                      <div className="form-field">
                        <div className={`form-input-container ${messageTitle ? 'has-value' : ''}`}>
                          <label className="form-label">Message title</label>
                          <input 
                            type="text" 
                            className="form-input-text" 
                            value={messageTitle}
                            onChange={(e) => setMessageTitle(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <div className={`form-textarea-container ${isShaking ? 'shake' : ''}`}>
                          <label className="form-label">Your message</label>
                          <textarea 
                            className="form-textarea-text" 
                            value={messageText}
                            onChange={handleMessageChange}
                          ></textarea>
                          <span className={`form-helper ${messageText.length >= maxCharacters ? 'max-reached' : ''}`}>
                            {messageText.length} / {maxCharacters} characters
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <div className="form-info-box">
                          <div className="info-label-wrapper">
                            <span className="info-label">Audience</span>
                            <span className="info-edit-text">Edit</span>
                          </div>
                          <div className="info-details">
                            <div className="info-detail-label">Reachable customers</div>
                            <div className="info-value">8,427</div>
                          </div>
                        </div>
                      </div>

                      <div className="form-field">
                        <div className="form-info-box">
                          <div className="info-label-wrapper">
                            <span className="info-label">Reward</span>
                            <span className="info-edit-text">Edit</span>
                          </div>
                          <div className="info-details">
                            <div className="info-detail-label">Free item</div>
                            <div className="info-value">Almond croissant</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-field-image">
                      <div className="form-image-label">Add an image</div>
                      <div className="image-upload">
                        <div 
                          className={`image-preview ${selectedImageIndex === 0 ? 'selected' : ''}`}
                          onClick={() => setSelectedImageIndex(0)}
                        >
                          <img src={messageImage1} alt="Preview 1" />
                        </div>
                        <div 
                          className={`image-preview ${selectedImageIndex === 1 ? 'selected' : ''}`}
                          onClick={() => setSelectedImageIndex(1)}
                        >
                          <img src={messageImage2} alt="Preview 2" />
                        </div>
                        <button className="image-upload-button">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#101010"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="message-preview-card">
                    <div className="preview-phone">
                      <img src={messagePhoneImage} alt="Message preview" className="phone-image" />
                    </div>
                    <div className="preview-controls">
                      <button className="preview-arrow">
                        <img src={ArrowLeftIcon} alt="Previous" width="16" height="16" />
                      </button>
                      <div className="preview-label">In app preview</div>
                      <button className="preview-arrow">
                        <img src={ArrowRightIcon} alt="Next" width="16" height="16" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="modal-footer-inner">
                <button className="prompt-plus-button" aria-label="Add">
                  <img src={PlusIcon} alt="Add" width="16" height="16" />
                </button>
                <input 
                  type="text" 
                  className="prompt-input" 
                  placeholder="Ask anything about messages"
                />
                <button className="prompt-send-button" aria-label="Send">
                  <img src={SendIcon} alt="Send" width="16" height="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesCard

