import { useState } from 'react'
import './DefaultWebsite.css'

// Brand logos
import jbLogo from '../assets/jb-logo.png'
import bfbLogo from '../assets/Product review 12/bfb-logo.svg'
import kjLogo from '../assets/Product review 12/kj-logo.svg'
import sotLogo from '../assets/Product review 12/spot-of-tea-logo.svg'
import vcLogo from '../assets/Product review 12/vanilla-cafe-logo.svg'
import tmLogo from '../assets/Product review 12/tea-monks-logo.svg'
import pscLogo from '../assets/Product review 12/paper-son-coffee-logo.svg'

// Product images
import item1 from '../assets/website images/_item-1.png'
import item2 from '../assets/website images/_item-2.png'
import item3 from '../assets/website images/_item-3.png'
import item4 from '../assets/website images/_item-4.png'
import item5 from '../assets/website images/_item-5.png'
import item6 from '../assets/website images/_item-6.png'
import item7 from '../assets/website images/_item-7.png'
import item8 from '../assets/website images/_item-8.png'

// Icons
import EllipsisIcon from '../assets/Ellipsis horizontal.svg'
import MapSelectorIcon from '../assets/Map-selector.svg'
import CaretDownIcon from '../assets/16/caret-down.svg'
import CashAppLogo from '../assets/Cash App.svg'

const brandLogos = {
  'joy-bakeshop': jbLogo,
  'brooklyn-french-bakers': bfbLogo,
  'keva-juice': kjLogo,
  'spot-of-tea': sotLogo,
  'vanilla-cafe': vcLogo,
  'tea-monks': tmLogo,
  'paper-son-coffee': pscLogo
}

const brandData = {
  'joy-bakeshop': {
    name: 'Joy Bakeshop',
    handle: '$joybakeshop',
    category: 'Cafe',
    color: '#0000FF',
    about: "We're a small, butter-obsessed bakery making croissants, danishes, and morning buns the old-fashioned way: slow fermentation, real ingredients, and daily bakes. Swing by for flaky layers, seasonal fillings, and coffee that plays nice with pastry.",
    location: 'Brookhaven',
    pickupTime: '15m',
    categories: ['Pastries', 'Bread', 'Sandwiches', 'Coffee and Tea', 'Merch']
  },
  'brooklyn-french-bakers': {
    name: 'Brooklyn French Bakers',
    handle: '$brooklynfrenchbakers',
    category: 'Bakery',
    color: '#FF8C42',
    about: "This store delivers fresh pastries and bread every morning from our kitchen on Columbia Street, Waterfront. Brooklyn French Bakers is owned by French who are passionate about sharing French culture and products.",
    location: 'Waterfront',
    pickupTime: '20m',
    categories: ['Pastries', 'Bread', 'Cakes', 'Coffee', 'Gifts']
  },
  'keva-juice': {
    name: 'Keva Juice',
    handle: '$kevasmoothie',
    category: 'Juice Bar',
    color: '#FF6B35',
    about: "Keva Juice is Reno, Nevada and Colorado Springs' oldest smoothie, açaí, and juice bar, proudly serving our community for more than 20 years.",
    location: 'Downtown',
    pickupTime: '10m',
    categories: ['Smoothies', 'Açaí Bowls', 'Fresh Juice', 'Wellness Shots', 'Snacks']
  },
  'spot-of-tea': {
    name: 'Spot of Tea',
    handle: '$drinkspotoftea',
    category: 'Tea House',
    color: '#4A7C59',
    about: "Spot of Tea is a neighborhood tea house, started right here in DC. Whenever you walk through our door, our mission is to make sure you leave feeling refreshed, every time!",
    location: 'Georgetown',
    pickupTime: '10m',
    categories: ['Hot Tea', 'Iced Tea', 'Specialty Drinks', 'Pastries', 'Gifts']
  },
  'vanilla-cafe': {
    name: 'Vanilla Cafe',
    handle: '$vanillacafemia',
    category: 'Cafe',
    color: '#D4A574',
    about: "Vanilla – coffee & patisserie. Offering specialty coffee, non-alcoholic cocktails, all-day breakfast, lunch, and signature desserts.",
    location: 'Midtown',
    pickupTime: '15m',
    categories: ['Coffee', 'Breakfast', 'Lunch', 'Desserts', 'Drinks']
  },
  'tea-monks': {
    name: 'Tea Monks',
    handle: '$teamonks',
    category: 'Boba Tea',
    color: '#8B4513',
    about: "Tea Monks has been crafting delicious freshly brewed Boba Tea drinks made with premium all-natural high-quality ingredients like tea leaves, creamers and toppings etc imported from Taiwan.",
    location: 'Chinatown',
    pickupTime: '10m',
    categories: ['Milk Tea', 'Fruit Tea', 'Specialty', 'Toppings', 'Snacks']
  },
  'paper-son-coffee': {
    name: 'Paper Son Coffee',
    handle: '$papersoncoffee',
    category: 'Coffee',
    color: '#2F4F4F',
    about: "Classic and Asian American inspired multi roaster coffee stand in the Dogpatch SF!",
    location: 'Dogpatch',
    pickupTime: '10m',
    categories: ['Coffee', 'Tea', 'Pastries', 'Specials', 'Merch']
  }
}

// Sample menu items
const menuItems = {
  'Pastries': [
    { id: 1, name: 'Almond croissant', price: 5.95, image: item1, description: 'Twice-baked croissant with almond frangipane & sliced almonds. Contains: wheat, dairy, eggs, tree nuts.' },
    { id: 2, name: 'Chocolate croissant', price: 5.25, image: item2, description: 'Classic croissant with dark chocolate batons. Contains: wheat, dairy, eggs.' },
    { id: 3, name: 'Plain croissant', price: 4.50, originalPrice: 5.00, image: item3, description: 'Buttery, flaky, slow-fermented croissant. Contains: wheat, dairy, eggs.' },
    { id: 4, name: 'Savory brioche', price: 4.25, image: item4, description: 'Buttery brioche roll with a hint of sea salt and cracked pepper. Contains: wheat, dairy, eggs.' },
    { id: 5, name: 'Savory brioche', price: 4.25, image: item5, description: 'Buttery brioche roll with a hint of sea salt and cracked pepper. Contains: wheat, dairy, eggs.' },
  ],
  'Bread': [
    { id: 6, name: 'Cinnamon roll', price: 5.50, image: item6, description: 'Flaky pastry filled with lemon-vanilla cream cheese. Contains: wheat, dairy, eggs.' },
    { id: 7, name: 'Cheese danish', price: 5.50, image: item7, description: 'Flaky pastry filled with lemon-vanilla cream cheese. Contains: wheat, dairy, eggs.' },
    { id: 8, name: 'Raisin danish', price: 5.25, image: item8, description: 'Buttery laminated spiral studded with plump raisins. Contains: wheat, dairy, eggs.' },
    { id: 9, name: 'Morning bun', price: 5.25, image: item1, description: 'Sugared citrus-kissed roll with caramelized edges. Contains: wheat, dairy, eggs.' },
    { id: 10, name: 'Cinnamon roll', price: 5.50, image: item6, description: 'Flaky pastry filled with lemon-vanilla cream cheese. Contains: wheat, dairy, eggs.' },
    { id: 11, name: 'Cheese danish', price: 5.50, image: item7, description: 'Flaky pastry filled with lemon-vanilla cream cheese. Contains: wheat, dairy, eggs.' },
    { id: 12, name: 'Raisin danish', price: 5.25, image: item8, description: 'Buttery laminated spiral studded with plump raisins. Contains: wheat, dairy, eggs.' },
    { id: 13, name: 'Morning bun', price: 5.25, image: item1, description: 'Sugared citrus-kissed roll with caramelized edges. Contains: wheat, dairy, eggs.' },
  ]
}

function DefaultWebsite({ activeBrand = 'joy-bakeshop', customerViewMode = 'returning' }) {
  const [activeCategory, setActiveCategory] = useState('Pastries')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  
  const brand = brandData[activeBrand] || brandData['joy-bakeshop']
  const logo = brandLogos[activeBrand] || brandLogos['joy-bakeshop']
  const brandColor = brand.color || '#0000FF'
  const categories = brand.categories || ['Pastries', 'Bread', 'Sandwiches', 'Coffee and Tea', 'Merch']
  
  // Get items for current category, fallback to Pastries
  const currentItems = menuItems[activeCategory] || menuItems['Pastries'] || []
  
  const showMonogram = (customerViewMode === 'new-1' || customerViewMode === 'new-2')
  const getMonogram = (name) => {
    const words = name.split(' ')
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }
  const monogram = getMonogram(brand.name)
  
  return (
    <div className="default-website">
      {/* Header */}
      <header className="website-header">
        <div className="header-content">
          <div className="header-left">
            <div className="brand-logo-large" style={showMonogram ? { background: brandColor } : undefined}>
              {showMonogram ? (
                <span className="brand-logo-monogram">{monogram}</span>
              ) : (
                <img src={logo} alt={brand.name} />
              )}
            </div>
            <div className="brand-info">
              <div className="brand-heading">
                <div className="brand-title-group">
                  <h1 className="brand-title">{brand.name}</h1>
                  <p className="brand-meta">
                    <span className="cashtag">{brand.handle}</span>
                    <span className="bullet"> · </span>
                    <span className="tagline">{brand.category}</span>
                  </p>
                </div>
                <p className="brand-about">{brand.about}</p>
              </div>
              
              {/* Location Picker */}
              <div className="location-picker">
                <div className="location-picker-inner">
                  <div className="location-picker-left">
                    <img src={MapSelectorIcon} alt="" width="32" height="32" className="location-map-icon" />
                    <div className="location-text-group">
                      <span className="location-name">{brand.location}</span>
                      <span className="location-dot"></span>
                      <span className="location-pickup">Pickup in {brand.pickupTime}</span>
                    </div>
                  </div>
                  <img src={CaretDownIcon} alt="" width="12" height="12" className="location-caret" />
                </div>
              </div>
            </div>
          </div>
          <div className="header-right">
            <button className="header-more-btn">
              <img src={EllipsisIcon} alt="More" width="18" height="18" />
            </button>
            <button className="header-checkin-btn">Check in</button>
            <button className="header-cart-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 4.5V3.5C4.5 2.39543 5.39543 1.5 6.5 1.5H9.5C10.6046 1.5 11.5 2.39543 11.5 3.5V4.5M2 4.5H14V13.5C14 14.0523 13.5523 14.5 13 14.5H3C2.44772 14.5 2 14.0523 2 13.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Divider */}
      <div className="header-divider"></div>

      {/* Main Content */}
      <main className="website-main">
        <div className="menu-container">
          {/* Sidebar Menu */}
          <aside className="menu-sidebar">
            <h2 className="menu-title">Menu</h2>
            <nav className="menu-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`menu-category ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </nav>
          </aside>

          {/* Products Grid */}
          <section className="products-section">
          {/* Pastries Section */}
          <div className="products-category">
            <div className="category-header">
              <h3 className="category-title">Pastries</h3>
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/>
                    <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/>
                    <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/>
                    <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/>
                  </svg>
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="2" rx="0.5" fill="currentColor"/>
                    <rect x="3" y="7" width="18" height="2" rx="0.5" fill="currentColor"/>
                    <rect x="3" y="11" width="18" height="2" rx="0.5" fill="currentColor"/>
                    <rect x="3" y="15" width="18" height="2" rx="0.5" fill="currentColor"/>
                    <rect x="3" y="19" width="18" height="2" rx="0.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`products-grid ${viewMode}`}>
              {menuItems['Pastries']?.map((item) => (
                <div key={item.id} className="product-card">
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <button className="add-to-cart-btn">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">{item.name}</h4>
                    <div className="product-price">
                      <span className="current-price">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  <div className="product-description-wrapper">
                    <p className="product-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bread Section */}
          <div className="products-category">
            <div className="category-header">
              <h3 className="category-title">Bread</h3>
            </div>
            
            <div className={`products-grid ${viewMode}`}>
              {menuItems['Bread']?.map((item) => (
                <div key={item.id} className="product-card">
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <button className="add-to-cart-btn">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">{item.name}</h4>
                    <div className="product-price">
                      <span className="current-price">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  <div className="product-description-wrapper">
                    <p className="product-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="website-footer">
        <div className="footer-content">
          <img src={CashAppLogo} alt="Cash App" className="cashapp-logo" />
          <span className="footer-text">Thank you for shopping local with Cash App</span>
        </div>
      </footer>
    </div>
  )
}

export default DefaultWebsite
