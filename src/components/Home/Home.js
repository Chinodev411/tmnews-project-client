import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Image, Row, Col, CardGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, Route } from 'react-router-dom';
// import API_URL from '../../apiConfig';



const Home = () => {
  const [home, setHome] = useState([]);
  const [articles, setArticles] = useState([]);

  const getHomeIndex = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?page=20category=technology&country=us&apiKey=a4c0f6406eb744eeb7e00beb7feb9d54');
      const data = await response.json();
      console.log(data);
      setHome(data.articles)
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getHomeIndex();
  }, []);

  // if (!home.length) {
  //   return null;
  // }
  
  return (
    <Container>
      <CardGroup>
        <Row>
          {home.map((home) => {
            return (
              <Col key={home.id}>
                <Link
                  to={`/${home.url}`}
                  style={{ color: 'black',
                  textDecoration: 'none'}}>
                  <Card className='articles'>
                    <Card.Body>
                      <Card.Title className='text'>
                        {home.author}
                      </Card.Title>
                      <Card.Text>{home.title}</Card.Text>
                      <Card.Img variant="top" 
                      rounded
                      fluid
                      src={home.urlToImage} alt="Card image" className="card-image"/>
                      
                    </Card.Body>

                  </Card>

                </Link>
              </Col>
            )
          })}
        </Row>
      </CardGroup>
    </Container>
  );
};

export default Home;