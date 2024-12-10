import { useState } from "react"
import { Base } from "./Base"
import { Container, Row, Col, Form, FormGroup, Label,Input,Card,CardBody,CardHeader,Button} from 'reactstrap'
import { logIn } from "../../services/user-service"
import { toast } from "react-toastify"
export const Login = () => {
  const [loginDetail,setLoginDetail] = useState({
        username: '',
        password:''
  })
    const changeHandler = (e,field)=>{
        setLoginDetail({...loginDetail,[field]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        
        if (loginDetail.username.trim() === '' || loginDetail.password.trim()=== '') {
            toast.error('Username or password required !!')
            return
        }
        logIn(loginDetail).then(data => {
            console.log(data)
            toast.success('Login Successfull !!')
            
        }).catch(error => {
            console.log(error)
            if (error?.status === 404) {
                toast.error(error?.response?.data.message)
            }
            else
            toast.error("Something went wrong !!")
        })
    }
    const resetHandler = () => {
        setLoginDetail({
            username: "",
            password:""
        })
    }
    return (
        <Base>
            <Container>
                
                <Row className="mt-4">
                    <Col sm={{
                        size: 6,
                        offset:3
                    }}>
                    <Card color='dark' inverse>
                        <CardHeader>
                            <h3>Login Here !!</h3>
                       </CardHeader>   
                    <CardBody>
                           <Form onSubmit={submitHandler}>
                           
                           <FormGroup>
                                <Label for="email">Enter Email</Label>
                                        <Input id="email" placeholder="Enter email"
                                            type="email"
                                        value={loginDetail.username}
                                        onChange={(e)=>changeHandler(e,'username')}/>
                           </FormGroup>
                           <FormGroup>
                                <Label for="password">Enter Password</Label>
                                        <Input id="password" placeholder="Enter password" type="password"
                                        value={loginDetail.password}
                                        onChange={(e)=>changeHandler(e,'password')}/>
                           </FormGroup>
                          <Container className='text-center'>
                                <Button color="light" outline>Submit</Button>
                                <Button className='ms-2' outline-color="secondary" onClick={resetHandler}>Reset</Button>
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