# Medicine Tracker

A modern, responsive medicine tracker webapp designed to help users keep track of their medication schedule, maintain an organized view of all their medications, easily add and remove medications as prescriptions change, quickly identify medications through color coding, and view important details about each medication in a clean, organized format.

![Medicine Tracker](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.16-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)

## Features

### 🏥 Medication Management
- **Add new medications** with comprehensive details:
  - Name, dosage, and frequency
  - Multiple times of day (Morning, Afternoon, Evening, Bedtime)
  - Start date and optional end date
  - Optional notes for additional instructions
  - Color coding for visual organization

### 📊 Dashboard View
- **Responsive grid layout**: 1 column on mobile, 2 on medium screens, 3 on large screens
- **Empty state guidance** when no medications are added
- **Medication cards** displaying all important information
- **Visual organization** with color-coded left borders
- **Medication count** display

### 🎨 User Interface
- **Modern design** using Tailwind CSS with Apple-inspired colors
- **Responsive layout** that adapts to different screen sizes
- **Hover effects** and smooth transitions
- **Professional typography** with custom font stack
- **Clean, organized format** for easy reading

### 💾 Data Persistence
- **Local storage** automatically saves all medications
- **Persistent data** across browser sessions
- **Automatic saving** when adding or deleting medications

### 🧭 Navigation
- **Sidebar navigation** between Dashboard and Add Medication views
- **Intuitive routing** for seamless user experience
- **Easy navigation** with clear visual indicators

## Technology Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.6.2
- **Styling**: Tailwind CSS 3.4.16
- **Build Tool**: Vite 6.3.5
- **Date Handling**: date-fns 4.1.0
- **Forms**: @tailwindcss/forms 0.5.9

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dhanachavan/medicine-tracker.git
   cd medicine-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Linting

```bash
npm run lint
```

## Usage

### Adding a Medication

1. Click on "Add Medication" in the sidebar
2. Fill in the required fields:
   - **Name**: The medication name
   - **Dosage**: Amount and form (e.g., "10mg tablet")
   - **Frequency**: How often to take (e.g., "Once daily")
   - **Time of Day**: Select one or more times
   - **Start Date**: When to begin taking the medication
3. Optionally add:
   - **End Date**: When to stop taking the medication
   - **Notes**: Additional instructions or reminders
   - **Color**: Choose a color for visual organization
4. Click "Add Medication" to save

### Managing Medications

- **View all medications** on the Dashboard
- **Delete medications** by clicking the trash icon on any medication card
- **Visual identification** through color-coded borders
- **Detailed information** displayed on each card

## Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard view
│   ├── AddMedication.tsx # Add medication form
│   ├── MedicationCard.tsx # Individual medication display
│   └── Sidebar.tsx      # Navigation sidebar
├── types/               # TypeScript type definitions
│   └── Medication.ts    # Medication data types
├── utils/               # Utility functions
│   └── storage.ts       # localStorage operations
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles (Tailwind)
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Date handling by [date-fns](https://date-fns.org/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Medicine Tracker** - Keep track of your health with ease! 💊
