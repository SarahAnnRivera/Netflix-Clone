import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzJiYTg1MThhZTgzMzgyYmQxMTZlMmE4YTZkNTgzNCIsIm5iZiI6MTc4NTA3ODkyMy4yMDQsInN1YiI6IjZhNjYyNDhiMjUwNWU1MGEwMzcxZDU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j6HHVKlc9DLf_1ZZBZoLsfJ9YqYIMBQjn4juXS_aG8Q'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then((res) => {
  console.log("Actual app response:", res);
  setApiData(res.results[0]);
})
  .catch(err => console.error(err));


},[])




  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0, 10)}</p>
         <p>{apiData.name}</p>
          <p>{apiData.type}</p>
      </div>
      
    </div>
  )
}

export default Player
