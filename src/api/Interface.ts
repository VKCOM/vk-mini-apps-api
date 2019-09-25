import { AppearanceType } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';

export class Interface extends VKConnectProvider {
  /**
   * Resizes iframe size in web
   *
   * @category Interface
   * @event VKWebAppResizeWindow
   * @platform Web
   *
   * @param width Width of iframe
   * @param [height] Height of iframe
   *
   * @returns Result size of the iframe
   */
  public resizeWindow = async (width: number, height: number): Promise<{ width: number; height: number }> => {
    return this.connect.sendPromise('VKWebAppResizeWindow', { width, height });
  };

  /**
   * Scrolls window to specified point
   *
   * @category Interface
   * @event VKWebAppScroll
   * @platform Web
   *
   * @param offsetTop Offset top
   * @param [speed] Speed of scrolling if need smooth scroll. Default: 0
   *
   * @returns Offset top and height of window after scroll
   */
  public scrollTo = async (offsetTop: number, speed = 0): Promise<{ top: number; height: number }> => {
    return this.connect.sendPromise('VKWebAppScroll', { top: offsetTop, speed });
  };

  /**
   * Sets location hash to the app (vk.com/app123#hash)
   *
   * @category Interface
   * @event VKWebAppSetLocation
   */
  public setLocationHash = async (hash: string): Promise<void> => {
    await this.connect.sendPromise('VKWebAppSetLocation', { location: hash });
  };

  /**
   * Changes the appearance of the mini app interface in mobile clients
   *
   * @category Interface
   * @event VKWebAppSetViewSettings
   * @platform iOS, Android
   *
   * @param statusBarStyle Status bar style type: `light` or `dark`
   * @param [actionBarColor] HEX Color of action bar
   */
  public setViewSettings = async (statusBarStyle: AppearanceType, actionBarColor?: string) => {
    await this.connect.sendPromise('VKWebAppSetViewSettings', {
      status_bar_style: statusBarStyle,
      action_bar_color: actionBarColor
    });
  };
}
