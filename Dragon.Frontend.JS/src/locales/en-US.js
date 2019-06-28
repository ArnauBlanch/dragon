import component from './en-US/component';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
export default {
  'app.name': 'Dragon',
  'app.description': 'Book sales management platform',
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
