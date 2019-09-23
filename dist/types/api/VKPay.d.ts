import { VKConnectProvider } from '../VKConnectProvider';
/**
 * VK Pay methods
 */
export declare class VKPay extends VKConnectProvider {
    /**
     * Requests payment to a specified user of the specified amount via VK Pay
     *
     * @event VKWebAppOpenPayForm
     * @platform iOS, Android, Web
     *
     * @param amount The amount of payment in rubles. The minimum value is 1₽
     * @param userId User ID
     * @param appId App ID
     * @param [description] Description of the payment for user. The text will
     * be shown in payment dialog
     * @returns Payment result data
     */
    payToUser: (amount: number, userId: number, appId: number, description?: string | undefined) => Promise<import("@vkontakte/vk-connect").TransactionResult>;
    /**
     * Requests payment to a specified community of the specified amount
     * via VK Pay
     *
     * @event VKWebAppOpenPayForm
     * @platform iOS, Android, Web
     *
     * @param amount The amount of payment in rubles. The minimum value is 1₽
     * @param communityId Community ID
     * @param appId App ID
     * @param [description] Description of the payment for user. The text will
     * be shown in payment dialog
     * @param [data] Dictionary with arbitrary parameters
     * @returns Payment result data
     */
    payToCommunity: (amount: number, communityId: number, appId: number, description?: string | undefined, data?: string | undefined) => Promise<import("@vkontakte/vk-connect").TransactionResult>;
    /**
     * Requests transfer an arbitrary amount to a specified user
     *
     * @event VKWebAppOpenPayForm
     * @platform iOS, Android, Web
     *
     * @param userId User ID to transfer
     * @param appId App ID
     * @returns Payment result data
     */
    transferToUser: (userId: number, appId: number) => Promise<import("@vkontakte/vk-connect").TransactionResult>;
    /**
     * Requests transfer an arbitrary amount to a specified community
     *
     * @event VKWebAppOpenPayForm
     * @platform iOS, Android, Web
     *
     * @param communityId Community ID
     * @param appId App ID
     * @returns Payment result data
     */
    transferToCommunity: (communityId: number, appId: number) => Promise<import("@vkontakte/vk-connect").TransactionResult>;
}
