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
export const navItemsDG: INavData[] = [
  {
    name: 'dashboard',
    url: '/dashboard/dashboard',
    iconComponent: { name: 'cil-speedometer' }

  },
      {
        name: 'Request Validations',
        url: '/requestvalidations',
        iconComponent: { name: 'cil-task' },
        children: [
          {
            name: 'Request Leave Validation',
            url: 'requestvalidations/requestLeavevalidations'
          },
          {
            name: 'Request Leave Cancel Validation',
            url: 'requestvalidations/RequestCancelvalidation'
          },
          {
            name: 'Request Authorization Validation',
            url: 'requestvalidations/requestAuthorizationvalidations'
          },
          {
            name: 'Request administrative Validation',
            url: 'requestvalidations/requestadministrativevalidation'
          },
        
          
        ]
      },  
  
 
];

