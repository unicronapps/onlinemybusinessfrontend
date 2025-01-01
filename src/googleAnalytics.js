// src/googleAnalytics.js
import ReactGA from "react-ga4";

// Initialize Google Analytics with your Measurement ID
export const initializeAnalytics = () => {
  ReactGA.initialize("G-4YPK8TWWRJ"); // Replace with your Measurement ID
};

// Track a page view
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track custom events
export const trackEvent = (action, category, label) => {
  ReactGA.event({
    action: action,
    category: category,
    label: label,
  });
};
