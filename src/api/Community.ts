import { CommunityAccessScope } from '../types';
import { WidgetType } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';

/**
 * Communities interactions methods
 */
export class Communities extends VKConnectProvider {
  /**
   * Request to add the app to a community. Opens a community selection dialog
   *
   * @remarks
   * Please note: to call the method, in the app settings must be checked
   * "Allow installation in communities". Also, the app must be accessible to
   * everyone.
   *
   * @event VKWebAppAddToCommunity
   * @platform iOS, Android, Web
   *
   * @returns {Promise<number>} ID of group to which the app was added
   */
  public addApp = async (): Promise<number> => {
    const data = await this.connect.sendPromise('VKWebAppAddToCommunity');

    return data.group_id;
  };

  /**
   * Asks user for permission to send messages from a the community
   *
   * @event VKWebAppAllowMessagesFromGroup
   * @platform iOS, Android, Web
   *
   * @param communityId Id of a community to request permissions for
   * @param [key] Arbitrary string. This parameter can be used to identify
   * the user. Its value will be returned in the message_allow Callback API
   * event.
   */
  public allowMessages = async (communityId: number, key?: string): Promise<void> => {
    await this.connect.sendPromise('VKWebAppAllowMessagesFromGroup', {
      group_id: communityId,
      key
    });
  };

  /**
   * Asks the user for permission to send messages from a the community
   *
   * @platform iOS, Android, Web
   *
   * @event VKWebAppAllowNotifications
   */
  public allowNotifications = async (): Promise<void> => {
    await this.connect.sendPromise('VKWebAppAllowNotifications');
  };

  /**
   * Requests community access for working with API on behalf of the community.
   * The community access token can only be received by its admin.
   *
   * For further work, get a user access key with the rights `scope=groups`
   * and make a request to the `groups.get` method with the `filter=admin`
   * parameter to get a list of identifiers of the administrated communities.
   *
   * @category Community
   * @event VKWebAppGetCommunityToken New universal event
   * @event VKWebAppCommunityAccessToken Legacy events for iOS
   * @event VKWebAppCommunityToken Legacy events for Android
   * @event VKWebAppGetCommunityAuthToken Legacy events for Web
   * @platform iOS, Android, Web
   *
   * @param communityId Community ID
   * @param appId App ID
   * @param [scope] List of scopes to request access
   * @returns Community access token
   */
  public getToken = async (
    communityId: number,
    appId: number,
    scope?: CommunityAccessScope[]
  ): Promise<{ accessToken: string }> => {
    const strScope = Array.isArray(scope) ? scope.join(',') : '';

    const availableMethod = [
      'VKWebAppCommunityAccessToken',
      'VKWebAppCommunityToken',
      'VKWebAppGetCommunityAuthToken',
      'VKWebAppGetCommunityToken'
    ].filter(method => this.connect.supports(method))[0] as
      | 'VKWebAppCommunityAccessToken'
      | 'VKWebAppCommunityToken'
      | 'VKWebAppGetCommunityAuthToken'
      | 'VKWebAppGetCommunityToken'
      | undefined;

    if (availableMethod == null) {
      throw new Error("Couldn't find available method to get community token");
    }

    const data = await this.connect.sendPromise(availableMethod, {
      app_id: appId,
      group_id: communityId,
      scope: strScope
    });

    return {
      accessToken: data.access_token
    };
  };

  /**
   * Requests for join a community
   *
   * @event VKWebAppJoinGroup
   * @platform iOS, Android, Web
   */
  public join = async (communityId: number): Promise<void> => {
    await this.connect.sendPromise('VKWebAppJoinGroup', { group_id: communityId });
  };

  /**
   * Sends event to a community.
   *
   * @remarks
   * Dispatches the `app_payload` event, which you can receive through
   * `Bots Longpoll` or `callback_api`. The application from which the event is
   * dispatched must be installed in the community.
   *
   * @event VKWebAppSendPayload
   * @platform iOS, Android, Web
   *
   * @param communityId Community ID
   * @param payload Any data to send as JSON
   */
  public sendPayload = async (communityId: number, payload: any) => {
    await this.connect.sendPromise('VKWebAppSendPayload', {
      group_id: communityId,
      payload
    });
  };

  /**
   * Sens request to open a screen with a preview of the widget for a
   * community
   *
   * @event VKWebAppShowCommunityWidgetPreviewBox
   */
  public showWidgetPreviewBox = async (communityId: number, type: WidgetType, code: string) => {
    const data = await this.connect.sendPromise('VKWebAppShowCommunityWidgetPreviewBox', {
      type,
      group_id: communityId,
      code
    });
  };
}
