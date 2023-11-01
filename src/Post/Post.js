// import {Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from '@chakra-ui/react';
// import axios from 'axios';
// import React from 'react'
// import { useQuery } from 'react-query'
// import { useParams, } from 'react-router-dom';

// const fetchPost= async (id) => {
// try{  
// const { data }=await axios.get(
//     `https://gorest.co.in/public/v2/posts/${id}`
//     );

//     return data;
//    } 
//     catch(error){
//     throw Error("Unable to fetch Post")
//    };
// }

// const Post = () => {
//     const { id } = useParams();
//     const toast =useToast();
//     const {data,isLoading} = useQuery(["post", id], () => fetchPost(id),{ 
//         onError:(error)=>{
//           toast({status:"error", title: error.message})
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
//            <Stack p="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc" key={data && data.id} mb="4">
//             <Flex justify="space-between">
//                 <Text>UserId:{data && data.user_id}</Text>
//                 <Text>PostId:{data && data.id}</Text>
//             </Flex>
//             <Heading fontSize="2xl" >{data && data.title}</Heading>
//             <Text>{data && data.body}</Text>
//         </Stack>
//         </>
//         )}
        
       
//     </Container>
  
//   )
// }


// export default Post;


import { useQuery } from 'react-query'
import React from 'react'
import axios from 'axios';
import { Container,Stack,Heading,Flex,Text, Grid, Spinner, useToast, } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';


const NewPost=async(id)=>{
  try{
  const{data}=await axios.get(`https://640eb8dacde47f68db36899c.mockapi.io/users/${id}`)
  console.log(data);
    return data;
  }catch(error){
    throw Error("Unable to fetch Post");
  }
};
const Post = () => {
  const {id} = useParams();
  console.log(id);
  // const history=useNavigate()
  // const pageId=parseInt(id)
  const toast = useToast();
  const {data,isLoading,error,isError}=useQuery(["post",id],()=> NewPost(id),{
    // keepPreviousData: true,
    onError:(error)=>{
      toast({status:"error",title:error.message})
    },
  });
  // console.log(data);
  return (
    <Container maxW="1300px" mt="4">
  
      {isLoading ? <Grid placeItems="center" height="100vh"><Spinner/></Grid>:
    <>
      <Stack p="4"
         boxShadow="md"
          borderRadius="xl" 
          border="1px solid #ccc"
           key={data && data.id}
           mb="4"
           >
        <Flex justify="space-between">
          <Text>USerId: {data && data.user_id}</Text>
          <Text>postId: {data && data.id}</Text>
        </Flex>
        <Heading fontSize='2xl'>{data && data.title}</Heading>
        <Text>{data && data.body}</Text>
      </Stack>
    </>}
   
    </Container>
  )
}

export default Post