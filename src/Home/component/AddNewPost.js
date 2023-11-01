// import { Heading, Stack, useToast } from '@chakra-ui/react';
// import {Form,Formik} from 'formik' 
// import axios from 'axios';

// import { InputControl, SubmitButton, TextareaControl } from 'formik-chakra-ui'
// import React from 'react'
// import { useMutation } from 'react-query';


// const addNewPost=async ({title, body})=>{
//     try{
//         const {data}=await axios.post(`https://gorest.co.in/public/v2/users/2574338/posts`,{
//             title,
//             body,
//         },{
//             headers:{
//                 Authorization:"Bearer a09f4ba22b5544dabfd973cdc7ade511e9c40f5e54133765a62f620bace0ff52"
//             }
//         })
//         return data;
//     }catch(error){
//         throw Error(error.response.statusText);
//     }
// };
// const AddNewPost = () => {
//   const toast=useToast()  
//   const {isLoading,data,mutateAsync}=useMutation('addNewPost',addNewPost,
//   {
//     onError:(error)=>{
//         toast({status:"error",title: error.message});
//       },
//   }
//   );  
//   console.log(data)
//   return (
//     <div>
//         <Formik initialValues={{title: "", body: "" }} 
//         onSubmit={async(values)=>{
//             await mutateAsync({title:values.title, body:values.body})
//         }}
//         >
//             <Form>
//                 <Stack my="4">
//                     <Heading fontSize="2xl" textAlign="center">
//                        Add New Post
//                     </Heading>
//                 <InputControl name='title' label="Title" />
//                 <TextareaControl name='body' label="Content" />
//                 <SubmitButton isLoading={isLoading}>ADD POST</SubmitButton> 
//                 </Stack>
//             </Form>
//         </Formik>
//     </div>
//   );
// };

// export default AddNewPost



import { Heading, Stack, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { InputControl, SubmitButton, TextareaControl } from 'formik-chakra-ui'
import React from 'react'
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query'

const addNewPost= async({ title, body})=>{
    try{
        const { data } = await axios.post(`https://640eb8dacde47f68db36899c.mockapi.io/users`,{
            title,
            body,
        },{
            headers:{
                Authorization:"Bearer 8309491c56f50ecf53d7edaf627d8132aff6f3acd4dea5e6a316b5d5c352021e"
            }
        });
        return data;
        
    }catch (error) {
        // throw Error(error.response.statusText);
        throw Error("Unable to fetch Posts");
    }
};
const AddNewPost = () => {

    const toast=useToast();
    const cache=useQueryClient();
    const {isLoading,data,mutateAsync}= useMutation('addNewPost',addNewPost,
    {
        onSuccess:()=>{
          cache.invalidateQueries('posts')
        },
        onError:(error)=>{
            toast({status:"error",title:error.message})
          },
    }
    )
  console.log(data)

  return (
    <div>
        <Formik initialValues={{title:"", body: "" }}
         onSubmit={async(values)=>{
            await mutateAsync({ title:values.title, body:values.body})
         }}
        >
            <Form>
                <Stack my="4">
                    <Heading fontSize='2xl' textAlign="center">
                          Add New Post
                    </Heading>
                    <InputControl name='title' label="Title"/>
                    <TextareaControl name='body' label="Content"/>
                    <SubmitButton isLoading={isLoading}>ADD POST</SubmitButton>
                </Stack>
            </Form>
        </Formik>
    </div>
  )
}

export default AddNewPost