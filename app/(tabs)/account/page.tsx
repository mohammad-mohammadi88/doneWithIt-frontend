"use client"
import type { NextPage } from 'next';
import { tokenApi } from "@/APIs";


const page:NextPage = () => {
    const handleClick = async () => {
        await tokenApi.storeToken("newToken")
    }
    return (
        <button onClick={handleClick}>account</button>
    )
}

export default page