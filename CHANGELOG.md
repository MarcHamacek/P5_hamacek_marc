# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0]

### Added

- Material-UI integration with custom theme
- Responsive design for mobile devices (< 576px breakpoint)
- Product options selector (lenses/colors/varnish) with validation
- Server-side cart persistence (file-based storage)
- Server-side order persistence with database enrichment
- Loading states and success/error alerts on cart operations
- Alert messages for successful product additions and errors
- Responsive mobile cart view with card-based layout
- Desktop cart view with MUI Table
- Form validation and loading indicators
- Order confirmation page with order ID display
- Custom MUI theme with component style overrides
- ThemeRegistry wrapper component for theme injection

### Changed

- Migrated from Bootstrap to Material-UI components exclusively
- Converted form to responsive design with mobile/desktop views
- Improved cart UI with centered layouts and better spacing
- Enhanced error handling in API routes
- Added TypeScript types for API request/response bodies
- Product page loading state management (separate for initial load vs cart add)

### Fixed

- Hydration mismatches in client components using `useMediaQuery`
- Empty href attributes in ButtonCard component
- Circular import issues in component structure
- Next.js 15+ params Promise handling with `React.use()`
- Server-rendered CSS mismatch with styled components
- Product options state not resetting after successful cart addition

### Removed

- Bootstrap CSS dependencies
- Old form component structure

## [2.0.0] - 2025-01-15

### Added

- Initial Next.js App Router project setup with TypeScript
- MongoDB connection via Mongoose with server-ready models
- API routes for products listing and individual product details
- API routes for cart management (GET/POST/DELETE)
- API route for orders processing with database enrichment
- Product page with dynamic route parameters
- Cart page with server-backed data loading
- Order form page with contact information collection
- Order confirmation page with order tracking

### Removed

- localStorage usage (moved to server-side persistence)
- Unused file-based cart state management patterns

## Technical Details

- Node.js v22
- Next.js 16.0.3 with Turbopack
- React 19
- TypeScript strict mode
- Material-UI v6+ with Emotion styling
- Mongoose for MongoDB ORM
- File-based persistence for development

## Migration Notes

### From Express Backend

- Migrated from Express.js to Next.js full-stack framework
- Server-side API routes replace Express route handlers
- Mongoose models adapted for Next.js server components
- Database queries moved to API route handlers

### Bootstrap to MUI

- All components rewritten with MUI equivalents
- Custom theme replaces Bootstrap variables
- Removed Bootstrap CSS, uses Emotion for styling
- Grid system adapted to MUI's sx prop and Grid2 API

### State Management

- Removed localStorage dependency
- Implemented server-side cart persistence
- Server-backed order processing
- File-based storage for development (can migrate to MongoDB collections)

## Known Limitations

- File-based persistence is for development only (should migrate to MongoDB for production)
- No authentication/authorization implemented
- Order history not persisted per user
- Cart not synchronized across browser tabs
- No inventory management

## Versioning Strategy

This project follows Semantic Versioning:

- **MAJOR** (X.0.0): Breaking changes or complete rewrites
- **MINOR** (0.X.0): New features (backward compatible)
- **PATCH** (0.0.X): Bug fixes and minor improvements
