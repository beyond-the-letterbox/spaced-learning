# Spaced Learning

A modern, efficient learning platform that implements spaced repetition to help users retain information more effectively. The application allows users to create, manage, and review digital flashcards using the scientifically-proven spaced repetition technique.

## Features

- **Spaced Repetition Algorithm**: Implements an optimized spaced repetition system (SRS) to maximize learning efficiency
- **Note & Card Management**: Create and organize notes and flashcards
- **Knowledge Graph**: Visualize relationships between different concepts using a graph-based interface
- **Review History**: Track your learning progress and review performance over time
- **UserModel Authentication**: Secure user accounts with email/password authentication

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Static typing for JavaScript
- **Prisma**: Modern database toolkit and ORM
- **MySQL**: Relational database
- **JWT**: JSON Web Tokens for authentication

### Frontend
(To be implemented)

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- MySQL (v8.0 or later)
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spaced-learning.git
   cd spaced-learning/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update the .env file with your database credentials
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
(To be implemented)

## Database Schema

The application uses the following main entities:
- **Users**: UserModel accounts and authentication
- **Notes**: UserModel-created notes with content
- **Cards**: Flashcards derived from notes for spaced repetition
- **Edges**: Relationships between different notes
- **Review History**: Track of card reviews and performance

## Development

### Code Formatting
This project uses Prettier for code formatting. To format your code:
```bash
npm run format
```

### Linting
(To be implemented)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Spaced repetition algorithm inspired by the SM-2 algorithm
- Built with by Klaudia Włodarczyk
