import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(state=> state.authReducer.user)
  return (
    <div>
        {!user
        ? (<> </>)
        :(
            <>
            <h1>Profile</h1>
            <h3>First name : {user.name}</h3>
            <h3>Last name :{user.lastName} </h3>
            <h3>Email : {user.email} </h3>
            </>
        )
        }
    </div>
  )
}

export default Profile