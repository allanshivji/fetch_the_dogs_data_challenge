// Pagination Settings
export const PAGE_SIZE = 25; // Number of dogs per page
export const CURRENT_PAGE = 1; // Default current page on initial load
export const TOTAL_RECORDS = 0; // Initial count of records (updated dynamically)
// Pagination Display Settings
export const MAX_VISIBLE_PAGES = 5; // Maximum number of page buttons visible at once
export const MAX_SUB_PAGES = 3; // Maximum number of sub-pages within pagination navigation

// Range Slider Configurations
export const AGE_RANGE_MINIMUM = 0; // Minimum age value for filtering dogs
export const AGE_RANGE_MAXIMUM = 20; // Maximum age value for filtering dogs

// Email Validation Regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format

// Filter Display Configurations
export const MAX_VISIBLE_DISPLAY_FILTERS = 5; // Maximum number of filters to be shown at once

// Default GeoLocation Coordinates (San Francisco)
export const GEO_LOCATION_FILTER_INITIAL_COORD = {
  lat: 37.7749, // Latitude
  lng: -122.4194 // Longitude
};

export const LOCALE = 'en';
