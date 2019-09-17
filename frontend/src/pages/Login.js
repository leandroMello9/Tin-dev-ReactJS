import React,{useState} from 'react'
import logo from '../assets/logo.svg'
import './Login.css'
import api from '../services/api'

export default function Login({history}){

    const [NomeUsuario,setNomeUsuario] = useState('')

   
   async function handleSubmit(e){
        e.preventDefault()
        const response = await api.post('/devs',{
            username:NomeUsuario
        })
        const {_id} = response.data
        history.push(`/dev/${_id}`)
   }
    return(
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
             <img src={logo} alt="Tin dev"></img>
             <input
                placeholder="Digite seu Usuario do Git Hub"
                value={NomeUsuario}
                onChange={e => setNomeUsuario(e.target.value)}

             
             />
             <button type="submit">Enviar</button>

            </form>

        </div>

    )
}
