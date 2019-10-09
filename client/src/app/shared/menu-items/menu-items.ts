import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main_state:"admin",
    main: [
      {
        state: 'home',
        short_label: 'D',
        name: 'Home',
        type: 'link',
        icon: 'icon-home',

      },
      {
        state: 'admins',
        short_label: 'A',
        name: 'Admins',
        type: 'sub',
        icon: 'icon-user',
        children: [
          {
            state: 'list',
            name: 'List'
          },
        ]
      },
      {
        state: 'users',
        short_label: 'U',
        name: 'Users',
        type: 'sub',
        icon: 'icon-user',
        children: [
          {
            state: 'list',
            name: 'List'
          },
        ]
      },

      {
        state: 'coupons',
        short_label: 'C',
        name: 'Coupons',
        type: 'sub',
        icon: 'icon-panel',
        children: [
          {
            state: 'list',
            name: 'List'
          },
        ]
      },

      {
        state: 'prizes',
        short_label: 'C',
        name: 'Prizes',
        type: 'sub',
        icon: 'icon-cup',
        children: [
          {
            state: 'list',
            name: 'List'
          },
        ]
      },
    ],
  },

];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
