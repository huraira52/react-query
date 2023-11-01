// import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from '@chakra-ui/react';
// import axios from 'axios';
// import React from 'react'
// import { useQuery } from 'react-query'
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import AddNewPost from './component/AddNewPost';


// const fetchPosts= async (id)=>{
// try{  
// const { data }=await axios.get(`https://gorest.co.in/public/v2/users/2574338/posts?page=${id}`);
// return data;
// } catch(error){
//     throw Error("Unable to fetch Posts")
// };
// }

// const Home = () => {
//     const { id } = useParams();
//     const history = useNavigate();
//     console.log(id);
//     const pageId = parseInt(id);
//     const toast =useToast();
//     const {data,isLoading} = useQuery(['posts',pageId],()=> fetchPosts(pageId),
//     { 
//         keepPreviousData: true,
//         onError:(error)=>{
//           toast({status:"error",title:error.message})
//         },
//     });
//     // console.log(data);
//   return (
//     <Container maxW="1300px" mt="4">
        
//         {isLoading ? (
//         <Grid placeItems="center" height="100vh">
//             <Spinner/></Grid>
//             ):(
            
//             <>
//             <AddNewPost/>
//             <Flex justify="space-between" mb="4">
//                <Button 
//                colorScheme='red'
//                onClick={()=>{
//                 // if(data.meta.pagination.links.previous !== null){
//                 //   history(`/${pageId - 1}`);
//                 // }
//                  history(`/${pageId - 1}`);
//                }}
//               //  disabled={!data.meta.pagination.links.previous !== null}
//             >
//                 {" "}
//                 Prev
//                 </Button>
//                 <Text>Current Page : {pageId}</Text>
//                <Button colorScheme='green'   
//                  onClick={()=>{
//                  history(`/${pageId + 1}`);
//                }}>Next</Button>
//             </Flex>
//             {data && data.map((post)=>(
//               <Link key={post.id} to={`/post/${post.id}`}>
//             <Stack p="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc"  mb="4">
//             <Flex justify="space-between">
//                 <Text>UserId:{post.user_id}</Text>
//                 <Text>PostId:{post.id}</Text>
//             </Flex>
//             <Heading fontSize="2xl" >{post.title}</Heading>
//             <Text>{post.body}</Text>
//         </Stack>
//         </Link>
//         ))}</>)}
        
       
//     </Container>
  
//   )
// }


// export default Home
 
import { useQuery } from 'react-query'
import React from 'react'
import axios from 'axios';
import { Container,Stack,Heading,Flex,Text, Grid, Spinner, useToast, Button } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddNewPost from './component/AddNewPost';


const fetchPosts=async(id)=>{
  try{
  const{data}=await axios.get(`https://640eb8dacde47f68db36899c.mockapi.io/users?page=${id}`)
    return data;
  }catch(error){
    throw Error("Unable to fetch Posts");
  }
};
const Home = () => {
  const {id} = useParams();
  console.log(id);
  const history=useNavigate()
  const pageId=parseInt(id)
  const toast = useToast();
  const {data,isLoading,error,isError}=useQuery(["posts",pageId],()=> fetchPosts(pageId),{
    keepPreviousData: true,
    onError:(error)=>{
      toast({status:"error",title:error.message})
    },
  });
  // console.log(data);

  
  return (
    <Container maxW="1300px" mt="4">
  
      {isLoading ? <Grid placeItems="center" height="100vh"><Spinner/></Grid>:
    <>
       <AddNewPost/>
       <Flex justify="space-between" mb="4">
         <Button colorScheme='red'
          onClick={()=>{
            history(`/${pageId - 1}`); 
         }}
         >Prev</Button>  
         <Text>Current Page : {pageId}</Text> 
         <Button colorScheme='green'
          onClick={()=>{
            history(`/${pageId + 1}`); 
         }}
         >Next</Button>  
         
      </Flex>

      {data && data.map((post)=>(
        <Link key={post.id} to={`/post/${post.id}`}>
        <Stack p="4"
         boxShadow="md"
          borderRadius="xl" 
          border="1px solid #ccc"
          //  key={post.id}
           mb="4"
           >
            <Flex justify="flex-end">
                <Button size="sm">Delete</Button>
            </Flex>
        <Flex justify="space-between">
          <Text>USerId: {post.user_id}</Text>
          <Text>PostId: {post.id}</Text>
        </Flex>
        <Heading fontSize='2xl'>{post.title}</Heading>
        <Text>{post.body}</Text>
      </Stack>
      </Link> 
   ))}</>}
   
    </Container>
  )
}

export default Home