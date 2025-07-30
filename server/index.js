const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const puppeteer = require('puppeteer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const rateLimiter = new RateLimiterMemory({
  keyInclude: ['ip'],
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting middleware
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).send('Too Many Requests');
  }
});

// Facebook Marketplace scraper
async function scrapeMarketplace(searchParams) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Build Facebook Marketplace URL
    const baseUrl = 'https://www.facebook.com/marketplace/search/';
    const params = new URLSearchParams();
    
    if (searchParams.query) params.append('query', searchParams.query);
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
    if (searchParams.radius) params.append('radius', searchParams.radius);
    if (searchParams.sortBy) params.append('sortBy', searchParams.sortBy);
    
    const url = `${baseUrl}?${params.toString()}`;
    
    console.log('Navigating to:', url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForTimeout(3000);
    
    // Extract listings
    const listings = await page.evaluate(() => {
      const items = [];
      
      // Facebook Marketplace selectors (these may change over time)
      const listingSelectors = [
        '[data-testid="marketplace-search-result"]',
        'div[role="article"]',
        'a[href*="/marketplace/item/"]'
      ];
      
      let listingElements = [];
      for (const selector of listingSelectors) {
        listingElements = document.querySelectorAll(selector);
        if (listingElements.length > 0) break;
      }
      
      listingElements.forEach((element, index) => {
        if (index >= 20) return; // Limit to 20 results
        
        try {
          const titleElement = element.querySelector('span[dir="auto"]') || 
                              element.querySelector('div[dir="auto"]') ||
                              element.querySelector('h3') ||
                              element.querySelector('h2');
          
          const priceElement = element.querySelector('span[dir="auto"]') ||
                              element.querySelector('div[dir="auto"]');
          
          const imageElement = element.querySelector('img');
          const linkElement = element.querySelector('a[href*="/marketplace/item/"]') || element;
          
          const title = titleElement ? titleElement.textContent.trim() : 'No title';
          const price = priceElement ? priceElement.textContent.trim() : 'No price';
          const image = imageElement ? imageElement.src : null;
          const link = linkElement ? linkElement.href : null;
          
          // Basic filtering to ensure we have valid data
          if (title && title !== 'No title' && price && price !== 'No price') {
            items.push({
              title,
              price,
              image,
              link,
              id: Date.now() + index
            });
          }
        } catch (error) {
          console.log('Error extracting item:', error);
        }
      });
      
      return items;
    });
    
    return listings;
    
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Facebook Marketplace Search API is running' });
});

app.post('/api/search', async (req, res) => {
  try {
    const searchParams = req.body;
    
    // Validate required parameters
    if (!searchParams.query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    console.log('Search parameters:', searchParams);
    
    const results = await scrapeMarketplace(searchParams);
    
    res.json({
      success: true,
      count: results.length,
      data: results,
      searchParams
    });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search Facebook Marketplace',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Facebook Marketplace Search Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});