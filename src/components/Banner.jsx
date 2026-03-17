import { useState } from 'react'
import './Banner.css'
import './BaseProfilePage.css'
import nhoodguide from '../assets/nhoodguide.png'
import localcashguide from '../assets/localcashguide.png'
import messagesguide from '../assets/messagesguide.png'
import theme1 from '../assets/theme1.png'
import theme2 from '../assets/theme2.png'
import theme3 from '../assets/theme3.png'

const bannerContent = {
  'neighborhoods': {
    title: 'Welcome to Neighborhoods',
    description: 'Here are some helpful topics to get you up and running.',
    buttonText: 'Start',
    guides: [
      {
        id: 1,
        title: 'Neighborhoods on Cash App?',
        subtitle: 'Updated Mar 2026',
        description: 'Your Square hardware will now display a new idle screen to your customers. This screen will display your seller card, and instructions for customers to follow your profile.',
        image: nhoodguide
      },
      {
        id: 2,
        title: 'How does cash local work?',
        subtitle: 'Updated Mar 2026',
        description: 'Customers can discover and follow your business directly in the Cash App Neighborhoods tab.',
        image: localcashguide
      },
      {
        id: 3,
        title: 'Turning reachable into followers',
        subtitle: 'Updated Mar 2026',
        description: 'Your business profile in Cash App showcases your menu, allowing customers to browse and order directly.',
        image: messagesguide
      }
    ]
  },
  'profile': {
    title: 'Set up with ease',
    description: 'Learn how to set up and optimize your online ordering experience',
    buttonText: 'Download guide',
    guides: [
      {
        id: 1,
        title: 'Your new Square Register with rewards',
        subtitle: 'Square Register',
        description: 'Your Square hardware will now display a new idle screen to your customers. This screen will display your seller card, and instructions for customers to follow your profile.',
        image: null
      },
      {
        id: 2,
        title: 'Customers follow you on Cash App',
        subtitle: 'Cash App',
        description: 'Customers can discover and follow your business directly in the Cash App Neighborhoods tab.',
        image: null
      },
      {
        id: 3,
        title: 'Enable online ordering on your profile',
        subtitle: 'Online ordering',
        description: 'Your business profile in Cash App showcases your menu, allowing customers to browse and order directly.',
        image: null
      },
      {
        id: 4,
        title: 'Customers redeem rewards on Cash App',
        subtitle: 'Messages',
        description: 'Customers receive push notifications when they earn rewards and can easily redeem them through your Cash App profile.',
        image: null
      }
    ]
  },
  'website': {
    title: 'Customize your website',
    description: 'Get to know your website and unlock its design',
    buttonText: 'Choose theme',
    guides: [
      {
        id: 1,
        title: 'Foundational',
        subtitle: 'Clean, crisp, and simple',
        description: 'Your Square hardware will now display a new idle screen to your customers. This screen will display your seller card, and instructions for customers to follow your profile.',
        image: theme1
      },
      {
        id: 2,
        title: 'Tonel Brigade',
        subtitle: 'Bold and font forward',
        description: 'Customers can discover and follow your business directly in the Cash App Neighborhoods tab.',
        image: theme2
      },
      {
        id: 3,
        title: 'Gallery Galore',
        subtitle: 'Bold and image forward',
        description: 'Your business profile in Cash App showcases your menu, allowing customers to browse and order directly.',
        image: theme3
      }
    ]
  },
  'online-ordering': {
    title: 'Online ordering',
    description: 'Accept orders for pickup or delivery from your profile.',
    buttonText: 'Get started',
    guides: [
      {
        id: 1,
        title: 'Set up your menu',
        subtitle: 'Ordering',
        description: 'Add items, set prices, and manage availability for pickup and delivery.',
        image: null
      }
    ]
  },
  'online-booking': {
    title: 'Online booking',
    description: 'Take reservations and appointments from your profile.',
    buttonText: 'Get started',
    guides: [
      {
        id: 1,
        title: 'Reservations & appointments',
        subtitle: 'Booking',
        description: 'Let customers book tables, services, or time slots directly in Cash App.',
        image: null
      }
    ]
  },
  'online-shopping': {
    title: 'Online shopping',
    description: 'Sell products and manage inventory from your profile.',
    buttonText: 'Get started',
    guides: [
      {
        id: 1,
        title: 'Sell products online',
        subtitle: 'Shopping',
        description: 'List products, set inventory, and accept orders through your Cash App profile.',
        image: null
      }
    ]
  },
  'channels': {
    title: 'Channels',
    description: 'Connect marketplaces and channels to reach more customers.',
    buttonText: 'Get started',
    guides: [
      {
        id: 1,
        title: 'Connect your channels',
        subtitle: 'Channels',
        description: 'Sync your menu and orders across marketplaces and delivery partners.',
        image: null
      }
    ]
  }
}

function Banner({ activePage = 'neighborhoods' }) {
  const [isDismissing, setIsDismissing] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalClosing, setIsModalClosing] = useState(false)

  const content = bannerContent[activePage] || bannerContent['neighborhoods']
  const guideData = content.guides

  const handleDismiss = () => {
    setIsDismissing(true)
    setTimeout(() => {
      setIsHidden(true)
    }, 900)
  }

  const handleCardClick = (guide) => {
    const guideIndex = guideData.findIndex(g => g.id === guide.id)
    setCurrentSlide(guideIndex)
    setSelectedGuide(guide)
    setIsModalClosing(false)
  }

  const handleCloseModal = () => {
    setIsModalClosing(true)
    setTimeout(() => {
      setSelectedGuide(null)
      setCurrentSlide(0)
      setIsModalClosing(false)
    }, 200)
  }

  const handleNext = () => {
    if (currentSlide < guideData.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedGuide(guideData[currentSlide + 1])
    } else {
      handleCloseModal()
    }
  }

  if (isHidden) {
    return null
  }

  return (
    <>
      <div className={`banner-wrapper ${isDismissing ? 'dismissing' : ''}`}>
        <div className="base-profile-welcome-banner">
          {/* Header */}
          <div className="welcome-banner-header">
            <div className="welcome-header-content">
              <div className="welcome-header-title">
                <h2 className="welcome-title-text">{content.title}</h2>
              </div>
              <p className="welcome-header-description">{content.description}</p>
            </div>
            <button className="welcome-banner-button">Start</button>
          </div>

          {/* Guides */}
          <div className="welcome-guides">
            {guideData.map((guide, index) => (
              <div 
                key={guide.id}
                className="guide-item"
                onClick={() => handleCardClick(guide)}
                style={{ cursor: 'pointer' }}
              >
                <div className="guide-thumbnail">
                  {guide.image && (
                    <img src={guide.image} alt={guide.title} />
                  )}
                </div>
                <div className="guide-spacer"></div>
                <div className="guide-label">
                  <div className="guide-subheading">
                    <span className="guide-title">{guide.title}</span>
                  </div>
                  <span className="guide-subtitle">{guide.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedGuide && (
        <div className={`guide-modal-overlay ${isModalClosing ? 'closing' : ''}`} onClick={handleCloseModal}>
          <div className={`guide-modal ${isModalClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            {/* Header with progress and close button */}
            <div className="guide-modal-header">
              <div className="guide-modal-progress">
                {guideData.map((_, index) => (
                  <div
                    key={index}
                    className={`guide-modal-progress-bar ${index === currentSlide ? 'active' : 'inactive'}`}
                    style={{ order: index }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentSlide(index)
                      setSelectedGuide(guideData[index])
                    }}
                  />
                ))}
              </div>
              <button className="guide-modal-close" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="guide-modal-body">
              {/* Text Section */}
              <div className="guide-modal-text-section">
                <h3 className="guide-modal-subtitle">{guideData[currentSlide].subtitle}</h3>
                <h2 className="guide-modal-title">{selectedGuide.title}</h2>
                <p className="guide-modal-description">{selectedGuide.description}</p>
              </div>

              {/* Image Section - Hidden for now */}
              <div className="guide-modal-image-section">
                <div className="guide-modal-image-container">
                  {/* Image removed */}
                </div>
              </div>
            </div>

            {/* Footer with Learn more and Next buttons */}
            <div className="guide-modal-footer">
              <button className="guide-modal-learn-more">
                <span>Learn more</span>
              </button>
              <button className="guide-modal-next" onClick={handleNext}>
                <span>{currentSlide === guideData.length - 1 ? 'Done' : 'Next'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Banner

