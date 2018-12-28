import { Redirect, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const isValidUserObject = (authedUserObject) => {
    for (let key in authedUserObject) {
        if (authedUserObject.hasOwnProperty(key)) {
            return true;
        } else {
            return false;
        }
    }
}

const PrivateRoute = ( { component: Component, isUserSignedIn, ...rest } ) => (
    <Route { ...rest } render={(props) => {
        console.log(props.location);
        return (
            isUserSignedIn
                ?
                <Fragment>               
                    <Component { ...props }/>                        
                </Fragment>
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
        )
    }}/>
)

function mapStateToProps({authedUser}) {
    return {
        isUserSignedIn: isValidUserObject(authedUser)
    }
}

export default connect(mapStateToProps, null, null, {pure: false,})(PrivateRoute)