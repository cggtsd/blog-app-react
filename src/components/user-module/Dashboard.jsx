import React from 'react'
import { Base } from '../Base'
import { AddPost } from '../AddPost'
import { Container } from 'reactstrap'

export const Dashboard = () => {
  return (
    <Base>
      <Container>
         <AddPost/>
      </Container>
         
     </Base>
  )
}
