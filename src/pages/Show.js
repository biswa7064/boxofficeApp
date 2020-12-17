/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect,useReducer } from 'react'
import {useParams} from 'react-router-dom'
import { apiGet } from '../misc/config';
import ShowMainData from '../components/show/ShowMainData';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import Cast from '../components/show/Cast';
import { ShowPageWrapper, InfoBlock } from './Show.styled';
import { useShow } from '../misc/custom-hooks';





const reducer = (prevState, action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS':{
            return {isLoading:false,error:null,show:action.show }
        }

        case 'FETCH_FAILED':{
            return {...prevState,isLoading:false,error:action.error }
        }

        default:
             return prevState
    }
}

const initialState = {
    show:null,
    isLoading:true,
    error:null
}

const Show = () => {
    const {id} = useParams();

    const {show,isLoading,error} = useShow(id)  

   

    if(isLoading){
        return <div>Data being loaded</div>;
    }

    if(error){
        return <div>Error occured:{error}</div>;
    }

    
    return (
        <ShowPageWrapper>
         <ShowMainData 
         image = {show.image} 
         name = {show.name}
         rating = {show.rating}
         summary = {show.summary}
         tags = {show.genres} />

         <InfoBlock>
             <h2>Details</h2>
             <Details
             status = {show.status}
             network = {show.network} 
             premiered = {show.premiered} />
        </InfoBlock> 

        <InfoBlock>
             <h2>Seasons</h2>
             <Seasons 
             seasons = {show._embedded.seasons}  />
        </InfoBlock> 

        <InfoBlock>
             <h2>Cast</h2>
             <Cast cast = {show._embedded.cast}/>
        </InfoBlock> 
        </ShowPageWrapper>
    )
}

export default Show
