import { VKConnectProvider } from '../VKConnectProvider';
/**
 * Device's flashlight API
 */
export declare class Flashlight extends VKConnectProvider {
    /**
     * Requests device's flashlight information
     *
     * @event VKWebAppFlashGetInfo
     * @platform iOS, Android
     *
     * @returns Availability and level of the flashlight
     */
    flashGetInfo: () => Promise<{
        isAvailable: boolean;
        level: number;
    }>;
    /**
     * Sets device's flashlight level
     *
     * @event VKWebAppFlashSetLevel
     * @platform iOS, Android
     *
     * @param level The flashlight level from 0 to 1
     */
    flashSetLevel: (level: number) => Promise<void>;
}
