# StudyBuddies
- StudyBuddies is a platform that helps students find people to revise with. 

## Tech Stack
- Next.js
- Clerk
- Supabase

## Environment Setup 

Before running the project, you need to set up your environment variables. 

1. Create a .env.local file
2. Add the required environment variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
DATABASE_URL=your_database_url_here

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

## Setup

1. Clone repo
- `git clone git@github.com:HassanJ4/study-group-finder.git` 
- `cd study-group-finder`
2. Run `npm install`
3. Run `npm run dev`

## Branching & Collaboration

- To keep work organised, do not push directly to main. Use branches instead 

### Workflow for adding features 

1. Checkout a branch
- `git checkout -b thenameofbranch`
- `-b` creates a new branch 
- `checkout` switches you to that branch
2. Make your changes
- Edit files
3. Add, commit & push
- `git add .`
- `git commit -m "Describe your changes"`
- `git push origin thenameofbranch`
- Make sure you push to the branch you're on, not `main`.
4. Go to GitHub
- A button will appear to create a pull request
- Click it, review and create the pull request
5. Merge pull request
6. Update your local main branch
- `git checkout main`
- `git pull`

## Features

- Create and join study groups
- Post messages inside groups
- View group details and member lists
- Browse all users in the app
- View public user profiles
- Edit your own profile and bio
- Authentication handled through Clerk
- Data stored and fetched from Supabase

## Future Features

- Group chat in real time
- Ability to upload profile pictures
- Search bar for finding groups and users
- Notifications for new posts or group activity
- Dark mode toggle
- Mobile‑friendly UI improvements