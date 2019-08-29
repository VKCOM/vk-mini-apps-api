import { VKConnectProvider } from '../VKConnectProvider';

/**
 * Device's flashlight API
 */
export class Flashlight extends VKConnectProvider {
  /**
   * Requests device's flashlight information
   *
   * @event VKWebAppFlashGetInfo
   * @platform iOS, Android
   *
   * @returns Availability and level of the flashlight
   */
  public flashGetInfo = async (): Promise<{ isAvailable: boolean; level: number }> => {
    const data = await this.connect.sendPromise('VKWebAppFlashGetInfo', {});

    return {
      isAvailable: data.is_available,
      level: data.level
    };
  };

  /**
   * Sets device's flashlight level
   *
   * @event VKWebAppFlashSetLevel
   * @platform iOS, Android
   *
   * @param level The flashlight level from 0 to 1
   */
  public flashSetLevel = async (level: number): Promise<void> => {
    await this.connect.sendPromise('VKWebAppFlashSetLevel', { level });
  };
}
