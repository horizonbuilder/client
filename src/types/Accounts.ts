type RoleType = 'appraisal' | 'trainee' | 'staff' | 'appraisal_workfile_manager'; 

export interface AccountsUser  {
  username: string;
  password?: string;
  email: string;
  role: RoleType;
  is_admin: boolean;
}