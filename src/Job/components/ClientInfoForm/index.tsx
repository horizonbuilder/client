import * as React from 'react';
import * as styles from './styles.css';
import { Input } from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Button } from '../../../shared/components/Button';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import ClientService from '../../../services/clients';
import { Client as IClient } from '../../../types';

export interface ClientInfoProps {
  client: IClient;
  onUpdate: (key: keyof IClient, value: string) => void;
  isSaving: boolean;
  onSave: () => Promise<void>;
  buttonText: string;
  onDelete?: () => void;
  mode?: string;
}

export class ClientInfoForm extends React.Component<ClientInfoProps> {
  updateClient(key: keyof IClient, value: string): void {
    this.props.onUpdate(key, value);
  }

  async handleSubmit(): Promise<void> {
    await this.props.onSave();
  }

  isButtonActive() {
    const { client, isSaving } = this.props;

    return Boolean(client.name) && Boolean(client.id) && !isSaving;
  }

  render() {
    const { client, isSaving, buttonText } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit();
        }}
      >
        <div className={styles.ClientInfoForm}>
          <div className={styles.ClientInfoFormSection}>
            {[
              { id: 'name', name: 'Client Name' },
              { id: 'address', name: 'Mailing Address' },
              { id: 'email', name: 'Email Address' },
              { id: 'phone', name: 'Phone Number' }
            ].map((attr: any) => {
              let clientobj: any = client;
              return (
                <div className={styles.ClientInfoFormInputContainer} key={attr.id}>
                  <Input
                    fluid
                    placeholder={attr.name}
                    id={attr.id}
                    name={attr.id}
                    label={attr.name}
                    value={clientobj[attr.id] || ''}
                    onChange={e => this.updateClient(attr.id, e.target.value)}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.ClientInfoFormSubmitSection}>
            <div>
              {isSaving && <span className={styles.ClientInfoFormSubmitStatus}>Saving ...</span>}
            </div>

            <div>
              {this.props.onDelete && (
                <Button type="secondary" onClick={this.props.onDelete}>
                  Save
                </Button>
              )}
              <Button buttonType="submit" disabled={!this.isButtonActive()}>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
