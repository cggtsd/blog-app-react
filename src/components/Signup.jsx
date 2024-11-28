import {
    FormGroup, Container, Row, Col, Form, Label, Input,
    CardHeader, CardBody, Card,Button
} from 'reactstrap'
import {Base} from './Base'
export const Signup = () => {
    return (
        <Base>
            <Container>
                
                <Row>
                    <Col sm={{
                        size: 6,
                        offset:3
                    }}>
                    <Card color='dark' inverse>
                        <CardHeader>
                            <h3>Register Here !!</h3>
                     </CardHeader>   
                    <CardBody>
                           <Form>
                           <FormGroup>
                                <Label for="name">Enter Name</Label>
                                <Input id="name" placeholder="Enter name" type="text"/>
                           </FormGroup>
                           <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input id="email" placeholder="Enter email" type="email"/>
                           </FormGroup>
                           <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input id="password" placeholder="Enter password" type="password"/>
                           </FormGroup>
                          <Container className='text-center'>
                                <Button color="light" outline>Submit</Button>
                                <Button className='ms-2'>Reset</Button>
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