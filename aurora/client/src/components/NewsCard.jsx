import { fetchNews } from '../api/calls';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function NewsCard() {

  //Carousel methods
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  //Handles News Api
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchNews();
        setNews(news);
      } catch (error) {
        console.log({"News Data Error": error})
      }
    }
    loadNews();
  }, []);

  return (
    <Carousel className="newscarousel" activeIndex={index} onSelect={handleSelect}>
      {news.map((k,v)=> (
      <Carousel.Item key={`${k.url}-${v}`}>
        <a href={k.url}>
          <img className="newsimg" src={k.image_url} alt={k.title}/>
          <Carousel.Caption className="newscaption">
            <h3>{k.title}</h3>
            <p>{k.snippet}</p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default NewsCard;