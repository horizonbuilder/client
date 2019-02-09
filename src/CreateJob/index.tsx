import * as React from 'react';
import * as styles from './styles.css';
import { Input } from '../shared/components/Input';
import { Label } from '../shared/components/Label';
import { LoadingIndicator } from '../shared/components/LoadingIndicator';
import { Button } from '../shared/components/Button';
import JobService from '../services/jobs';
import ClientService from '../services/clients';
import { Redirect } from 'react-router-dom';

interface CreateJobState {
  name: string;
  client_name: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error?: string;
}

export class CreateJob extends React.Component<undefined, CreateJobState> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: '',
      client_name: '',
      isSubmitting: false,
      isSubmitted: false,
      error: null
    };
  }

  async submitJob(): Promise<void> {
    this.setState({ isSubmitting: true });

    const job = await JobService.createJob({
      name: this.state.name,
      client_name: this.state.client_name
    });

    this.setState({ isSubmitted: true });

    return;
  }

  isButtonActive(): boolean {
    const { isSubmitting, name, client_name } = this.state;

    return Boolean(name) && Boolean(client_name) && !isSubmitting;
  }

  render() {
    if (this.state.isSubmitted) {
      return <Redirect to="/jobs" />;
    }

    return (
      <div className={styles.CreateJob}>
        <form
          className={styles.CreateJobForm}
          onSubmit={e => {
            e.preventDefault();
            this.submitJob();
          }}
        >
          <h1 className={styles.CreateJobTitle}>Create a job</h1>
          <div className={styles.FormSection}>
            <Label htmlFor="name">Name</Label>
            <Input
              fluid
              placeholder="Job name"
              id="name"
              name="name"
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>

          <div className={styles.FormSection}>
            <Label htmlFor="client_name">Client name</Label>
            <Input
              fluid
              placeholder="Client name"
              id="client_name"
              name="client_name"
              onChange={e => this.setState({ client_name: e.target.value })}
              value={this.state.client_name}
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
