import { VKPayProps } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';

/**
 * VK Pay methods
 */
export class VKPay extends VKConnectProvider {
  /**
   * Requests payment to a specified user of the specified amount via VK Pay
   *
   * @category VK Pay
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
  public payToUser = async (amount: number, userId: number, appId: number, description?: string) => {
    const props: VKPayProps<'pay-to-user'> = {
      action: 'pay-to-user',
      app_id: appId,
      params: {
        amount,
        user_id: userId,
        description
      }
    };

    return this.connect.sendPromise('VKWebAppOpenPayForm', props);
  };

  /**
   * Requests payment to a specified community of the specified amount
   * via VK Pay
   *
   * @category VK Pay
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
  public payToCommunity = async (
    amount: number,
    communityId: number,
    appId: number,
    description?: string,
    data?: string
  ) => {
    const props: VKPayProps<'pay-to-group'> = {
      action: 'pay-to-group',
      app_id: appId,
      params: {
        amount,
        group_id: communityId,
        description,
        data
      }
    };

    return this.connect.sendPromise('VKWebAppOpenPayForm', props);
  };

  /**
   * Requests transfer an arbitrary amount to a specified user
   *
   * @category VK Pay
   * @event VKWebAppOpenPayForm
   * @platform iOS, Android, Web
   *
   * @param userId User ID to transfer
   * @param appId App ID
   * @returns Payment result data
   */
  public transferToUser = async (userId: number, appId: number) => {
    const props: VKPayProps<'transfer-to-user'> = {
      action: 'transfer-to-user',
      app_id: appId,
      params: { user_id: userId }
    };

    return this.connect.sendPromise('VKWebAppOpenPayForm', props);
  };

  /**
   * Requests transfer an arbitrary amount to a specified community
   *
   * @category VK Pay
   * @event VKWebAppOpenPayForm
   * @platform iOS, Android, Web
   *
   * @param communityId Community ID
   * @param appId App ID
   * @returns Payment result data
   */
  public transferToCommunity = async (communityId: number, appId: number) => {
    const props: VKPayProps<'transfer-to-group'> = {
      action: 'transfer-to-group',
      app_id: appId,
      params: { group_id: communityId }
    };

    return this.connect.sendPromise('VKWebAppOpenPayForm', props);
  };
}
