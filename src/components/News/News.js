import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API_URLS from '../../apiConfigs';

const News = ({ loggedIn }) => {
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);
  
  const getNewsIndex = async () => {
    try {
      const response = await fetch(API_URLS + 'news/' );
      const data = await response.json();
      console.log(data);
      setNews(data);
    } catch(error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getNewsIndex();
  }, []);

  if (!news.length) {
    return null;
  }



  return (
    <Container>
      <h1>News</h1>
      {loggedIn && (
        <Link to='news/new'>
          <Button>Publish A Verified News</Button>
        </Link>
      )}
      <CardGroup>
        <Row>
          {news.map((news) => {
            return (
              <Col key={news.id}>
                <Link
                  to={`news/${news.id}`}
                  style={{ color: 'black', textDecoration: 'none' }}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{news.author}</Card.Title>
                      <Card.Text> {news.title} </Card.Text>
                      <Card.Text>{news.description} </Card.Text>
                      <Card.Link> {news.source} </Card.Link>
                      <Card.Link>{news.url} </Card.Link>
                      <Card.Text> {news.published} </Card.Text>
                      <Card.Title>{news.owner} </Card.Title>
                      
                      <Card.Text>
                        Number of comments: {news.comments.length}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </CardGroup>

    </Container>
   
  );
};

export default News;