/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import MainpageLayout from '../components/MainpageLayout'
import {apiGet} from '../misc/config'

const Home = () => {
    const [input, setInput ] = useState('')
    const [results, setResults] = useState(null)

    const onInputChange = (event)=>{
        setInput(event.target.value);
    }

    const onSearch = ()=>{
       apiGet(`/search/shows?q=${input}`)        
        .then((result)=>{
            setResults(result)           
        });
    }

    const onKeyDown = (ev)=>{
        if(ev.keyCode===13){
            onSearch()
        }
    }

    const renderResults = () => {
        if(results && results.length === 0){
            return <div>No output</div>
        }
        if(results && results.length > 0){
        return (
        <div>
            {results.map((item)=>(
            <div key = {item.show.id}>{item.show.name}</div>
            ))}
        </div>
        );
        }
        return null;
    };

    return (
        <MainpageLayout>
         <input type = "text" onChange = {onInputChange} onKeyDown = {onKeyDown} value = {input} /> 
         <button type ="button" onClick = {onSearch} >Search</button>
         {renderResults()} 
        </MainpageLayout>
    )
}

export default Home
