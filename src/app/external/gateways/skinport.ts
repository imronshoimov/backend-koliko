import * as https from 'https';
import axios, { AxiosRequestConfig } from 'axios';
import * as Config from '../../../config';
import * as qs from 'querystring';

async function getItems() {
  try {
    const queryParams = {
      app_id: Config.SkinPortConfig.AppId,
      currency: Config.SkinPortConfig.Currency,
      tradable: Config.SkinPortConfig.Tradable,
    };

    const axiosConfig = await prepareAxiosConfig(
      Config.SkinPortConfig.Endpoint,
      queryParams
    );
    const response = await axios(axiosConfig);

    return response.data;
  } catch (error) {
    console.log('Error in skinport');
    throw error;
  }
}

async function prepareAxiosConfig(
  endpoint: string,
  queryParams: Record<string, string | number>
): Promise<AxiosRequestConfig> {
  const data = qs.stringify(queryParams);
  return <AxiosRequestConfig>{
    method: 'get',
    url: endpoint,
    timeout: 2 * 60 * 1000, // wait for 2 min than throw error
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    data,
  };
}

export default { getItems };
