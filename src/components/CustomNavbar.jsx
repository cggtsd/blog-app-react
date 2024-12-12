import React, { useEffect, useState } from 'react'
import { NavLink as ReactLink, useNavigate} from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../../auth';
export const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(undefined)
 const navigate= useNavigate()
  useEffect(() => {
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetails())
  }, [login])
  const logout = () => {
    doLogout(() => {
      setLogin(false)
      navigate("/")
    })
  }
  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" className='px-5'>
              <NavbarBrand tag={ReactLink } to="/">My BlogApp</NavbarBrand>
        <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
              <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
             <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>
            <NavItem></NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem>LinkedIn</DropdownItem>
                <DropdownItem>Twitter</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {
              login && (
                <>
              <NavItem>
              <NavLink tag={ReactLink} to="/user/profile-info">
               ProfileInfo
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/user/dashboard">
                {user.email}
              </NavLink>
              </NavItem>
            <NavItem>
              <NavLink onClick={logout}>
               Logout
              </NavLink>
              </NavItem>
              </>
              )
            }
            {
              !login && (
                <>
               <NavItem>
              <NavLink tag={ReactLink} to="/login">
               Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
              Signup
              </NavLink>
            </NavItem>
                </>
              )
              
            }
           
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}
