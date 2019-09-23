import { OrderBoxShowingStatus } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';
/**
 * DirectGames API
 */
export declare class DirectGames extends VKConnectProvider {
    /**
     * Opens friends list for inviting to the app
     *
     * @event VKWebAppShowInviteBox
     * @platform iOS, Android
     */
    showInviteBox: () => Promise<void>;
    /**
     * Shows leaderboard
     *
     * @remarks
     * The leaderboard can display the progress of users by points or levels
     * (the type of leaderboard is selected in the application settings). To add
     * a level or points to users, use the `secure.addAppEvent` method.
     *
     * @event VKWebAppShowLeaderBoardBox
     * @platform iOS, Android
     *
     * @param userResult User result
     */
    showLeaderBoardBox: (userResult: number) => Promise<void>;
    /**
     * Shows item order box
     *
     * @event VKWebAppShowOrderBox
     *
     * @param itemName Name of product. Will be transmitted in the notification
     * of receipt of product information
     * @returns Status of ordering
     */
    showOrderBox: (itemName: string) => Promise<OrderBoxShowingStatus>;
    /**
     * Shows box for sending request to the user
     *
     * @event VKWebAppShowRequestBox
     *
     * @param userId User Id
     * @param message Request test
     * @param [requestKey] Optional parameter. Custom string to track conversion.
     * It is passed in the application launch parameters in case of launch from
     * the request.
     * @returns Success flag and request key
     */
    showRequestBox: (userId: number, message: string, requestKey?: string | undefined) => Promise<import("@vkontakte/vk-connect").RequestResult>;
}
