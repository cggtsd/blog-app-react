import React, { useContext, useEffect, useState } from 'react'
import { Base } from '../Base'
import {getUser} from '../../../services/user-service'
import { userContext } from '../../context/userContext'
import { useParams, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label,Container,Table ,Row,Col} from 'reactstrap'
import ViewProfileInfo from '../ViewProfileInfo'
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
                    <ViewProfileInfo user={user} />
           
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
