import vkConnect, { VKConnect } from '@vkontakte/vk-connect';
import { VKMiniAppAPI } from './VKMiniAppAPI';

/**
 * VK Mini Apps API options
 */
type VKMiniAppAPIOptions = {
  /**
   * Custom VK Connect instance. Can be used for debugging
   */
  customConnect?: VKConnect;
};

/**
 * Creates instance of VK Mini App API
 * @param options Options of the instance
 */
export const createVKMiniAppAPI = (options: VKMiniAppAPIOptions) => {
  const connect = options.customConnect == null ? vkConnect : options.customConnect;

  return new VKMiniAppAPI(connect);
};
