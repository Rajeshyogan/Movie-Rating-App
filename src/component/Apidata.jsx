import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apistyles from "./Apidata.module.css"

function Apidata() {

let [searchValue,setSearchValue]=useState("")
let [storedata,setStoreData]=useState([])

useEffect(()=>{
    apiDatas()
},[])

async function apiDatas(){
    let recentApi=await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`)
    setStoreData(recentApi.data.results)
}

async function searchApi(){
    if (searchValue.trim() === "") {
    apiDatas()
    }
    else{
    let searchValuesApi=await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=4a0f67b5aa5e88373e303e556f8cff59`)
     setStoreData(searchValuesApi.data.results)
    }
}

let inputSearch=({target:{value}})=>{
    setSearchValue(value)
}

let onSubmitInput=(e)=>{
e.preventDefault();
onSearch()
}

let onSearch=()=>{
    searchApi()
}

let image = 'https://image.tmdb.org/t/p/w1280';

  return (
    <section >
    
       <div className={apistyles.heading}>
       <h1>Movie Review App</h1>
        <div>
        <form  onSubmit={onSubmitInput} >
        <input type="search" placeholder='Search Here....' value={searchValue} onChange={inputSearch}/>
        <i type="submit" onClick={onSearch} class="bi bi-search" id=''></i>
        </form>
        </div>
       </div>
    <div className={apistyles.beforemaping}>
        {storedata.map(({id,title,poster_path,overview,vote_average}) => {
            return (
            <div className={apistyles.maping} key={id}>
                <img height={"200px"} width={"200px"} src={image+poster_path} alt="" />
                <div className={apistyles.titlevote}>
                <h4>{title}</h4>
                <div className={apistyles.voting}>
                <h3>{Math.round(vote_average)}</h3>
                <i class="bi bi-star-fill"></i>
                </div>
                </div>
                 <div className={apistyles.overview}>
                <div><p>Overview :</p>{overview}</div>
                 </div>
            </div>)
        })}

    </div>

    <footer>
        <h3>Designed By Rajesh Kumar  </h3>
    </footer>

    </section>
  )
}

export default Apidata