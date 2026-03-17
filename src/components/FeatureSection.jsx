import { useState } from 'react'
import './FeatureSection.css'

/**
 * FeatureSection Component
 * 
 * Renders a feature (Location, Online Ordering, Voice Ordering, Table Ordering) in one of 3 states:
 * - State 1 (Configure): Summarized grey cards during initial setup, user reviews defaults
 * - State 2 (Completed): Collapsed summary card with checkmark after clicking "Next"
 * - State 3 (Expanded): Full detailed settings with all subsections
 * 
 * Props:
 * - featureId: 'location' | 'online-ordering' | 'voice-ordering' | 'table-ordering'
 * - state: 'configure' | 'completed' | 'expanded'
 * - data: Feature-specific data object
 * - onEdit: Callback when edit button is clicked
 * - onSave: Callback when save button is clicked (in expanded state)
 * - onNext: Callback when next button is clicked (in configure state)
 * - context: 'step-flow' | 'edit-modal' - determines save behavior
 */

const FeatureSection = ({ 
  featureId, 
  state = 'configure', 
  data = {}, 
  onEdit,
  onSave,
  onNext,
  context = 'step-flow'
}) => {
  
  // Render State 1: Configure (Summarized grey cards)
  const renderConfigureState = () => {
    switch (featureId) {
      case 'location':
        return renderLocationConfigure()
      case 'online-ordering':
        return renderOnlineOrderingConfigure()
      case 'voice-ordering':
        return renderVoiceOrderingConfigure()
      case 'table-ordering':
        return renderTableOrderingConfigure()
      default:
        return null
    }
  }
  
  // Render State 2: Completed (Summary card)
  const renderCompletedState = () => {
    return (
      <div className="feature-completed-card">
        <div className="feature-completed-header">
          <div className="feature-completed-label-row">
            <img src="/path/to/checkmark.svg" alt="" className="feature-completed-checkmark" />
            <span className="feature-completed-label">{data.completedLabel || 'Completed'}</span>
          </div>
          <button className="feature-completed-edit-button" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    )
  }
  
  // Render State 3: Expanded (Full settings)
  const renderExpandedState = () => {
    switch (featureId) {
      case 'location':
        return renderLocationExpanded()
      case 'online-ordering':
        return renderOnlineOrderingExpanded()
      case 'voice-ordering':
        return renderVoiceOrderingExpanded()
      case 'table-ordering':
        return renderTableOrderingExpanded()
      default:
        return null
    }
  }
  
  // Location - Configure State
  const renderLocationConfigure = () => {
    return (
      <div className="feature-configure-content">
        {/* Grey card: Neighborhood */}
        <div className="feature-grey-card" onClick={() => onEdit && onEdit('neighborhood')}>
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Neighborhood</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <span className="feature-grey-card-detail">{data.nickname || 'Brookhaven'}</span>
        </div>
        
        {/* Grey card: Address */}
        <div className="feature-grey-card" onClick={() => onEdit && onEdit('address')}>
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Address</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <span className="feature-grey-card-detail">{data.address || '3100 Lanier Dr NE, Atlanta, GA 30319'}</span>
        </div>
        
        {/* Grey card: Phone */}
        <div className="feature-grey-card" onClick={() => onEdit && onEdit('phone')}>
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Phone</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <span className="feature-grey-card-detail">{data.phone || '(404) 555-0123'}</span>
        </div>
        
        {/* Grey card: Hours */}
        <div className="feature-grey-card" onClick={() => onEdit && onEdit('hours')}>
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Hours</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <span className="feature-grey-card-detail">{data.hours || 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm'}</span>
        </div>
      </div>
    )
  }
  
  // Location - Expanded State
  const renderLocationExpanded = () => {
    return (
      <div className="feature-expanded-content">
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Location Details</h3>
          {/* Full location settings go here */}
          <p>Full location editing interface (to be implemented)</p>
        </div>
      </div>
    )
  }
  
  // Online Ordering - Configure State
  const renderOnlineOrderingConfigure = () => {
    return (
      <div className="feature-configure-content">
        {/* Grey card: Menus */}
        <div className="feature-grey-card" onClick={() => onEdit && onEdit('menus')}>
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Menus</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <span className="feature-grey-card-detail">Lunch, Dinner</span>
        </div>
        
        {/* Grey card: Pickup */}
        <div className="feature-grey-card" onClick={() => onEdit && onEdit('pickup')}>
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Pickup</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <div className="feature-grey-card-details-col">
            <span className="feature-grey-card-detail black">15-minute prep time</span>
            <span className="feature-grey-card-detail black">Limited to hours</span>
            <span className="feature-grey-card-detail">No order caps or scheduling</span>
          </div>
        </div>
        
        {/* Grey card: Delivery */}
        <div className="feature-grey-card" onClick={() => onEdit && onEdit('delivery')}>
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Delivery</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <div className="feature-grey-card-details-col">
            <span className="feature-grey-card-detail black">15-minute prep time</span>
            <span className="feature-grey-card-detail black">Limited to hours</span>
            <span className="feature-grey-card-detail">No order caps or scheduling</span>
          </div>
        </div>
      </div>
    )
  }
  
  // Online Ordering - Expanded State
  const renderOnlineOrderingExpanded = () => {
    return (
      <div className="feature-expanded-content">
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Menus</h3>
          {/* Full menus settings go here */}
          <p>Full menus editing interface (to be implemented)</p>
        </div>
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Pickup</h3>
          {/* Full pickup settings go here */}
          <p>Full pickup editing interface (to be implemented)</p>
        </div>
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Delivery</h3>
          {/* Full delivery settings go here */}
          <p>Full delivery editing interface (to be implemented)</p>
        </div>
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Order Timing</h3>
          {/* Full order timing settings go here */}
          <p>Full order timing editing interface (to be implemented)</p>
        </div>
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Ticket Printing</h3>
          {/* Full ticket printing settings go here */}
          <p>Full ticket printing editing interface (to be implemented)</p>
        </div>
      </div>
    )
  }
  
  // Voice Ordering - Configure State
  const renderVoiceOrderingConfigure = () => {
    return (
      <div className="feature-configure-content">
        <div className="feature-grey-card">
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">Phone Number</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <span className="feature-grey-card-detail">{data.phone || '(404) 555-0123'}</span>
        </div>
      </div>
    )
  }
  
  // Voice Ordering - Expanded State
  const renderVoiceOrderingExpanded = () => {
    return (
      <div className="feature-expanded-content">
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Voice Ordering Settings</h3>
          <p>Full voice ordering interface (to be implemented)</p>
        </div>
      </div>
    )
  }
  
  // Table Ordering - Configure State
  const renderTableOrderingConfigure = () => {
    return (
      <div className="feature-configure-content">
        <div className="feature-grey-card">
          <div className="feature-grey-card-header">
            <span className="feature-grey-card-title">QR Codes</span>
            <button className="feature-grey-card-edit-button">Edit</button>
          </div>
          <span className="feature-grey-card-detail">5 sections · 18 tables</span>
        </div>
      </div>
    )
  }
  
  // Table Ordering - Expanded State
  const renderTableOrderingExpanded = () => {
    return (
      <div className="feature-expanded-content">
        <div className="feature-expanded-section">
          <h3 className="feature-expanded-section-title">Table Ordering Settings</h3>
          <p>Full table ordering interface (to be implemented)</p>
        </div>
      </div>
    )
  }
  
  // Main render based on state
  return (
    <div className={`feature-section feature-${featureId} feature-state-${state}`}>
      {state === 'configure' && renderConfigureState()}
      {state === 'completed' && renderCompletedState()}
      {state === 'expanded' && renderExpandedState()}
    </div>
  )
}

export default FeatureSection
