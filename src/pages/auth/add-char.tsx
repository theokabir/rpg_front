import styles from '@/styles/addchar.module.css'
import { useState } from 'react'
import { fetchHelper as fh } from '@/helper/fetchHelper'
import Router from 'next/router'

export default function Addchar() {

    const [collapsed, setCollapsed] = useState(true)
    const [name, setName] = useState('')
    const [character, setCharacter] = useState('')

    const checkButtonHandler = (e: any) => {
        e.preventDefault()

        if (name == '') return

        fh.get(`user/exists/name/${name}`, null, null)
        .then(r => {
            if (r._id){
                localStorage.setItem("player", r._id)
                Router.push('/')
            } else {
                setCollapsed(false)
            }
        })
        .catch(err => {
            console.log(err)
            setName('')
        })

    }

    const revertButton = (e: any) => {
        e.preventDefault()

        setCollapsed(true)
        setName('')
    }

    const createCharHandler = (e: any) => {
        e.preventDefault()

        if (character == '') return

        let body = {name, character}

        fh.post('user', body, {})
        .then(r => {
            localStorage.setItem("player", r._id)
            Router.push('/')
        })

    }

    return (
        <>
            <input 
            type="text" 
            name="nome" 
            id="nome" 
            className={styles.form_input}
            value={name}
            onKeyDown={(e) => {
                if (e.key == "Enter")
                    checkButtonHandler(e)
            }}
            onChange={e => {
                if (collapsed)
                    setName(e.target.value)
            }} />
            <button onClick={(collapsed)?checkButtonHandler:revertButton}>
                {(collapsed)?"checar existencia":"trocar nome"}
            </button>
            <div className={(collapsed)?styles.collapsed_box:styles.expanded_box}>
                <input 
                type="text" 
                name="character" 
                id="character" 
                className={styles.form_input}
                onKeyDown={(e) => {
                    if (e.key == "Enter")
                        createCharHandler(e)
                }} 
                onChange={e => setCharacter(e.target.value)}
                value={character} />
                <button onClick={createCharHandler}>criar personagem</button>
            </div>
        </>
    )
}