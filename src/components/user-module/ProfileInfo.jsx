import React, { useContext, useEffect, useState } from 'react'
import { Base } from '../Base'
import {getUser} from '../../../services/user-service'
import { userContext } from '../../context/userContext'
import { useParams, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label,Container,Table ,Row,Col} from 'reactstrap'
export const ProfileInfo = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    // const userContextData=useContext(userContext)
    // console.log(userContextData.user.data)
    useEffect(() => {
        console.log('calling profile info')
        getUser(userId).then(data => {
            setUser({ ...data })
            console.log(user)
        })
            .catch(error => {
                console.log(error)
                toast.error('error in loading user !!')
        })
    }, [])

    const userData = () => {
        return (
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
               
            <Card className='mt-2 border-0 roundec-0 shadow-sm'>
             <CardBody>
                            <h3 className='text-uppercase'>User Information</h3>  
                            <Container className='text-center'>
                                <img src="https://th.bing.com/th/id/OIP.SAcV4rjQCseubnk32USHigHaHx?rs=1&pid=ImgDetMain" style={ {maxWidth:'200px',maxHeight:'200px'}} alt="user profile picture" className="img-fluid rounded-circle"/>
                            </Container>            
                <Table responsive striped hover className='mt-5 text-center' bordered ={true}>
                    <tbody>
                        <tr>
                            <td>User Id</td>
                            <td>{userId}</td>
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
            </CardBody>
            </Card>
                 </Col>
           </Row>)
    }
    
    return (
      
        <Base>
           
            {
              user?userData():'Loading User Data...'
           }
           
         </Base>
        
    
  )
}
