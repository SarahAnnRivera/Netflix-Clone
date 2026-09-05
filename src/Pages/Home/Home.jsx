import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../Components/TitleCards/TitleCards'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className='hero'>
        <img src={hero_banner} className='banner-img'/>
        <div className='hero-caption'>
          <img src={hero_title} className='caption-img'/>
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns">
  <button
    className="btn"
    onClick={() =>
      window.open(
        "https://www.youtube.com/results?search_query=The+Protector+Netflix+official+trailer",
        "_blank"
      )
    }
  >
    <img src={play_icon} alt="" />
    Play
  </button>

  <button
    className="btn dark-btn"
    onClick={() =>
      window.open(
        "https://www.netflix.com/title/80189829",
        "_blank"
      )
    }
  >
    <img src={info_icon} alt="" />
    More Info
  </button>
</div>
          <div id="popular"className="scroll-section"><TitleCards /></div>
          
        </div>
      </div>
      <div className="more-cards">
        <div id="top-rated" className="scroll-section"><TitleCards title={"Blockbuster Movies"} category={"top_rated"}/></div>
        <div id="only-on-netflix" className="scroll-section"><TitleCards title={"Only on Netflix"} category={"popular"}/></div>
        <div id="upcoming" className="scroll-section" ><TitleCards title={"Upcoming"} category={"upcoming"}/></div>
        
        <TitleCards title={"Top Picks For You"} category={"now_playing"}/>

      </div>
      <Footer />
    </div>
  )
}

export default Home
