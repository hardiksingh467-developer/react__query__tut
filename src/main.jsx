// file imports
import './index.css'
import App from './App.jsx'
// dependency imports
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
    ,
)
