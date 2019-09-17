import React,{useEffect,useState} from 'react'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import './Main.css'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from '../services/api'
import itsamatch from '../assets/itsamatch.png'



export default function Main({match}){
  const [usuario,setUsuario]=useState([])
  const [matchDev,setMathDev]=useState(null)
  //Chamada a api  
  useEffect(()=>{
      async function carregarUsuario(){
        const response = await api.get('/devs',{
            headers:{
                user:match.params.id,
            }})
            setUsuario(response.data)
      }
      carregarUsuario()
  },[match.params.id])
  useEffect(()=>{
    const socket = io('http://localhost:3333',{
        query: {user : match.params.id}
    })
    socket.on('math',dev=>{
        setMathDev(dev)
    })
    
  },[match.params.id])  
    
    async function handleLike(id){
        await api.post(`/devs/${id}/likes`,null,{
            headers:{user:match.params.id}
        })
        setUsuario(usuario.filter(user => user._id !== id))
    }
    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`,null,{
            headers:{user:match.params.id}
        })
        setUsuario(usuario.filter(user => user._id !== id))
    }
  
    return(
       <div className ='main-container'>
           <Link to='/'>
            <img src={logo} alt='Tin Dev'/>
           </Link>
            {usuario.length > 0 ? (
                 <ul>
                 {usuario.map(usuario=>(
                  <li key={usuario._id}>
                      <img src={usuario.avatar}/>
                      <footer>
                          <strong>{usuario.name}</strong>
                          <p>{usuario.bio}</p>
                      </footer>
                          <div className='buttons'>
                              <button type='button' onClick={()=>handleDislike(usuario._id)}>
                                  <img src={dislike} alt='Dislike'/>
                              </button>
                              <button type='button' onClick={()=>handleLike(usuario._id)}>
                                  <img src={like} alt='Like'/>
                              </button>
                          </div>
                  </li>
  
                 ))}
                  
                 
             </ul>
            ) :(
                <div className="empty">Acabou :(</div>
            ) }
            {matchDev && (
                <div className="math-container">
                    <img src={itsamatch} alt="It a math"/>
                    <img clasName="avatar"src={matchDev.avatar} alt=""/>
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button onClick={()=>setMathDev(null)}>Fechar</button>
                </div>
            )}
       </div>
   )
    
}