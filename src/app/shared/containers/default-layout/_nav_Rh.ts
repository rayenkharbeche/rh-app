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
export const navItemsRh: INavData[] = [
  
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
      name: 'Request administrative',
      url: '/home/requestadministrative',
      iconComponent: { name: 'cil-speedometer' },
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
      name: 'Request Authorization',
      url: '/home/requestAuthorization',
      iconComponent: { name: 'cil-speedometer' },
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
        name: 'Request equipment',
        url: '/home/requestequipment',
        iconComponent: { name: 'cil-speedometer' },
        children: [
          {
            name: 'Create',
            url: 'requestequipment/addrequestEquipment'
          },
          {
            name: 'List',
            url: 'requestequipment/requestEquipmentlist'
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
          {
            name: 'Request Administrative Validation',
            url: 'requestvalidations/requestadministrativevalidation'
          },
          {
            name: 'Request Equipment Validation',
            url: 'requestvalidations/requestequipmentvalidation'
          },
         
          
          
        ]
      },  
  
 
];

