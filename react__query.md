# React Query
### A Library for fetching data in a React application
1. Since React is a UI library there is no specific pattern for data fetching
2. We typically depend on useEffect Hook for Data Fetching and useState hook to maintain component state like loading, error, or resulting data
3. If Data is needed throughout the app, we tend to use State Management Libraries such as Redux
4. Most of the state Management libraries are good for working with client state, ex: theme for the application / whether a model is open
5. State Management Libraries are not great for working with Asynchronous or Server State
This is because Server State is very different from Client State
Client State is persisted in your App memory and Reading or Updating it is Synchronous
Server State on the other hand is persisted remotely and requires asynchronous API's for Reading or Updating
Also Server State unlike Client State has shared ownership, that is, Data can be updated by someone else without your knowledge which will lead to UI data not in sync with the remote data 
It becomes even more challenging when you have to deal with caching, deduping multiple request for the same data, Updating stale data in the background, Performance Optimization when it comes to Pagination and Lazy Loading, etc.. 
If you cater to all these requirements it would require significant time and effort by yourself

OR 

We can use React Query, maybe even if we do not have complex requirements
# Features we will be Implementing around React Query
1. Basic Queries
2. Poll Data
3. React Query Dev Tools
4. Create Reusable Query Hooks for Reading Data
5. How to Query by ID
6. How to implement Parallel Queries
7. Implement Dynamic Queries 
8. Implement Dependent Queries
9. Infinite and Paginated Queries
10. Update Data using Mutations
11. Invalidate Queries in successful Mutation
12. Optimistic Updates
13. Axios Interceptor


# JSON-SERVER
We will be using this npm package to imitate an API
First on package.json level we need to define a db.json
Then we need to create a script in package.json; "serve-json": "json-server --watch db.json --port 4000"
Now if we run npm run server-json, and in our website open http://localhost:4000/superheroes

# React-Query Begins
We first need to install react-query package: npm i @tanstack/react-query
Now we need to import QueryClient and QueryClientProvider in main.jsx, that is, the entry point of our App.
Create an instance of QueryClient, Wrap <App> with <QueryClientProvider client={queryClientInstance}>
Now we have access to tanstack query in our entire React App