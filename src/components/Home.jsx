import React from 'react'
import { Base } from './Base'
import { Container, Row,Col } from 'reactstrap'
import NewFeed from './NewFeed'
import CategorySideMenu from './CategorySideMenu'

export const Home = () => {
  return (
      <Base>
         
      <Container className='mt-3'>
        <Row>
          <Col md={2} className='pt-5'>
            <CategorySideMenu/>
          </Col>
          <Col md={10}>
            <NewFeed/>
          </Col>
        </Row>
      </Container>
         
      </Base>
  )
}
