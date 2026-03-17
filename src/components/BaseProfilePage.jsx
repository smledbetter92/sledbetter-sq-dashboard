import { useState, useEffect, useRef } from 'react'
import './BaseProfilePage.css'
import './ProfileLocationsPage.css'
import './AnalyticsModal.css'
import './Banner.css'
import ProfileLocationsPage from './ProfileLocationsPage'
import FeatureSection from './FeatureSection'
import DefaultWebsite from './DefaultWebsite'
import MCCDropdown from './MCCDropdown'
import ConfirmDialog from './ConfirmDialog'
import brandguide from '../assets/brandguide2.png'
import profileguide from '../assets/profileguide.png'
import orderingguide from '../assets/orderingguide.png'
import map1 from '../assets/map-1.png'
import map2 from '../assets/map-2.png'
import map3 from '../assets/map-3.png'
import CheckIcon from '../assets/Check.svg'
import CheckSelectionIcon from '../assets/Check-selection.svg'
import LocationPinIcon from '../assets/Location pin.svg'
import GlobeIcon from '../assets/Globe.svg'
import MicrophoneIcon from '../assets/Microphone.svg'
import QRCodeIcon from '../assets/QR code.svg'
import AddIcon18 from '../assets/add icon 18.svg'
import ArrowRightIcon from '../assets/Product review 12/Right arrow.svg'
import ChevronRightIcon from '../assets/Chevron right.svg'
import ShopInStoreIcon from '../assets/24/shop-in-store.svg'
import BuildingsIcon from '../assets/Buildings.svg'
import AngledHomeIcon from '../assets/Angled home.svg'
import AboutIcon from '../assets/about.svg'
import SecurityIcon from '../assets/security.svg'
import ConnectionsIcon from '../assets/connections.svg'
import NeighborhoodsIcon from '../assets/neighborhoods.svg'
import CashAppIcon from '../assets/Cash App.svg'
import jbLogoLarge from '../assets/joy-bakeshop-logo.svg'
import bfbLogoLarge from '../assets/Product review 12/bfb-logo.svg'
import kjLogoLarge from '../assets/Product review 12/kj-logo.svg'
import sotLogoLarge from '../assets/Product review 12/spot-of-tea-logo.svg'
import vcLogoLarge from '../assets/Product review 12/vanilla-cafe-logo.svg'
import tmLogoLarge from '../assets/Product review 12/tea-monks-logo.svg'
import pscLogoLarge from '../assets/Product review 12/paper-son-coffee-logo.svg'
import brandCardShadow from '../assets/brandcard-shadow.svg'
import CaretDownIcon from '../assets/16/caret-down.svg'
// V3 Business Profile icons
import RecurringAutomaticIcon from '../assets/16/recurring-automatic.svg'
import StaffIcon from '../assets/staff.svg'
import LocationFillIcon from '../assets/24/location-fill.svg'
import LocationOutlineIcon from '../assets/24/location.svg'
// Connection logos
import CapitolaCoffeeLogo from '../assets/capitolacoffee-brand.png'
import GoogleLogo from '../assets/Google multicolor.svg'
import AppleLogo from '../assets/Apple.svg'
import OpenAILogo from '../assets/openai.svg'
import MetaLogo from '../assets/Meta.svg'
import SquareRegisterIcon from '../assets/Square register.svg'
import avatar1 from '../assets/avatar-1.png'
import avatar2 from '../assets/avatar-2.png'
import avatar3 from '../assets/avatar-3.png'
import avatar4 from '../assets/avatar-4.png'
import SettingsIcon from '../assets/settings.svg'
import LockIcon from '../assets/Lock on.svg'
import InfoIcon from '../assets/info.svg'

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
    color: '#0000FF', 
    handle: '$joybakeshop',
    about: "We're a small, butter-obsessed bakery making croissants, danishes, and morning buns the old-fashioned way: slow fermentation, real ingredients, and daily bakes. Saving by for flaky layers, seasonal fillings, and coffee that plays nice with pastry.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 },
      { id: 'ansley-park', name: 'Ansley Park', address: '149 Peachtree Cir NE, Atlanta, GA 30309', phone: '(404) 555-0456', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map2 },
      { id: 'virginia-highland', name: 'Virginia-Highland', address: '1034 N Highland Ave NE, Atlanta, GA 30306', phone: '(404) 555-0789', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map3 }
    ]
  },
  'brooklyn-french-bakers': { 
    name: 'Brooklyn French Bakers', 
    color: '#FF8C42', 
    handle: '$brooklynfrenchbakers',
    about: "This store delivers fresh pastries and bread every morning from our kitchen on Columbia Street, Waterfront. Brooklyn French Bakers is owned by French who are passionate about sharing French culture and products.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 }
    ]
  },
  'keva-juice': { 
    name: 'Keva Juice', 
    color: '#FF6B35', 
    handle: '$kevasmoothie',
    about: "Keva Juice is Reno, Nevada and Colorado Springs' oldest smoothie, açaí, and juice bar, proudly serving our community for more than 20 years. As a family-owned business, our passion for providing the best smoothies, açaí bowls, and fresh juices has helped us become the go-to local spot for healthy and delicious drinks.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 }
    ]
  },
  'spot-of-tea': { 
    name: 'Spot of Tea', 
    color: '#2A67B0', 
    handle: '$drinkspotoftea',
    about: "Spot of Tea is a neighborhood tea house, started right here in DC. Whenever you walk through our door, our mission is to make sure you leave feeling refreshed, every time!",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 }
    ]
  },
  'vanilla-cafe': { 
    name: 'Vanilla Cafe', 
    color: '#4D6242', 
    handle: '$vanillacafemia',
    about: "Vanilla – coffee & patisserie. Offering specialty coffee, non-alcoholic cocktails, all-day breakfast, lunch, and signature desserts. Discover the best of Slavic comfort food, croissants, and elegant sweets.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 }
    ]
  },
  'tea-monks': { 
    name: 'Tea Monks', 
    color: '#A66800', 
    handle: '$teamonks',
    about: "Tea Monks has been crafting delicious freshly brewed Boba Tea drinks made with premium all-natural high-quality ingredients like tea leaves, creamers and toppings etc imported from Taiwan.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 }
    ]
  },
  'paper-son-coffee': { 
    name: 'Paper Son Coffee', 
    color: '#2B6058', 
    handle: '$papersoncoffee',
    about: "Classic and Asian American inspired multi roaster coffee stand in the Dogpatch SF!",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 }
    ]
  }
}

// Business list for switching
const businesses = [
  { id: 'joy-bakeshop', name: 'Joy Bakeshop', handle: '$joybakeshop' },
  { id: 'keva-juice', name: 'Keva Juice', handle: '$kevasmoothie' },
  { id: 'spot-of-tea', name: 'Spot of Tea', handle: '$drinkspotoftea' },
  { id: 'paper-son-coffee', name: 'Paper Son Coffee', handle: '$papersoncoffee' }
]

const locationData = {
  'brookhaven': { name: 'Brookhaven', address1: '3100 Lanier Dr NE', city: 'Brookhaven', state: 'Georgia', zip: '30319', timezone: 'Eastern Time Zone', status: 'Active', phone: '(404) 555-0123', email: 'brookhaven@joybakeshop.com', lat: 33.8651, lng: -84.3393 },
  'ansley-park': { name: 'Ansley Park', address1: '149 Peachtree Cir NE', city: 'Atlanta', state: 'Georgia', zip: '30309', timezone: 'Eastern Time Zone', status: 'Active', phone: '(404) 555-0456', email: 'ansleypark@joybakeshop.com', lat: 33.7906, lng: -84.3831 },
  'virginia-highland': { name: 'Virginia Highland', address1: '1034 N Highland Ave NE', city: 'Atlanta', state: 'Georgia', zip: '30306', timezone: 'Eastern Time Zone', status: 'Inactive', phone: '', email: '', lat: 33.7874, lng: -84.3517 },
  'north-main': { name: 'North Main', address1: '220 N Main St', city: 'Greenville', state: 'South Carolina', zip: '29601', timezone: 'Eastern Time Zone', status: 'Active', phone: '(864) 555-0789', email: 'northmain@kevajuice.com', lat: 34.8568, lng: -82.3987 },
  'augusta': { name: 'Augusta', address1: '109 Cleveland St', city: 'Greenville', state: 'South Carolina', zip: '29601', timezone: 'Eastern Time Zone', status: 'Active', phone: '(864) 555-0321', email: 'augusta@kevajuice.com', lat: 34.8526, lng: -82.3940 },
  'alta-vista': { name: 'Alta Vista', address1: '1849 Piedmont Hwy', city: 'Piedmont', state: 'South Carolina', zip: '29673', timezone: 'Eastern Time Zone', status: 'Active', phone: '(864) 555-0654', email: 'altavista@kevajuice.com', lat: 34.7084, lng: -82.4610 },
}

function SecurityToggle({ onToggle }) {
  const [enabled, setEnabled] = useState(false)
  return (
    <button className={`security-toggle ${enabled ? 'enabled' : ''}`} onClick={(e) => { e.stopPropagation(); const next = !enabled; setEnabled(next); onToggle?.(next); }}>
      <span className="security-toggle-knob" />
    </button>
  )
}

function BaseProfilePage({ activeBrand, onBrandChange, brandState, onBrandStateChange, profileVersion, customerViewMode = 'returning', isPreviewVisible, onPreviewVisibilityChange, isV2WebsiteModalOpen, isV2WebsiteModalClosing, onV2WebsiteModalChange, onV2WebsiteModalClose, isSwitchBusinessModalOpen, isSwitchBusinessModalClosing, onSwitchBusinessModalOpen, onSwitchBusinessModalClose, onSelectBusiness, onNavigationStart, onSidebarLevelChange }) {
  const brand = brandData[activeBrand] || brandData['joy-bakeshop']
  const [migrationBannerDismissed, setMigrationBannerDismissed] = useState(false)
  const [nameChangeDismissed, setNameChangeDismissed] = useState(false)
  const [cashTagStatus, setCashTagStatus] = useState('idle') // 'idle' | 'checking' | 'available' | 'taken' | 'blocked'
  const [cashTagValue, setCashTagValue] = useState('')
  const cashTagTimerRef = useRef(null)
  
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef(null)
  
  // Change limit tracking (prototype state)
  const [cashTagRenamesUsed, setCashTagRenamesUsed] = useState(1) // 0, 1, or 2 used out of 2
  const [nameChangesUsed, setNameChangesUsed] = useState(0) // 0, 1, 2, or 3 used out of 3 per year
  const nameChangesNextReset = 'Dec 14, 2026'
  const [businessNameChanged, setBusinessNameChanged] = useState(false)
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState(null) // null | { type: 'cashTag' | 'businessName' }
  const [isConfirmClosing, setIsConfirmClosing] = useState(false)
  const [pendingDialogs, setPendingDialogs] = useState([])
  const [toast, setToast] = useState(null) // null | { message: string }
  
  const handleOpenConfirm = (type) => setConfirmDialog({ type })
  const handleCloseConfirm = (onComplete) => {
    setIsConfirmClosing(true)
    setTimeout(() => {
      setConfirmDialog(null)
      setIsConfirmClosing(false)
      if (onComplete) onComplete()
    }, 200)
  }
  
  const showToast = (message) => {
    setToast({ message })
    setTimeout(() => setToast(null), 3000)
  }
  
  const handleConfirm = () => {
    if (confirmDialog?.type === 'cashTag') {
      setCashTagRenamesUsed(prev => Math.min(prev + 1, 2))
      setCashTagStatus('idle')
      setCashTagValue('')
    } else if (confirmDialog?.type === 'businessName') {
      setNameChangesUsed(prev => Math.min(prev + 1, 3))
      setBusinessNameChanged(false)
    }
    
    // Check if there are more dialogs to show
    if (pendingDialogs.length > 0) {
      const [next, ...rest] = pendingDialogs
      setPendingDialogs(rest)
      handleCloseConfirm(() => handleOpenConfirm(next))
    } else {
      handleCloseConfirm(() => showToast('Business information updated.'))
    }
  }
  
  // Save handler: queue up dialogs based on what changed
  const handleSave = () => {
    const cashTagChanged = cashTagStatus === 'available' && cashTagRenamesUsed < 2
    const nameChanged = businessNameChanged && nameChangesUsed < 3
    
    if (cashTagChanged && nameChanged) {
      setPendingDialogs(['businessName'])
      handleOpenConfirm('cashTag')
    } else if (cashTagChanged) {
      setPendingDialogs([])
      handleOpenConfirm('cashTag')
    } else if (nameChanged) {
      setPendingDialogs([])
      handleOpenConfirm('businessName')
    } else {
      showToast('Business information updated.')
    }
  }
  
  // Use state passed from parent (persists per brand during session)
  const { brandConfigured = false, configuredLocations = [] } = brandState || {}
  
  // Update parent state when changes occur
  const setBrandConfigured = (value) => {
    onBrandStateChange({ ...brandState, brandConfigured: value })
  }
  
  const setConfiguredLocations = (value) => {
    onBrandStateChange({ ...brandState, configuredLocations: value })
  }
  
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
  const [isBrandModalClosing, setIsBrandModalClosing] = useState(false)
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false)
  const [isWebsiteModalClosing, setIsWebsiteModalClosing] = useState(false)
  
  // Multi-step flow state (Location modal)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [isNextLoading, setIsNextLoading] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [steps, setSteps] = useState([
    { id: 'select-location', label: 'Location', title: 'Add an existing location', optional: false },
    { id: 'confirm-details', label: 'Location', title: 'Confirm location details', optional: false },
    { id: 'online-ordering', label: 'Online ordering', title: 'Allow customers to place orders for pickup or delivery from your profile', optional: true },
    { id: 'voice-ordering', label: 'Voice ordering', title: 'Configure your voice ordering', optional: true },
    { id: 'recommended', label: '', title: 'You are now accepting online orders, customers can place orders directly from your profile.', optional: true, hideEyebrow: true, showLabelAfterTitle: false }
  ])
  
  // Multi-step flow state (Brand modal)
  const [brandCurrentStepIndex, setBrandCurrentStepIndex] = useState(0)
  const [brandCompletedSteps, setBrandCompletedSteps] = useState([])
  const [isBrandNextLoading, setIsBrandNextLoading] = useState(false)
  const [isBrandTransitioning, setIsBrandTransitioning] = useState(false)
  const [brandSteps, setBrandSteps] = useState([
    { id: 'brand-details', label: 'Brand information', title: 'Confirm your brand details', optional: false },
    { id: 'logo-color', label: 'Logo & color', title: 'Customize your brand card', optional: false },
    { id: 'checkout-policies', label: 'Cash App', title: 'Configure your checkout and store policies', optional: false },
    { id: 'brand-ready', label: 'Your brand is setup and will update across your customer experiences', title: 'Your brand is setup and will update across your customer experiences', optional: false, hideEyebrow: true }
  ])
  
  // Location selection state
  const [availableLocations, setAvailableLocations] = useState(
    (brand.locations || []).map((loc, index) => ({ ...loc, selected: index === 0 }))
  )
  
  const [nickname, setNickname] = useState('Brookhaven')
  const [addressLine1, setAddressLine1] = useState('3100 Lanier Dr NE')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('Atlanta')
  const [state, setState] = useState('GA')
  const [zipCode, setZipCode] = useState('30319')
  const [phoneNumber, setPhoneNumber] = useState('(404) 555-0123')
  const [locationHours, setLocationHours] = useState('Mon-Fri 8am-8pm, Sat-Sun 9am-6pm')
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [isEditingHours, setIsEditingHours] = useState(false)
  const [isSavingNickname, setIsSavingNickname] = useState(false)
  const [isSavingAddress, setIsSavingAddress] = useState(false)
  const [isSavingPhone, setIsSavingPhone] = useState(false)
  const [isSavingHours, setIsSavingHours] = useState(false)
  
  // Online ordering state
  const [menusEnabled, setMenusEnabled] = useState(true)
  const [pickupEnabled, setPickupEnabled] = useState(true)
  const [deliveryEnabled, setDeliveryEnabled] = useState(true)
  const [onDemandDeliveryEnabled, setOnDemandDeliveryEnabled] = useState(false)
  const [curbsidePickupEnabled, setCurbsidePickupEnabled] = useState(false)
  
  // Online ordering detailed settings (for expanded view)
  const [pickupPrepTime, setPickupPrepTime] = useState('15mins')
  const [deliveryPrepTime, setDeliveryPrepTime] = useState('15mins')
  const [tablePrepTime, setTablePrepTime] = useState('15mins')
  const [useLocationHours, setUseLocationHours] = useState(true)
  const [showPickupTimes, setShowPickupTimes] = useState(true)
  const [orderLimits, setOrderLimits] = useState(false)
  const [orderScheduling, setOrderScheduling] = useState(false)
  const [ticketPrintingOption, setTicketPrintingOption] = useState('pickup-delivery-time')
  const [chargeServiceFee, setChargeServiceFee] = useState(false)
  const [minimumOrderAmount, setMinimumOrderAmount] = useState(false)
  
  const handlePickupPrepTimeChange = (value) => {
    setPickupPrepTime(value)
    console.log('Prep time changed to:', value)
  }
  
  const handleDeliveryPrepTimeChange = (value) => {
    setDeliveryPrepTime(value)
    console.log('Prep time changed to:', value)
  }
  
  const handleTablePrepTimeChange = (value) => {
    setTablePrepTime(value)
    console.log('Prep time changed to:', value)
  }
  
  const handleToggleChange = (setter, currentValue, label) => {
    setter(!currentValue)
    console.log(`${label} changed to:`, !currentValue)
  }
  
  // Brand customization state
  const [brandName, setBrandName] = useState(brand.name)
  const [brandUrl, setBrandUrl] = useState(`cash.app/${brand.handle}`)
  const [brandCashtag, setBrandCashtag] = useState(brand.handle)
  const [brandAbout, setBrandAbout] = useState(brand.about || 'A neighborhood bakery serving fresh pastries and artisan breads daily.')
  const [brandLogo, setBrandLogo] = useState('')
  const [brandColor, setBrandColor] = useState(brand.color)
  const [isCopying, setIsCopying] = useState(false)
  
  // Location settings view state
  const [isViewingLocationSettings, setIsViewingLocationSettings] = useState(false)
  const [isTransitioningToSettings, setIsTransitioningToSettings] = useState(false)
  const [activeSection, setActiveSection] = useState('location-section')
  
  // Feature states: tracks which view state each feature is in
  // 'configure' = State 1 (summarized grey cards during setup)
  // 'completed' = State 2 (collapsed summary after clicking Next)
  // 'expanded' = State 3 (full detailed settings)
  const [featureViewStates, setFeatureViewStates] = useState({
    'location': 'configure',  // starts in configure during step flow
    'online-ordering': 'configure',
    'voice-ordering': 'configure'
  })
  
  // Track if we're in "setup mode" (going through steps) vs "edit mode" (after completing setup)
  const [isInSetupMode, setIsInSetupMode] = useState(true)
  
  // Brand feature states
  const [brandFeatureViewStates, setBrandFeatureViewStates] = useState({
    'brand-details': 'configure',
    'logo-color': 'configure',
    'checkout-policies': 'configure'
  })
  const [isViewingBrandSettings, setIsViewingBrandSettings] = useState(false)
  const [isTransitioningToBrandSettings, setIsTransitioningToBrandSettings] = useState(false)
  const [isInBrandSetupMode, setIsInBrandSetupMode] = useState(true)
  const [activeBrandSection, setActiveBrandSection] = useState('brand-details-section')
  
  // Welcome banner dismiss state
  const [isWelcomeDismissing, setIsWelcomeDismissing] = useState(false)
  const [isWelcomeHidden, setIsWelcomeHidden] = useState(false)
  
  const handleWelcomeDismiss = () => {
    setIsWelcomeDismissing(true)
    setTimeout(() => {
      setIsWelcomeHidden(true)
    }, 900)
  }
  
  // Generate services array from completed steps
  const generateServicesFromSteps = () => {
    const services = []
    completedSteps.forEach((step) => {
      if (step.id === 'online-ordering') {
        services.push({ type: 'online-ordering', icon: GlobeIcon, title: 'Online ordering', subtitle: 'Pickup · Delivery · 15 min prep time', detail: 'Menus · Lunch, Dinner' })
      } else if (step.id === 'voice-ordering') {
        services.push({ type: 'voice-ordering', icon: MicrophoneIcon, title: 'Voice ordering', subtitle: phoneNumber, detail: 'Pending carrier verification', warning: true })
      }
    })
    services.push({ type: 'add-more', icon: AddIcon18, title: 'Add more', subtitle: 'Curbside pickup, catering, voice ordering', detail: '' })
    return services
  }
  
  const handleOpenLocationModal = () => {
    // Filter out already-configured locations from available options
    const configuredIds = configuredLocations.map(loc => loc.id || loc.name.toLowerCase().replace(/\s+/g, '-'))
    const filtered = (brand.locations || []).filter(loc => {
      const locId = loc.id || loc.name.toLowerCase().replace(/\s+/g, '-')
      return !configuredIds.includes(locId)
    })
    setAvailableLocations(filtered.map((loc, index) => ({ ...loc, selected: index === 0 })))
    setIsLocationModalOpen(true)
  }
  
  const handleCloseLocationModal = () => {
    setIsModalClosing(true)
    setTimeout(() => {
      setIsLocationModalOpen(false)
      setIsModalClosing(false)
      
      // Only add location to configured list if completing setup flow (not editing existing)
      if (isViewingLocationSettings && isInSetupMode) {
        const newLocation = {
          id: nickname.toLowerCase().replace(/\s+/g, '-'),
          name: nickname,
          address: `${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}, ${city}, ${state} ${zipCode}`,
          phone: phoneNumber,
          hours: locationHours,
          map: map1, // Use map based on location or default
          services: generateServicesFromSteps()
        }
        setConfiguredLocations([...configuredLocations, newLocation])
      }
      
      // Reset location settings view state
      setIsViewingLocationSettings(false)
      setIsInSetupMode(true) // Reset back to setup mode for next time
      setActiveSection('location-section')
      
      // Reset flow state
      setCurrentStepIndex(0)
      setCompletedSteps([])
      setIsNextLoading(false)
      setIsTransitioning(false)
      
      // Reset all edit states
      setIsEditingNickname(false)
      setIsEditingAddress(false)
      setIsEditingPhone(false)
      setIsEditingHours(false)
      
      // Reset all field values
      setNickname('Brookhaven')
      setAddressLine1('1234 Peachtree St NE')
      setAddressLine2('')
      setCity('Atlanta')
      setState('Georgia')
      setZipCode('30309')
      setPhoneNumber('(404) 555-0123')
      setLocationHours('Mon-Fri 8am-8pm, Sat-Sun 9am-6pm')
    }, 350)
  }
  
  const generateLocationSummary = () => {
    // Generate natural language summary: "Brookhaven address confirmed with Google, open Mon–Fri 8am–8pm, Sat-Sun 9am-6pm, with customer-facing phone number."
    const summary = `${nickname} address confirmed with Google, open ${locationHours}, with customer-facing phone number.`
    return summary
  }
  
  const handleCopyUrl = async () => {
    setIsCopying(true)
    try {
      await navigator.clipboard.writeText(brandUrl)
      setTimeout(() => {
        setIsCopying('success')
        setTimeout(() => {
          setIsCopying(false)
        }, 1500)
      }, 400) // Short delay for spinner visibility
    } catch (err) {
      console.error('Failed to copy:', err)
      setIsCopying(false)
    }
  }
  
  const handleNextStep = () => {
    const currentStep = steps[currentStepIndex]
    
    // Special handling for step 0 → step 1 (select location → confirm details)
    // This should be an in-card transition, not a new card
    if (currentStepIndex === 0) {
      setIsNextLoading(true)
      
      // Populate location data from selected location
      const selectedLocation = availableLocations.find(loc => loc.selected)
      if (selectedLocation) {
        // Parse address: "3100 Lanier Dr NE, Atlanta, GA 30319"
        const addressParts = selectedLocation.address.split(', ')
        if (addressParts.length === 3) {
          const street = addressParts[0]
          const cityName = addressParts[1]
          const stateZip = addressParts[2].split(' ')
          const stateName = stateZip[0]
          const zip = stateZip[1]
          
          setNickname(selectedLocation.name)
          setAddressLine1(street)
          setCity(cityName)
          setState(stateName)
          setZipCode(zip)
          setPhoneNumber(selectedLocation.phone || '(404) 555-0123')
          setLocationHours(selectedLocation.hours || 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm')
        }
      }
      
      setTimeout(() => {
        setIsNextLoading(false)
        setCurrentStepIndex(1)
        // Don't add step 0 to completed - it's part of the same card experience
      }, 800)
      return
    }
    
    // Special handling for step 1 (confirm details) → step 2 (online ordering)
    // Transform, collapse, and reveal all happen together as one fluid animation
    if (currentStepIndex === 1) {
      setIsNextLoading(true)
      
      // Generate location summary for the completed step
      const summary = generateLocationSummary()
      const customLabel = `${nickname} location confirmed`
      
      // Transition location feature from 'configure' to 'completed'
      setFeatureViewStates(prev => ({ ...prev, 'location': 'completed' }))
      
      setTimeout(() => {
        setIsNextLoading(false)
        setIsTransitioning(true)
        // Immediately trigger collapse and new card reveal - animations handle the smoothness
        setTimeout(() => {
          setCompletedSteps([...completedSteps, { ...currentStep, summary, label: customLabel }])
          setCurrentStepIndex(currentStepIndex + 1)
          setIsTransitioning(false)
        }, 100)
      }, 800)
      return
    }
    
    // For all other steps: show loader, add to completed, move to next
    setIsNextLoading(true)
    
    setTimeout(() => {
      // Generate summary and custom label for specific steps
      let stepToAdd = currentStep
      let featureId = null
      
      if (currentStepIndex === 2) {
        // Online ordering step
        const orderingSummary = "Pickup and delivery enabled, 15-minute prep, limited to hours, tickets print by ready time, no caps or scheduling."
        const customLabel = "Online ordering enabled for pickup and delivery"
        stepToAdd = { ...currentStep, summary: orderingSummary, label: customLabel }
        featureId = 'online-ordering'
      } else if (currentStepIndex === 3) {
        // Voice ordering step
        const customLabel = "Voice ordering phone number requested"
        stepToAdd = { ...currentStep, label: customLabel }
        featureId = 'voice-ordering'
      }
      
      // Transition feature from 'configure' to 'completed'
      if (featureId) {
        setFeatureViewStates(prev => ({ ...prev, [featureId]: 'completed' }))
      }
      
      // Add current step to completed
      setCompletedSteps([...completedSteps, stepToAdd])
      
      // Move to next step
      if (currentStepIndex < steps.length - 1) {
        // Not the last step - remove spinner and move to next
        setIsNextLoading(false)
        setCurrentStepIndex(currentStepIndex + 1)
      } else {
        // Last step - expand all completed features to show full settings
        setIsNextLoading(false)
        
        // Transition all completed features to 'expanded' state
        const newFeatureStates = { ...featureViewStates }
        completedSteps.forEach(step => {
          if (step.id === 'confirm-details') newFeatureStates['location'] = 'expanded'
          if (step.id === 'online-ordering') newFeatureStates['online-ordering'] = 'expanded'
          if (step.id === 'voice-ordering') newFeatureStates['voice-ordering'] = 'expanded'
        })
        
        // Trigger expansion animation
        setFeatureViewStates(newFeatureStates)
        setIsViewingLocationSettings(true)
        // Keep isInSetupMode = true so location gets added when modal closes
        return
      }
    }, 800)
  }
  
  const handleSkipStep = () => {
    // Just move to next without adding to completed
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      // Last step - close modal (for now)
      handleCloseLocationModal()
    }
  }
  
  const handleChangeLocation = () => {
    // Go back to step 0 (select location)
    setCurrentStepIndex(0)
  }
  
  const handleEditStep = (stepId) => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    if (stepIndex !== -1) {
      // Determine which feature this step corresponds to
      let featureId = null
      if (stepId === 'confirm-details') featureId = 'location'
      if (stepId === 'online-ordering') featureId = 'online-ordering'
      if (stepId === 'voice-ordering') featureId = 'voice-ordering'
      
      // If we're in the step flow (not yet viewing location settings)
      if (!isViewingLocationSettings) {
        // Just transition back to 'configure' state to re-open the grey cards
        if (featureId) {
          setFeatureViewStates(prev => ({ ...prev, [featureId]: 'configure' }))
        }
        // Remove from completed steps so it goes back to active step
        setCompletedSteps(completedSteps.filter(step => step.id !== stepId))
        // Go back to that step
        setCurrentStepIndex(stepIndex)
      } else {
        // Already in expanded view, just navigate to the section
        if (featureId === 'location') setActiveSection('location-section')
        if (featureId === 'online-ordering') setActiveSection('online-ordering-section')
        if (featureId === 'voice-ordering') setActiveSection('voice-ordering-section')
      }
    }
  }
  
  // Brand Modal Handlers
  const handleOpenBrandModal = () => {
    // If brand is already configured, open directly to settings view
    if (brandConfigured) {
      setBrandCompletedSteps([
        { id: 'brand-details', label: `cash.app/${brand.handle} is live and ready`, title: 'Confirm your brand details' },
        { id: 'logo-color', label: 'Brand is looking solid!', title: 'Customize your brand card' },
        { id: 'checkout-policies', label: 'Checkout, tips, taxes, policies, and charges are confirmed', title: 'Configure your checkout and store policies' }
      ])
      setIsViewingBrandSettings(true)
      setIsInBrandSetupMode(false)
      setActiveBrandSection('brand-details-section')
    }
    setIsBrandModalOpen(true)
  }
  
  const handleCloseBrandModal = () => {
    setIsBrandModalClosing(true)
    setTimeout(() => {
      setIsBrandModalOpen(false)
      setIsBrandModalClosing(false)
      
      // Reset flow state
      setBrandCurrentStepIndex(0)
      setBrandCompletedSteps([])
      setIsBrandNextLoading(false)
      setIsBrandTransitioning(false)
      setIsViewingBrandSettings(false)
      setIsTransitioningToBrandSettings(false)
      setIsInBrandSetupMode(true)
      setBrandFeatureViewStates({
        'brand-details': 'configure',
        'logo-color': 'configure',
        'checkout-policies': 'configure'
      })
    }, 350)
  }
  
  // Website modal handlers
  const handleOpenWebsiteModal = () => {
    setIsWebsiteModalOpen(true)
  }
  
  const handleCloseWebsiteModal = () => {
    setIsWebsiteModalClosing(true)
    setTimeout(() => {
      setIsWebsiteModalOpen(false)
      setIsWebsiteModalClosing(false)
    }, 350)
  }
  
  const handleBrandNextStep = () => {
    const currentStep = brandSteps[brandCurrentStepIndex]
    
    // For the first step, just move to next step with transition
    if (brandCurrentStepIndex === 0) {
      setIsBrandNextLoading(true)
      
      const customLabel = `cash.app/${brand.handle} is live and ready`
      
      // Transition feature from 'configure' to 'completed'
      setBrandFeatureViewStates(prev => ({ ...prev, 'brand-details': 'completed' }))
      
      setTimeout(() => {
        setIsBrandNextLoading(false)
        setIsBrandTransitioning(true)
        setTimeout(() => {
          setBrandCompletedSteps([...brandCompletedSteps, { ...currentStep, label: customLabel }])
          setBrandCurrentStepIndex(brandCurrentStepIndex + 1)
          setIsBrandTransitioning(false)
        }, 100)
      }, 800)
      return
    }
    
    // For all other steps
    setIsBrandNextLoading(true)
    
    setTimeout(() => {
      // Skip step 3 (brand preview) - it doesn't get added to completed steps
      if (brandCurrentStepIndex === 3) {
        // Final step - mark brand as configured and close modal
        setBrandConfigured(true)
        setIsBrandNextLoading(false)
        handleCloseBrandModal()
        return
      }
      
      setIsBrandNextLoading(false)
      
      let stepToAdd = currentStep
      let featureId = null
      
      if (brandCurrentStepIndex === 1) {
        // Logo & color step
        const customLabel = "Brand is looking solid!"
        stepToAdd = { ...currentStep, label: customLabel }
        featureId = 'logo-color'
      } else if (brandCurrentStepIndex === 2) {
        // Checkout & policies step
        const customLabel = "Checkout, tips, taxes, policies, and charges are confirmed"
        stepToAdd = { ...currentStep, label: customLabel }
        featureId = 'checkout-policies'
      }
      
      // Transition feature from 'configure' to 'completed'
      if (featureId) {
        setBrandFeatureViewStates(prev => ({ ...prev, [featureId]: 'completed' }))
      }
      
      setBrandCompletedSteps([...brandCompletedSteps, stepToAdd])
      
      // Move to next step
      setBrandCurrentStepIndex(brandCurrentStepIndex + 1)
    }, 800)
  }
  
  const handleBrandSkipStep = () => {
    if (brandCurrentStepIndex < brandSteps.length - 1) {
      setBrandCurrentStepIndex(brandCurrentStepIndex + 1)
    } else {
      // Last step - mark brand as configured
      setBrandConfigured(true)
      handleCloseBrandModal()
    }
  }
  
  const handleBrandEditStep = (stepId) => {
    const stepIndex = brandSteps.findIndex(s => s.id === stepId)
    if (stepIndex !== -1) {
      // Determine which feature this step corresponds to
      let featureId = null
      if (stepId === 'brand-details') featureId = 'brand-details'
      if (stepId === 'logo-color') featureId = 'logo-color'
      if (stepId === 'checkout-policies') featureId = 'checkout-policies'
      
      // If we're in the step flow (not yet viewing brand settings)
      if (!isViewingBrandSettings) {
        // Transition this feature to 'expanded' state
        if (featureId) {
          setBrandFeatureViewStates(prev => ({ ...prev, [featureId]: 'expanded' }))
        }
        // Show the expanded view
        setIsViewingBrandSettings(true)
      }
      // If already in expanded view, navigation handled by sections
    }
  }
  
  const handleToggleLocation = (locationId) => {
    setAvailableLocations(availableLocations.map(loc =>
      loc.id === locationId ? { ...loc, selected: !loc.selected } : loc
    ))
  }
  
  const handleSelectAll = () => {
    const allSelected = availableLocations.every(loc => loc.selected)
    setAvailableLocations(availableLocations.map(loc => ({ ...loc, selected: !allSelected })))
  }
  
  const handleEditNickname = () => {
    setIsEditingNickname(true)
  }
  
  const handleCancelNicknameEdit = () => {
    setIsEditingNickname(false)
    setNickname('Brookhaven')
  }
  
  const handleSaveNickname = () => {
    setIsSavingNickname(true)
    setTimeout(() => {
      setIsSavingNickname('success')
      setTimeout(() => {
        setIsEditingNickname(false)
        setIsSavingNickname(false)
        
        // Only collapse if in configure state (not expanded settings)
        if (isInSetupMode && featureViewStates['location'] === 'configure') {
          setIsViewingLocationSettings(false)
          setFeatureViewStates(prev => ({ ...prev, 'location': 'configure' }))
        }
        // Otherwise, stay in expanded view (State 3)
      }, 1000)
    }, 500)
  }
  
  const handleEditAddress = () => {
    setIsEditingAddress(true)
  }
  
  const handleCancelAddressEdit = () => {
    setIsEditingAddress(false)
    setAddressLine1('1234 Peachtree St NE')
    setAddressLine2('')
    setCity('Atlanta')
    setState('Georgia')
    setZipCode('30309')
  }
  
  const handleSaveAddress = () => {
    setIsSavingAddress(true)
    setTimeout(() => {
      setIsSavingAddress('success')
      setTimeout(() => {
        setIsEditingAddress(false)
        setIsSavingAddress(false)
        
        // Only collapse if in configure state (not expanded settings)
        if (isInSetupMode && featureViewStates['location'] === 'configure') {
          setIsViewingLocationSettings(false)
          setFeatureViewStates(prev => ({ ...prev, 'location': 'configure' }))
        }
      }, 1000)
    }, 500)
  }
  
  const handleEditPhone = () => {
    setIsEditingPhone(true)
  }
  
  const handleCancelPhoneEdit = () => {
    setIsEditingPhone(false)
    setPhoneNumber('(404) 555-0123')
  }
  
  const handleSavePhone = () => {
    setIsSavingPhone(true)
    setTimeout(() => {
      setIsSavingPhone('success')
      setTimeout(() => {
        setIsEditingPhone(false)
        setIsSavingPhone(false)
        
        // Only collapse if in configure state (not expanded settings)
        if (isInSetupMode && featureViewStates['location'] === 'configure') {
          setIsViewingLocationSettings(false)
          setFeatureViewStates(prev => ({ ...prev, 'location': 'configure' }))
        }
      }, 1000)
    }, 500)
  }
  
  const handleEditHours = () => {
    setIsEditingHours(true)
  }
  
  const handleCancelHoursEdit = () => {
    setIsEditingHours(false)
    setLocationHours('Mon-Fri 8am-8pm, Sat-Sun 9am-6pm')
  }
  
  const handleSaveHours = () => {
    setIsSavingHours(true)
    setTimeout(() => {
      setIsSavingHours('success')
      setTimeout(() => {
        setIsEditingHours(false)
        setIsSavingHours(false)
        
        // Only collapse if in configure state (not expanded settings)
        if (isInSetupMode && featureViewStates['location'] === 'configure') {
          setIsViewingLocationSettings(false)
          setFeatureViewStates(prev => ({ ...prev, 'location': 'configure' }))
        }
      }, 1000)
    }, 500)
  }
  
  // Scroll to active section when location modal opens in settings view
  useEffect(() => {
    if (isLocationModalOpen && isViewingLocationSettings && activeSection) {
      // Wait for modal to render, then scroll to section
      setTimeout(() => {
        const modalBody = document.querySelector('.location-modal-body')
        const targetSection = document.getElementById(activeSection)
        if (modalBody && targetSection) {
          // Get the position of the target relative to the modal body
          const modalBodyRect = modalBody.getBoundingClientRect()
          const targetRect = targetSection.getBoundingClientRect()
          const relativeTop = targetRect.top - modalBodyRect.top + modalBody.scrollTop
          
          // Scroll with a small offset (24px) to give some breathing room at the top
          modalBody.scrollTo({ top: relativeTop - 24, behavior: 'smooth' })
        }
      }, 100) // Small delay to ensure modal has rendered
    }
  }, [isLocationModalOpen, isViewingLocationSettings, activeSection])
  
  // Scroll to active brand section when brand modal opens in settings view
  useEffect(() => {
    if (isBrandModalOpen && isViewingBrandSettings && activeBrandSection) {
      // Wait for modal to render, then scroll to section
      setTimeout(() => {
        const modalBody = document.querySelector('.location-modal-body')
        const targetSection = document.getElementById(activeBrandSection)
        if (modalBody && targetSection) {
          // Get the position of the target relative to the modal body
          const modalBodyRect = modalBody.getBoundingClientRect()
          const targetRect = targetSection.getBoundingClientRect()
          const relativeTop = targetRect.top - modalBodyRect.top + modalBody.scrollTop
          
          // Scroll with a small offset (24px) to give some breathing room at the top
          modalBody.scrollTo({ top: relativeTop - 24, behavior: 'smooth' })
        }
      }, 100) // Small delay to ensure modal has rendered
    }
  }, [isBrandModalOpen, isViewingBrandSettings, activeBrandSection])
  
  useEffect(() => {
    const handler = (e) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(e.target)) setIsLanguageDropdownOpen(false)
      if (locationTypeRef.current && !locationTypeRef.current.contains(e.target)) setIsLocationTypeOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Handle escape key to close modal
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
  
  // Handle escape key to close website modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isWebsiteModalOpen) {
        handleCloseWebsiteModal()
      }
    }

    if (isWebsiteModalOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isWebsiteModalOpen])
  
  // Generate monogram from brand name (first letter of first two words)
  const getMonogram = (name) => {
    const words = name.split(' ')
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }
  
  const monogram = getMonogram(brand.name)
  
  // State for V2 edit modal
  const [isBusinessEditModalOpen, setIsBusinessEditModalOpen] = useState(false)
  const [isBusinessEditModalClosing, setIsBusinessEditModalClosing] = useState(false)
  const [businessEditActiveSection, setBusinessEditActiveSection] = useState('brand')
  
  // Location detail modal state
  const [locationDetailModal, setLocationDetailModal] = useState(null)
  const [isLocationDetailClosing, setIsLocationDetailClosing] = useState(false)
  const [isLocationNameDialogOpen, setIsLocationNameDialogOpen] = useState(false)
  const [isLocationNameDialogClosing, setIsLocationNameDialogClosing] = useState(false)
  const [isLocationGroupDialogOpen, setIsLocationGroupDialogOpen] = useState(false)
  const [isLocationGroupDialogClosing, setIsLocationGroupDialogClosing] = useState(false)
  const [locationGroupName, setLocationGroupName] = useState('')
  const [locationGroupDesc, setLocationGroupDesc] = useState('')
  const [locationGroups, setLocationGroups] = useState([])
  const [locationGroupMenuOpen, setLocationGroupMenuOpen] = useState(null)

  useEffect(() => {
    if (locationGroupMenuOpen === null) return
    const handler = (e) => {
      if (!e.target.closest('.location-groups-menu-wrap')) setLocationGroupMenuOpen(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [locationGroupMenuOpen])

  const handleCloseLocationGroupDialog = () => {
    setIsLocationGroupDialogClosing(true)
    setTimeout(() => {
      setIsLocationGroupDialogOpen(false)
      setIsLocationGroupDialogClosing(false)
      setLocationGroupName('')
      setLocationGroupDesc('')
    }, 350)
  }
  const [selectedLocationType, setSelectedLocationType] = useState('Physical location')
  const [isLocationTypeOpen, setIsLocationTypeOpen] = useState(false)
  const locationTypeRef = useRef(null)

  const handleCloseLocationNameDialog = () => {
    setIsLocationNameDialogClosing(true)
    setTimeout(() => {
      setIsLocationNameDialogOpen(false)
      setIsLocationNameDialogClosing(false)
    }, 350)
  }

  const handleCloseLocationDetail = () => {
    setIsLocationDetailClosing(true)
    setTimeout(() => {
      setLocationDetailModal(null)
      setIsLocationDetailClosing(false)
    }, 350)
  }

  const currentLocation = locationDetailModal ? locationData[locationDetailModal] : null

  // Security modal state
  const [securityModal, setSecurityModal] = useState(null) // 'representatives' | 'permissions' | null
  const [isSecurityModalClosing, setIsSecurityModalClosing] = useState(false)
  const [authorizedReps, setAuthorizedReps] = useState([])
  const [repSearchQuery, setRepSearchQuery] = useState('')

  const allTeamMembers = [
    { first: 'Sarah', last: 'Mitchell', role: 'Manager' },
    { first: 'James', last: 'Cooper', role: 'Shift Lead' },
    { first: 'Maria', last: 'Santos', role: 'Cashier' },
    { first: 'David', last: 'Kim', role: 'Baker' },
    { first: 'Aisha', last: 'Johnson', role: 'Cashier' },
    { first: 'Marcus', last: 'Williams', role: 'Barista' },
    { first: 'Emily', last: 'Chen', role: 'Cashier' },
    { first: 'Robert', last: 'Taylor', role: 'Baker' },
    { first: 'Jessica', last: 'Brown', role: 'Shift Lead' },
    { first: 'Daniel', last: 'Garcia', role: 'Barista' },
    { first: 'Ashley', last: 'Martinez', role: 'Cashier' },
    { first: 'Christopher', last: 'Lee', role: 'Baker' },
    { first: 'Amanda', last: 'Wilson', role: 'Manager' },
    { first: 'Matthew', last: 'Anderson', role: 'Barista' },
    { first: 'Brittany', last: 'Thomas', role: 'Cashier' },
    { first: 'Andrew', last: 'Jackson', role: 'Shift Lead' },
    { first: 'Megan', last: 'White', role: 'Baker' },
    { first: 'Joshua', last: 'Harris', role: 'Cashier' },
    { first: 'Lauren', last: 'Clark', role: 'Barista' },
    { first: 'Ryan', last: 'Lewis', role: 'Baker' },
    { first: 'Samantha', last: 'Robinson', role: 'Cashier' },
    { first: 'Kevin', last: 'Walker', role: 'Shift Lead' },
    { first: 'Nicole', last: 'Young', role: 'Barista' },
    { first: 'Brandon', last: 'Allen', role: 'Cashier' },
    { first: 'Rachel', last: 'King', role: 'Baker' },
    { first: 'Tyler', last: 'Wright', role: 'Barista' },
    { first: 'Stephanie', last: 'Lopez', role: 'Cashier' },
    { first: 'Aaron', last: 'Hill', role: 'Shift Lead' },
    { first: 'Kayla', last: 'Scott', role: 'Baker' },
    { first: 'Justin', last: 'Green', role: 'Cashier' },
    { first: 'Hannah', last: 'Adams', role: 'Barista' },
    { first: 'Nathan', last: 'Baker', role: 'Manager' },
    { first: 'Olivia', last: 'Nelson', role: 'Cashier' },
    { first: 'Ethan', last: 'Carter', role: 'Baker' },
    { first: 'Victoria', last: 'Mitchell', role: 'Shift Lead' },
    { first: 'Dylan', last: 'Perez', role: 'Barista' },
    { first: 'Amber', last: 'Roberts', role: 'Cashier' },
    { first: 'Caleb', last: 'Turner', role: 'Baker' },
    { first: 'Jasmine', last: 'Phillips', role: 'Cashier' },
    { first: 'Luke', last: 'Campbell', role: 'Shift Lead' },
    { first: 'Alexis', last: 'Parker', role: 'Barista' },
    { first: 'Isaac', last: 'Evans', role: 'Baker' },
    { first: 'Taylor', last: 'Edwards', role: 'Cashier' },
    { first: 'Connor', last: 'Collins', role: 'Barista' },
    { first: 'Madison', last: 'Stewart', role: 'Shift Lead' },
    { first: 'Adrian', last: 'Sanchez', role: 'Baker' },
    { first: 'Brianna', last: 'Morris', role: 'Cashier' },
    { first: 'Gavin', last: 'Rogers', role: 'Barista' },
    { first: 'Destiny', last: 'Reed', role: 'Cashier' },
    { first: 'Owen', last: 'Cook', role: 'Baker' },
    { first: 'Paige', last: 'Morgan', role: 'Shift Lead' },
    { first: 'Ian', last: 'Bell', role: 'Barista' },
    { first: 'Brooke', last: 'Murphy', role: 'Cashier' },
    { first: 'Chase', last: 'Bailey', role: 'Baker' },
    { first: 'Vanessa', last: 'Rivera', role: 'Cashier' },
    { first: 'Cole', last: 'Cooper', role: 'Shift Lead' },
    { first: 'Sierra', last: 'Richardson', role: 'Barista' },
    { first: 'Blake', last: 'Cox', role: 'Baker' },
    { first: 'Natalie', last: 'Howard', role: 'Cashier' },
    { first: 'Trevor', last: 'Ward', role: 'Barista' },
    { first: 'Hailey', last: 'Torres', role: 'Shift Lead' },
    { first: 'Dominic', last: 'Peterson', role: 'Baker' },
    { first: 'Courtney', last: 'Gray', role: 'Cashier' },
    { first: 'Jared', last: 'Ramirez', role: 'Barista' },
    { first: 'Leah', last: 'James', role: 'Cashier' },
    { first: 'Derek', last: 'Watson', role: 'Baker' },
    { first: 'Gabrielle', last: 'Brooks', role: 'Shift Lead' },
    { first: 'Troy', last: 'Kelly', role: 'Barista' },
    { first: 'Kaitlyn', last: 'Sanders', role: 'Cashier' },
    { first: 'Wesley', last: 'Price', role: 'Baker' },
    { first: 'Allison', last: 'Bennett', role: 'Cashier' },
    { first: 'Grant', last: 'Wood', role: 'Shift Lead' },
    { first: 'Molly', last: 'Barnes', role: 'Barista' },
    { first: 'Liam', last: 'Ross', role: 'Baker' },
    { first: 'Chloe', last: 'Henderson', role: 'Cashier' },
    { first: 'Mason', last: 'Coleman', role: 'Barista' },
    { first: 'Sophia', last: 'Jenkins', role: 'Shift Lead' },
    { first: 'Logan', last: 'Perry', role: 'Baker' },
    { first: 'Ella', last: 'Powell', role: 'Cashier' },
    { first: 'Carter', last: 'Long', role: 'Barista' },
    { first: 'Lily', last: 'Patterson', role: 'Cashier' },
    { first: 'Wyatt', last: 'Hughes', role: 'Baker' },
    { first: 'Zoe', last: 'Flores', role: 'Shift Lead' },
    { first: 'Jack', last: 'Washington', role: 'Barista' },
    { first: 'Grace', last: 'Butler', role: 'Cashier' },
    { first: 'Henry', last: 'Simmons', role: 'Baker' },
    { first: 'Avery', last: 'Foster', role: 'Cashier' },
    { first: 'Sebastian', last: 'Gonzalez', role: 'Shift Lead' },
    { first: 'Scarlett', last: 'Bryant', role: 'Barista' },
    { first: 'Leo', last: 'Alexander', role: 'Baker' },
    { first: 'Aria', last: 'Russell', role: 'Cashier' },
    { first: 'Miles', last: 'Griffin', role: 'Barista' },
    { first: 'Nora', last: 'Diaz', role: 'Shift Lead' },
    { first: 'Elijah', last: 'Hayes', role: 'Baker' },
    { first: 'Luna', last: 'Myers', role: 'Cashier' },
    { first: 'Max', last: 'Ford', role: 'Barista' },
    { first: 'Isla', last: 'Hamilton', role: 'Cashier' },
    { first: 'Felix', last: 'Graham', role: 'Baker' },
    { first: 'Ivy', last: 'Sullivan', role: 'Shift Lead' },
    { first: 'Oscar', last: 'Wallace', role: 'Barista' },
  ].map(m => ({ ...m, email: `${m.first.toLowerCase()}.${m.last.toLowerCase()}@joybakeshop.com` }))

  const handleCloseSecurityModal = () => {
    setIsSecurityModalClosing(true)
    setTimeout(() => {
      setSecurityModal(null)
      setIsSecurityModalClosing(false)
      setRepSearchQuery('')
    }, 350)
  }

  // Transfer modal state
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [isTransferModalClosing, setIsTransferModalClosing] = useState(false)

  const handleCloseTransferModal = () => {
    setIsTransferModalClosing(true)
    setTimeout(() => {
      setIsTransferModalOpen(false)
      setIsTransferModalClosing(false)
    }, 250)
  }

  // Deactivation modal state
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
  const [isDeactivateModalClosing, setIsDeactivateModalClosing] = useState(false)
  const [deactivateReason, setDeactivateReason] = useState(null)
  const [deactivateComments, setDeactivateComments] = useState('')
  const [deactivateStep, setDeactivateStep] = useState('reason') // 'reason' | 'password'
  const [deactivatePassword, setDeactivatePassword] = useState('')
  
  const handleCloseDeactivateModal = () => {
    setIsDeactivateModalClosing(true)
    setTimeout(() => {
      setIsDeactivateModalOpen(false)
      setIsDeactivateModalClosing(false)
      setDeactivateReason(null)
      setDeactivateComments('')
      setDeactivateStep('reason')
      setDeactivatePassword('')
    }, 250)
  }
  
  // Close handler for Business Edit modal with animation
  const handleCloseBusinessEditModal = () => {
    setIsBusinessEditModalClosing(true)
    setTimeout(() => {
      setIsBusinessEditModalOpen(false)
      setIsBusinessEditModalClosing(false)
    }, 350)
  }
  
  // Scroll to active section when Business Edit modal opens
  useEffect(() => {
    if (isBusinessEditModalOpen && businessEditActiveSection) {
      setTimeout(() => {
        const modalBody = document.querySelector('.location-modal-body')
        const targetSection = document.getElementById(`${businessEditActiveSection}-section`)
        if (modalBody && targetSection) {
          const offsetTop = targetSection.offsetTop
          modalBody.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [isBusinessEditModalOpen, businessEditActiveSection])

  // Handle escape key to close V2 website modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isV2WebsiteModalOpen && onV2WebsiteModalClose) {
        onV2WebsiteModalClose()
      }
    }

    if (isV2WebsiteModalOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isV2WebsiteModalOpen, onV2WebsiteModalClose])
  
  // Handle escape key to close Business Edit modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isBusinessEditModalOpen) {
        handleCloseBusinessEditModal()
      }
    }

    if (isBusinessEditModalOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isBusinessEditModalOpen])
  
  return (
      <div className="base-profile-page v3">
        {/* V3 Cards Container - stacked vertically */}
        <div className="cards-container">
          {/* My Business Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-info">
                <h3 className="card-title">{profileVersion === 'v2' ? brand.name : 'Business profile'}</h3>
                <p className="card-subtitle">{profileVersion === 'v2' ? <>{brand.handle} · Bakery</> : brand.name}</p>
              </div>
              <button className="card-action" onClick={() => setIsBusinessEditModalOpen(true)}>Preview profile</button>
            </div>

            <hr className="card-divider" />

            <div className="card-rows">
              <div className="card-row" onClick={() => { setBusinessEditActiveSection('brand'); setIsBusinessEditModalOpen(true); }}>
                <div className="v3-icon-container">
                  <div className="v4-mini-brand-card" style={(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? { background: brand.color } : undefined}>
                    {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                      <span className="v4-mini-brand-monogram">{brand.name[0].toUpperCase()}</span>
                    ) : (
                      <img src={brandLogos[activeBrand]} alt="" className="v4-mini-brand-logo" />
                    )}
                  </div>
                </div>
                <h4 className="service-title">Brand card</h4>
                {(customerViewMode === 'new-1' || customerViewMode === 'new-2')
                    ? <span className="v3-service-subtitle v4-action-text">Update your logo</span>
                    : <span className="v3-service-subtitle v4-verified-text">✪ Verified brand</span>}
                <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
              </div>

              <div className="card-row" onClick={() => { setBusinessEditActiveSection('business-info'); setIsBusinessEditModalOpen(true); }}>
                <div className="v3-icon-container">
                  <img src={InfoIcon} alt="" width="24" height="24" />
                </div>
                <h4 className="service-title">Business information</h4>
                <span className="v3-service-subtitle">{brand.name} · Bakery</span>
                <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
              </div>

              {profileVersion === 'v2' && (
                <div className="card-row" onClick={() => { onNavigationStart?.('channels'); onSidebarLevelChange?.('online'); }} style={{ cursor: 'pointer' }}>
                  <div className="v3-icon-container">
                    <img src={GlobeIcon} alt="" width="24" height="24" />
                  </div>
                  <h4 className="service-title">Connected channels</h4>
                  <span className="v3-service-subtitle">{(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? 'Google Business Profile' : 'Google Business Profile, Apple Business Connect'}</span>
                  <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                </div>
              )}

            </div>
          </div>

          {!(profileVersion === 'v2' && (customerViewMode === 'new-1' || customerViewMode === 'new-2')) && (
            <div className="card">
              <div className="card-header">
                <div className="card-header-info">
                  <h3 className="card-title">Linked brands</h3>
                  <p className="card-subtitle">Brands that share catalog or locations data with {brand.name}</p>
                </div>
                <button className="card-action">Edit</button>
              </div>
              <hr className="card-divider" />
              <div className="card-rows">
                {activeBrand === 'joy-bakeshop' ? (
                  <>
                    <div className="card-row">
                      <div className="v3-icon-container">
                        <div className="v4-mini-brand-card" style={(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? { background: brandData['keva-juice'].color } : undefined}>
                          {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                            <span className="v4-mini-brand-monogram">{brandData['keva-juice'].name[0].toUpperCase()}</span>
                          ) : (
                            <img src={brandLogos['keva-juice']} alt="" className="v4-mini-brand-logo" />
                          )}
                        </div>
                      </div>
                      <h4 className="service-title">{brandData['keva-juice'].name}</h4>
                      <span className="v3-service-subtitle">Brookhaven, Ansley Park</span>
                      <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                    </div>
                    {customerViewMode === 'returning' && (
                      <>
                        <div className="card-row">
                          <div className="v3-icon-container">
                            <div className="v4-mini-brand-card">
                              <img src={brandLogos['spot-of-tea']} alt="" className="v4-mini-brand-logo" />
                            </div>
                          </div>
                          <h4 className="service-title">{brandData['spot-of-tea'].name}</h4>
                          <span className="v3-service-subtitle">Brookhaven, Virginia-Highland</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                        <div className="card-row">
                          <div className="v3-icon-container">
                            <div className="v4-mini-brand-card">
                              <img src={brandLogos['paper-son-coffee']} alt="" className="v4-mini-brand-logo" />
                            </div>
                          </div>
                          <h4 className="service-title">{brandData['paper-son-coffee'].name}</h4>
                          <span className="v3-service-subtitle">Brookhaven</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="card-row">
                    <div className="v3-icon-container">
                      <div className="v4-mini-brand-card" style={(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? { background: brandData['joy-bakeshop'].color } : undefined}>
                        {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                          <span className="v4-mini-brand-monogram">{brandData['joy-bakeshop'].name[0].toUpperCase()}</span>
                        ) : (
                          <img src={brandLogos['joy-bakeshop']} alt="" className="v4-mini-brand-logo" />
                        )}
                      </div>
                    </div>
                    <h4 className="service-title">{brandData['joy-bakeshop'].name}</h4>
                    <span className="v3-service-subtitle">Brookhaven, Ansley Park</span>
                    <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Organization / Locations Card - Keva Juice returning: two groups (Atlanta, Greenville); else standard locations */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-info">
                <h3 className="card-title">{activeBrand === 'keva-juice' && customerViewMode === 'returning' ? 'Organization' : 'Locations'}</h3>
                <p className="card-subtitle">
                  {activeBrand === 'keva-juice' && customerViewMode === 'returning'
                    ? '2 franchises · 7 locations'
                    : (customerViewMode === 'new-1' || customerViewMode === 'new-2')
                      ? '1 location'
                      : '4 active · 1 inactive'}
                </p>
              </div>
              {activeBrand === 'keva-juice' && customerViewMode === 'returning' ? (
                <div className="location-header-buttons">
                  <button className="card-action">Add location</button>
                  <button className="card-action">Add franchisee</button>
                </div>
              ) : (
                <button className="card-action">Add location</button>
              )}
            </div>

            <hr className="card-divider" />

            <div className={`card-rows${activeBrand === 'keva-juice' && customerViewMode === 'returning' ? ' card-rows--organization' : ''}`}>
              {activeBrand === 'keva-juice' && customerViewMode === 'returning' ? (
                <>
                  {/* Group 1: Atlanta */}
                  <div className="v3-organization-group">
                    <div className="v3-locations-with-connector">
                      <div className="v3-locations-vertical-line" aria-hidden="true" />
                      <div className="card-row card-row--channel">
                        <div className="v3-icon-container v3-connection-icon v3-channel-brand-icon" style={!brandLogos[activeBrand] ? { background: brand.color } : undefined}>
                          {brandLogos[activeBrand] ? (
                            <img src={brandLogos[activeBrand]} alt="" width="20" height="24" style={{ objectFit: 'contain' }} />
                          ) : (
                            <span className="v3-channel-brand-initial">{brand.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="v3-channel-row-label">
                          <h4 className="service-title">Keva Juice - Atlanta</h4>
                          <span className="v3-channel-row-sublabel">Sandi Peterson, executive manager</span>
                        </div>
                        <span className="status-pill gray">Flagship</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-rows--indent">
                        <div className="card-row card-row--location" onClick={() => setLocationDetailModal('brookhaven')}>
                          <div className="v3-icon-container v3-location-icon">
                            <img src={LocationFillIcon} alt="" width="24" height="24" />
                          </div>
                          <h4 className="service-title">Brookhaven</h4>
                          <span className="v3-service-subtitle">3100 Lanier Dr NE, Brookhaven, GA 30319</span>
                          <span className="status-pill live">Active</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                        <div className="card-row card-row--location" onClick={() => setLocationDetailModal('ansley-park')}>
                          <div className="v3-icon-container v3-location-icon">
                            <img src={LocationFillIcon} alt="" width="24" height="24" />
                          </div>
                          <h4 className="service-title">Ansley Park</h4>
                          <span className="v3-service-subtitle">149 Peachtree Cir NE, Atlanta, GA 30309</span>
                          <span className="status-pill live">Active</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                        <div className="card-row card-row--location" onClick={() => setLocationDetailModal('virginia-highland')}>
                          <div className="v3-icon-container v3-location-icon inactive">
                            <img src={LocationOutlineIcon} alt="" width="24" height="24" />
                          </div>
                          <h4 className="service-title">Virginia Highland</h4>
                          <span className="v3-service-subtitle">1034 N Highland Ave NE, Atlanta, GA 30306</span>
                          <span className="status-pill gray">Inactive</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="v3-organization-divider-wrap">
                    <hr className="card-divider card-divider--organization" />
                  </div>

                  {/* Group 2: Greenville */}
                  <div className="v3-organization-group">
                    <div className="v3-locations-with-connector">
                      <div className="v3-locations-vertical-line" aria-hidden="true" />
                      <div className="card-row card-row--channel">
                        <div className="v3-icon-container v3-connection-icon v3-channel-brand-icon" style={!brandLogos[activeBrand] ? { background: brand.color } : undefined}>
                          {brandLogos[activeBrand] ? (
                            <img src={brandLogos[activeBrand]} alt="" width="20" height="24" style={{ objectFit: 'contain' }} />
                          ) : (
                            <span className="v3-channel-brand-initial">{brand.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="v3-channel-row-label">
                          <h4 className="service-title">Keva Juice - Greenville</h4>
                          <span className="v3-channel-row-sublabel">James Wilson, executive manager</span>
                        </div>
                        <span className="status-pill gray">B-notice required</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-rows--indent">
                        <div className="card-row card-row--location" onClick={() => setLocationDetailModal('north-main')}>
                          <div className="v3-icon-container v3-location-icon">
                            <img src={LocationFillIcon} alt="" width="24" height="24" />
                          </div>
                          <h4 className="service-title">North Main</h4>
                          <span className="v3-service-subtitle">220 N Main St, Greenville, SC 29601</span>
                          <span className="status-pill live">Active</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                        <div className="card-row card-row--location" onClick={() => setLocationDetailModal('augusta')}>
                          <div className="v3-icon-container v3-location-icon">
                            <img src={LocationFillIcon} alt="" width="24" height="24" />
                          </div>
                          <h4 className="service-title">Augusta</h4>
                          <span className="v3-service-subtitle">109 Cleveland St, Greenville, SC 29601</span>
                          <span className="status-pill live">Active</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                        <div className="card-row card-row--location" onClick={() => setLocationDetailModal('alta-vista')}>
                          <div className="v3-icon-container v3-location-icon">
                            <img src={LocationFillIcon} alt="" width="24" height="24" />
                          </div>
                          <h4 className="service-title">Alta Vista</h4>
                          <span className="v3-service-subtitle">1849 Piedmont Hwy, Piedmont, SC 29673</span>
                          <span className="status-pill live">Active</span>
                          <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-row card-row--location" onClick={() => setLocationDetailModal('brookhaven')}>
                    <div className="v3-icon-container v3-location-icon">
                      <img src={LocationFillIcon} alt="" width="24" height="24" />
                    </div>
                    <h4 className="service-title">Brookhaven</h4>
                    <span className="v3-service-subtitle">3100 Lanier Dr NE, Brookhaven, GA 30319</span>
                    <span className="status-pill live">Active</span>
                    <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                  </div>
                  {customerViewMode === 'returning' && (
                    <>
                      <div className="card-row card-row--location" onClick={() => setLocationDetailModal('ansley-park')}>
                        <div className="v3-icon-container v3-location-icon">
                          <img src={LocationFillIcon} alt="" width="24" height="24" />
                        </div>
                        <h4 className="service-title">Ansley Park</h4>
                        <span className="v3-service-subtitle">149 Peachtree Cir NE, Atlanta, GA 30309</span>
                        <span className="status-pill live">Active</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                      <div className="card-row card-row--location" onClick={() => setLocationDetailModal('virginia-highland')}>
                        <div className="v3-icon-container v3-location-icon inactive">
                          <img src={LocationOutlineIcon} alt="" width="24" height="24" />
                        </div>
                        <h4 className="service-title">Virginia Highland</h4>
                        <span className="v3-service-subtitle">1034 N Highland Ave NE, Atlanta, GA 30306</span>
                        <span className="status-pill gray">Inactive</span>
                        <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Security Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-info">
                <h3 className="card-title">Security</h3>
                <p className="card-subtitle">Account security and team permissions</p>
              </div>
            </div>

            <hr className="card-divider" />

            <div className="card-rows">
              <div className="card-row card-row--no-hover card-row--two-line">
                <div className="v3-icon-container">
                  <img src={SecurityIcon} alt="" width="24" height="24" />
                </div>
                <div className="card-row-text">
                  <h4 className="service-title">Two-step verification</h4>
                  <span className="card-row-description">Require team members to enter a security code at sign-in. <a href="https://squareup.com/help" target="_blank" rel="noopener noreferrer" className="security-link">Learn more</a></span>
                </div>
                <SecurityToggle onToggle={(on) => showToast(on ? 'Two-step verification enabled.' : 'Two-step verification disabled.')} />
              </div>

              <div className="card-row" onClick={() => setSecurityModal('representatives')}>
                <div className="v3-icon-container">
                  <img src={StaffIcon} alt="" width="24" height="24" />
                </div>
                <h4 className="service-title">Authorized representatives</h4>
                <span className="v3-service-subtitle">{authorizedReps.length} assigned</span>
                <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
              </div>

              <div className="card-row card-row--no-hover card-row--permissions">
                <div className="v3-icon-container">
                  <img src={LockIcon} alt="" width="24" height="24" />
                </div>
                <div className="card-row-text">
                  <h4 className="service-title">Team Permissions</h4>
                  <span className="card-row-description">Shared points of sale, Mobile points of sale, Dashboard. <a href="https://squareup.com/help" target="_blank" rel="noopener noreferrer" className="security-link">Edit Permissions</a></span>
                </div>
                <div className="permissions-passcode-row">
                  <span className="permissions-passcode-label">Team passcode</span>
                  <span className="permissions-passcode-digits">1 2 3 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Business Section */}
          <div className="card card--transfer">
            <div className="card-header">
              <div className="card-header-info">
                <h3 className="card-title">Transfer business</h3>
                <p className="transfer-description">This transfers the business to a new person within your organization. To process payments, Square needs to verify their identity. Don't worry, you'll still be able to process payments during the transfer process. <span className="transfer-note-inline">This feature is not supported when selling a business.</span></p>
              </div>
              <button type="button" className="transfer-button" onClick={() => setIsTransferModalOpen(true)}>Transfer business</button>
            </div>
          </div>

          {/* Deactivate Section */}
          <div className="card card--deactivate">
            <div className="card-header">
              <div className="card-header-info">
                <h3 className="card-title">Deactivate your business</h3>
                <p className="card-subtitle">Deactivating your business means that you will be unable to receive or recover any of your payment history or account information.</p>
              </div>
              <button type="button" className="deactivate-button" onClick={() => setIsDeactivateModalOpen(true)}>Deactivate business</button>
            </div>
          </div>

        </div>

        {/* Business Edit Modal - V3 single page sections */}
        {(isBusinessEditModalOpen || isBusinessEditModalClosing) && (
          <div className={`modal-overlay ${isBusinessEditModalClosing ? 'closing' : ''}`}>
            <div className="modal-container business-edit-modal">
              {/* Modal Header */}
              <div className="modal-header">
                <div className="modal-header-inner">
                  <button className="modal-close" onClick={handleCloseBusinessEditModal} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h2 className="modal-title">{brand.name}</h2>
                  <div className="modal-actions">
                    <button type="button" className="modal-cancel" onClick={handleCloseBusinessEditModal}>Cancel</button>
                    <button type="button" className="modal-send" onClick={handleSave}>Save</button>
                  </div>
                </div>
              </div>

              {/* Modal Body with Sidebar - items match My Business card rows */}
              <div className="location-modal-body">
                <nav className="location-modal-sidebar location-modal-sidebar-left v3-business-edit-sidebar">
                  <button 
                        type="button"
                        className={`v3-business-edit-nav-item v3-business-edit-nav-text-only ${businessEditActiveSection === 'brand' ? 'active' : ''}`}
                        onClick={() => setBusinessEditActiveSection('brand')}
                      >
                        <span>Brand card</span>
                      </button>
                      <button 
                        type="button"
                        className={`v3-business-edit-nav-item v3-business-edit-nav-text-only ${businessEditActiveSection === 'business-info' ? 'active' : ''}`}
                        onClick={() => setBusinessEditActiveSection('business-info')}
                      >
                        <span>Business information</span>
                      </button>
                </nav>

                {/* Center Content Area - Single section at a time with cards */}
                <div className="modal-content fading-in v3-edit-content">
                  {/* Brand section (one page) - "Global brand" label when returning customer */}
                  {businessEditActiveSection === 'brand' && (
                    <div id="brand-section" className="v3-edit-section">
                      {/* Logo Card */}
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Logo</h3>
                            <p className="card-subtitle">Upload or choose a logo for your brand card</p>
                          </div>
                        </div>
                        <div className="v3-form-fields">
                          <div className="v3-brand-card-preview v4-brand-card-preview-large">
                            <div className="v4-preview-brand-card" style={{ background: brand.color }}>
                              {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                                <span className="v4-preview-monogram-text">{monogram}</span>
                              ) : (
                                <img src={brandLogos[activeBrand]} alt={brand.name} className="v4-preview-logo-img" />
                              )}
                            </div>
                          </div>
                          <div className="v3-logo-field">
                            <label className="form-label">Logo</label>
                            <div className="image-upload">
                              <div className="image-preview v4-logo-thumb selected">
                                <div className="v4-logo-thumb-monogram" style={{ background: brand.color }}>
                                  <span>{monogram}</span>
                                </div>
                              </div>
                              <div className="image-preview v4-logo-thumb">
                                <img src={brandLogos[activeBrand]} alt={brand.name} />
                              </div>
                              <button className="image-upload-button v4-logo-thumb">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#101010"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Color Card */}
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Color</h3>
                            <p className="card-subtitle">Choose a background color for your brand card</p>
                          </div>
                        </div>
                        <div className="v3-form-fields">
                          <div className="v4-color-field">
                            <label className="form-label">Brand colors</label>
                            <div className="v4-color-circles-row">
                              {(() => {
                                const brandColorSets = {
                                  'joy-bakeshop': ['#0000FF', '#3D5AFE', '#82B1FF', '#1A237E'],
                                  'keva-juice': ['#FF6B35', '#FF9800', '#FFB74D', '#E65100'],
                                  'spot-of-tea': ['#2A67B0', '#5C9CE6', '#90CAF9', '#1A3A5C'],
                                  'paper-son-coffee': ['#2B6058', '#4DB6AC', '#80CBC4', '#1B3B35'],
                                  'vanilla-cafe': ['#4D6242', '#7CB342', '#AED581', '#33402B'],
                                  'tea-monks': ['#A66800', '#FFB300', '#FFD54F', '#6D4500'],
                                  'brooklyn-french-bakers': ['#FF8C42', '#FFAB76', '#FFD0A8', '#BF5F1A']
                                }
                                const colors = brandColorSets[activeBrand] || brandColorSets['joy-bakeshop']
                                return colors.map((c, i) => (
                                  <button key={c} type="button" className={`v4-color-circle-btn${i === 0 ? ' selected' : ''}`}>
                                    <span className="v4-color-circle-inner" style={{ background: c }}></span>
                                  </button>
                                ))
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Business Information Section (v4) */}
                  {businessEditActiveSection === 'business-info' && (
                    <div id="business-info-section" className="v3-edit-section">
                      {/* Business Name Card */}
                      <div className="dev-annotation-wrapper">
                        <a href="https://blockcell.sqprod.co/sites/business-name-cleaner/" target="_blank" rel="noopener noreferrer" className="dev-annotation">
                          Imported with <span className="dev-annotation-link">business name cleaning</span> ↗
                        </a>
                      </div>
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Business name</h3>
                            <p className="card-subtitle">Your business identity</p>
                          </div>
                        </div>
                        <div className="v3-form-fields">
                          <div>
                            <div className={`form-input-container has-value${nameChangesUsed >= 3 ? ' form-input-locked' : ''}`}>
                              <label className="form-label">Legal business name</label>
                              <input type="text" className="form-input-text" defaultValue={`${brand.name} LLC`} readOnly={nameChangesUsed >= 3} onChange={(e) => setBusinessNameChanged(e.target.value !== `${brand.name} LLC`)} />
                            </div>
                          </div>
                          <div>
                            <div className={`form-input-container has-value${nameChangesUsed >= 3 ? ' form-input-locked' : ''}`}>
                              <label className="form-label">Display business name</label>
                              <input type="text" className="form-input-text" defaultValue={brand.name} readOnly={nameChangesUsed >= 3} onChange={(e) => setBusinessNameChanged(e.target.value !== brand.name)} />
                            </div>
                            {nameChangesUsed >= 3 && (
                              <p className="field-helper-text">Additional business name changes require approval. <a href="https://cash.app/help" target="_blank" rel="noopener noreferrer" className="field-helper-link">Contact support</a></p>
                            )}
                          </div>
                          <MCCDropdown value="Bakery" onChange={(mcc) => console.log('Selected MCC:', mcc)} />
                          <div>
                            <div className={`form-input-container has-value form-input-with-prefix${cashTagRenamesUsed >= 2 ? ' form-input-locked' : ''}`}>
                              <label className="form-label">$Cashtag</label>
                              <span className="form-input-prefix">$</span>
                              <input
                                type="text"
                                className="form-input-text form-input-text--has-prefix"
                                defaultValue={brand.handle.replace(/^\$/, '')}
                                readOnly={cashTagRenamesUsed >= 2}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setCashTagValue(val)
                                  if (cashTagTimerRef.current) clearTimeout(cashTagTimerRef.current)
                                  if (val === brand.handle.replace(/^\$/, '') || val.trim() === '') {
                                    setCashTagStatus('idle')
                                    return
                                  }
                                  setCashTagStatus('checking')
                                  cashTagTimerRef.current = setTimeout(() => {
                                    if (val.toLowerCase().includes('cash')) setCashTagStatus('blocked')
                                    else if (val.toLowerCase().includes('jack')) setCashTagStatus('taken')
                                    else setCashTagStatus('available')
                                  }, 1500)
                                }}
                              />
                              {cashTagStatus === 'checking' && (
                                <svg className="cashtag-inline-spinner" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M19 12C19 8.13401 15.866 5 12 5V3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12H5C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12Z" fill="#101010"/>
                                </svg>
                              )}
                            </div>
                            {cashTagRenamesUsed >= 2 && (
                              <p className="field-helper-text">Additional $cashtag changes require approval. <a href="https://cash.app/help" target="_blank" rel="noopener noreferrer" className="field-helper-link">Contact support</a></p>
                            )}
                            {cashTagStatus !== 'idle' && cashTagRenamesUsed < 2 && (
                              <p className={`field-update-hint cashtag-status cashtag-status--${cashTagStatus}`}>
                                {cashTagStatus === 'checking' && null}
                                {cashTagStatus === 'available' && (
                                  <>
                                    <svg className="cashtag-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M4.1074 4.10728C7.36177 0.852912 12.6385 0.852912 15.8929 4.10728C19.1473 7.36165 19.1473 12.6384 15.8929 15.8928C12.6385 19.1471 7.36177 19.1471 4.1074 15.8928C0.853033 12.6384 0.853034 7.36165 4.1074 4.10728ZM14.7145 5.28567C12.111 2.68217 7.88928 2.68217 5.28579 5.28567C2.68229 7.88916 2.68229 12.1109 5.28579 14.7144C7.88928 17.3179 12.111 17.3179 14.7145 14.7144C17.318 12.1109 17.318 7.88916 14.7145 5.28567Z" fill="#00B23B"/>
                                      <path d="M8.74988 12.4698L6.94194 10.2912L5.72473 11.2922L8.22473 14.2922C8.38254 14.4814 8.61275 14.5918 8.85653 14.5938C9.10031 14.5958 9.33227 14.4891 9.49319 14.3025L14.3265 8.71911L13.0902 7.64746L8.74988 12.4698Z" fill="#00B23B"/>
                                    </svg>
                                    <span>This $Cashtag is available.</span>
                                  </>
                                )}
                                {cashTagStatus === 'taken' && (
                                  <>
                                    <svg className="cashtag-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M10.8335 5.83335V10.4167H9.16681V5.83335H10.8335Z" fill="#BF0020"/>
                                      <path d="M10.0001 14.5834C10.6905 14.5834 11.2501 14.0237 11.2501 13.3334C11.2501 12.643 10.6905 12.0834 10.0001 12.0834C9.30979 12.0834 8.75014 12.643 8.75014 13.3334C8.75014 14.0237 9.30979 14.5834 10.0001 14.5834Z" fill="#BF0020"/>
                                      <path fillRule="evenodd" clipRule="evenodd" d="M4.1074 4.10728C7.36177 0.852912 12.6385 0.852912 15.8929 4.10728C19.1473 7.36165 19.1473 12.6384 15.8929 15.8928C12.6385 19.1471 7.36177 19.1471 4.1074 15.8928C0.853033 12.6384 0.853034 7.36165 4.1074 4.10728ZM14.7145 5.28567C12.111 2.68217 7.88928 2.68217 5.28579 5.28567C2.68229 7.88916 2.68229 12.1109 5.28579 14.7144C7.88928 17.3179 12.111 17.3179 14.7145 14.7144C17.318 12.1109 17.318 7.88916 14.7145 5.28567Z" fill="#BF0020"/>
                                    </svg>
                                    <span>This $Cashtag is already taken.</span>
                                  </>
                                )}
                                {cashTagStatus === 'blocked' && (
                                  <>
                                    <svg className="cashtag-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M10.8335 5.83335V10.4167H9.16681V5.83335H10.8335Z" fill="#BF0020"/>
                                      <path d="M10.0001 14.5834C10.6905 14.5834 11.2501 14.0237 11.2501 13.3334C11.2501 12.643 10.6905 12.0834 10.0001 12.0834C9.30979 12.0834 8.75014 12.643 8.75014 13.3334C8.75014 14.0237 9.30979 14.5834 10.0001 14.5834Z" fill="#BF0020"/>
                                      <path fillRule="evenodd" clipRule="evenodd" d="M4.1074 4.10728C7.36177 0.852912 12.6385 0.852912 15.8929 4.10728C19.1473 7.36165 19.1473 12.6384 15.8929 15.8928C12.6385 19.1471 7.36177 19.1471 4.1074 15.8928C0.853033 12.6384 0.853034 7.36165 4.1074 4.10728ZM14.7145 5.28567C12.111 2.68217 7.88928 2.68217 5.28579 5.28567C2.68229 7.88916 2.68229 12.1109 5.28579 14.7144C7.88928 17.3179 12.111 17.3179 14.7145 14.7144C17.318 12.1109 17.318 7.88916 14.7145 5.28567Z" fill="#BF0020"/>
                                    </svg>
                                    <span>This $Cashtag contains a word or character that isn't allowed.</span>
                                  </>
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Business Information Card */}
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Business information</h3>
                            <p className="card-subtitle">Contact and location details</p>
                          </div>
                        </div>
                        <div className="v3-form-fields">
                          <div className="form-input-container has-value">
                            <label className="form-label">Business owner name</label>
                            <input type="text" className="form-input-text" defaultValue="Nora Atrakchi" />
                          </div>
                          <div className="form-input-container has-value">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-input-text" defaultValue={brand.locations?.[0]?.address || '3100 Lanier Dr NE, Atlanta, GA 30319'} />
                          </div>
                          <div className="form-input-container has-value">
                            <label className="form-label">Hours</label>
                            <input type="text" className="form-input-text" defaultValue={brand.locations?.[0]?.hours || 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm'} />
                          </div>
                          <div className="form-input-container has-value">
                            <label className="form-label">Website</label>
                            <input type="text" className="form-input-text" defaultValue="https://joybakeshop.com" />
                          </div>
                          <div className="mcc-dropdown" ref={languageDropdownRef}>
                            <div className={`form-input-container has-value mcc-dropdown-trigger ${isLanguageDropdownOpen ? 'focused' : ''}`} onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
                              <label className="form-label">Language</label>
                              <div className="mcc-dropdown-value">
                                <span className="form-input-text">{selectedLanguage}</span>
                                <svg className={`mcc-dropdown-chevron ${isLanguageDropdownOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
                                </svg>
                              </div>
                            </div>
                            {isLanguageDropdownOpen && (
                              <div className="mcc-dropdown-menu">
                                <div className="mcc-dropdown-list" style={{ padding: '4px 8px' }}>
                                  {['English', 'Spanish'].map((lang) => (
                                    <button
                                      key={lang}
                                      type="button"
                                      className={`mcc-dropdown-item ${selectedLanguage === lang ? 'selected' : ''}`}
                                      onClick={() => { setSelectedLanguage(lang); setIsLanguageDropdownOpen(false) }}
                                    >
                                      <span className="mcc-dropdown-item-label">{lang}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* About Card */}
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">About</h3>
                            <p className="card-subtitle">Tell customers about your business</p>
                          </div>
                        </div>
                        <div className="v3-form-fields">
                          <div className="form-input-container has-value v3-textarea-field">
                            <label className="form-label">Description</label>
                            <textarea className="form-input-text v3-textarea" rows="4" defaultValue={brand.about || "We're a small, butter-obsessed bakery making pastries, bread, and treats from scratch daily."}></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Neighborhoods Section */}
                  {businessEditActiveSection === 'neighborhoods' && (
                    <div id="neighborhoods-section" className="v3-edit-section">
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Neighborhoods</h3>
                            <p className="card-subtitle">Reach customers in your area with {brand.handle}</p>
                          </div>
                          <button className="card-action">Get started</button>
                        </div>
                        <div className="v3-form-fields">
                          <p className="v3-edit-section-subtitle" style={{ marginTop: 0 }}>
                            Connect your business to neighborhoods so customers can discover you locally. Activate {brand.handle} to show up in neighborhood search and recommendations.
                          </p>
                          <div className="form-input-container has-value">
                            <label className="form-label">Status</label>
                            <input type="text" className="form-input-text" readOnly defaultValue={customerViewMode === 'returning' ? 'Active' : 'Inactive'} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Staff & permissions Section */}
                  {businessEditActiveSection === 'team' && (
                    <div id="team-section" className="v3-edit-section">
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Team members</h3>
                            <p className="card-subtitle">4 members with access</p>
                          </div>
                          <button className="card-action">Add member</button>
                        </div>
                        <div className="location-settings-group">
                          <div className="location-setting-item">
                            <div className="v3-member-avatar">
                              <img src={avatar1} alt="" />
                            </div>
                            <div className="setting-content">
                              <div className="setting-title">Nora Atrakchi</div>
                              <div className="setting-details">Owner · Full access</div>
                            </div>
                            <button className="setting-edit-button">Edit</button>
                          </div>
                          <div className="location-setting-item">
                            <div className="v3-member-avatar">
                              <img src={avatar2} alt="" />
                            </div>
                            <div className="setting-content">
                              <div className="setting-title">Darya Kishylau</div>
                              <div className="setting-details">Manager · Limited access</div>
                            </div>
                            <button className="setting-edit-button">Edit</button>
                          </div>
                          <div className="location-setting-item">
                            <div className="v3-member-avatar">
                              <img src={avatar3} alt="" />
                            </div>
                            <div className="setting-content">
                              <div className="setting-title">David Leung</div>
                              <div className="setting-details">Staff · Limited access</div>
                            </div>
                            <button className="setting-edit-button">Edit</button>
                          </div>
                          <div className="location-setting-item">
                            <div className="v3-member-avatar">
                              <img src={avatar4} alt="" />
                            </div>
                            <div className="setting-content">
                              <div className="setting-title">Tyler Reinhard</div>
                              <div className="setting-details">Staff · View only</div>
                            </div>
                            <button className="setting-edit-button">Edit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Devices Section */}
                  {businessEditActiveSection === 'devices' && (
                    <div id="devices-section" className="v3-edit-section">
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Devices</h3>
                            <p className="card-subtitle">POS, printers, and modes</p>
                          </div>
                          <button className="card-action">Add device</button>
                        </div>
                        <div className="location-settings-group">
                          <div className="location-setting-item">
                            <div className="setting-content">
                              <div className="setting-title">Point of sale</div>
                              <div className="setting-details">{customerViewMode === 'returning' ? '3 devices connected' : 'Add a POS to accept payments'}</div>
                            </div>
                            <button className="setting-edit-button">Manage</button>
                          </div>
                          <div className="location-setting-item">
                            <div className="setting-content">
                              <div className="setting-title">Printers</div>
                              <div className="setting-details">{customerViewMode === 'returning' ? '2 printers' : 'Connect receipt or kitchen printers'}</div>
                            </div>
                            <button className="setting-edit-button">Manage</button>
                          </div>
                          <div className="location-setting-item">
                            <div className="setting-content">
                              <div className="setting-title">Modes</div>
                              <div className="setting-details">{customerViewMode === 'returning' ? '2 modes' : 'Set up counter, kiosk, or other modes'}</div>
                            </div>
                            <button className="setting-edit-button">Manage</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Settings Section */}
                  {businessEditActiveSection === 'security' && (
                    <div id="security-section" className="v3-edit-section">
                      <div className="card card-modal card--no-divider">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Security</h3>
                            <p className="card-subtitle">Protect your business account</p>
                          </div>
                        </div>
                        <div className="location-settings-group">
                          <div className="location-setting-item">
                            <div className="setting-content">
                              <div className="setting-title">Two-step verification</div>
                              <div className="setting-details">Require all team members to verify their identity</div>
                            </div>
                            <div className="toggle-switch on"></div>
                          </div>
                          <div className="location-setting-item">
                            <div className="setting-content">
                              <div className="setting-title">Login notifications</div>
                              <div className="setting-details">Get notified when someone logs in</div>
                            </div>
                            <div className="toggle-switch on"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Connections Section - kept for any deep link; not in sidebar */}
                  {businessEditActiveSection === 'connections' && (
                    <div className="v3-edit-section">
                      {/* Google Business Profile Card */}
                      <div className="card card-modal card--connection card--no-divider">
                        <div className="card-header">
                          <div className="v3-connection-logo-container">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                          </div>
                          <div className="card-header-info">
                            <h3 className="card-title">Google Business Profile</h3>
                            <span className="status-pill gray">Not connected</span>
                          </div>
                          <button className="card-action">Connect</button>
                        </div>
                        <p className="v3-connection-description">
                          Sync your business information with Google Search and Maps. Customers can find your hours, location, and contact info when searching for your business. Appear in Google Search, show on Google Maps, and manage customer reviews.
                        </p>
                      </div>

                      {/* Apple Business Connect Card */}
                      <div className="card card-modal card--connection card--no-divider">
                        <div className="card-header">
                          <div className="v3-connection-logo-container">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="#000000"/>
                            </svg>
                          </div>
                          <div className="card-header-info">
                            <h3 className="card-title">Apple Business Connect</h3>
                            <span className="status-pill gray">Not connected</span>
                          </div>
                          <button className="card-action">Connect</button>
                        </div>
                        <p className="v3-connection-description">
                          Manage how your business appears across Apple apps including Maps, Siri, and Wallet. Reach millions of Apple users searching for businesses like yours. Get listed on Apple Maps, appear in Siri suggestions, and show in Spotlight search.
                        </p>
                      </div>

                      {/* Meta for Small Businesses Card */}
                      <div className="card card-modal card--connection card--no-divider">
                        <div className="card-header">
                          <div className="v3-connection-logo-container">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="url(#meta-gradient)"/>
                              <path d="M15.914 8.818C15.087 8.818 14.359 9.382 13.614 10.427C13.018 9.455 12.377 8.818 11.377 8.818C9.814 8.818 8.186 10.764 8.186 13.236C8.186 14.891 8.941 15.818 10.014 15.818C10.768 15.818 11.377 15.327 12.059 14.273L12.477 13.618C12.768 14.891 13.45 15.818 14.668 15.818C16.304 15.818 17.814 13.909 17.814 11.364C17.814 9.636 16.914 8.818 15.914 8.818ZM10.177 14.709C9.668 14.709 9.377 14.236 9.377 13.382C9.377 11.6 10.177 10 10.977 10C11.414 10 11.777 10.382 12.141 11.055L10.832 13.2C10.468 13.8 10.323 14.709 10.177 14.709ZM14.55 14.709C13.914 14.709 13.541 14.055 13.323 13.236L14.523 11.273C14.886 10.673 15.177 10.127 15.614 10.127C16.123 10.127 16.486 10.618 16.486 11.509C16.486 13.164 15.65 14.709 14.55 14.709Z" fill="white"/>
                              <defs>
                                <linearGradient id="meta-gradient" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#0081FB"/>
                                  <stop offset="0.5" stopColor="#0099FF"/>
                                  <stop offset="1" stopColor="#A033FF"/>
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="card-header-info">
                            <h3 className="card-title">Meta for Small Businesses</h3>
                            <span className="status-pill gray">Not connected</span>
                          </div>
                          <button className="card-action">Connect</button>
                        </div>
                        <p className="v3-connection-description">
                          Connect your Meta Business Suite to manage Facebook and Instagram in one place. Reach customers across both platforms, manage messages and comments, run targeted ads, and track engagement analytics.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Sidebar - Empty for centering */}
                <div className="location-modal-sidebar location-modal-sidebar-right"></div>
              </div>
            </div>
          </div>
        )}

        {/* Security Modal - Full page like Business Edit */}
        {(securityModal || isSecurityModalClosing) && (
          <div className={`modal-overlay ${isSecurityModalClosing ? 'closing' : ''}`}>
            <div className="modal-container business-edit-modal">
              <div className="modal-header">
                <div className="modal-header-inner">
                  <button className="modal-close" onClick={handleCloseSecurityModal} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h2 className="modal-title">
                    {securityModal === 'two-step' && 'Business two-step verification'}
                    {securityModal === 'representatives' && 'Authorized representatives'}
                  </h2>
                  {securityModal === 'representatives' && (
                    <div className="modal-actions">
                      <button type="button" className="modal-cancel" onClick={handleCloseSecurityModal}>Cancel</button>
                      <button type="button" className="modal-send" onClick={() => { handleCloseSecurityModal(); showToast('Authorized representatives updated.'); }}>Save</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-body">
                <div className="security-modal-content">
                  {securityModal === 'representatives' && (
                    <>
                      <div className="card">
                        <div className="card-header">
                          <div className="card-header-info">
                            <h3 className="card-title">Authorized representatives</h3>
                            <p className="card-subtitle">The following team members are authorized to contact Customer Support on behalf of your business regarding sensitive account information and transaction details. <a href="https://squareup.com/help" target="_blank" rel="noopener noreferrer" className="security-link">Learn more.</a></p>
                          </div>
                        </div>
                        {authorizedReps.length > 0 && (
                          <>
                            <div className="rep-section">
                              <div className="rep-table">
                                {authorizedReps.map((member) => (
                                  <div key={member.email} className="rep-table-row">
                                    <div className="rep-avatar rep-avatar--authorized">{member.first[0]}{member.last[0]}</div>
                                    <div className="rep-member-info">
                                      <span className="rep-member-name">{member.first} {member.last}</span>
                                      <span className="rep-member-role">{member.role}</span>
                                    </div>
                                    <button className="rep-remove-btn" onClick={() => setAuthorizedReps(authorizedReps.filter(r => r.email !== member.email))}>Remove</button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        <div className="rep-section">
                          <div className="rep-search-container">
                            <div className="rep-search-input-wrapper">
                              <svg className="rep-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <input type="text" className="rep-search-input" placeholder="Search team members to authorize" value={repSearchQuery} onChange={(e) => setRepSearchQuery(e.target.value)} />
                            </div>
                          </div>
                          <div className="rep-table">
                            {(() => {
                              const filtered = allTeamMembers
                                .filter(m => !authorizedReps.some(r => r.email === m.email))
                                .filter(m => {
                                  if (!repSearchQuery) return true
                                  const q = repSearchQuery.toLowerCase()
                                  return `${m.first} ${m.last}`.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
                                })
                              const shown = repSearchQuery ? filtered : filtered.slice(0, 10)
                              return (<>
                                {shown.map((member) => (
                              <div key={member.email} className="rep-table-row">
                                <div className="rep-avatar">{member.first[0]}{member.last[0]}</div>
                                <div className="rep-member-info">
                                  <span className="rep-member-name">{member.first} {member.last}</span>
                                  <span className="rep-member-role">{member.role}</span>
                                </div>
                                <button className="rep-add-btn" onClick={() => { setAuthorizedReps([...authorizedReps, member]); setRepSearchQuery(''); }}>Add</button>
                              </div>
                            ))}
                            {!repSearchQuery && filtered.length > 10 && (
                              <p className="rep-show-more">Search to find more — {filtered.length - 10} team members not shown</p>
                            )}
                          </>)
                            })()}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Location Detail Modal */}
        {(locationDetailModal || isLocationDetailClosing) && currentLocation && (
          <div className={`modal-overlay ${isLocationDetailClosing ? 'closing' : ''}`}>
            <div className="modal-container business-edit-modal">
              <div className="modal-header">
                <div className="modal-header-inner">
                  <button className="modal-close" onClick={handleCloseLocationDetail} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h2 className="modal-title">Location details</h2>
                  <div className="modal-actions">
                    <div className="location-tooltip-wrap location-info-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0002 17.0002H11.0002V11.5002H13.0002V17.0002Z" fill="#959595"/>
                        <path d="M12.0002 6.50022C12.8286 6.50022 13.5002 7.17179 13.5002 8.00022C13.5002 8.82865 12.8286 9.50022 12.0002 9.50022C11.1718 9.50022 10.5002 8.82865 10.5002 8.00022C10.5002 7.17179 11.1718 6.50022 12.0002 6.50022Z" fill="#959595"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.92893 4.92893C8.83417 1.02369 15.1663 1.02369 19.0715 4.92893C22.9768 8.83418 22.9768 15.1663 19.0715 19.0715C15.1663 22.9768 8.83418 22.9768 4.92893 19.0715C1.02369 15.1663 1.02369 8.83418 4.92893 4.92893ZM17.6574 6.34299C14.5333 3.2188 9.46719 3.2188 6.34299 6.34299C3.2188 9.46719 3.2188 14.5333 6.34299 17.6574C9.46719 20.7816 14.5333 20.7816 17.6574 17.6574C20.7816 14.5333 20.7816 9.46719 17.6574 6.34299Z" fill="#959595"/>
                      </svg>
                      <span className="location-tooltip">The last active location cannot be deactivated</span>
                    </div>
                    {currentLocation.status === 'Active' && <button type="button" className="modal-deactivate-btn">Deactivate</button>}
                    {currentLocation.status === 'Inactive' && <button type="button" className="modal-deactivate-btn">Activate</button>}
                    <button type="button" className="modal-send" onClick={handleCloseLocationDetail}>Save</button>
                  </div>
                </div>
              </div>

              <div className="location-modal-body">
                <div className="location-detail-content">

                  {/* Basic information */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Basic information</h3>
                        <p className="card-subtitle">Help customers recognize your transactions with your store's location, nickname and a brief description of your products or services.</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container has-value location-field-with-link">
                        <label className="form-label">Location business name</label>
                        <input type="text" className="form-input-text" defaultValue={currentLocation.name} />
                        <a href="#" className="location-field-action" onClick={(e) => { e.preventDefault(); setIsLocationNameDialogOpen(true); }}>What is this?</a>
                      </div>
                      <div className="form-input-container has-value location-field-with-icon">
                        <label className="form-label">Location nickname</label>
                        <input type="text" className="form-input-text" defaultValue={currentLocation.name} />
                        <div className="location-tooltip-wrap">
                          <svg className="location-field-info" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0002 17.0002H11.0002V11.5002H13.0002V17.0002Z" fill="#959595"/>
                            <path d="M12.0002 6.50022C12.8286 6.50022 13.5002 7.17179 13.5002 8.00022C13.5002 8.82865 12.8286 9.50022 12.0002 9.50022C11.1718 9.50022 10.5002 8.82865 10.5002 8.00022C10.5002 7.17179 11.1718 6.50022 12.0002 6.50022Z" fill="#959595"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.92893 4.92893C8.83417 1.02369 15.1663 1.02369 19.0715 4.92893C22.9768 8.83418 22.9768 15.1663 19.0715 19.0715C15.1663 22.9768 8.83418 22.9768 4.92893 19.0715C1.02369 15.1663 1.02369 8.83418 4.92893 4.92893ZM17.6574 6.34299C14.5333 3.2188 9.46719 3.2188 6.34299 6.34299C3.2188 9.46719 3.2188 14.5333 6.34299 17.6574C9.46719 20.7816 14.5333 20.7816 17.6574 17.6574C20.7816 14.5333 20.7816 9.46719 17.6574 6.34299Z" fill="#959595"/>
                          </svg>
                          <span className="location-tooltip">The nickname is an internal name for your location and won't be seen by your customers.</span>
                        </div>
                      </div>
                      <p className="location-detail-notice">Your Location Business Name can be edited <strong>up to 3 times every 12 months</strong>. Changing your Location Business Name does not count against your Business Name Change allowance. If you need to make a change outside of this window, please <a href="https://squareup.com/help" target="_blank" rel="noopener noreferrer" className="security-link">contact Support.</a></p>
                      <div className="location-textarea-wrap">
                        <div className="form-input-container v3-textarea-field">
                          <label className="form-label">Location description</label>
                          <textarea className="form-textarea" defaultValue="" placeholder="" onChange={(e) => e.target.parentElement.classList.toggle('has-value', e.target.value.length > 0)} onBlur={(e) => e.target.parentElement.classList.toggle('has-value', e.target.value.length > 0)} />
                        </div>
                        <span className="form-char-count">0/1024</span>
                      </div>
                    </div>
                  </div>

                  {/* Business address */}
                  <div className="card card-modal card--no-divider card--with-map">
                    {currentLocation.lat && (() => {
                      const z = 15
                      const n = Math.pow(2, z)
                      const centerTileX = Math.floor((currentLocation.lng + 180) / 360 * n)
                      const latRad = currentLocation.lat * Math.PI / 180
                      const centerTileY = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
                      const cols = 5
                      const rows = 2
                      const startX = centerTileX - Math.floor(cols / 2)
                      const startY = centerTileY - Math.floor(rows / 2)
                      return (
                        <div className="location-map-preview location-map-preview--top">
                          <div className="location-map-tiles" style={{ width: cols * 256, height: rows * 256 }}>
                            {Array.from({ length: rows }, (_, r) =>
                              Array.from({ length: cols }, (_, c) => (
                                <img
                                  key={`${r}-${c}`}
                                  src={`https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${startX + c}/${startY + r}@2x.png`}
                                  alt=""
                                  width="256"
                                  height="256"
                                  style={{ position: 'absolute', left: c * 256, top: r * 256 }}
                                />
                              ))
                            )}
                          </div>
                          <div className="location-map-pin">
                            <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 0C7.164 0 0 7.164 0 16c0 12 16 26 16 26s16-14 16-26c0-8.836-7.164-16-16-16z" fill="#101010"/>
                              <circle cx="16" cy="16" r="6" fill="#FFFFFF"/>
                            </svg>
                          </div>
                        </div>
                      )
                    })()}
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Business address</h3>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="mcc-dropdown" ref={locationTypeRef}>
                        <div className={`form-input-container has-value mcc-dropdown-trigger ${isLocationTypeOpen ? 'focused' : ''}`} onClick={() => setIsLocationTypeOpen(!isLocationTypeOpen)}>
                          <label className="form-label">Location type</label>
                          <div className="mcc-dropdown-value">
                            <span className="form-input-text">{selectedLocationType}</span>
                            <svg className={`mcc-dropdown-chevron ${isLocationTypeOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
                            </svg>
                          </div>
                        </div>
                        {isLocationTypeOpen && (
                          <div className="mcc-dropdown-menu">
                            <div className="mcc-dropdown-list" style={{ padding: '4px 8px' }}>
                              {['Physical location', 'Mobile location'].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`mcc-dropdown-item ${selectedLocationType === type ? 'selected' : ''}`}
                                  onClick={() => { setSelectedLocationType(type); setIsLocationTypeOpen(false); }}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="form-input-container has-value">
                        <label className="form-label">Address line 1</label>
                        <input type="text" className="form-input-text" defaultValue={currentLocation.address1} />
                      </div>
                      <div className="form-input-container">
                        <label className="form-label">Address line 2</label>
                        <input type="text" className="form-input-text" defaultValue="" placeholder="Address line 2" />
                      </div>
                      <div className="form-input-container has-value">
                        <label className="form-label">City</label>
                        <input type="text" className="form-input-text" defaultValue={currentLocation.city} />
                      </div>
                      <div className="location-form-row">
                        <div className="form-input-container has-value">
                          <label className="form-label">State</label>
                          <div className="mcc-dropdown-value">
                            <span className="form-input-text">{currentLocation.state}</span>
                            <svg className="mcc-dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
                            </svg>
                          </div>
                        </div>
                        <div className="form-input-container has-value">
                          <label className="form-label">ZIP code</label>
                          <input type="text" className="form-input-text" defaultValue={currentLocation.zip} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location groups */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Location groups</h3>
                        <p className="card-subtitle">Group your locations with custom labels and use them to apply bulk updates, filter reports, and more.</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="location-groups-section">
                        <div className="location-groups-header">
                          <h4 className="location-groups-title">Current groups</h4>
                          <a href="#" className="security-link" onClick={(e) => { e.preventDefault(); setIsLocationGroupDialogOpen(true); }}>Manage</a>
                        </div>
                        {locationGroups.length === 0 ? (
                          <div className="location-groups-empty">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#959595"/>
                            </svg>
                            <span>No location groups found</span>
                          </div>
                        ) : (
                          <div className="location-groups-table">
                            {locationGroups.map((group, i) => (
                              <div key={i} className="location-groups-row">
                                <div className="location-groups-row-info">
                                  <span className="location-groups-row-name">{group.name}</span>
                                  {group.desc && <span className="location-groups-row-desc">{group.desc}</span>}
                                </div>
                                <span className="location-groups-row-count">{group.locations} location{group.locations !== 1 ? 's' : ''}</span>
                                <div className="location-groups-menu-wrap">
                                  <button className="location-groups-menu-btn" onClick={(e) => { e.stopPropagation(); setLocationGroupMenuOpen(locationGroupMenuOpen === i ? null : i); }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12" cy="5" r="2" fill="#101010"/>
                                      <circle cx="12" cy="12" r="2" fill="#101010"/>
                                      <circle cx="12" cy="19" r="2" fill="#101010"/>
                                    </svg>
                                  </button>
                                  {locationGroupMenuOpen === i && (
                                    <div className="location-groups-dropdown">
                                      <button className="location-groups-dropdown-item" onClick={() => setLocationGroupMenuOpen(null)}>Edit</button>
                                      <button className="location-groups-dropdown-item" onClick={() => setLocationGroupMenuOpen(null)}>Add/remove locations</button>
                                      <button className="location-groups-dropdown-item location-groups-dropdown-item--danger" onClick={() => { setLocationGroups(locationGroups.filter((_, idx) => idx !== i)); setLocationGroupMenuOpen(null); }}>Delete</button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact information */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Contact information</h3>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="location-form-row">
                        <div className="form-input-container has-value">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-input-text" defaultValue={currentLocation.email} />
                        </div>
                        <div className="form-input-container has-value">
                          <label className="form-label">Phone</label>
                          <input type="tel" className="form-input-text" defaultValue={currentLocation.phone} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social contact */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Social contact</h3>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container">
                        <label className="form-label">Website</label>
                        <input type="url" className="form-input-text" defaultValue="" placeholder="Website" />
                      </div>
                      <div className="location-form-row">
                        <div className="form-input-container">
                          <label className="form-label">X</label>
                          <input type="text" className="form-input-text" defaultValue="" placeholder="X" />
                        </div>
                        <div className="form-input-container">
                          <label className="form-label">Instagram</label>
                          <input type="text" className="form-input-text" defaultValue="" placeholder="Instagram" />
                        </div>
                      </div>
                      <div className="form-input-container">
                        <label className="form-label">Facebook</label>
                        <input type="text" className="form-input-text" defaultValue="" placeholder="Facebook" />
                      </div>
                    </div>
                  </div>

                  {/* Branding */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Branding</h3>
                        <p className="card-subtitle">Customize your customer facing touchpoints like receipts, invoices, appointment booking flow, and checkout screens with your brand's color and logo.</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="location-brand-row">
                        <div className="location-brand-logo" style={{ background: brand.color }}>
                          {brandLogos[activeBrand] ? (
                            <img src={brandLogos[activeBrand]} alt="" width="28" height="28" style={{ objectFit: 'contain' }} />
                          ) : (
                            <span style={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>{brand.name.charAt(0)}</span>
                          )}
                        </div>
                        <span className="location-brand-name">{brand.name} brand</span>
                        <button className="location-brand-edit" aria-label="Edit branding">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4745 5.40802L18.5917 7.52518M17.8358 3.68549L12.1086 9.41274C11.8131 9.70819 11.6116 10.0838 11.5296 10.4933L11.0001 13.0001L13.5069 12.4706C13.9164 12.3886 14.292 12.1871 14.5875 11.8916L20.3147 6.16437C20.9991 5.47998 20.9991 4.36988 20.3147 3.68549C19.6303 3.00109 18.5202 3.00109 17.8358 3.68549Z" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 15V18C19 19.1046 18.1046 20 17 20H6C4.89543 20 4 19.1046 4 18V7C4 5.89543 4.89543 5 6 5H9" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Business hours */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Business hours</h3>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container has-value">
                        <label className="form-label">Time Zone</label>
                        <div className="mcc-dropdown-value">
                          <span className="form-input-text">{currentLocation.timezone}</span>
                          <svg className="mcc-dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
                          </svg>
                        </div>
                      </div>

                      <div className="location-hours-section">
                        <h4 className="location-hours-heading">Regular hours</h4>
                        <p className="location-hours-desc">Let your clients know when you're open.</p>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <div key={day} className="location-hours-row">
                            <label className="location-hours-check">
                              <input type="checkbox" />
                              <span>{day}</span>
                            </label>
                            <div className="location-hours-inputs">
                              <input type="text" className="location-hours-time" placeholder="Closed" disabled />
                              <input type="text" className="location-hours-time" placeholder="Closed" disabled />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="location-hours-section">
                        <h4 className="location-hours-heading">Special hours</h4>
                        <p className="location-hours-desc">Let your clients know when your hours are different from your regular hours.</p>
                        <button className="location-special-hours-btn">Add special hours</button>
                      </div>
                    </div>
                  </div>

                  {/* Bank information */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Bank information</h3>
                        <p className="card-subtitle">All payments for this location will be transferred into the account below. You may choose an optional transfer tag to distinguish between locations on your bank statement.</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container">
                        <label className="form-label">Transfer account</label>
                        <div className="mcc-dropdown-value">
                          <span className="form-input-text" style={{ color: '#959595' }}>Transfer account</span>
                          <svg className="mcc-dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
                          </svg>
                        </div>
                      </div>
                      <div className="form-input-container">
                        <label className="form-label">Transfer tag</label>
                        <input type="text" className="form-input-text" defaultValue="" placeholder="Transfer tag" />
                      </div>
                    </div>
                  </div>

                  {/* Preferred language */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Preferred language</h3>
                        <p className="card-subtitle">Set the language for Square emails.</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container has-value">
                        <label className="form-label">Select language</label>
                        <div className="mcc-dropdown-value">
                          <span className="form-input-text">English</span>
                          <svg className="mcc-dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match item library from another location */}
                  <div className="card card-modal card--no-divider">
                    <div className="card-header">
                      <div className="card-header-info">
                        <h3 className="card-title">Match item library from another location</h3>
                        <p className="card-subtitle">Matching another location's item library will <strong>overwrite all the items, modifiers, taxes, menus, and floor plans</strong> of the {currentLocation.name} location with the respective information of the location selected below.</p>
                      </div>
                    </div>
                    <div className="v3-form-fields">
                      <div className="form-input-container">
                        <label className="form-label">Location</label>
                        <div className="mcc-dropdown-value">
                          <span className="form-input-text" style={{ color: '#959595' }}>Location</span>
                          <svg className="mcc-dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Modal */}
        {(isTransferModalOpen || isTransferModalClosing) && (
          <div className={`switch-business-modal-overlay ${isTransferModalClosing ? 'closing' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) handleCloseTransferModal() }}>
            <div className={`switch-business-modal transfer-modal ${isTransferModalClosing ? 'closing' : ''}`}>
              <div className="switch-business-modal-header">
                <h2 className="switch-business-modal-title">Transfer of account not available</h2>
              </div>
              <div className="transfer-modal-body">
                <p>Transfer of account ownership is currently not available for the following reasons:</p>
                <ol className="transfer-modal-list">
                  <li>To be eligible for transfer, your account must have Taxpayer Information with an EIN or SSN on file for all locations, including inactive locations.</li>
                  <li>This account has been frozen or your payments have been disabled.</li>
                  <li>This account is not eligible for transfer.</li>
                  <li>We are reviewing your identity details to finish setting up your account. This usually takes a few days. Once verified, you will be able to transfer your business.</li>
                </ol>
                <p>Visit Square Support to <a href="https://squareup.com/help" target="_blank" rel="noopener noreferrer" className="transfer-modal-link">learn more</a> about the requirements.</p>
              </div>
              <div className="transfer-modal-footer">
                <button type="button" className="transfer-modal-close-btn" onClick={handleCloseTransferModal}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Location Name Dialog */}
        {(isLocationNameDialogOpen || isLocationNameDialogClosing) && (
          <div className={`switch-business-modal-overlay ${isLocationNameDialogClosing ? 'closing' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) handleCloseLocationNameDialog() }}>
            <div className={`switch-business-modal transfer-modal ${isLocationNameDialogClosing ? 'closing' : ''}`}>
              <div className="switch-business-modal-header">
                <h2 className="switch-business-modal-title">Location details</h2>
              </div>
              <div className="transfer-modal-body">
                <p>Your location business name is what appears on your customers' bank statements and the receipts you issue. This name is typically your Doing Business As (DBA) name, the one most familiar to your customers. This helps customers recognize your transactions, reducing confusion and chargebacks. Enhancing it with additional details like your store's location or a brief description of your products or services can further aid customer recall.</p>
              </div>
              <div className="transfer-modal-footer transfer-modal-footer--two-btn">
                <a href="https://squareup.com/help" target="_blank" rel="noopener noreferrer" className="transfer-modal-learn-btn">Learn more</a>
                <button type="button" className="transfer-modal-done-btn" onClick={handleCloseLocationNameDialog}>Done</button>
              </div>
            </div>
          </div>
        )}

        {/* Location Group Dialog */}
        {(isLocationGroupDialogOpen || isLocationGroupDialogClosing) && (
          <div className={`switch-business-modal-overlay ${isLocationGroupDialogClosing ? 'closing' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) handleCloseLocationGroupDialog() }}>
            <div className={`switch-business-modal transfer-modal location-group-modal ${isLocationGroupDialogClosing ? 'closing' : ''}`}>
              <div className="location-group-modal-header">
                <button className="location-group-close" onClick={handleCloseLocationGroupDialog} aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button type="button" className={`location-group-create-btn ${locationGroupName.trim() ? 'location-group-create-btn--active' : ''}`} disabled={!locationGroupName.trim()} onClick={() => { setLocationGroups([...locationGroups, { name: locationGroupName.trim(), desc: locationGroupDesc.trim(), locations: 0 }]); handleCloseLocationGroupDialog(); }}>Create</button>
              </div>
              <div className="switch-business-modal-header">
                <h2 className="switch-business-modal-title">Create a location group</h2>
              </div>
              <div className="transfer-modal-body">
                <div className="v3-form-fields" style={{ paddingTop: 0 }}>
                  <div className="form-input-container">
                    <label className="form-label">Group name</label>
                    <input type="text" className="form-input-text" placeholder="Group name" value={locationGroupName} onChange={(e) => { setLocationGroupName(e.target.value); e.target.parentElement.classList.toggle('has-value', e.target.value.length > 0); }} onBlur={(e) => e.target.parentElement.classList.toggle('has-value', e.target.value.length > 0)} />
                  </div>
                  <div className="location-textarea-wrap">
                    <div className="form-input-container v3-textarea-field location-group-textarea">
                      <label className="form-label">Description</label>
                      <textarea className="form-textarea" value={locationGroupDesc} placeholder="" maxLength={1024} onChange={(e) => { setLocationGroupDesc(e.target.value); e.target.parentElement.classList.toggle('has-value', e.target.value.length > 0); }} onBlur={(e) => e.target.parentElement.classList.toggle('has-value', e.target.value.length > 0)} />
                    </div>
                    <span className="form-char-count">{locationGroupDesc.length}/1024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deactivation Modal */}
        {(isDeactivateModalOpen || isDeactivateModalClosing) && (
          <div className={`switch-business-modal-overlay ${isDeactivateModalClosing ? 'closing' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) handleCloseDeactivateModal() }}>
            <div className={`switch-business-modal deactivate-modal ${isDeactivateModalClosing ? 'closing' : ''}`}>
              <button className="switch-business-modal-close" onClick={handleCloseDeactivateModal} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {deactivateStep === 'reason' && (
                <>
                  <div className="switch-business-modal-header">
                    <h2 className="switch-business-modal-title">Reason For Deactivation</h2>
                  </div>
                  <div className="deactivate-options">
                    {[
                      'My business is closed.',
                      "My reader isn't working.",
                      "Square's fees and pricing.",
                      "Square doesn't offer features for my business needs.",
                      'My mobile device is incompatible with Square.',
                      'My bank account is unsupported.',
                      'Ability to contact Support.',
                      'Accidentally created multiple accounts.',
                      'Other reason for deactivating.'
                    ].map((reason) => (
                      <label key={reason} className="deactivate-option" onClick={() => setDeactivateReason(reason)}>
                        <span className={`deactivate-radio ${deactivateReason === reason ? 'selected' : ''}`} />
                        <span className="deactivate-option-label">{reason}</span>
                      </label>
                    ))}
                  </div>
                  <div className="deactivate-comments">
                    <h4 className="deactivate-comments-title">Additional Comments</h4>
                    <textarea
                      className="deactivate-comments-textarea"
                      placeholder="Please enter any additional comments here."
                      value={deactivateComments}
                      onChange={(e) => setDeactivateComments(e.target.value)}
                      rows="4"
                    />
                  </div>
                  <div className="deactivate-modal-footer">
                    <button type="button" className="deactivate-modal-cancel" onClick={handleCloseDeactivateModal}>Cancel</button>
                    <button type="button" className={`deactivate-modal-continue ${deactivateReason ? '' : 'disabled'}`} disabled={!deactivateReason} onClick={() => setDeactivateStep('password')}>Continue</button>
                  </div>
                </>
              )}

              {deactivateStep === 'password' && (
                <>
                  <div className="switch-business-modal-header">
                    <h2 className="switch-business-modal-title">Account Password Required</h2>
                  </div>
                  <div className="deactivate-password-section">
                    <div className="form-input-container has-value deactivate-password-field">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-input-text"
                        placeholder="Current Square Account Password"
                        value={deactivatePassword}
                        onChange={(e) => setDeactivatePassword(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <p className="deactivate-password-helper">For account protection, your current Square account password is required to save changes to your settings.</p>
                  </div>
                  <div className="deactivate-modal-footer">
                    <button type="button" className="deactivate-modal-cancel" onClick={handleCloseDeactivateModal}>Cancel</button>
                    <button type="button" className={`deactivate-modal-continue ${deactivatePassword ? '' : 'disabled'}`} disabled={!deactivatePassword}>Confirm</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Confirmation Dialogs */}
        <ConfirmDialog
          isOpen={confirmDialog?.type === 'cashTag'}
          isClosing={isConfirmClosing && confirmDialog?.type === 'cashTag'}
          title="Rename your $cashtag?"
          confirmLabel="Save"
          onConfirm={handleConfirm}
          onCancel={() => { setPendingDialogs([]); handleCloseConfirm() }}
        >
          <p>You have <strong>{2 - cashTagRenamesUsed} change{2 - cashTagRenamesUsed === 1 ? '' : 's'} remaining</strong>. After 2 changes, any further $cashtag updates will require contacting <strong><u>support</u></strong>.</p>
        </ConfirmDialog>

        <ConfirmDialog
          isOpen={confirmDialog?.type === 'businessName'}
          isClosing={isConfirmClosing && confirmDialog?.type === 'businessName'}
          title="Update business name?"
          confirmLabel="Save"
          onConfirm={handleConfirm}
          onCancel={() => { setPendingDialogs([]); handleCloseConfirm() }}
        >
          <p>You have <strong>{3 - nameChangesUsed} change{3 - nameChangesUsed === 1 ? '' : 's'} remaining</strong> this year. Updating your legal business name, display business name, or both counts as 1 change. After 3 changes, any further updates will require contacting <strong><u>support</u></strong>.</p>
        </ConfirmDialog>

        {/* Success Toast */}
        {toast && (
          <div className="toast">
            <div className="toast-content">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.2584 9.1502L11.2584 16.1502C11.0684 16.3718 10.7915 16.4998 10.4996 16.4998C10.2078 16.4997 9.93077 16.3718 9.74083 16.1502L6.74083 12.6502L8.25841 11.3494L10.4996 13.9637L15.7408 7.84941L17.2584 9.1502Z" fill="#00B23B"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4.92833 4.92852C8.8335 1.02335 15.1657 1.02349 19.0709 4.92852C22.9762 8.83376 22.9762 15.1659 19.0709 19.0711C15.1657 22.9763 8.83358 22.9763 4.92833 19.0711C1.02331 15.1658 1.02316 8.83369 4.92833 4.92852ZM17.6568 6.34258C14.5326 3.21861 9.46652 3.21846 6.3424 6.34258C3.21828 9.4667 3.21842 14.5328 6.3424 17.657C9.46659 20.7812 14.5327 20.7812 17.6568 17.657C20.781 14.5328 20.781 9.46677 17.6568 6.34258Z" fill="#00B23B"/>
              </svg>
              <span>{toast.message}</span>
            </div>
            <button className="toast-dismiss" onClick={() => setToast(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#FFFFFF"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    )

}

export default BaseProfilePage
