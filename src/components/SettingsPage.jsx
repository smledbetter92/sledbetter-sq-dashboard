import { useState } from 'react'
import './SettingsPage.css'

const brandData = {
  'joy-bakeshop': {
    name: 'Joy Bakeshop',
    handle: '$joybakeshop',
    link: 'cash.app/$joybakeshop',
    about: 'Write an about description for Joy Bakeshop',
    locations: [
      { id: 1, name: 'Washington DC', hours: 'Prep time 15mins • Monday to Friday, 10AM - 2PM', enabled: true, confirmed: true },
      { id: 2, name: 'Revelstoke', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: true },
      { id: 3, name: 'Portland', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: false }
    ]
  },
  'spot-of-tea': {
    name: 'Spot of Tea',
    handle: '$drinkspotoftea',
    link: 'cash.app/$drinkspotoftea',
    about: 'Write an about description for Spot of Tea',
    locations: [
      { id: 1, name: 'Washington DC', hours: 'Prep time 15mins • Monday to Friday, 10AM - 2PM', enabled: true, confirmed: true },
      { id: 2, name: 'Revelstoke', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: true },
      { id: 3, name: 'Portland', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: false }
    ]
  },
  'vanilla-cafe': {
    name: 'Vanilla Cafe',
    handle: '$vanillacafemia',
    link: 'cash.app/$vanillacafemia',
    about: 'Write an about description for Vanilla Cafe',
    locations: [
      { id: 1, name: 'Washington DC', hours: 'Prep time 15mins • Monday to Friday, 10AM - 2PM', enabled: true, confirmed: true },
      { id: 2, name: 'Revelstoke', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: true },
      { id: 3, name: 'Portland', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: false }
    ]
  },
  'tea-monks': {
    name: 'Tea Monks',
    handle: '$teamonks',
    link: 'cash.app/$teamonks',
    about: 'Write an about description for Tea Monks',
    locations: [
      { id: 1, name: 'Washington DC', hours: 'Prep time 15mins • Monday to Friday, 10AM - 2PM', enabled: true, confirmed: true },
      { id: 2, name: 'Revelstoke', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: true },
      { id: 3, name: 'Portland', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: false }
    ]
  },
  'paper-son-coffee': {
    name: 'Paper Son Coffee',
    handle: '$papersoncoffee',
    link: 'cash.app/$papersoncoffee',
    about: 'Write an about description for Paper Son Coffee',
    locations: [
      { id: 1, name: 'Washington DC', hours: 'Prep time 15mins • Monday to Friday, 10AM - 2PM', enabled: true, confirmed: true },
      { id: 2, name: 'Revelstoke', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: true },
      { id: 3, name: 'Portland', hours: 'Prep time 15mins • Custom hours', enabled: false, confirmed: false }
    ]
  }
}

function SettingsPage({ activeBrand }) {
  const brand = brandData[activeBrand] || brandData['joy-bakeshop']
  const [orderTippingEnabled, setOrderTippingEnabled] = useState(true)
  const [paymentVerificationEnabled, setPaymentVerificationEnabled] = useState(true)
  const [notesEnabled, setNotesEnabled] = useState(false)

  return (
    <div className="settings-page">
      {/* Profile Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">Profile</h2>
        
        {/* Branding */}
        <div className="settings-subsection">
          <h3 className="settings-subsection-title">Branding</h3>
          <p className="settings-subsection-description">Configure logo and primary color shown in local profile</p>
          
          <div className="settings-row">
            <div className="settings-row-icon">
              <div className="brand-logo-icon"></div>
            </div>
            <div className="settings-row-content">
              <span className="settings-row-label">Logo and color</span>
            </div>
            <button className="settings-edit-button">Edit</button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="settings-subsection">
          <h3 className="settings-subsection-title">Basic info</h3>
          <p className="settings-subsection-description">Configure the name and the info shown on your Ordering profile</p>
          
          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-row-label">Profile name</span>
              <span className="settings-row-value">{brand.name}</span>
            </div>
            <button className="settings-edit-button">Edit</button>
          </div>

          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-row-label">Link</span>
              <span className="settings-row-value-secondary">{brand.link}</span>
            </div>
            <button className="settings-edit-button">Edit</button>
          </div>
        </div>

        {/* About */}
        <div className="settings-subsection">
          <h3 className="settings-subsection-title">About</h3>
          <p className="settings-subsection-description">Configure about description shown in your Ordering profile</p>
          
          <div className="settings-row">
            <div className="settings-row-icon">
              <div className="about-placeholder-image"></div>
            </div>
            <div className="settings-row-content">
              <span className="settings-row-value-secondary">[{brand.about}]</span>
            </div>
            <button className="settings-edit-button">Edit</button>
          </div>
        </div>
      </section>

      {/* Pickup Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">Pickup</h2>
        <p className="settings-section-description">Offer nearby customers a way to pick up their orders directly from your business</p>
        
        {brand.locations.map((location) => (
          <div key={location.id} className="settings-location-row">
            <div className="settings-location-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 13.25 9.5 19 12 22C14.5 19 19 13.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" fill="#101010"/>
              </svg>
            </div>
            <div className="settings-location-content">
              <div className="settings-location-header">
                <span className="settings-location-name">{location.name}</span>
                {!location.confirmed && (
                  <span className="settings-location-badge">Confirm location required</span>
                )}
              </div>
              <span className="settings-location-hours">{location.hours}</span>
            </div>
            {location.confirmed ? (
              <>
                <button className="settings-edit-button">Edit</button>
                <div className="settings-toggle-wrapper">
                  <input 
                    type="checkbox" 
                    className="settings-toggle" 
                    checked={location.enabled}
                    readOnly
                  />
                </div>
              </>
            ) : (
              <>
                <button className="settings-confirm-button">Confirm location</button>
                <div className="settings-toggle-wrapper">
                  <input 
                    type="checkbox" 
                    className="settings-toggle" 
                    checked={location.enabled}
                    readOnly
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Delivery Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">Delivery</h2>
        <p className="settings-section-description">
          On-demand delivery connects your business with professional courier services through Square's delivery partners. The 
          delivery fee varies based on distance, order size, and courier availability at checkout. <a href="#" className="settings-link">Learn more</a>
        </p>
        
        {brand.locations.map((location) => (
          <div key={location.id} className="settings-location-row">
            <div className="settings-location-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 13.25 9.5 19 12 22C14.5 19 19 13.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" fill="#101010"/>
              </svg>
            </div>
            <div className="settings-location-content">
              <div className="settings-location-header">
                <span className="settings-location-name">{location.name}</span>
                {!location.confirmed && (
                  <span className="settings-location-badge">Confirm location required</span>
                )}
              </div>
              <span className="settings-location-hours">{location.hours}</span>
            </div>
            {location.confirmed ? (
              <>
                <button className="settings-edit-button">Edit</button>
                <div className="settings-toggle-wrapper">
                  <input 
                    type="checkbox" 
                    className="settings-toggle" 
                    checked={location.enabled}
                    readOnly
                  />
                </div>
              </>
            ) : (
              <>
                <button className="settings-confirm-button">Confirm location</button>
                <div className="settings-toggle-wrapper">
                  <input 
                    type="checkbox" 
                    className="settings-toggle" 
                    checked={location.enabled}
                    readOnly
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Tracking Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">Tracking</h2>
        
        <div className="settings-subsection">
          <h3 className="settings-subsection-title">Google Analytics</h3>
          <p className="settings-subsection-description">
            Track your site's performance with <span className="settings-bold">Google Analytics</span>
          </p>
          
          <div className="settings-row">
            <button className="settings-add-button">Add</button>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">Checkout</h2>
        
        {/* Order Tipping */}
        <div className="settings-subsection">
          <div className="settings-subsection-header">
            <div>
              <h3 className="settings-subsection-title">Order tipping</h3>
              <p className="settings-subsection-description">Configure tipping for your online orders</p>
            </div>
            <div className="settings-toggle-wrapper">
              <input 
                type="checkbox" 
                className="settings-toggle" 
                checked={orderTippingEnabled}
                onChange={(e) => setOrderTippingEnabled(e.target.checked)}
              />
            </div>
          </div>

          {orderTippingEnabled && (
            <>
              <div className="settings-row">
                <div className="settings-row-content">
                  <span className="settings-row-label">Tip options</span>
                  <span className="settings-row-value">Percentage and dollar tips</span>
                </div>
                <button className="settings-edit-button">Edit</button>
              </div>

              <div className="settings-row-plain">
                <span className="settings-row-label">Percentage amounts</span>
                <span className="settings-row-value">15%, 18%, 20%</span>
              </div>

              <div className="settings-row-plain">
                <span className="settings-row-label">Default percentage</span>
                <span className="settings-row-value">15%</span>
              </div>

              <div className="settings-row-plain">
                <span className="settings-row-label">Dollar amount options</span>
                <span className="settings-row-value">$1, $2, $3</span>
              </div>

              <div className="settings-row-plain">
                <span className="settings-row-label">Dollar amount options</span>
                <span className="settings-row-value">$2</span>
              </div>
            </>
          )}
        </div>

        {/* Allow customers to leave notes */}
        <div className="settings-subsection">
          <div className="settings-subsection-header">
            <div>
              <h3 className="settings-subsection-title">Allow customers to leave notes</h3>
              <p className="settings-subsection-description">Display a text box for customers to leave a note during checkout</p>
            </div>
            <div className="settings-toggle-wrapper">
              <input 
                type="checkbox" 
                className="settings-toggle" 
                checked={notesEnabled}
                onChange={(e) => setNotesEnabled(e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Enhance payment verification */}
        <div className="settings-subsection">
          <div className="settings-subsection-header">
            <div>
              <h3 className="settings-subsection-title">Enhance payment verification</h3>
              <p className="settings-subsection-description">
                Require customers to complete an extra security step when payment seems suspicious. If they can't, the payment is 
                blocked, helping protect your business from fraud. <a href="#" className="settings-link">Learn more</a>
              </p>
            </div>
            <div className="settings-toggle-wrapper">
              <input 
                type="checkbox" 
                className="settings-toggle" 
                checked={paymentVerificationEnabled}
                onChange={(e) => setPaymentVerificationEnabled(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SettingsPage

