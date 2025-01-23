import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services/category-service'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router'

const CategorySideMenu = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories().then(data => {
            console.log(data)
            setCategories(data)
        }).catch(error => {
            console.log(error)
            toast.error("error in loading categories !!")
        })

    },[])
  return (
      <div>
          <ListGroup>
              <ListGroupItem action={true} tag={Link} to ="/">
                  All Blogs
              </ListGroupItem>
              {
                  categories && categories.map((category, index) => {
                      return (
                          <ListGroupItem
                              key={index}
                              action={true}
                              tag={Link}
                              to={`/categories/${category.categoryId}`}
                          >{category.categoryTitle}</ListGroupItem>
                      )
                  })
              }
          </ListGroup>

      </div>
  )
}

export default CategorySideMenu