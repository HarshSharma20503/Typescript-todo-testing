# Todo Application

`Note`: Incomplete but can take reference for Typescript config, scripts, unit and integration testing, OOPS based implementation.

A full-stack Todo application built with MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, task management.

## 🚀 Features

- User Authentication
  - JWT-based authentication
  - Secure password hashing
  - Protected routes
- Todo Management
  - Create, read, update, and delete todos
  - Tag system for organisation
  - Status tracking(Open, Working, Pending Review, etc.)
  - Due date management
  - Overdue status handling
- Advanced Features
  - Tag filtering
  - Due date tracking
  - Pagination and sorting
  - Search functinaltiy

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- XSS protection

## 🛠️ Technical Stack

### Frontend

- React with TypeScript
- Redux Toolkit for state management
- TailwindCSS with shadcn/ui for styling
- React Query for data fetching
- Form validation with react-hook-form and zod

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- Zod for validation

### Development Tools

- ESLint and Prettier for code formatting
- Husky for git hooks
- GitHub Actions for CI/CD
- Jest for testing
- Winston for logging

## 📦 Installation

1. Clone the repository

    ```bash
    git clone <repository-url>
    cd todo-app
    ```

2. Install dependencies

    ```bash
    # Install root dependencies
    npm install

    # Install frontend dependencies
    cd packages/client
    npm install

    # Install backend dependencies
    cd ../server
    npm install
    ```

3. Environment Setup

    Create .env files in both client and server directories:

    ```any
    # server/.env
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/todo-app
    JWT_SECRET=your-secret-key
    NODE_ENV=development
    CORS_ORIGIN=http://localhost:5173

    # client/.env
    VITE_API_URL=http://localhost:8000/api
    ```

4. Database Setup

- Install MongoDB locally or use MongoDB Atlas
- Update the MONGO_URL in server/.env

## 🚀 Running the Application

### Development Mode

```bash
# Start backend server
cd ./server
npm run dev

# Start frontend in another terminal
cd ./client
npm run dev
```

### Production Mode

```bash
# Build and start backend
cd ./server
npm build
npm start

# Build and serve frontend
cd ./client
npm build
# serve the ./dist/index.html by opening it using live server
```

## 🧪 Testing

```bash
# Run backend tests
cd ./server
npm test

# Run frontend tests
cd ./client
npm test
```

### 📝 API Documentation

### Authentication Endpoints

```any
POST`: /api/users/register
POST /api/users/login
```

### Todo Endpoints

```any
GET    /api/todos       - Get all todos
POST   /api/todos       - Create new todo
GET    /api/todos/:id   - Get specific todo
PUT    /api/todos/:id   - Update todo
DELETE /api/todos/:id   - Delete todo
PATCH  /api/todos/:id/status - Update todo status
POST   /api/todos/:id/tags   - Add tags
DELETE /api/todos/:id/tags   - Remove tags
```

## 💻 Development Guidelines

### Code Style

- Follow ESLint and Prettier configurations
- Use TypeScript for type safety
- Follow SOLID principles
- Write unit tests for new features

### Git Workflow

1. Create feature branch from development

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. Make changes and commit using conventional commits

    ```bash
    git commit -m "feat: add new feature"
    ```

3. Push changes and create PR

    ```bash
    git push origin feature/your-feature-name
    ```

### Pre-commit Hooks

The project uses Husky to run pre-commit hooks:

- Code formatting with Prettier
- Linting with ESLint
- Type checking with TypeScript
- Unit tests

## 🚀 Deployment

### Backend Deployment

1. Build the application:

    ```bash
    cd ./server
    npm build
    ```

2. Set up production environment variables

3. Start the server:

    ```bash
    npm start
    ```

### Frontend Deployment

1. Build the application:

    ```bash
    cd ./client
    npm build
    ```

2. Deploy the dist directory to your hosting service

## 📈 Monitoring and Logging

- Winston logger configured for both development and production
- Error tracking and monitoring
- Performance monitoring
- API request logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
