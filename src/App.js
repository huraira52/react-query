import { ChakraProvider, Heading } from '@chakra-ui/react'
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom'
import Home from './Home/Home'
import { ReactQueryDevtools } from 'react-query/devtools'
import Post from './Post/Post'
const queryClient = new QueryClient()
const App = () => {
  return (
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
        <Route path="/post/:id" element={ <Post/>}/>
         <Route path="/:id" element={ <Home/>}/>           
        </Routes>
      </Router>
      <ReactQueryDevtools/>
    </QueryClientProvider>
    </ChakraProvider> 
  )
}

export default App

