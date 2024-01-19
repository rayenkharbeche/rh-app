/*import { INavData } from '@coreui/angular';*/
export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  iconComponent?: any;
  title?: boolean;
  children?: INavData[];
  variant?: string;

}
export const navItems: INavData[] = [
  
  {
    name: 'Request leave',
    url: '/home/requestleave',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'create request leave',
        url: 'requestleave/addrequestleave'
      },
      {
        name: 'request leave List',
        url: 'requestleave/requestleavelist'
      },
      {
        name: 'Sick Leave List',
        url: 'requestleave/validatedSickLeave'
      }
    
      
      
      
    ]
    },
  
 
];

