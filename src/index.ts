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

export const createVKMiniAppAPI = (options: VKMiniAppAPIOptions) => {
  const connect = options.customConnect == null ? vkConnect : options.customConnect;

  return new VKMiniAppAPI(connect);
};

const output = document.getElementById('output')!;

const log = (...data: any[]) => {
  console.log(...data);
  output.innerText += JSON.stringify(data, null, 2) + '\n\n';
};

const vkConnectDebug: VKConnect = {
  ...vkConnect,
  send(messageType: any, data: any) {
    vkConnect.send(messageType, data);
    log('Sended:', messageType, data);
  }
};

const actionButton = document.getElementById('action')!;
const q = createVKMiniAppAPI({ customConnect: vkConnectDebug });

q.common.initApp();

(window as any).connect = vkConnect;

actionButton.addEventListener('click', async () => {
  q.common.openCodeReader().then(data => {
    log(data);
  });
});
