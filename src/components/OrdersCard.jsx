import './OrdersCard.css'
// Joy Bakeshop images
import latteImage from '../assets/jb-item-image-1.png'
import croissantImage from '../assets/jb-item-image-2.png'
import cinnamonRollImage from '../assets/jb-item-image-3.png'
// Brooklyn French Bakers images
import bfbAlmondCroissantImage from '../assets/Product review 12/bfb-AlmondCroissant.png'
import bfbCroissantImage from '../assets/Product review 12/bfb-Croissant.png'
import bfbBaguetteImage from '../assets/Product review 12/bfb-Baguette.png'
// Keva Juice images
import kjStrawberrySqueezerImage from '../assets/Product review 12/kj-Strawberry Squeezer Smoothie.png'
import kjIslandGreenImage from '../assets/Product review 12/kj-Island Green Smoothie.png'
import kjBananaramaImage from '../assets/Product review 12/kj-Bananarama Smoothie.png'
// Paper Son Coffee images
import pscMatchaLatteImage from '../assets/Product review 12/Matcha Latte.png'
import pscLatteImage from '../assets/Product review 12/psc-latte.png'
import pscCappuccinoImage from '../assets/Product review 12/psc-cappuccino.png'
// Spot of Tea images
import hibiscusMangoImage from '../assets/Product review 12/Hibiscus Mango.png'
import blueJasmineImage from '../assets/Product review 12/Blue Jasmine.png'
import strawberryMatchaImage from '../assets/Product review 12/Strawberry Matcha.png'
import vanillaTaroImage from '../assets/Product review 12/Vanilla Taro.png'
// Vanilla Cafe images
import vcCappuccinoImage from '../assets/Product review 12/vc-Cappuccino.png'
import vcLatteImage from '../assets/Product review 12/vc-Latte.png'
import vcIceLatteImage from '../assets/Product review 12/vc-Ice Latte.png'
import vcIcedMatchaImage from '../assets/Product review 12/vc-Iced Matcha.png'

const orderData = {
  'joy-bakeshop': {
    'day-one': {
      items: [
        { name: 'Latte', orders: '1,156 orders', image: latteImage },
        { name: 'Almond croissant', orders: '1,156 orders', image: croissantImage },
        { name: 'Cinnamon Roll', orders: '1,156 orders', image: cinnamonRollImage }
      ]
    },
    'first-50': {
      items: [
        { name: 'Latte', orders: '1,156 orders', image: latteImage },
        { name: 'Almond croissant', orders: '1,156 orders', image: croissantImage },
        { name: 'Cinnamon Roll', orders: '1,156 orders', image: cinnamonRollImage }
      ]
    },
    'month-over-month': {
      items: [
        { name: 'Latte', orders: '1,156 orders', image: latteImage },
        { name: 'Almond croissant', orders: '1,156 orders', image: croissantImage },
        { name: 'Cinnamon Roll', orders: '1,156 orders', image: cinnamonRollImage }
      ]
    }
  },
  'brooklyn-french-bakers': {
    'day-one': {
      items: [
        { name: 'Croissant', orders: '17,296 orders', image: bfbCroissantImage },
        { name: 'Baguette', orders: '16,945 orders', image: bfbBaguetteImage },
        { name: 'Almond Croissant', orders: '13,819 orders', image: bfbAlmondCroissantImage }
      ]
    },
    'first-50': {
      items: [
        { name: 'Croissant', orders: '17,296 orders', image: bfbCroissantImage },
        { name: 'Baguette', orders: '16,945 orders', image: bfbBaguetteImage },
        { name: 'Almond Croissant', orders: '13,819 orders', image: bfbAlmondCroissantImage }
      ]
    },
    'month-over-month': {
      items: [
        { name: 'Croissant', orders: '17,296 orders', image: bfbCroissantImage },
        { name: 'Baguette', orders: '16,945 orders', image: bfbBaguetteImage },
        { name: 'Almond Croissant', orders: '13,819 orders', image: bfbAlmondCroissantImage }
      ]
    }
  },
  'keva-juice': {
    'day-one': {
      items: [
        { name: 'Strawberry Squeezer Smoothie', orders: '41,123 orders', image: kjStrawberrySqueezerImage },
        { name: 'Island Green Smoothie', orders: '34,564 orders', image: kjIslandGreenImage },
        { name: 'Bananarama Smoothie', orders: '32,848 orders', image: kjBananaramaImage }
      ]
    },
    'first-50': {
      items: [
        { name: 'Strawberry Squeezer Smoothie', orders: '41,123 orders', image: kjStrawberrySqueezerImage },
        { name: 'Island Green Smoothie', orders: '34,564 orders', image: kjIslandGreenImage },
        { name: 'Bananarama Smoothie', orders: '32,848 orders', image: kjBananaramaImage }
      ]
    },
    'month-over-month': {
      items: [
        { name: 'Strawberry Squeezer Smoothie', orders: '41,123 orders', image: kjStrawberrySqueezerImage },
        { name: 'Island Green Smoothie', orders: '34,564 orders', image: kjIslandGreenImage },
        { name: 'Bananarama Smoothie', orders: '32,848 orders', image: kjBananaramaImage }
      ]
    }
  },
  'spot-of-tea': {
    'day-one': {
      items: [
        { name: 'Hibiscus Mango', orders: '1,156 orders', image: hibiscusMangoImage },
        { name: 'Blue Jasmine', orders: '1,156 orders', image: blueJasmineImage },
        { name: 'Vanilla Taro', orders: '1,156 orders', image: vanillaTaroImage }
      ]
    },
    'first-50': {
      items: [
        { name: 'Hibiscus Mango', orders: '1,156 orders', image: hibiscusMangoImage },
        { name: 'Blue Jasmine', orders: '1,156 orders', image: blueJasmineImage },
        { name: 'Strawberry Matcha', orders: '1,156 orders', image: strawberryMatchaImage }
      ]
    },
    'month-over-month': {
      items: [
        { name: 'Vanilla Taro', orders: '29,206 orders', image: vanillaTaroImage },
        { name: 'Hibiscus Mango', orders: '24,685 orders', image: hibiscusMangoImage },
        { name: 'Blue Jasmine', orders: '14,804 orders', image: blueJasmineImage }
      ]
    }
  },
  'vanilla-cafe': {
    'day-one': {
      items: [
        { name: 'Cappuccino', orders: '1,156 orders', image: vcCappuccinoImage },
        { name: 'Latte', orders: '1,156 orders', image: vcLatteImage },
        { name: 'Ice Latte', orders: '1,156 orders', image: vcIceLatteImage }
      ]
    },
    'first-50': {
      items: [
        { name: 'Latte', orders: '892 orders', image: vcLatteImage },
        { name: 'Cappuccino', orders: '745 orders', image: vcCappuccinoImage },
        { name: 'Ice Latte', orders: '628 orders', image: vcIceLatteImage }
      ]
    },
    'month-over-month': {
      items: [
        { name: 'Cappuccino', orders: '5,974 orders', image: vcCappuccinoImage },
        { name: 'Latte', orders: '5,232 orders', image: vcLatteImage },
        { name: 'Ice Latte', orders: '4,370 orders', image: vcIceLatteImage },
        { name: 'Iced Matcha', orders: '2,524 orders', image: vcIcedMatchaImage }
      ]
    }
  },
  'tea-monks': {
    'day-one': {
      items: [
        { name: 'Latte', orders: '1,156 orders', image: latteImage },
        { name: 'Almond croissant', orders: '1,156 orders', image: croissantImage },
        { name: 'Cinnamon Roll', orders: '1,156 orders', image: cinnamonRollImage }
      ]
    },
    'first-50': {
      items: [
        { name: 'Latte', orders: '1,156 orders', image: latteImage },
        { name: 'Almond croissant', orders: '1,156 orders', image: croissantImage },
        { name: 'Cinnamon Roll', orders: '1,156 orders', image: cinnamonRollImage }
      ]
    },
    'month-over-month': {
      items: [
        { name: 'Latte', orders: '1,156 orders', image: latteImage },
        { name: 'Almond croissant', orders: '1,156 orders', image: croissantImage },
        { name: 'Cinnamon Roll', orders: '1,156 orders', image: cinnamonRollImage }
      ]
    }
  },
  'paper-son-coffee': {
    'day-one': {
      items: [
        { name: 'Matcha Latte', orders: '15,126 orders', image: pscMatchaLatteImage },
        { name: 'Latte', orders: '13,681 orders', image: pscLatteImage },
        { name: 'Cappuccino', orders: '11,556 orders', image: pscCappuccinoImage }
      ]
    },
    'first-50': {
      items: [
        { name: 'Matcha Latte', orders: '15,126 orders', image: pscMatchaLatteImage },
        { name: 'Latte', orders: '13,681 orders', image: pscLatteImage },
        { name: 'Cappuccino', orders: '11,556 orders', image: pscCappuccinoImage }
      ]
    },
    'month-over-month': {
      items: [
        { name: 'Matcha Latte', orders: '15,126 orders', image: pscMatchaLatteImage },
        { name: 'Latte', orders: '13,681 orders', image: pscLatteImage },
        { name: 'Cappuccino', orders: '11,556 orders', image: pscCappuccinoImage }
      ]
    }
  }
}

function OrdersCard({ activeBrand = 'joy-bakeshop', pageState = 'day-one' }) {
  const brandData = orderData[activeBrand] || orderData['joy-bakeshop']
  const currentData = brandData[pageState] || brandData['day-one']

  const getOrdersDescription = () => {
    // Day one state - default description
    if (pageState === 'day-one' || !currentData.items || currentData.items.length === 0 || currentData.items[0].orders === '—') {
      return "As orders come in, you'll see what followers spend and which products they love."
    }

    // Get the top items
    const items = currentData.items.filter(item => item.orders !== '—')
    
    if (items.length === 0) {
      return "As orders come in, you'll see what followers spend and which products they love."
    }

    // Parse order counts to find top item
    const topItem = items[0]
    
    if (items.length === 1) {
      return `Followers are ordering ${topItem.name} most often.`
    } else if (items.length === 2) {
      return `${topItem.name} and ${items[1].name} are most popular with followers.`
    } else {
      // 3 or more items
      const itemNames = items.slice(0, 2).map(item => item.name).join(', ')
      return `${itemNames}, and more are most popular with followers.`
    }
  }

  return (
    <div className="orders-card">
      <div className="orders-card-header">
        <h2 className="orders-card-title">Orders</h2>
        <p className="orders-card-description">
          {getOrdersDescription()}
        </p>
      </div>

      <div className="orders-card-section">
        <div className="orders-popular-section">
          <div className="orders-subsection-header">
            <h3 className="orders-subsection-title">{pageState === 'day-one' ? 'Popular items' : 'Popular with followers'}</h3>
          </div>
          <div className="orders-product-list">
            {currentData.items.map((item, index) => (
              <div key={index} className="orders-product-row">
                <div className="orders-product-item">
                  {item.image ? (
                    <div className="orders-product-icon--no-invert">
                      <img src={item.image} alt={item.name} className="orders-product-image" />
                    </div>
                  ) : (
                    <div className="orders-product-placeholder"></div>
                  )}
                  <div className="orders-product-content">
                    <div className="orders-product-info">
                      <span className="orders-product-name">{item.name}</span>
                      <span className="orders-product-meta">{item.orders}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersCard

