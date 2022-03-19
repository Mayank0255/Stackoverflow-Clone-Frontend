import { ReactComponent as GlobalIcon } from '../../../assets/Globe.svg';

export const SideBarData = [
  {
    link: '/questions',
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <GlobalIcon className='icon' />,
    text: 'Stack Overflow',
  },
  {
    link: '/tags',
    text: 'Tags',
  },
  {
    link: '/users',
    text: 'Users',
  },
  {
    link: '/jobs',
    text: 'Jobs',
  }
]