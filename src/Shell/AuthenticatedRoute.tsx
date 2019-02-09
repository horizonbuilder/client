import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import AuthService from '../services/auth';

export const AuthenticatedRoute = ({ component, ...rest }: RouteProps) => {
  const Component = component as React.ComponentClass<RouteComponentProps<any>>;

  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthed() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
