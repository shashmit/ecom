# E-commerce Mobile App

A simple e-commerce mobile application built with React Native and Expo.
Demo: https://r6s85lv0jv.ufs.sh/f/AddoBPNRSox7AgStzP3NRSox76IXMNHF2qvQmBOld3gbDkEn

## Features

*   Browse a list of products.
*   View detailed information for each product.
*   Add products to a shopping cart.
*   Search for products by title.
*   (Potential for sorting features)

## Technologies Used

*   React Native
*   Expo
*   TypeScript
*   React Query (for data fetching and caching)
*   Fetch API (for interacting with the backend)
*   External API: [Platzi Fake Store API](https://fakeapi.platzi.com/)

## Setup and Running

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd ecom
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

3.  **Run the application:**
    ```bash
    npx expo start
    ```
    This will start the Metro Bundler. You can then run the app on an emulator/simulator or scan the QR code with the Expo Go app on your physical device.

## API

This application uses the [Platzi Fake Store API](https://api.escuelajs.co/api/v1) to fetch product data.