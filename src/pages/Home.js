/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import MainpageLayout from '../components/MainpageLayout'
import {apiGet} from '../misc/config'
import Showgrid from '../components/show/Showgrid'
import ActorGrid from '../components/actor/ActorGrid'

const Home = () => {
    const [input, setInput ] = useState('')
    const [results, setResults] = useState(null)
    const [searchOpt, setSearchOpt] = useState('shows')
    const isActive = searchOpt === "shows";

    const onInputChange = (event)=>{
        setInput(event.target.value);
    }

    const onSearch = ()=>{
       apiGet(`/search/${searchOpt}?q=${input}`)        
        .then((result)=>{
            setResults(result)           
        });
    }

    const onKeyDown = (ev)=>{
        if(ev.keyCode===13){
            onSearch()
        }
    }

    const onRadioChange = (ev)=>{
        setSearchOpt(ev.target.value)
    }

    const renderResults = () => {
        if(results && results.length === 0){
            return <div>No output</div>
        }
        if(results && results.length > 0){
        return results[0].show ? (<Showgrid data = {results}/>)
         :(<ActorGrid data = {results} />)
        
        }
        return null;
    };

    

    return (
        <MainpageLayout>
         <input type = "text"
         placeholder = "Search for something"
         onChange = {onInputChange}
          onKeyDown = {onKeyDown}
           value = {input} /> 

           <div>
               <label htmlFor = "shows-search">
                   Shows
                   <input type="radio" 
                   id = "shows-search"
                    value = "shows" 
                    checked = {isActive}
                    onChange = {onRadioChange}/>
               </label>

               <label htmlFor = "actors-search">
                   Actors
                   <input type="radio"
                    id = "actors-search" 
                    value = "people" 
                    checked = {!isActive}
                    onChange = {onRadioChange}/>
               </label>
           </div>
         <button type ="button" onClick = {onSearch} >Search</button>
         {renderResults()} 
        </MainpageLayout>
    )
}

export default Home
