# 💻 Coding Club Dashboard

**Theme: "Coding Club Dashboard PAGE – One Place for Every Coder"**

A modern, responsive, and feature-rich dashboard built with React, Vite, and Tailwind CSS. This dashboard provides a comprehensive overview of coding activities, events, leaderboards, and more for coding club members.

## 🚀 Features

### Core Dashboard Sections
- **👋 Welcome Header**: Personalized greeting with real-time clock
- **📊 Quick Stats Cards**: Interactive cards showing events joined, projects, badges, and rank
- **🗓 Upcoming Events**: Live countdown timers and event registration
- **📢 Announcements Panel**: Latest club news and updates
- **🏆 Leaderboard Snapshot**: Top performers with rankings
- **🚀 Recent Projects**: Showcase of featured student projects
- **📈 Activity Charts**: Interactive charts showing coding progress

### Enhanced Features
- **🌙 Dark/Light Mode Toggle**: Seamless theme switching with persistence
- **🔔 Notification System**: Real-time notifications with unread indicators
- **📱 Fully Responsive**: Mobile-first design with adaptive layouts
- **⚡ Smooth Animations**: Framer Motion powered transitions
- **🎯 Coding Streak Tracker**: Visual progress tracking
- **📊 Interactive Charts**: Recharts integration for data visualization

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion, GSAP
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd coding-club-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design Guidelines

- **Clean & Modern UI**: Minimalist design with focus on usability
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Color Palette**: Indigo/Purple gradient theme with dark mode support
- **Typography**: Inter font family for optimal readability
- **Accessibility**: WCAG compliant with proper contrast ratios

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Announcements.jsx
│   ├── ChartCard.jsx
│   ├── CodingStreak.jsx
│   ├── Events.jsx
│   ├── Leaderboard.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── StatsCard.jsx
├── context/            # React Context providers
│   └── ThemeContext.jsx
├── pages/              # Main application pages
│   ├── Dashboard.jsx
│   ├── EventsPage.jsx
│   ├── LeaderboardPage.jsx
│   ├── Profile.jsx
│   └── Projects.jsx
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🎯 Key Components

### Dashboard
- Responsive grid layout with animated components
- Real-time data updates and interactive elements
- Personalized user experience

### Theme System
- Context-based theme management
- Persistent theme selection
- Smooth transitions between modes

### Interactive Charts
- Real-time data visualization
- Multiple chart types (Line, Area)
- Responsive design with tooltips

## 🚀 Future Enhancements

- [ ] Backend API integration (MERN stack completion)
- [ ] User authentication system
- [ ] Real-time notifications with WebSocket
- [ ] GitHub API integration for project tracking
- [ ] Codeforces/LeetCode API integration
- [ ] Advanced analytics and reporting
- [ ] Team collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨💻 Author

Built with ❤️ for the Coding Club community

---

**"One Place for Every Coder" - Bringing the coding community together! 🚀**
