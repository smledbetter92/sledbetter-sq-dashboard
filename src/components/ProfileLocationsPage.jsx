import { useState, useEffect } from 'react'
import './ProfileLocationsPage.css'
import './AnalyticsModal.css'
import jbLogoLarge from '../assets/joy-bakeshop-logo.svg'
import bfbLogoLarge from '../assets/Product review 12/bfb-logo.svg'
import kjLogoLarge from '../assets/Product review 12/kj-logo.svg'
import sotLogoLarge from '../assets/Product review 12/spot-of-tea-logo.svg'
import vcLogoLarge from '../assets/Product review 12/vanilla-cafe-logo.svg'
import tmLogoLarge from '../assets/Product review 12/tea-monks-logo.svg'
import pscLogoLarge from '../assets/Product review 12/paper-son-coffee-logo.svg'
import brandCardShadow from '../assets/brandcard-shadow.svg'
import map1 from '../assets/map-1.png'
import map2 from '../assets/map-2.png'
import map3 from '../assets/map-3.png'
import GlobeIcon from '../assets/Globe.svg'
import QRCodeIcon from '../assets/QR code.svg'
import SeatMapIcon from '../assets/Seat map.svg'
import EllipsisIcon from '../assets/Ellipsis horizontal.svg'
import MicrophoneIcon from '../assets/Microphone.svg'
import CateringIcon from '../assets/Catering.svg'
import PlusIcon from '../assets/Plus in circle.svg'
import PlusLargeIcon from '../assets/Plus-large.svg'
import LocationPinIcon from '../assets/Location pin.svg'
import ArrowRightIcon from '../assets/Product review 12/Right arrow.svg'
import AddIcon18 from '../assets/add icon 18.svg'

const brandLogos = {
  'joy-bakeshop': jbLogoLarge,
  'brooklyn-french-bakers': bfbLogoLarge,
  'keva-juice': kjLogoLarge,
  'spot-of-tea': sotLogoLarge,
  'vanilla-cafe': vcLogoLarge,
  'tea-monks': tmLogoLarge,
  'paper-son-coffee': pscLogoLarge
}

const brandData = {
  'joy-bakeshop': {
    name: 'Joy Bakeshop',
    handle: '$joybakeshop',
    color: '#0000FF',
    about: "We're a small, butter-obsessed bakery making croissants, danishes, and morning buns the old-fashioned way: slow fermentation, real ingredients, and daily bakes. Saving by for flaky layers, seasonal fillings, and coffee that plays nice with pastry.",
    connections: 'Website, Google Business Profile, Apple Business Connect, Meta for Business',
    locations: [
      {
        id: 1,
        name: 'Brookhaven',
        address: '3100 Lanier Dr NE, Atlanta, GA 30319',
        phone: '(404) 555-0123',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map1,
        services: [
          { type: 'online-ordering', icon: GlobeIcon, title: 'Online ordering', subtitle: 'Pickup · Delivery · 15 min prep time', detail: 'Menus · Lunch, Dinner' },
          { type: 'voice-ordering', icon: MicrophoneIcon, title: 'Voice ordering', subtitle: '(415)111-1234', detail: 'Pending carrier verification', warning: true },
          { type: 'table-ordering', icon: QRCodeIcon, title: 'Table ordering', subtitle: '5 sections · 18 tables · Prep time 10mins', detail: 'Menus · Full menu' },
          { type: 'catering', icon: CateringIcon, title: 'Catering', subtitle: 'Catering lunch & dinner menu', detail: 'Lead time 24hr · Prep time 30mins' },
          { type: 'add-more', icon: PlusIcon, title: 'Add more', subtitle: 'Curbside pickup, catering, voice ordering', detail: '' }
        ]
      },
      {
        id: 2,
        name: 'Ansley Park',
        address: '149 Peachtree Cir NE, Atlanta, GA 30309',
        phone: '(404) 555-0456',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map2,
        services: [
          { type: 'online-ordering', icon: GlobeIcon, title: 'Online ordering', subtitle: 'Pickup · Delivery · 15 min prep time', detail: 'Menus · Lunch, Dinner' },
          { type: 'table-ordering', icon: QRCodeIcon, title: 'Table ordering', subtitle: '5 sections · 18 tables · Prep time 10mins', detail: 'Menus · Full menu' },
          { type: 'catering', icon: CateringIcon, title: 'Catering', subtitle: 'Catering lunch & dinner menu', detail: 'Lead time 24hr · Prep time 30mins' },
          { type: 'add-more', icon: PlusIcon, title: 'Add more', subtitle: 'Curbside pickup, catering, voice ordering', detail: '' }
        ]
      },
      {
        id: 3,
        name: 'Virginia-Highland',
        address: '1034 N Highland Ave NE, Atlanta, GA 30306',
        phone: '(404) 555-0789',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map3,
        services: [
          { type: 'online-ordering', icon: GlobeIcon, title: 'Online ordering', subtitle: 'Pickup · Delivery · 15 min prep time', detail: 'Menus · Lunch, Dinner' },
          { type: 'catering', icon: CateringIcon, title: 'Catering', subtitle: 'Catering lunch & dinner menu', detail: 'Lead time 24hr · Prep time 30mins' },
          { type: 'voice-ordering', icon: MicrophoneIcon, title: 'Voice ordering', subtitle: '(415)111-1234', detail: 'Pending carrier verification', warning: true },
          { type: 'add-more', icon: PlusIcon, title: 'Add more', subtitle: 'Curbside pickup, catering, voice ordering', detail: '' }
        ]
      }
    ]
  },
  'brooklyn-french-bakers': {
    name: 'Brooklyn French Bakers',
    handle: '$brooklynfrenchbakers',
    color: '#FF8C42',
    about: "This store delivers fresh pastries and bread every morning from our kitchen on Columbia Street, Waterfront. Brooklyn French Bakers is owned by French who are passionate about sharing French culture and products.",
    connections: 'Website, Google Business Profile, Apple Business Connect, Meta for Business',
    locations: [
      {
        id: 1,
        name: 'Brookhaven',
        address: '3100 Lanier Dr NE, Atlanta, GA 30319',
        phone: '(404) 555-0123',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map1,
        services: []
      }
    ]
  },
  'keva-juice': {
    name: 'Keva Juice',
    handle: '$kevasmoothie',
    color: '#FF6B35',
    about: "Keva Juice is Reno, Nevada and Colorado Springs' oldest smoothie, açaí, and juice bar, proudly serving our community for more than 20 years. As a family-owned business, our passion for providing the best smoothies, açaí bowls, and fresh juices has helped us become the go-to local spot for healthy and delicious drinks.",
    connections: 'Website, Google Business Profile, Apple Business Connect, Meta for Business',
    locations: [
      {
        id: 1,
        name: 'Brookhaven',
        address: '3100 Lanier Dr NE, Atlanta, GA 30319',
        phone: '(404) 555-0123',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map1,
        services: []
      }
    ]
  },
  'spot-of-tea': {
    name: 'Spot of Tea',
    handle: '$drinkspotoftea',
    color: '#2A67B0',
    about: "Spot of Tea is a neighborhood tea house, started right here in DC. Whenever you walk through our door, our mission is to make sure you leave feeling refreshed, every time!",
    connections: 'Website, Google Business Profile, Apple Business Connect, Meta for Business',
    locations: [
      {
        id: 1,
        name: 'Brookhaven',
        address: '3100 Lanier Dr NE, Atlanta, GA 30319',
        phone: '(404) 555-0123',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map1,
        services: []
      }
    ]
  },
  'vanilla-cafe': {
    name: 'Vanilla Cafe',
    handle: '$vanillacafemia',
    color: '#4D6242',
    about: "Vanilla – coffee & patisserie. Offering specialty coffee, non-alcoholic cocktails, all-day breakfast, lunch, and signature desserts. Discover the best of Slavic comfort food, croissants, and elegant sweets.",
    connections: 'Website, Google Business Profile, Apple Business Connect, Meta for Business',
    locations: [
      {
        id: 1,
        name: 'Brookhaven',
        address: '3100 Lanier Dr NE, Atlanta, GA 30319',
        phone: '(404) 555-0123',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map1,
        services: []
      }
    ]
  },
  'tea-monks': {
    name: 'Tea Monks',
    handle: '$teamonks',
    color: '#A66800',
    about: "Tea Monks has been crafting delicious freshly brewed Boba Tea drinks made with premium all-natural high-quality ingredients like tea leaves, creamers and toppings etc imported from Taiwan.",
    connections: 'Website, Google Business Profile, Apple Business Connect, Meta for Business',
    locations: [
      {
        id: 1,
        name: 'Brookhaven',
        address: '3100 Lanier Dr NE, Atlanta, GA 30319',
        phone: '(404) 555-0123',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map1,
        services: []
      }
    ]
  },
  'paper-son-coffee': {
    name: 'Paper Son Coffee',
    handle: '$papersoncoffee',
    color: '#2B6058',
    about: "Classic and Asian American inspired multi roaster coffee stand in the Dogpatch SF!",
    connections: 'Website, Google Business Profile, Apple Business Connect, Meta for Business',
    locations: [
      {
        id: 1,
        name: 'Brookhaven',
        address: '3100 Lanier Dr NE, Atlanta, GA 30319',
        phone: '(404) 555-0123',
        hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
        map: map1,
        services: []
      }
    ]
  }
}

function getMonogram(name) {
  const words = name.trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase() || '?'
}

function ProfileLocationsPage({ activeBrand, singleLocation = false, configuredLocations = null, brandConfigured = true, customerViewMode = 'returning' }) {
  const data = brandData[activeBrand] || brandData['joy-bakeshop']
  const monogram = getMonogram(data.name)
  // Use configured locations if provided, otherwise use brand data locations
  const displayLocations = configuredLocations || (singleLocation ? [data.locations[0]] : data.locations)
  
  // Only show brand card if we're NOT being called from BaseProfilePage with configured locations
  const showBrandCard = !configuredLocations
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [activeLocation, setActiveLocation] = useState(null)
  const [targetSection, setTargetSection] = useState(null)
  const [activeSection, setActiveSection] = useState('location-section')
  
  // Edit states for location fields
  const [isEditingNeighborhood, setIsEditingNeighborhood] = useState(false)
  const [nickname, setNeighborhood] = useState('Brookhaven')
  const [isSavingNeighborhood, setIsSavingNeighborhood] = useState(false)
  
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [addressLine1, setAddressLine1] = useState('3100 Lanier Drive NE')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('Brookhaven')
  const [zipCode, setZipCode] = useState('30319')
  const [state, setState] = useState('Georgia')
  const [isSavingAddress, setIsSavingAddress] = useState(false)
  
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('+1 864-378-0992')
  const [isSavingPhone, setIsSavingPhone] = useState(false)
  
  const [isEditingHours, setIsEditingHours] = useState(false)
  const [locationHours, setLocationHours] = useState('Monday to Friday, 10AM - 2PM')
  const [isSavingHours, setIsSavingHours] = useState(false)
  
  // Online ordering settings state
  const [pickupPrepTime, setPickupPrepTime] = useState('15mins')
  const [deliveryPrepTime, setDeliveryPrepTime] = useState('15mins')
  const [tablePrepTime, setTablePrepTime] = useState('15mins')
  
  const handlePickupPrepTimeChange = (value) => {
    setPickupPrepTime(value)
    showToast('Prep time changes saved')
  }
  
  const handleDeliveryPrepTimeChange = (value) => {
    setDeliveryPrepTime(value)
    showToast('Prep time changes saved')
  }
  
  const handleTablePrepTimeChange = (value) => {
    setTablePrepTime(value)
    showToast('Prep time changes saved')
  }
  
  const handleToggleChange = (setter, currentValue, label) => {
    setter(!currentValue)
    showToast(`${label} changes saved`)
  }
  const [useLocationHours, setUseLocationHours] = useState(true)
  const [showPickupTimes, setShowPickupTimes] = useState(true)
  const [orderLimits, setOrderLimits] = useState(false)
  const [orderScheduling, setOrderScheduling] = useState(false)
  const [ticketPrintingOption, setTicketPrintingOption] = useState('pickup-delivery-time')
  
  // Delivery settings state
  const [chargeServiceFee, setChargeServiceFee] = useState(false)
  const [minimumOrderAmount, setMinimumOrderAmount] = useState(false)
  
  // Toast notification state
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  
  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, 3000)
  }

  const handleOpenLocationModal = (location, sectionId = null) => {
    setActiveLocation(location)
    setTargetSection(sectionId)
    setIsLocationModalOpen(true)
    setIsModalClosing(false)
  }

  const handleEditNeighborhood = () => {
    setIsEditingNeighborhood(true)
  }

  const handleCancelNeighborhoodEdit = () => {
    setIsEditingNeighborhood(false)
    setNeighborhood('Brookhaven')
  }

  const handleSaveNeighborhood = () => {
    setIsSavingNeighborhood(true)
    // Simulate save with spinner -> checkmark -> close
    setTimeout(() => {
      setIsSavingNeighborhood('success')
      showToast('Neighborhood changes saved')
      setTimeout(() => {
        setIsSavingNeighborhood(false)
        setIsEditingNeighborhood(false)
      }, 600)
    }, 400)
  }

  const handleEditAddress = () => {
    setIsEditingAddress(true)
  }

  const handleCancelAddressEdit = () => {
    setIsEditingAddress(false)
    // Reset to original values
    setAddressLine1('3100 Lanier Drive NE')
    setAddressLine2('')
    setCity('Brookhaven')
    setZipCode('30319')
    setState('Georgia')
  }

  const handleSaveAddress = () => {
    setIsSavingAddress(true)
    // Simulate save with spinner -> checkmark -> close
    setTimeout(() => {
      setIsSavingAddress('success')
      showToast('Address changes saved')
      setTimeout(() => {
        setIsSavingAddress(false)
        setIsEditingAddress(false)
      }, 600)
    }, 400)
  }

  const handleEditPhone = () => {
    setIsEditingPhone(true)
  }

  const handleCancelPhoneEdit = () => {
    setIsEditingPhone(false)
    setPhoneNumber('+1 864-378-0992')
  }

  const handleSavePhone = () => {
    setIsSavingPhone(true)
    // Simulate save with spinner -> checkmark -> close
    setTimeout(() => {
      setIsSavingPhone('success')
      showToast('Phone changes saved')
      setTimeout(() => {
        setIsSavingPhone(false)
        setIsEditingPhone(false)
      }, 600)
    }, 400)
  }

  const handleEditHours = () => {
    setIsEditingHours(true)
  }

  const handleCancelHoursEdit = () => {
    setIsEditingHours(false)
    setLocationHours('Monday to Friday, 10AM - 2PM')
  }

  const handleSaveHours = () => {
    setIsSavingHours(true)
    // Simulate save with spinner -> checkmark -> close
    setTimeout(() => {
      setIsSavingHours('success')
      showToast('Hours changes saved')
      setTimeout(() => {
        setIsSavingHours(false)
        setIsEditingHours(false)
      }, 600)
    }, 400)
  }

  useEffect(() => {
    if (isLocationModalOpen && targetSection) {
      // Set active section when modal opens with a target
      setActiveSection(targetSection)
      // Scroll immediately without animation (instant)
      setTimeout(() => {
        const modalBody = document.querySelector('.location-modal-body')
        const element = document.getElementById(targetSection)
        if (modalBody && element) {
          const offsetTop = element.offsetTop
          modalBody.scrollTo({ top: offsetTop, behavior: 'instant' })
        }
        setTargetSection(null)
      }, 100)
    }
  }, [isLocationModalOpen, targetSection])

  const handleCloseLocationModal = () => {
    setIsModalClosing(true)
    setTimeout(() => {
      setIsLocationModalOpen(false)
      setIsModalClosing(false)
      setActiveLocation(null)
      setActiveSection('location-section')
      
      // Reset all edit states
      setIsEditingNeighborhood(false)
      setIsEditingAddress(false)
      setIsEditingPhone(false)
      setIsEditingHours(false)
      
      // Reset all field values
      setNeighborhood('Brookhaven')
      setAddressLine1('3100 Lanier Drive NE')
      setAddressLine2('')
      setCity('Brookhaven')
      setZipCode('30319')
      setState('Georgia')
      setPhoneNumber('+1 864-378-0992')
      setLocationHours('Monday to Friday, 10AM - 2PM')
    }, 350)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isLocationModalOpen) {
        handleCloseLocationModal()
      }
    }

    if (isLocationModalOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isLocationModalOpen])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isLocationModalOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isLocationModalOpen])

  // Handle scrollbar visibility and scroll spy during scroll
  useEffect(() => {
    if (!isLocationModalOpen) return

    const modalBody = document.querySelector('.location-modal-body')
    if (!modalBody) return

    let scrollTimeout

    const handleScroll = () => {
      modalBody.classList.add('scrolling')
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        modalBody.classList.remove('scrolling')
      }, 1000)
      
      // Update active section based on scroll position (scroll spy)
      const baseSections = ['location-section']
      const serviceSections = activeLocation?.services
        .filter(s => s.type !== 'add-more')
        .map(s => `${s.type}-section`) || []
      const sections = [...baseSections, ...serviceSections, 'add-more-section']
      
      let currentSection = 'location-section'
      const modalBodyRect = modalBody.getBoundingClientRect()
      const threshold = modalBodyRect.top + 150
      
      // Find which section is currently at the top
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= threshold) {
            currentSection = sections[i]
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    modalBody.addEventListener('scroll', handleScroll)
    // Run once on mount to set initial state
    handleScroll()
    
    return () => {
      modalBody.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isLocationModalOpen, activeLocation])

  return (
    <div className={`profile-locations-page ${singleLocation ? 'single-location-view' : ''}`}>
      {/* Toast Notification */}
      <div className={`toast-notification ${toastVisible ? 'visible' : ''}`}>
        {toastMessage}
      </div>

      {/* Brand Card */}
      {showBrandCard && (
        <div className="brand-card">
          <div className="brand-card-buttons">
            {singleLocation && <button className="brand-preview-button">Preview</button>}
            <button className="brand-edit-button">Edit</button>
          </div>
          <div className="brand-card-content">
            {/* Logo Section */}
            <div className="brand-logo-section">
              <div className="seller-card-container">
                {customerViewMode === 'returning' ? (
                  <>
                    <img src={brandLogos[activeBrand] || jbLogoLarge} alt={data.name} className="seller-card-image" />
                    <img src={brandCardShadow} alt="" className="seller-card-shadow" />
                  </>
                ) : (
                  <div className="seller-card-monogram" style={{ backgroundColor: data.color || '#666' }}>
                    <span className="monogram-text">{monogram}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="brand-info-section">
              {/* Header */}
              <div className="brand-header">
                <div className="header-content">
                  <h2 className="brand-title">{data.name}</h2>
                  <p className="brand-handle">cash.app/{data.handle}</p>
                </div>
              </div>

              {/* Rows */}
              <div className="brand-rows">
                {/* About Row */}
                <div className="brand-row">
                  <div className="row-content">
                    <div className="row-text">
                      <h3 className="row-title">About</h3>
                      <p className="row-description">{data.about}</p>
                    </div>
                  </div>
                </div>

                {/* Connections Row */}
                <div className="brand-row">
                  <div className="row-content">
                    <div className="row-text">
                      <h3 className="row-title">Connections</h3>
                      <p className="row-description">{data.connections}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Locations */}
      <div className="locations-container">
        {displayLocations.map((location) => (
          <div key={location.id} className="location-card">
            <div className="location-header">
              <div className="location-map">
                <img src={location.map} alt={location.name} />
              </div>
              <div className="location-info">
                <h3 className="location-name">{location.name}</h3>
                <p className="location-address">{location.address}</p>
              </div>
              <button className="location-edit-button" onClick={() => handleOpenLocationModal(location, 'location-section')}>Edit</button>
            </div>

            <hr className="location-divider" />

            <div className="location-services">
              {location.services && location.services.filter(service => service.type !== 'add-more').map((service, index) => (
                <div
                  key={`${location.id}-${service.type}-${index}`}
                  className="service-row"
                  onClick={() => handleOpenLocationModal(location, `${service.type}-section`)}
                >
                  <div className="service-icon">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <div className="service-content">
                    <h4 className="service-title">{service.title}</h4>
                    {service.subtitle && <p className="service-subtitle">{service.subtitle}</p>}
                    {service.detail && (
                      <p className={`service-detail ${service.warning ? 'warning' : ''}`}>
                        {service.detail}
                      </p>
                    )}
                  </div>
                  <img src={ArrowRightIcon} alt="" className="hover-arrow" width="16" height="16" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Location Card - Single Location View */}
        {singleLocation && (
          <div className="add-location-card-single">
            <div className="add-location-card-container">
              <div className="add-location-icon-box">
                <img src={PlusLargeIcon} alt="" width="24" height="24" />
              </div>
              <div className="add-location-title-text">Add location</div>
              <button className="add-location-start-button">Start</button>
            </div>
          </div>
        )}

        {/* Add Location Card - Multi Location View */}
        {!singleLocation && (
          <button className="add-location-button">
            <div className="add-location-content">
              <div className="add-location-icon">
                <img src={PlusLargeIcon} alt="" width="24" height="24" />
              </div>
              <div className="add-location-text">Add location</div>
            </div>
          </button>
        )}
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className={`modal-overlay ${isModalClosing ? 'closing' : ''}`}>
          <div className="modal-container">
            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">{activeLocation?.name}</h2>
              <button className="modal-close" onClick={handleCloseLocationModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Modal Body with Sidebar */}
            <div className="location-modal-body">
              {/* Left Sidebar Navigation */}
              <div className="location-modal-sidebar location-modal-sidebar-left">
                <button 
                  className={`location-sidebar-item ${activeSection === 'location-section' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection('location-section')
                    const modalBody = document.querySelector('.location-modal-body')
                    const targetSection = document.getElementById('location-section')
                    if (modalBody && targetSection) {
                      const offsetTop = targetSection.offsetTop
                      modalBody.scrollTo({ top: offsetTop, behavior: 'smooth' })
                    }
                  }}
                >
                  <div className="sidebar-item-icon">
                    <img src={LocationPinIcon} alt="" />
                  </div>
                  <div className="sidebar-item-content">
                    <span className="sidebar-item-title">Location</span>
                    <span className="sidebar-item-subtitle">{activeLocation?.name}</span>
                  </div>
                </button>
                
                {activeLocation?.services.map((service, index) => (
                  service.type !== 'add-more' && (
                    <button 
                      key={index}
                      className={`location-sidebar-item ${activeSection === `${service.type}-section` ? 'active' : ''}`}
                      onClick={() => {
                        setActiveSection(`${service.type}-section`)
                        const modalBody = document.querySelector('.location-modal-body')
                        const targetSection = document.getElementById(`${service.type}-section`)
                        if (modalBody && targetSection) {
                          const offsetTop = targetSection.offsetTop
                          modalBody.scrollTo({ top: offsetTop, behavior: 'smooth' })
                        }
                      }}
                    >
                      <div className="sidebar-item-icon">
                        <img src={service.icon} alt="" />
                      </div>
                      <span className="sidebar-item-title">{service.title}</span>
                    </button>
                  )
                ))}
                
                <button 
                  className={`location-sidebar-item add-more-item ${activeSection === 'add-more-section' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection('add-more-section')
                    const modalBody = document.querySelector('.location-modal-body')
                    const targetSection = document.getElementById('add-more-section')
                    if (modalBody && targetSection) {
                      const offsetTop = targetSection.offsetTop
                      modalBody.scrollTo({ top: offsetTop, behavior: 'smooth' })
                    }
                  }}
                >
                  <div className="sidebar-item-icon">
                    <img src={AddIcon18} alt="" />
                  </div>
                  <span className="sidebar-item-title">Add more</span>
                </button>
              </div>

              {/* Center Content Area */}
              <div className="modal-content">
                {/* Location Section */}
                <div id="location-section" className="modal-section location-modal-section">
                  <div className="location-section-header">
                    <h3 className="location-section-title">Location</h3>
                  </div>
                  
                  <div className="location-settings-group">
                    {/* Neighborhood */}
                    <div className={`location-setting-item ${isEditingNeighborhood ? 'editing' : ''}`}>
                      {!isEditingNeighborhood ? (
                        <>
                          <div className="setting-content">
                            <div className="setting-title">Neighborhood</div>
                            <div className="setting-details">{nickname}</div>
                          </div>
                          <button className="setting-edit-button" onClick={handleEditNeighborhood}>Edit</button>
                        </>
                      ) : (
                        <div className="address-edit-container">
                          <div className="address-edit-header">
                            <div className="setting-title">Neighborhood</div>
                            <div className="address-edit-actions">
                              <button className="cancel-button" onClick={handleCancelNeighborhoodEdit} disabled={isSavingNeighborhood}>Cancel</button>
                              <button className={`save-button ${isSavingNeighborhood ? 'saving' : ''}`} onClick={handleSaveNeighborhood} disabled={isSavingNeighborhood}>
                                {isSavingNeighborhood === 'success' ? (
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="check-icon">
                                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : isSavingNeighborhood ? (
                                  <svg className="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="30 10" />
                                  </svg>
                                ) : (
                                  'Save'
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="address-edit-fields">
                            <div className={`form-input-container ${nickname ? 'has-value' : ''}`}>
                              <label className="form-label">Neighborhood</label>
                              <input
                                type="text"
                                className="form-input-text"
                                value={nickname}
                                onChange={(e) => setNeighborhood(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className={`location-setting-item location-setting-address ${isEditingAddress ? 'editing' : ''}`}>
                      {!isEditingAddress ? (
                        <>
                          <div className="setting-content">
                            <div className="setting-title">Address</div>
                            <div className="setting-details">
                              <div className="address-line-1">{addressLine1}</div>
                              <div className="address-line-2">{city}, {state.substring(0, 2).toUpperCase()} {zipCode}</div>
                            </div>
                          </div>
                          <button className="setting-edit-button" onClick={handleEditAddress}>Edit</button>
                        </>
                      ) : (
                        <div className="address-edit-container">
                          <div className="address-edit-header">
                            <div className="setting-title">Address</div>
                            <div className="address-edit-actions">
                              <button className="cancel-button" onClick={handleCancelAddressEdit} disabled={isSavingAddress}>Cancel</button>
                              <button className={`save-button ${isSavingAddress ? 'saving' : ''}`} onClick={handleSaveAddress} disabled={isSavingAddress}>
                                {isSavingAddress === 'success' ? (
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="check-icon">
                                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : isSavingAddress ? (
                                  <svg className="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="30 10" />
                                  </svg>
                                ) : (
                                  'Save'
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="address-edit-fields">
                            <div className={`form-input-container ${addressLine1 ? 'has-value' : ''}`}>
                              <label className="form-label">Address</label>
                              <input
                                type="text"
                                className="form-input-text"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                              />
                            </div>
                            <div className={`form-input-container ${addressLine2 ? 'has-value' : ''}`}>
                              <label className="form-label">Apt., #, Suite, etc.</label>
                              <input
                                type="text"
                                className="form-input-text"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                              />
                            </div>
                            <div className="address-fields-row">
                              <div className={`form-input-container ${city ? 'has-value' : ''}`}>
                                <label className="form-label">City</label>
                                <input
                                  type="text"
                                  className="form-input-text"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </div>
                              <div className={`form-input-container ${zipCode ? 'has-value' : ''}`}>
                                <label className="form-label">Zip code</label>
                                <input
                                  type="text"
                                  className="form-input-text"
                                  value={zipCode}
                                  onChange={(e) => setZipCode(e.target.value)}
                                />
                              </div>
                              <div className={`form-input-container ${state ? 'has-value' : ''}`}>
                                <label className="form-label">State</label>
                                <input
                                  type="text"
                                  className="form-input-text"
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone number */}
                    <div className={`location-setting-item ${isEditingPhone ? 'editing' : ''}`}>
                      {!isEditingPhone ? (
                        <>
                          <div className="setting-content">
                            <div className="setting-title">Phone number</div>
                            <div className="setting-details">{phoneNumber}</div>
                          </div>
                          <button className="setting-edit-button" onClick={handleEditPhone}>Edit</button>
                        </>
                      ) : (
                        <div className="address-edit-container">
                          <div className="address-edit-header">
                            <div className="setting-title">Phone number</div>
                            <div className="address-edit-actions">
                              <button className="cancel-button" onClick={handleCancelPhoneEdit} disabled={isSavingPhone}>Cancel</button>
                              <button className={`save-button ${isSavingPhone ? 'saving' : ''}`} onClick={handleSavePhone} disabled={isSavingPhone}>
                                {isSavingPhone === 'success' ? (
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="check-icon">
                                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : isSavingPhone ? (
                                  <svg className="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="30 10" />
                                  </svg>
                                ) : (
                                  'Save'
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="address-edit-fields">
                            <div className={`form-input-container ${phoneNumber ? 'has-value' : ''}`}>
                              <label className="form-label">Phone number</label>
                              <input
                                type="tel"
                                className="form-input-text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Location hours */}
                    <div className={`location-setting-item ${isEditingHours ? 'editing' : ''}`}>
                      {!isEditingHours ? (
                        <>
                          <div className="setting-content">
                            <div className="setting-title">Location hours</div>
                            <div className="setting-details">{locationHours}</div>
                          </div>
                          <button className="setting-edit-button" onClick={handleEditHours}>Edit</button>
                        </>
                      ) : (
                        <div className="address-edit-container">
                          <div className="address-edit-header">
                            <div className="setting-title">Location hours</div>
                            <div className="address-edit-actions">
                              <button className="cancel-button" onClick={handleCancelHoursEdit} disabled={isSavingHours}>Cancel</button>
                              <button className={`save-button ${isSavingHours ? 'saving' : ''}`} onClick={handleSaveHours} disabled={isSavingHours}>
                                {isSavingHours === 'success' ? (
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="check-icon">
                                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : isSavingHours ? (
                                  <svg className="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="30 10" />
                                  </svg>
                                ) : (
                                  'Save'
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="address-edit-fields">
                            <div className={`form-input-container ${locationHours ? 'has-value' : ''}`}>
                              <label className="form-label">Location hours</label>
                              <input
                                type="text"
                                className="form-input-text"
                                value={locationHours}
                                onChange={(e) => setLocationHours(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dynamic Service Sections */}
                {activeLocation?.services.map((service, index) => (
                  service.type !== 'add-more' && (
                    service.type === 'online-ordering' ? (
                      <div key={index} id={`${service.type}-section`} className="modal-section online-ordering-section">
                        {/* Header */}
                        <div className="online-ordering-header">
                          <div className="header-title-container">
                            <h3 className="online-ordering-title">Online ordering</h3>
                          </div>
                          <div className="header-buttons">
                            <button className="status-badge ordering-on">
                              <div className="indicator-small">
                                <div className="indicator-dot"></div>
                              </div>
                              <span>Ordering on</span>
                            </button>
                            <button className="status-badge prep-time">
                              <div className="time-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span>Prep 15 min</span>
                            </button>
                          </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* Menus Subsection */}
                        <div className="online-ordering-subsection">
                          <div className="subsection-header">
                            <h4 className="subsection-title">Menus</h4>
                          </div>
                          
                          <div className="menus-group">
                            {/* Lunch Menu Row */}
                            <div className="menu-row">
                              <div className="menu-row-container">
                                <div className="menu-image">
                                  <span>Lu</span>
                                </div>
                                <div className="menu-details">
                                  <div className="menu-name">Lunch menu</div>
                                  <div className="menu-meta">
                                    <div className="menu-meta-item">
                                      <div className="meta-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                          <path d="M8 4V8L10.5 9.5M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </div>
                                      <span>12:00 PM - 3:00PM, M-S</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>6 Menu groups</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>34 Items</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button className="menu-edit-button">Edit</button>
                            </div>

                            {/* Drinks Menu Row */}
                            <div className="menu-row">
                              <div className="menu-row-container">
                                <div className="menu-image">
                                  <span>Dr</span>
                                </div>
                                <div className="menu-details">
                                  <div className="menu-name">Drinks</div>
                                  <div className="menu-meta">
                                    <div className="menu-meta-item">
                                      <div className="meta-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                          <path d="M8 4V8L10.5 9.5M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </div>
                                      <span>12:00 PM - 3:00PM, M-S</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>3 Menu groups</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>12 Items</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button className="menu-edit-button">Edit</button>
                            </div>
                          </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* Pickup Subsection */}
                        <div className="online-ordering-subsection">
                          <div className="subsection-header">
                            <h4 className="subsection-title">Pickup</h4>
                          </div>

                          {/* Prep Time */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Prep time</div>
                              <div className="setting-details-group">
                                <div className="prep-time-container">
                                  <div className="prep-time-title">Set preparation time</div>
                                  <div className="prep-time-description">How much time do you need to prepare an order for pickup?</div>
                                  <div className="segmented-control">
                                    <button 
                                      className={`segment-button ${pickupPrepTime === '10mins' ? 'active' : ''}`}
                                      onClick={() => handlePickupPrepTimeChange('10mins')}
                                    >
                                      <span>10mins</span>
                                    </button>
                                    <button 
                                      className={`segment-button ${pickupPrepTime === '15mins' ? 'active' : ''}`}
                                      onClick={() => handlePickupPrepTimeChange('15mins')}
                                    >
                                      <span>15mins</span>
                                    </button>
                                    <button 
                                      className={`segment-button ${pickupPrepTime === '20mins' ? 'active' : ''}`}
                                      onClick={() => handlePickupPrepTimeChange('20mins')}
                                    >
                                      <span>20mins</span>
                                    </button>
                                    <button 
                                      className={`segment-button ${pickupPrepTime === 'custom' ? 'active' : ''}`}
                                      onClick={() => handlePickupPrepTimeChange('custom')}
                                    >
                                      <span>Custom</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Pickup Time */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Pickup time</div>
                              <div className="setting-details-group">
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Use location hours</div>
                                    <div className="setting-detail-description">Same as location. Assigning prep time prevents orders from being placed after hours.</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${useLocationHours ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setUseLocationHours, useLocationHours, 'Use location hours')}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Timing */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Order timing</div>
                              <div className="setting-details-group">
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Show pickup times to customers</div>
                                    <div className="setting-detail-description">Make pickup time visible to customers during checkout, based on your prep time.</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${showPickupTimes ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setShowPickupTimes, showPickupTimes, 'Show pickup times to customers')}
                                  ></div>
                                </div>
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Order limits</div>
                                    <div className="setting-detail-description">Limit the number of orders that can be picked at the same time</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${orderLimits ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setOrderLimits, orderLimits, 'Order limits')}
                                  ></div>
                                </div>
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Enable order scheduling</div>
                                    <div className="setting-detail-description">Let your customers schedule orders for pickup</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${orderScheduling ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setOrderScheduling, orderScheduling, 'Enable order scheduling')}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Ticket Printing */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Ticket printing</div>
                              <div className="setting-details-group">
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Print order tickets based on pickup and delivery time</div>
                                    <div className="setting-detail-description">Order tickets will print based on how much prep time is required before the order is due</div>
                                  </div>
                                  <div 
                                    className={`radio-button ${ticketPrintingOption === 'pickup-delivery-time' ? 'on' : 'off'}`}
                                    onClick={() => { setTicketPrintingOption('pickup-delivery-time'); showToast('Ticket printing changes saved'); }}
                                  ></div>
                                </div>
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Print order tickets when the order is placed</div>
                                    <div className="setting-detail-description">All order tickets will print when the order is placed, even if the order is scheduled for a future pickup or delivery time</div>
                                  </div>
                                  <div 
                                    className={`radio-button ${ticketPrintingOption === 'order-placed' ? 'on' : 'off'}`}
                                    onClick={() => { setTicketPrintingOption('order-placed'); showToast('Ticket printing changes saved'); }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* Delivery Subsection */}
                        <div className="online-ordering-subsection">
                          <div className="subsection-header">
                            <h4 className="subsection-title">Delivery</h4>
                          </div>

                          {/* Prep Time */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Prep time</div>
                              <div className="setting-details-group">
                                <div className="prep-time-container">
                                  <div className="prep-time-title">Set preparation time</div>
                                  <div className="prep-time-description">How much time do you need to prepare an order for delivery?</div>
                                  <div className="segmented-control">
                                    <button 
                                      className={`segment-button ${deliveryPrepTime === '10mins' ? 'active' : ''}`}
                                      onClick={() => handleDeliveryPrepTimeChange('10mins')}
                                    >
                                      <span>10mins</span>
                                    </button>
                                    <button 
                                      className={`segment-button ${deliveryPrepTime === '15mins' ? 'active' : ''}`}
                                      onClick={() => handleDeliveryPrepTimeChange('15mins')}
                                    >
                                      <span>15mins</span>
                                    </button>
                                    <button 
                                      className={`segment-button ${deliveryPrepTime === '20mins' ? 'active' : ''}`}
                                      onClick={() => handleDeliveryPrepTimeChange('20mins')}
                                    >
                                      <span>20mins</span>
                                    </button>
                                    <button 
                                      className={`segment-button ${deliveryPrepTime === 'custom' ? 'active' : ''}`}
                                      onClick={() => handleDeliveryPrepTimeChange('custom')}
                                    >
                                      <span>Custom</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Time */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Delivery time</div>
                              <div className="setting-details-group">
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Use location hours</div>
                                    <div className="setting-detail-description">Same as location. Assigning prep time prevents orders from being placed after hours.</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${useLocationHours ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setUseLocationHours, useLocationHours, 'Use location hours')}
                                  ></div>
                                </div>
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Charge service fee</div>
                                    <div className="setting-detail-description">This service fee is charged in addition to the delivery fee. You keep the amount charged, minus standard processing fees.</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${chargeServiceFee ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setChargeServiceFee, chargeServiceFee, 'Charge service fee')}
                                  ></div>
                                </div>
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Minimum order amount</div>
                                    <div className="setting-detail-description">Require a minimum order amount to be eligible for delivery</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${minimumOrderAmount ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setMinimumOrderAmount, minimumOrderAmount, 'Minimum order amount')}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Timing */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Order timing</div>
                              <div className="setting-details-group">
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Order limits</div>
                                    <div className="setting-detail-description">Limit the number of orders that can be delivered at the same time</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${orderLimits ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setOrderLimits, orderLimits, 'Order limits')}
                                  ></div>
                                </div>
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Enable order scheduling</div>
                                    <div className="setting-detail-description">Let your customers schedule orders for delivery</div>
                                  </div>
                                  <div 
                                    className={`toggle-switch ${orderScheduling ? 'on' : 'off'}`}
                                    onClick={() => handleToggleChange(setOrderScheduling, orderScheduling, 'Enable order scheduling')}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Ticket Printing */}
                          <div className="setting-group">
                            <div className="setting-row">
                              <div className="setting-label">Ticket printing</div>
                              <div className="setting-details-group">
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Print order tickets based on pickup and delivery time</div>
                                    <div className="setting-detail-description">Order tickets will print based on how much prep time is required before the order is due</div>
                                  </div>
                                  <div 
                                    className={`radio-button ${ticketPrintingOption === 'pickup-delivery-time' ? 'on' : 'off'}`}
                                    onClick={() => { setTicketPrintingOption('pickup-delivery-time'); showToast('Ticket printing changes saved'); }}
                                  ></div>
                                </div>
                                <div className="setting-detail-row">
                                  <div className="setting-detail-content">
                                    <div className="setting-detail-title">Print order tickets when the order is placed</div>
                                    <div className="setting-detail-description">All order tickets will print when the order is placed, even if the order is scheduled for a future pickup or delivery time</div>
                                  </div>
                                  <div 
                                    className={`radio-button ${ticketPrintingOption === 'order-placed' ? 'on' : 'off'}`}
                                    onClick={() => { setTicketPrintingOption('order-placed'); showToast('Ticket printing changes saved'); }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : service.type === 'table-ordering' ? (
                      <div key={index} id={`${service.type}-section`} className="modal-section online-ordering-section">
                        {/* Header */}
                        <div className="online-ordering-header">
                          <div className="header-title-container">
                            <h3 className="online-ordering-title">Table ordering</h3>
                          </div>
                          <div className="header-buttons">
                            <button className="status-badge ordering-on">
                              <div className="indicator-small">
                                <div className="indicator-dot"></div>
                              </div>
                              <span>Ordering on</span>
                            </button>
                            <button className="status-badge prep-time">
                              <div className="time-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span>Prep 10 min</span>
                            </button>
                          </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* Prep Time Subsection */}
                        <div className="online-ordering-subsection">
                          <div className="subsection-header">
                            <h4 className="subsection-title">Prep time</h4>
                          </div>

                          {/* Prep Time */}
                          <div className="setting-group">
                            <div className="prep-time-container">
                              <div className="prep-time-title">Set preparation time</div>
                              <div className="prep-time-description">How much time do you need to prepare an order for pickup?</div>
                              <div className="segmented-control">
                                <button 
                                  className={`segment-button ${tablePrepTime === '10mins' ? 'active' : ''}`}
                                  onClick={() => handleTablePrepTimeChange('10mins')}
                                >
                                  <span>10mins</span>
                                </button>
                                <button 
                                  className={`segment-button ${tablePrepTime === '15mins' ? 'active' : ''}`}
                                  onClick={() => handleTablePrepTimeChange('15mins')}
                                >
                                  <span>15mins</span>
                                </button>
                                <button 
                                  className={`segment-button ${tablePrepTime === '20mins' ? 'active' : ''}`}
                                  onClick={() => handleTablePrepTimeChange('20mins')}
                                >
                                  <span>20mins</span>
                                </button>
                                <button 
                                  className={`segment-button ${tablePrepTime === 'custom' ? 'active' : ''}`}
                                  onClick={() => handleTablePrepTimeChange('custom')}
                                >
                                  <span>Custom</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* Menus Subsection */}
                        <div className="online-ordering-subsection">
                          <div className="subsection-header">
                            <h4 className="subsection-title">Menus</h4>
                          </div>
                          
                          <div className="menus-group">
                            {/* Breakfast Menu Row */}
                            <div className="menu-row">
                              <div className="menu-row-container">
                                <div className="menu-image">
                                  <span>Br</span>
                                </div>
                                <div className="menu-details">
                                  <div className="menu-name">Breakfast</div>
                                  <div className="menu-meta">
                                    <div className="menu-meta-item">
                                      <div className="time-icon-small">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                          <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </div>
                                      <span>12:00 PM - 3:00PM, M-S</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>6 Menu groups</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>34 Items</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button className="menu-edit-button">Edit</button>
                            </div>

                            {/* Lunch Menu Row */}
                            <div className="menu-row">
                              <div className="menu-row-container">
                                <div className="menu-image">
                                  <span>Lu</span>
                                </div>
                                <div className="menu-details">
                                  <div className="menu-name">Lunch</div>
                                  <div className="menu-meta">
                                    <div className="menu-meta-item">
                                      <div className="time-icon-small">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                          <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </div>
                                      <span>12:00 PM - 3:00PM, M-S</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>6 Menu groups</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>34 Items</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button className="menu-edit-button">Edit</button>
                            </div>

                            {/* Drinks Menu Row */}
                            <div className="menu-row">
                              <div className="menu-row-container">
                                <div className="menu-image">
                                  <span>Dr</span>
                                </div>
                                <div className="menu-details">
                                  <div className="menu-name">Drinks</div>
                                  <div className="menu-meta">
                                    <div className="menu-meta-item">
                                      <div className="time-icon-small">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                          <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </div>
                                      <span>12:00 PM - 3:00PM, M-S</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>3 Menu groups</span>
                                    </div>
                                    <div className="meta-divider"></div>
                                    <div className="menu-meta-item">
                                      <span>12 Items</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button className="menu-edit-button">Edit</button>
                            </div>
                          </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* QR Codes Subsection */}
                        <div className="online-ordering-subsection">
                          <div className="subsection-header">
                            <h4 className="subsection-title">QR codes</h4>
                          </div>

                          <div className="menus-group">
                            {/* Location QR code */}
                            <div className="menu-item">
                              <div className="menu-icon-container">
                                <img src={QRCodeIcon} alt="QR Code" className="menu-icon" />
                              </div>
                              <div className="menu-info">
                                <div className="menu-name">Location QR code</div>
                                <div className="menu-subtitle">Single QR code for ordering online</div>
                              </div>
                              <button className="menu-more-button">
                                <img src={EllipsisIcon} alt="More" />
                              </button>
                            </div>

                            {/* Bar */}
                            <div className="menu-item">
                              <div className="menu-icon-container">
                                <img src={SeatMapIcon} alt="Seat Map" className="menu-icon" />
                              </div>
                              <div className="menu-info">
                                <div className="menu-name">Bar</div>
                                <div className="menu-subtitle">Floor plan name · 12 tables</div>
                              </div>
                              <button className="menu-more-button">
                                <img src={EllipsisIcon} alt="More" />
                              </button>
                            </div>

                            {/* Main room */}
                            <div className="menu-item">
                              <div className="menu-icon-container">
                                <img src={SeatMapIcon} alt="Seat Map" className="menu-icon" />
                              </div>
                              <div className="menu-info">
                                <div className="menu-name">Main room</div>
                                <div className="menu-subtitle">Floor plan name · 8 tables</div>
                              </div>
                              <button className="menu-more-button">
                                <img src={EllipsisIcon} alt="More" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={index} id={`${service.type}-section`} className="modal-section location-modal-section">
                        <div className="location-section-header">
                          <h3 className="location-section-title">{service.title}</h3>
                          {service.type === 'voice-ordering' && (
                            <button className="start-button">Start</button>
                          )}
                        </div>
                      </div>
                    )
                  )
                ))}

                {/* Add More Section */}
                <div id="add-more-section" className="modal-section location-modal-section">
                  <h3 className="location-section-title">Add more</h3>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="location-modal-sidebar location-modal-sidebar-right">
                {/* Empty for now */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileLocationsPage

