# Facebook Marketplace Search Application

A modern web application that allows you to search Facebook Marketplace with custom parameters. Built with React (TypeScript) frontend and Node.js backend using Puppeteer for web scraping.

## 🚀 Features

- **Advanced Search**: Search by keyword, location, price range, and distance
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Results**: Live search results with loading indicators
- **Server Status**: Real-time backend server status monitoring
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Direct Links**: Click through to view items directly on Facebook

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Chrome/Chromium** browser (required for Puppeteer)

## 🛠️ Installation

1. **Clone or download this repository**

2. **Install all dependencies**:
   ```bash
   npm run install-all
   ```
   
   Or install manually:
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

## 🚀 Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend application on `http://localhost:3000`

### Manual Setup

If you prefer to run them separately:

1. **Start the backend server**:
   ```bash
   npm run server
   # or
   cd server && npm run dev
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   npm run client
   # or
   cd client && npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 📖 Usage

1. **Enter Search Query**: Type what you're looking for (e.g., "iPhone", "bicycle", "furniture")

2. **Set Filters** (optional):
   - **Location**: City, state, or ZIP code
   - **Distance**: Search radius in miles
   - **Price Range**: Set minimum and/or maximum price
   - **Sort By**: Choose how to sort results

3. **Click "Search Marketplace"**: The app will search Facebook Marketplace and display results

4. **View Results**: Click "View on Facebook" to open the listing in a new tab

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `server` directory for custom configuration:

```env
PORT=5000
NODE_ENV=development
```

### API Endpoints

- `GET /api/health` - Check server status
- `POST /api/search` - Search Facebook Marketplace

Example search request:
```json
{
  "query": "iPhone",
  "location": "New York, NY",
  "minPrice": 100,
  "maxPrice": 800,
  "radius": 25,
  "sortBy": "price_ascend"
}
```

## 🔧 Troubleshooting

### Common Issues

1. **"Server Offline" message**:
   - Make sure the backend server is running on port 5000
   - Check if another application is using port 5000
   - Try restarting the server

2. **No search results**:
   - Facebook may be temporarily blocking requests
   - Try different search terms
   - Check your internet connection
   - Wait a few minutes before trying again

3. **Browser errors with Puppeteer**:
   - Make sure Chrome/Chromium is installed
   - On Linux, you may need additional dependencies:
     ```bash
     # Ubuntu/Debian
     sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
     ```

4. **Rate limiting errors**:
   - The app includes built-in rate limiting (10 requests per minute)
   - Wait a minute before making more requests
   - Facebook may also impose its own limits

## 📁 Project Structure

```
facebook-marketplace-search/
├── server/                 # Backend Node.js server
│   ├── index.js           # Main server file
│   ├── package.json       # Server dependencies
│   └── .env              # Server configuration
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static files
│   └── package.json       # Client dependencies
├── package.json           # Root package.json
└── README.md             # This file
```

## ⚠️ Important Notes

- **Educational Purpose**: This application is for educational and personal use only
- **Facebook ToS**: Be respectful of Facebook's Terms of Service and rate limits
- **Web Scraping**: Facebook may change their HTML structure, which could break the scraper
- **Rate Limits**: Excessive use may result in temporary IP blocking by Facebook
- **Privacy**: This application doesn't store any personal data or Facebook credentials

## 🚨 Legal Disclaimer

This tool is provided for educational purposes only. Users are responsible for complying with Facebook's Terms of Service and any applicable laws regarding web scraping. The authors are not responsible for any misuse of this application.

## 🛠️ Built With

- **Frontend**: React, TypeScript, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, Puppeteer, Helmet
- **Development**: Create React App, Nodemon, Concurrently

## 📝 License

This project is licensed under the MIT License - see the package.json files for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Ensure all dependencies are installed correctly
3. Verify that both server and client are running
4. Check the browser console and server logs for error messages

---

**Happy searching!** 🛒