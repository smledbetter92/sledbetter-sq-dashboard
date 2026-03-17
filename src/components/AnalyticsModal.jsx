import { useEffect, useState, useRef } from 'react'
import './AnalyticsModal.css'
import XIcon from '../assets/Product review 12/X.svg'
import PlusIcon from '../assets/Product review 12/Plus16.svg'
import SendIcon from '../assets/Product review 12/send-icon.svg'
import TrendTriangleUp from '../assets/Product review 12/Trend triangle up.svg'

// Interactive Bar Chart Component
function InteractiveBarChart({ data, title }) {
  const [dimensions, setDimensions] = useState({ width: 752, height: 300 })
  const chartRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setDimensions({ width, height: 300 })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const chartWidth = dimensions.width
  const chartHeight = dimensions.height
  const padding = { top: 40, right: 20, bottom: 40, left: 20 }
  const plotWidth = chartWidth - padding.left - padding.right
  const plotHeight = chartHeight - padding.top - padding.bottom

  // Generate day of week data
  const generateDayOfWeekData = () => {
    const followerTarget = data.follower || 2.0
    const nonFollowerTarget = data.nonFollower || 1.3
    
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    return daysOfWeek.map(day => {
      // Add slight variation for each day
      const followerVariation = (Math.random() - 0.5) * 0.2
      const nonFollowerVariation = (Math.random() - 0.5) * 0.15
      
      return {
        day,
        followerValue: Math.max(0.5, followerTarget + followerVariation),
        nonFollowerValue: Math.max(0.5, nonFollowerTarget + nonFollowerVariation)
      }
    })
  }

  const dayData = generateDayOfWeekData()
  const followerData = dayData.map(d => d.followerValue)
  const nonFollowerData = dayData.map(d => d.nonFollowerValue)

  // Calculate max for Y axis
  const maxValue = Math.ceil(Math.max(...followerData, ...nonFollowerData) * 1.2)
  const yRange = maxValue

  // Generate Y axis labels
  const yLabels = []
  const numYLabels = 5
  for (let i = 0; i <= numYLabels; i++) {
    yLabels.push((yRange / numYLabels) * i)
  }

  // Bar dimensions
  const barGroupWidth = plotWidth / dayData.length
  const barWidth = (barGroupWidth * 0.4) / 2
  const barGap = barGroupWidth * 0.05

  const getX = (index, isFollower) => {
    const groupX = padding.left + (index * barGroupWidth) + (barGroupWidth * 0.15)
    return isFollower ? groupX : groupX + barWidth + barGap
  }

  const getY = (value) => padding.top + plotHeight - ((value / yRange) * plotHeight)
  const getBarHeight = (value) => (value / yRange) * plotHeight

  // Calculate averages
  const avgFollowerValue = followerData.reduce((a, b) => a + b, 0) / followerData.length
  const avgNonFollowerValue = nonFollowerData.reduce((a, b) => a + b, 0) / nonFollowerData.length
  const avgPercentChange = ((avgFollowerValue - avgNonFollowerValue) / avgNonFollowerValue) * 100

  return (
    <div ref={containerRef} className="interactive-bar-chart">
      {/* Top summary section */}
      <div className="chart-summary">
        <div className="summary-column">
          <div className="summary-label">Follower</div>
          <div className="summary-value-row">
            <span className="summary-value">{avgFollowerValue.toFixed(1)}x</span>
            {avgPercentChange > 0 && (
              <span className="metric-chip">
                <img src={TrendTriangleUp} alt="" className="trend-triangle-up" width="16" height="16" />
                <span className="metric-percentage">{avgPercentChange.toFixed(2)}%</span>
              </span>
            )}
          </div>
        </div>
        <div className="summary-column">
          <div className="summary-label">Non-follower</div>
          <div className="summary-value-row">
            <span className="summary-value">{avgNonFollowerValue.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      <svg
        ref={chartRef}
        width={chartWidth}
        height={chartHeight}
      >
        {/* Y-axis grid lines (no labels) */}
        {yLabels.map((label, i) => {
          const y = padding.top + plotHeight - (i / numYLabels) * plotHeight
          return (
            <line
              key={i}
              x1={padding.left}
              y1={y}
              x2={padding.left + plotWidth}
              y2={y}
              stroke="#E5E5E5"
              strokeWidth="1"
            />
          )
        })}

        {/* Bars with labels */}
        {dayData.map((day, i) => (
          <g key={i}>
            {/* Follower bar */}
            <rect
              x={getX(i, true)}
              y={getY(day.followerValue)}
              width={barWidth}
              height={getBarHeight(day.followerValue)}
              fill="#101010"
              rx={barWidth / 2}
              ry={barWidth / 2}
            />
            {/* Follower label above bar */}
            <text
              x={getX(i, true) + barWidth / 2}
              y={getY(day.followerValue) - 8}
              textAnchor="middle"
              fontSize="12"
              fill="#101010"
              fontFamily="Square Sans Text, sans-serif"
              fontWeight="600"
            >
              {day.followerValue.toFixed(1)}x
            </text>
            
            {/* Non-follower bar */}
            <rect
              x={getX(i, false)}
              y={getY(day.nonFollowerValue)}
              width={barWidth}
              height={getBarHeight(day.nonFollowerValue)}
              fill="#959595"
              rx={barWidth / 2}
              ry={barWidth / 2}
            />
            {/* Non-follower label above bar */}
            <text
              x={getX(i, false) + barWidth / 2}
              y={getY(day.nonFollowerValue) - 8}
              textAnchor="middle"
              fontSize="12"
              fill="#959595"
              fontFamily="Square Sans Text, sans-serif"
              fontWeight="400"
            >
              {day.nonFollowerValue.toFixed(1)}x
            </text>
          </g>
        ))}

        {/* X-axis labels (days of week) */}
        {dayData.map((day, i) => {
          const x = padding.left + (i * barGroupWidth) + (barGroupWidth / 2)
          return (
            <text
              key={i}
              x={x}
              y={padding.top + plotHeight + 25}
              textAnchor="middle"
              fontSize="12"
              fill="#666666"
              fontFamily="Square Sans Text, sans-serif"
            >
              {day.day}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

// Interactive Line Chart Component
function InteractiveLineChart({ data, title }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 752, height: 300 })
  const chartRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setDimensions({ width, height: 300 })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const chartWidth = dimensions.width
  const chartHeight = dimensions.height
  const padding = { top: 20, right: 20, bottom: 40, left: 60 }
  const plotWidth = chartWidth - padding.left - padding.right
  const plotHeight = chartHeight - padding.top - padding.bottom

  // Generate last 30 days dates
  const dates = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date)
  }

  // Generate 30 days of realistic data
  const generateRealisticData = () => {
    if (data.chartData?.follower30 && data.chartData?.nonFollower30) {
      return {
        follower: data.chartData.follower30,
        nonFollower: data.chartData.nonFollower30
      }
    }
    
    // If no 30-day data, generate it
    const followerData = []
    const nonFollowerData = []
    
    // Starting values (both similar)
    let followerValue = 19.5
    let nonFollowerValue = 19.8
    
    for (let i = 0; i < 30; i++) {
      // Follower steadily increases with some variation
      followerValue += (Math.random() * 0.5) + 0.15 // +0.15 to +0.65 per day
      if (Math.random() < 0.2) followerValue -= Math.random() * 0.8 // Occasional dips
      
      // Non-follower stays more consistent
      nonFollowerValue += (Math.random() * 0.2) - 0.05 // -0.05 to +0.15 per day
      
      followerData.push(Math.max(19, followerValue))
      nonFollowerData.push(Math.max(19, Math.min(21, nonFollowerValue)))
    }
    
    return { follower: followerData, nonFollower: nonFollowerData }
  }

  // Generate data points
  const { follower: followerData, nonFollower: nonFollowerData } = generateRealisticData()

  // Calculate min/max for Y axis
  const allValues = [...followerData, ...nonFollowerData]
  const minValue = Math.floor(Math.min(...allValues) * 0.9)
  const maxValue = Math.ceil(Math.max(...allValues) * 1.1)
  const yRange = maxValue - minValue

  // Generate Y axis labels
  const yLabels = []
  const numYLabels = 5
  for (let i = 0; i <= numYLabels; i++) {
    yLabels.push(minValue + (yRange / numYLabels) * i)
  }

  // Convert data to coordinates
  const getX = (index) => padding.left + (index / (dates.length - 1)) * plotWidth
  const getY = (value) => padding.top + plotHeight - ((value - minValue) / yRange) * plotHeight

  // Generate SVG path
  const generatePath = (dataPoints) => {
    let path = `M ${getX(0)} ${getY(dataPoints[0])}`
    for (let i = 1; i < dataPoints.length; i++) {
      const x = getX(i)
      const y = getY(dataPoints[i])
      const prevX = getX(i - 1)
      const prevY = getY(dataPoints[i - 1])
      const cpX = prevX + (x - prevX) * 0.5
      path += ` C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`
    }
    return path
  }

  const handleMouseMove = (e) => {
    if (!chartRef.current) return
    const rect = chartRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - padding.left
    
    if (x < 0 || x > plotWidth) {
      setHoveredIndex(null)
      return
    }

    const index = Math.round((x / plotWidth) * (dates.length - 1))
    setHoveredIndex(index)
    // Use fixed positioning relative to viewport
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatDateLong = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  // Calculate average and current values for display
  const currentFollowerValue = followerData[followerData.length - 1]
  const currentNonFollowerValue = nonFollowerData[nonFollowerData.length - 1]
  const avgFollowerValue = followerData.reduce((a, b) => a + b, 0) / followerData.length
  const percentChange = ((currentFollowerValue - followerData[0]) / followerData[0]) * 100

  return (
    <div ref={containerRef} className="interactive-line-chart">
      {/* Top summary section */}
      <div className="chart-summary">
        <div className="summary-column">
          <div className="summary-label">Follower</div>
          <div className="summary-value-row">
            <span className="summary-value">${currentFollowerValue.toFixed(2)}</span>
            {percentChange > 0 && (
              <span className="metric-chip">
                <img src={TrendTriangleUp} alt="" className="trend-triangle-up" width="16" height="16" />
                <span className="metric-percentage">{percentChange.toFixed(2)}%</span>
              </span>
            )}
          </div>
        </div>
        <div className="summary-column">
          <div className="summary-label">Non-follower</div>
          <div className="summary-value-row">
            <span className="summary-value">${currentNonFollowerValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <svg
        ref={chartRef}
        width={chartWidth}
        height={chartHeight}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ overflow: 'visible' }}
      >
        {/* Horizontal grid lines */}
        {yLabels.map((label, i) => {
          const y = getY(label)
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#E5E5E5"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#666666"
                fontFamily="Square Sans Text"
              >
                ${label.toFixed(0)}
              </text>
            </g>
          )
        })}

        {/* X axis labels (show every 5 days) */}
        {dates.map((date, i) => {
          if (i % 5 === 0 || i === dates.length - 1) {
            return (
              <text
                key={i}
                x={getX(i)}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666666"
                fontFamily="Square Sans Text"
              >
                {formatDate(date)}
              </text>
            )
          }
          return null
        })}

        {/* Follower line */}
        <path
          d={generatePath(followerData)}
          fill="none"
          stroke="#101010"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Non-follower line */}
        <path
          d={generatePath(nonFollowerData)}
          fill="none"
          stroke="#959595"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover point indicators */}
        {hoveredIndex !== null && (
          <>
            <circle
              cx={getX(hoveredIndex)}
              cy={getY(followerData[hoveredIndex])}
              r="5"
              fill="#101010"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <circle
              cx={getX(hoveredIndex)}
              cy={getY(nonFollowerData[hoveredIndex])}
              r="5"
              fill="#959595"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <line
              x1={getX(hoveredIndex)}
              y1={padding.top}
              x2={getX(hoveredIndex)}
              y2={chartHeight - padding.bottom}
              stroke="#DADADA"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </>
        )}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div
          className="chart-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="tooltip-header">{title}</div>
          <div className="tooltip-date">{formatDateLong(dates[hoveredIndex])}</div>
          <div className="tooltip-values">
            <div className="tooltip-value-row">
              <span className="tooltip-dot follower-dot"></span>
              <span className="tooltip-label">Followers</span>
              <span className="tooltip-amount">${followerData[hoveredIndex].toFixed(2)}</span>
            </div>
            <div className="tooltip-value-row">
              <span className="tooltip-dot non-follower-dot"></span>
              <span className="tooltip-label">Non-followers</span>
              <span className="tooltip-amount">${nonFollowerData[hoveredIndex].toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="chart-bottom-legend">
        <div className="legend-item">
          <span className="legend-dot follower-legend-dot"></span>
          <span className="legend-text">Follower</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot non-follower-legend-dot"></span>
          <span className="legend-text">Non-follower</span>
        </div>
      </div>
    </div>
  )
}

function AnalyticsModal({ isOpen, onClose, type, data }) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 350)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isClosing])

  if (!isOpen && !isClosing) return null

  const getVisitFrequencyDescription = (visitData) => {
    if (!visitData) return "Followers visit more often than non-followers, showing stronger engagement across all channels."
    
    const followerRate = visitData.follower
    const nonFollowerRate = visitData.nonFollower
    const difference = followerRate - nonFollowerRate
    const percentIncrease = ((difference / nonFollowerRate) * 100).toFixed(0)
    
    // Handle case where followers visit less often than non-followers
    if (difference < 0) {
      return `Followers signal interest in your business. While they currently visit ${followerRate.toFixed(1)}x per month compared to ${nonFollowerRate.toFixed(1)}x for non-followers, they're the customers most likely to respond to messages and offers, giving you a powerful lever to drive repeat visits and deepen engagement.`
    }
    
    // Generate natural descriptions based on the data
    if (difference >= 1.0) {
      return `Followers visit ${followerRate.toFixed(1)}x per month compared to ${nonFollowerRate.toFixed(1)}x for non-followers—nearly ${percentIncrease}% more often. This consistent engagement shows strong loyalty across in-person, online, and Cash App visits.`
    } else if (difference >= 0.5) {
      return `Followers visit ${followerRate.toFixed(1)}x per month, ${percentIncrease}% more than non-followers at ${nonFollowerRate.toFixed(1)}x. This higher frequency reflects growing loyalty and repeat visits across all channels.`
    } else if (difference >= 0.2) {
      return `Followers visit ${followerRate.toFixed(1)}x per month compared to ${nonFollowerRate.toFixed(1)}x for non-followers—${percentIncrease}% more often. Even this early difference shows followers are building stronger habits with your business.`
    } else {
      return `Followers visit ${followerRate.toFixed(1)}x per month, maintaining ${percentIncrease}% higher frequency than non-followers at ${nonFollowerRate.toFixed(1)}x. As your follower base grows, this consistent engagement will drive meaningful revenue.`
    }
  }

  const getAverageOrderValueDescription = (aovData) => {
    if (!aovData) return "Followers consistently order higher-value items, with spending patterns showing steady growth over time."
    
    const followerAOV = aovData.follower
    const nonFollowerAOV = aovData.nonFollower
    const difference = followerAOV - nonFollowerAOV
    const percentDiff = ((Math.abs(difference) / nonFollowerAOV) * 100).toFixed(0)
    
    // Handle case where follower AOV is lower
    if (difference < 0) {
      return `Followers currently spend $${followerAOV.toFixed(2)} per order compared to $${nonFollowerAOV.toFixed(2)} for non-followers. However, followers are uniquely positioned to respond to targeted offers and recommendations, making them ideal customers for increasing order value through personalized messaging and promotions.`
    }
    
    // Check if follower AOV is higher
    if (difference > 0) {
      if (difference >= 5) {
        return `Followers spend $${followerAOV.toFixed(2)} per order on average—${percentDiff}% more than non-followers at $${nonFollowerAOV.toFixed(2)}. This higher order value shows followers are choosing premium items and adding more to each purchase.`
      } else if (difference >= 2) {
        return `Followers spend $${followerAOV.toFixed(2)} per order, ${percentDiff}% more than non-followers at $${nonFollowerAOV.toFixed(2)}. Even small increases in order value compound significantly with their higher visit frequency.`
      } else {
        return `Followers spend $${followerAOV.toFixed(2)} per order compared to $${nonFollowerAOV.toFixed(2)} for non-followers—${percentDiff}% higher. Combined with more frequent visits, this drives meaningful revenue growth over time.`
      }
    } else {
      // Handle cases where AOV is equal
      return `Followers currently spend $${followerAOV.toFixed(2)} per order, the same as non-followers. What makes followers valuable is their direct connection to your business, giving you the ability to drive both frequency and order value through targeted engagement.`
    }
  }

  const getLifetimeValueDescription = (ltvData) => {
    if (!ltvData) return "Followers generate significantly higher lifetime value, with growing spending patterns that show the long-term impact of loyalty."
    
    const followerLTV = ltvData.follower
    const nonFollowerLTV = ltvData.nonFollower
    const difference = followerLTV - nonFollowerLTV
    const percentIncrease = ((Math.abs(difference) / nonFollowerLTV) * 100).toFixed(0)
    
    // Handle case where follower LTV is lower
    if (difference < 0) {
      return `Followers currently generate $${followerLTV.toFixed(2)} in lifetime value compared to $${nonFollowerLTV.toFixed(2)} for non-followers. The real opportunity lies in followers' openness to engagement. With direct messaging access, you can nurture these relationships to unlock significantly higher long-term value through repeat visits and larger purchases.`
    }
    
    // Generate descriptions based on LTV difference
    if (difference >= 30) {
      return `Followers generate $${followerLTV.toFixed(2)} in lifetime value—${percentIncrease}% more than non-followers at $${nonFollowerLTV.toFixed(2)}. This substantial difference comes from more frequent visits and sustained engagement that builds over time.`
    } else if (difference >= 15) {
      return `Followers generate $${followerLTV.toFixed(2)} in lifetime value, ${percentIncrease}% higher than non-followers at $${nonFollowerLTV.toFixed(2)}. Their consistent visits and growing order values create meaningful long-term revenue.`
    } else if (difference >= 5) {
      return `Followers generate $${followerLTV.toFixed(2)} in lifetime value—${percentIncrease}% more than non-followers at $${nonFollowerLTV.toFixed(2)}. As they continue visiting more often, this gap will grow even wider over time.`
    } else {
      return `Followers generate $${followerLTV.toFixed(2)} in lifetime value, ${percentIncrease}% higher than non-followers at $${nonFollowerLTV.toFixed(2)}. Early in their journey, this difference will expand as their loyalty deepens.`
    }
  }

  const getCustomerDirectoryDescription = (brandData) => {
    // This function will be called from the FollowersSection component
    // For now, return a placeholder that will be replaced with actual data
    return "Your most engaged customers are following you in Cash App, giving you a direct line to build loyalty and drive repeat visits."
  }

  const getModalContent = () => {
    switch (type) {
      case 'visit-frequency':
        return {
          title: 'Visit frequency',
          description: getVisitFrequencyDescription(data.visitFrequency),
          sections: [
            {
              title: 'Visit frequency averages',
              type: 'interactive-bar-chart',
              data: data.visitFrequency
            },
            {
              title: 'Follower visit sources',
              type: 'breakdown',
              items: [
                { label: 'In person', value: '+60' },
                { label: 'Online', value: '+82' },
                { label: 'Cash App', value: '+34' }
              ]
            }
          ]
        }
      case 'average-order-value':
        return {
          title: 'Average order value',
          description: getAverageOrderValueDescription(data.averageOrderValue),
          sections: [
            {
              title: 'Order value trends',
              type: 'line-chart',
              data: data.averageOrderValue
            }
          ]
        }
      case 'lifetime-value':
        return {
          title: 'Lifetime value',
          description: getLifetimeValueDescription(data.averageLifetimeValue),
          sections: [
            {
              title: 'Lifetime value trends',
              type: 'line-chart',
              data: data.averageLifetimeValue
            }
          ]
        }
      case 'customer-directory':
        return {
          title: 'Customer directory',
          description: data.directoryDescription || getCustomerDirectoryDescription(),
          sections: []
        }
      default:
        return { title: '', description: '', sections: [] }
    }
  }

  const content = getModalContent()

  return (
    <div 
      className={`modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-inner">
            <button className="modal-close" onClick={handleClose} aria-label="Close">
              <img src={XIcon} alt="Close" width="24" height="24" />
            </button>
            <h2 className="modal-title">{content.title}</h2>
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-summary-wrapper">
            <p className="modal-description">{content.description}</p>
          </div>

          {content.sections.map((section, index) => (
            <div key={index} className="modal-section">
              <h3 className="modal-section-title">{section.title}</h3>
              
              {section.type === 'bar-chart' && section.data && (
                <div className="modal-bar-chart">
                  <div className="modal-bar-item">
                    <div className="modal-bar-row">
                      <div className="modal-bar-container">
                        <div 
                          className="modal-bar modal-follower-bar" 
                          style={{ width: `${(section.data.follower / section.data.maxValue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="modal-bar-label">
                      <span className="modal-label-text">Follower</span>
                      <span className="modal-label-value">{section.data.follower}x</span>
                    </div>
                  </div>
                  <div className="modal-bar-item">
                    <div className="modal-bar-row">
                      <div className="modal-bar-container">
                        <div 
                          className="modal-bar modal-non-follower-bar" 
                          style={{ width: `${(section.data.nonFollower / section.data.maxValue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="modal-bar-label">
                      <span className="modal-label-text">Non-follower</span>
                      <span className="modal-label-value">{section.data.nonFollower}x</span>
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'breakdown' && section.items && (
                <div className="modal-breakdown">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="modal-breakdown-item">
                      <div className="modal-breakdown-bar-row">
                        <div className="modal-breakdown-bar-container">
                          <div 
                            className="modal-breakdown-bar"
                            style={{ width: `${(parseInt(item.value.replace('+', '')) / 82) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="modal-breakdown-label">
                        <span className="modal-breakdown-text">{item.label}</span>
                        <span className="modal-breakdown-value">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'line-chart' && section.data && (
                <InteractiveLineChart data={section.data} title={section.title} />
              )}

              {section.type === 'interactive-bar-chart' && section.data && (
                <InteractiveBarChart data={section.data} title={section.title} />
              )}
            </div>
          ))}
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
  )
}

export default AnalyticsModal

