import { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import OnboardingPage from './OnboardingPage'
import CheckIcon from '../assets/Check.svg'
import CheckSelectionIcon from '../assets/Check-selection.svg'
import map1 from '../assets/map-1.png'
import map2 from '../assets/map-2.png'
import map3 from '../assets/map-3.png'
import './Dashboard.css'
import './BaseProfilePage.css'

// Brand logos
import joyBakeshopLogo from '../assets/joy-bakeshop-logo.svg'
import bfbLogo from '../assets/Product review 12/bfb-logo.svg'
import kjLogo from '../assets/Product review 12/kj-logo.svg'
import spotOfTeaLogo from '../assets/Product review 12/spot-of-tea-logo.svg'
import vanillaCafeLogo from '../assets/Product review 12/vanilla-cafe-logo.svg'
import teaMonksLogo from '../assets/Product review 12/tea-monks-logo.svg'
import paperSonCoffeeLogo from '../assets/Product review 12/paper-son-coffee-logo.svg'
import multiBrandIcon from '../assets/multi-brand.svg'
import CaretDownIcon from '../assets/16/caret-down.svg'

const brandLogos = {
  'joy-bakeshop': joyBakeshopLogo,
  'brooklyn-french-bakers': bfbLogo,
  'keva-juice': kjLogo,
  'spot-of-tea': spotOfTeaLogo,
  'vanilla-cafe': vanillaCafeLogo,
  'tea-monks': teaMonksLogo,
  'paper-son-coffee': paperSonCoffeeLogo
}

const businesses = [
  { id: 'joy-bakeshop', name: 'Joy Bakeshop', handle: '$joybakeshop' },
  { id: 'keva-juice', name: 'Keva Juice', handle: '$kevasmoothie' },
  { id: 'spot-of-tea', name: 'Spot of Tea', handle: '$drinkspotoftea' },
  { id: 'paper-son-coffee', name: 'Paper Son Coffee', handle: '$papersoncoffee' }
]

function getMonogram(name) {
  const words = name.split(' ')
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
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
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 },
      { id: 'ansley-park', name: 'Ansley Park', address: '149 Peachtree Cir NE, Atlanta, GA 30309', phone: '(404) 555-0456', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map2 },
      { id: 'virginia-highland', name: 'Virginia-Highland', address: '1034 N Highland Ave NE, Atlanta, GA 30306', phone: '(404) 555-0789', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map3 }
    ]
  },
  'keva-juice': { 
    name: 'Keva Juice', 
    color: '#FF6B35', 
    handle: '$kevasmoothie',
    about: "Keva Juice is Reno, Nevada and Colorado Springs' oldest smoothie, açaí, and juice bar, proudly serving our community for more than 20 years. As a family-owned business, our passion for providing the best smoothies, açaí bowls, and fresh juices has helped us become the go-to local spot for healthy and delicious drinks.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 },
      { id: 'ansley-park', name: 'Ansley Park', address: '149 Peachtree Cir NE, Atlanta, GA 30309', phone: '(404) 555-0456', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map2 },
      { id: 'virginia-highland', name: 'Virginia-Highland', address: '1034 N Highland Ave NE, Atlanta, GA 30306', phone: '(404) 555-0789', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map3 }
    ]
  },
  'spot-of-tea': { 
    name: 'Spot of Tea', 
    color: '#2A67B0', 
    handle: '$drinkspotoftea',
    about: "Spot of Tea is a neighborhood tea house, started right here in DC. Whenever you walk through our door, our mission is to make sure you leave feeling refreshed, every time!",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 },
      { id: 'ansley-park', name: 'Ansley Park', address: '149 Peachtree Cir NE, Atlanta, GA 30309', phone: '(404) 555-0456', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map2 },
      { id: 'virginia-highland', name: 'Virginia-Highland', address: '1034 N Highland Ave NE, Atlanta, GA 30306', phone: '(404) 555-0789', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map3 }
    ]
  },
  'vanilla-cafe': { 
    name: 'Vanilla Cafe', 
    color: '#4D6242', 
    handle: '$vanillacafemia',
    about: "Vanilla – coffee & patisserie. Offering specialty coffee, non-alcoholic cocktails, all-day breakfast, lunch, and signature desserts. Discover the best of Slavic comfort food, croissants, and elegant sweets.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 },
      { id: 'ansley-park', name: 'Ansley Park', address: '149 Peachtree Cir NE, Atlanta, GA 30309', phone: '(404) 555-0456', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map2 },
      { id: 'virginia-highland', name: 'Virginia-Highland', address: '1034 N Highland Ave NE, Atlanta, GA 30306', phone: '(404) 555-0789', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map3 }
    ]
  },
  'tea-monks': { 
    name: 'Tea Monks', 
    color: '#A66800', 
    handle: '$teamonks',
    about: "Tea Monks has been crafting delicious freshly brewed Boba Tea drinks made with premium all-natural high-quality ingredients like tea leaves, creamers and toppings etc imported from Taiwan.",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 },
      { id: 'ansley-park', name: 'Ansley Park', address: '149 Peachtree Cir NE, Atlanta, GA 30309', phone: '(404) 555-0456', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map2 },
      { id: 'virginia-highland', name: 'Virginia-Highland', address: '1034 N Highland Ave NE, Atlanta, GA 30306', phone: '(404) 555-0789', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map3 }
    ]
  },
  'paper-son-coffee': { 
    name: 'Paper Son Coffee', 
    color: '#2B6058', 
    handle: '$papersoncoffee',
    about: "Classic and Asian American inspired multi roaster coffee stand in the Dogpatch SF!",
    locations: [
      { id: 'brookhaven', name: 'Brookhaven', address: '3100 Lanier Dr NE, Atlanta, GA 30319', phone: '(404) 555-0123', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map1 },
      { id: 'ansley-park', name: 'Ansley Park', address: '149 Peachtree Cir NE, Atlanta, GA 30309', phone: '(404) 555-0456', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map2 },
      { id: 'virginia-highland', name: 'Virginia-Highland', address: '1034 N Highland Ave NE, Atlanta, GA 30306', phone: '(404) 555-0789', hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm', map: map3 }
    ]
  }
}

function Dashboard() {
  const [activeBrand, setActiveBrand] = useState('joy-bakeshop')
  const [pageState, setPageState] = useState('day-one') // Default to Neighborhoods "day-one" state
  const [activePage, setActivePage] = useState('settings') // Default to settings for migrated profile dev
  const [sidebarLevel, setSidebarLevel] = useState('settings') // 'main' = Home selected; 'online' = Online submenu
  const [isNavigating, setIsNavigating] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState(null)
  const [profileVersion, setProfileVersion] = useState('v2') // 'v1' or 'v2'
  const [activeSettingsSection, setActiveSettingsSection] = useState('business-profile') // Settings page left sidebar section
  const [isPreviewVisible, setIsPreviewVisible] = useState(true) // Right sidebar preview visibility
  const [isAccountBladeOpen, setIsAccountBladeOpen] = useState(false) // Account blade visibility
  const [isAccountBladeClosing, setIsAccountBladeClosing] = useState(false)
  const [isBladeMoreDropdownOpen, setIsBladeMoreDropdownOpen] = useState(false)
  const [isSwitchBusinessModalOpen, setIsSwitchBusinessModalOpen] = useState(false) // Switch business modal
  const [isSwitchBusinessModalClosing, setIsSwitchBusinessModalClosing] = useState(false)
  const [switchingToBusiness, setSwitchingToBusiness] = useState(null) // Track which business is being switched to
  const [hasEnteredDashboard, setHasEnteredDashboard] = useState(true) // Skip onboarding; start on v3 home dashboard
  const [customerViewMode, setCustomerViewMode] = useState('new-2') // 'new-1' | 'new-2' | 'returning' - drives Banner + v3 copy
  
  // Theme: light / dark, persisted to localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') return stored
    } catch (_) {}
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (_) {}
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Handle navigation - show overlay first, then change page while covered
  const handleNavigationStart = (targetPage, targetPageState) => {
    // Show loading overlay immediately
    setIsNavigating(true)
    
    // Store the pending navigation
    setPendingNavigation({ page: targetPage, state: targetPageState })
    
    // Change page after overlay is visible (next frame + small buffer)
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (targetPage) {
          setActivePage(targetPage)
          // Only reset settings section when first navigating to Settings from another page (not when clicking a submenu item)
          if (targetPage === 'settings' && activePage !== 'settings') {
            setActiveSettingsSection('business-profile')
          }
        }
        if (targetPageState) {
          setPageState(targetPageState)
        }
        setPendingNavigation(null)
        
        // Hide overlay after content has rendered
        setTimeout(() => {
          setIsNavigating(false)
        }, 200)
      }, 50)
    })
  }
  
  // Store brand state per brand (persists during session)
  const [brandStates, setBrandStates] = useState({
    // Each brand will have: { brandConfigured: false, configuredLocations: [] }
  })
  
  const brand = brandData[activeBrand] || brandData['joy-bakeshop']
  
  // Get current brand's state
  const currentBrandState = brandStates[activeBrand] || { brandConfigured: false, configuredLocations: [] }
  
  // Handler to update brand state
  const handleBrandStateChange = (newState) => {
    setBrandStates({
      ...brandStates,
      [activeBrand]: newState
    })
  }
  
  // Handler to reload/reset current brand
  const handleReloadBrand = () => {
    setBrandStates({
      ...brandStates,
      [activeBrand]: { brandConfigured: false, configuredLocations: [] }
    })
  }
  
  // Track previous page and brand to detect navigation changes
  const prevPageRef = useRef(activePage)
  const prevBrandRef = useRef(activeBrand)
  
  // Set Neighborhoods tab to appropriate state when navigating there or switching brands
  useEffect(() => {
    const justNavigatedToNeighborhoods = activePage === 'neighborhoods' && prevPageRef.current !== 'neighborhoods'
    const justChangedBrand = activeBrand !== prevBrandRef.current
    
    // Update refs
    prevPageRef.current = activePage
    prevBrandRef.current = activeBrand
    
    // Only auto-set pageState when first navigating to neighborhoods or changing brands
    if (activePage === 'neighborhoods' && (justNavigatedToNeighborhoods || justChangedBrand)) {
      const hasLocation = currentBrandState.configuredLocations && currentBrandState.configuredLocations.length > 0
      const hasOnlineOrdering = currentBrandState.configuredLocations?.some(location => 
        location.services?.some(service => service.type === 'online-ordering')
      )
      
      if (hasLocation && hasOnlineOrdering) {
        setPageState('month-over-month')
      } else {
        setPageState('day-one')
      }
    }
  }, [activeBrand, currentBrandState, activePage])
  
  // Keep sidebar on correct level: main for home/profile/add-more, online for website/ordering/neighborhoods/etc.
  useEffect(() => {
    if (activePage === 'home' || activePage === 'profile' || activePage === 'add-more' || (profileVersion === 'v2' && activePage === 'neighborhoods')) {
      setSidebarLevel('main')
    } else if (['website', 'online-ordering', 'online-booking', 'online-shopping', 'neighborhoods', 'channels'].includes(activePage)) {
      setSidebarLevel('online')
    }
  }, [activePage, profileVersion])
  
  // Modal state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
  const [isBrandModalClosing, setIsBrandModalClosing] = useState(false)
  
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
    { id: 'table-ordering', label: 'Table ordering', title: 'Configure your table ordering', optional: true },
    { id: 'recommended', label: 'Recommended', title: 'Get the most out of your profile', optional: true }
  ])
  
  // Multi-step flow state (Brand modal)
  const [brandCurrentStepIndex, setBrandCurrentStepIndex] = useState(0)
  const [brandCompletedSteps, setBrandCompletedSteps] = useState([])
  const [isBrandNextLoading, setIsBrandNextLoading] = useState(false)
  const [isBrandTransitioning, setIsBrandTransitioning] = useState(false)
  const [brandSteps, setBrandSteps] = useState([
    { id: 'brand-details', label: 'Brand information', title: 'Confirm your brand details', optional: false },
    { id: 'logo-color', label: 'Logo & color', title: 'Customize your brand card', optional: false },
    { id: 'checkout-policies', label: 'Cash App', title: 'Configure your checkout and store policies', optional: false }
  ])
  
  // Location data state
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
  
  // Brand customization state
  const [brandName, setBrandName] = useState(brand.name)
  const [brandUrl, setBrandUrl] = useState(`cash.app/${brand.handle}`)
  const [brandCashtag, setBrandCashtag] = useState(brand.handle)
  const [brandAbout, setBrandAbout] = useState('A neighborhood bakery serving fresh pastries and artisan breads daily.')
  const [brandLogo, setBrandLogo] = useState('')
  const [brandColor, setBrandColor] = useState(brand.color)
  
  // Modal handlers
  const handleOpenLocationModal = () => {
    setIsLocationModalOpen(true)
  }
  
  const handleCloseLocationModal = () => {
    setIsModalClosing(true)
    setTimeout(() => {
      setIsLocationModalOpen(false)
      setIsModalClosing(false)
      setCurrentStepIndex(0)
      setCompletedSteps([])
      setIsNextLoading(false)
      setIsTransitioning(false)
      setIsEditingNickname(false)
      setIsEditingAddress(false)
      setIsEditingPhone(false)
      setIsEditingHours(false)
      setNickname('Brookhaven')
      setAddressLine1('3100 Lanier Dr NE')
      setAddressLine2('')
      setCity('Atlanta')
      setState('GA')
      setZipCode('30319')
      setPhoneNumber('(404) 555-0123')
      setLocationHours('Mon-Fri 8am-8pm, Sat-Sun 9am-6pm')
    }, 350)
  }
  
  const handleOpenBrandModal = () => {
    setIsBrandModalOpen(true)
  }
  
  const handleCloseBrandModal = () => {
    setIsBrandModalClosing(true)
    setTimeout(() => {
      setIsBrandModalOpen(false)
      setIsBrandModalClosing(false)
      setBrandCurrentStepIndex(0)
      setBrandCompletedSteps([])
      setIsBrandNextLoading(false)
      setIsBrandTransitioning(false)
    }, 350)
  }

  // Account blade handlers
  const handleOpenAccountBlade = () => {
    setIsAccountBladeOpen(true)
  }

  const handleCloseAccountBlade = () => {
    setIsBladeMoreDropdownOpen(false)
    setIsAccountBladeClosing(true)
    setTimeout(() => {
      setIsAccountBladeOpen(false)
      setIsAccountBladeClosing(false)
    }, 300)
  }

  const handleBladeSelectBusiness = (businessId) => {
    if (businessId === activeBrand) {
      handleCloseAccountBlade()
      return
    }
    setSwitchingToBusiness(businessId)
    setTimeout(() => {
      setActiveBrand(businessId)
      setSwitchingToBusiness(null)
      setTimeout(() => {
        handleCloseAccountBlade()
      }, 400)
    }, 800)
  }

  // Handle Edit button in blade - navigate to business profile
  const handleBladeEditClick = () => {
    handleCloseAccountBlade()
    // Navigate to online > business profile
    setSidebarLevel('online')
    handleNavigationStart('profile', 'base-profile')
  }

  // Switch business modal handlers
  const handleOpenSwitchBusinessModal = () => {
    // If blade is open, close it first then open modal
    if (isAccountBladeOpen) {
      setIsAccountBladeClosing(true)
      setTimeout(() => {
        setIsAccountBladeOpen(false)
        setIsAccountBladeClosing(false)
        setIsSwitchBusinessModalOpen(true)
      }, 300)
    } else {
      setIsSwitchBusinessModalOpen(true)
    }
  }

  const handleCloseSwitchBusinessModal = () => {
    setIsSwitchBusinessModalClosing(true)
    setTimeout(() => {
      setIsSwitchBusinessModalOpen(false)
      setIsSwitchBusinessModalClosing(false)
    }, 250) // Match the CSS animation duration
  }

  const handleSelectBusiness = (businessId) => {
    // If clicking the already active business, just close modal
    if (businessId === activeBrand) {
      handleCloseSwitchBusinessModal()
      return
    }
    
    // Show spinner on the selected business
    setSwitchingToBusiness(businessId)
    
    // Spinner spins for a bit
    setTimeout(() => {
      // Switch the brand (check will now appear)
      setActiveBrand(businessId)
      setSwitchingToBusiness(null)
      
      // Wait with check visible, then close modal
      setTimeout(() => {
        handleCloseSwitchBusinessModal()
      }, 500)
    }, 800)
  }

  const generateLocationSummary = () => {
    const summary = `${nickname} address confirmed with Google, open ${locationHours}, with customer-facing phone number.`
    return summary
  }

  const handleNextStep = () => {
    const currentStep = steps[currentStepIndex]
    
    if (currentStepIndex === 0) {
      setIsNextLoading(true)
      const selectedLocation = availableLocations.find(loc => loc.selected)
      if (selectedLocation) {
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
        }
      }
      setTimeout(() => {
        setIsNextLoading(false)
        setCurrentStepIndex(1)
      }, 800)
      return
    }
    
    if (currentStepIndex === 1) {
      setIsNextLoading(true)
      const summary = generateLocationSummary()
      const customLabel = `${nickname} location confirmed`
      setTimeout(() => {
        setIsNextLoading(false)
        setIsTransitioning(true)
        setTimeout(() => {
          setCompletedSteps([...completedSteps, { ...currentStep, summary, label: customLabel }])
          setCurrentStepIndex(currentStepIndex + 1)
          setIsTransitioning(false)
        }, 100)
      }, 800)
      return
    }
    
    setIsNextLoading(true)
    setTimeout(() => {
      setIsNextLoading(false)
      let stepToAdd = currentStep
      if (currentStepIndex === 2) {
        const orderingSummary = "Pickup and delivery enabled, 15-minute prep, limited to hours, tickets print by ready time, no caps or scheduling."
        const customLabel = "Online ordering enabled for pickup and delivery"
        stepToAdd = { ...currentStep, summary: orderingSummary, label: customLabel }
      } else if (currentStepIndex === 3) {
        const customLabel = "Voice ordering phone number requested"
        stepToAdd = { ...currentStep, label: customLabel }
      } else if (currentStepIndex === 4) {
        const customLabel = `QR codes connected to ${nickname}`
        stepToAdd = { ...currentStep, label: customLabel }
      }
      setCompletedSteps([...completedSteps, stepToAdd])
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1)
      } else {
        setPageState('1-location')
        handleCloseLocationModal()
      }
    }, 800)
  }

  const handleSkipStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      handleCloseLocationModal()
    }
  }

  const handleChangeLocation = () => {
    setCurrentStepIndex(0)
  }

  const handleEditStep = (stepId) => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    if (stepIndex !== -1) {
      const newCompleted = completedSteps.filter((_, idx) => idx < completedSteps.findIndex(s => s.id === stepId))
      setCompletedSteps(newCompleted)
      setCurrentStepIndex(stepIndex)
    }
  }

  const handleBrandNextStep = () => {
    const currentStep = brandSteps[brandCurrentStepIndex]
    
    if (brandCurrentStepIndex === 0) {
      setIsBrandNextLoading(true)
      const customLabel = `cash.app/${brand.handle} is live and ready`
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
    
    setIsBrandNextLoading(true)
    setTimeout(() => {
      setIsBrandNextLoading(false)
      let stepToAdd = currentStep
      if (brandCurrentStepIndex === 1) {
        const customLabel = "Brand is looking solid!"
        stepToAdd = { ...currentStep, label: customLabel }
      } else if (brandCurrentStepIndex === 2) {
        const customLabel = "Checkout, tips, taxes, policies, and charges are confirmed"
        stepToAdd = { ...currentStep, label: customLabel }
      }
      setBrandCompletedSteps([...brandCompletedSteps, stepToAdd])
      if (brandCurrentStepIndex < brandSteps.length - 1) {
        setBrandCurrentStepIndex(brandCurrentStepIndex + 1)
      } else {
        setPageState('1-location')
        handleCloseBrandModal()
      }
    }, 800)
  }

  const handleBrandSkipStep = () => {
    if (brandCurrentStepIndex < brandSteps.length - 1) {
      setBrandCurrentStepIndex(brandCurrentStepIndex + 1)
    } else {
      setPageState('1-location')
      handleCloseBrandModal()
    }
  }

  const handleBrandEditStep = (stepId) => {
    const stepIndex = brandSteps.findIndex(s => s.id === stepId)
    if (stepIndex !== -1) {
      const newCompleted = brandCompletedSteps.filter((_, idx) => idx < brandCompletedSteps.findIndex(s => s.id === stepId))
      setBrandCompletedSteps(newCompleted)
      setBrandCurrentStepIndex(stepIndex)
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

  const handleEditNickname = () => setIsEditingNickname(true)
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
      }, 1000)
    }, 500)
  }

  const handleEditAddress = () => setIsEditingAddress(true)
  const handleCancelAddressEdit = () => {
    setIsEditingAddress(false)
    setAddressLine1('3100 Lanier Dr NE')
    setAddressLine2('')
    setCity('Atlanta')
    setState('GA')
    setZipCode('30319')
  }
  const handleSaveAddress = () => {
    setIsSavingAddress(true)
    setTimeout(() => {
      setIsSavingAddress('success')
      setTimeout(() => {
        setIsEditingAddress(false)
        setIsSavingAddress(false)
      }, 1000)
    }, 500)
  }

  const handleEditPhone = () => setIsEditingPhone(true)
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
      }, 1000)
    }, 500)
  }

  const handleEditHours = () => setIsEditingHours(true)
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
      }, 1000)
    }, 500)
  }

  // Get page states based on active page
  const getPageStates = () => {
    switch(activePage) {
      case 'neighborhoods':
      default:
        return ['day-one', 'month-over-month']
    }
  }

  const pageStates = getPageStates()

  // Apply brand as data attribute to document root for brand-specific styling
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', activeBrand)
    return () => {
      document.documentElement.removeAttribute('data-brand')
    }
  }, [activeBrand])

  // Handle keyboard navigation with arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle arrow keys if not in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setPageState((currentState) => {
          const currentIndex = pageStates.indexOf(currentState)
          const nextIndex = (currentIndex + 1) % pageStates.length
          return pageStates[nextIndex]
        })
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setPageState((currentState) => {
          const currentIndex = pageStates.indexOf(currentState)
          const prevIndex = (currentIndex - 1 + pageStates.length) % pageStates.length
          return pageStates[prevIndex]
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activePage])

  // Onboarding: full-page view before dashboard (no sidebar)
  if (!hasEnteredDashboard) {
    return (
      <div className="dashboard dashboard--onboarding">
        <OnboardingPage
          brand={brandData[activeBrand] || brandData['joy-bakeshop']}
          onEnterDashboard={() => {
            setHasEnteredDashboard(true)
            setActivePage('home')
          }}
        />
      </div>
    )
  }

  return (
    <div className="dashboard">
      <Sidebar 
        activeBrand={activeBrand} 
        onBrandChange={setActiveBrand}
        onResetToDefaultState={(state) => setPageState(state || 'day-one')}
        activePage={activePage}
        onPageChange={setActivePage}
        sidebarLevel={sidebarLevel}
        onSidebarLevelChange={setSidebarLevel}
        onNavigationStart={handleNavigationStart}
        profileVersion={profileVersion}
        onProfileVersionChange={setProfileVersion}
        onAccountBladeOpen={profileVersion === 'v2' ? () => {
          handleNavigationStart('settings')
          setSidebarLevel('settings')
          setActiveSettingsSection('account-security')
        } : handleOpenAccountBlade}
        isAccountBladeOpen={isAccountBladeOpen}
        onBrandHeaderClick={profileVersion === 'v2' ? handleOpenAccountBlade : () => {
          handleNavigationStart('neighborhoods')
          setSidebarLevel('online')
        }}
        theme={theme}
        onThemeChange={handleThemeToggle}
        onOpenOnboarding={() => setHasEnteredDashboard(false)}
        customerViewMode={customerViewMode}
        onCustomerViewModeChange={setCustomerViewMode}
        activeSettingsSection={activeSettingsSection}
        onSettingsSectionChange={setActiveSettingsSection}
      />
      <MainContent
        activeSettingsSection={activeSettingsSection}
        onSettingsSectionChange={setActiveSettingsSection}
        activeBrand={activeBrand} 
        onBrandChange={setActiveBrand}
        pageState={pageState} 
        onPageStateChange={setPageState}
        activePage={activePage}
        onReloadBrand={handleReloadBrand}
        brandState={currentBrandState}
        onBrandStateChange={handleBrandStateChange}
        isNavigating={isNavigating}
        profileVersion={profileVersion}
        onProfileVersionChange={setProfileVersion}
        isPreviewVisible={isPreviewVisible}
        onPreviewVisibilityChange={setIsPreviewVisible}
        isSwitchBusinessModalOpen={isSwitchBusinessModalOpen}
        isSwitchBusinessModalClosing={isSwitchBusinessModalClosing}
        onSwitchBusinessModalOpen={handleOpenSwitchBusinessModal}
        onSwitchBusinessModalClose={handleCloseSwitchBusinessModal}
        onSelectBusiness={handleSelectBusiness}
        customerViewMode={customerViewMode}
        onCustomerViewModeChange={setCustomerViewMode}
        theme={theme}
        onThemeChange={handleThemeToggle}
        onOpenOnboarding={() => setHasEnteredDashboard(false)}
        onNavigationStart={handleNavigationStart}
        onSidebarLevelChange={setSidebarLevel}
        onAccountBladeOpen={handleOpenAccountBlade}
      />

      {/* Account Blade */}
      {isAccountBladeOpen && (
        <div className={`account-blade-overlay ${isAccountBladeClosing ? 'closing' : ''}`} onClick={handleCloseAccountBlade}>
          <div className={`account-blade ${isAccountBladeClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            {/* Blade Header: close button + Add business (v2) */}
            <div className="account-blade-header">
              <button className="modal-close" onClick={handleCloseAccountBlade}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {profileVersion === 'v2' && (
                <button type="button" className="card-action card-action--tertiary blade-add-business-btn">
                  <span>Add business</span>
                  <img src={CaretDownIcon} alt="" width="16" height="16" />
                </button>
              )}
            </div>

            {profileVersion !== 'v2' && (
              <>
                <div className="account-blade-divider-wrap">
                  <div className="nav-divider"></div>
                </div>

                {/* Account header - avatar, name, Owner */}
                <div className="account-blade-footer" onClick={() => setIsBladeMoreDropdownOpen(false)}>
                  <div className="account-blade-user">
                    <div className="account-blade-avatar">
                      <span className="account-blade-avatar-initials">VO</span>
                      <div className="account-blade-avatar-status"></div>
                    </div>
                    <div className="account-blade-user-info">
                      <span className="account-blade-user-name">Vitaly Odemchuk</span>
                      <span className="account-blade-user-role">Owner</span>
                    </div>
                  </div>
                  <div className="account-blade-more-wrap">
                    <button
                      type="button"
                      className="account-blade-more"
                      onClick={(e) => { e.stopPropagation(); setIsBladeMoreDropdownOpen((prev) => !prev); }}
                      aria-expanded={isBladeMoreDropdownOpen}
                      aria-haspopup="true"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="6" r="2" fill="currentColor"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        <circle cx="12" cy="18" r="2" fill="currentColor"/>
                      </svg>
                    </button>
                    {isBladeMoreDropdownOpen && (
                      <div className="account-blade-more-dropdown" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="account-blade-more-dropdown-item" onClick={() => setIsBladeMoreDropdownOpen(false)}>Link profile</button>
                        <button type="button" className="account-blade-more-dropdown-item account-blade-more-dropdown-item-signout" onClick={() => setIsBladeMoreDropdownOpen(false)}>Sign out</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Button list */}
                <nav className="account-blade-menu">
                  <div className="nav-divider-container">
                    <div className="nav-divider"></div>
                  </div>
                  <button className="nav-item">Account & security</button>
                  <button className="nav-item">Legal & taxes</button>
                  <button className="nav-item">Pricing & subscriptions</button>
                  <button className="nav-item">Preferences</button>
                  <div className="nav-divider-container">
                    <div className="nav-divider"></div>
                  </div>
                </nav>
              </>
            )}

            {/* Brand selector - My businesses, right under button list */}
            <div className="account-blade-brand-container">
              {profileVersion !== 'v2' && (
                <div className="account-blade-brand-title-wrap">
                  <h3 className="account-blade-brand-title">My businesses</h3>
                  <button type="button" className="account-blade-start-business-btn">Start new business</button>
                </div>
              )}
              <div className="account-blade-brand-list">
                <button
                  type="button"
                  className="switch-business-item switch-business-item-all"
                  onClick={() => {}}
                >
                  <div className="switch-business-item-icon switch-business-item-icon-all">
                    <img src={multiBrandIcon} alt="" />
                  </div>
                  <div className="switch-business-item-info">
                    <span className="switch-business-item-name">All businesses</span>
                    <span className="switch-business-item-handle">4 businesses · 12 locations</span>
                  </div>
                </button>
                {businesses.map((business) => {
                  const businessBrand = brandData[business.id] || brandData['joy-bakeshop']
                  return (
                    <button
                      key={business.id}
                      type="button"
                      className={`switch-business-item ${business.id === activeBrand ? 'active' : ''}`}
                      onClick={() => handleBladeSelectBusiness(business.id)}
                    >
                      <div className="switch-business-item-icon">
                        {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                          <div className="switch-business-item-monogram" style={{ background: businessBrand.color }}>
                            <span className="switch-business-monogram-text">{getMonogram(business.name)}</span>
                          </div>
                        ) : (
                          <img src={brandLogos[business.id]} alt={business.name} />
                        )}
                      </div>
                      <div className="switch-business-item-info">
                        <span className="switch-business-item-name">{business.name}</span>
                        <span className="switch-business-item-handle">{business.handle}</span>
                      </div>
                      {switchingToBusiness === business.id ? (
                        <div className="switch-business-item-spinner">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="spinner-icon">
                            <circle cx="10" cy="10" r="8" stroke="#E0E0E0" strokeWidth="2" fill="none"/>
                            <path d="M10 2C14.4183 2 18 5.58172 18 10" stroke="#101010" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          </svg>
                        </div>
                      ) : business.id === activeBrand ? (
                        <div className="switch-business-item-check">
                          <img src={CheckSelectionIcon} alt="" />
                        </div>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Switch Business Modal - rendered at Dashboard level so it appears on any page */}
      {isSwitchBusinessModalOpen && (
        <div className={`switch-business-modal-overlay ${isSwitchBusinessModalClosing ? 'closing' : ''}`} onClick={handleCloseSwitchBusinessModal}>
          <div className={`switch-business-modal ${isSwitchBusinessModalClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="switch-business-modal-close" onClick={handleCloseSwitchBusinessModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="switch-business-modal-header">
              <h2 className="switch-business-modal-title">Switch business</h2>
              <p className="switch-business-modal-subtitle">Select another business tied to Vitaly Odemchuk's account</p>
            </div>
            <div className="switch-business-modal-list">
              {businesses.map((business) => {
                const businessBrand = brandData[business.id] || brandData['joy-bakeshop']
                return (
                <button
                  key={business.id}
                  className={`switch-business-item ${business.id === activeBrand ? 'active' : ''}`}
                  onClick={() => handleSelectBusiness(business.id)}
                >
                  <div className="switch-business-item-icon">
                    {(customerViewMode === 'new-1' || customerViewMode === 'new-2') ? (
                      <div className="switch-business-item-monogram" style={{ background: businessBrand.color }}>
                        <span className="switch-business-monogram-text">{getMonogram(business.name)}</span>
                      </div>
                    ) : (
                      <img src={brandLogos[business.id]} alt={business.name} />
                    )}
                  </div>
                  <div className="switch-business-item-info">
                    <span className="switch-business-item-name">{business.name}</span>
                    <span className="switch-business-item-handle">{business.handle}</span>
                  </div>
                  {switchingToBusiness === business.id ? (
                    <div className="switch-business-item-spinner">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="spinner-icon">
                        <circle cx="10" cy="10" r="8" stroke="#E0E0E0" strokeWidth="2" fill="none"/>
                        <path d="M10 2C14.4183 2 18 5.58172 18 10" stroke="#101010" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      </svg>
                    </div>
                  ) : business.id === activeBrand ? (
                    <div className="switch-business-item-check">
                      <img src={CheckSelectionIcon} alt="" />
                    </div>
                  ) : null}
                </button>
              );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

