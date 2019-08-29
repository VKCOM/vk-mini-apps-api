import { VKConnectProvider } from '../VKConnectProvider';

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
  public onAudioPaused = this.createEventListener('VKWebAppAudioPaused');

  /**
   * Subscribes a function for listening the `VKWebAppAudioStopped` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onAudioStopped = this.createEventListener('VKWebAppAudioStopped');

  /**
   * Subscribes a function for listening the `VKWebAppAudioTrackChanged` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onAudioTrackChanged = this.createEventListener('VKWebAppAudioTrackChanged');

  /**
   * Subscribes a function for listening the `VKWebAppAudioUnpaused` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onAudioUnpaused = this.createEventListener('VKWebAppAudioUnpaused');
}
