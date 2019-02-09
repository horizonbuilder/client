import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Service as IService, Material as IMaterial } from '../../../types';
import MaterialsService from '../../../services/materials';
import { MaterialForm } from '../MaterialForm';
import { Button } from '../../../shared/components/Button';

export interface ServiceProps {
  jobId: number;
  service: IService;
}

export interface ServiceState {
  isLoading: boolean;
  materials: IMaterial[];
}

export class Service extends React.Component<ServiceProps, ServiceState> {
  constructor(props: ServiceProps) {
    super(props);

    this.state = {
      isLoading: false,
      materials: []
    };
  }

  componentDidMount() {
    const { jobId, service } = this.props;

    this.loadMaterials(jobId, service.id);
  }

  async loadMaterials(jobId: number, serviceId: number): Promise<void> {
    this.setState({
      isLoading: true
    });

    let materials = await MaterialsService.getMaterials(jobId, serviceId);
    if (!materials.length)
      materials = [
        {
          id: -1,
          name: '',
          quantity: 0,
          unit: '',
          cost_per_unit: 0,
          supplier_cost: 0,
          profit: 0
        }
      ];

    this.setState({
      materials,
      isLoading: false
    });
  }

  updateMaterial(material: IMaterial) {
    let { materials } = this.state;
    let index = materials.findIndex(m => m.id == material.id);
    if (index != -1) materials.splice(index, 1, material);
    else materials.push(material);

    this.setState({ materials });
  }

  deleteMaterial(material_id: number) {
    let { materials } = this.state;
    materials = materials.filter(m => m.id != material_id);
    this.setState({ materials });
  }

  addNewMaterial() {
    let { materials } = this.state;
    materials.push({
      id: -1,
      name: '',
      quantity: 0,
      unit: '',
      cost_per_unit: 0,
      supplier_cost: 0,
      profit: 0
    });
    this.setState({ materials });
  }

  render() {
    let { service, jobId } = this.props;
    let { materials } = this.state;
    return (
      <div className={styles.ServiceContainer}>
        <div className={styles.ServiceName}>{service.name}</div>
        <div className={styles.MaterialsContainer}>
          <div className={styles.MaterialsHeader}>
            <div className={styles.MaterialColumn}>Material</div>
            <div className={styles.QtyColumn}>Qty</div>
            <div className={styles.UnitColumn}>Unit</div>
            <div className={styles.SupplierColumn}>Supplier $</div>
            <div className={styles.ProfitColumn}>Profit $/%</div>
            <div className={styles.CostColumn}>$/Unit</div>
            <div className={styles.TotalColumn}>$</div>
          </div>
          {materials.map(m => (
            <MaterialForm
              jobId={jobId}
              serviceId={service.id}
              material={m}
              updateMaterial={this.updateMaterial.bind(this)}
              deleteMaterial={this.deleteMaterial.bind(this)}
            />
          ))}
          <Button
            disabled={materials.findIndex(m => m.id == -1) != -1}
            onClick={this.addNewMaterial.bind(this)}
          >
            + Material
          </Button>
        </div>
        <div className={styles.TotalCostRow}>
          {materials.reduce((a, m) => a + m.quantity * m.cost_per_unit, 0)}
        </div>
      </div>
    );
  }
}
