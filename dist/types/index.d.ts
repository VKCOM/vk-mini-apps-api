import { VKConnect } from '@vkontakte/vk-connect';
import { VKMiniAppAPI } from './VKMiniAppAPI';
/**
 * VK Mini Apps API options
 */
declare type VKMiniAppAPIOptions = {
    /**
     * Custom VK Connect instance. Can be used for debugging
     */
    customConnect?: VKConnect;
};
/**
 * Creates instance of VK Mini App API
 * @param options Options of the instance
 */
export declare const createVKMiniAppAPI: (options: VKMiniAppAPIOptions) => VKMiniAppAPI;
export {};
