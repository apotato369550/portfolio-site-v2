# 🌐 Personal Portfolio Site

A vaporwave-inspired portfolio built to showcase my skills, projects, and journey as a developer based in Cebu, Philippines.

## 🛠 Tech Stack

### Languages & Frameworks
- HTML, CSS, JavaScript
- React (Vite)
- Node.js
- MongoDB

### Tools & Platforms
- Git & GitHub
- VSCode
- Figma (for design)

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Local installation or MongoDB Atlas account
- **Git** - For version control
- **npm** or **yarn** - Package manager (comes with Node.js)

## 🚀 Local Setup

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The client will be available at `http://localhost:5173` (default Vite port).

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   node index.js
   ```

   The server will run on `http://localhost:3001`.

## 📁 Project Structure

```
portfolio-site-v2/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   └── sections/     # Page sections
│   │   ├── assets/          # Images and media
│   │   └── main.jsx         # App entry point
│   ├── package.json
│   └── vite.config.js
├── server/                   # Node.js backend
│   ├── assets/              # Static files (images, certs)
│   ├── cron/                # Scheduled tasks
│   ├── data/                # JSON data files
│   ├── fetchers/            # Data fetching scripts
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── index.js             # Server entry point
│   └── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## 📚 API Documentation

The server provides RESTful API endpoints for fetching portfolio data:

### GitHub Endpoints
- `GET /api/recent-commits` - Fetch recent GitHub commits
- `GET /api/recent-projects` - Fetch GitHub projects

### LeetCode Endpoints
- `GET /api/leetcode-submissions` - Fetch recent LeetCode submissions

### DataCamp Endpoints
- `GET /api/datacamp-courses` - Fetch DataCamp courses and certifications
- `GET /api/datacamp-projects` - Fetch DataCamp projects

### Static Assets
- `GET /api/projects/images/:filename` - Serve project images

### Manual Refresh Endpoints
- `GET /refresh-github` - Manually trigger GitHub data refresh
- `GET /refresh-leetcode` - Manually trigger LeetCode data refresh
- `GET /refresh-sample` - Refresh sample data

## 🔄 Client-Server Interaction

The React client communicates with the Node.js server via HTTP requests:

1. **Data Fetching**: The `ProjectsSection` component fetches data on mount using `fetch()` API calls to localhost:3001 endpoints
2. **Concurrent Requests**: Multiple API calls are made simultaneously using `Promise.all()` for better performance
3. **Error Handling**: Network errors are caught and displayed to the user
4. **Image Serving**: Project images are served statically from the server
5. **CORS**: Server is configured with CORS to allow client requests

Example interaction flow:
- Client loads → Fetches projects, commits, and LeetCode data → Displays in UI
- Images are loaded dynamically from server static routes

## 🚀 Deployment Instructions

### Client Deployment

1. Build the production bundle:
   ```bash
   cd client
   npm run build
   ```

2. The `dist/` folder contains the built files ready for deployment

3. Deploy to your preferred hosting service (Netlify, Vercel, etc.)

### Server Deployment

1. Ensure MongoDB is set up (local or cloud)

2. Set environment variables on your server:
   ```
   MONGODB_URI=your_production_mongodb_uri
   ```

3. Install dependencies:
   ```bash
   npm install --production
   ```

4. Start the server:
   ```bash
   node index.js
   ```

5. For production, consider using PM2 or similar process manager

### Environment Configuration

- **Development**: Uses local MongoDB and localhost URLs
- **Production**: Update `.env` with production database URL and adjust client API calls to production server URL

## 📝 Additional Notes

- **Cron Jobs**: The server includes automated data updates every hour using node-cron
- **Fallback System**: API routes use a fallback reader that switches to local JSON files if database is unavailable
- **Data Models**: MongoDB schemas are defined for GitHub commits, projects, LeetCode submissions, and DataCamp data
- **Security**: Consider adding authentication for admin endpoints in production
- **Performance**: Static assets are served efficiently, and API calls are optimized with concurrent fetching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
