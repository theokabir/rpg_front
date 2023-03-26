import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { fetchHelper as fh } from '@/helper/fetchHelper'

export default function Home() {

  useEffect(() => {
    let token = localStorage.getItem("token") || 'null'
    let id = localStorage.getItem("player") || 'null'

    fh.get('verify', null, {
      token: token
    })
    .then(res => {
      if(!res.isValid) {
            localStorage.removeItem("token")
            Router.push('/auth')
          }
    })

    fh.get(`user/exists/id/${id}`, null, null)
    .then(res => {
      if (!res){
        localStorage.removeItem("player")
        Router.push('/auth/add-char')
      }
    })

  }, [])


  return (
    <>
      <Head>
        <title>Aplicação rituais</title>
      </Head>
      <div>
        <h1 className={styles.main_title}>Hello World</h1>
      </div>
    </>
  )
}
