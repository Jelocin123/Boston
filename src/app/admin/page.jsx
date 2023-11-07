"use client"
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useUserContext } from '../providers/userProvider'; 

const Page = () => {

    const router = useRouter();
    const { user } = useUserContext(); 

    useEffect(() => {
        if (!user) {
          
          router.push('/login');
        }
      }, [user, router]);
    
  return (
    <div>Velkommen til admin!:)</div>
  )
}

export default Page