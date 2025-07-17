# **Mini Shopify \- Assesment App**

A modern, responsive, and performant product listing application built with Angular. This project demonstrates best practices for building a scalable single-page application (SPA), including reactive state management, standalone components, and advanced performance optimizations. The application fetches product data from the public [Fake Store API](https://fakestoreapi.com/) and provides a clean, Shopify-style user interface for browsing and interacting with products.

## **Core Features**

- **Product Gallery:** Displays a grid of products fetched from the API.
- **Detailed Product View:** Click on any product to navigate to a dedicated page with a full description and details.
- **Reactive Filtering:** Filter products in real-time by category.
- **Live Search:** Instantly search for products by title.
- **Dynamic Sorting:** Sort the product list by price or user rating (ascending/descending).
- **Fully Responsive:** A mobile-first design that adapts beautifully to all screen sizes, from desktops to mobile phones.
- **Optimized for Performance:** Implements lazy loading, OnPush change detection, and trackBy strategies for a fast and smooth user experience.

## **Technical Stack & Versions**

This project is built with the latest versions of Angular and its ecosystem tools.

- **Framework:** Angular \~19.2.15
- **State Management:** RxJS \~7.8.2
- **Language:** TypeScript \~5.7.3
- **Styling:** CSS with Bootstrap 5 for the responsive grid and components.
- **Core Dependencies:**
  - @angular/cli: \~19.2.15
  - zone.js: \~0.15.1

## **Getting Started**

Follow these instructions to get the project up and running on your local machine.

### **Prerequisites**

- Node.js (v18.x or v20.x recommended)
- Angular CLI v19.x

### **Installation & Setup**

1. **Clone the repository:**

```bash
   git clone https://github.com/harshvatsmishra/mini-shopify.git
```

```bash
cd mini-shopify
```

_or, if you have the files locally, navigate into the project directory._

2. Install dependencies:  
   Run the following command to install all the necessary npm packages.

   ```bash
   npm install

   ```

3. Run the development server:  
   Execute the ng serve command to start the local development server.

   ```bash
   ng serve \-o
   ```

   The \-o flag will automatically open your default web browser to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## **Project Structure**

The application follows a standard, feature-based folder structure that promotes scalability and maintainability.

src/  
└── app/  
 ├── components/  
 │ ├── products/  
 │ │ ├── product-card/ \# Reusable card component  
 │ │ ├── product-detail/ \# Detail page component  
 │ │ └── product-list/ \# List of products component  
 │ └── shared/  
 │ ├── header/ \# Shared header/nav component  
 │ └── loader/ \# Shared loading indicator component  
 ├── models/  
 │ └── product.model.ts \# TypeScript interface for the Product object  
 ├── services/  
 │ └── product.service.ts \# Handles all API calls and state management  
 ├── app.component.ts \# Root application component  
 ├── app.config.ts \# Standalone application configuration  
 └── app.routes.ts \# Defines application routes (with lazy loading)

## **Architecture & Design**

This application is built using a modern, reactive architecture.

- **ProductService:** Acts as the single source of truth. It handles all HTTP requests and manages the application's state (filters, search terms, sorting) using RxJS BehaviorSubjects.
- **combineLatest:** The service uses the combineLatest operator to merge multiple data streams into a final displayProducts$ observable. This ensures the UI reactively updates whenever any filter or sort criteria changes.
- **Standalone Components:** The entire application is built with standalone components, simplifying the architecture and improving tree-shaking.
