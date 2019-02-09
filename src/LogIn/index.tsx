import * as React from 'react';
import AuthForm from '../shared/components/AuthForm';
import * as styles from './styles.css';
import AuthService, { AuthResponse } from '../services/auth';
import { Link } from 'react-router-dom';

export class LogIn extends React.Component {
  async handleSubmit(username: string, password: string): Promise<AuthResponse> {
    return await AuthService.login(username, password);
  }

  render() {
    return (
      <div className={styles.LogIn}>
        <AuthForm title="Log In" onSubmit={this.handleSubmit} />

        <div className={styles.SignUpCTA}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}
