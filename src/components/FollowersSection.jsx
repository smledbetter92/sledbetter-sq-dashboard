import { useEffect, useState, useRef } from 'react'
import './FollowersSection.css'
import AnalyticsModal from './AnalyticsModal'
import avatar1 from '../assets/avatar-1.png'
import avatar2 from '../assets/avatar-2.png'
import avatar3 from '../assets/avatar-3.png'
import avatar4 from '../assets/avatar-4.png'
import PlusIcon from '../assets/Product review 12/Plus16.svg'
import SendIcon from '../assets/Product review 12/send-icon.svg'
import ArrowRightIcon from '../assets/Product review 12/Arrow right.svg'
import ChevronRightIcon from '../assets/Chevron right.svg'
import TrendTriangleUp from '../assets/Product review 12/Trend triangle up.svg'

// Counter animation component for odometer effect
function AnimatedCounter({ value, startValue = 0, duration = 2000 }) {
  const [count, setCount] = useState(startValue)
  const countRef = useRef(startValue)
  const startTimeRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Parse number from formatted string (e.g., "7,428" -> 7428)
  const targetValue = typeof value === 'string' && value !== '—' 
    ? parseInt(value.replace(/,/g, ''), 10) 
    : 0

  useEffect(() => {
    if (targetValue === 0 || value === '—') {
      setCount(0)
      return
    }

    // Slower easing function (ease out quint for smoother finish)
    const easeOutQuint = (t) => {
      return 1 - Math.pow(1 - t, 5)
    }

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuint(progress)

      // Calculate current value and round to nearest 1
      const range = targetValue - startValue
      const rawCount = startValue + (easedProgress * range)
      const currentCount = Math.floor(rawCount)
      
      countRef.current = currentCount
      setCount(currentCount)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(targetValue)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      startTimeRef.current = null
    }
  }, [targetValue, duration, value, startValue])

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-US')
  }

  return <>{value === '—' ? '—' : formatNumber(count)}</>
}

// Helper function to generate smooth SVG path from data points
// Normalizes data to fit sparkline viewBox (195 x 73)
function generateSmoothPath(dataPoints, allDataPoints = []) {
  if (!dataPoints || dataPoints.length === 0) return ''
  
  const width = 195
  const height = 73
  const padding = 5
  const plotHeight = height - (padding * 2)
  const segmentWidth = width / (dataPoints.length - 1)
  
  // Combine all data points to find global min/max for consistent scaling
  const combinedData = allDataPoints.length > 0 ? allDataPoints : dataPoints
  const minValue = Math.min(...combinedData)
  const maxValue = Math.max(...combinedData)
  const range = maxValue - minValue || 1
  
  // Normalize Y values to fit in viewBox (inverted, since SVG Y starts at top)
  const normalizeY = (value) => {
    const normalized = ((value - minValue) / range)
    return height - padding - (normalized * plotHeight)
  }
  
  let path = `M 0,${normalizeY(dataPoints[0])}`
  
  for (let i = 0; i < dataPoints.length - 1; i++) {
    const x1 = i * segmentWidth
    const y1 = normalizeY(dataPoints[i])
    const x2 = (i + 1) * segmentWidth
    const y2 = normalizeY(dataPoints[i + 1])
    
    const cx1 = x1 + segmentWidth * 0.42
    const cx2 = x1 + segmentWidth * 0.58
    
    path += ` C ${cx1},${y1} ${cx2},${y2} ${x2},${y2}`
  }
  
  return path
}

// Mock data structure for different brands and page states
const businessData = {
  'joy-bakeshop': {
    'day-one': {
      description: "Convert reachable customers into followers. You'll be able to message followers directly in Cash App.",
      reachable: '6,234',
      followers: '—',
      showAvatars: false,
      avatars: [],
      showAnalytics: false
    },
    'first-50': {
      description: "You've converted first 50+ customers into followers this month, you can now reach directly in Cash App.",
      reachable: '6,234',
      followers: '64',
      showAvatars: true,
      avatarCount: 64,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: false
    },
    'month-over-month': {
      description: "You've converted 84 customers into followers this month, increasing your average revenue by $2,560",
      reachable: '8,878',
      followers: '416',
      showAvatars: true,
      avatarCount: 416,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: true,
      analytics: {
        visitFrequency: { follower: 2.3, nonFollower: 1.2, maxValue: 2.5 },
        averageOrderValue: { 
          follower: 32.45, 
          nonFollower: 21.10,
          chartData: {
            follower: [24.5, 26.2, 27.8, 29.1, 30.5, 31.8, 32.45],
            nonFollower: [21.0, 21.2, 20.9, 21.1, 21.3, 21.0, 21.10],
            follower30: [24.5, 24.9, 25.3, 25.7, 26.0, 26.2, 26.6, 26.4, 26.9, 27.3, 27.8, 28.1, 28.5, 28.3, 28.8, 29.1, 29.5, 29.8, 30.2, 30.0, 30.5, 30.9, 31.2, 31.6, 31.4, 31.8, 32.2, 32.0, 32.6, 32.45],
            nonFollower30: [21.0, 21.2, 20.8, 21.0, 21.4, 21.2, 20.9, 21.3, 21.0, 21.2, 20.9, 21.1, 21.3, 20.9, 21.2, 21.0, 21.2, 20.9, 21.1, 21.3, 21.2, 20.9, 21.1, 21.2, 20.9, 21.1, 21.2, 20.9, 21.3, 21.10]
          }
        },
        averageLifetimeValue: { 
          follower: 74.80, 
          nonFollower: 28.50,
          chartData: {
            follower: [58.0, 61.5, 64.2, 67.0, 69.8, 72.5, 74.80],
            nonFollower: [28.5, 28.6, 28.4, 28.5, 28.7, 28.5, 28.50],
            follower30: [58.0, 58.6, 59.2, 59.8, 60.3, 61.5, 62.1, 61.9, 62.6, 63.2, 64.2, 64.8, 65.4, 65.2, 66.0, 67.0, 67.6, 68.2, 68.8, 68.6, 69.8, 70.4, 71.0, 71.6, 71.4, 72.5, 73.1, 72.9, 73.8, 74.80],
            nonFollower30: [28.5, 28.6, 28.4, 28.5, 28.8, 28.6, 28.4, 28.7, 28.5, 28.6, 28.4, 28.5, 28.7, 28.5, 28.6, 28.4, 28.6, 28.5, 28.7, 28.6, 28.5, 28.7, 28.4, 28.6, 28.5, 28.7, 28.6, 28.4, 28.6, 28.50]
          }
        }
      }
    }
  },
  'brooklyn-french-bakers': {
    'day-one': {
      description: "Convert reachable customers into followers. You'll be able to message followers directly in Cash App.",
      reachable: '1,850',
      followers: '—',
      showAvatars: false,
      avatars: [],
      showAnalytics: false
    },
    'first-50': {
      description: "You've converted first 50+ customers into followers this month, you can now reach directly in Cash App.",
      reachable: '1,850',
      followers: '68',
      showAvatars: true,
      avatarCount: 68,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: false
    },
    'month-over-month': {
      description: "You've converted 12 customers into followers this month, increasing your average revenue by $166",
      reachable: '6,215',
      followers: '63',
      showAvatars: true,
      avatarCount: 63,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: true,
      analytics: {
        visitFrequency: { follower: 3.3, nonFollower: 2.2, maxValue: 3.5 },
        averageOrderValue: { 
          follower: 16.80, 
          nonFollower: 19.50,
          chartData: {
            follower: [15.0, 15.3, 15.6, 15.9, 16.2, 16.5, 16.80],
            nonFollower: [19.0, 19.1, 19.2, 19.3, 19.4, 19.5, 19.50],
            follower30: [15.0, 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 16.0, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 16.8, 16.7, 16.6, 16.7, 16.8, 16.9, 16.7, 16.8, 16.7, 16.80],
            nonFollower30: [19.0, 19.1, 19.2, 19.3, 19.2, 19.1, 19.2, 19.3, 19.4, 19.3, 19.2, 19.3, 19.4, 19.5, 19.4, 19.3, 19.4, 19.5, 19.4, 19.3, 19.4, 19.5, 19.6, 19.5, 19.4, 19.5, 19.4, 19.5, 19.6, 19.50]
          }
        },
        averageLifetimeValue: { 
          follower: 56.20, 
          nonFollower: 40.60,
          chartData: {
            follower: [49.0, 50.5, 52.0, 53.2, 54.5, 55.3, 56.20],
            nonFollower: [38.0, 38.5, 39.0, 39.5, 40.0, 40.3, 40.60],
            follower30: [49.0, 49.5, 50.0, 50.5, 51.0, 51.5, 52.0, 52.5, 53.0, 53.2, 53.4, 53.6, 53.8, 54.0, 54.2, 54.5, 54.8, 55.0, 55.3, 55.5, 55.7, 55.9, 56.0, 56.2, 56.1, 56.0, 56.1, 56.2, 56.3, 56.20],
            nonFollower30: [38.0, 38.2, 38.5, 38.7, 39.0, 39.2, 39.5, 39.7, 40.0, 40.2, 40.3, 40.4, 40.5, 40.4, 40.3, 40.4, 40.5, 40.6, 40.5, 40.4, 40.5, 40.6, 40.5, 40.4, 40.5, 40.6, 40.7, 40.6, 40.5, 40.60]
          }
        }
      }
    }
  },
  'keva-juice': {
    'day-one': {
      description: "Convert reachable customers into followers. You'll be able to message followers directly in Cash App.",
      reachable: '1,850',
      followers: '—',
      showAvatars: false,
      avatars: [],
      showAnalytics: false
    },
    'first-50': {
      description: "You've converted first 50+ customers into followers this month, you can now reach directly in Cash App.",
      reachable: '1,850',
      followers: '68',
      showAvatars: true,
      avatarCount: 68,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: false
    },
    'month-over-month': {
      description: "You've converted 151 customers into followers this month, increasing your average revenue by $2,326",
      reachable: '72,858',
      followers: '975',
      showAvatars: true,
      avatarCount: 975,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: true,
      analytics: {
        visitFrequency: { follower: 1.9, nonFollower: 2.2, maxValue: 2.5 },
        averageOrderValue: { 
          follower: 15.30, 
          nonFollower: 15.11,
          chartData: {
            follower: [14.0, 14.3, 14.6, 14.9, 15.0, 15.2, 15.30],
            nonFollower: [14.5, 14.7, 14.8, 14.9, 15.0, 15.1, 15.11],
            follower30: [14.0, 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9, 15.0, 15.1, 15.0, 14.9, 15.0, 15.1, 15.2, 15.3, 15.2, 15.1, 15.2, 15.3, 15.2, 15.1, 15.2, 15.3, 15.2, 15.3, 15.4, 15.30],
            nonFollower30: [14.5, 14.6, 14.7, 14.8, 14.9, 14.8, 14.7, 14.8, 14.9, 15.0, 14.9, 14.8, 14.9, 15.0, 15.1, 15.0, 14.9, 15.0, 15.1, 15.0, 14.9, 15.0, 15.1, 15.0, 15.1, 15.2, 15.1, 15.0, 15.1, 15.11]
          }
        },
        averageLifetimeValue: { 
          follower: 30.17, 
          nonFollower: 22.67,
          chartData: {
            follower: [26.0, 27.0, 27.8, 28.5, 29.0, 29.5, 30.17],
            nonFollower: [21.0, 21.5, 22.0, 22.2, 22.4, 22.5, 22.67],
            follower30: [26.0, 26.2, 26.5, 26.8, 27.0, 27.2, 27.5, 27.8, 28.0, 28.2, 28.5, 28.7, 28.9, 29.0, 29.1, 29.3, 29.5, 29.7, 29.8, 29.9, 30.0, 30.1, 30.2, 30.1, 30.0, 30.1, 30.2, 30.3, 30.2, 30.17],
            nonFollower30: [21.0, 21.1, 21.3, 21.5, 21.7, 21.8, 22.0, 22.1, 22.2, 22.3, 22.4, 22.3, 22.4, 22.5, 22.4, 22.5, 22.6, 22.5, 22.6, 22.7, 22.6, 22.5, 22.6, 22.7, 22.6, 22.5, 22.6, 22.7, 22.6, 22.67]
          }
        }
      }
    }
  },
  'spot-of-tea': {
    'day-one': {
      description: "Convert reachable customers into followers. You'll be able to message followers directly in Cash App.",
      reachable: '3,456',
      followers: '—',
      showAvatars: false,
      avatars: [],
      showAnalytics: false
    },
    'first-50': {
      description: "You've converted first 50+ customers into followers this month, you can now reach directly in Cash App.",
      reachable: '3,456',
      followers: '55',
      showAvatars: true,
      avatarCount: 55,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: false
    },
    'month-over-month': {
      description: "You've converted 166 customers into followers this month, increasing your average revenue by $1,524",
      reachable: '24,960',
      followers: '247',
      showAvatars: true,
      avatarCount: 247,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: true,
      analytics: {
        visitFrequency: { follower: 1.5, nonFollower: 1.4, maxValue: 2.5 },
        averageOrderValue: { 
          follower: 9.68, 
          nonFollower: 10.03,
          chartData: {
            follower: [10.00, 9.95, 9.88, 9.82, 9.76, 9.72, 9.68],
            nonFollower: [9.00, 9.15, 9.32, 9.48, 9.65, 9.84, 10.03],
            follower30: [10.58, 10.52, 10.46, 10.40, 10.35, 10.30, 10.25, 10.20, 10.16, 10.12, 10.08, 10.04, 10.00, 9.96, 9.92, 9.88, 9.84, 9.80, 9.77, 9.74, 9.71, 9.68, 9.66, 9.64, 9.62, 9.61, 9.62, 9.64, 9.66, 9.68],
            nonFollower30: [9.02, 9.06, 9.10, 9.14, 9.18, 9.22, 9.26, 9.30, 9.34, 9.38, 9.42, 9.46, 9.50, 9.54, 9.58, 9.62, 9.66, 9.70, 9.74, 9.78, 9.82, 9.86, 9.90, 9.94, 9.97, 9.99, 10.00, 10.01, 10.02, 10.03]
          }
        },
        averageLifetimeValue: { 
          follower: 14.58, 
          nonFollower: 13.17,
          chartData: {
            follower: [13.00, 13.26, 13.52, 13.78, 14.04, 14.31, 14.58],
            nonFollower: [12.00, 12.19, 12.39, 12.59, 12.78, 12.98, 13.17],
            follower30: [13.00, 13.08, 13.16, 13.24, 13.32, 13.40, 13.48, 13.56, 13.64, 13.72, 13.80, 13.88, 13.96, 14.04, 14.12, 14.20, 14.28, 14.36, 14.44, 14.52, 14.60, 14.68, 14.76, 14.84, 14.92, 14.88, 14.80, 14.72, 14.65, 14.58],
            nonFollower30: [12.00, 12.06, 12.12, 12.18, 12.24, 12.30, 12.36, 12.42, 12.48, 12.54, 12.60, 12.66, 12.72, 12.78, 12.84, 12.90, 12.96, 13.02, 13.08, 13.14, 13.20, 13.26, 13.32, 13.38, 13.44, 13.50, 13.56, 13.62, 13.68, 13.17]
          }
        }
      }
    }
  },
  'vanilla-cafe': {
    'day-one': {
      description: "Convert reachable customers into followers. You'll be able to message followers directly in Cash App.",
      reachable: '2,105',
      followers: '—',
      showAvatars: false,
      avatars: [],
      showAnalytics: false
    },
    'first-50': {
      description: "You've converted first 50+ customers into followers this month, you can now reach directly in Cash App.",
      reachable: '2,380',
      followers: '58',
      showAvatars: true,
      avatarCount: 58,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: false
    },
    'month-over-month': {
      description: "You've converted 45 customers into followers this month, increasing your average revenue by $1,524",
      reachable: '3,010',
      followers: '181',
      showAvatars: true,
      avatarCount: 181,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: true,
      analytics: {
        visitFrequency: { follower: 2.8, nonFollower: 1.6, maxValue: 2.5 },
        averageOrderValue: { 
          follower: 24.21, 
          nonFollower: 24.04,
          chartData: {
            follower: [23.0, 23.20, 23.43, 23.68, 23.92, 24.07, 24.21],
            nonFollower: [23.0, 23.17, 23.34, 23.51, 23.68, 23.86, 24.04],
            follower30: [23.0, 23.06, 23.12, 23.18, 23.24, 23.30, 23.36, 23.42, 23.48, 23.54, 23.60, 23.66, 23.72, 23.78, 23.84, 23.90, 23.96, 24.02, 24.08, 24.14, 24.20, 24.19, 24.18, 24.17, 24.16, 24.17, 24.18, 24.19, 24.20, 24.21],
            nonFollower30: [23.0, 23.03, 23.07, 23.10, 23.14, 23.17, 23.21, 23.24, 23.28, 23.31, 23.35, 23.38, 23.42, 23.45, 23.48, 23.52, 23.55, 23.59, 23.62, 23.66, 23.69, 23.73, 23.76, 23.80, 23.83, 23.87, 23.90, 23.94, 23.97, 24.04]
          }
        },
        averageLifetimeValue: { 
          follower: 68.75, 
          nonFollower: 34.89,
          chartData: {
            follower: [60.0, 61.25, 62.50, 63.75, 65.0, 66.88, 68.75],
            nonFollower: [32.0, 32.41, 32.82, 33.23, 33.64, 34.27, 34.89],
            follower30: [60.0, 60.30, 60.60, 60.90, 61.20, 61.50, 61.80, 62.10, 62.40, 62.70, 63.0, 63.30, 63.60, 63.90, 64.20, 64.50, 64.80, 65.10, 65.40, 65.70, 66.0, 66.30, 66.60, 66.90, 67.20, 67.50, 67.80, 68.10, 68.40, 68.75],
            nonFollower30: [32.0, 32.10, 32.20, 32.30, 32.40, 32.50, 32.60, 32.70, 32.80, 32.90, 33.0, 33.10, 33.20, 33.30, 33.40, 33.50, 33.60, 33.70, 33.80, 33.90, 34.0, 34.10, 34.20, 34.30, 34.40, 34.50, 34.60, 34.70, 34.80, 34.89]
          }
        }
      }
    }
  },
  'tea-monks': {
    'day-one': {
      description: "Convert reachable customers into followers. You'll be able to message followers directly in Cash App.",
      reachable: '4,892',
      followers: '—',
      showAvatars: false,
      avatars: [],
      showAnalytics: false
    },
    'first-50': {
      description: "You've converted first 50+ customers into followers this month, you can now reach directly in Cash App.",
      reachable: '4,892',
      followers: '71',
      showAvatars: true,
      avatarCount: 71,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: false
    },
    'month-over-month': {
      description: "You've converted 98 customers into followers this month, increasing your average revenue by $2,320",
      reachable: '7,021',
      followers: '540',
      showAvatars: true,
      avatarCount: 540,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: true,
      analytics: {
        visitFrequency: { follower: 1.8, nonFollower: 1.3, maxValue: 2.5 },
        averageOrderValue: { 
          follower: 29.60, 
          nonFollower: 22.35,
          chartData: {
            follower: [25.0, 26.0, 26.9, 27.8, 28.5, 29.1, 29.60],
            nonFollower: [22.4, 22.3, 22.5, 22.3, 22.4, 22.3, 22.35],
            follower30: [25.0, 25.3, 25.6, 26.0, 26.7, 27.3, 27.6, 27.2, 26.8, 26.5, 27.0, 27.4, 27.8, 28.3, 29.0, 29.3, 28.8, 28.4, 28.2, 28.6, 28.9, 29.2, 29.4, 29.5, 29.2, 28.9, 29.1, 29.4, 29.5, 29.60],
            nonFollower30: [22.4, 22.4, 22.3, 22.2, 21.8, 21.5, 21.8, 22.2, 22.5, 22.7, 22.8, 22.6, 22.4, 22.2, 22.1, 22.0, 22.3, 22.6, 22.8, 22.7, 22.5, 22.3, 22.1, 21.9, 22.1, 22.3, 22.4, 22.4, 22.3, 22.35]
          }
        },
        averageLifetimeValue: { 
          follower: 58.20, 
          nonFollower: 29.90,
          chartData: {
            follower: [44.5, 47.2, 49.5, 51.8, 54.0, 56.2, 58.20],
            nonFollower: [29.8, 30.0, 29.8, 29.9, 30.1, 29.9, 29.90],
            follower30: [44.5, 45.2, 46.0, 46.8, 48.2, 49.4, 50.1, 49.6, 49.0, 48.6, 49.2, 50.0, 50.6, 51.5, 53.0, 54.0, 53.4, 52.7, 52.4, 53.2, 54.1, 54.9, 55.5, 56.0, 55.6, 55.2, 55.6, 56.5, 57.5, 58.20],
            nonFollower30: [29.8, 29.8, 29.7, 29.6, 29.2, 29.0, 29.3, 29.7, 30.0, 30.2, 30.3, 30.1, 29.9, 29.8, 29.7, 29.6, 29.8, 30.1, 30.3, 30.2, 30.0, 29.9, 29.7, 29.5, 29.7, 29.9, 30.0, 30.0, 29.9, 29.90]
          }
        }
      }
    }
  },
  'paper-son-coffee': {
    'day-one': {
      description: "Convert reachable customers into followers. You'll be able to message followers directly in Cash App.",
      reachable: '10,926',
      followers: '—',
      showAvatars: false,
      avatars: [],
      showAnalytics: false
    },
    'first-50': {
      description: "You've converted first 50+ customers into followers this month, you can now reach directly in Cash App.",
      reachable: '10,926',
      followers: '58',
      showAvatars: true,
      avatarCount: 58,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: false
    },
    'month-over-month': {
      description: "You've converted 85 customers into followers this month, increasing your average revenue by $1079",
      reachable: '10,926',
      followers: '482',
      showAvatars: true,
      avatarCount: 482,
      avatars: [avatar1, avatar2, avatar3, avatar4],
      showAnalytics: true,
      analytics: {
        visitFrequency: { follower: 2.9, nonFollower: 1.8, maxValue: 3.0 },
        averageOrderValue: { 
          follower: 12.70, 
          nonFollower: 12.50,
          chartData: {
            follower: [12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.70],
            nonFollower: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.50],
            follower30: [12.1, 12.1, 12.2, 12.2, 12.2, 12.3, 12.3, 12.3, 12.4, 12.4, 12.4, 12.5, 12.5, 12.5, 12.5, 12.6, 12.6, 12.6, 12.6, 12.6, 12.7, 12.7, 12.7, 12.7, 12.7, 12.7, 12.7, 12.7, 12.7, 12.70],
            nonFollower30: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.50]
          }
        },
        averageLifetimeValue: { 
          follower: 37.70, 
          nonFollower: 20.30,
          chartData: {
            follower: [32.0, 33.5, 34.8, 35.9, 36.5, 37.1, 37.70],
            nonFollower: [20.5, 20.4, 20.3, 20.2, 20.3, 20.3, 20.30],
            follower30: [32.0, 32.3, 32.6, 32.9, 33.2, 33.5, 33.8, 34.1, 34.4, 34.6, 34.8, 35.0, 35.2, 35.4, 35.6, 35.8, 36.0, 36.2, 36.4, 36.6, 36.8, 37.0, 37.1, 37.2, 37.3, 37.4, 37.5, 37.6, 37.7, 37.70],
            nonFollower30: [20.5, 20.5, 20.4, 20.4, 20.3, 20.3, 20.2, 20.2, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.30]
          }
        }
      }
    }
  }
}

const teamMemberAvatars = [avatar1, avatar2, avatar3, avatar4]

function FollowersSection({ activeBrand = 'joy-bakeshop', pageState = 'day-one', customerViewMode = 'returning', onCreateMessage, useNeighborhoodsLayout = false }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevPageState, setPrevPageState] = useState(pageState)
  const [prevFollowersValue, setPrevFollowersValue] = useState(0)
  const [prevBrand, setPrevBrand] = useState(activeBrand)
  const [chartAnimationKey, setChartAnimationKey] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [pressedColumn, setPressedColumn] = useState(null)
  const [customerDirectoryOpen, setCustomerDirectoryOpen] = useState(false)
  const [isDirectoryClosing, setIsDirectoryClosing] = useState(false)
  const [hoveredMetric, setHoveredMetric] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  
  // Get current data based on brand and page state
  const currentData = businessData[activeBrand]?.[pageState] || businessData['joy-bakeshop']['day-one']
  
  // Parse current followers value
  const currentFollowersNum = typeof currentData.followers === 'string' && currentData.followers !== '—'
    ? parseInt(currentData.followers.replace(/,/g, ''), 10)
    : 0
  
  useEffect(() => {
    if (pageState !== prevPageState || activeBrand !== prevBrand) {
      setIsAnimating(true)
      // Store previous followers value before state change
      const prevData = businessData[prevBrand]?.[prevPageState] || businessData['joy-bakeshop']['day-one']
      const prevNum = typeof prevData.followers === 'string' && prevData.followers !== '—'
        ? parseInt(prevData.followers.replace(/,/g, ''), 10)
        : 0
      setPrevFollowersValue(prevNum)
      
      // Trigger chart animation on brand or state change
      if (pageState === 'month-over-month') {
        setChartAnimationKey(prev => prev + 1)
      }
      
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setPrevPageState(pageState)
        setPrevBrand(activeBrand)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [pageState, prevPageState, activeBrand, prevBrand])

  const handleColumnClick = (e, type) => {
    e.stopPropagation()
    if (modalOpen) return
    
    setModalType(type)
    setModalOpen(true)
    setPressedColumn(null)
  }

  const handleAvatarsClick = (e) => {
    e.stopPropagation()
    setCustomerDirectoryOpen(true)
    setIsDirectoryClosing(false)
  }

  const handleCloseDirectory = () => {
    setIsDirectoryClosing(true)
    setTimeout(() => {
      setCustomerDirectoryOpen(false)
      setIsDirectoryClosing(false)
    }, 350)
  }

  const handleMetricMouseEnter = (metricType, e) => {
    setHoveredMetric(metricType)
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  const handleMetricMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  const handleMetricMouseLeave = () => {
    setHoveredMetric(null)
  }

  const getCustomerDirectoryDescription = () => {
    // Extract follower conversion info from the main description
    const description = currentData.description || ""
    const followersCount = currentData.followers || "0"
    const reachableCount = currentData.reachable || "0"
    
    // Parse out the number of converted followers this month
    const convertedMatch = description.match(/converted (\d+) customers/)
    const revenueMatch = description.match(/\$([0-9,]+)/)
    
    if (convertedMatch && revenueMatch) {
      const converted = convertedMatch[1]
      const revenue = revenueMatch[1]
      return `You've converted ${converted} customers into followers this month, adding ${revenue} to your revenue. These ${followersCount.toLocaleString()} followers represent your most engaged customers who visit more often and spend more over time.`
    } else if (followersCount !== "—") {
      return `You have ${followersCount.toLocaleString()} followers who have opted in to receive messages from your business. These engaged customers visit more frequently and generate higher lifetime value than non-followers.`
    } else {
      return `Build your follower base to create a direct line to your most loyal customers. Followers visit more often, spend more per order, and generate significantly higher lifetime value.`
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && customerDirectoryOpen && !isDirectoryClosing) {
        handleCloseDirectory()
      }
    }

    if (customerDirectoryOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      if (!customerDirectoryOpen) {
        document.body.style.overflow = 'unset'
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerDirectoryOpen, isDirectoryClosing])

  const handleColumnMouseDown = (type) => {
    setPressedColumn(type)
  }

  const handleColumnMouseUp = () => {
    setPressedColumn(null)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalType(null)
  }

  const isNew = (customerViewMode === 'new-1' || customerViewMode === 'new-2')
  const headerDescription = isNew
    ? "Convert reachable customers into followers. You'll be able to message followers directly in Cash App."
    : currentData.description

  if (useNeighborhoodsLayout) {
    return (
      <div className={`card followers-card followers-card-neighborhoods ${isAnimating ? 'animating' : ''}`}>
        <div className="card-header">
          <div className="card-header-info">
            <h3 className="card-title">Followers</h3>
            <p className="card-subtitle followers-card-subtext">Follower growth rate</p>
          </div>
        </div>
        <div className="followers-neighborhoods-metric-row">
          <span className="followers-row-value-text">78.5%</span>
          <span className="followers-na-pill followers-pill-green">
            <img src={TrendTriangleUp} alt="" className="trend-triangle-up" width="16" height="16" />
            <span>N/A</span>
          </span>
        </div>
        <hr className="card-divider" />
        <div className="followers-neighborhoods-row">
          <div className="followers-neighborhoods-avatars-wrap">
            <div className="followers-avatars followers-avatars-neighborhoods" onClick={(e) => handleAvatarsClick(e)}>
              {teamMemberAvatars.slice(0, 3).map((src, i) => (
                <img key={i} src={src} alt="" className="avatar followers-avatar-24" />
              ))}
            </div>
            <span className="followers-neighborhoods-text">Turn reachable customers into high-value followers.</span>
          </div>
        </div>
        {customerDirectoryOpen && (
          /* customer directory modal - reuse same as full layout when needed */
          null
        )}
      </div>
    )
  }

  return (
    <div className={`card followers-card ${isAnimating ? 'animating' : ''}`}>
      <div className="card-header">
        <div className="card-header-info">
          <h3 className="card-title">Followers</h3>
          <p className="card-subtitle">{headerDescription}</p>
        </div>
        <button type="button" className="card-action" onClick={onCreateMessage}>
          View insights
        </button>
      </div>
      <hr className="card-divider" />
      <div className="followers-content-wrapper">
        <div className="card-rows followers-rows">
          <div
            className="card-row followers-metric-row"
            onMouseEnter={(e) => handleMetricMouseEnter('followers', e)}
            onMouseMove={handleMetricMouseMove}
            onMouseLeave={handleMetricMouseLeave}
          >
            <div className="v3-icon-container followers-row-value">
              <span className="followers-row-value-text">
                {currentData.followers === '—' ? '—' : (
                  <AnimatedCounter value={currentData.followers} startValue={prevFollowersValue} duration={2000} />
                )}
              </span>
            </div>
            <h4 className="service-title">Followers</h4>
            <span className="v3-service-subtitle">Loyal customers who follow you in Cash App</span>
            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
          </div>
          <div
            className="card-row followers-metric-row"
            onMouseEnter={(e) => handleMetricMouseEnter('reachable', e)}
            onMouseMove={handleMetricMouseMove}
            onMouseLeave={handleMetricMouseLeave}
          >
            <div className="v3-icon-container followers-row-value">
              <span className="followers-row-value-text">{currentData.reachable}</span>
            </div>
            <h4 className="service-title">Reachable customers</h4>
            <span className="v3-service-subtitle">Customers who shared their email or phone</span>
            <img src={ChevronRightIcon} alt="" className="v3-chevron" width="16" height="16" />
          </div>
        </div>

        {isNew ? (
          <p className="followers-new-copy">Convert reachable customers into followers so you can message them directly in Cash App.</p>
        ) : (
          <>
        {currentData.showAnalytics && (
          <>
            <div className="analytics-divider"></div>
            <div className={`analytics-section followers-analytics-two-cols ${(pageState === 'month-over-month') ? 'animate-in' : ''}`} key={chartAnimationKey}>
              {/* Column 1: Visit Frequency */}
              <div 
                className={`analytics-column ${pressedColumn === 'visit-frequency' ? 'pressed' : ''}`}
                onClick={(e) => handleColumnClick(e, 'visit-frequency')}
                onMouseDown={() => handleColumnMouseDown('visit-frequency')}
                onMouseUp={handleColumnMouseUp}
                onMouseLeave={handleColumnMouseUp}
              >
                <h3 className="analytics-title">
                  <span>Visit frequency</span>
                  <img src={ArrowRightIcon} alt="" className="title-arrow" width="16" height="16" />
                </h3>
                <div className="bar-chart">
                  <div className="bar-item">
                    <div className="bar-row">
                      <div className="bar-container">
                      <div 
                        className="bar follower-bar" 
                        style={{ 
                          '--target-width': `${(currentData.analytics.visitFrequency.follower / currentData.analytics.visitFrequency.maxValue) * 100}%`,
                          width: (pageState === 'month-over-month') ? '0%' : `${(currentData.analytics.visitFrequency.follower / currentData.analytics.visitFrequency.maxValue) * 100}%`
                        }}
                      ></div>
                      </div>
                    </div>
                    <div className="bar-label">
                      <span className="label-text">Follower</span>
                      <span className="label-value">{currentData.analytics.visitFrequency.follower}x</span>
                    </div>
                  </div>
                  <div className="bar-item">
                    <div className="bar-row">
                      <div className="bar-container">
                      <div 
                        className="bar non-follower-bar" 
                        style={{ 
                          '--target-width': `${(currentData.analytics.visitFrequency.nonFollower / currentData.analytics.visitFrequency.maxValue) * 100}%`,
                          width: (pageState === 'month-over-month') ? '0%' : `${(currentData.analytics.visitFrequency.nonFollower / currentData.analytics.visitFrequency.maxValue) * 100}%`
                        }}
                      ></div>
                      </div>
                    </div>
                    <div className="bar-label">
                      <span className="label-text">Non-follower</span>
                      <span className="label-value">{currentData.analytics.visitFrequency.nonFollower}x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Average Order Value */}
              <div 
                className={`analytics-column ${pressedColumn === 'average-order-value' ? 'pressed' : ''}`}
                onClick={(e) => handleColumnClick(e, 'average-order-value')}
                onMouseDown={() => handleColumnMouseDown('average-order-value')}
                onMouseUp={handleColumnMouseUp}
                onMouseLeave={handleColumnMouseUp}
              >
                <h3 className="analytics-title">
                  <span>Average order value</span>
                  <img src={ArrowRightIcon} alt="" className="title-arrow" width="16" height="16" />
                </h3>
                <div className="line-chart">
                  <div className="line-chart-container">
                    <div className="chart-grid">
                      <div className="gridline"></div>
                      <div className="gridline"></div>
                      <div className="gridline"></div>
                      <div className="gridline"></div>
                      <div className="gridline"></div>
                      <div className="gridline"></div>
                    </div>
                    <svg className="line-chart-svg" viewBox="0 0 195 73" preserveAspectRatio="none">
                      <path
                        className="line non-follower-line"
                        d={generateSmoothPath(
                          currentData.analytics.averageOrderValue.chartData.nonFollower30,
                          [...currentData.analytics.averageOrderValue.chartData.follower30, ...currentData.analytics.averageOrderValue.chartData.nonFollower30]
                        )}
                        fill="none"
                        strokeWidth="2"
                      />
                      <path
                        className="line follower-line"
                        d={generateSmoothPath(
                          currentData.analytics.averageOrderValue.chartData.follower30,
                          [...currentData.analytics.averageOrderValue.chartData.follower30, ...currentData.analytics.averageOrderValue.chartData.nonFollower30]
                        )}
                        fill="none"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="legend-dot follower-dot"></span>
                      <span className="legend-text">Follower</span>
                    </div>
                    <div className="legend-right">
                      <span className="legend-value">${currentData.analytics.averageOrderValue.follower.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="legend-dot non-follower-dot"></span>
                      <span className="legend-text">Non-follower</span>
                    </div>
                    <div className="legend-right">
                      <span className="legend-value">${currentData.analytics.averageOrderValue.nonFollower.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
          </>
        )}
      </div>

      <AnalyticsModal 
        isOpen={modalOpen}
        onClose={closeModal}
        type={modalType}
        data={currentData.analytics || {}}
      />

      {(customerDirectoryOpen || isDirectoryClosing) && (
        <div className={`modal-overlay ${isDirectoryClosing ? 'closing' : ''}`} onClick={handleCloseDirectory}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-inner">
                <button className="modal-close" onClick={handleCloseDirectory} aria-label="Close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <h2 className="modal-title">Customer directory</h2>
              </div>
            </div>
            <div className="modal-content">
              <div className="modal-summary-wrapper">
                <p className="modal-description">
                  {getCustomerDirectoryDescription()}
                </p>
              </div>

              <div className="modal-section customer-directory-section">
                <div className="segmented-control">
                  <button className="segment-button active">Followers</button>
                  <button className="segment-button">Reachable</button>
                </div>

                <div className="customer-table">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img src={avatar1} alt="Customer" className="table-avatar" />
                        </td>
                        <td>Nora Atrakchi</td>
                        <td>nora.atrakchi@gmail.com</td>
                        <td></td>
                        <td>35</td>
                      </tr>
                      <tr>
                        <td>
                          <img src={avatar2} alt="Customer" className="table-avatar" />
                        </td>
                        <td>Darya Kishylau</td>
                        <td>darya.k@gmail.com</td>
                        <td>+1 (965) 479-2820</td>
                        <td>27</td>
                      </tr>
                      <tr>
                        <td>
                          <img src={avatar3} alt="Customer" className="table-avatar" />
                        </td>
                        <td>David Leung</td>
                        <td>david.leung@gmail.com</td>
                        <td>+1 (202) 555-0187</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>
                          <img src={avatar4} alt="Customer" className="table-avatar" />
                        </td>
                        <td>Tyler Reinhard</td>
                        <td>tyler.reinhard@gmail.com</td>
                        <td></td>
                        <td>18</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#D97757' }}>AL</div>
                        </td>
                        <td>Alycia Lin</td>
                        <td>alycia4545@gmail.com</td>
                        <td>+1 (923) 243-2805</td>
                        <td>13</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#5B8A6E' }}>AS</div>
                        </td>
                        <td>Antonio Silva</td>
                        <td>antsilva@gmail.com</td>
                        <td></td>
                        <td>49</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#8B6DB8' }}>BS</div>
                        </td>
                        <td>Ben Stein</td>
                        <td></td>
                        <td>+1 (417) 682-5534</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#4A8B9B' }}>CW</div>
                        </td>
                        <td>Camille Wiese</td>
                        <td>wisewiese@hotmail.com</td>
                        <td></td>
                        <td>17</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#C76B8F' }}>CL</div>
                        </td>
                        <td>Christina Lay</td>
                        <td>monserrat@example.net</td>
                        <td>+1 (573) 355-1336</td>
                        <td>23</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#6B7FB8' }}>CB</div>
                        </td>
                        <td>Cliff Bowman</td>
                        <td>bowman748@yahoo.com</td>
                        <td>+1 (203) 522-2227</td>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#B8864A' }}>DJ</div>
                        </td>
                        <td>Dave Johannes</td>
                        <td>johajoha12@gmail.com</td>
                        <td>+1 (661) 367-7126</td>
                        <td>21</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#8A6B4A' }}>ER</div>
                        </td>
                        <td>Elisa Rizzo</td>
                        <td>rizzo_elisa@yahoo.com</td>
                        <td>+1 (732) 416-1178</td>
                        <td>7</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#7A5B9E' }}>EW</div>
                        </td>
                        <td>Emi Watanabe</td>
                        <td>ewatanabe@gmail.com</td>
                        <td></td>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#B85C6B' }}>EH</div>
                        </td>
                        <td>Erin Hills</td>
                        <td>ehills@hotmail.com</td>
                        <td>+1 (465) 434-9121</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#5B8FB9' }}>EM</div>
                        </td>
                        <td>Esteban Martinez</td>
                        <td>esteban600@yahoo.com</td>
                        <td>+1 (443) 405-9289</td>
                        <td>17</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="table-avatar table-avatar-text" style={{ backgroundColor: '#6B9B7A' }}>IY</div>
                        </td>
                        <td>Issei Yamamoto</td>
                        <td>yamaom0t0@gmail.com</td>
                        <td>+1 (540) 591-5362</td>
                        <td>25</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="modal-footer-inner">
                <button className="prompt-plus-button" aria-label="Add">
                  <img src={PlusIcon} alt="Add" width="16" height="16" />
                </button>
                <input 
                  type="text" 
                  className="prompt-input" 
                  placeholder="Ask anything about your data"
                />
                <button className="prompt-send-button" aria-label="Send">
                  <img src={SendIcon} alt="Send" width="16" height="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metric Tooltip */}
      {hoveredMetric && (
        <div
          className="metric-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="tooltip-title">
            {hoveredMetric === 'reachable' ? 'Reachable' : 'Followers'}
          </div>
          <div className="tooltip-description">
            {hoveredMetric === 'reachable' 
              ? "Customers who've opted in to hear from you by sharing their email or phone number. You can reach them with marketing messages, but they haven't followed you in Cash App yet."
              : "Customers who've chosen to follow your business in Cash App or at your POS. You can message them directly in Cash App, and they tend to visit more often and spend more."
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default FollowersSection

