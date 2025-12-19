# 🌌 Aurora

**Aurora** is a full-stack stock analysis and watchlist application designed to help long-term investors evaluate individual stocks using historical market data, backtesting, and performance metrics.  Aurora uses **Django**, **Django REST Framework**, **React**, **PostgreSQL**, **Massive API**, **MarketAux API**, **Backtesting.py**, and **Recharts** to deliver rich financial analytics and clean, intuitive visualizations.

The application focuses on **clarity, usability, and data-driven insights**, allowing users to move beyond intuition and make informed investment decisions.

## 🧩 Problem Statement

Retail investors often lack accessible tools to:

* Backtest investment ideas against historical data
* Understand risk-adjusted performance metrics
* Organize insights into reusable watchlists
* Compare outcomes visually rather than via raw data

Aurora addresses these gaps by combining **historical backtesting**, **data visualization**, and **portfolio organization** in a single platform.

---

## ✨ Current Features

### 🔐 User Authentication

* Secure user registration and login
* Token-based authentication (Django REST Framework)
* User-specific access to watchlists and saved data

---

### 📊 Stock Backtesting

* Users can:

  * Enter a **stock ticker**
  * Specify an **initial investment amount**
* Perform a **2-year historical backtest** on one stock at a time
  *(limited by third-party API constraints)*

---

### 📈 Data Visualization

* A **two-year historical price chart** is generated using **Recharts**
* Interactive, responsive chart rendering
* Clear visual comparison of price movement over time

---

### 🧮 Performance Metrics Summary

Below each chart, Aurora generates a summary report including:

* Final portfolio value
* Percentage return
* CAGR
* Risk-adjusted metrics (where available)
* Buy-and-hold comparison

These metrics help users quickly evaluate performance without manual calculations.

---

### 📂 Watchlists

* Users can:

  * Create multiple watchlists
  * Select which watchlist to save a backtest result to
* Each saved entry includes:

  * Ticker
  * Backtest parameters
  * Summary metrics

---

### 📰 Market News

* Financial and stock-related news is pulled from **MarketAux**
* Helps users contextualize market performance with current events

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **React Bootstrap**
* **Recharts**
* Axios

### Backend

* **Django**
* **Django REST Framework**
* **Token Authentication**
* **Backtesting.py**

### Database

* **PostgreSQL**

### APIs

* **Massive API** (formerly Polygon) — historical stock market data
* **MarketAux** — financial and stock market news

---

## 🧠 Architecture Overview

* RESTful API architecture
* Clear separation of concerns:

  * Models → data structure
  * Serializers → controlled data exchange
  * Views → business logic
  * Frontend → presentation & interaction
* Frontend consumes backend APIs for:

  * Authentication
  * Backtesting
  * Watchlist management
  * News retrieval

---

## 🔄 How It Works

Aurora follows a **client–server architecture**, where the React frontend communicates with a Django REST API to perform authentication, data retrieval, backtesting, and persistence.

---

### 1️⃣ User Authentication Flow

1. A user registers or logs in from the React frontend.
2. Credentials are sent to the Django backend.
3. Upon successful authentication, the backend returns a **token**.
4. The frontend stores the token and attaches it to all subsequent API requests.
5. Protected endpoints ensure users can only access their own data.

---

### 2️⃣ Stock Backtesting Flow

1. The user enters:

   * A **stock ticker**
   * An **initial investment amount**
2. The frontend sends this input to the backend backtesting endpoint.
3. The backend:

   * Fetches **two years of historical price data** from the **Massive API (formerly Polygon)**
   * Applies backtesting logic using the provided investment amount
   * Computes summary performance metrics
4. The backend returns:

   * Time-series price data
   * Calculated performance metrics
5. The frontend renders:

   * A **two-year historical price chart** using **Recharts**
   * A **summary metrics report** below the chart

---

### 3️⃣ Watchlist Persistence

1. After reviewing a backtest, the user selects a watchlist to save the result.
2. The frontend sends the selected watchlist ID and backtest data to the backend.
3. The backend:

   * Validates ownership of the watchlist
   * Stores the backtest summary and metadata
4. Saved entries remain accessible across sessions.

---

### 4️⃣ Market News Integration

1. When the user navigates to the news section, the frontend requests financial news.
2. The backend retrieves articles from **MarketAux**.
3. News items are returned and displayed to provide **market context** alongside performance data.

---

### 5️⃣ Data Integrity & Safeguards

* User inputs are validated on the backend to prevent invalid backtests.
* Default fallbacks are applied when user input conflicts with available historical data.
* API responses are normalized before being sent to the frontend.

---

### 6️⃣ Frontend–Backend Responsibilities

**Frontend (React)**

* Handles user interaction and UI state
* Renders charts, metrics, and watchlists
* Manages authentication tokens

**Backend (Django REST API)**

* Enforces authentication and permissions
* Interfaces with third-party APIs
* Performs backtesting calculations
* Persists user data securely

---

## ⚠️ Known Limitations

* Backtests are limited to a **2-year historical window** due to API constraints
* Backtesting is currently limited to **one stock at a time**
* Portfolio-level aggregation is not yet implemented
* No automated allocation optimization in current version

---

## 🔮 Future Iterations (Planned Enhancements)

The following features were part of the original vision and are planned for future releases:

### 📊 Portfolio-Level Analysis

* Multi-stock backtesting
* Portfolio performance aggregation
* Allocation-based comparisons

### 🧠 Advanced Analytics

* Sharpe, Sortino, Calmar, Alpha, Beta at portfolio level
* Deeper benchmark comparisons (e.g., S&P 500)

### 🤖 AI-Assisted Insights

* Natural-language summaries of performance
* Suggested allocation improvements
* Risk interpretation for non-technical users

### 📈 Enhanced Visualizations

* Multi-chart comparisons
* Exportable charts and reports
* Improved interactivity and filtering

### 🧪 Testing & Performance

* Expanded unit and integration testing
* API response caching
* Performance optimization for large datasets

---

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/aurora.git
cd aurora

# Backend setup
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd client
npm install
npm run dev
```

> API keys must be configured via environment variables.

---

## 👤 Author

**Chris**
Full-Stack Software Engineer | Data-Driven Applications
Built as part of ongoing professional portfolio development
