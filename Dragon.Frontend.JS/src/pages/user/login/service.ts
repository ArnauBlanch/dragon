import request from '@/utils/request';
import { FromDataType } from './index';

export async function checkApiKey(params: FromDataType) {
  return request('https://caupinyaderosa.azure-api.net/dragon/checkApiKey', {
    method: 'GET',
    headers: { 'X-Functions-Key': params.password },
  });
}
