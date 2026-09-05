import { useEffect, useState } from 'react'
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
    type: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then((res) => {
 const trailer =
  res.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  ) ||
  res.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  ) ||
  res.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Teaser"
  ) ||
  res.results.find(
    (video) => video.site === "YouTube"
  );

setApiData(trailer);
})
  .catch(err => console.error(err));


},[])




  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%'  src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1&mute=1&origin=${window.location.origin}`}
      title='trailer' frameBorder='0' allow="autoplay; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0, 10)}</p>
         <p>{apiData.name}</p>
          <p>{apiData.type}</p>
      </div>
      <a
  className="youtube-link"
  href={`https://www.youtube.com/watch?v=${apiData.key}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Watch Trailer on YouTube
</a>
    </div>
  )
}

export default Player
