import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Input } from '../../../shared/components/Input';
import { Labor as ILabor } from '../../../types';
import LaborService from '../../../services/labor';
import { Button } from '../../../shared/components/Button';

export interface LaborFormProps {
  jobId: number;
  serviceId: number;
  labor?: ILabor;
  updateLabor: Function;
  deleteLabor: Function;
  updateTotal: Function;
}

export interface LaborFormState {
  labor: ILabor;
}

export class LaborForm extends React.Component<LaborFormProps, LaborFormState> {
  blankLabor = {
    id: -1,
    description: '',
    hours: 0,
    cost_per_hour: 0
  };

  constructor(props: LaborFormProps) {
    super(props);

    this.state = {
      labor: this.props.labor || this.blankLabor
    };
  }

  updateLabor(key: keyof ILabor, value) {
    let { labor } = this.state;
    labor[key] = value;
    this.props.updateLabor(labor);
    this.setState({ labor });
  }

  async saveLabor() {
    let { labor } = this.state;
    let { jobId, serviceId } = this.props;
    let newLabor;
    if (labor.id != -1) {
      newLabor = await LaborService.updateLabor(jobId, labor);
      this.props.updateLabor(newLabor);
    } else {
      newLabor = await LaborService.createLabor(jobId, serviceId, labor);
      this.props.deleteLabor(-1);
      this.props.updateLabor(newLabor);
    }

    this.setState({ labor: newLabor });
    this.props.updateTotal();
  }

  async deleteLabor() {
    let { labor } = this.state;
    let { jobId } = this.props;

    await LaborService.deleteLabor(jobId, labor.id);

    this.props.deleteLabor(labor.id);
    this.props.updateTotal();
  }

  render() {
    let { labor } = this.state;

    return (
      <div className={styles.LaborFormContainer}>
        <div className={styles.LaborColumn}>
          <Input
            fluid
            placeholder="Description"
            id="description"
            name="description"
            onChange={e => this.updateLabor('description', e.target.value)}
            value={labor.description}
          />
        </div>
        <div className={styles.HoursColumn}>
          <Input
            fluid
            placeholder="Hours"
            id="hours"
            name="hours"
            onChange={e => this.updateLabor('hours', e.target.value)}
            value={labor.hours || ''}
          />
        </div>
        <div className={styles.CostColumn}>
          <Input
            fluid
            id="cost_per_hour"
            name="cost_per_hour"
            onChange={e => this.updateLabor('cost_per_hour', e.target.value)}
            value={labor.cost_per_hour || ''}
          />
        </div>
        <div className={styles.TotalColumn}> ${labor.cost_per_hour * labor.hours}</div>
        <div className={styles.ButtonColumn}>
          <button onClick={this.saveLabor.bind(this)}>Save</button>
          <br />
          {labor.id != -1 && <button onClick={this.deleteLabor.bind(this)}>Delete</button>}
        </div>
      </div>
    );
  }
}
