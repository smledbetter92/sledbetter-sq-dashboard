import { useState, useEffect } from 'react'
import './Sidebar.css'
import joyBakeshopLogo from '../assets/joy-bakeshop-logo.svg'
import bfbLogo from '../assets/Product review 12/bfb-logo.svg'
import kjLogo from '../assets/Product review 12/kj-logo.svg'
import spotOfTeaLogo from '../assets/Product review 12/spot-of-tea-logo.svg'
import vanillaCafeLogo from '../assets/Product review 12/vanilla-cafe-logo.svg'
import teaMonksLogo from '../assets/Product review 12/tea-monks-logo.svg'
import paperSonCoffeeLogo from '../assets/Product review 12/paper-son-coffee-logo.svg'
// Nav icons
import HomeIcon from '../assets/Home.svg'
import GlobeIcon from '../assets/Globe.svg'
import ItemIcon from '../assets/Item.svg'
import HumanCheckIcon from '../assets/Human check.svg'
import ReportsIcon from '../assets/reports.svg'
import StaffIcon from '../assets/staff.svg'
import BankIcon from '../assets/Bank.svg'
import SettingsIcon from '../assets/settings.svg'
import AddMoreIcon from '../assets/addmore.svg'
import NeighborhoodsIcon from '../assets/neighborhoods.svg'
// Footer icons
import BellIcon from '../assets/Bell.svg'
import MessageIcon from '../assets/Message multiple.svg'
import HelpIcon from '../assets/Question mark circle.svg'
import MgmtBotIcon from '../assets/mgmtbot-ai.svg'
// Version and utility icons
import CaretDownIcon from '../assets/16/caret-down.svg'
import Circle1Icon from '../assets/Circle 1.svg'
import Circle2Icon from '../assets/Circle 2.svg'
import ContactAddIcon from '../assets/24/contact-add.svg'
import DarkModeIcon from '../assets/Dark mode.svg'
import DepartmentStoreIcon from '../assets/24/category-department-store.svg'
import PasskeyIcon from '../assets/Passkey.svg'
import NewIcon from '../assets/new.svg'
import ReturningIcon from '../assets/returningcustomer.svg'

const businesses = [
  { id: 'joy-bakeshop', name: 'Joy Bakeshop', handle: '$joybakeshop', logo: joyBakeshopLogo, color: '#0000FF' },
  { id: 'keva-juice', name: 'Keva Juice', handle: '$kevasmoothie', logo: kjLogo, color: '#FF6B35' },
  { id: 'spot-of-tea', name: 'Spot of Tea', handle: '$drinkspotoftea', logo: spotOfTeaLogo, color: '#2A67B0' },
  { id: 'paper-son-coffee', name: 'Paper Son Coffee', handle: '$papersoncoffee', logo: paperSonCoffeeLogo, color: '#2B6058' }
]

function getMonogram(name) {
  const words = name.split(' ')
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

function Sidebar({ activeBrand, onBrandChange, onResetToDefaultState, activePage, onPageChange, sidebarLevel, onSidebarLevelChange, onNavigationStart, profileVersion, onProfileVersionChange, onAccountBladeOpen, isAccountBladeOpen, onBrandHeaderClick, theme = 'light', onThemeChange, onOpenOnboarding, customerViewMode, onCustomerViewModeChange, activeSettingsSection, onSettingsSectionChange }) {
  const [activeBusinessIndex, setActiveBusinessIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState(null) // 'forward' or 'back'
  const [animatingFromLevel, setAnimatingFromLevel] = useState(null) // Track which level we're animating from
  const [animatingToLevel, setAnimatingToLevel] = useState(null) // Track which level we're animating to
  
  const currentBusiness = businesses[activeBusinessIndex]
  const nextBusiness = businesses[(activeBusinessIndex + 1) % businesses.length]
  
  // Sync activeBusinessIndex when activeBrand changes from external source (e.g., BaseProfilePage)
  useEffect(() => {
    const newIndex = businesses.findIndex(b => b.id === activeBrand)
    if (newIndex !== -1 && newIndex !== activeBusinessIndex) {
      setActiveBusinessIndex(newIndex)
    }
  }, [activeBrand])

  const handlePageClick = (e, pageName) => {
    e.preventDefault()
    // Pass target page and state to navigation handler
    const targetState = pageName === 'profile' ? 'base-profile' : 'day-one'
    onNavigationStart(pageName, targetState)
  }
  
  const handleMainPageClick = (e, pageName) => {
    e.preventDefault()
    onNavigationStart(pageName, null)
  }
  
  // Generic navigation to a submenu level
  const handleNavigateToLevel = (level, page, state = null) => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimationDirection('forward')
    setAnimatingFromLevel(sidebarLevel)
    setAnimatingToLevel(level)
    if (page) onNavigationStart(page, state)
    
    setTimeout(() => {
      onSidebarLevelChange(level)
      setIsAnimating(false)
      setAnimationDirection(null)
      setAnimatingFromLevel(null)
      setAnimatingToLevel(null)
    }, 300)
  }
  
  // Generic navigation back
  const handleNavigateBack = (targetLevel, page = 'home', state = null) => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimationDirection('back')
    setAnimatingFromLevel(sidebarLevel)
    setAnimatingToLevel(targetLevel)
    onNavigationStart(page, state)
    
    setTimeout(() => {
      onSidebarLevelChange(targetLevel)
      setIsAnimating(false)
      setAnimationDirection(null)
      setAnimatingFromLevel(null)
      setAnimatingToLevel(null)
    }, 300)
  }
  
  // Helper to get animation class for a level
  const getAnimationClass = (level) => {
    if (!isAnimating) return ''
    
    // This level is the one we're leaving
    if (animatingFromLevel === level) {
      if (level === 'main') {
        return animationDirection === 'forward' ? 'sliding-out' : 'sliding-in'
      } else {
        return animationDirection === 'back' ? 'sliding-out' : 'sliding-in'
      }
    }
    
    // This level is the one we're going to
    if (animatingToLevel === level) {
      if (level === 'main') {
        return animationDirection === 'back' ? 'sliding-in' : 'sliding-out'
      } else {
        return animationDirection === 'forward' ? 'sliding-in' : 'sliding-out'
      }
    }
    
    return ''
  }
  
  const handleNavigateToOnline = () => handleNavigateToLevel('online', profileVersion === 'v2' ? 'website' : 'online-ordering', null)
  const handleNavigateToItemsServices = () => handleNavigateToLevel('items-services', 'items-services')
  const handleNavigateToCustomers = () => handleNavigateToLevel('customers', 'customers')
  const handleNavigateToReports = () => handleNavigateToLevel('reports', 'reports')
  const handleNavigateToStaff = () => handleNavigateToLevel('staff', 'staff')
  const handleNavigateToBanking = () => handleNavigateToLevel('banking', 'banking')
  const handleNavigateToSettings = () => handleNavigateToLevel('settings', 'settings')
  const handleNavigateToAddMore = () => handleNavigateToLevel('main', 'add-more')

  return (
    <aside className="sidebar">
      {/* Sliding content area - brand card + navigation */}
      <div className="nav-levels-container">
        {/* Main Menu Level - includes brand card */}
        <div className={`nav-level nav-level-main ${sidebarLevel === 'main' ? 'active' : ''} ${getAnimationClass('main')}`}>
          {/* Brand card header: nav button to Business profile (16px padding, 12px radius, hover). When profile selected, show "Business profile" instead of $cashtag. */}
          <div 
            className={`sidebar-header sidebar-header--nav ${activePage === 'profile' || activePage === 'settings' || (profileVersion !== 'v2' && activePage === 'neighborhoods') ? 'profile-selected' : ''} ${isFlipped ? 'transitioning' : ''} ${isAccountBladeOpen ? 'blade-open' : ''}`}
            onClick={() => onBrandHeaderClick ? onBrandHeaderClick() : (onAccountBladeOpen?.())}
            style={{ cursor: 'pointer' }}
          >
            <div className={`logo-container ${isFlipped ? 'is-flipped' : ''}`}>
              <div className="logo-card">
                {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                  <>
                    <div className="logo logo-monogram logo-front logo-flip-horizontal" style={{ background: currentBusiness.color }} data-brand={currentBusiness.id}>
                      <span className="sidebar-monogram-text">{getMonogram(currentBusiness.name)}</span>
                    </div>
                    <div className="logo logo-monogram logo-back logo-flip-horizontal" style={{ background: nextBusiness.color }} data-brand={nextBusiness.id}>
                      <span className="sidebar-monogram-text">{getMonogram(nextBusiness.name)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <img 
                      src={currentBusiness.logo} 
                      alt={`${currentBusiness.name} Logo`} 
                      className="logo logo-front logo-flip-horizontal"
                      data-brand={currentBusiness.id}
                    />
                    <img 
                      src={nextBusiness.logo} 
                      alt={`${nextBusiness.name} Logo`} 
                      className="logo logo-back logo-flip-horizontal"
                      data-brand={nextBusiness.id}
                    />
                  </>
                )}
              </div>
            </div>
            <h2 className="brand-name">{currentBusiness.name}</h2>
            <div className="brand-handle-container">
              <p className="brand-handle">{currentBusiness.handle}</p>
              <p className="brand-handle-hover">
                {profileVersion === 'v2' ? (
                  <>Change business</>
                ) : (
                  <>
                    <span className="brand-handle-hover-dot" aria-hidden />
                    Active on Neighborhoods
                  </>
                )}
              </p>
            </div>
          </div>

          <nav className="nav-menu">
            <a href="#" className={`nav-item ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => handleMainPageClick(e, 'home')}>
              <img src={HomeIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Home</span>
            </a>
            {profileVersion === 'v2' && (
              <a href="#" className={`nav-item ${activePage === 'neighborhoods' && sidebarLevel === 'main' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigationStart?.('neighborhoods'); }}>
                <img src={NeighborhoodsIcon} alt="" className="nav-icon" width="24" height="24" />
                <span>Neighborhoods</span>
              </a>
            )}
            <a href="#" className={`nav-item ${sidebarLevel === 'online' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToOnline(); }}>
              <img src={GlobeIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Online</span>
            </a>
            <a href="#" className={`nav-item ${sidebarLevel === 'items-services' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToItemsServices(); }}>
              <img src={ItemIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Items & services</span>
            </a>
            <a href="#" className={`nav-item ${sidebarLevel === 'customers' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToCustomers(); }}>
              <img src={HumanCheckIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Customers</span>
            </a>
            <a href="#" className={`nav-item ${sidebarLevel === 'reports' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToReports(); }}>
              <img src={ReportsIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Reports</span>
            </a>
            <a href="#" className={`nav-item ${sidebarLevel === 'staff' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToStaff(); }}>
              <img src={StaffIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Staff</span>
            </a>
            <a href="#" className={`nav-item ${sidebarLevel === 'banking' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToBanking(); }}>
              <img src={BankIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Banking</span>
            </a>
            <div className="nav-divider-container">
              <div className="nav-divider"></div>
            </div>
            <a href="#" className={`nav-item ${sidebarLevel === 'settings' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); }}>
              <img src={SettingsIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Settings</span>
            </a>
            <a href="#" className={`nav-item ${activePage === 'add-more' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToAddMore(); }}>
              <img src={AddMoreIcon} alt="" className="nav-icon" width="24" height="24" />
              <span>Add more</span>
            </a>
          </nav>
        </div>

        {/* Online Submenu Level */}
        <div className={`nav-level nav-level-submenu ${sidebarLevel === 'online' ? 'active' : ''} ${getAnimationClass('online')}`}>
          <button className="submenu-header" onClick={() => handleNavigateBack('main')}>
            <div className="nav-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2074 5.20654L6.41445 10.9995L20.0004 10.9995V12.9995L6.41445 12.9995L12.2074 18.7925L10.7934 20.2065L3.29336 12.7065C2.90288 12.316 2.90285 11.683 3.29336 11.2925L10.7934 3.79248L12.2074 5.20654Z" fill="#101010"/>
              </svg>
            </div>
            <span className="submenu-title">Online</span>
          </button>
          <nav className="nav-menu nav-menu-submenu">
            {profileVersion === 'v2' ? (
              <>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'website' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'website')}>Website</a>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'channels' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'channels')}>Channels</a>
                <div className="nav-divider-container">
                  <div className="nav-divider"></div>
                </div>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'online-ordering' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'online-ordering')}>Online ordering</a>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'online-booking' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'online-booking')}>Online booking</a>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'online-shopping' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'online-shopping')}>Shop all</a>
              </>
            ) : (
              <>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'online-ordering' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'online-ordering')}>Online ordering</a>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'online-booking' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'online-booking')}>Online booking</a>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'online-shopping' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'online-shopping')}>Shop all</a>
                <div className="nav-divider-container">
                  <div className="nav-divider"></div>
                </div>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'website' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'website')}>Website</a>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'neighborhoods' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'neighborhoods')}>Neighborhoods</a>
                <a href="#" className={`nav-item nav-item-text-only ${activePage === 'channels' ? 'active' : ''}`} onClick={(e) => handlePageClick(e, 'channels')}>Channels</a>
              </>
            )}
          </nav>
        </div>

        {/* Items & Services Submenu */}
        <div className={`nav-level nav-level-submenu ${sidebarLevel === 'items-services' ? 'active' : ''} ${getAnimationClass('items-services')}`}>
          <button className="submenu-header" onClick={() => handleNavigateBack('main')}>
            <div className="nav-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2074 5.20654L6.41445 10.9995L20.0004 10.9995V12.9995L6.41445 12.9995L12.2074 18.7925L10.7934 20.2065L3.29336 12.7065C2.90288 12.316 2.90285 11.683 3.29336 11.2925L10.7934 3.79248L12.2074 5.20654Z" fill="#101010"/>
              </svg>
            </div>
            <span className="submenu-title">Items & services</span>
          </button>
        </div>

        {/* Customers Submenu */}
        <div className={`nav-level nav-level-submenu ${sidebarLevel === 'customers' ? 'active' : ''} ${getAnimationClass('customers')}`}>
          <button className="submenu-header" onClick={() => handleNavigateBack('main')}>
            <div className="nav-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2074 5.20654L6.41445 10.9995L20.0004 10.9995V12.9995L6.41445 12.9995L12.2074 18.7925L10.7934 20.2065L3.29336 12.7065C2.90288 12.316 2.90285 11.683 3.29336 11.2925L10.7934 3.79248L12.2074 5.20654Z" fill="#101010"/>
              </svg>
            </div>
            <span className="submenu-title">Customers</span>
          </button>
        </div>

        {/* Reports Submenu */}
        <div className={`nav-level nav-level-submenu ${sidebarLevel === 'reports' ? 'active' : ''} ${getAnimationClass('reports')}`}>
          <button className="submenu-header" onClick={() => handleNavigateBack('main')}>
            <div className="nav-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2074 5.20654L6.41445 10.9995L20.0004 10.9995V12.9995L6.41445 12.9995L12.2074 18.7925L10.7934 20.2065L3.29336 12.7065C2.90288 12.316 2.90285 11.683 3.29336 11.2925L10.7934 3.79248L12.2074 5.20654Z" fill="#101010"/>
              </svg>
            </div>
            <span className="submenu-title">Reports</span>
          </button>
        </div>

        {/* Staff Submenu */}
        <div className={`nav-level nav-level-submenu ${sidebarLevel === 'staff' ? 'active' : ''} ${getAnimationClass('staff')}`}>
          <button className="submenu-header" onClick={() => handleNavigateBack('main')}>
            <div className="nav-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2074 5.20654L6.41445 10.9995L20.0004 10.9995V12.9995L6.41445 12.9995L12.2074 18.7925L10.7934 20.2065L3.29336 12.7065C2.90288 12.316 2.90285 11.683 3.29336 11.2925L10.7934 3.79248L12.2074 5.20654Z" fill="#101010"/>
              </svg>
            </div>
            <span className="submenu-title">Staff</span>
          </button>
        </div>

        {/* Banking Submenu */}
        <div className={`nav-level nav-level-submenu ${sidebarLevel === 'banking' ? 'active' : ''} ${getAnimationClass('banking')}`}>
          <button className="submenu-header" onClick={() => handleNavigateBack('main')}>
            <div className="nav-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2074 5.20654L6.41445 10.9995L20.0004 10.9995V12.9995L6.41445 12.9995L12.2074 18.7925L10.7934 20.2065L3.29336 12.7065C2.90288 12.316 2.90285 11.683 3.29336 11.2925L10.7934 3.79248L12.2074 5.20654Z" fill="#101010"/>
              </svg>
            </div>
            <span className="submenu-title">Banking</span>
          </button>
        </div>

        {/* Settings Submenu */}
        <div className={`nav-level nav-level-submenu ${sidebarLevel === 'settings' ? 'active' : ''} ${getAnimationClass('settings')}`}>
          <button className="submenu-header" onClick={() => handleNavigateBack('main')}>
            <div className="nav-back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2074 5.20654L6.41445 10.9995L20.0004 10.9995V12.9995L6.41445 12.9995L12.2074 18.7925L10.7934 20.2065L3.29336 12.7065C2.90288 12.316 2.90285 11.683 3.29336 11.2925L10.7934 3.79248L12.2074 5.20654Z" fill="#101010"/>
              </svg>
            </div>
            <span className="submenu-title">Settings</span>
          </button>
          <nav className="nav-menu nav-menu-submenu" aria-label="Settings">
            <span className="settings-submenu-label">Business settings</span>
            <a href="#" className={`nav-item nav-item-text-only ${activePage === 'settings' && activeSettingsSection === 'business-profile' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('business-profile'); }}>
              {profileVersion === 'v2' ? 'Business profile' : 'My business'}
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'payments' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('payments'); }}>
              Payments
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'permissions' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('permissions'); }}>
              Permissions
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'devices' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('devices'); }}>
              Devices
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'linked-banks' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('linked-banks'); }}>
              Linked banks
            </a>
            <div className="nav-divider-container"><div className="nav-divider" /></div>
            <span className="settings-submenu-label">Account settings</span>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'account-security' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('account-security'); }}>
              Account & security
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'legal-taxes' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('legal-taxes'); }}>
              Legal & taxes
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'subscriptions' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('subscriptions'); }}>
              Subscriptions
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'preferences' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('preferences'); }}>
              Preferences
            </a>
            <a href="#" className={`nav-item nav-item-text-only ${activeSettingsSection === 'notifications' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavigateToSettings(); onSettingsSectionChange?.('notifications'); }}>
              Notifications
            </a>
          </nav>
        </div>

      </div>

      {/* Fixed bottom section - account nav (same as blade footer) + footer icons */}
      <div className="sidebar-bottom">
        <button
          type="button"
          className={`sidebar-account-nav nav-item ${isAccountBladeOpen ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onAccountBladeOpen?.(); }}
          aria-label="Account"
        >
          <div className="account-blade-user">
            <div className="account-blade-avatar">
              <span className="account-blade-avatar-initials">VO</span>
              <div className="account-blade-avatar-status"></div>
            </div>
            <div className="account-blade-user-info">
              <span className="account-blade-user-name">Vitaly Odemchuk</span>
              <span className="account-blade-user-role">Account settings · Owner</span>
            </div>
          </div>
        </button>

        <div className="sidebar-footer">
          {/* 1. Version Toggle */}
          <button 
            className="footer-icon version-icon" 
            aria-label="Toggle Version"
            onClick={() => {
              const versions = ['v1', 'v2']
              const currentIndex = versions.indexOf(profileVersion)
              const nextIndex = (currentIndex + 1) % versions.length
              onProfileVersionChange(versions[nextIndex])
            }}
            title={`Version ${profileVersion.replace('v', '')} - Click to switch`}
          >
            <img 
              src={profileVersion === 'v2' ? Circle2Icon : Circle1Icon} 
              alt="" 
              width="24" 
              height="24" 
            />
          </button>
          {/* 2. Dark / Light mode toggle */}
          <button
            type="button"
            className={`footer-icon theme-toggle ${theme === 'dark' ? 'theme-toggle--dark' : ''}`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onThemeChange || (() => {})}
          >
            <img src={DarkModeIcon} alt="" width="24" height="24" className="theme-toggle-icon" />
          </button>
          {/* 3. Onboarding - back to pre-dashboard view */}
          <button 
            className="footer-icon footer-icon-blink" 
            aria-label="Onboarding"
            onClick={() => (onOpenOnboarding ? onOpenOnboarding() : onPageChange('neighborhoods'))}
          >
            <img src={DepartmentStoreIcon} alt="" width="24" height="24" />
          </button>
          {/* 4. New / Returning customer view (states) */}
          <button 
            className="footer-icon" 
            aria-label={customerViewMode === 'returning' ? 'Returning customer' : 'New customer'}
            onClick={() => {
              if (onCustomerViewModeChange) {
                onCustomerViewModeChange(customerViewMode === 'returning' ? 'new-1' : 'returning')
              }
            }}
          >
            <img 
              src={(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? NewIcon : ReturningIcon} 
              alt="" 
              width="24" 
              height="24" 
            />
          </button>
          {/* 5. Passkey */}
          <button 
            className="footer-icon" 
            aria-label="Passkey"
          >
            <img src={PasskeyIcon} alt="" width="24" height="24" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
