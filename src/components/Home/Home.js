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
    const url = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=nNQV9laA8lCZTvij9Mv9GCc7cD7sQqvC"
    try {
      const response = await fetch(url);
      const data = await response.json();
      setHome(data.results)
    } catch (err) {
      console.log(err);
    };
  };

  useEffect(() => {
    getHomeIndex();
  }, []);

  // if (!home.length) {
  //   return null;
  // }
  
  return (
    <Container className='background'>
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
                    <Card.Body className='one'>
                      <Card.Title className='text'>
                        {home.title}
                      </Card.Title>
                      <Card.Text>{home.byline}</Card.Text>
                      <Card.Text>{home.abstract}</Card.Text>
                      <Card.Img variant="top" 
                      rounded 
                      fluid
                      src={home.multimedia[0].url} alt="Card image" className="card-image"/>
                      <Card.Text>{home.published_date}</Card.Text>
                      
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