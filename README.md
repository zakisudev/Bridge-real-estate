# Bridge Real Estate

This is a web application for Bridge Real Estate, built using React, Express, Node and MySQL.

## Features

- User authentication and authorization
- Property listing and search functionality
- User profile management
- Contacting landlords system
- Admin dashboard for managing properties and users

## Technologies Used

- Express.js: Backend framework for handling API requests
- React: Frontend library for building user interfaces
- Node.js: JavaScript runtime environment for server-side development
- MySQL: Relational database for storing data
- ANTD: CSS library for responsive design
- Redux: State management library for React applications

## Getting Started

### Prerequisites

- Node.js (version 20.0)
- MySQL (version 8.2)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/Bridge-real-estate.git
```

2. Install the dependencies for the server:

```bash
cd Bridge-real-estate/backend
npm install
```

3. Install the dependencies for the client:

```bash
cd ../frontend
npm install
```

4. Configure the database connection:

- Create a MySQL database and import the provided SQL schema.
- Update the database configuration in `backend/config/config.json`.

5. Start the server:

```bash
cd ../backend
npm run server
```

6. Start the client:

```bash
cd ../frontend
npm run dev
```

7. Open your browser and visit `http://localhost:3000` to view the application.

## License

This project is licensed under the [MIT License](LICENSE).
