import * as VKConnect from '@vkontakte/vk-connect';
import { CloseStatus, UserAccessScope, Attachment, WallPostOptions, CommunityAccessScope } from './types';
import { VKConnectProvider } from './VKConnectProvider';
/**
 * VK Mini apps API. Contains all VK Connect methods separated by categories
 */
export declare class VKMiniAppAPI extends VKConnectProvider {
    /**
     * Initializes the VK Mini App. Must be called before using any API method
     *
     * @category Common
     * @event VKWebAppInit
     * @platform iOS, Android, Web
     */
    initApp(): void;
    /**
     * Subscribes a function for listening the `VKWebAppUpdateConfig` event.
     *
     * @category Common
     * @event VKWebAppUpdateConfig
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onUpdateConfig: (callback: (data: VKConnect.UpdateConfigData) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppViewHide` event.
     *
     * @category Common
     * @event VKWebAppViewHide
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onViewHide: (callback: (data: {}) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppViewRestore` event.
     *
     * @category Common
     * @event VKWebAppViewRestore
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onViewRestore: (callback: (data: {}) => void) => () => void;
    /**
     * Disallows notifications
     *
     * @category Common
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
     * @category Common
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
     * @category Common
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
     * @category Common
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
     * @category Common
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
     * @category Common
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
     * @category Common
     * @event VKWebAppGetEmail
     * @platform iOS, Android, Web
     *
     * @returns User email and sign of received data
     */
    getEmail: () => Promise<{
        email: string;
        sign: string;
    }>;
    /**
     * Displays modal with friend select
     *
     * @category Common
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
     * @category Common
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
     * @category Common
     * @event VKWebAppGetPersonalCard
     * @platform iOS >= 5.4, Android >= 5.24
     *
     * @returns Entered user data
     */
    getPersonalCard: (types: VKConnect.PersonalCardType[]) => Promise<VKConnect.PersonalCardData>;
    /**
     * Requests user's phone number
     *
     * @category Common
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
     * @category Common
     * @event VKWebAppGetUserInfo
     * @platform iOS, Android, Web
     *
     * @returns User data
     */
    getUserInfo: () => Promise<VKConnect.UserInfo>;
    /**
     * Opens QR codes and barcodes reader
     *
     * @category Common
     * @event VKWebAppOpenCodeReader
     * @platform iOS, Android
     *
     * @returns Read data
     */
    openCodeReader: () => Promise<string>;
    /**
     * Opens a selecting contact from the contact list on the user's device.
     * If user has closed the contact list, called the `VKWebAppContactsClosed`
     *
     * event.
     * @category Common
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
     * @category Common
     * @event VKWebAppShare
     * @platform iOS, Android, Web
     *
     * @param message The link to share
     * @returns ID of the post with shared link
     */
    shareLink: (message: string) => Promise<VKConnect.LinkShareResult>;
    /**
     * Shows specified photos to user
     *
     * @category Common
     * @event VKWebAppShowImages
     * @platform iOS, Android
     */
    showImages: (images: string[], start_index?: number | undefined) => Promise<void>;
    /**
     * Requests adding the app to favorites
     *
     * @category Common
     * @event VKWebAppAddToFavorites
     * @platform iOS, Android
     */
    addToFavorites: () => Promise<void>;
    /**
     * Requests the user to post to the wall
     *
     * @category Common
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
     * @category Common
     *
     * @todo Describe me
     * @param peerId
     * @param message
     * @param attachments
     * @param lat
     * @param long
     */
    showMessageBox: (peerId: number, message: string, attachments?: string | (string | Attachment)[] | undefined, lat?: number | undefined, long?: number | undefined) => Promise<{
        result: true;
    }>;
    /**
     * Request to add the app to a community. Opens a community selection dialog
     *
     * @remarks
     * Please note: to call the method, in the app settings must be checked
     * "Allow installation in communities". Also, the app must be accessible to
     * everyone.
     *
     * @category Community
     * @event VKWebAppAddToCommunity
     * @platform iOS, Android, Web
     *
     * @returns {Promise<number>} ID of group to which the app was added
     */
    addApp: () => Promise<number>;
    /**
     * Asks user for permission to send messages from a the community
     *
     * @category Community
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
     * @category Community
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
    getToken: (communityId: number, appId: number, scope?: CommunityAccessScope[] | undefined) => Promise<{
        accessToken: string;
    }>;
    /**
     * Requests for join a community
     *
     * @category Community
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
     * @category Community
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
     * @category Community
     * @event VKWebAppShowCommunityWidgetPreviewBox
     */
    showWidgetPreviewBox: (communityId: number, type: VKConnect.WidgetType, code: string) => Promise<void>;
    /**
     * Resizes iframe size in web
     *
     * @category Interface
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
     * @category Interface
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
     * @category Interface
     * @event VKWebAppSetLocation
     */
    setLocationHash: (hash: string) => Promise<void>;
    /**
     * Changes the appearance of the mini app interface in mobile clients
     *
     * @category Interface
     * @event VKWebAppSetViewSettings
     * @platform iOS, Android
     *
     * @param statusBarStyle Status bar style type: `light` or `dark`
     * @param [actionBarColor] HEX Color of action bar
     */
    setViewSettings: (statusBarStyle: VKConnect.AppearanceType, actionBarColor?: string | undefined) => Promise<void>;
    /**
     * Subscribes a function for listening the `VKWebAppInitAds` event.
     *
     * @category Advertisement
     * @event VKWebAppInitAds
     * @platform iOS, Android, Web
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onInitAds: (callback: (data: {
        init: "true" | "false";
    }) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppLoadAds` event.
     *
     * @category Advertisement
     * @event VKWebAppLoadAds
     * @platform iOS, Android, Web
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onLoadAds: (callback: (data: {
        load: "true" | "false";
    }) => void) => () => void;
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
    payToUser: (amount: number, userId: number, appId: number, description?: string | undefined) => Promise<VKConnect.TransactionResult>;
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
    payToCommunity: (amount: number, communityId: number, appId: number, description?: string | undefined, data?: string | undefined) => Promise<VKConnect.TransactionResult>;
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
    transferToUser: (userId: number, appId: number) => Promise<VKConnect.TransactionResult>;
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
    transferToCommunity: (communityId: number, appId: number) => Promise<VKConnect.TransactionResult>;
    /**
     * Requests device's flashlight information
     *
     * @category Flashlight
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
     * @category Flashlight
     * @event VKWebAppFlashSetLevel
     * @platform iOS, Android
     *
     * @param level The flashlight level from 0 to 1
     */
    flashSetLevel: (level: number) => Promise<void>;
    /**
     * Subscribes a function for listening the `VKWebAppAudioPaused` event.
     *
     * @category Audio
     * @event VKWebAppAudioPaused
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onAudioPaused: (callback: (data: {
        position: number;
        type: string;
        id: string;
    }) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppAudioStopped` event.
     *
     * @category Audio
     * @event VKWebAppAudioStopped
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onAudioStopped: (callback: (data: {}) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppAudioTrackChanged` event.
     *
     * @category Audio
     * @event VKWebAppAudioTrackChanged
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onAudioTrackChanged: (callback: (data: {
        type: string;
        id: string;
    }) => void) => () => void;
    /**
     * Subscribes a function for listening the `VKWebAppAudioUnpaused` event.
     *
     * @category Audio
     * @event VKWebAppAudioUnpaused
     * @platform iOS, Android
     *
     * @param callback Function to pass received data
     * @returns function for unsubscribe
     */
    onAudioUnpaused: (callback: (data: {
        type: string;
        id: string;
    }) => void) => () => void;
    /**
     * Opens friends list for inviting to the app
     *
     * @category Direct Games
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
     * @category Direct Games
     * @event VKWebAppShowLeaderBoardBox
     * @platform iOS, Android
     *
     * @param userResult User result
     */
    showLeaderBoardBox: (userResult: number) => Promise<void>;
    /**
     * Shows item order box
     *
     * @category Direct Games
     * @event VKWebAppShowOrderBox
     *
     * @param itemName Name of product. Will be transmitted in the notification
     * of receipt of product information
     * @returns Status of ordering
     */
    showOrderBox: (itemName: string) => Promise<VKConnect.OrderBoxShowingStatus>;
    /**
     * Shows box for sending request to the user
     *
     * @category Direct Games
     * @event VKWebAppShowRequestBox
     *
     * @param userId User Id
     * @param message Request test
     * @param [requestKey] Optional parameter. Custom string to track conversion.
     * It is passed in the application launch parameters in case of launch from
     * the request.
     * @returns Success flag and request key
     */
    showRequestBox: (userId: number, message: string, requestKey?: string | undefined) => Promise<VKConnect.RequestResult>;
    /**
     * Requests a value from the storage
     *
     * @category Storage
     * @event VKWebAppStorageGet
     * @platform iOS, Android, Web
     *
     * @param key Keys for getting ([a-zA-Z_\-0-9])
  
     * @returns The stored value or empty string if the value is not found
     */
    storageGet: (key: string) => Promise<string>;
    /**
     * Requests multiple values from the storage
     *
     * @category Storage
     * @event VKWebAppStorageGet
     * @platform iOS, Android, Web
     *
     * @param keys List of keys for getting ([a-zA-Z_\-0-9])
     *
     * @returns Map of key-value
     */
    storageGetMultiple: (keys: string[]) => Promise<Record<string, string>>;
    /**
     * Request list of keys of some stored values
     *
     * @category Storage
     * @event VKWebAppStorageGetKeys
     * @platform iOS, Android, Web
     *
     * @param count Count of keys to get. Max value is 1000
     * @param [offset] The offset required to fetch a specific subset of keys.
     * Default: 0
     */
    storageGetKeys: (count: number, offset?: number) => Promise<string[]>;
    /**
     * Stores value in storage
     *
     * @category Storage
     * @event VKWebAppStorageSet
     * @platform iOS, Android, Web
     *
     * @param key The key of value ([a-zA-Z_\-0-9])
     * @param value Value
     */
    storageSet: (key: string, value: string) => Promise<void>;
    /**
     * Triggers impact feedback in Taptic Engine
     *
     * @category Taptic Engine
     * @event VKWebAppTapticImpactOccurred
     * @platform iOS
     */
    impactOccurred: (power?: VKConnect.TapticVibrationPowerType) => Promise<void>;
    /**
     * Triggers notification feedback in Taptic Engine
     *
     * @category Taptic Engine
     * @event VKWebAppTapticNotificationOccurred
     * @platform iOS
     */
    notificationOccurred: (type: VKConnect.TapticNotificationType) => Promise<void>;
    /**
     * Triggers selection feedback in Taptic Engine
     *
     * @category Taptic Engine
     * @event VKWebAppTapticSelectionChanged
     * @platform iOS
     */
    selectionChanged: () => Promise<void>;
}
