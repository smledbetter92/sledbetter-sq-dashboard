import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxWidth: 600 }}>
          <h2 style={{ color: '#bf0020' }}>Something went wrong</h2>
          <p><strong>{this.state.error?.message}</strong></p>
          <details>
            <summary>Stack</summary>
            <pre style={{ fontSize: 12, overflow: 'auto' }}>{this.state.error?.stack}</pre>
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
