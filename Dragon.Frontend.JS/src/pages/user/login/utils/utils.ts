import { parse } from 'qs';
import { CurrentUser } from '../model';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: CurrentUser) {
  return localStorage.setItem('dragon-authority', JSON.stringify(authority));
}
