import { VKConnectProvider } from '../VKConnectProvider';

export class Ads extends VKConnectProvider {
  /**
   * Subscribes a function for listening the `VKWebAppInitAds` event.
   *
   * @platform iOS, Android, Web
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onInitAds = this.createEventListener('VKWebAppInitAds');

  /**
   * Subscribes a function for listening the `VKWebAppInitAds` event.
   *
   * @platform iOS, Android, Web
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onLoadAds = this.createEventListener('VKWebAppLoadAds');
}
