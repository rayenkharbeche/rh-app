/*import { INavData } from '@coreui/angular';*/
export interface INavAdminData {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  iconComponent?: any;
  title?: boolean;
  children?: INavAdminData[];
  variant?: string;


}
export const navAdminItems: INavAdminData[] = [
  
  {
    name: 'setup',
    url: '/home/setup',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Entity Managment',
        url: '/home/setup/entitymanagment'
      },
      {
        name: 'Profile Managment',
        url: '/home/setup/profileList'
      },
      {
        name: 'Poste Managment',
        url: '/home/setup/postemanagment'
      }
      ,
      {
        name: 'Department Managment',
        url: '/home/setup/departmentmanagment'
      },
      {
        name: 'Team Managment',
        url: '/home/setup/teamManagment'
      }, 
       {
        name: 'Role Managment',
        url: '/home/setup/roleManagment'
      },
   
      
    ]
  }
  
 
];

