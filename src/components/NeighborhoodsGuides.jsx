import './NeighborhoodsGuides.css'
import guideimg1 from '../assets/guideimg1.png'
import guideimg2 from '../assets/guideimg2.png'
import guideimg3 from '../assets/guideimg3.png'
import guideimg4 from '../assets/guideimg4.png'

const GUIDES = [
  {
    id: 'brand',
    bg: '#1A7D37',
    title: 'Neighborhoods in Atlanta',
    description: 'Explore the customer experience on Cash App.',
    iconStyle: 'light',
    image: guideimg1,
  },
  {
    id: 'pos',
    bg: '#252525',
    title: 'Your register, refreshed',
    description: 'Your POS will convert customers into followers.',
    iconStyle: 'light',
    image: guideimg2,
  },
  {
    id: 'avatars',
    bg: '#E0DDD5',
    title: 'Own your audience',
    description: 'Direct line to locals you can reach anytime.',
    iconStyle: 'dark',
    image: guideimg3,
  },
  {
    id: 'localcash',
    bg: '#D8E8F5',
    title: 'Rewards, funded by Square',
    description: 'More value for customers at no cost to you.',
    iconStyle: 'dark',
    image: guideimg4,
  },
]

function NeighborhoodsGuides() {
  return (
    <div className="neighborhoods-guides" aria-label="Guides">
      {GUIDES.map((guide) => (
        <div key={guide.id} className="neighborhoods-guide-item">
          <div
            className="neighborhoods-guide-box"
            style={{ background: guide.bg }}
          >
            <div className="neighborhoods-guide-box-inner">
              <img src={guide.image} alt="" className="neighborhoods-guide-img" />
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="neighborhoods-guide-add">
              <mask id={`plus-cutout-${guide.id}`} maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
                <rect width="24" height="24" rx="12" fill="white"/>
                <rect x="11" y="6" width="2" height="12" fill="black"/>
                <rect x="6" y="11" width="12" height="2" fill="black"/>
              </mask>
              <rect width="24" height="24" rx="12" fill={guide.iconStyle === 'light' ? '#FFFFFF' : '#101010'} mask={`url(#plus-cutout-${guide.id})`}/>
            </svg>
          </div>
          <div className="neighborhoods-guide-text">
            <div className="neighborhoods-guide-title">{guide.title}</div>
            <div className="neighborhoods-guide-description">{guide.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NeighborhoodsGuides
