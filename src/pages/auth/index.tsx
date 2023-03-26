import { useEffect, useState } from "react"
import { fetchHelper as fh } from "@/helper/fetchHelper"
import Router from "next/router"

export default function Auth() {

    const [token, setToken] = useState('')

    const tokenFormHandler = (e: any) => {
        e.preventDefault()
        
        fh.get('verify', {}, { token: token })
        .then(r => {
            if (r.isValid){
                localStorage.setItem('token', token)
                Router.push('/auth/add-char')
            } 

            throw new Error('token não autorizado')
        })
        .catch(err => {
            console.log(err)
            setToken('')
        })
    }

    return (
        <>

            <p>{token}</p>

            <form onSubmit={tokenFormHandler}>
                <input 
                type="text" 
                name="token" 
                id="token" 
                className="border-black bg-gray-500"
                value={token}
                onChange={(e) => setToken(e.target.value)} />

                <button type="submit">Enviar token</button>
            </form>
        </>
    )
}