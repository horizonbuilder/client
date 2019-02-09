import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Input } from '../../../shared/components/Input';
import { Material as IMaterial } from '../../../types';
import MaterialsService from '../../../services/materials';
import { Button } from '../../../shared/components/Button';

export interface MaterialFormProps {
  jobId: number;
  serviceId: number;
  material?: IMaterial;
  updateMaterial: Function;
  deleteMaterial: Function;
}

export interface MaterialFormState {
  material: IMaterial;
}

export class MaterialForm extends React.Component<MaterialFormProps, MaterialFormState> {
  blankMaterial = {
    id: -1,
    name: '',
    quantity: 0,
    unit: '',
    cost_per_unit: 0,
    supplier_cost: 0,
    profit: 0
  };

  constructor(props: MaterialFormProps) {
    super(props);

    this.state = {
      material: this.props.material || this.blankMaterial
    };
  }

  updateMaterial(key: keyof IMaterial, value) {
    let { material } = this.state;
    material[key] = value;
    this.props.updateMaterial(material);
    this.setState({ material });
  }

  async saveMaterial() {
    let { material } = this.state;
    let { jobId, serviceId } = this.props;
    let newMaterial;
    if (material.id != -1) {
      newMaterial = await MaterialsService.updateMaterial(jobId, material);
      this.props.updateMaterial(newMaterial);
    } else {
      newMaterial = await MaterialsService.createMaterial(jobId, serviceId, material);
      this.props.deleteMaterial(-1);
      this.props.updateMaterial(newMaterial);
    }

    this.setState({ material: newMaterial });
  }

  async deleteMaterial() {
    let { material } = this.state;
    let { jobId } = this.props;

    await MaterialsService.deleteMaterial(jobId, material.id);

    this.props.deleteMaterial(material.id);
  }

  render() {
    let { material } = this.state;

    return (
      <div className={styles.MaterialFormContainer}>
        <div className={styles.MaterialColumn}>
          <Input
            fluid
            placeholder="Name"
            id="name"
            name="name"
            onChange={e => this.updateMaterial('name', e.target.value)}
            value={material.name}
          />
        </div>
        <div className={styles.QtyColumn}>
          <Input
            fluid
            placeholder="Qty"
            id="qty"
            name="qty"
            onChange={e => this.updateMaterial('quantity', e.target.value)}
            value={material.quantity || ''}
          />
        </div>
        <div className={styles.UnitsColumn}>
          <select onChange={() => {}}>
            <option>pieces</option>
          </select>
        </div>
        <div className={styles.SupplierColumn}>
          <Input
            fluid
            id="supplier_cost"
            name="supplier_cost"
            onChange={e => this.updateMaterial('supplier_cost', e.target.value)}
            value={material.supplier_cost || ''}
          />
        </div>
        <div className={styles.ProfitColumn}>
          <Input
            fluid
            id="profit"
            name="profit"
            onChange={e => this.updateMaterial('profit', e.target.value)}
            value={material.profit || ''}
          />
        </div>
        <div className={styles.CostColumn}>
          <Input
            fluid
            id="cost_per_unit"
            name="cost_per_unit"
            onChange={e => this.updateMaterial('cost_per_unit', e.target.value)}
            value={material.cost_per_unit || ''}
          />
        </div>
        <div className={styles.TotalColumn}>{material.cost_per_unit * material.quantity}</div>
        <div className={styles.ButtonColumn}>
          <button onClick={this.saveMaterial.bind(this)}>Save</button>
          <br />
          {material.id != -1 && <button onClick={this.deleteMaterial.bind(this)}>Delete</button>}
        </div>
      </div>
    );
  }
}
