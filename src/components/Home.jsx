import React from 'react'
import { Base } from './Base'
import { Container } from 'reactstrap'
import NewFeed from './NewFeed'

export const Home = () => {
  return (
      <Base>
         
      <Container className='mt-3'>
        <NewFeed/>
      </Container>
         
      </Base>
  )
}
