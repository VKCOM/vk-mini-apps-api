import { PersonalCardType, PersonalCardData, UserInfo } from '@vkontakte/vk-connect';
import { CloseStatus, UserAccessScope, Attachment, WallPostOptions } from '../types';
import { VKConnectProvider } from '../VKConnectProvider';
/**
 * Common VK Mini App methods
 */
export declare class Common extends VKConnectProvider {
    /**
     * Initializes the VK Mini App. Must be called before using any API method
     */
    initApp(): void;
    /**
     * Subscribes a function for listening the `VKWebAppUpdateConfig` event.
     *
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onUpdateConfig: (callback: (data: import("@vkontakte/vk-connect").UpdateConfigData) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppViewHide` event.
     *
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onViewHide: (callback: (data: {}) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppViewRestore` event.
     *
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onViewRestore: (callback: (data: {}) => void) => () => void;
    /**
     * Disallows notifications
     *
     * @event VKWebAppDenyNotifications
     * @platform iOS, Android, Web
     */
    denyNotifications: () => Promise<void>;
    /**
     * Allows you to call a VK API method on behalf of the application.
     *
     * @remarks
     * Please note: that in order to work with the API, you need to transfer the
     * user access key with the appropriate rights obtained using `getAuthToken`
     * @see {@link getAuthToken}.
     *
     * @event VKWebAppCallAPIMethod
     * @platform iOS, Android, Web
     *
     * @param method API method name
     * @param params Parameters of the method, including access token
     */
    callAPIMethod: (method: string, params: Record<string, string | number>) => Promise<any[]>;
    /**
     * Closes sub app opened via the `openApp` method. Sends data to the parent
     * app if needed.
     *
     * @event VKWebAppClose
     * @platform iOS
     */
    closeApp: (status: CloseStatus, payload?: any) => Promise<void>;
    /**
     * Requests user's access.
     *
     * @remarks
     * Please note: the location from which the token is requested must match
     * the URL specified in the app settings.
     *
     * @event VKWebAppGetAuthToken
     * @platform iOS, Android, Web
     *
     * @param [scope] List of scopes to request access
     * @returns User's access token and list of accessed scopes
     */
    getAuthToken: (appId: number, scope?: UserAccessScope[] | undefined) => Promise<{
        accessToken: string;
        scope?: string[] | undefined;
    }>;
    /**
     * Returns client's platform and version
     *
     * @event VKWebAppGetClientVersion
     * @platform iOS, Android, Web
     */
    getClientVersion: () => Promise<{
        platform: string;
        version: string;
    }>;
    /**
     * Opens sub app
     *
     * @event VKWebAppOpenApp
     * @platform iOS, Android, Web
     *
     * @param appId App id to open
     * @param locationHash String in location after `#`
     */
    openApp: (appId: number, locationHash?: string | undefined) => Promise<void>;
    /**
     * Requests user email
     *
     * @event VKWebAppGetEmail
     * @platform iOS, Android, Web
     *
     * @returns User email
     */
    getEmail: () => Promise<string>;
    /**
     * Displays modal with friend select
     *
     * @event VKWebAppGetFriends
     * @platform iOS, Android
     *
     * @param isMultiple Multiple choice
     * @returns List of selected users data
     */
    getFriends: (isMultiple?: boolean | undefined) => Promise<{
        id: number;
        first_name: string;
        last_name: string;
    }[]>;
    /**
     * Requests user geodata
     *
     * @event VKWebAppGetGeodata
     * @platform iOS, Android, Web
     *
     * @returns Object with current user geodata
     */
    getGeodata: () => Promise<{
        isAvailable: boolean;
        lat: number;
        long: number;
    }>;
    /**
     * Requests user to enter some contact data. Depending on the specified
     * parameters, it is possible to request: phone, email, address.
     *
     * @param types Array of required data types: `phone`, `email`, `address`
     *
     * @event VKWebAppGetPersonalCard
     * @platform iOS >= 5.4, Android >= 5.24
     *
     * @returns Entered user data
     */
    getPersonalCard: (types: PersonalCardType[]) => Promise<PersonalCardData>;
    /**
     * Requests user's phone number
     *
     * @event VKWebAppGetPhoneNumber
     * @platform iOS, Android, Web
     *
     * @returns Phone number and signature of received phone for server-side
     * validation. The signature is SHA256 checksum of concatenating next values
     * App ID, API secret (specified in the settings of your app), User ID,
     * field name (`phone_number`) and field value.
     */
    getPhoneNumber: () => Promise<{
        phone: string;
        sign: string;
    }>;
    /**
     * Requests the main user data
     *
     * @event VKWebAppGetUserInfo
     * @platform iOS, Android, Web
     *
     * @returns User data
     */
    getUserInfo: () => Promise<UserInfo>;
    /**
     * Opens QR codes and barcodes reader
     *
     * @event VKWebAppOpenCodeReader
     * @platform iOS, Android
     *
     * @returns Read data
     */
    openCodeReader: () => Promise<string>;
    /**
     * Opens a selecting contact from the contact list on the user's device.
     * If user has closed the contact list, called the `VKWebAppContactsClosed`
     * event.
     *
     * @event VKWebAppOpenContacts
     * @platform iOS, Android
     *
     * @returns Selected contact
     */
    openContacts: () => Promise<{
        phone: string;
        firstName: string;
        lastName: string;
    }>;
    /**
     * Requests the user to share a link on their wall
     *
     * @event VKWebAppShare
     * @platform iOS, Android, Web
     *
     * @param message The link to share
     * @returns ID of the post with shared link
     */
    shareLink: (message: string) => Promise<import("@vkontakte/vk-connect").LinkShareResult>;
    /**
     * Shows specified photos to user
     *
     * @event VKWebAppShowImages
     * @platform iOS, Android
     */
    showImages: (images: string[], start_index?: number | undefined) => Promise<void>;
    /**
     * Requests adding the app to favorites
     *
     * @event VKWebAppAddToFavorites
     * @platform iOS, Android
     */
    addToFavorites: () => Promise<void>;
    /**
     * Requests the user to post to the wall
     *
     * @event VKWebAppShowWallPostBox
     * @platform iOS, Android, Web
     *
     * @param message Post message. If you want to publish only attachments,
     * specify an empty string.
     * @param [attachments] List of attachments. May be one of the following
     * types:
     * - Array of attachment objects (@see {@link Attachment})
     * - Array of attachments in the following format:
     *   `<type><owner_id>_<media_id>`. E.g. `photo100172_166443618`
     * - Comma-separated list of attachments in the above format. E.g.
     *   `photo100172_166443618,photo-1_265827614`
     * @param [options] Options object (@see {@link PostMessageOptions})
     * @returns Published post ID
     */
    postToWall: (message: string, attachments?: string | (string | Attachment)[] | undefined, options?: WallPostOptions | undefined) => Promise<number>;
    /**
     *
     * @param peerId
     * @param message
     * @param attachments
     * @param lat
     * @param long
     */
    showMessageBox: (peerId: number, message: string, attachments?: string | (string | Attachment)[] | undefined, lat?: number | undefined, long?: number | undefined) => Promise<{
        result: true;
    }>;
}
