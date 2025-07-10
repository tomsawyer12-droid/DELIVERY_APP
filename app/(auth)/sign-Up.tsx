
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CustomButton from "../../components/CustomButton";
import Custominput from "../../components/Custominput";
import { createUser } from "../lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form,setForm] = useState({name:'',email:'',password:''});
    const  submit=async()=>{
        const {name,email,password}=form;
        if(!name|| !email || !password) return Alert.alert('Error','Please enter a valid email and password');
        setIsSubmitting(true);
        try {
            await createUser({name,email,password})

            router.replace('/');

        }catch ( error:any){
            Alert.alert('Error',error.message);
        }finally {
            setIsSubmitting(false);
        }
    }


    return (
        <View className='gap-10  bg-white rounded-lg p-5 mt-5'>
            <Custominput
                placeholder='Enter your  full Name'
                value={form.name}
                label='Name'
                onChangeText={(text)=>setForm((prev)=>({...prev,name:text}))}

            />
            <Custominput
                placeholder='Enter your Email'
                value={form.email}
                label='Email'
                onChangeText={(text)=>setForm((prev)=>({...prev,email:text}))}
                keyboardType='email-address'
            />

            <Custominput
                placeholder='Enter your Password'
                value={form.password}
                label='Password'
                onChangeText={(text)=>setForm((prev)=>({...prev,password:text}))}
                secureTextEntry={true}
            />
            <CustomButton
                title='Sign up'
                onPress={submit}
                isLoading={isSubmitting}
            />


            <View className='flex justify-center flex-row mt-5'>
                <Text className='base-regular text-gray-100'>Already have an account? </Text>
                <Link href='/sign-In' className= 'base-bold text-primary'> Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp
