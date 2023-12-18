import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    name: 'setup',
    url: '/setup',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Entity Managment',
        url: '/setup/entitymanagment'
      }
      
    ]
  },
 
];
