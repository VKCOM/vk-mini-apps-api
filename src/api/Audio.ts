import { VKConnectProvider } from '../VKConnectProvider';
import { ReceiveData } from '@vkontakte/vk-connect';

/**
 * Audio methods
 */
export class Audio extends VKConnectProvider {
  /**
   * Subscribes a function for listening the `VKWebAppAudioPaused` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onAudioPaused = (callback: (data: ReceiveData<'VKWebAppAudioPaused'>) => void) =>
    this.subscribeEvent('VKWebAppAudioPaused', callback);

  /**
   * Subscribes a function for listening the `VKWebAppAudioStopped` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onAudioStopped = (callback: (data: ReceiveData<'VKWebAppAudioStopped'>) => void) =>
    this.subscribeEvent('VKWebAppAudioStopped', callback);

  /**
   * Subscribes a function for listening the `VKWebAppAudioTrackChanged` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onAudioTrackChanged = (callback: (data: ReceiveData<'VKWebAppAudioTrackChanged'>) => void) =>
    this.subscribeEvent('VKWebAppAudioTrackChanged', callback);

  /**
   * Subscribes a function for listening the `VKWebAppAudioUnpaused` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onAudioUnpaused = (callback: (data: ReceiveData<'VKWebAppAudioUnpaused'>) => void) =>
    this.subscribeEvent('VKWebAppAudioUnpaused', callback);
}
