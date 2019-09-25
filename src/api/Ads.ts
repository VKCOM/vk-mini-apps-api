import { VKConnectProvider } from '../VKConnectProvider';
import { ReceiveData } from '@vkontakte/vk-connect';

export class Ads extends VKConnectProvider {
  /**
   * Subscribes a function for listening the `VKWebAppInitAds` event.
   *
   * @platform iOS, Android, Web
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onInitAds = (callback: (data: ReceiveData<'VKWebAppInitAds'>) => void) =>
    this.subscribeEvent('VKWebAppInitAds', callback);

  /**
   * Subscribes a function for listening the `VKWebAppLoadAds` event.
   *
   * @platform iOS, Android, Web
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onLoadAds = (callback: (data: ReceiveData<'VKWebAppLoadAds'>) => void) =>
    this.subscribeEvent('VKWebAppLoadAds', callback);
}
