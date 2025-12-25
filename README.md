
# 🚀 exactspace Explorer

A high-performance, aesthetically pleasing Post Explorer application built as part of a Senior Engineering assessment. This project demonstrates clean architecture, real-time data processing, and seamless persistence using React and modern CSS.

## React Native Version Used:
React Native 0.74.1

## Additional Libraries Installed:
expo (~51.0.8)
expo-status-bar (~1.12.1)
@react-native-async-storage/async-storage (1.23.1)
tailwindcss (^3.4.1)
vite (^6.2.0)

## Bonus Features Implemented:
Loading indicator while fetching data
Skeleton loader UI for improved user experience
Pull-to-refresh functionality for reloading posts

## ✨ Features

- **Fetching & Display**: Seamlessly retrieves post data from the JSONPlaceholder API.
- **Real-time Search**: Instant, case-insensitive filtering as you type.
- **Persistence**: Automatically saves and restores your search history using `AsyncStorage` (simulated via `localStorage` for web).
- **Premium UI/UX**:
  - **Fluid Animations**: Hover effects and smooth transitions using Tailwind CSS.
  - **Pull-to-Refresh**: Custom-built gesture support for updating data.
  - **Skeleton Loading**: High-fidelity placeholders to prevent layout shift.
  - **Zero-State Handling**: Clear feedback for empty search results or network errors.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (Functional Components & Hooks)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: Native Fetch API
- **Persistence**: Simulated AsyncStorage Logic
- **Icons & Typography**: Inter Font, Heroicons

## 🏗️ Architecture

The project follows a modular, production-ready structure for maximum maintainability:

```text
src/
├── components/     # Reusable UI (PostCard, SearchBar, Skeleton)
├── hooks/          # Business logic (usePosts for data & filtering)
├── services/       # API abstraction (postService)
├── utils/          # Storage helpers and utility logic
├── screens/        # Main page compositions
└── types.ts        # TypeScript interfaces and enums
```
## 📱 Mobile Simulation
The application is designed with a **Mobile-First** approach. When viewing on a desktop, the UI is wrapped in a premium mobile frame to showcase the intended React Native user experience.

## 📝 Intern Assessment Requirements Met
- [x] Fetch & Display Posts using FlatList-style rendering.
- [x] Search input with real-time, case-insensitive filtering.
- [x] AsyncStorage integration for search persistence.
- [x] Robust error handling for API failures.
- [x] **Bonus**: Skeleton loaders, pull-to-refresh, and smooth hover animations.

---
Built with ❤️ for the **exactspace**.
