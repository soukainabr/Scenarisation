import React from 'react';
import { Parallax } from 'react-parallax';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Home = () => {
  return (
    <div className="hero">
      <Parallax
        className="parallax-image"
        blur={3}
        bgImage="/assets/est.jpg"
        bgImageAlt="Background"
        strength={230}
      >
        <div className="parallax-content">
          <div className="container">
            <br />
            <h5 className="card-title display-3 fw-bolder">USMBA</h5><br />
            <h1 className="card-text lead fs-2">L’Université Sidi Mohamed Ben Abdellah de Fès reconnue par la qualité de sa formation centrée sur l’étudiant et une recherche scientifique et technologique de classe internationale.</h1>
          </div>
        </div>
      </Parallax>

      <div className="other-content">
        <div className="container">
          <br />
          <h2 className="t">Événements récents :</h2>
          <br />
          <div className="card-container shadow border-4 border-primary">
            <Carousel>
              <Carousel.Item>
                <Row>
                  <Col md={4}>
                    <Card className="hover">
                      <Card.Img variant="top" src="/assets/est.jpg" />
                      <Card.Body>
                        <Card.Title>Événement 1</Card.Title>
                        <Card.Text>
                          Description de l'événement 1.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="hover">
                      <Card.Img variant="top" src="/assets/est.jpg" />
                      <Card.Body>
                        <Card.Title>Événement 2</Card.Title>
                        <Card.Text>
                          Description de l'événement 2.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="hover">
                      <Card.Img variant="top" src="/assets/est.jpg" />
                      <Card.Body>
                        <Card.Title>Événement 3</Card.Title>
                        <Card.Text>
                          Description de l'événement 3.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>
                  <Col md={4}>
                    <Card className="hover">
                      <Card.Img variant="top" src="/assets/est.jpg" />
                      <Card.Body>
                        <Card.Title>Événement 4</Card.Title>
                        <Card.Text>
                          Description de l'événement 4.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="hover">
                      <Card.Img variant="top" src="/assets/est.jpg" />
                      <Card.Body>
                        <Card.Title>Événement 5</Card.Title>
                        <Card.Text>
                          Description de l'événement 5.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="hover">
                      <Card.Img variant="top" src="/assets/est.jpg" />
                      <Card.Body>
                        <Card.Title>Événement 6</Card.Title>
                        <Card.Text>
                          Description de l'événement 6.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="why-choose-us">
        <div className="container">
          <h2 className="t">Pourquoi choisir l'USMBA ?</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>Formation de haute qualité centrée sur l'étudiant</td>
                <td>Recherche scientifique et technologique de classe internationale</td>
              </tr>
              <tr>
                <td>Infrastructure moderne et équipements de pointe</td>
                <td>Corps professoral expérimenté et qualifié</td>
              </tr>
              <tr>
                <td>Opportunités de stages et de partenariats avec des entreprises renommées</td>
                <td>Programmes d'échange avec des universités internationales</td>
              </tr>
            </tbody>
          </table>
          <h2 className="t">Vision</h2>
          <p>
          L’Université Sidi Mohamed Ben Abdellah de Fès aspire à être parmi les trois premières universités multidisciplinaires marocaines ou l’une des vingt plus grandes universités d’Afrique, reconnue pour son engagement vers l’excellence, par la qualité de sa formation centrée sur l’étudiant et une recherche scientifique et technologique de classe internationale.L’Université Sidi Mohamed Ben Abdellah de Fès agira comme une force de changement et de progrès par sa contribution au développement durable de sa région Fès-Meknès, la société marocaine et universelle en étant respectueuse de l’environnement.
          </p>
          <h2 className="t">Valeurs</h2>
          <p>L’Université Sidi Mohamed Ben Abdellah défend les valeurs suivantes afin de consolider les liens d’appartenance, de confiance et de solidarité entre ses membres  et ce qu’elle partage avec de nombreuses universités :</p>
          <table className="table">
            <tbody>
              <tr>
                <td>Le respect de la personne, de sa dignité, et de ses idées ;</td>
                <td>Le développement durable</td>
              </tr>
              <tr>
                <td>La responsabilité, la rigueur, l’assiduité et la ponctualité ;</td>
                <td>la préservation du patrimoine</td>
              </tr>
              <tr>
                <td>le respect de l’environnement.</td>
                <td>L’intégrité, l’égalité des chances et la transparence ;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    
    </div>
  );
};

export default Home;
