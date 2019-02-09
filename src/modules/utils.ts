import { isString } from 'lodash';

export const mapActions = (actions, actionPrefix) => {
  let actionMapping = {};

  for (let action of actions) {
    actionMapping[action] = `${actionPrefix}/${action}`;
  }

  return actionMapping;
};

export const getErrorMessage = (err) => {
  const errorMsg = isString(err) ? err.toLocaleUpperCase() :
    Boolean(err.status) ?
      err.status :
      'An error occurred.';

  return errorMsg;
};

export const generateTract = (property) => ({
  description: property.legal_description,
  total_acres: property.total_acres,
  location: property.address,
});