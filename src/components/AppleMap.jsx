import { useEffect, useRef, useState } from 'react'

const MAPKIT_TOKEN = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQyTDI4NUFDQlcifQ.eyJpc3MiOiJaV0syNVRHNTVVIiwiaWF0IjoxNzcyNzQ0NzM1LCJleHAiOjE3ODgyOTY3MzUsIm9yaWdpbiI6IioifQ.pgeY4WmqTeU2_Qr7ILXcq0EIRsQO3udPY5O8z9L_jofiMWv5rHwtK0BYQZ5yMQT0AfG0O7nefs1v69IWKRrNzw'

let mapkitInitialized = false

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function AppleMap({ center = { lat: 33.7866, lng: -84.3870 }, rotation = 310 }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    function initMap() {
      if (!window.mapkit || !mapRef.current) return

      if (!mapkitInitialized) {
        window.mapkit.init({
          authorizationCallback: (done) => done(MAPKIT_TOKEN),
        })
        mapkitInitialized = true
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy()
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const startDistance = 11000
      const endDistance = 5000
      const duration = 1800

      const map = new window.mapkit.Map(mapRef.current, {
        center: new window.mapkit.Coordinate(center.lat, center.lng),
        cameraDistance: startDistance,
        rotation: rotation,
        showsCompass: window.mapkit.FeatureVisibility.Hidden,
        showsMapTypeControl: false,
        showsZoomControl: false,
        showsScale: window.mapkit.FeatureVisibility.Hidden,
        showsPointsOfInterest: false,
        isScrollEnabled: false,
        isZoomEnabled: false,
        mapType: window.mapkit.Map.MapTypes.Standard,
        colorScheme: isDark ? window.mapkit.Map.ColorSchemes.Dark : window.mapkit.Map.ColorSchemes.Light,
      })

      map.isRotationEnabled = false
      mapInstanceRef.current = map

      requestAnimationFrame(() => {
        setAnimateIn(true)

        const startTime = performance.now()
        function animateZoom(now) {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = easeOutCubic(progress)
          const currentDistance = startDistance + (endDistance - startDistance) * eased
          map.cameraDistance = currentDistance
          if (progress < 1) {
            requestAnimationFrame(animateZoom)
          }
        }
        requestAnimationFrame(animateZoom)
      })
    }

    if (window.mapkit && window.mapkit.Map) {
      initMap()
    } else {
      const check = setInterval(() => {
        if (window.mapkit && window.mapkit.Map) {
          clearInterval(check)
          initMap()
        }
      }, 100)
      return () => clearInterval(check)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy()
        mapInstanceRef.current = null
      }
    }
  }, [center.lat, center.lng, rotation])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (mapInstanceRef.current) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        mapInstanceRef.current.colorScheme = isDark
          ? window.mapkit.Map.ColorSchemes.Dark
          : window.mapkit.Map.ColorSchemes.Light
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`apple-map-wrapper${animateIn ? ' apple-map-animate-in' : ''}`}>
      <div ref={mapRef} className="apple-map-inner" />
    </div>
  )
}

export default AppleMap
