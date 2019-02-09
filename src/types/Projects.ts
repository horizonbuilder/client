export type IndicatorStatus = 'in-progress' | 'in-review' | 'completed';
export type IndicatorType = 'default' | 'primary' | 'secondary' | 'important';
export type UserStatus = 'pending' | 'sent-proposal' | 'sent-bid' | 'not-awarded' | 'awarded';
export type UserType = 'in-house' | 'outsource';

export interface DashboardState {
  projects: Array<IProject>;
  isLoading: boolean;
  errorMsg: string;
  filterStatus: IndicatorStatus;
};

export interface DashboardTab {
  status: IndicatorStatus;
  type: IndicatorType;
  title: string;
};

export interface IProject {
  id: number;
  loan_number: string;
  borrower_name: string;
  project_deadline: string;
  status: IndicatorStatus;
}

export interface ProjectRegion {
  id: number;
  region_name: string;
  region_address: string; 
}

export interface BaseProperty {
  id: number;
  legal_description: string;
  address: string;
  total_acres: string;
  number_of_buildings: string;
}

export interface IProperty extends BaseProperty {
  appraisal_project_id: string;
  job_id: number | null;
}

export interface IJob {
  id?: number | string;
  name: string;
  property_ids: Array<number>;
  appraisal_project_id: number;
  workfile_id: number;

  reviewers_id: Array<number>;

  users_id: Array<number>;
  user_organization_type: UserType;
  user_status: UserStatus;
}

export interface IProjectDetails {
  project: IProject;
  properties: Array<IProperty>
}
