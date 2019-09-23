import { CommunityAccessScope } from '../types';
import { WidgetType } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';
/**
 * Communities interactions methods
 */
export declare class Communities extends VKConnectProvider {
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
    addApp: () => Promise<number>;
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
    allowMessages: (communityId: number, key?: string | undefined) => Promise<void>;
    /**
     * Asks the user for permission to send messages from a the community
     *
     * @event VKWebAppAllowNotifications
     * @platform iOS, Android, Web
     */
    allowNotifications: () => Promise<void>;
    /**
     * Requests community access for working with API on behalf of the community.
     * The community access token can only be received by its admin.
     *
     * For further work, get a user access key with the rights `scope=groups`
     * and make a request to the `groups.get` method with the `filter=admin`
     * parameter to get a list of identifiers of the administrated communities.
     *
     * New universal event
     * @event VKWebAppGetCommunityToken
     *
     * Legacy events
     * @event VKWebAppCommunityAccessToken iOS
     * @event VKWebAppCommunityToken Android
     * @event VKWebAppGetCommunityAuthToken Web
     *
     * @platform iOS, Android, Web
     *
     * @param communityId Community ID
     * @param appId App ID
     * @param [scope] List of scopes to request access
     * @returns Community access token
     */
    getToken: (communityId: number, appId: number, scope?: CommunityAccessScope[] | undefined) => Promise<{
        accessToken: string;
    }>;
    /**
     * Requests for join a community
     *
     * @event VKWebAppJoinGroup
     * @platform iOS, Android, Web
     */
    join: (communityId: number) => Promise<void>;
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
    sendPayload: (communityId: number, payload: any) => Promise<void>;
    /**
     * Sens request to open a screen with a preview of the widget for a
     * community
     *
     * @event VKWebAppShowCommunityWidgetPreviewBox
     */
    showWidgetPreviewBox: (communityId: number, type: WidgetType, code: string) => Promise<void>;
}
