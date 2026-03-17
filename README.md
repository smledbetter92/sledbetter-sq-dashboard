# veeo-seller-dashboard

Seller dashboard design/prototype (React + Vite). A metrics dashboard UI built with React that replicates the Figma design for online-dashboard, with data modules and AI-generated natural language summaries.

## Features

- **Followers Section**: Track reachable customers and followers with natural language insights
- **Orders Module**: View popular products with followers
- **Messages Module**: Manage automated messages with status indicators
- **Clean Navigation**: Sidebar with search and menu navigation
- **Responsive Layout**: Production-ready component matching exact Figma specifications

## Tech Stack

- React 18.3
- Vite (build tool)
- CSS Modules for styling

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Design Specifications

This component matches the Figma design with:

- **Colors**: 
  - Primary Blue: `#2D4CFF`
  - Black Text: `#000000`
  - Gray Text: `#6B7280`
  - Background: `#F3F4F6`
  - Active Green: `#10B981`

- **Typography**: System font stack with proper weights and sizes
- **Spacing**: Consistent 8px grid system
- **Components**: No unnecessary abstractions, production-level code

## Component Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main container
│   ├── Sidebar.jsx            # Left navigation
│   ├── MainContent.jsx        # Main content area
│   ├── Banner.jsx             # Success banner
│   ├── FollowersSection.jsx   # Followers metrics
│   ├── OrdersCard.jsx         # Orders module
│   └── MessagesCard.jsx       # Messages module
├── App.jsx                    # Root component
└── main.jsx                   # Entry point
```

## Acceptance Criteria

✅ Component visually matches the Figma design  
✅ No unused props or unnecessary abstractions  
✅ Clean, production-level code  
✅ Proper spacing, colors, and typography  
✅ Data modules with natural language summaries

