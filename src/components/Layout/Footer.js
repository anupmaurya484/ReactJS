import React from 'react';
import { Container, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom'

const Footer = (props) => {
  const pathname = window.location.pathname
  const accessPath = ["/login"]
  if (accessPath.includes(pathname)) {
    return (
      <React.Fragment>
        <footer className="footer">
          <Container fluid={true}>
            <Row>
              <Col md={12} sm={12} lg={4}>
              </Col>
              <Col md={12} sm={12} lg={4} className="text-center text-white">
                <span >© 2018 - 2021 Glozic</span>
              </Col>
              <Col md={12} sm={12} lg={4} className="text-right text-white">
                <Link className="text-white" to="/public/terms-of-service"><span>Terms of service</span></Link>
              </Col>
            </Row>
          </Container>
        </footer>

      </React.Fragment>
    );
  } else {
    return false;
  }

}

export default Footer;