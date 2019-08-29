import { OrderBoxShowingStatus } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';

/**
 * DirectGames API
 */
export class DirectGames extends VKConnectProvider {
  /**
   * Opens friends list for inviting to the app
   *
   * @event VKWebAppShowInviteBox
   * @platform iOS, Android
   */
  public showInviteBox = async () => {
    await this.connect.sendPromise('VKWebAppShowInviteBox');
  };

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
  public showLeaderBoardBox = async (userResult: number) => {
    await this.connect.sendPromise('VKWebAppShowLeaderBoardBox', {
      user_result: userResult
    });
  };

  /**
   * Shows item order box
   *
   * @event VKWebAppShowOrderBox
   *
   * @param itemName Name of product. Will be transmitted in the notification
   * of receipt of product information
   * @returns Status of ordering
   */
  public showOrderBox = async (itemName: string): Promise<OrderBoxShowingStatus> => {
    const data = await this.connect.sendPromise('VKWebAppShowOrderBox', {
      type: 'item',
      item: itemName
    });

    return data.status;
  };

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
  public showRequestBox = async (userId: number, message: string, requestKey?: string) => {
    return this.connect.sendPromise('VKWebAppShowRequestBox', { uid: userId, message, requestKey });
  };
}
