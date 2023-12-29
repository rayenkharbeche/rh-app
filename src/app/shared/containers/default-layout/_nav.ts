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
    name: 'Request Leave',
    url: '/home/requestleave',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Create',
        url: 'requestleave/addrequestleave'
      },
      {
        name: 'List',
        url: 'requestleave/requestleavelist'
      },
      {
        name: 'Update',
        url: 'requestleave/requestleaveupdate'
      }
      
    ]
    },
  
 
];

