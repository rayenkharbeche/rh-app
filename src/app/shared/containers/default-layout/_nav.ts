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
  
  /*{
    name: 'setup',
    url: '/setup',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Entity Managment',
        url: '/setup/entitymanagment'
      }
    
      
    ]
    },*/
  
 
];

