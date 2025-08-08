# HireLink - Job Portal Application

A full-stack job portal application built with Spring Boot (Backend) and React (Frontend).

## 🚀 Features

### For Job Seekers
- User registration and authentication
- Job search and filtering
- Job application submission
- Profile management with resume upload
- Application tracking
- Job recommendations

### For Employers
- Company profile management
- Job posting and management
- Applicant tracking
- Candidate search and filtering
- Interview scheduling

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.3.2** - Main framework
- **Spring Security** - Authentication and authorization
- **Spring Data MongoDB** - Database operations
- **JWT** - Token-based authentication
- **MongoDB** - NoSQL database
- **Maven** - Build tool

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Router** - Navigation

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MongoDB 4.4 or higher
- Maven 3.6 or higher

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Sohail-er/HireLink--Job-Portal.git
cd HireLinkSpringboot
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Create environment file
```bash
cp env.example .env
# Edit .env with your configuration
```

#### Build and run
```bash
mvn clean compile
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

#### Navigate to frontend directory
```bash
cd frontend
```

#### Create environment file
```bash
cp env.example .env
# Edit .env with your configuration
```

#### Install dependencies
```bash
npm install
```

#### Start development server
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
HireLinkSpringboot/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/java/com/jobportal/
│   │   │   ├── api/         # REST controllers
│   │   │   ├── dto/         # Data transfer objects
│   │   │   ├── entity/      # MongoDB entities
│   │   │   ├── jwt/         # JWT utilities
│   │   │   ├── repository/  # Data access layer
│   │   │   ├── service/     # Business logic
│   │   │   └── utility/     # Utility classes
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
├── frontend/                # React application
│   ├── src/
│   │   ├── Components/      # React components
│   │   ├── Pages/          # Page components
│   │   ├── Services/       # API services
│   │   ├── Slices/         # Redux slices
│   │   └── Data/           # Static data
│   ├── public/             # Static assets
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Backend Configuration
Edit `backend/.env` file:
- Database connection settings
- JWT secret and expiration
- Email configuration
- CORS settings

### Frontend Configuration
Edit `frontend/.env` file:
- API base URL
- Feature flags
- External service configurations

## 🗄️ Database Schema

### Collections
- **users** - User accounts and authentication
- **profiles** - User profiles and resumes
- **jobs** - Job postings
- **applications** - Job applications
- **notifications** - System notifications
- **otp** - One-time passwords for verification

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Access tokens for API requests
- Refresh tokens for token renewal
- Secure password hashing with BCrypt

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/{id}` - Get job by ID
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get applications
- `PUT /api/applications/{id}` - Update application status

### Profiles
- `GET /api/profiles/{id}` - Get user profile
- `PUT /api/profiles/{id}` - Update profile
- `POST /api/profiles/upload` - Upload resume

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/JobPortal-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Sohail-er/HireLink--Job-Portal/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing UI library
- MongoDB for the flexible database solution
- All contributors and supporters
