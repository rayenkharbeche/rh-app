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
export const navItemsInfra: INavData[] = [
  
      {
        name: 'dashboard',
        url: '/dashboard/dashboard',
        iconComponent: { name: 'cil-speedometer' }

      },
      {
        name: 'Request Validations',
        url: '/requestvalidations',
        iconComponent: { name: 'cil-speedometer' },
        children: [
          {
            name: 'Request Leave Validation',
            url: 'requestvalidations/requestadministrativevalidation'
          },
         
          
          
        ]
      },  
  
 
];

