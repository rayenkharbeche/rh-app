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
export const navItemsTeamLead: INavData[] = [
  {
    name: 'dashboard',
    url: '/dashboard/dashboard',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'Request Leave',
    url: '/requestleave',
    iconComponent: { name: 'cil-star' },
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
      url: '/requestAuthorization',
      iconComponent: { name: 'cil-running' },
      children: [
        {
          name: 'Create',
          url: 'requestAuthorization/addAuthorizationleave'
        },
        {
          name: 'List',
          url: 'requestAuthorization/requestAuthorizationlist'
        }
        
        
      ]
      },
      {
        name: 'Request administrative',
        url: '/requestadministrative',
        iconComponent: { name: 'cil-description' },
        children: [
          {
            name: 'Create',
            url: 'requestadministrative/addrequestadministrative'
          },
          {
            name: 'List',
            url: 'requestadministrative/requestadministrativelist'
          },
          
          
          
        ]
        },
        {
          name: 'Request equipment',
          url: '/requestequipment',
          iconComponent: { name: 'cil-devices' },
          children: [
            {
              name: 'Create',
              url: 'requestequipment/addrequestEquipment',
            },
            {
              name: 'List',
              url: 'requestequipment/requestEquipmentlist'
            },
           
            
            
            
          ]
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
          
          
        ]
      },  
  
 
];

