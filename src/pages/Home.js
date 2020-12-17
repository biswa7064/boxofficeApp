/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import MainpageLayout from '../components/MainpageLayout'
import {apiGet} from '../misc/config'
import Showgrid from '../components/show/Showgrid'
import ActorGrid from '../components/actor/ActorGrid'
import { useLastQuery } from '../misc/custom-hooks'
import { SearchInput, RadioInputsWrapper, SearchButtonWrapper } from './Home.styled'
import CustomRadio from '../components/CustomRadio'


const Home = () => {
    const [input, setInput ] = useLastQuery()
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
         <SearchInput type = "text"
         placeholder = "Search for something"
         onChange = {onInputChange}
          onKeyDown = {onKeyDown}
           value = {input} /> 

           <RadioInputsWrapper>
               <div>
                <CustomRadio
                label = "Shows"
                id = "shows-search"
                value = "shows" 
                checked = {isActive}
                onChange = {onRadioChange} />
               
               </div>
                <div>

                <CustomRadio
                label = "Actors"
                id = "actors-search"
                value = "people" 
                checked = {!isActive}
                onChange = {onRadioChange} />
               
               </div>
           </RadioInputsWrapper>
           <SearchButtonWrapper>
         <button type ="button" onClick = {onSearch} >Search</button>
         </SearchButtonWrapper>
         {renderResults()} 
        </MainpageLayout>
    )
}

export default Home
