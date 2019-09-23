import { VKConnectProvider } from '../VKConnectProvider';
export declare class Ads extends VKConnectProvider {
    /**
     * Subscribes a function for listening the `VKWebAppInitAds` event.
     *
     * @platform iOS, Android, Web
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onInitAds: (callback: (data: {
        init: "true" | "false";
    }) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppInitAds` event.
     *
     * @platform iOS, Android, Web
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onLoadAds: (callback: (data: {
        load: "true" | "false";
    }) => void) => () => void;
}
