import { useState, useRef, useEffect } from 'react'
import './MCCDropdown.css'

const MCC_LIST = [
  { code: '5462', label: 'Bakery' },
  { code: '5812', label: 'Restaurants' },
  { code: '5813', label: 'Bars, Cocktail Lounges, Taverns' },
  { code: '5814', label: 'Fast Food Restaurants' },
  { code: '5441', label: 'Candy, Nut, and Confectionery Stores' },
  { code: '5451', label: 'Dairy Products Stores' },
  { code: '5499', label: 'Miscellaneous Food Stores' },
  { code: '5921', label: 'Package Stores — Beer, Wine, and Liquor' },
  { code: '5983', label: 'Fuel Dealers' },
  { code: '5411', label: 'Grocery Stores, Supermarkets' },
  { code: '5422', label: 'Freezer and Locker Meat Provisioners' },
  { code: '5511', label: 'Automobile Dealers — New and Used' },
  { code: '5521', label: 'Automobile Dealers — Used Only' },
  { code: '5531', label: 'Auto and Home Supply Stores' },
  { code: '5532', label: 'Automotive Tire Stores' },
  { code: '5533', label: 'Automotive Parts and Accessories' },
  { code: '5541', label: 'Gas Stations' },
  { code: '5551', label: 'Boat Dealers' },
  { code: '5571', label: 'Motorcycle Shops and Dealers' },
  { code: '5611', label: 'Men\'s and Boys\' Clothing Stores' },
  { code: '5621', label: 'Women\'s Ready-to-Wear Stores' },
  { code: '5631', label: 'Women\'s Accessory and Specialty Shops' },
  { code: '5641', label: 'Children\'s and Infants\' Wear Stores' },
  { code: '5651', label: 'Family Clothing Stores' },
  { code: '5661', label: 'Shoe Stores' },
  { code: '5691', label: 'Men\'s and Women\'s Clothing Stores' },
  { code: '5699', label: 'Miscellaneous Apparel and Accessory Shops' },
  { code: '5712', label: 'Furniture, Home Furnishings' },
  { code: '5713', label: 'Floor Covering Stores' },
  { code: '5714', label: 'Drapery, Window Covering Stores' },
  { code: '5718', label: 'Fireplace, Fireplace Screens, and Accessories' },
  { code: '5719', label: 'Miscellaneous Home Furnishing Stores' },
  { code: '5722', label: 'Household Appliance Stores' },
  { code: '5732', label: 'Electronics Stores' },
  { code: '5733', label: 'Music Stores — Instruments, Sheet Music' },
  { code: '5734', label: 'Computer Software Stores' },
  { code: '5735', label: 'Record Stores' },
  { code: '5811', label: 'Caterers' },
  { code: '5912', label: 'Drug Stores and Pharmacies' },
  { code: '5941', label: 'Sporting Goods Stores' },
  { code: '5942', label: 'Book Stores' },
  { code: '5943', label: 'Stationery Stores' },
  { code: '5944', label: 'Jewelry Stores' },
  { code: '5945', label: 'Hobby, Toy, and Game Shops' },
  { code: '5946', label: 'Camera and Photographic Supply Stores' },
  { code: '5947', label: 'Gift, Card, Novelty, and Souvenir Shops' },
  { code: '5948', label: 'Luggage and Leather Goods Stores' },
  { code: '5949', label: 'Sewing, Needlework, and Fabric Stores' },
  { code: '5950', label: 'Glassware and Crystal Stores' },
  { code: '5970', label: 'Artist Supply and Craft Stores' },
  { code: '5971', label: 'Art Dealers and Galleries' },
  { code: '5972', label: 'Stamp and Coin Stores' },
  { code: '5973', label: 'Religious Goods Stores' },
  { code: '5976', label: 'Orthopedic Goods and Prosthetic Devices' },
  { code: '5977', label: 'Cosmetic Stores' },
  { code: '5992', label: 'Florists' },
  { code: '5993', label: 'Cigar Stores and Stands' },
  { code: '5994', label: 'Newsstands' },
  { code: '5995', label: 'Pet Shops, Pet Food, and Supplies' },
  { code: '5999', label: 'Miscellaneous Retail Stores', alt: 'other' },
  { code: '7011', label: 'Hotels, Motels, and Resorts' },
  { code: '7210', label: 'Laundry, Cleaning, and Garment Services' },
  { code: '7211', label: 'Laundries — Family and Commercial' },
  { code: '7216', label: 'Dry Cleaners' },
  { code: '7221', label: 'Photographic Studios' },
  { code: '7230', label: 'Beauty and Barber Shops' },
  { code: '7251', label: 'Shoe Repair, Shine, and Hat Cleaning' },
  { code: '7261', label: 'Funeral Services and Crematories' },
  { code: '7273', label: 'Dating and Escort Services' },
  { code: '7276', label: 'Tax Preparation Services' },
  { code: '7277', label: 'Counseling Services' },
  { code: '7278', label: 'Buying and Shopping Services' },
  { code: '7296', label: 'Clothing Rental' },
  { code: '7297', label: 'Massage Parlors' },
  { code: '7298', label: 'Health and Beauty Spas' },
  { code: '7299', label: 'Miscellaneous Recreation Services' },
  { code: '7311', label: 'Advertising Services' },
  { code: '7333', label: 'Commercial Photography, Art, and Graphics' },
  { code: '7338', label: 'Quick Copy, Reproduction, and Blueprinting' },
  { code: '7339', label: 'Stenographic and Secretarial Support' },
  { code: '7342', label: 'Exterminating and Disinfecting Services' },
  { code: '7349', label: 'Cleaning, Maintenance, and Janitorial Services' },
  { code: '7361', label: 'Employment Agencies and Temporary Help' },
  { code: '7372', label: 'Computer Programming, Data Processing' },
  { code: '7375', label: 'Information Retrieval Services' },
  { code: '7379', label: 'Computer Maintenance and Repair' },
  { code: '7392', label: 'Management, Consulting, and Public Relations' },
  { code: '7393', label: 'Detective Agencies, Protective Services' },
  { code: '7394', label: 'Equipment, Tool, Furniture Rental' },
  { code: '7395', label: 'Photofinishing Laboratories' },
  { code: '7399', label: 'Miscellaneous Business Services', alt: 'other' },
  { code: '7512', label: 'Automobile Rental Agency' },
  { code: '7523', label: 'Parking Lots and Garages' },
  { code: '7531', label: 'Auto Body Repair Shops' },
  { code: '7534', label: 'Tire Retreading and Repair' },
  { code: '7535', label: 'Automotive Paint Shops' },
  { code: '7538', label: 'Automotive Service Shops' },
  { code: '7542', label: 'Car Washes' },
  { code: '7622', label: 'Electronics Repair Shops' },
  { code: '7623', label: 'AC and Refrigeration Repair Shops' },
  { code: '7629', label: 'Electrical and Small Appliance Repair' },
  { code: '7631', label: 'Watch, Clock, and Jewelry Repair' },
  { code: '7641', label: 'Furniture — Reupholstery, Repair, Refinishing' },
  { code: '7692', label: 'Welding Services' },
  { code: '7699', label: 'Miscellaneous Repair Shops' },
  { code: '7829', label: 'Motion Picture and Video Tape Production' },
  { code: '7832', label: 'Motion Picture Theaters' },
  { code: '7841', label: 'Video Tape Rental Stores' },
  { code: '7911', label: 'Dance Halls, Studios, and Schools' },
  { code: '7922', label: 'Theatrical Producers and Ticket Agencies' },
  { code: '7929', label: 'Bands, Orchestras, and Entertainers' },
  { code: '7932', label: 'Billiard and Pool Establishments' },
  { code: '7933', label: 'Bowling Alleys' },
  { code: '7941', label: 'Athletic Fields, Commercial Sports' },
  { code: '7991', label: 'Tourist Attractions and Exhibits' },
  { code: '7992', label: 'Golf Courses — Public' },
  { code: '7993', label: 'Video Amusement Game Supplies' },
  { code: '7994', label: 'Video Game Arcades' },
  { code: '7996', label: 'Amusement Parks, Circuses, Carnivals' },
  { code: '7997', label: 'Membership Clubs — Sports, Recreation' },
  { code: '7998', label: 'Aquariums, Seaquariums, Dolphinariums' },
  { code: '7999', label: 'Recreation Services — Not Elsewhere Classified' },
  { code: '8011', label: 'Doctors — Not Elsewhere Classified' },
  { code: '8021', label: 'Dentists, Orthodontists' },
  { code: '8031', label: 'Osteopaths' },
  { code: '8041', label: 'Chiropractors' },
  { code: '8042', label: 'Optometrists, Ophthalmologists' },
  { code: '8043', label: 'Opticians, Optical Goods, and Eyeglasses' },
  { code: '8049', label: 'Podiatrists and Chiropodists' },
  { code: '8050', label: 'Nursing and Personal Care Facilities' },
  { code: '8062', label: 'Hospitals' },
  { code: '8071', label: 'Medical and Dental Laboratories' },
  { code: '8099', label: 'Medical Services and Health Practitioners' },
  { code: '8111', label: 'Legal Services and Attorneys' },
  { code: '8211', label: 'Elementary and Secondary Schools' },
  { code: '8220', label: 'Colleges, Universities, and Professional Schools' },
  { code: '8241', label: 'Correspondence Schools' },
  { code: '8244', label: 'Business and Secretarial Schools' },
  { code: '8249', label: 'Vocational and Trade Schools' },
  { code: '8299', label: 'Schools and Educational Services' },
  { code: '8351', label: 'Child Care Services' },
  { code: '8398', label: 'Charitable and Social Service Organizations' },
  { code: '8641', label: 'Civic, Social, and Fraternal Associations' },
  { code: '8651', label: 'Political Organizations' },
  { code: '8661', label: 'Religious Organizations' },
  { code: '8675', label: 'Automobile Associations' },
  { code: '8699', label: 'Membership Organizations' },
  { code: '8734', label: 'Testing Laboratories' },
  { code: '8911', label: 'Architectural, Engineering, and Surveying' },
  { code: '8931', label: 'Accounting, Auditing, and Bookkeeping' },
  { code: '8999', label: 'Professional Services — Not Elsewhere Classified', alt: 'other' },
  { code: '1520', label: 'General Contractors — Residential' },
  { code: '1711', label: 'Heating, Plumbing, and AC Contractors' },
  { code: '1731', label: 'Electrical Contractors' },
  { code: '1740', label: 'Masonry, Stonework, Tile, and Plastering' },
  { code: '1750', label: 'Carpentry Contractors' },
  { code: '1761', label: 'Roofing, Siding, and Sheet Metal Work' },
  { code: '1771', label: 'Concrete Work Contractors' },
  { code: '1799', label: 'Special Trade Contractors' },
  { code: '2741', label: 'Miscellaneous Publishing and Printing' },
  { code: '2791', label: 'Typesetting, Platemaking, and Related' },
  { code: '2842', label: 'Specialty Cleaning, Polishing Preparations' },
  { code: '4011', label: 'Railroads' },
  { code: '4111', label: 'Local and Suburban Commuter Transport' },
  { code: '4112', label: 'Passenger Railways' },
  { code: '4121', label: 'Taxicabs and Rideshares' },
  { code: '4131', label: 'Bus Lines' },
  { code: '4214', label: 'Motor Freight Carriers and Trucking' },
  { code: '4215', label: 'Courier Services — Air and Ground' },
  { code: '4225', label: 'Public Warehousing and Storage' },
  { code: '4411', label: 'Steamship and Cruise Lines' },
  { code: '4457', label: 'Boat Rentals and Leasing' },
  { code: '4468', label: 'Marinas, Marine Service, and Supplies' },
  { code: '4511', label: 'Airlines and Air Carriers' },
  { code: '4722', label: 'Travel Agencies and Tour Operators' },
  { code: '4784', label: 'Tolls and Bridge Fees' },
  { code: '4789', label: 'Transportation Services' },
  { code: '4812', label: 'Telecommunication Equipment and Sales' },
  { code: '4814', label: 'Telecommunication Services' },
  { code: '4816', label: 'Computer Network and Information Services' },
  { code: '4899', label: 'Cable, Satellite, and Pay Television' },
  { code: '4900', label: 'Utilities — Electric, Gas, Water, Sanitary' },
]

function MCCDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedMCC, setSelectedMCC] = useState(() => {
    return MCC_LIST.find(m => m.label === value || m.code === value) || null
  })
  const containerRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen])

  const filtered = MCC_LIST.filter(m => {
    const q = search.toLowerCase()
    return m.label.toLowerCase().includes(q) || m.code.includes(q) || (m.alt && m.alt.toLowerCase().includes(q))
  })

  const handleSelect = (mcc) => {
    setSelectedMCC(mcc)
    setIsOpen(false)
    setSearch('')
    onChange?.(mcc)
  }

  return (
    <div className="mcc-dropdown" ref={containerRef}>
      <div className={`form-input-container has-value mcc-dropdown-trigger ${isOpen ? 'focused' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <label className="form-label">Category</label>
        <div className="mcc-dropdown-value">
          <span className="form-input-text">{selectedMCC?.label || value || 'Select a category'}</span>
          <svg className={`mcc-dropdown-chevron ${isOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.70703 11.7071C8.31651 12.0976 7.68334 12.0976 7.29282 11.7071L1.29282 5.70711L2.70703 4.29289L7.99992 9.58579L13.2928 4.29289L14.707 5.70711L8.70703 11.7071Z" fill="#959595"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="mcc-dropdown-menu">
          <div className="mcc-dropdown-search-wrap">
            <div className="mcc-dropdown-search-field">
              <svg className="mcc-dropdown-search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.11531 5.11537C7.93575 2.29494 12.5087 2.29497 15.3292 5.11537C17.9096 7.69582 18.1267 11.7413 15.9854 14.5714L21.2071 19.7931L19.793 21.2072L14.5714 15.9855C11.7413 18.1268 7.69576 17.9097 5.11531 15.3292C2.29491 12.5088 2.29488 7.93581 5.11531 5.11537ZM13.9151 6.52944C11.8757 4.49009 8.56876 4.49005 6.52938 6.52944C4.48999 8.56882 4.49002 11.8758 6.52938 13.9152C8.56878 15.9546 11.8757 15.9546 13.9151 13.9152C15.9545 11.8758 15.9545 8.56884 13.9151 6.52944Z" fill="#101010"/>
              </svg>
              <input
                ref={searchRef}
                type="text"
                className="mcc-dropdown-search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="mcc-dropdown-list">
            {filtered.length === 0 ? (
              <div className="mcc-dropdown-empty">No categories found</div>
            ) : (
              filtered.map((mcc) => (
                <button
                  key={mcc.code}
                  type="button"
                  className={`mcc-dropdown-item ${selectedMCC?.code === mcc.code ? 'selected' : ''}`}
                  onClick={() => handleSelect(mcc)}
                >
                  <span className="mcc-dropdown-item-label">{mcc.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MCCDropdown
