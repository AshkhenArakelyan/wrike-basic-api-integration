# wrike-basic-api-integration
Wrike basic API integration is for fetching all tasks from Wrike.

## Prerequisites

- **Node.js**: v20
- **npm**: v10

## Installation

Clone the repository:
```bash
git clone https://github.com/AshkhenArakelyan/wrike-basic-api-integration.git
```

Switch to the develop branch:
```bash
git checkout develop
```

Navigate to the project directory:
```bash
cd wrike-basic-api-integration
```

Create .env file:
```bash
cp .env.example .env
```
There is a secret variable (WRIKE_PERMAMENT_ACCESS_TOKEN) that's value is not included in .env.example

Install dependencies:
```bash
npm install
```

Start the server:
```bash
npm run dev
```

## tasks.json File

This file will be automatically created in the root directory after running the server. It contains a list of tasks with formatted details.
