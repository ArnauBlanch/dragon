import component from './ca-ES/component';
import globalHeader from './ca-ES/globalHeader';
import menu from './ca-ES/menu';
import pwa from './ca-ES/pwa';
import settingDrawer from './ca-ES/settingDrawer';
import settings from './ca-ES/settings';
export default {
  'app.name': 'Dragon',
  'app.description': 'Plataforma de gestió de vendes de llibres',
  'navBar.lang': 'Idiomes',
  'layout.user.link.help': 'Ajuda',
  'layout.user.link.privacy': 'Privacitat',
  'layout.user.link.terms': 'Termes d\'ús',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
