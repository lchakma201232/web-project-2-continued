import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useAuth} from "../context/AuthContext"
export default function PrivateRoute({component: Component, type, redirect,...rest}) {
    const {currentUser} = useAuth();
    if(type===false){
        return (
            <Route { ...rest} render={props =>{  return !currentUser ? <Component {...props} /> : <Redirect to={redirect}/>
                }}>
            </Route>
        )
    }
    return (
        <Route { ...rest} render={props =>{  return currentUser ? <Component {...props} /> : <Redirect to={redirect}/>
            }}>
        </Route>
    )
}
