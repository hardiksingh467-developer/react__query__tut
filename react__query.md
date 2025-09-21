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
Now we need to import QueryClient and QueryClientProvider in `main.jsx`, that is, the entry point of our App.
Create an instance of QueryClient, Wrap <App> with <QueryClientProvider client={queryClientInstance}>
Now we have access to tanstack query in our entire React App

first import { useQuery } from @tanstack/react-query, this hook will be used for all our data fetching needs
const results = useQuery(key, callback);// this result variable contains nearly all the data which can be overwhelming, hence we would need to destructure it
hence instead of result we will destructure it to const { isLoading, data} = useQuery();
In react Query every useQuery hook needs have a unique key
The second argument is a callback that returns Promise, this callback function will have our API call, that is, our axios implementation; () => { return axios.get()}
Now we can use result.isLoading to render our Loader and data to map our data

#### Handling Query Error
Traditionally we will add another useState such as const [error, setError] = useState(null);
then we catch the error and assign setError(error.message) and render accordingly

but in useQuery hook, similar to isLoading, data, we can also destructure isError and error
const {isLoading, data, error, isError} = useQuery();

if(isError){
    return <h2>{error.message}</h2>
}
One thing to notice when triggering error through URL change is that the loading state will persist for a longer time as compared to Traditional API call as React-Query automatically does a triple retry when an API fails

Another great thing about React Query is that it comes with dedicated Dev tools
import { ReactQueryDevtools } from "@tanstack/react-query/devtools" in main.jsx and wrap the imported component After QueryProvider wrapper
and pass these attributes with there values `initialIsOpen={false} position="bottom-right"`

Now we can see a floating action button in the bottom right of the screen and clicking the button opens the devtools panel, the panel will be empty to begin with, opening a Component with useQuery will show the query keys of the queries being executed, we also get filtering and search to filter out the queries
Apart from these we have four badges that indicate the status of the query: fresh, fetching, stale, and inactive
Clicking on the listed, query a panel will open up to the right which will state more details about this query, we can see that there is one observer which is the RQSuperHeroes Page, we also have the time for when the query was last updated at, we also have an actions card which let's us perform actions relate to the query like, refetching, invalidate, reset, remove
after the action we have the data explorer, this gives you all the information, we will otherwise see in the network tab

### Query Cache
It is a feature the library provides out of the box
In a traditional API call whenever we re-navigate to a Page that makes an API call on page Load, we will see a Loading text again and again as many times as we re-navigate to the page
But for a React Query page the Caching is done by default and we won't see any Loading text after the first time, as the response gets cached for 5 minutes and React Query relies on that cache for subsequent request.
So basically the isLoading starts false, then React Query checks if the data is in cache and if it is, is Loading remains false; So now that isLoading can remain false in certain situations one can wonder if there is another flag available to showcase,
and there is, it is called isFetching, so what isFetching does is that it runs background updates, so isFetching is initially false, but changes to true when we run background refetching, this way the user does not have to see a loading indicator every time the list changes
So if you load the page for the first time; isLoading: true, isFetching: true then isLoading: false, isFetching: false
So if you load the page for the second time within cache time; isLoading: false, isFetching: true then isLoading: false, isFetching: false
We can also custom configure the cache time, to do this we must pass a third argument to useQuery(key, callback, object)
const { isLoading, data, isError, error, isFetching } = useQuery("key", fetchSuperHeroes, { cacheTime: 5000})// this is 5000 milliseconds

### Stale Time:-
Let's say I as a developer know that the list or the data does not change too often and even if it does it is okay if the user is seeing stale data
React Query has default stale time of 0 seconds
So the thing is the background API call to refetch data in order to change the data without a loader happens once but we might need to update data over a period of time, that is, we might need to treat a data fetched from an API call as Stale Data and refetch over a period of time

const { isLoading, data, isError, error, isFetching } = useQuery("key", fetchSuperHeroes, { cacheTime: 5000, staleTime: 30000})

const { isLoading, data, isError, error, isFetching } = useQuery("keyPassedAsUniqueIdentifierToTheQuery", callback, {cacheTime: 5000, staleTime: 30000, refetchOnMount: true, refetchOnWindowFocus: true}), 
The `refetchOnMount` is supposed to call the API when component mounts, the values it accepts are: true, false, and "always"(irrespective of whether the data is stale or not it will always fetch data on mount )
The `refetchOnWindowFocus` is supposed to call the API whenever we open our browser back from minimize or from background, the values it accepts are: true, false, "always"


### Polling with React Query
Polling refers to fetching data over regular intervals
For example we might want to fetch the stock price every second, the ensures the UI is in sync with the remote data irrespective of configurations like refetchOnMount or refetchOnWindowFocus which is dependent on User Interaction 

const { isLoading, data, isError, error, isFetching } = useQuery("keyPassedAsUniqueIdentifierToTheQuery", callback, {cacheTime: 5000, staleTime: 30000, refetchOnMount: true, refetchOnWindowFocus: true, refetchInterval: false})
The refetchInterval has the default value of false, however we can set it to a number which will denote milliseconds after which the API will call the data again refetchInterval: 2000,
the automatic refetching gets paused when the loses focus, to keep refetching even in background we add another property refetchIntervalInBackground: true

So the priority when it comes to refetching data based on all these priorities is
1. refetchInterval, no matter whether the data is stale or cached, if Polling is enabled, the data will be refetched in that period of time
2. staleTime: This determines if the refetch can happen on certain events, if(data is stale) refetch ALLOWED! else not ALLOWED
3. CacheTime: How long should I use the fetched data
4. Event based: refetchOnWindowFocus(Window Focus), refetchOnReconnect(Network Reconnect), Component Remount, Manual Refetch
5. Manual Refetch: refetch(), invalidateQueries()

### useQuery on Click
The GET request is fired as soon as the component mounts or you open a window, however depending on the requirement we might want to fetch the data based on event or user interaction and not when the component mounts

The first step for that is to inform the useQuery hook not to fire the function when the component mounts as that is the default behavior of useQuery hook 
const { data, isLoading, refetch } = useQuery("key", callback, { enabled: false});
passing enabled false will prevent the useQuery hook to run on component mount

The second step is to fetch the data on click of the button, useQuery returns a function called refetch to manually trigger the Query
<button onClick={refetch} >Fetch</button>
The Query cache and stale time plays the same role, the difference is that the subsequent request will be through button click

### Success and Error Callbacks
When we are performing an API call, sometimes we want to produce a side-effect when the query completes, an example would be opening a model, navigating to a different route or even displaying toast notifications, to cater to these scenarios react-query let's us specify, success and error callbacks as configurations or options to the useQuery hook

const onQuerySuccess = (data) => {
    console.log("Function called after successful query execution ")
    console.log("Data is ", data)
}

const onQueryFailure = (error) => {
    console.log("Function called after successfull query execution ")
    console.log("Error is ", error);
}

const { isLoading, data, error, isError} = useQuery("key", callback, {
    onSuccess: onQuerySuccess
    onError: onQueryFailure
});

The useQuery will by default will retry 2 more times, so a total of three times, before calling the onError function


### Data Transformation
Sometimes when data comes from the server we might need to transform data into a format that the frontend can consume, in the Backend we have our own convention and in the frontend we may need our own convention
To help with such scenarios, React Query provides us with SELECT configuration that we can apply on our useQuery hook
In other words, instead of getting an array of objects containing id, and name and createdAt and updateAt, what if we only had an array of names

const { isLoading, data } = useQuery("key", apiCallback,, {
    onSuccess,
    onError,
    select: (data) => {
        const superHeroNames = data.data.map((hero) => {return hero.name});
        return superHeroNames;
    }
});


### Custom Query Hook
Until now what we learned is great for smaller apps, but now for larger apps we might want to reuse the Data Fetching logic, that is, we might need the same Query Configs for multiple API's

We achieve such flexibility using a custom Query Hook
First we will create a new file which will contain a custom query hook, in the src folder create a new folder called `hooks`, in that create a file called useSuperHeroesData.js, refer to the useSuperHeroes.js file in hooks folder in src

Now call the hook in place of useQuery
const { isLoading, isError, error, data } = useSuperHeroesData(onSuccess, onError)