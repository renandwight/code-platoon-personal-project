# **Aurora – Stock Portfolio Backtesting & Optimization Web App**

Aurora is a full-stack web application that allows users to run multi-stock backtests, compare performance against the S&P 500, and save optimized portfolios based on calculated CAGR-weighted allocations. Aurora uses **Django**, **Django REST Framework**, **React**, **PostgreSQL**, **Polygon.io**, **Backtesting.py**, and **Recharts** to deliver rich financial analytics and clean, intuitive visualizations.

## **Features**

### **Backtesting**

* Input **stock tickers**.
* Enter **initial investment**, **start date**, and **end date**.
* Fetches historical price data from **Polygon.io**.
* Backend backtesting logic computes:

  * Per-stock **CAGR**
  * **Total CAGR** (sum across all selected stocks)
  * Portfolio **allocation weights** = stock CAGR ÷ total CAGR
  * **Shares to purchase** for each stock
* Generates full **performance curves** for the portfolio and the S&P 500.

### **Performance Visualization**

* Interactive **Recharts Line Chart** comparing:

  * Portfolio performance
  * S&P 500 benchmark
* Automatic **summary table**:

  * Initial investment
  * Final balance
  * CAGR

### **Portfolio Management**

* Save any backtest result as a portfolio (limit: **3 portfolios per user**).
* Mark **one** portfolio as a favorite.
* Favorite portfolio appears on the **Home Page**.

### **Portfolio Detail Page**

* Line chart of portfolio vs. S&P 500.
* Holdings table showing:

  * Ticker
  * Current price
  * Shares held
  * Gain/Loss %, dynamically calculated
* Ability to favorite/unfavorite the portfolio.

## **Tech Stack**

### **Frontend**

* React
* Recharts
* Axios

### **Backend**

* Django
* Django REST Framework
* **Django REST Framework Token Authentication**
* Backtesting.py
* Polygon.io
* PostgreSQL

### **Database**

* PostgreSQL with models for:

  * Portfolios
  * Stock allocations
  * User favorites

## **How It Works**

### **1. User Input**

User selects up to 30 tickers and specifies investment and date range.

### **2. Backend Processing**

Backend services perform:

1. Historical data retrieval for tickers + S&P 500.
2. Per-stock CAGR calculation.
3. Weight assignment (CAGR-based).
4. Share calculation.
5. Daily portfolio value construction.

### **3. Response Returned to Frontend**

* Time-series data for portfolio & S&P 500
* Summary metrics
* Stock allocations

### **4. Save Portfolio**

* User assigns an alias.
* Portfolio stored with its allocations and metadata.
* User can have max 3 saved portfolios.

## **Authentication**

Aurora uses **Django REST Framework Token Authentication**.

### Token workflow:

1. User logs in via `/api/token-auth/`.
2. Backend returns a **token**.
3. Frontend stores token (e.g., in memory or secure storage).
4. All authenticated requests include header:

Authorization: Token <your_token_here>

## **Pages Overview**

### **Backtest Page**

* Input form
* Run backtest
* Line chart
* Summary table
* Save portfolio modal

### **My Portfolios Page**

* Up to 3 portfolio cards
* Pie-chart icon representation
* Favorite toggle

### **Portfolio Page**

* Line chart comparison
* Stock holdings table
* Favorite/unfavorite option

### **Home Page**

* Displays the **favorite portfolio**'s data
