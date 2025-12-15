import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import newsData from "../data/news.json";

function NewsCard() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className="carousel" activeIndex={index} onSelect={handleSelect}>
      {newsData.map((k,v)=> (
      <Carousel.Item key={`${k.url}-${v}`}>
        <a href={k.url}>
          <img src={k.image_url} alt={k.title}/>
          <Carousel.Caption>
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