const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

const services = require('./services.json');

global.SERVICES = Object.keys(services).reduce(
  (testServices, service) =>
    Object.assign({}, testServices, {
      [service]: service
    }),
  {}
);

process.env.BASE_SERVICE_URL = 'BASE_SERVICE_URL';

class URLSearchParams {
  append() {}
}

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
  removeItem: () => {}
};

global.URLSearchParams = URLSearchParams;
