import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Service as IService, Material as IMaterial, Labor as ILabor } from '../../../types';
import MaterialsService from '../../../services/materials';
import LaborService from '../../../services/labor';
import { MaterialForm } from '../MaterialForm';
import { LaborForm } from '../LaborForm';
import { Button } from '../../../shared/components/Button';

export interface ServiceProps {
  jobId: number;
  service: IService;
  updateTotal: Function;
}

export interface ServiceState {
  isLoading: boolean;
  materials: IMaterial[];
  labor: ILabor[];
}

export class Service extends React.Component<ServiceProps, ServiceState> {
  constructor(props: ServiceProps) {
    super(props);

    this.state = {
      isLoading: false,
      materials: [],
      labor: []
    };
  }

  componentDidMount() {
    const { jobId, service } = this.props;

    this.loadMaterials(jobId, service.id);
    this.loadLabor(jobId, service.id);
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

  async loadLabor(jobId: number, serviceId: number): Promise<void> {
    this.setState({
      isLoading: true
    });

    let labor = await LaborService.getLabor(jobId, serviceId);
    if (!labor.length)
      labor = [
        {
          id: -1,
          description: '',
          hours: 0,
          cost_per_hour: 0
        }
      ];

    this.setState({
      labor,
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

  updateLabor(updatedLabor: ILabor) {
    let { labor } = this.state;
    let index = labor.findIndex(m => m.id == updatedLabor.id);
    if (index != -1) labor.splice(index, 1, updatedLabor);
    else labor.push(updatedLabor);

    this.setState({ labor });
  }

  deleteLabor(labor_id: number) {
    let { labor } = this.state;
    labor = labor.filter(m => m.id != labor_id);
    this.setState({ labor });
  }

  addNewLabor() {
    let { labor } = this.state;
    labor.push({
      id: -1,
      description: '',
      hours: 0,
      cost_per_hour: 0
    });
    this.setState({ labor });
  }

  getTotalCost() {
    let { materials, labor } = this.state;
    let materialTotal = materials.reduce((a, m) => a + m.quantity * m.cost_per_unit, 0);
    let laborTotal = labor.reduce((a, l) => a + l.hours * l.cost_per_hour, 0);
    return materialTotal + laborTotal;
  }

  render() {
    let { service, jobId } = this.props;
    let { materials, labor } = this.state;
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
            <div className={styles.TotalColumn}>Total $</div>
          </div>
          {materials.map(m => (
            <MaterialForm
              jobId={jobId}
              serviceId={service.id}
              material={m}
              updateMaterial={this.updateMaterial.bind(this)}
              deleteMaterial={this.deleteMaterial.bind(this)}
              updateTotal={this.props.updateTotal}
            />
          ))}
          <div className={styles.LaborHeader}>
            <div className={styles.LaborColumn}>Labor</div>
            <div className={styles.HoursColumn}>Hours</div>
            <div className={styles.CostPerHourColumn}>$/Hour</div>
            <div className={styles.LaborTotalColumn}>Total $</div>
          </div>
          {labor.map(l => (
            <LaborForm
              jobId={jobId}
              serviceId={service.id}
              labor={l}
              updateLabor={this.updateLabor.bind(this)}
              deleteLabor={this.deleteLabor.bind(this)}
              updateTotal={this.props.updateTotal}
            />
          ))}
          <Button
            disabled={materials.findIndex(m => m.id == -1) != -1}
            onClick={this.addNewMaterial.bind(this)}
          >
            + Material
          </Button>
          <Button
            disabled={labor.findIndex(l => l.id == -1) != -1}
            onClick={this.addNewLabor.bind(this)}
          >
            + Labor
          </Button>
        </div>
        <div className={styles.TotalCostRow}> ${this.getTotalCost()}</div>
      </div>
    );
  }
}
