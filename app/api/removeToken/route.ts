import { cookies } from "next/headers"

export async function DELETE(){
    const cookie = await cookies()
    try{
        cookie.delete('x_auth_token') 
        return new Response('the token delete successfully!',{
            status:200,
            statusText:"",
        })
    } catch(e) {
        console.log(e)
        return new Response('Something went wrong while deleting token',{
            status:500,
            statusText:'Something went wrong while deleting token',
        })
    }
}