import {
    FormGroup, Container, Row, Col, Form, Label, Input,
    CardHeader, CardBody, Card,Button
} from 'reactstrap'
import {Base} from './Base'
import { useState } from 'react'
import { signUp } from '../../services/user-service'
import { toast } from 'react-toastify'
export const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about:''
    })

    const [valError, setValError] = useState({
        errors: {},
        isError:false
    })

    const handleChange = (e, field) => setData(d => ({ ...d, [field]: e.target.value }))
    const submitForm = (e) => {
        e.preventDefault()
        console.log(data)
        //validate
        //make call to server api
        signUp(data)
            .then(data => {
                console.log(data)
                toast.success(`user is regsitered successfully !! ${data.id}`)
                setData({
                     name: '',
                     email: '',
                     password: '',
                     about:''
                })
            })
            .catch(error => {
                console.log(error)
                setValError({
                    errors: error,
                    isError:true
                })

            })

    }
    const resetHandler = () => {
        setData({
           name: '',
          email: '',
          password: '',
          about:'' 
        })
    }
    return (
        <Base>
            <Container>
                
                <Row className='mt-4'>
                    <Col sm={{
                        size: 6,
                        offset:3
                    }}>
                    <Card color='dark' inverse>
                        <CardHeader>
                            <h3>Register Here !!</h3>
                     </CardHeader>   
                    <CardBody>
                           <Form onSubmit={submitForm}>
                           <FormGroup>
                                <Label for="name">Enter Name</Label>
                                        <Input id="name" placeholder="Enter name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e)=>handleChange(e,'name')}
                                        />
                           </FormGroup>
                           <FormGroup>
                                <Label for="email">Enter Email</Label>
                                        <Input id="email" placeholder="Enter email"
                                            type="email"
                                            value={data.email}
                                         onChange={(e)=>handleChange(e,'email')}/>
                           </FormGroup>
                           <FormGroup>
                                <Label for="password">Enter Password</Label>
                                        <Input id="password" placeholder="Enter password"
                                            type="password"
                                            value={data.password}
                                         onChange={(e)=>handleChange(e,'password')}/>
                           </FormGroup>
                           <FormGroup>
                                <Label for="about">Enter about yorself</Label>
                                        <Input id="about"
                                            placeholder="Enter about yourselves"
                                            type="textarea" style={{ height: "250px" }}
                                            value={data.about}
                                         onChange={(e)=>handleChange(e,'about')}/>
                           </FormGroup>
                          <Container className='text-center'>
                                <Button color="light" outline>Submit</Button>
                                        <Button className='ms-2' type="reset"
                                            color="secondary"
                                        onClick={resetHandler}>Reset</Button>
                           </Container>           
                        </Form>  
                    </CardBody>
                           
                    </Card>
                    </Col>
                </Row>
            </Container>

        </Base>
       
    )
}