import { VKConnectProvider } from '../VKConnectProvider';
/**
 * Storage API
 */
export declare class AppStorage extends VKConnectProvider {
    /**
     * Requests a value from the storage
     *
     * @event VKWebAppStorageGet
     * @platform iOS, Android, Web
     *
     * @param key Keys for getting ([a-zA-Z_\-0-9])
     * @param [isGlobal] Is global value. Default: false
     *
     * @returns The stored value or empty string if the value is not found
     */
    get: (key: string, isGlobal?: boolean) => Promise<string>;
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
    getMultiple: (keys: string[], isGlobal?: boolean) => Promise<Record<string, string>>;
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
    getKeys: (count: number, offset?: number, isGlobal?: boolean) => Promise<string[]>;
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
    set: (key: string, value: string, isGlobal?: boolean) => Promise<void>;
}
