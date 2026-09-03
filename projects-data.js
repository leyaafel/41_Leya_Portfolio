/**
 * projects-data.js
 * Source data for dynamic project card rendering and modal details (Requirement B1 & B5).
 * Real projects from Leya Felix's resume.
 */

const projectsData = [
  {
    id: "parkinsons-voice",
    title: "Parkinson’s Disease Detection using Voice Analysis (2026)",
    category: "ml",
    categoryLabel: "Machine Learning & Healthcare AI",
    duration: "Jan 2026 - Apr 2026",
    shortDescription: "Machine learning diagnostic pipeline combining CNN-extracted and handcrafted acoustic features (MFCC, jitter, shimmer) to detect Parkinson's Disease from voice recordings.",
    fullDescription: "Developed an advanced machine learning diagnostic pipeline combining deep CNN-extracted representations and handcrafted acoustic markers (MFCC, jitter, shimmer) from patient phonation recordings. Evaluated and benchmarked three leading classifiers — SVM, Random Forest, and XGBoost — utilizing 5-fold stratified cross-validation for unbiased statistical validation. XGBoost attained the highest performance with 94.7% ROC-AUC and 89.4% recall, outperforming Random Forest (91.4%) and SVM (88.2%). Prioritized recall as the primary clinical optimization metric to minimize critical false negatives in early neurodegenerative screening.",
    image: "assets/images/project-parkinsons.svg",
    technologies: ["Python", "CNN", "XGBoost", "Audio Signal Processing", "MFCC", "Scikit-Learn", "Pandas", "NumPy"],
    repoUrl: "https://github.com/leyafelix/parkinsons-voice-detection",
    keyFeatures: [
      "Hybrid acoustic feature extraction fusing deep CNN representations with MFCC, jitter, and shimmer features",
      "5-fold stratified cross-validation ensuring robust, statistically unbiased model evaluation",
      "XGBoost classifier achieving state-of-the-art 94.7% ROC-AUC and 89.4% diagnostic recall",
      "Recall-focused decision thresholding to eliminate dangerous false negatives in medical diagnostics"
    ],
    stats: {
      metricLabel: "ROC-AUC / Recall",
      metricValue: "94.7% / 89.4%",
      benchmark: "Outperformed RF (91.4%) & SVM (88.2%)"
    }
  },
  {
    id: "lifestream-mern",
    title: "LifeStream",
    category: "fullstack",
    categoryLabel: "Full Stack (MERN)",
    duration: "Jan 2025 - Apr 2025",
    shortDescription: "Full-stack MERN application with REST API integration, JWT-based authentication, and GPS functionality, using MongoDB for scalable data management.",
    fullDescription: "Developed a full-stack MERN application with REST API integration, JWT-based authentication, and GPS functionality, using MongoDB for scalable data management. Implemented eligibility checks and a dynamic stock tracking system. Added user feedback and rating system to improve service quality.",
    image: "assets/images/project-lifestream.svg",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "JWT", "GPS Functionality"],
    repoUrl: "https://github.com/leyafelix/lifestream-mern",
    keyFeatures: [
      "Full-stack MERN architecture with modular controllers, routes, and MongoDB schemas",
      "REST API integration secured with JSON Web Token (JWT) based authentication",
      "GPS functionality to locate donors and centers dynamically",
      "Dynamic stock tracking system with donor eligibility checks and user feedback/rating system"
    ],
    stats: {
      metricLabel: "Architecture",
      metricValue: "MERN + JWT + GPS",
      benchmark: "Scalable Data Management"
    }
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    category: "enterprise",
    categoryLabel: "Java & MySQL",
    duration: "Jul 2024 - Nov 2024",
    shortDescription: "Java-based Hotel Management System applying OOP design principles, with MySQL backend supporting real-time CRUD operations for room and employee records.",
    fullDescription: "Engineered a Java-based Hotel Management System applying OOP design principles, with MySQL backend supporting real-time CRUD operations for room and employee records. Enabled functionalities like adding, updating, and deleting customer records. Designed an admin-focused interface for efficient data management and real-time updates.",
    image: "assets/images/project-hotel.svg",
    technologies: ["Java", "OOP Principles", "MySQL", "JDBC", "CRUD Operations", "Admin UI"],
    repoUrl: "https://github.com/leyafelix/hotel-management-system",
    keyFeatures: [
      "Rigorous OOP design principles ensuring modularity, code reuse, and clean separation of concerns",
      "MySQL backend supporting real-time CRUD operations for room and employee records",
      "Enabled customer management functionalities like adding, updating, and deleting customer records",
      "Admin-focused interface for efficient data management and real-time updates"
    ],
    stats: {
      metricLabel: "Design Principles",
      metricValue: "Java OOP / MySQL",
      benchmark: "Real-Time CRUD Operations"
    }
  },
  {
    id: "wheelabled-dubai",
    title: "Wheelabled",
    category: "accessibility",
    categoryLabel: "Accessibility & Geolocation",
    duration: "May 2023 - Sep 2023",
    shortDescription: "GPS-based application to identify wheelchair-friendly places in Dubai, including parks and cafes, designed for accessibility and real-time search.",
    fullDescription: "Developed a GPS-based application to identify wheelchair-friendly places in Dubai, including parks and cafes. Integrated MySQL for managing user and location data, ensuring the application was accessible and easy to use for disabled individuals. Collaborated in a team to design an intuitive user interface with a login page and real-time search functionality.",
    image: "assets/images/project-wheelabled.svg",
    technologies: ["Flutter", "MySQL", "GPS Geolocation", "Accessible UI", "Search Functionality"],
    repoUrl: "https://github.com/leyafelix/wheelabled",
    keyFeatures: [
      "GPS-based search to identify wheelchair-friendly places in Dubai (parks, cafes)",
      "MySQL database managing user accounts, location data, and accessibility amenities",
      "Accessible user interface designed for ease of use by disabled individuals",
      "Collaborative team project featuring secure login and real-time search functionality"
    ],
    stats: {
      metricLabel: "Focus Area",
      metricValue: "Dubai Accessibility",
      benchmark: "Accessible UI & Real-Time Search"
    }
  }
];

// Attach to window object for browser access
if (typeof window !== "undefined") {
  window.projectsData = projectsData;
}
