import padrao from './default';
import local from './local';

const env = {
  isLocal : false,
  isDevelopment : false,
  isTest : false,
  isProduction: false
  
};

const ambiente = process.env.REACT_APP_ENV || process.env.NODE_ENV || '';

let retorno = {};


switch (ambiente) {
  
  // case 'production':
  //   env.isProduction = true;
  //   retorno          = production;
  //   break;
  // case 'local':
  default:
    env.isLocal = true;
    retorno     = local;
    break;
}

export default {...padrao, ...retorno };
