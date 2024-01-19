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
export const navItemsManager: INavData[] = [
  
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
        name: 'Sick Leave List',
        url: 'requestleave/validatedSickLeave'
      }
      
    ]
    },
    {
      name: 'Request Authorization',
      url: '/home/requestAuthorization',
      iconComponent: { name: 'cil-speedometer' },
      children: [
        {
          name: 'Create',
          url: 'requestAuthorization/addAuthorizationleave'
        },
        
        
      ]
      },
      {
        name: 'Request Validations',
        url: '/home/requestvalidations',
        iconComponent: { name: 'cil-speedometer' },
        children: [
          {
            name: 'Request Leave Validation',
            url: 'requestvalidations/requestLeavevalidations'
          },
          
          
        ]
      },  
  
 
];

