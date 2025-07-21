import { SignUp } from '@clerk/nextjs'
import React from 'react'

// Page d'inscription
const page = () => {
    return (
        <div className='flex justify-center items-center  h-screen'>
            <SignUp />
        </div>
    )
}

export default page