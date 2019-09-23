import { AppearanceType } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';
export declare class Interface extends VKConnectProvider {
    /**
     * Resizes iframe size in web
     *
     * @event VKWebAppResizeWindow
     * @platform Web
     *
     * @param width Width of iframe
     * @param [height] Height of iframe
     *
     * @returns Result size of the iframe
     */
    resizeWindow: (width: number, height: number) => Promise<{
        width: number;
        height: number;
    }>;
    /**
     * Scrolls window to specified point
     *
     * @event VKWebAppScroll
     * @platform Web
     *
     * @param offsetTop Offset top
     * @param [speed] Speed of scrolling if need smooth scroll. Default: 0
     *
     * @returns Offset top and height of window after scroll
     */
    scrollTo: (offsetTop: number, speed?: number) => Promise<{
        top: number;
        height: number;
    }>;
    /**
     * Sets location hash to the app (vk.com/app123#hash)
     *
     * @event VKWebAppSetLocation
     */
    setLocationHash: (hash: string) => Promise<void>;
    /**
     * Changes the appearance of the mini app interface in mobile clients
     *
     * @event VKWebAppSetViewSettings
     * @platform iOS, Android
     *
     * @param statusBarStyle Status bar style type: `light` or `dark`
     * @param [actionBarColor] HEX Color of action bar
     */
    setViewSettings: (statusBarStyle: AppearanceType, actionBarColor?: string | undefined) => Promise<void>;
}
