# Slot Booking System (Frontend)

This project is a Slot Booking System built with **Create React App**. It allows users to manage and book time slots while ensuring that no two users can book the same slot on the same date. The system tracks each user's bookings, preserving them even after re-login.

---

## Features

- **User-specific Slot Tracking:** Keeps a record of each user's booked slots.
- **Global Slot Availability:** Prevents double booking of the same slot on the same date.
- **Add, Remove, Copy, and Clear Slots:** Manage availability with ease.
- **Persistent State Management:** Utilizes Redux Toolkit and Redux Persist to maintain state across sessions.
- **Responsive UI:** Built with Material-UI and Date Pickers for a modern and user-friendly interface.
- **Theme Toggle (Light/Dark Mode):** Switch between light and dark themes for better user experience.
- **Timezone Selection:** Allows users to select their timezone, ensuring accurate slot display.

---

## Tech Stack

- **React** (Create React App)
- **React Router** for routing
- **Redux Toolkit** for state management
- **Redux Persist** for persisting state across sessions
- **Material-UI** for UI components
- **Dayjs** for date manipulation
- **Notistack** for notifications

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/krish3742/Zelthy-assignment.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be accessible at `http://localhost:3000`.

---

## Folder Structure

```
Zelthy-assignment/
│
├── frontend/
    └── src
        ├── components
        │   ├── Navbar.js
        │   ├── Dashboard.js
        │   ├── UserProfile.js
        │   ├── PrivateRoute.js
        |   └── Login.js
        │
        ├── store
        │   ├── slices
        │   │   ├── userSlice.js
        │   │   └── slotsSlice.js
        │   └── store.js
        │
        ├── theme.js
        └── App.js
```

---

## State Management Overview

This project uses **Redux Toolkit** for state management and **Redux Persist** for persisting the state across browser reloads. The state is organized into two slices:

### 1. **User Slice**

- Stores the current user's information, including the username and timezone.

### 2. **Slots Slice**

- Tracks global slot availability and each user's booked slots.
- Ensures no overlapping bookings across all users.

---

## Routing

**React Router** is used for navigation:

- `/login` - Login Page
- `/` - Dashboard (Protected Route)
- `/profile` - User Profile (Protected Route)

---

## Available Scripts

In the project directory, you can run:

- **`npm start`** - Runs the app in development mode.
- **`npm run build`** - Builds the app for production.
- **`npm test`** - Launches the test runner.

---

## Dependencies

- **React** (v18+)
- **Redux Toolkit** (v1.9+)
- **Redux Persist** (v6+)
- **Material-UI** (v5+)
- **Dayjs** (v1.11+)
- **Notistack** (v2+)

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any inquiries, please contact **Kshitij Agrawal**.
