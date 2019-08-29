import { VKConnectProvider } from '../VKConnectProvider';

/**
 * Storage API
 */
export class AppStorage extends VKConnectProvider {
  /**
   * Requests a value from the storage
   *
   * @event VKWebAppStorageGet
   * @platform iOS, Android, Web
   *
   * @param key Keys for getting ([a-zA-Z_\-0-9])
   * @param [isGlobal] Is global value. Default: false
   *
   * @return The stored value or `null` if the value is not found
   */
  public get = async (key: string, isGlobal: boolean = false): Promise<string | null> => {
    const data = await this.connect.sendPromise('VKWebAppStorageGet', {
      keys: [key],
      global: isGlobal
    });

    if (!data || !Array.isArray(data.keys) || data.keys.length === 0) {
      return null;
    }

    return data.keys[0].value;
  };

  /**
   * Requests multiple values from the storage
   *
   * @event VKWebAppStorageGet
   * @platform iOS, Android, Web
   *
   * @param keys List of keys for getting ([a-zA-Z_\-0-9])
   * @param [isGlobal] Is global value. Default: false
   *
   * @returns Map of key-value
   */
  public getMultiple = async (keys: string[], isGlobal: boolean = false): Promise<Record<string, string>> => {
    const data = await this.connect.sendPromise('VKWebAppStorageGet', {
      keys,
      global: isGlobal
    });

    return data && Array.isArray(data.keys) && data.keys.length > 0
      ? data.keys.reduce(
          (acc, item) => ({
            ...acc,
            [item.key]: item.value
          }),
          {} as Record<string, string>
        )
      : {};
  };

  /**
   * Request list of keys of some stored values
   *
   * @event VKWebAppStorageGetKeys
   * @platform iOS, Android, Web
   *
   * @param count Count of keys to get. Max value is 1000
   * @param [offset] The offset required to fetch a specific subset of keys.
   * Default: 0
   * @param [isGlobal] Is global value. Default: false
   */
  public getKeys = async (count: number, offset: number = 0, isGlobal: boolean = false): Promise<string[]> => {
    const data = await this.connect.sendPromise('VKWebAppStorageGetKeys', {
      count,
      offset,
      global: isGlobal
    });

    return (data && data.keys) || [];
  };

  /**
   * Stores value in storage
   *
   * @event VKWebAppStorageSet
   * @platform iOS, Android, Web
   *
   * @param key The key of value ([a-zA-Z_\-0-9])
   * @param value Value
   * @param [isGlobal] Is global value. Default: false
   */
  public set = async (key: string, value: string, isGlobal: boolean = false) => {
    await this.connect.sendPromise('VKWebAppStorageSet', {
      key,
      value,
      global: isGlobal
    });
  };
}
