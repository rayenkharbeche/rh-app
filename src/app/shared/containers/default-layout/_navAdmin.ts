import { INavBadge } from "@coreui/angular/lib/sidebar/sidebar-nav/sidebar-nav";

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
  badge?: INavBadge;


}
export const navAdminItems: INavAdminData[] = [
  {
    name: 'dashboard',
    url: '/dashboard/dashboard',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'setup',
    url: '/setup',
    iconComponent: { name: 'cil-cog' },
    children: [
     
      {
        name: 'Entity Managment',
        url: '/setup/entitymanagment'
      },
      {
        name: 'Profile Managment',
        url: '/setup/profileList'
      },
      {
        name: 'Poste Managment',
        url: '/setup/postemanagment'
      }
      ,
      {
        name: 'Department Managment',
        url: '/setup/departmentmanagment'
      },
      {
        name: 'Team Managment',
        url: '/setup/teamManagment'
      }, 
       {
        name: 'Role Managment',
        url: '/setup/roleManagment'
      },
      {
        name: 'General Control',
        url: '/setup/generalcontrol'
      },
      {
        name: 'Employees Import',
        url: '/setup/usersImport'
      },
      {
        name: 'Mail Template',
        url: '/setup/mailTemplateList'
      },
      {
        name: 'holiday managment',
        url: '/setup/holidaymanagment'
      },
   
      
    ]
  }
  
 
];

