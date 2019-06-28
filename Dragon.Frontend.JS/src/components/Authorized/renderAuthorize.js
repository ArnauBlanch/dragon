/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';

const renderAuthorize = Authorized => currentAuthority => {
  if (currentAuthority) {
    CURRENT = currentAuthority.type;
  } else {
    CURRENT = 'NULL';
  }

  return Authorized;
};

export { CURRENT };
export default Authorized => renderAuthorize(Authorized);
