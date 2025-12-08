# The original prjects was hosted on Heroku which is no longer free
I created a new PERN app with PostgreSQL as the data base and Neon and the database hoset and Render using Neon to get the data
Render does not have free PostgrSQL databases because they have to pay money for PostgreSQL to run the show (?)

I had a lot of CHAT GBT help, but could not have rewritten it with out it. 

## Available Scripts
✔️ Fix #3 — Start the backend before React

Always start in this order:

1️⃣ Start server

Terminal #1:

cd server
node server.js


Look for:

Server running on port 3001
Connected to Neon PostgreSQL

2️⃣ Then start React

Terminal #2:

cd client
npm start


If React starts before the backend, you get the fetch failure.
In the project's client directory, you can run:
### `npm start`

Runs the app in the development mode.\
Open http://localhost:3001 to view it in your browser.

The page will reload when you make changes.\

### Deployment run in Client Folder
## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

In Server Folder, run node server.js

Frontend → backend requests
React is served on 3000
Node/Express is listening on 3001
So React calls: http://localhost:3001/beaches and cors() must allow localhost:3000.

Will probably try to stay with Bulma for the Front End css Framework.

Render free services will sleep after 15 minutes on your local machine
❗BUT… Render web services sleep

On free tier, Render services go to sleep after 15 minutes of inactivity, then take ~60 seconds to wake up.
So the first visit might feel slow — that's normal.

Your setup is:
Frontend: marshvegasclient.onrender.com
Backend: marshvegas.onrender.com
Database: Neon PostgreSQL (hosted)