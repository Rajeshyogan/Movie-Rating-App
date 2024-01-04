// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Dung() {
//     const [users, setUsers] = useState([]);
//     const [searchValue, setSearchValue] = useState('');
//     const [IMG_PATH] = useState('https://image.tmdb.org/t/p/w1280');
//     const API_KEY = '4a0f67b5aa5e88373e303e556f8cff59'; // Replace with your actual API key

//     useEffect(() => {
//         getApiData();
//     }, []);

//     async function getApiData() {
//         const API_URL = await axios.get(
//             'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + API_KEY + '&page=1'
//         );

//         setUsers(API_URL.data.results);
//     }

//     async function searchMovies() {
//         if (searchValue.trim() === '') {
//             // Empty search, reset to popular movies
//             getApiData();
//         } else {
//             const SEARCH_API = await axios.get(
//                 `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${API_KEY}`
//             );

//             setUsers(SEARCH_API.data.results);
//         }
//     }

//     const updateInputValue = ({ target: { value } }) => {
//         setSearchValue(value);
//     }

//     return (
//         <div>
//             <form onSubmit={(e) => {
//                 e.preventDefault();
//                 searchMovies();
//             }}>
//                 <input type="search" placeholder="Search..." value={searchValue} onChange={updateInputValue} />
//                 <button type="submit">Search</button>
//             </form>
//             {users.map(({ id, poster_path, title }) => {
//                 return (
//                     <div key={id}>
//                         <img height="200px" width="200px" src={IMG_PATH + poster_path} alt="" />
//                         <h1>{title}</h1>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default Dung;


import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import apistyles from './Apidata.module.css';

function Apidata() {
  const [searchValue, setSearchValue] = useState('');
  const [storedata, setStoreData] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    apiDatas();
  }, []);

  async function apiDatas() {
    let recentApi = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`);
    setStoreData(recentApi.data.results);
  }

  async function searchApi() {
    if (searchValue.trim() === '') {
      apiDatas();
    } else {
      let searchValuesApi = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=4a0f67b5aa5e88373e303e556f8cff59`);
      setStoreData(searchValuesApi.data.results);
    }
  }

  let inputSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  let onSearch = () => {
    searchApi();
  };

  let onSubmitInput = (e) => {
    e.preventDefault();
    onSearch();
  };

  let image = 'https://image.tmdb.org/t/p/w1280';

  return (
    <div>
      <h1>Movie Review App</h1>
      <form ref={formRef} onSubmit={onSubmitInput}>
        <input type="search" placeholder='Search Here....' value={searchValue} onChange={inputSearch} />
        <i type="submit" onClick={onSearch} className="bi bi-search" id=''></i>
      </form>
      <div className={apistyles.beforemaping}>
        {storedata.map(({ id, title, poster_path, overview, vote_average }) => {
          return (
            <div className={apistyles.maping} key={id}>
              <img height={"200px"} width={"200px"} src={image + poster_path} alt="" />
              <h4>{title}</h4>
              <h5>{vote_average}</h5>
              <p>{overview}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Apidata;
