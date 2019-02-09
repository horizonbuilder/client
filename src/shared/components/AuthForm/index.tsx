import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isString, pick } from 'lodash';

import authActions from '../../../modules/auth/actions';

import { Input } from '../Input';
import { Label } from '../Label';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';

import { AuthResponse } from '../../../services/auth';
import { ActionFunction0 } from '../../../../node_modules/@types/redux-actions';
import { Action } from '../../../../node_modules/redux';

import { ProjectRegion } from '../../../types/Projects';
import { Select } from '../Select';

import * as styles from './styles.css';

interface AuthFormProps {
  title: string;
  onSubmit: (username: string, password: string) => Promise<AuthResponse>;
}

interface AuthFormState {
  username: string;
  password: string;
  isSubmitting: boolean;
  isAuthed: boolean;
  error?: string;
}

interface Dispatch {
  setUserInfo: (user) => void;
}

class AuthForm extends React.Component<AuthFormProps & Dispatch, AuthFormState> {
  state = {
    username: '',
    password: '',
    isSubmitting: false,
    isAuthed: false,
    error: null
  };

  handleSubmit = async (): Promise<void> => {
    this.setState({ isSubmitting: true });

    const auth = await this.props.onSubmit(this.state.username, this.state.password);

    if (auth.status === 'success') {
      // TODO: remove this line in the future
      this.props.setUserInfo(auth.user);

      this.setState({
        isSubmitting: false,
        isAuthed: true
      });

      return;
    }

    if (auth.error) {
      this.setState({
        isSubmitting: false,
        error: auth.error[0].toUpperCase() + auth.error.substr(1)
      });

      return;
    }
  };

  isButtonActive(): boolean {
    const { isSubmitting, username, password } = this.state;
    let requiredFields = [username, password];

    const isActive = requiredFields.every(item => !!item);

    return isActive && !isSubmitting;
  }

  render() {
    if (this.state.isAuthed) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.AuthForm}>
        <div className={styles.AuthFormTitle}>{this.props.title}</div>

        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className={styles.FormSection}>
            <Label htmlFor="username">Username</Label>
            <Input
              fluid
              placeholder="Username"
              id="username"
              name="username"
              onChange={e => this.setState({ username: e.target.value })}
              value={this.state.username}
            />
          </div>

          <div className={styles.FormSection}>
            <Label htmlFor="password">Password</Label>
            <Input
              fluid
              placeholder="Password"
              id="password"
              name="password"
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
              type="password"
            />
          </div>

          <div className={styles.FormSection}>
            <Button disabled={!this.isButtonActive()} buttonType="submit" type="primary">
              {this.state.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>

          {this.state.error && <div className={styles.AuthError}>{this.state.error}</div>}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps: Dispatch = pick(authActions, ['setUserInfo']);

export default connect(null, mapDispatchToProps)(AuthForm);
