import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label,Container,Table, CardFooter } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../../auth'
function ViewProfileInfo({ user }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(false)
    useEffect(() => {
        setCurrentUser(getCurrentUserDetails()) 
        setLogin(isLoggedIn())
    },[])
  return (
     <Card className='mt-2 border-0 roundec-0 shadow-sm'>
             <CardBody>
                            <h3 className='text-uppercase'>User Information</h3>  
                            <Container className='text-center'>
                                <img src={user.image?user.image:'https://th.bing.com/th/id/OIP.SAcV4rjQCseubnk32USHigHaHx?rs=1&pid=ImgDetMain'} style={ {maxWidth:'200px',maxHeight:'200px'}} alt="user profile picture" className="img-fluid rounded-circle"/>
                            </Container>            
                <Table responsive striped hover className='mt-5 text-center' bordered ={true}>
                    <tbody>
                        <tr>
                            <td>User Id</td>
                          <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td>User Name</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>User Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>User Details</td>
                            <td>{user.about}</td>
                        </tr>
                        <tr>
                            <td>User Roles</td>
                            <td>{user.roles.map((role) => {
                                return <div key={role.roleId}>{role.name}</div>
                            })}</td>
                        </tr>
                    </tbody>
              </Table>
              {
                  (currentUser ? (
                      (currentUser.id === user.id ?
                          <CardFooter className='text-center'>
                              <Button color='warning'>Update Profile</Button>
                        </CardFooter>: "")
                 ):'')
              }
            </CardBody>
            </Card>
  )
}

export default ViewProfileInfo