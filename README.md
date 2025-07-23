# Azure Quiz Bot

A chatbot built with Microsoft Bot Framework that allows users to take a quiz and receive certificates upon passing.

## Features

- Email-based user identification
- Department lookup from database (using dummy data currently)
- 10-question quiz with multiple-choice answers
- Automatic scoring and certificate generation
- Responsive chat interface with adaptive cards

## Prerequisites

- Node.js (v12 or higher)
- Microsoft Bot Framework Emulator for local testing
- Azure subscription (for deployment)

## Setup and Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the bot locally:

```bash
npm run start
```

4. Connect to the bot using Bot Framework Emulator:
   - Open Bot Framework Emulator
   - Click "Open Bot"
   - Enter the endpoint URL: http://localhost:3978/api/messages

## Test Credentials

For testing, you can use these dummy email addresses:

- john@example.com (Engineering)
- sara@example.com (Marketing)
- alex@example.com (Sales)
- priya@example.com (Human Resources)
- mike@example.com (Finance)
- test@test.com (Testing)

## Quiz Format

- 10 multiple-choice questions
- 4 options per question (A, B, C, D)
- 70% passing score required for certificate

## Deployment to Azure

### Prerequisites:

1. Azure Account with an active subscription
2. Bot Service resource
3. App Service resource

### Deployment Steps:

1. Create Azure Bot Service in Azure Portal
2. Set up App Service
3. Configure deployment credentials
4. Deploy code to Azure

## Moving to Production

To connect to a real database:

1. Create an Azure SQL Database
2. Update `.env` file with database credentials
3. Create the following tables:
   - users (email, department)
   - quiz_questions (id, question, option_a, option_b, option_c, option_d, correct_answer)
   - quiz_results (email, score, total_questions, passed, completed_at)

## License

ISC
