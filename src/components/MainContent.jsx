import { useState, useRef, useEffect, useCallback } from 'react'
import FollowersSection from './FollowersSection'
import MessagesCard from './MessagesCard'
import RewardsCard from './RewardsCard'
import NeighborhoodsGuides from './NeighborhoodsGuides'
import ProfileLocationsPage from './ProfileLocationsPage'
import BaseProfilePage from './BaseProfilePage'
import ManageBusinessGroupsModal from './ManageBusinessGroupsModal'
import CheckIcon from '../assets/Check.svg'
import RecurringAutomaticIcon from '../assets/16/recurring-automatic.svg'
import FormIcon from '../assets/Form.svg'
import CalendarDateIcon from '../assets/Calendar date.svg'
import BookCheckmarkIcon from '../assets/book checkmark.svg'
import HumanCheckIcon from '../assets/Human check.svg'
import SeatMapIcon from '../assets/Seat map.svg'
import TilesIcon from '../assets/Tiles.svg'
import ClockIcon from '../assets/Clock.svg'
import LockOnIcon from '../assets/Lock on.svg'
import PerferencesIcon from '../assets/perferences.svg'
import StaffIcon from '../assets/staff.svg'
import avatar1 from '../assets/avatar-1.png'
import avatar2 from '../assets/avatar-2.png'
import avatar3 from '../assets/avatar-3.png'
import CycleBackwardIcon from '../assets/Cycle backward.svg'
import CycleForwardIcon from '../assets/Cycle forward.svg'
import GlobeIcon from '../assets/Globe.svg'
import ShopInStoreIcon from '../assets/24/shop-in-store.svg'
import FoodMenuIcon from '../assets/Food menu.svg'
import PlusCircleIcon from '../assets/Plus in circle.svg'
import PlusIcon from '../assets/Plus-large.svg'
import CashAppIcon from '../assets/Cash App.svg'
import ChevronRightIcon from '../assets/Chevron right.svg'
import CaretDownIcon from '../assets/16/caret-down.svg'
import DefaultWebsite from './DefaultWebsite'
import SendIcon from '../assets/Product review 12/send-icon.svg'
import MicrophoneIcon from '../assets/Microphone.svg'
import HistoryIcon from '../assets/History.svg'
import TimeIcon from '../assets/timeicon.svg'
import CategoryShoppingIcon from '../assets/24/category-shopping.svg'
import PickupCurbsideIcon from '../assets/Pickup curbside.svg'
import PackageTrackingIcon from '../assets/24/package-tracking.svg'
import CategoryAutoIcon from '../assets/24/category-auto.svg'
import DeliveryIcon from '../assets/24/delivery.svg'
import InfoIcon from '../assets/info.svg'
import NeighborhoodsIcon from '../assets/neighborhoods.svg'
import SellerCardPinMain from '../assets/Seller-card-pin-main.svg'
import SellerCardPin1 from '../assets/Seller-card-pin1.svg'
import SellerCardPin2 from '../assets/Seller-card-pin2.svg'
import SellerCardPin3 from '../assets/Seller-card-pin3.svg'
import bigMap from '../assets/big-map.png'
import { cloneSharedOrgLocations } from '../data/sharedOrgLocations'

// Brand logos for small brand card
import jbLogoLarge from '../assets/joy-bakeshop-logo.svg'
import bfbLogoLarge from '../assets/Product review 12/bfb-logo.svg'
import kjLogoLarge from '../assets/Product review 12/kj-logo.svg'
import sotLogoLarge from '../assets/Product review 12/spot-of-tea-logo.svg'
import vcLogoLarge from '../assets/Product review 12/vanilla-cafe-logo.svg'
import tmLogoLarge from '../assets/Product review 12/tea-monks-logo.svg'
import pscLogoLarge from '../assets/Product review 12/paper-son-coffee-logo.svg'
import AppleMap from './AppleMap'
import WavePattern from './WavePattern'
import jbLogo from '../assets/jb-logo.png'
import itemThumb1 from '../assets/website images/_item-1.png'
import itemThumb2 from '../assets/website images/_item-2.png'
import itemThumb3 from '../assets/website images/_item-3.png'
import itemThumb4 from '../assets/website images/_item-4.png'
import websiteThumbBanner from '../assets/website-thumbs-02.png'
import websiteThumbFeatured from '../assets/website-thumbs-03.png'
import websiteThumbAbout from '../assets/website-thumbs-04.png'
import websiteThumbCallout from '../assets/website-thumbs-05.png'
import newCustomerThumbBanner from '../assets/new-customer-thumbs-businessbanner.png'
import newCustomerThumbMenu from '../assets/new-customer-thumbs-menu.png'
import newCustomerThumbItemModal from '../assets/new-customer-thumbs-itemmodal.png'
import websiteAboutThumb1 from '../assets/website-about-thumbs-01.png'
import websiteAboutThumb2 from '../assets/website-about-thumbs-02.png'
import websiteAboutThumb3 from '../assets/website-about-thumbs-03.png'
import GoogleLogo from '../assets/Google multicolor.svg'
import AppleLogo from '../assets/Apple.svg'
import OpenAILogo from '../assets/openai.svg'
import MetaLogo from '../assets/Meta.svg'
import DoorDashIcon from '../assets/DoorDash.svg'
import UberEatsIcon from '../assets/Uber Eats.svg'
import GrubhubIcon from '../assets/Grubhub.svg'
import Circle1Icon from '../assets/Circle 1.svg'
import Circle2Icon from '../assets/Circle 2.svg'
import DarkModeIcon from '../assets/Dark mode.svg'
import DepartmentStoreIcon from '../assets/24/category-department-store.svg'
import PasskeyIcon from '../assets/Passkey.svg'
import NewIcon from '../assets/new.svg'
import ReturningIcon from '../assets/returningcustomer.svg'
import SettingsIcon from '../assets/settings.svg'
import './MainContent.css'
import './BaseProfilePage.css'

const brandLogos = {
  'joy-bakeshop': jbLogoLarge,
  'brooklyn-french-bakers': bfbLogoLarge,
  'keva-juice': kjLogoLarge,
  'spot-of-tea': sotLogoLarge,
  'vanilla-cafe': vcLogoLarge,
  'tea-monks': tmLogoLarge,
  'paper-son-coffee': pscLogoLarge
}

// Returning customer: block thumbnails per page for modal "blocks canvas" view
const websiteBlocksByPage = {
  home: [websiteThumbBanner, websiteThumbFeatured, websiteThumbAbout, websiteThumbCallout],
  'order-online': [newCustomerThumbMenu, newCustomerThumbItemModal],
  about: [websiteAboutThumb1, websiteAboutThumb2, websiteAboutThumb3]
}

// Block display names per page (for Blink message when editing a block)
const websiteBlockNamesByPage = {
  home: ['Banner', 'Feature items', 'About', 'Call-out'],
  'order-online': ['Menu', 'Item modal'],
  about: ['About section 1', 'About section 2', 'About section 3']
}

const brandData = {
  'joy-bakeshop': { 
    name: 'Joy Bakeshop', 
    color: '#0000FF', 
    handle: '$joybakeshop',
    about: "We're a small, butter-obsessed bakery making croissants, danishes, and morning buns the old-fashioned way: slow fermentation, real ingredients, and daily bakes. Saving by for flaky layers, seasonal fillings, and coffee that plays nice with pastry.",
    team: ['Vitaly', 'Brooke', 'Jane'],
    locations: cloneSharedOrgLocations()
  },
  'brooklyn-french-bakers': { 
    name: 'Brooklyn French Bakers', 
    color: '#FF8C42', 
    handle: '$brooklynfrenchbakers',
    about: "This store delivers fresh pastries and bread every morning from our kitchen on Columbia Street, Waterfront. Brooklyn French Bakers is owned by French who are passionate about sharing French culture and products.",
    locations: cloneSharedOrgLocations()
  },
  'keva-juice': { 
    name: 'Keva Juice', 
    color: '#FF6B35', 
    handle: '$kevasmoothie',
    about: "Keva Juice is Reno, Nevada and Colorado Springs' oldest smoothie, açaí, and juice bar, proudly serving our community for more than 20 years. As a family-owned business, our passion for providing the best smoothies, açaí bowls, and fresh juices has helped us become the go-to local spot for healthy and delicious drinks.",
    locations: cloneSharedOrgLocations()
  },
  'spot-of-tea': { 
    name: 'Spot of Tea', 
    color: '#4A7C59', 
    handle: '$spotoftea',
    about: "A cozy tea house offering premium loose-leaf teas from around the world. We specialize in traditional brewing methods and pair our teas with house-made pastries.",
    locations: cloneSharedOrgLocations()
  },
  'vanilla-cafe': { 
    name: 'Vanilla Cafe', 
    color: '#D4A574', 
    handle: '$vanillacafe',
    about: "Your neighborhood coffee shop serving artisanal espresso drinks and fresh-baked goods. We source our beans from local roasters and bake everything in-house daily.",
    locations: cloneSharedOrgLocations()
  },
  'tea-monks': { 
    name: 'Tea Monks', 
    color: '#8B4513', 
    handle: '$teamonks',
    about: "Traditional tea ceremonies meet modern wellness. We offer rare teas, meditation sessions, and a peaceful retreat from the busy city.",
    locations: cloneSharedOrgLocations()
  },
  'paper-son-coffee': { 
    name: 'Paper Son Coffee', 
    color: '#2F4F4F', 
    handle: '$papersoncoffee',
    about: "A specialty coffee roaster and café celebrating Asian-American heritage through unique flavor profiles and community events.",
    locations: cloneSharedOrgLocations()
  }
}

function MainContent({ activeBrand, onBrandChange, pageState, onPageStateChange, activePage, onReloadBrand, brandState, onBrandStateChange, isNavigating, profileVersion, onProfileVersionChange, isPreviewVisible, onPreviewVisibilityChange, isSwitchBusinessModalOpen, isSwitchBusinessModalClosing, onSwitchBusinessModalOpen, onSwitchBusinessModalClose, onSelectBusiness, customerViewMode = 'returning', onCustomerViewModeChange, activeSettingsSection = 'business-profile', onSettingsSectionChange, theme, onThemeChange, onOpenOnboarding, onNavigationStart, onSidebarLevelChange, onAccountBladeOpen, orgBusinesses = [], brandGroups = [], onBrandGroupsChange = () => {}, mergedBrandData = {}, demoMode = 'franchise' }) {
  const brand = brandData[activeBrand] || brandData['joy-bakeshop']
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [neighborhoodsStartLoading, setNeighborhoodsStartLoading] = useState(false)
  const [onboardingLoading, setOnboardingLoading] = useState(false)
  const [createMessageModalOpen, setCreateMessageModalOpen] = useState(false)
  const [neighborhoodsEditModalOpen, setNeighborhoodsEditModalOpen] = useState(false)
  const [neighborhoodsEditModalClosing, setNeighborhoodsEditModalClosing] = useState(false)
  const [neighborhoodsEditActiveSection, setNeighborhoodsEditActiveSection] = useState('brand')
  const [neighborhoodsLocationOpen, setNeighborhoodsLocationOpen] = useState(false)
  const [selectedNeighborhoodsLocation, setSelectedNeighborhoodsLocation] = useState('Brookhaven')
  const neighborhoodsLocationRef = useRef(null)
  const [availabilityAllowMultiple, setAvailabilityAllowMultiple] = useState(true)
  const [availabilityHideTeamMembers, setAvailabilityHideTeamMembers] = useState(false)
  const [availabilityDailyLimit, setAvailabilityDailyLimit] = useState(false)
  const [availabilityTextUs, setAvailabilityTextUs] = useState(true)
  const [availabilityWaitlist, setAvailabilityWaitlist] = useState(false)
  const [bookingReservationsModalOpen, setBookingReservationsModalOpen] = useState(false)
  const [bookingReservationsModalClosing, setBookingReservationsModalClosing] = useState(false)
  const [bookingAppointmentsModalOpen, setBookingAppointmentsModalOpen] = useState(false)
  const [bookingAppointmentsModalClosing, setBookingAppointmentsModalClosing] = useState(false)
  const [bookingReservationsSection, setBookingReservationsSection] = useState('table')
  const [bookingAppointmentsSection, setBookingAppointmentsSection] = useState('services')
  const dropdownRef = useRef(null)
  const [manageBusinessGroupsModalOpen, setManageBusinessGroupsModalOpen] = useState(false)
  const [mainToast, setMainToast] = useState(null)
  const handleShowToast = useCallback((message) => {
    setMainToast(message)
    setTimeout(() => setMainToast(null), 3000)
  }, [])
  const [openFullScreenBusinessEditBrandId, setOpenFullScreenBusinessEditBrandId] = useState(null)
  const [openBrandGroupBrandingGroupId, setOpenBrandGroupBrandingGroupId] = useState(null)
  const [openManageGroupsToEditGroupId, setOpenManageGroupsToEditGroupId] = useState(null)

  const handleOpenFullScreenBusinessEditConsumed = useCallback(() => {
    setOpenFullScreenBusinessEditBrandId(null)
  }, [])

  const handleOpenBrandGroupBrandingConsumed = useCallback(() => {
    setOpenBrandGroupBrandingGroupId(null)
  }, [])

  const handleEditGroupBrandingFromManage = useCallback(() => {}, [])

  const handleOpenToEditGroupConsumed = useCallback(() => {
    setOpenManageGroupsToEditGroupId(null)
  }, [])

  const handleRequestEditBrandGroupModal = useCallback((groupId) => {
    if (!groupId) return
    setManageBusinessGroupsModalOpen(true)
    setOpenManageGroupsToEditGroupId(groupId)
  }, [])

  const [profilePageAddMenuOpen, setProfilePageAddMenuOpen] = useState(false)
  const profilePageAddMenuRef = useRef(null)

  // Track map reveal animation - runs every time Neighborhoods page is entered
  const [mapRevealDone, setMapRevealDone] = useState(false)
  const [mapRevealKey, setMapRevealKey] = useState(0)
  const gradientOverlayRef = useRef(null)
  const prevActivePageRef = useRef(activePage)

  useEffect(() => {
    if (activePage === 'neighborhoods' && prevActivePageRef.current !== 'neighborhoods') {
      setMapRevealDone(false)
      setMapRevealKey(k => k + 1)
    }
    prevActivePageRef.current = activePage
  }, [activePage])

  function getGradientBase() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    return isDark ? '22,22,22' : '255,255,255'
  }

  useEffect(() => {
    if (activePage !== 'neighborhoods') return

    const rgb = getGradientBase()
    if (gradientOverlayRef.current) {
      gradientOverlayRef.current.style.background = `linear-gradient(to bottom, rgba(${rgb},1) 0%, rgba(${rgb},1) 100%)`
    }

    const holdTime = 800
    const fadeDuration = 2000
    const startTime = performance.now()

    function animateGradient(now) {
      const elapsed = now - startTime
      if (elapsed < holdTime) {
        requestAnimationFrame(animateGradient)
        return
      }
      const fadeElapsed = elapsed - holdTime
      const progress = Math.min(fadeElapsed / fadeDuration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      if (gradientOverlayRef.current) {
        const topOpacity = 1 - eased
        gradientOverlayRef.current.style.background = `linear-gradient(to bottom, rgba(${rgb},${topOpacity}) 0%, rgba(${rgb},1) 100%)`
      }

      if (progress < 1) {
        requestAnimationFrame(animateGradient)
      } else {
        if (gradientOverlayRef.current) {
          gradientOverlayRef.current.style.background = ''
        }
        setMapRevealDone(true)
      }
    }
    requestAnimationFrame(animateGradient)
  }, [activePage, profileVersion, mapRevealKey])

  // Neighborhoods subtitle typewriter
  const [subtitleDisplayedText, setSubtitleDisplayedText] = useState('')
  const subtitleTexts = {
    'new-1': 'Atlanta has about 315,000 Cash App customers and 221 nearby businesses. Join the network with online ordering, direct marketing, neighborhood rewards, and lower processing fees.',
    'new-2': "You're all set to accept Local Cash. No action needed. Schedule a call to pause your participation in Neighborhoods.",
    'returning': "Your first week on Neighborhoods brought 1,247 followers. These customers spend 3× more and return 78.5% of the time with Local Cash.",
  }

  useEffect(() => {
    if (activePage !== 'neighborhoods') return
    if (customerViewMode !== 'new-1' && customerViewMode !== 'new-2' && customerViewMode !== 'returning') return

    const fullText = subtitleTexts[customerViewMode]
    setSubtitleDisplayedText('')

    const words = fullText.split(' ')
    let wordIndex = 0
    let charIndex = 0
    let currentText = ''
    let timeoutId = null

    const typeNextChar = () => {
      if (wordIndex >= words.length) return

      const currentWord = words[wordIndex]

      if (charIndex < currentWord.length) {
        currentText += currentWord[charIndex]
        setSubtitleDisplayedText(currentText)
        charIndex++
        timeoutId = setTimeout(typeNextChar, 5)
      } else {
        if (wordIndex < words.length - 1) {
          currentText += ' '
          setSubtitleDisplayedText(currentText)
        }
        wordIndex++
        charIndex = 0
        timeoutId = setTimeout(typeNextChar, 35)
      }
    }

    timeoutId = setTimeout(typeNextChar, 300)

    return () => { if (timeoutId) clearTimeout(timeoutId) }
  }, [activePage, profileVersion, customerViewMode])

  // Modal state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
  const [isBrandModalClosing, setIsBrandModalClosing] = useState(false)
  
  // V2 Website modal state
  const [isV2WebsiteModalOpen, setIsV2WebsiteModalOpen] = useState(false)
  const [isV2WebsiteModalClosing, setIsV2WebsiteModalClosing] = useState(false)
  
  // Upgrade modal state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [isUpgradeModalClosing, setIsUpgradeModalClosing] = useState(false)
  
  // Upgrade sidebar state
  const [isUpgradeSidebarOpen, setIsUpgradeSidebarOpen] = useState(false)
  
  // Blink option selection state
  const [selectedBlinkOption, setSelectedBlinkOption] = useState(null)
  const [loadingBlinkOption, setLoadingBlinkOption] = useState(null)
  const [isComposerHighlighted, setIsComposerHighlighted] = useState(false)
  const composerRef = useRef(null)
  
  // Editor mode state - determines kickoff message and options
  const [editorMode, setEditorMode] = useState('onboarding')
  // 'onboarding' | 'add-page' | 'edit-block' | 'edit-page' | 'customize'

  // When returning customer opens modal from a Website page thumbnail, show that page's blocks in the canvas
  const [websitePreviewPage, setWebsitePreviewPage] = useState(null)
  // 'home' | 'order-online' | 'about' | null
  const [websitePreviewBlockIndex, setWebsitePreviewBlockIndex] = useState(null)
  // When set, scroll the blocks canvas to this block index (0-based)
  const blocksCanvasRef = useRef(null)
  
  // Conversation state - history of exchanges
  const [conversationHistory, setConversationHistory] = useState([])
  // Each item: { blinkMessage: string, userResponse: string, options: array }
  
  // Current active exchange
  const [currentUserMessage, setCurrentUserMessage] = useState(null) // User's typed message (visible until next selection)
  const [currentBlinkMessage, setCurrentBlinkMessage] = useState('')
  const [currentOptions, setCurrentOptions] = useState([])
  const [currentSecondaryOptions, setCurrentSecondaryOptions] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isBlinkThinking, setIsBlinkThinking] = useState(false)
  const [isCollapsing, setIsCollapsing] = useState(false) // Animation state for collapsing to history

  useEffect(() => {
    if (!neighborhoodsLocationOpen) return
    const handleClickOutside = (e) => {
      if (neighborhoodsLocationRef.current && !neighborhoodsLocationRef.current.contains(e.target)) {
        setNeighborhoodsLocationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [neighborhoodsLocationOpen])
  
  // Animation sequence state
  const [animationStep, setAnimationStep] = useState(0)
  // 0 = not started, 1 = typing, 2 = line drawing, 3 = monogram reveal, 4 = options folding in, 5 = complete
  
  // Typing animation state
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  
  // Kickoff messages based on editor mode
  const getKickoffData = (mode) => {
    const data = {
      'onboarding': {
        message: "Welcome! I'm Blink, your website assistant. Your site is made up of blocks — sections or pages like banners, menus, or location info. You can also click directly on the website to change things.",
        options: [
          { id: 'add-block-to-page', title: 'Add a block to your Order online page', type: 'conversation' },
          { id: 'add-page', title: 'Add a page', type: 'conversation' }
        ],
        secondaryOptions: [
          { id: 'explore-designs', title: 'Explore designs' },
          { id: 'upload-share', title: 'Upload or share a link' }
        ]
      },
      'add-page': {
        message: "Let's add a page. Here are some options. All the different types of pages you could add.",
        options: [
          { id: 'homepage', title: 'Homepage', type: 'preview' },
          { id: 'team', title: 'Our team', type: 'preview' },
          { id: 'about', title: 'About us', type: 'preview' },
          { id: 'locations', title: 'Our locations', type: 'preview' }
        ]
      },
      'edit-block': {
        message: "Let's edit this block. What would you like to change?",
        options: [
          { id: 'change-image', title: 'Change image', type: 'conversation' },
          { id: 'edit-text', title: 'Edit text', type: 'conversation' },
          { id: 'change-layout', title: 'Change layout', type: 'conversation' },
          { id: 'delete-block', title: 'Delete block', type: 'conversation' }
        ]
      },
      'edit-page': {
        message: "Working on your Homepage. What can I help with?",
        options: [
          { id: 'add-block', title: 'Add a block', type: 'conversation' },
          { id: 'reorder', title: 'Reorder blocks', type: 'conversation' },
          { id: 'page-settings', title: 'Page settings', type: 'conversation' },
          { id: 'preview', title: 'Preview page', type: 'preview' }
        ]
      },
      'customize': {
        message: "Let's customize your site. Where should we start?",
        options: [
          { id: 'colors', title: 'Colors', type: 'preview' },
          { id: 'fonts', title: 'Fonts', type: 'preview' },
          { id: 'logo', title: 'Logo', type: 'conversation' },
          { id: 'navigation', title: 'Navigation', type: 'conversation' }
        ]
      }
    }
    return data[mode] || data['add-page']
  }
  
  // Use block-specific message for typing when returning customer opened a page/block
  const fullMessage = (() => {
    if (editorMode === 'edit-block' && websitePreviewPage && websiteBlockNamesByPage[websitePreviewPage]) {
      const names = websiteBlockNamesByPage[websitePreviewPage]
      const idx = websitePreviewBlockIndex != null && websitePreviewBlockIndex >= 0 && websitePreviewBlockIndex < names.length ? websitePreviewBlockIndex : 0
      return `You're editing ${names[idx]}. What would you like to do?`
    }
    return getKickoffData(editorMode).message
  })()
  
  // Typing animation effect - word by word with fast character burst
  useEffect(() => {
    if (animationStep !== 1) {
      return
    }
    
    setDisplayedText('')
    setIsTypingComplete(false)
    
    const words = fullMessage.split(' ')
    let wordIndex = 0
    let charIndex = 0
    let currentText = ''
    let timeoutId = null
    
    const typeNextChar = () => {
      if (wordIndex >= words.length) {
        setIsTypingComplete(true)
        return
      }
      
      const currentWord = words[wordIndex]
      
      if (charIndex < currentWord.length) {
        // Type characters within word very quickly (5ms per char)
        currentText += currentWord[charIndex]
        setDisplayedText(currentText)
        charIndex++
        timeoutId = setTimeout(typeNextChar, 5)
      } else {
        // Word complete - add space and pause before next word (35ms pause)
        if (wordIndex < words.length - 1) {
          currentText += ' '
          setDisplayedText(currentText)
        }
        wordIndex++
        charIndex = 0
        timeoutId = setTimeout(typeNextChar, 35)
      }
    }
    
    // Start typing
    timeoutId = setTimeout(typeNextChar, 50)
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [animationStep])
  
  const handleBlinkOptionClick = (optionId) => {
    // Find the selected option to get its title (user's "voice")
    const selectedOption = currentOptions.find(opt => opt.id === optionId)
    if (!selectedOption) return
    
    // Check if this is a preview option or conversation option
    const isPreviewOption = selectedOption.type === 'preview'
    
    if (isPreviewOption) {
      // Preview option: Just highlight and show preview, no collapse
      setSelectedBlinkOption(optionId)
      setLoadingBlinkOption(null)
      setIsComposerHighlighted(false)
      return
    }
    
    // Conversation option: Start loading then collapse and advance
    setLoadingBlinkOption(optionId)
    setIsComposerHighlighted(false)
    
    // After loading, start collapse animation then update history
    setTimeout(() => {
      setLoadingBlinkOption(null)
      
      // Start collapse animation
      setIsCollapsing(true)
      
      // After collapse animation, update history and show new response
      setTimeout(() => {
        setIsCollapsing(false)
        
        // Collapse current exchange to history
        if (conversationHistory.length === 0 && !currentUserMessage) {
          // First selection from initial kickoff
          setConversationHistory([{
            blinkMessage: fullMessage,
            userResponse: selectedOption.title,
            isTyped: false
          }])
        } else {
          // Add current state to history
          setConversationHistory(prev => [...prev, {
            blinkMessage: currentBlinkMessage || fullMessage,
            userResponse: selectedOption.title,
            isTyped: false,
            previousUserMessage: currentUserMessage
          }])
        }
        
        // Clear the current user message since we're moving forward
        setCurrentUserMessage(null)
        
        // Show thinking state
        setIsBlinkThinking(true)
        setCurrentBlinkMessage('')
        setCurrentOptions([])
        
        // Generate new response after thinking
        setTimeout(() => {
          setIsBlinkThinking(false)
          const response = generateBlinkResponse(selectedOption.title, optionId)
          setCurrentBlinkMessage(response.message)
          setCurrentOptions(response.options)
          
          // Also set selected state for browser preview transition
          setSelectedBlinkOption(optionId)
        }, 800)
      }, 400) // Collapse animation duration
    }, 600)
  }
  
  const handleUploadClick = () => {
    setIsComposerHighlighted(true)
    setSelectedBlinkOption(null)
    // Focus the textarea after a brief delay
    setTimeout(() => {
      if (composerRef.current) {
        composerRef.current.focus()
      }
    }, 100)
  }
  
  const handleComposerBlur = () => {
    setIsComposerHighlighted(false)
  }
  
  const handleBrowserContainerClick = (e) => {
    // If clicking on the container itself (dead space) or the browser frame, deselect option
    if (e.target.classList.contains('browser-preview-container') || 
        e.target.classList.contains('blink-options-display') ||
        e.target.classList.contains('blink-options-content') ||
        e.target.closest('.website-browser-frame')) {
      setSelectedBlinkOption(null)
    }
  }
  
  const handleCloseV2WebsiteModal = () => {
    setIsV2WebsiteModalClosing(true)
    setTimeout(() => {
      setIsV2WebsiteModalOpen(false)
      setIsV2WebsiteModalClosing(false)
      setIsUpgradeSidebarOpen(false) // Reset sidebar when modal closes
      setWebsitePreviewPage(null)
      setWebsitePreviewBlockIndex(null)
      setSelectedBlinkOption(null) // Reset option selection
      setLoadingBlinkOption(null) // Reset loading state
      setIsComposerHighlighted(false) // Reset composer highlight
      setAnimationStep(0) // Reset animation
      setDisplayedText('') // Reset typing
      setIsTypingComplete(false)
      setConversationHistory([]) // Reset conversation history
      setCurrentUserMessage(null)
      setCurrentBlinkMessage('')
      setCurrentOptions([])
      setCurrentSecondaryOptions([])
      setUserInput('')
      setIsBlinkThinking(false)
      setIsCollapsing(false)
      setEditorMode('onboarding')
    }, 350)
  }
  
  const handleCloseUpgradeModal = () => {
    setIsUpgradeModalClosing(true)
    setTimeout(() => {
      setIsUpgradeModalOpen(false)
      setIsUpgradeModalClosing(false)
    }, 350)
  }

  const handleCloseBookingReservationsModal = () => {
    setBookingReservationsModalClosing(true)
    setTimeout(() => {
      setBookingReservationsModalOpen(false)
      setBookingReservationsModalClosing(false)
    }, 300)
  }

  const handleCloseBookingAppointmentsModal = () => {
    setBookingAppointmentsModalClosing(true)
    setTimeout(() => {
      setBookingAppointmentsModalOpen(false)
      setBookingAppointmentsModalClosing(false)
    }, 300)
  }

  const handleCloseNeighborhoodsEditModal = () => {
    setNeighborhoodsEditModalClosing(true)
    setTimeout(() => {
      setNeighborhoodsEditModalOpen(false)
      setNeighborhoodsEditModalClosing(false)
    }, 300)
  }
  
  const handleUpgradeToPlusClick = () => {
    // Close the upgrade modal and open the sidebar with onboarding
    handleCloseUpgradeModal()
    setTimeout(() => {
      setIsUpgradeSidebarOpen(true)
      setEditorMode('onboarding')
      
      // Get kickoff data for onboarding mode
      const kickoffData = getKickoffData('onboarding')
      
      // Reset conversation state
      setConversationHistory([])
      setCurrentUserMessage(null)
      setCurrentBlinkMessage(kickoffData.message)
      setCurrentOptions(kickoffData.options)
      setCurrentSecondaryOptions(kickoffData.secondaryOptions || [])
      setUserInput('')
      setDisplayedText('')
      setIsTypingComplete(false)
      setIsBlinkThinking(false)
      setIsCollapsing(false)
      
      // Start animation sequence
      setAnimationStep(0)
      setTimeout(() => setAnimationStep(1), 300)
      setTimeout(() => setAnimationStep(2), 1400)
      setTimeout(() => setAnimationStep(3), 1550)
      setTimeout(() => setAnimationStep(4), 1700)
      setTimeout(() => setAnimationStep(5), 2900)
    }, 200)
  }
  
  const handleOpenEditorMode = (mode = 'add-page', previewPage = null, blockIndex = null) => {
    // Open the website preview modal directly in editor mode (with sidebar)
    setIsV2WebsiteModalOpen(true)
    setIsUpgradeSidebarOpen(true)
    setEditorMode(mode)
    setWebsitePreviewPage(previewPage)
    setWebsitePreviewBlockIndex(blockIndex ?? null)
    
    // Kickoff data: when returning customer opens from a page/block, use block-specific message and options
    let kickoffData = getKickoffData(mode)
    if (mode === 'edit-block' && previewPage && websiteBlockNamesByPage[previewPage]) {
      const names = websiteBlockNamesByPage[previewPage]
      const idx = blockIndex != null && blockIndex >= 0 && blockIndex < names.length ? blockIndex : 0
      const blockName = names[idx]
      kickoffData = {
        message: `You're editing ${blockName}. What would you like to do?`,
        options: [
          { id: 'change-layout', title: 'Change layout', type: 'conversation' },
          { id: 'try-new-styles', title: 'Try new styles', type: 'conversation' },
          { id: 'animate-block', title: 'Animate this block', type: 'conversation' },
          { id: 'edit-block', title: 'Edit block', type: 'conversation' }
        ]
      }
    }
    
    // Reset conversation state
    setConversationHistory([])
    setCurrentUserMessage(null)
    setCurrentBlinkMessage(kickoffData.message)
    setCurrentOptions(kickoffData.options)
    setCurrentSecondaryOptions(kickoffData.secondaryOptions || [])
    setUserInput('')
    setDisplayedText('')
    setIsTypingComplete(false)
    setIsBlinkThinking(false)
    
    // Start animation sequence
    setAnimationStep(0)
    setTimeout(() => setAnimationStep(1), 300) // Start typing after sidebar opens
    setTimeout(() => setAnimationStep(2), 1400) // Line draws after typing completes
    setTimeout(() => setAnimationStep(3), 1550) // Monogram reveals quickly after line starts
    setTimeout(() => setAnimationStep(4), 1700) // Options fold in right after monogram
    setTimeout(() => setAnimationStep(5), 2900) // Complete
  }
  
  // Handle user sending a message
  const handleSendMessage = () => {
    if (!userInput.trim()) return
    
    const userMessage = userInput.trim()
    
    // Collapse current exchange to history first (if there was a previous exchange)
    if (currentBlinkMessage && conversationHistory.length === 0) {
      // First message typed - collapse the initial kickoff to history
      setConversationHistory([{
        blinkMessage: fullMessage,
        userResponse: userMessage,
        isTyped: true
      }])
    } else if (currentBlinkMessage) {
      // Subsequent message - collapse current to history
      setConversationHistory(prev => [...prev, {
        blinkMessage: currentBlinkMessage,
        userResponse: userMessage,
        isTyped: true
      }])
    }
    
    // Set user's typed message as visible in active view
    setCurrentUserMessage(userMessage)
    setUserInput('')
    setIsBlinkThinking(true)
    setCurrentBlinkMessage('')
    setCurrentOptions([])
    
    // Generate response after thinking
    setTimeout(() => {
      setIsBlinkThinking(false)
      const response = generateBlinkResponse(userMessage)
      setCurrentBlinkMessage(response.message)
      setCurrentOptions(response.options)
    }, 1000)
  }
  
  // Generate contextual response based on user input or option selection
  const generateBlinkResponse = (input, optionId = null) => {
    const lowerInput = input.toLowerCase()
    
    // Responses based on specific option IDs (when user clicks an option)
    if (optionId) {
      const optionResponses = {
        // Onboarding options
        'add-block-to-page': {
          message: "Let's add a block to your Order online page. What type of block would you like to add?",
          options: [
            { id: 'hero-banner', title: 'Banner', type: 'preview' },
            { id: 'featured-items', title: 'Menu items', type: 'preview' },
            { id: 'about-preview', title: 'About section', type: 'preview' },
            { id: 'locations-block', title: 'Locations', type: 'preview' }
          ]
        },
        'add-first-block': {
          message: "Great! Let's add your first block. Blocks are the building pieces of your pages — things like banners, menus, team sections, and more. What type of block would you like to start with?",
          options: [
            { id: 'hero-banner', title: 'Banner', type: 'preview' },
            { id: 'featured-items', title: 'Menu items', type: 'preview' },
            { id: 'about-preview', title: 'About section', type: 'preview' },
            { id: 'locations-block', title: 'Locations', type: 'preview' }
          ]
        },
        'add-page': {
          message: "Let's add a new page to your site. What kind of page would you like to create?",
          options: [
            { id: 'homepage', title: 'Homepage', type: 'preview' },
            { id: 'team', title: 'Our team', type: 'preview' },
            { id: 'about', title: 'About us', type: 'preview' },
            { id: 'locations', title: 'Our locations', type: 'preview' }
          ]
        },
        'explore-designs': {
          message: "Here are some design templates to inspire you. Click any to preview how it would look on your site.",
          options: [
            { id: 'minimal-design', title: 'Minimal', type: 'preview' },
            { id: 'bold-design', title: 'Bold & vibrant', type: 'preview' },
            { id: 'elegant-design', title: 'Elegant', type: 'preview' },
            { id: 'playful-design', title: 'Playful', type: 'preview' }
          ]
        },
        // Add page options
        'homepage': {
          message: "Great choice! Let's build your homepage. What should we start with?",
          options: [
            { id: 'hero-banner', title: 'Hero banner', type: 'preview' },
            { id: 'featured-items', title: 'Featured items', type: 'preview' },
            { id: 'about-preview', title: 'About preview', type: 'preview' },
            { id: 'browse-templates', title: 'Browse templates', type: 'preview' }
          ]
        },
        'team': {
          message: "Let's showcase your team! How would you like to display them?",
          options: [
            { id: 'grid-layout', title: 'Grid layout', type: 'preview' },
            { id: 'carousel', title: 'Carousel', type: 'preview' },
            { id: 'list-view', title: 'List view', type: 'preview' }
          ]
        },
        'about': {
          message: "Tell your story! What sections should we include?",
          options: [
            { id: 'story-block', title: 'Our story', type: 'preview' },
            { id: 'mission', title: 'Mission & values', type: 'preview' },
            { id: 'timeline', title: 'Timeline', type: 'preview' }
          ]
        },
        'locations': {
          message: "Let's add your locations. How should they appear?",
          options: [
            { id: 'map-view', title: 'Map view', type: 'preview' },
            { id: 'cards-view', title: 'Location cards', type: 'preview' },
            { id: 'list-simple', title: 'Simple list', type: 'preview' }
          ]
        },
        // Edit block options
        'change-image': {
          message: "Let's update this image. Where should we get it from?",
          options: [
            { id: 'upload-new', title: 'Upload new', type: 'conversation' },
            { id: 'from-library', title: 'From library', type: 'conversation' },
            { id: 'generate-ai', title: 'Generate with AI', type: 'conversation' }
          ]
        },
        'edit-text': {
          message: "What would you like to change?",
          options: [
            { id: 'edit-headline', title: 'Edit headline', type: 'conversation' },
            { id: 'edit-description', title: 'Edit description', type: 'conversation' },
            { id: 'edit-button', title: 'Edit button', type: 'conversation' }
          ]
        },
        // Browse designs
        'browse-templates': {
          message: "We have some great options. Would you like to setup booking as well?",
          options: [
            { id: 'setup-booking', title: 'Setup booking first', type: 'conversation' },
            { id: 'browse-events', title: 'Browse booking & event designs', type: 'preview' },
            { id: 'add-book-block', title: 'Add a "Book an event" block', type: 'conversation' }
          ]
        },
        'browse-events': {
          message: "Let's browse booking & event designs made with love",
          options: [
            { id: 'booking-images', title: 'Booking block with images', type: 'preview' },
            { id: 'events-images', title: 'Events block with images', type: 'preview' }
          ]
        }
      }
      
      if (optionResponses[optionId]) {
        return optionResponses[optionId]
      }
    }
    
    // Text-based responses (when user types)
    
    // Banner/hero related
    if (lowerInput.includes('banner') || lowerInput.includes('hero') || lowerInput.includes('header image')) {
      return {
        message: "Let's update your banner! Here are some options:",
        options: [
          { id: 'upload-banner', title: 'Upload new image', type: 'conversation' },
          { id: 'template-banner', title: 'Choose template', type: 'preview' },
          { id: 'ai-banner', title: 'Generate with AI', type: 'conversation' }
        ]
      }
    }
    
    // Events/booking related
    if (lowerInput.includes('event') || lowerInput.includes('book') || lowerInput.includes('template')) {
      return {
        message: "We have some great options. Would you like to setup booking as well?",
        options: [
          { id: 'setup-booking', title: 'Setup booking first', type: 'conversation' },
          { id: 'browse-events', title: 'Browse booking & event designs', type: 'preview' },
          { id: 'add-book-block', title: 'Add a "Book an event" block', type: 'conversation' }
        ]
      }
    }
    
    // Colors/theme related
    if (lowerInput.includes('color') || lowerInput.includes('theme') || lowerInput.includes('brand')) {
      return {
        message: "I can help with your color scheme. What direction?",
        options: [
          { id: 'brand-colors', title: 'Use brand colors', type: 'preview' },
          { id: 'suggest-colors', title: 'Suggest new palette', type: 'preview' },
          { id: 'custom-colors', title: 'Pick custom colors', type: 'conversation' }
        ]
      }
    }
    
    // Font/text related
    if (lowerInput.includes('font') || lowerInput.includes('text') || lowerInput.includes('typography')) {
      return {
        message: "Typography makes a big difference. Here's what we can do:",
        options: [
          { id: 'font-pairing', title: 'Font pairings', type: 'preview' },
          { id: 'change-headlines', title: 'Change headlines', type: 'preview' },
          { id: 'adjust-sizes', title: 'Adjust sizes', type: 'preview' }
        ]
      }
    }
    
    // Layout/structure related
    if (lowerInput.includes('layout') || lowerInput.includes('move') || lowerInput.includes('rearrange') || lowerInput.includes('order')) {
      return {
        message: "Let's rearrange things. What would you like to do?",
        options: [
          { id: 'reorder-blocks', title: 'Reorder blocks', type: 'conversation' },
          { id: 'change-grid', title: 'Change grid', type: 'preview' },
          { id: 'add-spacing', title: 'Adjust spacing', type: 'preview' }
        ]
      }
    }
    
    // Add something
    if (lowerInput.includes('add') || lowerInput.includes('new') || lowerInput.includes('create')) {
      return {
        message: "What would you like to add?",
        options: [
          { id: 'add-section', title: 'Add section', type: 'preview' },
          { id: 'add-image', title: 'Add image', type: 'conversation' },
          { id: 'add-text', title: 'Add text', type: 'conversation' },
          { id: 'add-button', title: 'Add button', type: 'conversation' }
        ]
      }
    }
    
    // Modern/style related
    if (lowerInput.includes('modern') || lowerInput.includes('style') || lowerInput.includes('look') || lowerInput.includes('design')) {
      return {
        message: "I can help modernize the look. Which style feels right?",
        options: [
          { id: 'minimal', title: 'Minimalist', type: 'preview' },
          { id: 'bold', title: 'Bold & colorful', type: 'preview' },
          { id: 'elegant', title: 'Elegant', type: 'preview' },
          { id: 'playful', title: 'Playful', type: 'preview' }
        ]
      }
    }
    
    // Default response
    return {
      message: "I can help with that! What specifically would you like to work on?",
      options: [
        { id: 'edit-content', title: 'Edit content', type: 'conversation' },
        { id: 'change-style', title: 'Change style', type: 'conversation' },
        { id: 'add-pages', title: 'Add pages', type: 'conversation' },
        { id: 'get-help', title: 'More options', type: 'conversation' }
      ]
    }
  }
  
  // Handle key press in composer
  const handleComposerKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getPageStates = () => {
    switch(activePage) {
      case 'profile':
        return [
          { value: 'base-profile', label: 'Base profile' },
          { value: '1-location', label: '1 Location' },
          { value: 'multi-location', label: 'Multi-location' }
        ]
      case 'neighborhoods':
      default:
        return [
          { value: 'day-one', label: 'Day one' },
          { value: 'month-over-month', label: 'Month over month' }
        ]
    }
  }

  const states = getPageStates()
  const currentStateLabel = states.find(s => s.value === pageState)?.label || states[0].label

  const SETTINGS_SECTION_LABELS = {
    'business-profile': profileVersion === 'v2' ? 'Business profile' : 'My business',
    devices: 'Devices',
    payments: 'Payments',
    permissions: 'Permissions',
    'linked-banks': 'Linked banks',
    'account-security': 'Account & security',
    'legal-taxes': 'Legal & taxes',
    subscriptions: 'Subscriptions',
    preferences: 'Preferences',
    notifications: 'Notifications'
  }
  const getSettingsSectionLabel = (sectionId) => SETTINGS_SECTION_LABELS[sectionId] || sectionId || 'Settings'

  const getPageTitle = () => {
    switch(activePage) {
      case 'home':
        return 'Prototype overview'
      case 'neighborhoods':
        return 'Neighborhoods'
      case 'profile':
        return 'Business profile'
      case 'website':
        return 'Website'
      case 'channels':
        return 'Channels'
      case 'online-ordering':
        return 'Online ordering'
      case 'online-booking':
        return 'Online booking'
      case 'online-shopping':
        return 'Shop all'
      case 'settings':
        return activeSettingsSection ? getSettingsSectionLabel(activeSettingsSection) : 'Settings'
      case 'banking':
        return 'Banking'
      case 'staff':
        return 'Staff'
      case 'reports':
        return 'Reports'
      case 'customers':
        return 'Customers'
      case 'items':
      case 'items-services':
        return 'Items & services'
      case 'add-more':
        return 'Add more'
      default:
        return 'Home'
    }
  }

  const handleMoreClick = (e) => {
    e.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOptionSelect = (option) => {
    onPageStateChange(option)
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.modal-overlay')) {
        return
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 0)
      
      return () => {
        clearTimeout(timer)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isDropdownOpen])

  // When opening from a thumbnail, scroll the blocks canvas to that block
  useEffect(() => {
    if (!isV2WebsiteModalOpen || websitePreviewBlockIndex == null || typeof websitePreviewBlockIndex !== 'number') return
    const timer = setTimeout(() => {
      const canvas = blocksCanvasRef.current
      if (!canvas) return
      const el = canvas.querySelector(`[data-block-index="${websitePreviewBlockIndex}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => clearTimeout(timer)
  }, [isV2WebsiteModalOpen, websitePreviewPage, websitePreviewBlockIndex])

  useEffect(() => {
    setManageBusinessGroupsModalOpen(false)
    setOpenManageGroupsToEditGroupId(null)
    setProfilePageAddMenuOpen(false)
  }, [activePage, activeSettingsSection])

  useEffect(() => {
    if (!profilePageAddMenuOpen) return
    const onDoc = (e) => {
      if (profilePageAddMenuRef.current && !profilePageAddMenuRef.current.contains(e.target)) {
        setProfilePageAddMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [profilePageAddMenuOpen])

  useEffect(() => {
    if (!profilePageAddMenuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setProfilePageAddMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [profilePageAddMenuOpen])

  const effectiveMergedForProfileDialogs =
    mergedBrandData && typeof mergedBrandData === 'object' && Object.keys(mergedBrandData).length > 0
      ? mergedBrandData
      : brandData

  const profileHeaderManageBusinessesDropdown = (
    <div ref={profilePageAddMenuRef} className="v3-profile-page-add-toolbar page-title-add-toolbar">
      <div className="v3-profile-page-add-dropdown">
        <button
          type="button"
          className="v3-profile-page-add-trigger"
          id="main-content-profile-add-trigger"
          aria-expanded={profilePageAddMenuOpen}
          aria-haspopup="menu"
          aria-controls="main-content-profile-add-menu"
          onClick={() => setProfilePageAddMenuOpen((o) => !o)}
        >
          <span>Manage businesses</span>
          <img
            src={CaretDownIcon}
            alt=""
            width={18}
            height={18}
            className={`v3-profile-page-add-trigger-chevron ${profilePageAddMenuOpen ? 'v3-profile-page-add-trigger-chevron--open' : ''}`}
          />
        </button>
        {profilePageAddMenuOpen && (
          <div
            id="main-content-profile-add-menu"
            className="v3-profile-page-add-panel"
            role="menu"
            aria-labelledby="main-content-profile-add-trigger"
          >
            <button
              type="button"
              role="menuitem"
              className="v3-profile-page-add-option"
              onClick={() => {
                setProfilePageAddMenuOpen(false)
              }}
            >
              Add business
            </button>
            <button
              type="button"
              role="menuitem"
              className="v3-profile-page-add-option"
              onClick={() => {
                setProfilePageAddMenuOpen(false)
                setManageBusinessGroupsModalOpen(true)
              }}
            >
              Manage brand groups
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
    <main className="main-content">
      {/* Navigation loading overlay */}
      {isNavigating && (
        <div className="navigation-loading-overlay">
          <div className="navigation-spinner"></div>
        </div>
      )}
      
      <div className="content-wrapper">
        <div className={`page-title-container ${(activePage === 'neighborhoods' && (customerViewMode === 'new-1' || customerViewMode === 'new-2' || customerViewMode === 'returning')) || activePage === 'home' ? 'page-title-container-with-subtitle' : ''}`}>
          <div className="page-title-left">
            <h1 className="page-title">{getPageTitle()}</h1>
            {activePage === 'home' && (
              <p className="page-subtitle">This prototype explores how we can enable a business profile for every Square seller — and what that profile's relationship is with a website, with channels, with other linked brands, and with the legal and organizational structures underneath.</p>
            )}
            {activePage === 'neighborhoods' && (customerViewMode === 'new-1' || customerViewMode === 'new-2' || customerViewMode === 'returning') && (
              <p className="page-subtitle page-subtitle-typewriter">
                <span className="page-subtitle-spacer">{subtitleTexts[customerViewMode]}</span>
                <span className="page-subtitle-typed">{subtitleDisplayedText}</span>
              </p>
            )}
          </div>
          
          {/* Header actions per page */}
          {activePage === 'home' ? null
          : activePage === 'profile' ? (
            demoMode === 'franchise' ? (
              <div className="page-title-profile-header-actions">
                {profileHeaderManageBusinessesDropdown}
                <button type="button" className="switch-business-header-btn" onClick={onSwitchBusinessModalOpen}>
                  <img src={RecurringAutomaticIcon} alt="" width={16} height={16} className="switch-business-icon" />
                  <span>Switch business</span>
                </button>
              </div>
            ) : null
          ) : activePage === 'settings' && activeSettingsSection === 'business-profile' ? (
            demoMode === 'franchise' ? profileHeaderManageBusinessesDropdown : null
          ) : activePage === 'website' ? (
            profileVersion !== 'v2' ? (
              <div className="website-header-buttons">
                <button className="preview-website-btn" onClick={() => setIsV2WebsiteModalOpen(true)}>
                  <span>Preview</span>
                </button>
                <button className="switch-business-header-btn edit-website-btn" onClick={() => handleOpenEditorMode('onboarding')}>
                  <span>Edit website</span>
                </button>
              </div>
            ) : (
              <div className="website-header-buttons">
                <button className="preview-website-btn" onClick={() => setIsV2WebsiteModalOpen(true)}>
                  <span>Preview website</span>
                </button>
              </div>
            )
          ) : activePage === 'online-ordering' ? (
            <div className="ordering-header-pills">
              {customerViewMode === 'returning' && (
                <button type="button" className="ordering-pill ordering-pill-prep">
                  <img src={TimeIcon} alt="" width="24" height="24" className="ordering-pill-icon" />
                  <span>Prep 15 min</span>
                </button>
              )}
              <button type="button" className={`ordering-pill ${customerViewMode === 'returning' ? 'ordering-pill-on' : 'ordering-pill-off'}`}>
                {customerViewMode === 'returning' && <span className="ordering-pill-dot"></span>}
                <span>{customerViewMode === 'returning' ? 'Ordering on' : 'Ordering off'}</span>
              </button>
            </div>
          ) : activePage === 'neighborhoods' ? (
            (customerViewMode === 'new-1' || customerViewMode === 'new-2' || customerViewMode === 'returning') ? (
              <div className="v4-header-buttons">
                <button type="button" className="v4-location-info-btn" onClick={() => onCustomerViewModeChange && onCustomerViewModeChange(customerViewMode === 'new-1' ? 'new-2' : 'new-1')}>
                  <span>Atlanta, GA</span>
                  <img src={InfoIcon} alt="" width="16" height="16" />
                </button>
                {customerViewMode === 'new-2' && (
                  <button type="button" className="v4-countdown-btn v4-countdown-slide-in" onClick={() => onCustomerViewModeChange && onCustomerViewModeChange('returning')}>
                    <img src={ClockIcon} alt="" width="16" height="16" className="v4-countdown-icon" />
                    <span className="v4-countdown-text">7D <span className="v4-countdown-blink">:</span> 12H</span>
                    <img src={ChevronRightIcon} alt="" width="16" height="16" className="v4-countdown-chevron" />
                  </button>
                )}
                {customerViewMode === 'returning' && (
                  <button type="button" className="v4-more-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="3" cy="8" r="1.5" fill="#6B6B6B"/>
                      <circle cx="8" cy="8" r="1.5" fill="#6B6B6B"/>
                      <circle cx="13" cy="8" r="1.5" fill="#6B6B6B"/>
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <div className="neighborhoods-location-wrap" ref={neighborhoodsLocationRef}>
                <button
                  type="button"
                  className="all-locations-header-btn neighborhoods-location-btn"
                  onClick={() => setNeighborhoodsLocationOpen(!neighborhoodsLocationOpen)}
                  aria-expanded={neighborhoodsLocationOpen}
                >
                  <span>{selectedNeighborhoodsLocation}</span>
                  <img src={CaretDownIcon} alt="" width="16" height="16" className="all-locations-chevron" />
                </button>
                {neighborhoodsLocationOpen && (
                  <div className="popover-menu neighborhoods-location-popover">
                    <div className="popover-option selected" onClick={() => { setSelectedNeighborhoodsLocation('Brookhaven'); setNeighborhoodsLocationOpen(false); }}>
                      <span className="option-label">Brookhaven</span>
                      <div className="radio-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="9" fill="#101010"/>
                          <circle cx="10" cy="10" r="3" fill="#FFFFFF"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          ) : null}
        </div>
        
        {activePage === 'settings' ? (
            activeSettingsSection === 'business-profile' ? (
              <div className="profile-v3-layout">
                <BaseProfilePage
                  activeBrand={activeBrand}
                  onBrandChange={onBrandChange}
                  brandState={brandState}
                  onBrandStateChange={onBrandStateChange}
                  profileVersion={profileVersion}
                  customerViewMode={customerViewMode}
                  isSwitchBusinessModalOpen={isSwitchBusinessModalOpen}
                  isSwitchBusinessModalClosing={isSwitchBusinessModalClosing}
                  onSwitchBusinessModalOpen={onSwitchBusinessModalOpen}
                  onSwitchBusinessModalClose={onSwitchBusinessModalClose}
                  onSelectBusiness={onSelectBusiness}
                  onNavigationStart={onNavigationStart}
                  onSidebarLevelChange={onSidebarLevelChange}
                  orgBusinesses={orgBusinesses}
                  brandGroups={brandGroups}
                  onBrandGroupsChange={onBrandGroupsChange}
                  mergedBrandData={mergedBrandData}
                  openFullScreenBusinessEditBrandId={openFullScreenBusinessEditBrandId}
                  onOpenFullScreenBusinessEditConsumed={handleOpenFullScreenBusinessEditConsumed}
                  openBrandGroupBrandingGroupId={openBrandGroupBrandingGroupId}
                  onOpenBrandGroupBrandingConsumed={handleOpenBrandGroupBrandingConsumed}
                  onRequestEditBrandGroupModal={handleRequestEditBrandGroupModal}
                  demoMode={demoMode}
                />
              </div>
            ) : activeSettingsSection === 'devices' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Manage devices connected to your account.</p>
              </div>
            ) : activeSettingsSection === 'payments' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Payment methods and payment settings.</p>
              </div>
            ) : activeSettingsSection === 'permissions' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Manage who can access and change settings.</p>
              </div>
            ) : activeSettingsSection === 'linked-banks' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Banks linked to your account.</p>
              </div>
            ) : activeSettingsSection === 'account-security' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Account and security settings.</p>
              </div>
            ) : activeSettingsSection === 'legal-taxes' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Legal and tax information.</p>
              </div>
            ) : activeSettingsSection === 'subscriptions' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Manage your subscriptions.</p>
              </div>
            ) : activeSettingsSection === 'preferences' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Preferences and display options.</p>
              </div>
            ) : activeSettingsSection === 'notifications' ? (
              <div className="settings-section-page">
                <p className="settings-section-page-description">Notification preferences.</p>
              </div>
            ) : (
              <div className="coming-soon-content">
                <p>Content for {getSettingsSectionLabel(activeSettingsSection)} coming soon.</p>
              </div>
            )
        ) : activePage === 'home' ? (
          <div className="main-content-inner prototype-overview-page">
            <div className="prototype-project-guides">
              <div className="prototype-project-guides-row">
                <div className="prototype-project-guide" onClick={() => { if (!onboardingLoading) { setOnboardingLoading(true); setTimeout(() => { setOnboardingLoading(false); onOpenOnboarding?.(); }, 800); } }}>
                  <div className="prototype-project-guide-box">
                    {onboardingLoading ? <div className="prototype-guide-spinner"></div> : <img src={DepartmentStoreIcon} alt="" />}
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Onboarding</div>
                    <div className="prototype-project-guide-desc">Net new seller onboarding to Square with business profile</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onBrandChange?.('joy-bakeshop'); onCustomerViewModeChange?.('new-1'); onNavigationStart?.('settings'); onSidebarLevelChange?.('settings'); }}>
                  <div className="prototype-project-guide-box">
                    <div className="v4-mini-brand-card v4-mini-brand-card-lg" style={{ background: '#0000FF' }}>
                      <span className="v4-mini-brand-monogram v4-mini-brand-monogram-lg">J</span>
                    </div>
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">New business profile</div>
                    <div className="prototype-project-guide-desc">First-time seller setting up their business profile, brand, and preferences</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onBrandChange?.('joy-bakeshop'); onCustomerViewModeChange?.('new-2'); onNavigationStart?.('settings'); onSidebarLevelChange?.('settings'); }}>
                  <div className="prototype-project-guide-box">
                    <div className="v4-mini-brand-card v4-mini-brand-card-lg" style={{ background: '#0000FF' }}>
                      <span className="v4-mini-brand-monogram v4-mini-brand-monogram-lg">J</span>
                    </div>
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Migrated business profile</div>
                    <div className="prototype-project-guide-desc">Existing seller migrating from the old business profile view to the new experience</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onBrandChange?.('keva-juice'); onCustomerViewModeChange?.('returning'); onNavigationStart?.('settings'); onSidebarLevelChange?.('settings'); }}>
                  <div className="prototype-project-guide-box">
                    <div className="v4-mini-brand-card v4-mini-brand-card-lg" style={{ background: '#FF6B35' }}>
                      <img src={brandLogos['keva-juice']} alt="" className="v4-mini-brand-logo" />
                    </div>
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Business profile with org</div>
                    <div className="prototype-project-guide-desc">Returning seller with a verified brand and linked organization structure</div>
                  </div>
                </div>
              </div>

              <div className="prototype-project-guides-row">
                <div className="prototype-project-guide" onClick={() => onAccountBladeOpen?.()}>
                  <div className="prototype-project-guide-box">
                    <div className="account-blade-avatar" style={{ width: 24, height: 24 }}>
                      <span className="account-blade-avatar-initials" style={{ fontSize: 9 }}>VO</span>
                      <div className="account-blade-avatar-status" style={{ width: 6, height: 6, bottom: 0, right: 0 }}></div>
                    </div>
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Account blade & switcher</div>
                    <div className="prototype-project-guide-desc">Account panel with multi-business switching and add business flow</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onNavigationStart?.('online-ordering'); onSidebarLevelChange?.('online'); }}>
                  <div className="prototype-project-guide-box">
                    <img src={GlobeIcon} alt="" />
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Online IA</div>
                    <div className="prototype-project-guide-desc">Restructured Online section with Website, Channels, and service pages</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onCustomerViewModeChange?.('returning'); onNavigationStart?.('website'); onSidebarLevelChange?.('online'); }}>
                  <div className="prototype-project-guide-box">
                    <img src={GlobeIcon} alt="" />
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Websites 2.0</div>
                    <div className="prototype-project-guide-desc">Redesigned website page with design, pages, and domains cards</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onNavigationStart?.('channels'); onSidebarLevelChange?.('online'); }}>
                  <div className="prototype-project-guide-box">
                    <img src={GlobeIcon} alt="" />
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Channels</div>
                    <div className="prototype-project-guide-desc">Sales and demand channels with Neighborhoods on Cash App emphasis</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onCustomerViewModeChange?.('new-1'); onNavigationStart?.('neighborhoods'); }}>
                  <div className="prototype-project-guide-box">
                    <img src={NeighborhoodsIcon} alt="" />
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Neighborhoods — new</div>
                    <div className="prototype-project-guide-desc">New seller experience with setup card, map, and getting started guides</div>
                  </div>
                </div>
              </div>

              <div className="prototype-project-guides-row">
                <div className="prototype-project-guide" onClick={() => { onCustomerViewModeChange?.('new-2'); onNavigationStart?.('neighborhoods'); }}>
                  <div className="prototype-project-guide-box">
                    <img src={NeighborhoodsIcon} alt="" />
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Neighborhoods — ready</div>
                    <div className="prototype-project-guide-desc">Seller who completed setup and is ready to go live on Neighborhoods</div>
                  </div>
                </div>
                <div className="prototype-project-guide" onClick={() => { onCustomerViewModeChange?.('returning'); onNavigationStart?.('neighborhoods'); }}>
                  <div className="prototype-project-guide-box">
                    <img src={NeighborhoodsIcon} alt="" />
                  </div>
                  <div className="prototype-project-guide-text">
                    <div className="prototype-project-guide-title">Neighborhoods — returning</div>
                    <div className="prototype-project-guide-desc">Active seller with live Neighborhoods presence and analytics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : ['items-services', 'customers', 'reports', 'staff', 'banking', 'add-more'].includes(activePage) ? (
          <div className="coming-soon-content">
            <p>Content for {getPageTitle()} coming soon.</p>
          </div>
        ) : activePage === 'neighborhoods' ? (
          (() => {
            const effectivePageState = customerViewMode === 'returning' ? 'month-over-month' : 'day-one'
            return (
              <div className="main-content-inner neighborhoods-page">
                    <div className="v4-map-container">
                        <AppleMap />
                        <div
                          ref={gradientOverlayRef}
                          className={`v4-map-gradient-overlay${mapRevealDone ? ' v4-map-gradient-revealed' : ''}`}
                        />
                        <div className="v4-map-pins" key={`pins-${customerViewMode}-${mapRevealKey}`}>
                          {customerViewMode === 'returning' ? (
                            <>
                              <div className="v4-map-pin v4-map-pin-1 v4-mini-pin">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g filter="url(#mp1_shadow)">
                                    <path d="M12 0C13.86 0 14.79 0 15.55 0.204C17.62 0.759 19.24 2.377 19.8 4.447C20 5.21 20 6.14 20 8V10.99C20 12.85 20 13.78 19.8 14.543C19.3 16.379 17.98 17.855 16.24 18.554C14.14 19.497 13.59 20.498 12.93 21.513C12.7 21.838 12.34 22 12 22C11.57 21.957 11.27 21.797 11.07 21.513C10.41 20.498 9.86 19.497 7.76 18.554C6.02 17.855 4.7 16.378 4.2 14.543C4 13.78 4 12.85 4 10.99V8C4 6.14 4 5.21 4.2 4.447C4.76 2.377 6.38 0.759 8.45 0.204C9.21 0 10.14 0 12 0Z" fill="white"/>
                                  </g>
                                  <rect x="6" y="2" width="12" height="15" rx="4" fill="#224D2E"/>
                                  <defs><filter id="mp1_shadow" x="0" y="0" width="24" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="ha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="bg" result="sh"/><feBlend in="SourceGraphic" in2="sh" result="shape"/></filter></defs>
                                </svg>
                              </div>
                              <div className="v4-map-pin v4-map-pin-2 v4-mini-pin">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g filter="url(#mp2_shadow)">
                                    <path d="M12 0C13.86 0 14.79 0 15.55 0.204C17.62 0.759 19.24 2.377 19.8 4.447C20 5.21 20 6.14 20 8V10.99C20 12.85 20 13.78 19.8 14.543C19.3 16.379 17.98 17.855 16.24 18.554C14.14 19.497 13.59 20.498 12.93 21.513C12.7 21.838 12.34 22 12 22C11.57 21.957 11.27 21.797 11.07 21.513C10.41 20.498 9.86 19.497 7.76 18.554C6.02 17.855 4.7 16.378 4.2 14.543C4 13.78 4 12.85 4 10.99V8C4 6.14 4 5.21 4.2 4.447C4.76 2.377 6.38 0.759 8.45 0.204C9.21 0 10.14 0 12 0Z" fill="white"/>
                                  </g>
                                  <rect x="6" y="2" width="12" height="15" rx="4" fill="#D0F637"/>
                                  <defs><filter id="mp2_shadow" x="0" y="0" width="24" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="ha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="bg" result="sh"/><feBlend in="SourceGraphic" in2="sh" result="shape"/></filter></defs>
                                </svg>
                              </div>
                              <div className="v4-map-pin v4-map-pin-3 v4-mini-pin">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g filter="url(#mp3_shadow)">
                                    <path d="M12 0C13.86 0 14.79 0 15.55 0.204C17.62 0.759 19.24 2.377 19.8 4.447C20 5.21 20 6.14 20 8V10.99C20 12.85 20 13.78 19.8 14.543C19.3 16.379 17.98 17.855 16.24 18.554C14.14 19.497 13.59 20.498 12.93 21.513C12.7 21.838 12.34 22 12 22C11.57 21.957 11.27 21.797 11.07 21.513C10.41 20.498 9.86 19.497 7.76 18.554C6.02 17.855 4.7 16.378 4.2 14.543C4 13.78 4 12.85 4 10.99V8C4 6.14 4 5.21 4.2 4.447C4.76 2.377 6.38 0.759 8.45 0.204C9.21 0 10.14 0 12 0Z" fill="white"/>
                                  </g>
                                  <rect x="6" y="2" width="12" height="15" rx="4" fill="#F96A32"/>
                                  <defs><filter id="mp3_shadow" x="0" y="0" width="24" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="ha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="bg" result="sh"/><feBlend in="SourceGraphic" in2="sh" result="shape"/></filter></defs>
                                </svg>
                              </div>
                              <div className="v4-map-pin v4-map-pin-4 v4-mini-pin">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g filter="url(#mp4_shadow)">
                                    <path d="M12 0C13.86 0 14.79 0 15.55 0.204C17.62 0.759 19.24 2.377 19.8 4.447C20 5.21 20 6.14 20 8V10.99C20 12.85 20 13.78 19.8 14.543C19.3 16.379 17.98 17.855 16.24 18.554C14.14 19.497 13.59 20.498 12.93 21.513C12.7 21.838 12.34 22 12 22C11.57 21.957 11.27 21.797 11.07 21.513C10.41 20.498 9.86 19.497 7.76 18.554C6.02 17.855 4.7 16.378 4.2 14.543C4 13.78 4 12.85 4 10.99V8C4 6.14 4 5.21 4.2 4.447C4.76 2.377 6.38 0.759 8.45 0.204C9.21 0 10.14 0 12 0Z" fill="white"/>
                                  </g>
                                  <rect x="6" y="2" width="12" height="15" rx="4" fill="#8B2252"/>
                                  <defs><filter id="mp4_shadow" x="0" y="0" width="24" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="ha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="bg" result="sh"/><feBlend in="SourceGraphic" in2="sh" result="shape"/></filter></defs>
                                </svg>
                              </div>
                              <div className="v4-map-pin v4-map-pin-5 v4-mini-pin">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g filter="url(#mp5_shadow)">
                                    <path d="M12 0C13.86 0 14.79 0 15.55 0.204C17.62 0.759 19.24 2.377 19.8 4.447C20 5.21 20 6.14 20 8V10.99C20 12.85 20 13.78 19.8 14.543C19.3 16.379 17.98 17.855 16.24 18.554C14.14 19.497 13.59 20.498 12.93 21.513C12.7 21.838 12.34 22 12 22C11.57 21.957 11.27 21.797 11.07 21.513C10.41 20.498 9.86 19.497 7.76 18.554C6.02 17.855 4.7 16.378 4.2 14.543C4 13.78 4 12.85 4 10.99V8C4 6.14 4 5.21 4.2 4.447C4.76 2.377 6.38 0.759 8.45 0.204C9.21 0 10.14 0 12 0Z" fill="white"/>
                                  </g>
                                  <rect x="6" y="2" width="12" height="15" rx="4" fill="#2D6A9F"/>
                                  <defs><filter id="mp5_shadow" x="0" y="0" width="24" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="ha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="bg" result="sh"/><feBlend in="SourceGraphic" in2="sh" result="shape"/></filter></defs>
                                </svg>
                              </div>
                              <div className="v4-map-pin v4-map-pin-6 v4-mini-pin">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g filter="url(#mp6_shadow)">
                                    <path d="M12 0C13.86 0 14.79 0 15.55 0.204C17.62 0.759 19.24 2.377 19.8 4.447C20 5.21 20 6.14 20 8V10.99C20 12.85 20 13.78 19.8 14.543C19.3 16.379 17.98 17.855 16.24 18.554C14.14 19.497 13.59 20.498 12.93 21.513C12.7 21.838 12.34 22 12 22C11.57 21.957 11.27 21.797 11.07 21.513C10.41 20.498 9.86 19.497 7.76 18.554C6.02 17.855 4.7 16.378 4.2 14.543C4 13.78 4 12.85 4 10.99V8C4 6.14 4 5.21 4.2 4.447C4.76 2.377 6.38 0.759 8.45 0.204C9.21 0 10.14 0 12 0Z" fill="white"/>
                                  </g>
                                  <rect x="6" y="2" width="12" height="15" rx="4" fill="#E85D3A"/>
                                  <defs><filter id="mp6_shadow" x="0" y="0" width="24" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="ha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="bg" result="sh"/><feBlend in="SourceGraphic" in2="sh" result="shape"/></filter></defs>
                                </svg>
                              </div>
                              <div className="v4-map-pin v4-map-pin-7 v4-mini-pin">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g filter="url(#mp7_shadow)">
                                    <path d="M12 0C13.86 0 14.79 0 15.55 0.204C17.62 0.759 19.24 2.377 19.8 4.447C20 5.21 20 6.14 20 8V10.99C20 12.85 20 13.78 19.8 14.543C19.3 16.379 17.98 17.855 16.24 18.554C14.14 19.497 13.59 20.498 12.93 21.513C12.7 21.838 12.34 22 12 22C11.57 21.957 11.27 21.797 11.07 21.513C10.41 20.498 9.86 19.497 7.76 18.554C6.02 17.855 4.7 16.378 4.2 14.543C4 13.78 4 12.85 4 10.99V8C4 6.14 4 5.21 4.2 4.447C4.76 2.377 6.38 0.759 8.45 0.204C9.21 0 10.14 0 12 0Z" fill="white"/>
                                  </g>
                                  <rect x="6" y="2" width="12" height="15" rx="4" fill="#4A7C59"/>
                                  <defs><filter id="mp7_shadow" x="0" y="0" width="24" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="ha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="bg" result="sh"/><feBlend in="SourceGraphic" in2="sh" result="shape"/></filter></defs>
                                </svg>
                              </div>
                            </>
                          ) : (
                            <>
                              <img src={SellerCardPin1} alt="" className="v4-map-pin v4-map-pin-1" />
                              <img src={SellerCardPin2} alt="" className="v4-map-pin v4-map-pin-2" />
                              <img src={SellerCardPin3} alt="" className="v4-map-pin v4-map-pin-3" />
                            </>
                          )}
                        </div>
                        <div className="v4-map-pin-main-wrap" key={`main-pin-${customerViewMode}`}>
                          <div className="v4-map-pin-main">
                            <img src={SellerCardPinMain} alt="" className="v4-map-pin-main-bg" />
                            <div className="v4-map-pin-main-brand">
                              {customerViewMode === 'new-1' ? (
                                <div className="v4-map-pin-main-monogram" style={{ background: brand.color }}>
                                  <span>{brand.name.split(' ').length >= 2 ? (brand.name.split(' ')[0][0] + brand.name.split(' ')[1][0]).toUpperCase() : brand.name.substring(0, 2).toUpperCase()}</span>
                                </div>
                              ) : (
                                <img src={brandLogos[activeBrand]} alt="" className="v4-map-pin-main-logo" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    {(customerViewMode === 'new-1' || customerViewMode === 'new-2') && (
                        <div key={`card-${mapRevealKey}`} className={`v4-map-business-card card${!mapRevealDone ? ' v4-card-animate-in' : ''}`}>
                          <div className="card-header">
                            <div className="card-header-info">
                              <h3 className="card-title">{brand.name} belongs on Neighborhoods</h3>
                              <p className="card-subtitle">{customerViewMode === 'new-1' ? 'Get your business profile and preferences ready for Neighborhoods' : 'Your business is ready for Neighborhoods'}</p>
                            </div>
                            <button className={`card-action${customerViewMode === 'new-1' ? ' card-action--primary' : ''}`}>{customerViewMode === 'new-1' ? 'Start' : 'Edit'}</button>
                          </div>

                          <hr className="card-divider" />

                          {customerViewMode === 'new-2' && (
                            <>
                              <div className="v4-business-summary v4-summary-animate-in">
                                <div className="v4-business-summary-text">
                                  <p className="v4-business-handle">{brand.handle} · Bakery</p>
                                  <p className="v4-business-about">{brand.about}</p>
                                </div>
                                <div className="v4-profile-preview-container">
                                  <div className="v4-profile-preview-card">
                                    <div className={`v4-profile-preview-brand-card ${customerViewMode === 'new-1' ? 'v4-profile-preview-monogram' : ''}`} style={customerViewMode === 'new-1' ? { background: brand.color } : undefined}>
                                      {customerViewMode === 'new-1' ? (
                                        <span className="monogram-text">{brand.name.split(' ').length >= 2 ? (brand.name.split(' ')[0][0] + brand.name.split(' ')[1][0]).toUpperCase() : brand.name.substring(0, 2).toUpperCase()}</span>
                                      ) : (
                                        <img src={brandLogos[activeBrand]} alt="" className="v4-profile-preview-logo" />
                                      )}
                                    </div>
                                    <h3 className="v4-profile-preview-name">{brand.name}</h3>
                                    <p className="v4-profile-preview-handle">{brand.handle} · Bakery</p>
                                  </div>
                                </div>
                              </div>
                              <hr className="card-divider" />
                            </>
                          )}

                          <div className="card-rows">
                            <div className="card-row" onClick={() => { setNeighborhoodsEditActiveSection('brand'); setNeighborhoodsEditModalOpen(true); }} style={{ cursor: 'pointer' }}>
                              <div className="v3-icon-container">
                                <div className="v4-mini-brand-card v4-mini-brand-card-lg" style={{ background: brand.color }}>
                                  <span className="v4-mini-brand-monogram v4-mini-brand-monogram-lg">{brand.name[0].toUpperCase()}</span>
                                </div>
                              </div>
                              <h4 className="service-title">Brand & about</h4>
                              {customerViewMode === 'new-1' ? (
                                <span className="v3-service-subtitle v4-action-text">Confirm your business info & update logo</span>
                              ) : (
                                <span className="v3-service-subtitle v4-verified-text">✪ Verified brand</span>
                              )}
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>

                            <div className="card-row" onClick={() => { setNeighborhoodsEditActiveSection('rewards'); setNeighborhoodsEditModalOpen(true); }} style={{ cursor: 'pointer' }}>
                              <div className="v3-icon-container">
                                <img src={CashAppIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">Rewards program</h4>
                              {customerViewMode === 'new-1' ? (
                                <>
                                  <span className="v3-service-subtitle">POS customer display</span>
                                  <span className="status-pill gray">Inactive</span>
                                </>
                              ) : (
                                <>
                                  <span className="v3-service-subtitle">POS customer display</span>
                                  <span className="status-pill live">Active</span>
                                </>
                              )}
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>

                            <div className="card-row" onClick={() => { setNeighborhoodsEditActiveSection('ordering'); setNeighborhoodsEditModalOpen(true); }} style={{ cursor: 'pointer' }}>
                              <div className="v3-icon-container">
                                <img src={ShopInStoreIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">Online ordering</h4>
                              {customerViewMode === 'new-1' ? (
                                <>
                                  <span className="v3-service-subtitle v4-action-text">Confirm locations</span>
                                  <span className="status-pill gray">Ordering off</span>
                                </>
                              ) : (
                                <>
                                  <span className="v3-service-subtitle">3 locations</span>
                                  <span className="status-pill live">Ordering on</span>
                                </>
                              )}
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                        </div>
                    )}
                    {customerViewMode !== 'returning' && <NeighborhoodsGuides key={`guides-${mapRevealKey}`} />}
                    {customerViewMode === 'returning' && (
                      <>
                        <div className="cards-grid neighborhoods-cards-grid">
                          <FollowersSection 
                            activeBrand={activeBrand} 
                            pageState={effectivePageState}
                            customerViewMode={customerViewMode}
                            onCreateMessage={() => setCreateMessageModalOpen(true)}
                            useNeighborhoodsLayout={true}
                          />
                          <RewardsCard />
                        </div>
                        <div className="neighborhoods-messages-wrap">
                          <MessagesCard 
                            activeBrand={activeBrand} 
                            pageState={effectivePageState}
                            customerViewMode={customerViewMode}
                            useV3Layout={true}
                            externalCreateMessageOpen={createMessageModalOpen}
                            onExternalCreateMessageClose={() => setCreateMessageModalOpen(false)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )
          })()
        ) : activePage === 'profile' ? (
          <div className="profile-v3-layout">
            <BaseProfilePage 
              activeBrand={activeBrand}
              onBrandChange={onBrandChange}
              brandState={brandState}
              onBrandStateChange={onBrandStateChange}
              profileVersion={profileVersion}
              customerViewMode={customerViewMode}
              isSwitchBusinessModalOpen={isSwitchBusinessModalOpen}
              isSwitchBusinessModalClosing={isSwitchBusinessModalClosing}
              onSwitchBusinessModalOpen={onSwitchBusinessModalOpen}
              onSwitchBusinessModalClose={onSwitchBusinessModalClose}
              onSelectBusiness={onSelectBusiness}
              onNavigationStart={onNavigationStart}
              onSidebarLevelChange={onSidebarLevelChange}
              orgBusinesses={orgBusinesses}
              brandGroups={brandGroups}
              onBrandGroupsChange={onBrandGroupsChange}
              mergedBrandData={mergedBrandData}
              openFullScreenBusinessEditBrandId={openFullScreenBusinessEditBrandId}
              onOpenFullScreenBusinessEditConsumed={handleOpenFullScreenBusinessEditConsumed}
              openBrandGroupBrandingGroupId={openBrandGroupBrandingGroupId}
              onOpenBrandGroupBrandingConsumed={handleOpenBrandGroupBrandingConsumed}
              onRequestEditBrandGroupModal={handleRequestEditBrandGroupModal}
              demoMode={demoMode}
            />
          </div>
        ) : activePage === 'website' ? (
            <>
              {profileVersion === 'v2' ? (
              <div className="profile-v3-layout">
                <div className="base-profile-page v3">
                  <div className="cards-container">
                    {/* ── THEMES CARD ── */}
                    <div className="card">
                      <div className="card-header">
                        <div className="card-header-info">
                          <h3 className="card-title">Themes</h3>
                          <p className="card-subtitle">Style your website with themes</p>
                        </div>
                        <button className="card-action">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Design with AI' : 'Edit theme'}</button>
                      </div>

                      {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                        <>
                          <div className="v2-design-thumbnails-scroll">
                            <div className="v2-design-thumbnails-track">
                              <div className="v2-design-thumb-card v2-design-thumb-card--active">
                                <img src={newCustomerThumbBanner} alt="Free design" className="v2-design-thumb-img" />
                                <span className="status-pill v2-design-thumb-pill v2-design-thumb-pill--dark">Current theme</span>
                              </div>
                              <div className="v2-design-thumb-card">
                                <img src={websiteThumbBanner} alt="Design template" className="v2-design-thumb-img" />
                              </div>
                              <div className="v2-design-thumb-card">
                                <img src={websiteThumbAbout} alt="Design template" className="v2-design-thumb-img" />
                              </div>
                            </div>
                          </div>
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <div className="v4-mini-brand-card v4-mini-brand-card-lg" style={{ background: brand.color }}>
                                  <span className="v4-mini-brand-monogram v4-mini-brand-monogram-lg">{brand.name[0].toUpperCase()}</span>
                                </div>
                              </div>
                              <h4 className="service-title">Brand style guide</h4>
                              <span className="v3-service-subtitle v4-action-text">Add your logo and colors</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="v2-design-preview-row">
                            <div className="v2-design-preview-desktop">
                              <div className="website-brand-hero-banner" style={{ background: brand.color }}>
                                <div className="website-brand-hero-pattern">
                                  <WavePattern />
                                </div>
                                <div className="website-brand-hero-menu" aria-hidden>
                                  <span>Home</span>
                                  <span>Order online</span>
                                  <span>About Us</span>
                                </div>
                                <h2 className="website-brand-hero-headline">{brand.name}</h2>
                              </div>
                            </div>
                            <div className="v2-design-preview-mobile">
                              <div className="website-brand-hero-banner" style={{ background: brand.color }}>
                                <div className="website-brand-hero-pattern">
                                  <WavePattern />
                                </div>
                                <div className="v2-mobile-menu-icon">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>
                                <h2 className="website-brand-hero-headline website-brand-hero-headline--mobile">Joy<br />Bakeshop</h2>
                              </div>
                            </div>
                          </div>
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={TilesIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">Custom AI design</h4>
                              <span className="v3-service-subtitle">Bold restaurant, vibrant colors, smooth animations</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <div className="v4-mini-brand-card v4-mini-brand-card-lg" style={{ background: brand.color }}>
                                  {brandLogos[activeBrand] ? (
                                    <img src={brandLogos[activeBrand]} alt="" className="v4-mini-brand-logo" />
                                  ) : (
                                    <span className="v4-mini-brand-monogram v4-mini-brand-monogram-lg">{brand.name[0].toUpperCase()}</span>
                                  )}
                                </div>
                              </div>
                              <h4 className="service-title">Brand style guide</h4>
                              <span className="v3-service-subtitle">3 logos, 4 colors, 3 fonts</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* ── PAGES CARD ── */}
                    <div className="card">
                      <div className="card-header">
                        <div className="card-header-info">
                          <h3 className="card-title">Pages</h3>
                          <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? '2 pages' : '6 pages'}</p>
                        </div>
                        <button className="card-action" onClick={() => handleOpenEditorMode('add-page')}>Add page</button>
                      </div>
                      <hr className="card-divider" />
                      {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                        <>
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v2-page-thumb-container">
                                <div className="v2-page-thumb-inner">
                                  <img src={newCustomerThumbBanner} alt="Home" className="v2-page-thumb-img" />
                                </div>
                              </div>
                              <h4 className="service-title">Home</h4>
                              <span className="v3-service-subtitle">Free homepage</span>
                              <span className="status-pill blue">Visible</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                          <hr className="card-divider" />
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v2-page-thumb-container">
                                <div className="v2-page-thumb-inner">
                                  <img src={newCustomerThumbMenu} alt="Order Online" className="v2-page-thumb-img" />
                                </div>
                              </div>
                              <h4 className="service-title">Order online</h4>
                              <span className="v3-service-subtitle">Add online ordering to your website for free</span>
                              <button className="card-action card-action--small-primary">Start</button>
                            </div>
                          </div>
                          <hr className="card-divider" />
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={LockOnIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">Password protected pages</h4>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v2-page-thumb-container">
                                <div className="v2-page-thumb-inner">
                                  <img src={websiteThumbBanner} alt="Home" className="v2-page-thumb-img" />
                                </div>
                              </div>
                              <h4 className="service-title">Home</h4>
                              <span className="status-pill blue">Visible</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v2-page-thumb-container">
                                <div className="v2-page-thumb-inner">
                                  <img src={websiteThumbAbout} alt="About" className="v2-page-thumb-img" />
                                </div>
                              </div>
                              <h4 className="service-title">About</h4>
                              <span className="status-pill blue">Visible</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v2-page-thumb-container">
                                <div className="v2-page-thumb-inner">
                                  <img src={websiteThumbCallout} alt="Join our team" className="v2-page-thumb-img" />
                                </div>
                              </div>
                              <h4 className="service-title">Join our team</h4>
                              <span className="status-pill gray">Draft</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                        </>
                      )}
                      {customerViewMode === 'returning' && (
                        <>
                          <hr className="card-divider" />
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v2-page-thumb-container">
                                <div className="v2-page-thumb-inner">
                                  <img src={newCustomerThumbMenu} alt="Order online" className="v2-page-thumb-img" />
                                </div>
                              </div>
                              <h4 className="service-title">Order online</h4>
                              <span className="status-pill blue">Visible</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v2-page-thumb-container v2-page-thumb-container--stacked">
                                <div className="v2-page-thumb-stack-bg v2-page-thumb-stack-bg--2"></div>
                                <div className="v2-page-thumb-stack-bg v2-page-thumb-stack-bg--1"></div>
                                <div className="v2-page-thumb-inner">
                                  <img src={newCustomerThumbItemModal} alt="Item pages" className="v2-page-thumb-img" />
                                </div>
                              </div>
                              <h4 className="service-title">Item pages</h4>
                              <span className="status-pill blue">Visible</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v2-page-thumb-container">
                                <div className="v2-page-thumb-inner v2-page-thumb-inner--checkout">
                                  <div className="v2-page-thumb-checkout-mock">
                                    <div className="v2-checkout-bar"></div>
                                    <div className="v2-checkout-line v2-checkout-line--short"></div>
                                    <div className="v2-checkout-line"></div>
                                    <div className="v2-checkout-btn"></div>
                                  </div>
                                </div>
                              </div>
                              <h4 className="service-title">Checkout</h4>
                              <span className="status-pill blue">Visible</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                          <hr className="card-divider" />
                          <div className="card-rows">
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={LockOnIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">Password protected pages</h4>
                              <span className="v3-service-subtitle">Join our community</span>
                              <div className={`toggle-switch on`}></div>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* ── DOMAINS CARD ── */}
                    <div className="card">
                      <div className="card-header">
                        <div className="card-header-info">
                          <h3 className="card-title">Domains</h3>
                          <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? '1 active domain' : '2 active domains'}</p>
                        </div>
                        <button className="card-action">Add domain</button>
                      </div>
                      <hr className="card-divider" />
                      <div className="card-rows">
                        {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                          <>
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={GlobeIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">cash.app/{brand.handle?.replace('$', '')}</h4>
                              <span className="v3-service-subtitle">Free domain</span>
                              <span className="status-pill live">Active</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={PlusIcon} alt="" width="16" height="16" />
                              </div>
                              <h4 className="service-title">Connect website</h4>
                              <span className="v3-service-subtitle">Link to your existing website</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={GlobeIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">joybakeshop.com</h4>
                              <span className="status-pill live">Active</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={GlobeIcon} alt="" width="24" height="24" />
                              </div>
                              <h4 className="service-title">cash.app/{brand.handle?.replace('$', '')}</h4>
                              <span className="v3-service-subtitle">Redirects to joybakeshop.com</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="card-row">
                              <div className="v3-icon-container">
                                <img src={PlusIcon} alt="" width="16" height="16" />
                              </div>
                              <h4 className="service-title">Connect website</h4>
                              <span className="v3-service-subtitle">Link to your existing website</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ) : (
              <div className="profile-v3-layout">
                <div className="base-profile-page v3">
                  <div className="website-banner-and-cards">
                    {customerViewMode === 'returning' ? (
                      <button
                        type="button"
                        className="website-brand-hero-card"
                        onClick={() => setIsV2WebsiteModalOpen(true)}
                      >
                        <div className="website-brand-hero-banner" style={{ background: brand.color }}>
                          <div className="website-brand-hero-pattern">
                            <WavePattern />
                          </div>
                          <div className="website-brand-hero-menu" aria-hidden>
                            <span>Home</span>
                            <span>Order online</span>
                            <span>About Us</span>
                          </div>
                          <h2 className="website-brand-hero-headline">{brand.name}</h2>
                        </div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="website-banner-card"
                        onClick={() => setIsV2WebsiteModalOpen(true)}
                      >
                        <div className="website-banner-scaled">
                          <DefaultWebsite activeBrand={activeBrand} customerViewMode={customerViewMode} />
                        </div>
                      </button>
                    )}
                    <div className="cards-container">
                  {/* Website page: same card design as Business profile. Pages + Domains with v3-section-thumbnails. */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Pages</h3>
                        <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? '1 page · 3 blocks' : '3 pages · 11 blocks'}</p>
                      </div>
                      <button className="card-action" onClick={() => handleOpenEditorMode('add-page')}>Add page</button>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-rows">
                      {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                        <div className="v3-homepage-section">
                          <div className="card-row" onClick={() => handleOpenEditorMode('edit-block')}>
                            <div className="v3-page-title-group">
                              <h4 className="service-title">Online ordering page</h4>
                              <span className="v3-page-subtitle">Order online</span>
                            </div>
                            <span className="status-pill live">Published</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                          <div className="v3-section-thumbnails">
                            <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block')}>
                              <img src={newCustomerThumbBanner} alt="Banner" />
                            </div>
                            <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block')}>
                              <img src={newCustomerThumbMenu} alt="Menu" />
                            </div>
                            <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block')}>
                              <img src={newCustomerThumbItemModal} alt="Item modal" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="v3-homepage-section">
                            <div className="card-row" onClick={() => handleOpenEditorMode('edit-block', 'home')}>
                              <div className="v3-page-title-group">
                                <h4 className="service-title">Home page</h4>
                                <span className="v3-page-subtitle">Home</span>
                              </div>
                              <span className="status-pill live">Published</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="v3-section-thumbnails">
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'home', 0)}>
                                <img src={websiteThumbBanner} alt="Banner" />
                              </div>
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'home', 1)}>
                                <img src={websiteThumbFeatured} alt="Feature items" />
                              </div>
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'home', 2)}>
                                <img src={websiteThumbAbout} alt="About" />
                              </div>
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'home', 3)}>
                                <img src={websiteThumbCallout} alt="Call-out" />
                              </div>
                            </div>
                            <hr className="card-divider card-divider--homepage" />
                          </div>
                          <div className="v3-homepage-section">
                            <div className="card-row" onClick={() => handleOpenEditorMode('edit-block', 'order-online')}>
                              <div className="v3-page-title-group">
                                <h4 className="service-title">Online ordering page</h4>
                                <span className="v3-page-subtitle">Order online</span>
                              </div>
                              <span className="status-pill live">Published</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="v3-section-thumbnails">
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'order-online', 0)}>
                                <img src={newCustomerThumbMenu} alt="Menu" />
                              </div>
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'order-online', 1)}>
                                <img src={newCustomerThumbItemModal} alt="Item modal" />
                              </div>
                            </div>
                            <hr className="card-divider card-divider--homepage" />
                          </div>
                          <div className="v3-homepage-section">
                            <div className="card-row" onClick={() => handleOpenEditorMode('edit-block', 'about')}>
                              <div className="v3-page-title-group">
                                <h4 className="service-title">About page</h4>
                                <span className="v3-page-subtitle">Our story</span>
                              </div>
                              <span className="status-pill gray">Draft</span>
                              <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                            </div>
                            <div className="v3-section-thumbnails">
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'about', 0)}>
                                <img src={websiteAboutThumb1} alt="About section 1" />
                              </div>
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'about', 1)}>
                                <img src={websiteAboutThumb2} alt="About section 2" />
                              </div>
                              <div className="v3-section-thumbnail v3-section-thumbnail-img" onClick={() => handleOpenEditorMode('edit-block', 'about', 2)}>
                                <img src={websiteAboutThumb3} alt="About section 3" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Domains</h3>
                        <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? '1 active domain' : '2 active domains'}</p>
                      </div>
                      <button className="card-action">Add domain</button>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-rows">
                      {customerViewMode === 'returning' ? (
                        <>
                          <div className="card-row">
                            <div className="v3-icon-container">
                              <img src={GlobeIcon} alt="" width="24" height="24" />
                            </div>
                            <h4 className="service-title">joybakeshop.com</h4>
                            <span className="v3-service-subtitle">Primary domain</span>
                            <span className="status-pill live">Active</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                          <div className="card-row">
                            <div className="v3-icon-container">
                              <img src={GlobeIcon} alt="" width="24" height="24" />
                            </div>
                            <h4 className="service-title">cash.app/{brand.handle?.replace('$', '')}</h4>
                            <span className="v3-service-subtitle">Redirects to joybakeshop.com</span>
                            <span className="status-pill live">Active</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                          <div className="card-row">
                            <div className="v3-icon-container">
                              <img src={PlusIcon} alt="" width="16" height="16" />
                            </div>
                            <h4 className="service-title">Connect website</h4>
                            <span className="v3-service-subtitle">Link to your existing website</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="card-row">
                            <div className="v3-icon-container">
                              <img src={GlobeIcon} alt="" width="24" height="24" />
                            </div>
                            <h4 className="service-title">cash.app/{brand.handle?.replace('$', '')}</h4>
                            <span className="v3-service-subtitle"></span>
                            <span className="status-pill action">Free</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                          <div className="card-row">
                            <div className="v3-icon-container">
                              <img src={PlusIcon} alt="" width="16" height="16" />
                            </div>
                            <h4 className="service-title">Connect domain</h4>
                            <span className="v3-service-subtitle">Use your own domain</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                          <div className="card-row">
                            <div className="v3-icon-container">
                              <img src={PlusIcon} alt="" width="16" height="16" />
                            </div>
                            <h4 className="service-title">Connect website</h4>
                            <span className="v3-service-subtitle">Link to your existing website</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
              )}

              {/* Website Preview Modal - always dark theme for preview */}
              {(isV2WebsiteModalOpen || isV2WebsiteModalClosing) && (
                <div className={`modal-overlay ${isV2WebsiteModalClosing ? 'closing' : ''}`} data-theme="dark">
                  <div className={`modal-container website-modal ${isUpgradeSidebarOpen ? 'sidebar-open' : ''}`}>
                    {/* Modal Header */}
                    <div className="modal-header website-modal-header">
                      <button className="modal-close website-modal-close" onClick={handleCloseV2WebsiteModal}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      <div className="website-modal-url-selector">
                        <span className="website-modal-url-text">cash.app/{brand.handle?.replace('$', '')}</span>
                        <img src={CaretDownIcon} alt="" width="16" height="16" />
                      </div>
                      
                      {isUpgradeSidebarOpen ? (
                        <div className="editor-header-actions">
                          <button className="editor-preview-btn" onClick={() => setIsUpgradeSidebarOpen(false)}>
                            Preview
                          </button>
                          <button className="editor-publish-btn">
                            Publish
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button className="website-modal-upgrade-btn" onClick={() => setIsUpgradeModalOpen(true)}>Upgrade to customize</button>
                      )}
                    </div>

                    {/* Website Modal Body with Sidebar */}
                    <div className="website-modal-body">
                      {/* Blink AI Sidebar */}
                      <div className={`upgrade-sidebar ${isUpgradeSidebarOpen ? 'open' : ''}`}>
                        <div className="blink-sidebar">
                          {/* Steps Section - Timeline */}
                          <div className="blink-steps">
                            
                            {/* Initial Blink Message (only shown if no history) */}
                            {conversationHistory.length === 0 && (
                              <div className={`blink-initial-exchange ${isCollapsing ? 'collapsing' : ''}`}>
                                {/* Blink Response Row */}
                                <div className="blink-queue-item">
                                  <div className="blink-progress">
                                    <div className="blink-icon-wrapper">
                                      <svg className="blink-bot-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="20" height="20" rx="5" fill="#FFFFFF"/>
                                        <rect className="blink-eye" x="8.66" y="8.11" width="1.67" height="2.78" rx="0.2" fill="#0F0F0F"/>
                                        <rect className="blink-eye" x="13.67" y="8.11" width="1.67" height="2.78" rx="0.2" fill="#0F0F0F"/>
                                        <path className="blink-mouth" d="M6.47 14.78C6.94 15.1 7.45 15.33 7.96 15.52C8.97 15.9 10.48 16.26 12.55 16.26C14.63 16.26 16.14 15.9 17.15 15.52C17.66 15.33 18.16 15.1 18.61 14.78" stroke="#0F0F0F" strokeWidth="1.2" strokeLinecap="round"/>
                                      </svg>
                                    </div>
                                    <div className={`blink-connector-line ${animationStep >= 2 ? 'animate-draw' : ''}`}></div>
                                  </div>
                                  <div className="blink-response">
                                    <p className="blink-message">
                                      {displayedText}
                                      {animationStep >= 1 && !isTypingComplete && (
                                        <span className="typing-cursor">|</span>
                                      )}
                                    </p>
                                  </div>
                                </div>

                                {/* Brand Options Row */}
                                <div className={`blink-queue-item brand-options ${animationStep >= 3 ? 'animate-reveal' : ''}`}>
                                  <div className="blink-progress">
                                    <div className="blink-brand-wrapper">
                                      <div className={`blink-brand-card blink-response-avatar ${animationStep >= 3 ? 'animate-pop' : ''}`}>
                                        <img src={avatar1} alt="" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="blink-options">
                                    {currentOptions.map((option, index) => (
                                      <button 
                                        key={option.id}
                                        className={`blink-option-btn outlined ${selectedBlinkOption === option.id ? 'selected' : ''} ${loadingBlinkOption === option.id ? 'loading' : ''} ${animationStep >= 4 ? 'animate-fold-in' : ''}`} 
                                        style={{ animationDelay: `${index * 50}ms` }} 
                                        onClick={() => handleBlinkOptionClick(option.id)}
                                      >
                                        <span className="blink-option-title-white">{option.title}</span>
                                        {loadingBlinkOption === option.id && <span className="blink-option-loader"></span>}
                                      </button>
                                    ))}
                                    {currentSecondaryOptions.map((option, index) => (
                                      <button 
                                        key={option.id}
                                        className={`blink-option-btn outlined ${animationStep >= 4 ? 'animate-fold-in' : ''}`} 
                                        style={{ animationDelay: `${(currentOptions.length + index) * 50}ms` }}
                                        onClick={option.id === 'upload-share' ? handleUploadClick : () => handleBlinkOptionClick(option.id)}
                                      >
                                        <span className="blink-option-title-muted">{option.title}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Condensed History - Single Row */}
                            {conversationHistory.length > 0 && (
                              <>
                                {/* History icon row - represents all past exchanges */}
                                <div className="blink-queue-item history-row">
                                  <div className="blink-progress">
                                    <div className="blink-history-icon-wrapper">
                                      <img src={HistoryIcon} alt="" width="24" height="24" className="blink-history-icon" />
                                    </div>
                                    <div className="blink-connector-line history"></div>
                                  </div>
                                  <div className="blink-response">
                                    <p className="blink-history-text">
                                      {conversationHistory[conversationHistory.length - 1].blinkMessage}
                                    </p>
                                  </div>
                                </div>

                                {/* User's Typed Message (if any) */}
                                {currentUserMessage && (
                                  <div className="blink-queue-item user-typed-message">
                                    <div className="blink-progress">
                                      <div className="blink-brand-wrapper">
                                        <div className="blink-brand-card blink-response-avatar">
                                          <img src={avatar1} alt="" />
                                        </div>
                                      </div>
                                      <div className="blink-connector-line animate-draw"></div>
                                    </div>
                                    <div className="blink-response">
                                      <p className="blink-user-typed-text">{currentUserMessage}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Current Active Exchange */}
                                <div className={`blink-active-exchange ${isCollapsing ? 'collapsing' : ''}`}>
                                  {isBlinkThinking ? (
                                    /* Thinking state */
                                    <div className="blink-queue-item">
                                      <div className="blink-progress">
                                        <div className="blink-icon-wrapper">
                                          <svg className="blink-bot-icon animate-visible" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="2" y="2" width="20" height="20" rx="5" fill="#FFFFFF"/>
                                            <rect className="blink-eye" x="8.66" y="8.11" width="1.67" height="2.78" rx="0.2" fill="#0F0F0F"/>
                                            <rect className="blink-eye" x="13.67" y="8.11" width="1.67" height="2.78" rx="0.2" fill="#0F0F0F"/>
                                            <path className="blink-mouth" d="M6.47 14.78C6.94 15.1 7.45 15.33 7.96 15.52C8.97 15.9 10.48 16.26 12.55 16.26C14.63 16.26 16.14 15.9 17.15 15.52C17.66 15.33 18.16 15.1 18.61 14.78" stroke="#0F0F0F" strokeWidth="1.2" strokeLinecap="round"/>
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="blink-response">
                                        <div className="blink-thinking-dots">
                                          <span></span>
                                          <span></span>
                                          <span></span>
                                        </div>
                                      </div>
                                    </div>
                                  ) : currentBlinkMessage && (
                                    /* Active Blink response with options */
                                    <>
                                      <div className="blink-queue-item active">
                                        <div className="blink-progress">
                                          <div className="blink-icon-wrapper">
                                            <svg className="blink-bot-icon animate-visible" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <rect x="2" y="2" width="20" height="20" rx="5" fill="#FFFFFF"/>
                                              <rect className="blink-eye" x="8.66" y="8.11" width="1.67" height="2.78" rx="0.2" fill="#0F0F0F"/>
                                              <rect className="blink-eye" x="13.67" y="8.11" width="1.67" height="2.78" rx="0.2" fill="#0F0F0F"/>
                                              <path className="blink-mouth" d="M6.47 14.78C6.94 15.1 7.45 15.33 7.96 15.52C8.97 15.9 10.48 16.26 12.55 16.26C14.63 16.26 16.14 15.9 17.15 15.52C17.66 15.33 18.16 15.1 18.61 14.78" stroke="#0F0F0F" strokeWidth="1.2" strokeLinecap="round"/>
                                            </svg>
                                          </div>
                                          <div className="blink-connector-line animate-draw"></div>
                                        </div>
                                        <div className="blink-response">
                                          <p className="blink-message">{currentBlinkMessage}</p>
                                        </div>
                                      </div>

                                      {/* Current Options */}
                                      <div className="blink-queue-item brand-options animate-reveal">
                                        <div className="blink-progress">
                                          <div className="blink-brand-wrapper">
                                            <div className="blink-brand-card blink-response-avatar animate-pop">
                                              <img src={avatar1} alt="" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="blink-options">
                                          {currentOptions.map((option, index) => (
                                            <button 
                                              key={option.id}
                                              className={`blink-option-btn outlined ${selectedBlinkOption === option.id ? 'selected' : ''} ${loadingBlinkOption === option.id ? 'loading' : ''} animate-fold-in`} 
                                              style={{ animationDelay: `${index * 50}ms` }} 
                                              onClick={() => handleBlinkOptionClick(option.id)}
                                            >
                                              <span className="blink-option-title-white">{option.title}</span>
                                              {loadingBlinkOption === option.id && <span className="blink-option-loader"></span>}
                                            </button>
                                          ))}
                                          <button className="blink-option-btn outlined animate-fold-in" style={{ animationDelay: `${currentOptions.length * 50}ms` }}>
                                            <span className="blink-option-title-muted">Explore all designs</span>
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Composer */}
                          <div className={`blink-composer ${isComposerHighlighted ? 'highlighted' : ''}`}>
                            <textarea 
                              ref={composerRef}
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              onKeyPress={handleComposerKeyPress}
                              placeholder={isComposerHighlighted ? "Upload or share a link" : "Ask anything"} 
                              className="blink-composer-textarea" 
                              rows="1"
                              onBlur={handleComposerBlur}
                            ></textarea>
                            <div className="blink-composer-footer">
                              <div className="blink-composer-tools">
                                <button className="blink-tool-btn filled">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 3V13M3 8H13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                                  </svg>
                                </button>
                                <button className="blink-tool-btn filled">
                                  <img src={MicrophoneIcon} alt="Voice" width="16" height="16" />
                                </button>
                              </div>
                              <button className="blink-tool-btn send" onClick={handleSendMessage}>
                                <img src={SendIcon} alt="Send" width="16" height="16" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Browser Preview Container */}
                      <div 
                        className={`browser-preview-container ${selectedBlinkOption ? 'option-selected' : ''}`}
                        onClick={handleBrowserContainerClick}
                      >
                        {/* Options Container - shows when option is selected */}
                        <div className="blink-options-display">
                          {selectedBlinkOption && (
                            <div className="blink-options-content">
                              {/* Placeholder for options content */}
                            </div>
                          )}
                        </div>

                        {/* Browser Frame */}
                        <div className="website-browser-frame">
                          {/* Browser Chrome - New Design */}
                          <div className="website-browser-chrome">
                            {/* Page Dropdown */}
                            <button className="browser-page-dropdown">
                              <span className="browser-page-name">Order online</span>
                              <img src={CaretDownIcon} alt="" width="16" height="16" className="browser-caret-icon" />
                            </button>
                            
                            {/* Selection/Address Bar */}
                            <div className="browser-selection-bar">
                              <div className="browser-selection-pill">
                                <span className="browser-selection-text">Banner</span>
                              </div>
                              <div className="browser-address-bar">
                                <span className="browser-address-text">cash.app/{brand.handle?.replace('$', '')}</span>
                              </div>
                            </div>
                            
                            {/* Undo/Redo Buttons */}
                            <div className="browser-history-controls">
                              <button className="browser-history-btn">
                                <img src={CycleBackwardIcon} alt="Undo" width="16" height="16" />
                              </button>
                              <button className="browser-history-btn disabled">
                                <img src={CycleForwardIcon} alt="Redo" width="16" height="16" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Website Preview Area: returning customer + thumbnail click = blocks scaled in canvas; else normal preview */}
                          <div className="website-preview-area">
                            {customerViewMode === 'returning' && websitePreviewPage && websiteBlocksByPage[websitePreviewPage] ? (
                              <div className="website-blocks-canvas" ref={blocksCanvasRef}>
                                {websiteBlocksByPage[websitePreviewPage].map((src, i) => (
                                  <div key={i} className="website-blocks-canvas-item" data-block-index={i}>
                                    <img src={src} alt="" />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <DefaultWebsite activeBrand={activeBrand} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upgrade Modal - overlays the website preview (light theme to match switch business) */}
                  {(isUpgradeModalOpen || isUpgradeModalClosing) && (
                    <div className={`upgrade-modal-overlay ${isUpgradeModalClosing ? 'closing' : ''}`} data-theme="light">
                      <div className="upgrade-modal">
                        <div className="upgrade-modal-header">
                          <button className="upgrade-modal-close" onClick={handleCloseUpgradeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button className="upgrade-modal-btn" onClick={handleUpgradeToPlusClick}>Upgrade to Plus</button>
                        </div>
                        
                        <div className="upgrade-modal-content">
                          <h2 className="upgrade-modal-title">Unlock website customization</h2>
                          <p className="upgrade-modal-description">
                            Use our new AI website builder to create new pages, add sections, and express your brand. <a href="#" className="upgrade-learn-more">Learn more</a>.
                          </p>
                          
                          <h3 className="upgrade-includes-title">Square Plus includes</h3>
                          
                          <div className="upgrade-features-card">
                            <div className="upgrade-feature">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>Staff management</span>
                            </div>
                            <div className="upgrade-feature">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>Advanced website customizations</span>
                            </div>
                            <div className="upgrade-feature">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>Loyalty rewards program</span>
                            </div>
                            <div className="upgrade-feature">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>Phone support M-F, 6 AM–6 PM (PT)</span>
                            </div>
                            <div className="upgrade-feature">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>Advanced reporting and analytics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
        ) : activePage === 'online-ordering' ? (
          <div className="main-content-inner cards-container">
            <div className={`card ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card--ordering-new' : ''}`}>
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">Menus</h3>
                  <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Add a menu for online ordering' : 'Breakfast, Lunch, Drinks'}</p>
                </div>
                <button className={`card-action ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-action--primary' : ''}`}>Add menu</button>
              </div>
              {customerViewMode === 'returning' && <hr className="card-divider" />}
              <div className={`card-rows ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-rows--ordering-empty' : ''}`}>
                {customerViewMode === 'returning' && (
                  <>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={FoodMenuIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Lunch menu</h4>
                      <span className="v3-service-subtitle">12:00 PM - 3:00 PM, M-S · 6 Menu groups · 34 Items</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={FoodMenuIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Drinks</h4>
                      <span className="v3-service-subtitle">12:00 PM - 3:00 PM, M-S · 3 Menu groups · 12 Items</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">Fulfillment</h3>
                  <p className="card-subtitle">Setup ways for customers to get their online order</p>
                </div>
              </div>
              <hr className="card-divider" />
              <div className="card-rows card-rows--fulfillment">
                <div className="card-row">
                  <div className="v3-icon-container"><img src={CategoryShoppingIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Pickup</h4>
                  <span className="v3-service-subtitle">
                    {customerViewMode === 'returning' ? '3 locations' : 'Allow customers to pick up orders in store'}
                  </span>
                  {customerViewMode === 'returning' && <span className="status-pill live">Active</span>}
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <div className="card-row">
                  <div className="v3-icon-container"><img src={PickupCurbsideIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Curbside pickup</h4>
                  <span className="v3-service-subtitle">Allow customers to pick up orders outside of store</span>
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <hr className="card-divider card-divider--fulfillment" />
                <div className="card-row">
                  <div className="v3-icon-container"><img src={PackageTrackingIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Delivery</h4>
                  <span className="v3-service-subtitle">
                    {customerViewMode === 'returning' ? '2 locations' : 'Fulfill online orders with delivery partners'}
                  </span>
                  {customerViewMode === 'returning' && <span className="status-pill live">Active</span>}
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <div className="card-row">
                  <div className="v3-icon-container"><img src={CategoryAutoIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Seller-powered delivery</h4>
                  <span className="v3-service-subtitle">Fulfill online orders with your own drivers</span>
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <hr className="card-divider card-divider--fulfillment" />
                <div className="card-row">
                  <div className="v3-icon-container"><img src={DeliveryIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Shipping</h4>
                  <span className="v3-service-subtitle">Fulfill online orders with delivery partners</span>
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
              </div>
            </div>
            <div className={`card ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card--ordering-new' : ''}`}>
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">QR code ordering</h3>
                  <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Let customers order by scanning a QR code at your location' : 'Customers scan to order at your locations'}</p>
                </div>
                <button className={`card-action ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-action--primary' : ''}`}>{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Start' : 'Edit'}</button>
              </div>
              {customerViewMode === 'returning' && <hr className="card-divider" />}
              <div className={`card-rows ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-rows--ordering-empty' : ''}`}>
                {customerViewMode === 'returning' && (
                  <>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={ShopInStoreIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Brookhaven</h4>
                      <span className="v3-service-subtitle">Lunch menu and drinks</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={ShopInStoreIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Ansley Park</h4>
                      <span className="v3-service-subtitle">Lunch menu and drinks</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={ShopInStoreIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Virginia-Highland</h4>
                      <span className="v3-service-subtitle">Lunch menu</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : activePage === 'online-booking' ? (
          <div className="main-content-inner cards-container">
            {/* Card 1: Reservations */}
            <div className={`card ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card--ordering-new' : ''}`}>
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">Reservations</h3>
                  <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Set up table booking and waitlist' : 'Table booking, waitlist, and where customers can book.'}</p>
                </div>
                <button className={`card-action ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-action--primary' : ''}`} onClick={() => setBookingReservationsModalOpen(true)}>Edit</button>
              </div>
              {customerViewMode === 'returning' && <hr className="card-divider" />}
              <div className={`card-rows ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-rows--ordering-empty' : ''}`}>
                {customerViewMode === 'returning' && (
                  <>
                    <div className="card-row" onClick={() => { setBookingReservationsSection('table'); setBookingReservationsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={SeatMapIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Table reservations</h4>
                      <span className="v3-service-subtitle">Configure tables and party sizes</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row" onClick={() => { setBookingReservationsSection('waitlist'); setBookingReservationsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={BookCheckmarkIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Waitlist</h4>
                      <span className="v3-service-subtitle">Let guests join a waitlist when tables are full</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <hr className="card-divider card-divider--fulfillment" />
                    <div className="card-row" onClick={() => { setBookingReservationsSection('channels'); setBookingReservationsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={TilesIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Channels</h4>
                      <span className="v3-service-subtitle">Yelp, OpenTable, and more</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row" onClick={() => { setBookingReservationsSection('preferences'); setBookingReservationsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={PerferencesIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Preferences</h4>
                      <span className="v3-service-subtitle">Booking rules and messages</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Card 2: Appointments */}
            <div className={`card ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card--ordering-new' : ''}`}>
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">Appointments</h3>
                  <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Set up services, staff, and scheduling' : 'Services, classes, staff, and scheduling.'}</p>
                </div>
                <button className={`card-action ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-action--primary' : ''}`} onClick={() => setBookingAppointmentsModalOpen(true)}>Edit</button>
              </div>
              {customerViewMode === 'returning' && <hr className="card-divider" />}
              <div className={`card-rows ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-rows--ordering-empty' : ''}`}>
                {customerViewMode === 'returning' && (
                  <>
                    <div className="card-row" onClick={() => { setBookingAppointmentsSection('services'); setBookingAppointmentsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={HumanCheckIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Services</h4>
                      <span className="v3-service-subtitle">Haircut, Beard trim, Coloring</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row" onClick={() => { setBookingAppointmentsSection('classes'); setBookingAppointmentsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={FormIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Classes</h4>
                      <span className="v3-service-subtitle">Group sessions and workshops</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row" onClick={() => { setBookingAppointmentsSection('staff'); setBookingAppointmentsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={StaffIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Staff</h4>
                      <span className="v3-service-subtitle">3 team members</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row" onClick={() => { setBookingAppointmentsSection('availability'); setBookingAppointmentsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={ClockIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Availability</h4>
                      <span className="v3-service-subtitle">Hours and booking limits</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <hr className="card-divider card-divider--fulfillment" />
                    <div className="card-row" onClick={() => { setBookingAppointmentsSection('channels'); setBookingAppointmentsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={TilesIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Channels</h4>
                      <span className="v3-service-subtitle">Instagram, Google, and more</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row" onClick={() => { setBookingAppointmentsSection('preferences'); setBookingAppointmentsModalOpen(true); }}>
                      <div className="v3-icon-container"><img src={PerferencesIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Preferences</h4>
                      <span className="v3-service-subtitle">Text us, timezone, waitlist</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : activePage === 'online-shopping' ? (
          <div className="main-content-inner cards-container">
            <div className={`card ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card--ordering-new' : ''}`}>
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">Collections</h3>
                  <p className="card-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Add product collections for your store' : 'Seasonal, Best sellers, New arrivals'}</p>
                </div>
                <button className={`card-action ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-action--primary' : ''}`}>Add collection</button>
              </div>
              {customerViewMode === 'returning' && <hr className="card-divider" />}
              <div className={`card-rows ${(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'card-rows--ordering-empty' : ''}`}>
                {customerViewMode === 'returning' && (
                  <>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={CategoryShoppingIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Seasonal</h4>
                      <span className="v3-service-subtitle">12 items · Live</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={CategoryShoppingIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">Best sellers</h4>
                      <span className="v3-service-subtitle">8 items · Live</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    <div className="card-row">
                      <div className="v3-icon-container"><img src={CategoryShoppingIcon} alt="" width="24" height="24" /></div>
                      <h4 className="service-title">New arrivals</h4>
                      <span className="v3-service-subtitle">5 items · Live</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">Fulfillment</h3>
                  <p className="card-subtitle">Setup ways for customers to get their order</p>
                </div>
              </div>
              <hr className="card-divider" />
              <div className="card-rows card-rows--fulfillment">
                <div className="card-row">
                  <div className="v3-icon-container"><img src={ShopInStoreIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Pickup</h4>
                  <span className="v3-service-subtitle">
                    {customerViewMode === 'returning' ? '2 locations' : 'Allow customers to pick up orders in store'}
                  </span>
                  {customerViewMode === 'returning' && <span className="status-pill live">Active</span>}
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <div className="card-row">
                  <div className="v3-icon-container"><img src={PickupCurbsideIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Curbside pickup</h4>
                  <span className="v3-service-subtitle">Allow customers to pick up orders outside of store</span>
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <hr className="card-divider card-divider--fulfillment" />
                <div className="card-row">
                  <div className="v3-icon-container"><img src={PackageTrackingIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Delivery</h4>
                  <span className="v3-service-subtitle">
                    {customerViewMode === 'returning' ? 'Partner delivery' : 'Fulfill orders with delivery partners'}
                  </span>
                  {customerViewMode === 'returning' && <span className="status-pill live">Active</span>}
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <div className="card-row">
                  <div className="v3-icon-container"><img src={CategoryAutoIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Seller-powered delivery</h4>
                  <span className="v3-service-subtitle">Fulfill orders with your own drivers</span>
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
                <hr className="card-divider card-divider--fulfillment" />
                <div className="card-row">
                  <div className="v3-icon-container"><img src={DeliveryIcon} alt="" width="24" height="24" /></div>
                  <h4 className="service-title">Shipping</h4>
                  <span className="v3-service-subtitle">Ship orders to customers</span>
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
              </div>
            </div>
          </div>
        ) : activePage === 'channels' ? (
          <>
            <div className="main-content-inner">
              {profileVersion === 'v2' ? (
                <>
                  {/* 1. Sales channels (v2: first, with Joy Bakeshop row) */}
                  <div className="card" style={{ marginBottom: '24px' }}>
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Sales channels</h3>
                        <p className="card-subtitle">Reach customers through marketplaces and delivery partners. Sync your menu and orders.</p>
                      </div>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-rows">
                      {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                        <div className="card-row card-row--emphasized">
                          <div className="card-row-emphasized-media">
                            <div className="card-row-mini-map">
                              <div className="mini-map-wrap">
                                <AppleMap center={{ lat: 33.8795, lng: -84.3305 }} rotation={310} />
                              </div>
                              <div className="mini-map-pin-wrap">
                                <div className="mini-map-pin" style={{ position: 'relative' }}>
                                  <img src={SellerCardPinMain} alt="" className="mini-map-pin-bg" />
                                  <div className="mini-map-pin-brand">
                                    <div className="mini-map-pin-monogram" style={{ background: brand.color }}>
                                      <span>{brand.name.split(' ').length >= 2 ? (brand.name.split(' ')[0][0] + brand.name.split(' ')[1][0]).toUpperCase() : brand.name.substring(0, 2).toUpperCase()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-row-emphasized-content">
                            <div className="card-row-emphasized-text">
                              <h4 className="service-title">Neighborhoods on Cash App</h4>
                              <p className="card-row-emphasized-subtitle" style={{ color: '#00792C' }}>Square-backed rewards · lower processing · direct messaging</p>
                              <p className="card-row-emphasized-description">Join a growing network of sellers unlocking more from online ordering with free access to direct marketing, neighborhood-wide rewards, and our lowest standard payment processing fee.</p>
                            </div>
                            <button type="button" className="card-action card-action--small-primary" onClick={() => { setNeighborhoodsStartLoading(true); setTimeout(() => { setNeighborhoodsStartLoading(false); onNavigationStart?.('neighborhoods'); onSidebarLevelChange?.('online'); }, 1200); }}>
                              <span className={`btn-spinner-wrap${neighborhoodsStartLoading ? ' is-loading' : ''}`}>
                                <span className="btn-label">Start</span>
                                <span className="btn-spinner" />
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="card-row" onClick={() => { onNavigationStart?.('neighborhoods'); onSidebarLevelChange?.('online'); }} style={{ cursor: 'pointer' }}>
                          <div className="v3-icon-container v3-connection-icon v3-channel-brand-icon" style={!brandLogos[activeBrand] ? { background: brand.color } : undefined}>
                            {brandLogos[activeBrand] ? (
                              <img src={brandLogos[activeBrand]} alt="" width="20" height="24" style={{ objectFit: 'contain' }} />
                            ) : (
                              <span className="v3-channel-brand-initial">{brand.name.charAt(0)}</span>
                            )}
                          </div>
                          <h4 className="service-title">Neighborhoods on Cash App</h4>
                          <span className="v3-service-subtitle">{brand.name} · {brand.handle}</span>
                          <span className="status-pill live">Active</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                      )}
                      {customerViewMode === 'returning' && (
                        <div className="card-row">
                          <div className="v3-icon-container v3-connection-icon">
                            <img src={DoorDashIcon} alt="" width="20" height="20" />
                          </div>
                          <h4 className="service-title">DoorDash</h4>
                          <span className="v3-service-subtitle">vo@joybakeshop.com</span>
                          <span className="status-pill live">Active</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                      )}
                    </div>
                    <hr className="card-divider" />
                    <div className="card-rows">
                      {(customerViewMode === 'new-1' || customerViewMode === 'new-2') && (
                        <div className="card-row">
                          <div className="v3-icon-container v3-connection-icon">
                            <img src={DoorDashIcon} alt="" width="20" height="20" />
                          </div>
                          <h4 className="service-title">DoorDash</h4>
                          <span className="v3-service-subtitle">Orders and delivery</span>
                          <button type="button" className="card-action card-action--small-secondary">Start</button>
                        </div>
                      )}
                      <div className="card-row">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={UberEatsIcon} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">Uber Eats</h4>
                        <span className="v3-service-subtitle">Orders and delivery</span>
                        <button type="button" className="card-action card-action--small-secondary">Start</button>
                      </div>
                      <div className="card-row card-row--full">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={GrubhubIcon} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">Grubhub</h4>
                        <span className="v3-service-subtitle">Orders and delivery</span>
                        <button type="button" className="card-action card-action--small-secondary">Start</button>
                      </div>
                    </div>
                  </div>

                  {/* 2. Demand channels */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Demand channels</h3>
                        <p className="card-subtitle">Drive traffic to your business through search, maps, and AI.</p>
                      </div>
                    </div>
                    <hr className="card-divider" />
                    {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                      <>
                        <div className="card-rows">
                          <div className="card-row card-row--google">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={GoogleLogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">Google Business Profile</h4>
                            <span className="v3-service-subtitle">veeo@joybakeshop.com</span>
                            <span className="status-pill connected">Connected</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                        </div>
                        <hr className="card-divider" />
                        <div className="card-rows">
                          <div className="card-row">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={AppleLogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">Apple Business Connect</h4>
                            <span className="v3-service-subtitle">Show up in Apple search, maps, and more</span>
                            <button type="button" className="card-action card-action--small-secondary">Connect</button>
                          </div>
                          <div className="card-row">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={OpenAILogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">OpenAI – ChatGPT</h4>
                            <span className="v3-service-subtitle">Allow customers to find you directly in ChatGPT</span>
                            <button type="button" className="card-action card-action--small-secondary">Connect</button>
                          </div>
                          <div className="card-row card-row--full">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={MetaLogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">Meta for Small Businesses</h4>
                            <span className="v3-service-subtitle">Show up in Instagram and Facebook search and more</span>
                            <button type="button" className="card-action card-action--small-secondary">Connect</button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="card-rows">
                          <div className="card-row card-row--google">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={GoogleLogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">Google Business Profile</h4>
                            <span className="v3-service-subtitle">veeo@joybakeshop.com</span>
                            <span className="status-pill connected">Connected</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                          <div className="card-row">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={AppleLogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">Apple Business Connect</h4>
                            <span className="v3-service-subtitle">veeo@joybakeshop.com</span>
                            <span className="status-pill connected">Connected</span>
                            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                          </div>
                        </div>
                        <hr className="card-divider" />
                        <div className="card-rows">
                          <div className="card-row">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={OpenAILogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">OpenAI – ChatGPT</h4>
                            <span className="v3-service-subtitle">Allow customers to find you directly in ChatGPT</span>
                            <button type="button" className="card-action card-action--small-secondary">Connect</button>
                          </div>
                          <div className="card-row card-row--full">
                            <div className="v3-icon-container v3-connection-icon">
                              <img src={MetaLogo} alt="" width="20" height="20" />
                            </div>
                            <h4 className="service-title">Meta for Small Businesses</h4>
                            <span className="v3-service-subtitle">Show up in Instagram and Facebook search and more</span>
                            <button type="button" className="card-action card-action--small-secondary">Connect</button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* 1. Neighborhoods */}
                  <div className="card" style={{ marginBottom: '24px' }}>
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Neighborhoods</h3>
                        <p className="card-subtitle">Allow customers to discover and follow your business in Neighborhoods in Cash App.</p>
                      </div>
                      <button type="button" className="card-action">Preview profile</button>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-rows">
                      <div className="card-row">
                        <div className="v3-icon-container v3-connection-icon v3-channel-brand-icon" style={!brandLogos[activeBrand] ? { background: brand.color } : undefined}>
                          {brandLogos[activeBrand] ? (
                            <img src={brandLogos[activeBrand]} alt="" width="20" height="24" style={{ objectFit: 'contain' }} />
                          ) : (
                            <span className="v3-channel-brand-initial">{brand.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="v3-channel-row-label">
                          <h4 className="service-title">{brand.name}</h4>
                          <span className="v3-channel-row-sublabel">Business profile · {brand.handle}</span>
                        </div>
                        <span className="v3-service-subtitle">Online ordering enabled</span>
                        <span className="status-pill live">Active</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                    </div>
                  </div>

                  {/* 2. Demand channels */}
                  <div className="card" style={{ marginBottom: '24px' }}>
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Demand channels</h3>
                        <p className="card-subtitle">Drive traffic to your business through search, maps, and AI.</p>
                      </div>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-rows">
                      <div className="card-row card-row--google">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={GoogleLogo} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">Google Business Profile</h4>
                        <span className="v3-service-subtitle">veeo@joybakeshop.com</span>
                        <span className="status-pill connected">Connected</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-row">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={AppleLogo} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">Apple Business Connect</h4>
                        <span className="v3-service-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Show up in Apple search, maps, and more' : 'veeo@joybakeshop.com'}</span>
                        {customerViewMode === 'returning' && <span className="status-pill connected">Connected</span>}
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-row">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={OpenAILogo} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">OpenAI – ChatGPT</h4>
                        <span className="v3-service-subtitle">Allow customers to find you directly in ChatGPT</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-row card-row--full">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={MetaLogo} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">Meta for Small Businesses</h4>
                        <span className="v3-service-subtitle">Show up in Instagram and Facebook search and more</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                    </div>
                  </div>

                  {/* 3. Sales channels */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Sales channels</h3>
                        <p className="card-subtitle">Reach customers through marketplaces and delivery partners. Sync your menu and orders.</p>
                      </div>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-rows">
                      <div className="card-row">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={DoorDashIcon} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">DoorDash</h4>
                        <span className="v3-service-subtitle">Orders and delivery</span>
                        <span className="status-pill live">Active</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-row">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={UberEatsIcon} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">Uber Eats</h4>
                        <span className="v3-service-subtitle">Orders and delivery</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-row card-row--full">
                        <div className="v3-icon-container v3-connection-icon">
                          <img src={GrubhubIcon} alt="" width="20" height="20" />
                        </div>
                        <h4 className="service-title">Grubhub</h4>
                        <span className="v3-service-subtitle">Orders and delivery</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div style={{ padding: '32px 0', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Content for {getPageTitle()} coming soon
          </div>
        )}
      </div>
    </main>

    {demoMode === 'franchise' && manageBusinessGroupsModalOpen && (
      <ManageBusinessGroupsModal
        isOpen
        onClose={() => {
          setManageBusinessGroupsModalOpen(false)
          setOpenManageGroupsToEditGroupId(null)
        }}
        brandGroups={brandGroups}
        onBrandGroupsChange={onBrandGroupsChange}
        orgBusinesses={orgBusinesses}
        mergedBrandData={effectiveMergedForProfileDialogs}
        brandLogos={brandLogos}
        customerViewMode={customerViewMode}
        onEditGroupBranding={handleEditGroupBrandingFromManage}
        openToEditGroupId={openManageGroupsToEditGroupId}
        onOpenToEditGroupConsumed={handleOpenToEditGroupConsumed}
        onShowToast={handleShowToast}
      />
    )}

    {/* Booking: Reservations Edit Modal (same behavior as business edit – sidebar + sections) */}
    {(bookingReservationsModalOpen || bookingReservationsModalClosing) && (
      <div className={`modal-overlay ${bookingReservationsModalClosing ? 'closing' : ''}`} onClick={handleCloseBookingReservationsModal}>
        <div className="modal-container business-edit-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-header-inner">
              <button className="modal-close" onClick={handleCloseBookingReservationsModal} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className="modal-title">Reservations</h2>
              <div className="modal-actions">
                <button type="button" className="modal-cancel" onClick={handleCloseBookingReservationsModal}>Cancel</button>
                <button type="button" className="modal-send">Save</button>
              </div>
            </div>
          </div>
          <div className="location-modal-body">
            <nav className="location-modal-sidebar location-modal-sidebar-left v3-business-edit-sidebar">
              {['table', 'waitlist', 'channels', 'preferences'].map((section) => (
                <button key={section} type="button" className={`v3-business-edit-nav-item ${bookingReservationsSection === section ? 'active' : ''}`} onClick={() => setBookingReservationsSection(section)}>
                  <span className="v3-business-edit-nav-icon" aria-hidden><img src={section === 'table' ? SeatMapIcon : section === 'waitlist' ? BookCheckmarkIcon : section === 'channels' ? TilesIcon : PerferencesIcon} alt="" width="24" height="24" /></span>
                  <span>{section === 'table' ? 'Table reservations' : section === 'waitlist' ? 'Waitlist' : section === 'channels' ? 'Channels' : 'Preferences'}</span>
                </button>
              ))}
            </nav>
            <div className="modal-content fading-in v3-edit-content">
              {bookingReservationsSection === 'table' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Table reservations</h3><p className="card-subtitle">Configure tables and party sizes for your booking site.</p></div></div><div className="v3-form-fields"><div className="form-input-container has-value"><label className="form-label">Location</label><input type="text" className="form-input-text" defaultValue="Brookhaven" /></div></div></div></div>}
              {bookingReservationsSection === 'waitlist' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Waitlist</h3><p className="card-subtitle">Let guests join a waitlist when tables are full.</p></div></div></div></div>}
              {bookingReservationsSection === 'channels' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Channels</h3><p className="card-subtitle">Connect Yelp, OpenTable, and other reservation channels.</p></div></div></div></div>}
              {bookingReservationsSection === 'preferences' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Preferences</h3><p className="card-subtitle">Booking rules and confirmation messages.</p></div></div></div></div>}
            </div>
            <div className="location-modal-sidebar location-modal-sidebar-right"></div>
          </div>
        </div>
      </div>
    )}

    {/* Booking: Appointments Edit Modal */}
    {(bookingAppointmentsModalOpen || bookingAppointmentsModalClosing) && (
      <div className={`modal-overlay ${bookingAppointmentsModalClosing ? 'closing' : ''}`} onClick={handleCloseBookingAppointmentsModal}>
        <div className="modal-container business-edit-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-header-inner">
              <button className="modal-close" onClick={handleCloseBookingAppointmentsModal} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className="modal-title">Appointments</h2>
              <div className="modal-actions">
                <button type="button" className="modal-cancel" onClick={handleCloseBookingAppointmentsModal}>Cancel</button>
                <button type="button" className="modal-send">Save</button>
              </div>
            </div>
          </div>
          <div className="location-modal-body">
            <nav className="location-modal-sidebar location-modal-sidebar-left v3-business-edit-sidebar">
              {['services', 'classes', 'staff', 'availability', 'channels', 'preferences'].map((section) => (
                <button key={section} type="button" className={`v3-business-edit-nav-item ${bookingAppointmentsSection === section ? 'active' : ''}`} onClick={() => setBookingAppointmentsSection(section)}>
                  <span className="v3-business-edit-nav-icon" aria-hidden><img src={section === 'services' ? HumanCheckIcon : section === 'staff' ? StaffIcon : section === 'availability' ? ClockIcon : section === 'channels' ? TilesIcon : PerferencesIcon} alt="" width="24" height="24" /></span>
                  <span>{section === 'services' ? 'Services' : section === 'classes' ? 'Classes' : section === 'staff' ? 'Staff' : section === 'availability' ? 'Availability' : section === 'channels' ? 'Channels' : 'Preferences'}</span>
                </button>
              ))}
            </nav>
            <div className="modal-content fading-in v3-edit-content">
              {bookingAppointmentsSection === 'services' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Services</h3><p className="card-subtitle">Haircut, Beard trim, Coloring and other bookable services.</p></div></div></div></div>}
              {bookingAppointmentsSection === 'classes' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Classes</h3><p className="card-subtitle">Group sessions and workshops.</p></div></div></div></div>}
              {bookingAppointmentsSection === 'staff' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Staff</h3><p className="card-subtitle">Team members who can be booked.</p></div></div><div className="location-settings-group"><div className="location-setting-item"><div className="v3-member-avatar"><img src={avatar1} alt="" /></div><div className="setting-content"><div className="setting-title">Nora Atrakchi</div><div className="setting-details">Owner</div></div><button className="setting-edit-button">Edit</button></div><div className="location-setting-item"><div className="v3-member-avatar"><img src={avatar2} alt="" /></div><div className="setting-content"><div className="setting-title">Darya Kishylau</div><div className="setting-details">Manager</div></div><button className="setting-edit-button">Edit</button></div><div className="location-setting-item"><div className="v3-member-avatar"><img src={avatar3} alt="" /></div><div className="setting-content"><div className="setting-title">David Leung</div><div className="setting-details">Staff</div></div><button className="setting-edit-button">Edit</button></div></div></div></div>}
              {bookingAppointmentsSection === 'availability' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Availability</h3><p className="card-subtitle">Hours and booking limits.</p></div></div></div></div>}
              {bookingAppointmentsSection === 'channels' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Channels</h3><p className="card-subtitle">Instagram, Google, and other appointment channels.</p></div></div></div></div>}
              {bookingAppointmentsSection === 'preferences' && <div className="v3-edit-section"><div className="card card-modal card--no-divider"><div className="card-header"><div className="card-header-info"><h3 className="card-title">Preferences</h3><p className="card-subtitle">Text us, timezone, and waitlist settings.</p></div></div></div></div>}
            </div>
            <div className="location-modal-sidebar location-modal-sidebar-right"></div>
          </div>
        </div>
      </div>
    )}

    {/* Neighborhoods Edit Modal - Brand & about, Rewards program, Online ordering */}
    {(neighborhoodsEditModalOpen || neighborhoodsEditModalClosing) && (
      <div className={`modal-overlay ${neighborhoodsEditModalClosing ? 'closing' : ''}`} onClick={handleCloseNeighborhoodsEditModal}>
        <div className="modal-container business-edit-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-header-inner">
              <button className="modal-close" onClick={handleCloseNeighborhoodsEditModal} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className="modal-title">{brand.name}</h2>
              <div className="modal-actions">
                <button type="button" className="modal-cancel" onClick={handleCloseNeighborhoodsEditModal}>Cancel</button>
                <button type="button" className="modal-send">Save</button>
              </div>
            </div>
          </div>
          <div className="location-modal-body">
            <nav className="location-modal-sidebar location-modal-sidebar-left v3-business-edit-sidebar">
              <button type="button" className={`v3-business-edit-nav-item v3-business-edit-nav-text-only ${neighborhoodsEditActiveSection === 'brand' ? 'active' : ''}`} onClick={() => setNeighborhoodsEditActiveSection('brand')}>
                <span>Brand & about</span>
              </button>
              <button type="button" className={`v3-business-edit-nav-item v3-business-edit-nav-text-only ${neighborhoodsEditActiveSection === 'rewards' ? 'active' : ''}`} onClick={() => setNeighborhoodsEditActiveSection('rewards')}>
                <span>Rewards program</span>
              </button>
              <button type="button" className={`v3-business-edit-nav-item v3-business-edit-nav-text-only ${neighborhoodsEditActiveSection === 'ordering' ? 'active' : ''}`} onClick={() => setNeighborhoodsEditActiveSection('ordering')}>
                <span>Online ordering</span>
              </button>
            </nav>
            <div className="modal-content fading-in v3-edit-content">
              {neighborhoodsEditActiveSection === 'brand' && (
                <div id="brand-section" className="v3-edit-section">
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Brand</h3>
                        <p className="card-subtitle">Customize how your business appears to customers</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container has-value">
                        <label className="form-label">Business name</label>
                        <input type="text" className="form-input-text" defaultValue={brand.name} />
                      </div>
                      <div className="form-input-container has-value">
                        <label className="form-label">Cash tag</label>
                        <input type="text" className="form-input-text" defaultValue={brand.handle} />
                      </div>
                    </div>
                  </div>

                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">About</h3>
                        <p className="card-subtitle">Tell customers about your business</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container has-value">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-input-text" defaultValue="Bakery" />
                      </div>
                      <div className="form-input-container has-value v3-textarea-field">
                        <label className="form-label">Description</label>
                        <textarea className="form-input-text v3-textarea" rows="4" defaultValue={brand.about || ""}></textarea>
                      </div>
                      <div className="form-input-container has-value">
                        <label className="form-label">Website</label>
                        <input type="text" className="form-input-text" defaultValue="https://joybakeshop.com" />
                      </div>
                    </div>
                  </div>

                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Logo & color</h3>
                        <p className="card-subtitle">Visual identity for your brand</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="v3-logo-field">
                        <label className="form-label">Add logo</label>
                        <div className="image-upload">
                          <div className="image-preview selected">
                            <img src={brandLogos[activeBrand]} alt={brand.name} />
                          </div>
                          <button className="image-upload-button">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#101010"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="v3-color-field">
                        <label className="form-label">Brand color</label>
                        <div className="v3-color-picker-row">
                          <div className="v3-color-swatch-large" style={{ background: brand.color }}></div>
                          <input type="text" className="form-input-text v3-color-input-field" defaultValue={brand.color} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {neighborhoodsEditActiveSection === 'rewards' && (
                <div id="rewards-section" className="v3-edit-section">
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Rewards program</h3>
                        <p className="card-subtitle">Encourage repeat visits with loyalty rewards</p>
                      </div>
                    </div>
                    <div className="location-settings-group">
                      <div className="location-setting-item">
                        <div className="setting-content">
                          <div className="setting-title">POS customer display</div>
                          <div className="setting-details">{customerViewMode === 'new-1' ? 'Not yet configured' : 'Customers earn 1 point per $1 spent'}</div>
                        </div>
                        <div className={`toggle-switch ${customerViewMode !== 'new-1' ? 'on' : ''}`}></div>
                      </div>
                      <div className="location-setting-item">
                        <div className="setting-content">
                          <div className="setting-title">Reward tiers</div>
                          <div className="setting-details">{customerViewMode === 'new-1' ? 'Set up reward levels for your customers' : '3 tiers configured'}</div>
                        </div>
                        <button className="setting-edit-button">Edit</button>
                      </div>
                      <div className="location-setting-item">
                        <div className="setting-content">
                          <div className="setting-title">Reward notifications</div>
                          <div className="setting-details">Notify customers when they earn rewards</div>
                        </div>
                        <div className={`toggle-switch ${customerViewMode !== 'new-1' ? 'on' : ''}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {neighborhoodsEditActiveSection === 'ordering' && (
                <div id="ordering-section" className="v3-edit-section">
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Online ordering</h3>
                        <p className="card-subtitle">Let customers order online for pickup or delivery</p>
                      </div>
                    </div>
                    <div className="location-settings-group">
                      <div className="location-setting-item">
                        <div className="setting-content">
                          <div className="setting-title">Pickup</div>
                          <div className="setting-details">{customerViewMode === 'new-1' ? 'Allow customers to pick up orders in store' : `${brand.locations?.length || 3} locations`}</div>
                        </div>
                        <div className={`toggle-switch ${customerViewMode !== 'new-1' ? 'on' : ''}`}></div>
                      </div>
                      <div className="location-setting-item">
                        <div className="setting-content">
                          <div className="setting-title">Delivery</div>
                          <div className="setting-details">{customerViewMode === 'new-1' ? 'Fulfill orders with delivery partners' : 'DoorDash, Uber Eats'}</div>
                        </div>
                        <div className={`toggle-switch ${customerViewMode !== 'new-1' ? 'on' : ''}`}></div>
                      </div>
                      <div className="location-setting-item">
                        <div className="setting-content">
                          <div className="setting-title">Prep time</div>
                          <div className="setting-details">{customerViewMode === 'new-1' ? 'Set how long orders take to prepare' : '15 minutes'}</div>
                        </div>
                        <button className="setting-edit-button">Edit</button>
                      </div>
                      <div className="location-setting-item">
                        <div className="setting-content">
                          <div className="setting-title">Order notifications</div>
                          <div className="setting-details">Get notified when new orders arrive</div>
                        </div>
                        <div className={`toggle-switch ${customerViewMode !== 'new-1' ? 'on' : ''}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="location-modal-sidebar location-modal-sidebar-right"></div>
          </div>
        </div>
      </div>
    )}

    {mainToast && (
      <div className="toast">
        <div className="toast-content">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.2584 9.1502L11.2584 16.1502C11.0684 16.3718 10.7915 16.4998 10.4996 16.4998C10.2078 16.4997 9.93077 16.3718 9.74083 16.1502L6.74083 12.6502L8.25841 11.3494L10.4996 13.9637L15.7408 7.84941L17.2584 9.1502Z" fill="#00B23B"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.92833 4.92852C8.8335 1.02335 15.1657 1.02349 19.0709 4.92852C22.9762 8.83376 22.9762 15.1659 19.0709 19.0711C15.1657 22.9763 8.83358 22.9763 4.92833 19.0711C1.02331 15.1658 1.02316 8.83369 4.92833 4.92852ZM17.6568 6.34258C14.5326 3.21861 9.46652 3.21846 6.3424 6.34258C3.21828 9.4667 3.21842 14.5328 6.3424 17.657C9.46659 20.7812 14.5327 20.7812 17.6568 17.657C20.781 14.5328 20.781 9.46677 17.6568 6.34258Z" fill="#00B23B"/>
          </svg>
          <span>{mainToast}</span>
        </div>
        <button className="toast-dismiss" onClick={() => setMainToast(null)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#FFFFFF"/>
          </svg>
        </button>
      </div>
    )}
  </>
  )
}

export default MainContent
