# Project README

## Overview
This project is a web application built using React and Next.js, designed to display a leaderboard for traders. It integrates with the Solana blockchain to fetch and display trader data, allowing users to view various metrics and statistics related to their trading activities.

## Design Decisions
1. **Component Structure**: The application is structured into reusable components such as `LeaderboardTable`, `Header`, `WalletContextProvider`, and `TraderProfile`. This modular approach enhances maintainability and readability.

2. **State Management**: The application uses React's built-in state management with hooks like `useState` and `useEffect` to manage component states and side effects, such as fetching trader data.

3. **Wallet Integration**: The application integrates with Solana's wallet adapter to allow users to connect their wallets and access features securely. The `WalletContextProvider` component wraps the application to provide wallet context throughout the component tree.

4. **Responsive Design**: The UI is designed to be responsive, ensuring a good user experience on both desktop and mobile devices. CSS classes from Tailwind CSS are used for styling.

5. **Dynamic Imports**: Components like `WalletMultiButton` are dynamically imported to optimize performance and reduce the initial load time.

## Assumptions Made
- The application assumes that the user has a compatible wallet installed (e.g., Phantom Wallet) to connect and interact with the Solana blockchain.
- Trader data is assumed to be available in a JSON format, which is fetched from a specified API endpoint.
- The application is designed to work primarily on the Solana mainnet, but it can be configured for other networks (devnet, testnet) if needed.

## Testing Functionality
1. **Local Development**:
   - Clone the repository to your local machine.
   - Run `npm install` to install the necessary dependencies.
   - Start the development server with `npm run dev`.
   - Open your browser and navigate to `http://localhost:3000` to view the application.

2. **Wallet Connection**:
   - Ensure you have the Phantom Wallet extension installed in your browser.
   - Click on the "Connect Wallet" button to connect your wallet and access the features.

3. **Data Display**:
   - Verify that the leaderboard displays trader data correctly.
   - Test the search functionality by entering trader names or wallet addresses.

4. **Sorting and Filtering**:
   - Test the sorting functionality by clicking on the column headers in the leaderboard table.
   - Check the filtering options to ensure they work as expected.

## Live Testing
You can test the live application at the following link: [Potion Leaderboard](https://potion-eta.vercel.app)

## Deployment Instructions
### Deploying to Vercel
1. **Create a Vercel Account**:
   - Sign up for a Vercel account at [vercel.com](https://vercel.com).

2. **Connect Your Git Repository**:
   - After logging in, click on "New Project" and connect your GitHub, GitLab, or Bitbucket account.
   - Select the repository containing your project.

3. **Configure Project Settings**:
   - Vercel will automatically detect that you are using Next.js and set the appropriate build settings.
   - Ensure that the environment variables (if any) are set in the Vercel dashboard.

4. **Deploy**:
   - Click on the "Deploy" button to start the deployment process.
   - Once the deployment is complete, Vercel will provide you with a unique URL to access your application.

### Staging and Production Environments
- **Staging**: You can create a staging environment by setting up a separate branch in your Git repository (e.g., `staging`). Vercel will automatically create a preview deployment for each pull request or branch.
- **Production**: The main branch (usually `main` or `master`) will be deployed to the production environment. Ensure that all tests are passed and the code is reviewed before merging into the main branch.