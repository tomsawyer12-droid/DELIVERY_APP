
import * as Sentry from '@sentry/react-native';
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CustomButton from "../../components/CustomButton";
import Custominput from "../../components/Custominput";
import useAuthStore from "../../store/Auth.store";
import { account, signIn } from "../lib/appwrite";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form,setForm] = useState({email:'',password:''});
    const { fetchAuthenticatedUser } = useAuthStore();
    const submit = async () => {
        if(!form.email || !form.password) return  Alert.alert('Error','Please enter a valid email and password');
        setIsSubmitting(true);
        try {
            // Log out any existing session
            try {
                await account.deleteSession('current');
            } catch (e) {
                // Ignore if no session exists
            }
            // Now sign in
            await signIn({ email: form.email, password: form.password });
            await fetchAuthenticatedUser();
            router.replace('/');
        } catch ( error:any){
            Alert.alert('Error',error.message);
            Sentry.captureEvent(error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <View className='gap-10  bg-white rounded-lg p-5 mt-5'>
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
            title='Sign In'
            onPress={submit}
            isLoading={isSubmitting}/>


            <View className='flex justify-center flex-row mt-5'>
                <Text className='base-regular text-gray-100'>Don't have an account? </Text>
                <Link href='/sign-Up' className= 'base-bold text-primary'> Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn
