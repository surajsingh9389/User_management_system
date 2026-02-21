# Full Stack User Management System (MERN Stack)

## Project Overview

This is a Full Stack MERN application that allows users to:

- Create users with profile image upload  
- View user details  
- Update user information  
- Delete users  
- Search users  
- Paginate results  
- Export users data as CSV  

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- **Tailwind CSS** (for professional, maintainable styling)
- Material UI (used selectively for specific components like Avatar and Progress)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary (for image storage)
- `json2csv` (for CSV generation)

---

## Project Structure

```text
root/
│
├── Backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ └── routes/
│
└── README.md
```

---

## Features Implemented

### Backend
- RESTful CRUD APIs
- Image upload using Cloudinary
- Server-side pagination
- Search with regex filtering (First Name, Last Name, Email, Gender, Status)
- CSV export functionality (including Gender and Status)
- Data validation using Mongoose schema
- Patch Endpoint For quick status updates (Active/InActive)

### Frontend
- Matches the provided reference design with a dark red/blue theme.
- Tailwind CSS Entire frontend styled using Tailwind utility classes.
- Add / Edit / View pages with centered, intuitive layouts.
- Designed list view with row indexing, abbreviation for Gender (M/F), and inline status selection.
- Delete, update and Submit confirmation dialog for safety.
- Loading indicators for a smooth UX.

---

## Environment Variables

- Create a `.env` file inside the `Backend` folder:
- `PORT=5000`
- `MONGO_URI=your_mongodb_connection_string`
- `CLOUD_NAME=your_cloudinary_cloud_name`
- `CLOUD_API_KEY=your_cloudinary_api_key`
- `CLOUD_API_SECRET=your_cloudinary_api_secret`

---

## How To Run Locally

### Clone Repository
```bash
git clone <your-repo-link>
```

### Backend Setup
```bash
cd Backend
npm install
npm start # or npm run dev if nodemon is configured
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users | Create user (with image) |
| GET | /api/users | Get all users (search + pagination) |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update user (with image) |
| PATCH | /api/users/:id/status | Update user status (Active/InActive) |
| DELETE | /api/users/:id | Delete user |
| GET | /api/users/export | Export users as CSV |

---

## Future Improvements

- Authentication system (JWT-based)
- Role-based access control
- Debounced search for better performance
- Unit and Integration testing

---

## Author

**Suraj Singh**  
Full Stack Developer (MERN)