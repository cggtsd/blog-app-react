import React from 'react'
import { Base } from '../Base'
import { AddPost } from '../AddPost'
import { Container } from 'reactstrap'
import NewFeed from '../NewFeed'

export const Dashboard = () => {
  return (
    <Base>
      <Container>
         <AddPost/>
      </Container>
    </Base>
  )
}
