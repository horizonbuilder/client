import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { RouteComponentProps } from 'react-router-dom';
import { Job } from '../../../types';
import { TabNavigation } from '../../../shared/components/TabNavigation';
import JobsService from '../../../services/jobs';
import { FieldGroup } from '../../../shared/components/FieldGroup';
import * as _ from 'lodash';
import ClientService from '../../../services/clients';
import { Client as IClient } from '../../../types';
import { ClientInfoForm } from '../ClientInfoForm';

export interface JobInfoProps {
  jobId: string;
  clientId: string;
}

type IEditable<T> = { [P in keyof T]?: T[P] };

export interface JobInfoState {
  block: string;
  client: IClient;
  editableClient?: IEditable<IClient>;
  isLoading: boolean;
  isSaving: boolean;
  mode: string;
}

export class JobInfo extends React.Component<RouteComponentProps<JobInfoProps>, JobInfoState> {
  mounted: boolean;
  clientRef: any;

  constructor(props: RouteComponentProps<JobInfoProps>) {
    super(props);
    this.clientRef = React.createRef();

    this.state = {
      block: 'templates',
      client: null,
      editableClient: null,
      isLoading: true,
      isSaving: false,
      mode: 'view'
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { jobId, clientId } = this.props.match.params;

    this.loadClientInfo(jobId, clientId);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps: RouteComponentProps<JobInfoProps>) {
    const { jobId, clientId } = nextProps.match.params;

    this.loadClientInfo(jobId, clientId);
  }

  async loadClientInfo(jobId: string, clientId: string): Promise<void> {
    this.setState({
      isLoading: true
    });

    const client = await ClientService.getClient(parseInt(jobId));

    this.setState({
      client: client,
      isLoading: false
    });
  }

  handleUpdateClient = (key: keyof IClient, value: string): void => {
    const { editableClient = {} } = this.state;

    this.setState({
      editableClient: {
        ...editableClient,
        [key]: value
      }
    });
  };

  updatedClient(): IClient {
    const { client, editableClient = {} } = this.state;

    return {
      ...client,
      ...editableClient
    };
  }

  handleClientInfoSubmit = async (): Promise<void> => {
    const { jobId, clientId } = this.props.match.params;
    const client = this.updatedClient();

    this.setState({
      isSaving: true
    });

    const updatedClient = await ClientService.updateWorkfileClient(client, jobId, clientId);

    this.setState({
      editableClient: null,
      client: updatedClient,
      isSaving: false
    });
  };

  onOk = async () => {
    if (this.state.mode === 'edit') {
      await this.clientRef.current.handleSubmit();
      return this.setState({ mode: 'view' });
    }

    if (this.state.mode === 'view') {
      return this.setState({ mode: 'edit' });
    }
  };

  onCancel = () => {
    this.setState({ mode: 'view' });
  };

  render() {
    let { isSaving } = this.state;

    return (
      <div>
        {/*<LeadInfoForm />*/}
        <ClientInfoForm
          ref={this.clientRef}
          client={this.updatedClient()}
          onUpdate={this.handleUpdateClient}
          isSaving={isSaving}
          onSave={this.handleClientInfoSubmit}
          buttonText="Update Client"
          mode={this.state.mode}
        />
      </div>
    );
  }
}
