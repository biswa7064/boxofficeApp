/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import MainpageLayout from '../components/MainpageLayout'

const Home = () => {
    const [input, setInput ] = useState('')

    const onInputChange = (event)=>{
        setInput(event.target.value);
    }

    const onSearch = ()=>{
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then(raw=>raw.json())
        .then((result)=>{
            console.log(result)
        })
    }

    const onKeyDown = (ev)=>{
        if(ev.keyCode===13){
            onSearch()
        }
    }

    return (
        <MainpageLayout>
         <input type = "text" onChange = {onInputChange} onKeyDown = {onKeyDown} value = {input} /> 
         <button type ="button" onClick = {onSearch} >Search</button> 
        </MainpageLayout>
    )
}

export default Home
