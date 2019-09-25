import { VKConnectProvider } from '../VKConnectProvider';

/**
 * Storage API
 */
export class Storage extends VKConnectProvider {
  /**
   * Requests a value from the storage
   *
   * @category Storage
   * @event VKWebAppStorageGet
   * @platform iOS, Android, Web
   *
   * @param key Keys for getting ([a-zA-Z_\-0-9])

   * @returns The stored value or empty string if the value is not found
   */
  public get = async (key: string): Promise<string> => {
    const data = await this.connect.sendPromise('VKWebAppStorageGet', { keys: [key] });

    if (!data || !Array.isArray(data.keys) || data.keys.length === 0) {
      return '';
    }

    return data.keys[0].value;
  };

  /**
   * Requests multiple values from the storage
   *
   * @category Storage
   * @event VKWebAppStorageGet
   * @platform iOS, Android, Web
   *
   * @param keys List of keys for getting ([a-zA-Z_\-0-9])
   *
   * @returns Map of key-value
   */
  public getMultiple = async (keys: string[]): Promise<Record<string, string>> => {
    const data = await this.connect.sendPromise('VKWebAppStorageGet', { keys });

    return data && Array.isArray(data.keys) && data.keys.length > 0
      ? data.keys.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)
      : {};
  };

  /**
   * Request list of keys of some stored values
   *
   * @category Storage
   * @event VKWebAppStorageGetKeys
   * @platform iOS, Android, Web
   *
   * @param count Count of keys to get. Max value is 1000
   * @param [offset] The offset required to fetch a specific subset of keys.
   * Default: 0
   */
  public getKeys = async (count: number, offset: number = 0): Promise<string[]> => {
    const data = await this.connect.sendPromise('VKWebAppStorageGetKeys', { count, offset });

    return (data && data.keys) || [];
  };

  /**
   * Stores value in storage
   *
   * @category Storage
   * @event VKWebAppStorageSet
   * @platform iOS, Android, Web
   *
   * @param key The key of value ([a-zA-Z_\-0-9])
   * @param value Value
   */
  public set = async (key: string, value: string) => {
    await this.connect.sendPromise('VKWebAppStorageSet', { key, value });
  };
}
