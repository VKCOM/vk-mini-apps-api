import * as VKBridge from '@vkontakte/vk-bridge';
import { CloseStatus, UserAccessScope, Attachment, WallPostOptions, CommunityAccessScope } from './types';
import { VKBridgeProvider } from './bridgeProvider';

/**
 * Converts attachment list to a attachments string.
 *
 * @param attachments List of attachments
 * @returns Comma-separated list of attachments in the above format
 */
const prepareAttachments = (attachments: (string | Attachment)[]): string =>
  attachments.map(item => (typeof item === 'string' ? item : item.type + item.ownerId + '_' + item.mediaId)).join(',');

/**
 * VK Mini apps API. Contains all VK Bridge methods separated by categories
 */
export class VKMiniAppAPI extends VKBridgeProvider {
  /**
   * Initializes the VK Mini App. Must be called before using any API method
   *
   * @category Common
   * @event VKWebAppInit
   * @platform iOS, Android, Web
   */
  public initApp(): void {
    this.bridge.send('VKWebAppInit', {});
  }

  /**
   * Subscribes a function for listening the `VKWebAppUpdateConfig` event.
   *
   * @category Lifecycle
   * @event VKWebAppUpdateConfig
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns Function for unsubscribe
   */
  public onUpdateConfig = (callback: (data: VKBridge.ReceiveData<'VKWebAppUpdateConfig'>) => void) =>
    this.subscribeEvent('VKWebAppUpdateConfig', callback);

  /**
   * Subscribes a function for listening the `VKWebAppViewHide` event.
   *
   * @category Lifecycle
   * @event VKWebAppViewHide
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns Function for unsubscribe
   */
  public onViewHide = (callback: (data: VKBridge.ReceiveData<'VKWebAppViewHide'>) => void) =>
    this.subscribeEvent('VKWebAppViewHide', callback);

  /**
   * Subscribes a function for listening the `VKWebAppViewRestore` event.
   *
   * @category Lifecycle
   * @event VKWebAppViewRestore
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns Function for unsubscribe
   */
  public onViewRestore = (callback: (data: VKBridge.ReceiveData<'VKWebAppViewRestore'>) => void) =>
    this.subscribeEvent('VKWebAppViewRestore', callback);

  /**
   * Subscribes a function for listening the `VKWebAppLocationChanged` event.
   *
   * @category Lifecycle
   * @event VKWebAppLocationChanged
   * @platform Web, iOS, Android
   *
   * @param callback Function to pass received data
   * @returns Function for unsubscribe
   */
  public onLocationChanged = (callback: (data: VKBridge.ReceiveData<'VKWebAppLocationChanged'>) => void) =>
    this.subscribeEvent('VKWebAppLocationChanged', callback);

  /**
   * Allows you to call a VK API method on behalf of the application.
   *
   * @remarks
   * Please note: that in order to work with the API, you need to transfer the
   * user access key with the appropriate rights obtained using `getAccessToken`
   * @see {@link getAccessToken}.
   *
   * @category Common
   * @event VKWebAppCallAPIMethod
   * @platform iOS, Android, Web
   *
   * @param method API method name
   * @param params Parameters of the method, including access token
   */
  public callAPIMethod = async (method: string, params: Record<string, string | number>): Promise<any> => {
    const data = await this.bridge.send('VKWebAppCallAPIMethod', {
      method,
      params
    });

    return data.response;
  };

  /**
   * Closes sub app opened via the `openApp` method. Sends data to the parent
   * app if needed.
   *
   * @category Common
   * @event VKWebAppClose
   * @platform iOS
   */
  public closeApp = async (status: CloseStatus, payload?: any) => {
    // TODO: figure out what openApp's returns
    await this.bridge.send('VKWebAppClose', { status, payload });
  };

  /**
   * Requests user's access and returns access token
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
  public getAccessToken = async (
    appId: number,
    scope?: UserAccessScope[] | string
  ): Promise<{ accessToken: string; scope?: string[] }> => {
    const strScope = Array.isArray(scope) ? scope.join(',') : scope;

    const data = await this.bridge.send('VKWebAppGetAuthToken', {
      app_id: appId,
      scope: strScope != null ? strScope : ''
    });

    return {
      accessToken: data.access_token,
      scope: data.scope.split(',')
    };
  };

  /**
   * Alias of `getAccessToken`
   * @ignore
   * @deprecated
   *
   * @category Common
   * @event VKWebAppGetAuthToken
   * @platform iOS, Android, Web
   */
  public getAuthToken = this.getAccessToken;

  /**
   * Returns client's platform and version
   *
   * @category Common
   * @event VKWebAppGetClientVersion
   * @platform iOS, Android, Web
   */
  public getClientVersion = async (): Promise<{ platform: string; version: string }> => {
    return this.bridge.send('VKWebAppGetClientVersion');
  };

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
  public openApp = async (appId: number, locationHash?: string) => {
    await this.bridge.send('VKWebAppOpenApp', {
      app_id: appId,
      location: locationHash
    });
  };

  /**
   * Requests user email
   *
   * @category Common
   * @event VKWebAppGetEmail
   * @platform iOS, Android, Web
   *
   * @returns User email and sign of received data
   */
  public getEmail = async (): Promise<{ email: string; sign: string }> => {
    return this.bridge.send('VKWebAppGetEmail');
  };

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
  public getFriends = async (isMultiple?: boolean) => {
    const data = await this.bridge.send('VKWebAppGetFriends', { multi: isMultiple });

    return data.users;
  };

  /**
   * Requests user geodata
   *
   * @category Common
   * @event VKWebAppGetGeodata
   * @platform iOS, Android, Web
   *
   * @returns Object with current user geodata
   */
  public getGeodata = async () => {
    const data = await this.bridge.send('VKWebAppGetGeodata');

    return {
      isAvailable: !!data.available,
      lat: parseFloat(data.lat),
      long: parseFloat(data.long)
    };
  };

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
  public getPersonalCard = async (types: VKBridge.PersonalCardType[]): Promise<VKBridge.PersonalCardData> => {
    return this.bridge.send('VKWebAppGetPersonalCard', { type: types });
  };

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
  public getPhoneNumber = async (): Promise<{ phone: string; sign: string }> => {
    const data = await this.bridge.send('VKWebAppGetPhoneNumber');

    return {
      phone: data.phone_number,
      sign: data.sign
    };
  };

  /**
   * Requests the main user data
   *
   * @category Common
   * @event VKWebAppGetUserInfo
   * @platform iOS, Android, Web
   *
   * @returns User data
   */
  public getUserInfo = async (): Promise<VKBridge.UserInfo> => {
    return this.bridge.send('VKWebAppGetUserInfo');
  };

  /**
   * Opens QR codes and barcodes reader
   *
   * @category Common
   * @event VKWebAppOpenCodeReader
   * @platform iOS, Android
   *
   * @returns Read data
   */
  public openCodeReader = async (): Promise<string> => {
    const data = await this.bridge.send('VKWebAppOpenCodeReader');

    return data.code_data;
  };

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
  public openContacts = async (): Promise<{ phone: string; firstName: string; lastName: string }> => {
    const data = await this.bridge.send('VKWebAppOpenContacts');

    return {
      phone: data.phone,
      firstName: data.first_name,
      lastName: data.last_name
    };
  };

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
  public shareLink = async (message: string) => {
    const data = await this.bridge.send('VKWebAppShare', { link: message });

    return data;
  };

  /**
   * Shows specified photos to user
   *
   * @category Common
   * @event VKWebAppShowImages
   * @platform iOS, Android
   */
  public showImages = async (images: string[], start_index?: number) => {
    await this.bridge.send('VKWebAppShowImages', { images, start_index });
  };

  /**
   * Requests adding the app to favorites
   *
   * @category Common
   * @event VKWebAppAddToFavorites
   * @platform iOS, Android
   */
  public addToFavorites = async () => {
    await this.bridge.send('VKWebAppAddToFavorites');
  };

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
  public postToWall = async (
    message: string,
    attachments?: string | (string | Attachment)[],
    options?: WallPostOptions
  ): Promise<number> => {
    const params: VKBridge.RequestProps<'VKWebAppShowWallPostBox'> = {
      message,
      attachments: Array.isArray(attachments) ? prepareAttachments(attachments) : attachments,

      ...(options && {
        owner_id: options.ownerId,
        signed: options.isSigned,
        place_id: options.placeId,
        lat: options.lat,
        long: options.long
      })
    };

    const data = await this.bridge.send('VKWebAppShowWallPostBox', params);

    return data.post_id;
  };

  /**
   * Asks user for permission to send notifications from app
   *
   * @category Common
   * @event VKWebAppAllowNotifications
   * @platform iOS, Android, Web
   */
  public allowNotifications = async (): Promise<void> => {
    await this.bridge.send('VKWebAppAllowNotifications');
  };

  /**
   * Disallows notifications
   *
   * @category Common
   * @event VKWebAppDenyNotifications
   * @platform iOS, Android, Web
   */
  public denyNotifications = async (): Promise<void> => {
    await this.bridge.send('VKWebAppDenyNotifications');
  };

  /**
   * Opens story editor
   *
   * @category Stories
   * @event VKWebAppShowStoryBox
   * @platform iOS, Android, Web
   *
   * @param storyOptions Open story options
   */
  public showStoryBox = async (storyOptions: VKBridge.ShowStoryBoxOptions): Promise<void> => {
    await this.bridge.send('VKWebAppShowStoryBox', storyOptions);
  };

  /**
   * Subscribes to a story updates
   *
   * @category Stories
   * @event VKWebAppSubscribeStoryApp
   * @platform iOS, Android, Web
   *
   *
   * @param story_owner_id Story owner id
   * @param story_id Story id
   * @param sticker_id Clickable sticker id
   * @param [access_key] Private stories access key
   *
   * @returns Access key
   */
  public subscribeStoryApp = async (storyOwnerId: number, storyId: number, stickerId: number, accessKey: string) => {
    const result = await this.bridge.send('VKWebAppSubscribeStoryApp', {
      story_owner_id: storyOwnerId,
      story_id: storyId,
      sticker_id: stickerId,
      access_key: accessKey
    });

    return result.access_key;
  };

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
  public addAppToCommunity = async (): Promise<number> => {
    const data = await this.bridge.send('VKWebAppAddToCommunity');

    return data.group_id;
  };

  /**
   * Asks user for permission to send messages from a community
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
  public allowCommunityMessages = async (communityId: number, key?: string): Promise<void> => {
    await this.bridge.send('VKWebAppAllowMessagesFromGroup', {
      group_id: communityId,
      key
    });
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
  public getCommunityToken = async (
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
    ].filter(method => this.bridge.supports(method))[0] as
      | 'VKWebAppCommunityAccessToken'
      | 'VKWebAppCommunityToken'
      | 'VKWebAppGetCommunityAuthToken'
      | 'VKWebAppGetCommunityToken'
      | undefined;

    if (availableMethod == null) {
      throw new Error("Couldn't find available method to get community token");
    }

    const data = await this.bridge.send(availableMethod, {
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
   * @category Community
   * @event VKWebAppJoinGroup
   * @platform iOS, Android, Web
   */
  public joinCommunity = async (communityId: number): Promise<void> => {
    await this.bridge.send('VKWebAppJoinGroup', { group_id: communityId });
  };

  /**
   * Sends event to a community
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
  public sendPayloadToCommunity = async (communityId: number, payload: any) => {
    await this.bridge.send('VKWebAppSendPayload', {
      group_id: communityId,
      payload
    });
  };

  /**
   * Sens request to open a screen with a preview of the widget for a
   * community
   *
   * @category Community
   * @event VKWebAppShowCommunityWidgetPreviewBox
   */
  public showCommunityWidgetPreviewBox = async (communityId: number, type: VKBridge.WidgetType, code: string) => {
    const data = await this.bridge.send('VKWebAppShowCommunityWidgetPreviewBox', {
      type,
      group_id: communityId,
      code
    });
  };

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
  public resizeWindow = async (width: number, height: number): Promise<{ width: number; height: number }> => {
    return this.bridge.send('VKWebAppResizeWindow', { width, height });
  };

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
  public scrollTo = async (offsetTop: number, speed = 0): Promise<{ top: number; height: number }> => {
    return this.bridge.send('VKWebAppScroll', { top: offsetTop, speed });
  };

  /**
   * Sets location hash to the app (vk.com/app123#hash)
   *
   * @category Interface
   * @event VKWebAppSetLocation
   */
  public setLocationHash = async (hash: string): Promise<void> => {
    await this.bridge.send('VKWebAppSetLocation', { location: hash });
  };

  /**
   * Changes the appearance of the mini app interface in mobile clients
   *
   * @category Interface
   * @event VKWebAppSetViewSettings
   * @platform iOS, Android
   *
   * @param statusBarStyle Status bar style type: `light` or `dark`
   * @param [actionBarColor] HEX Color of action bar
   * @param [navigationBarColor] HEX color of navigation bar (Android only)
   */
  public setViewSettings = async (
    statusBarStyle: VKBridge.AppearanceType,
    actionBarColor?: string,
    navigationBarColor?: string
  ) => {
    await this.bridge.send('VKWebAppSetViewSettings', {
      status_bar_style: statusBarStyle,
      action_bar_color: actionBarColor,
      navigation_bar_color: navigationBarColor
    });
  };

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
  public payToUser = async (
    amount: number,
    userId: number,
    appId: number,
    description?: string
  ): Promise<VKBridge.TransactionResult> => {
    const props: VKBridge.VKPayProps<'pay-to-user'> = {
      action: 'pay-to-user',
      app_id: appId,
      params: {
        amount,
        user_id: userId,
        description
      }
    };

    const resp = await this.bridge.send('VKWebAppOpenPayForm', props);

    return 'result' in resp ? resp.result : resp;
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
  ): Promise<VKBridge.TransactionResult> => {
    const props: VKBridge.VKPayProps<'pay-to-group'> = {
      action: 'pay-to-group',
      app_id: appId,
      params: {
        amount,
        group_id: communityId,
        description,
        data
      }
    };

    const resp = await this.bridge.send('VKWebAppOpenPayForm', props);

    return 'result' in resp ? resp.result : resp;
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
  public transferToUser = async (userId: number, appId: number): Promise<VKBridge.TransactionResult> => {
    const props: VKBridge.VKPayProps<'transfer-to-user'> = {
      action: 'transfer-to-user',
      app_id: appId,
      params: { user_id: userId }
    };

    const resp = await this.bridge.send('VKWebAppOpenPayForm', props);

    return 'result' in resp ? resp.result : resp;
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
  public transferToCommunity = async (communityId: number, appId: number): Promise<VKBridge.TransactionResult> => {
    const props: VKBridge.VKPayProps<'transfer-to-group'> = {
      action: 'transfer-to-group',
      app_id: appId,
      params: { group_id: communityId }
    };

    const resp = await this.bridge.send('VKWebAppOpenPayForm', props);

    return 'result' in resp ? resp.result : resp;
  };

  /**
   * Requests device's flashlight information
   *
   * @category Flashlight
   * @event VKWebAppFlashGetInfo
   * @platform iOS, Android
   *
   * @returns Availability and level of the flashlight
   */
  public flashGetInfo = async (): Promise<{ isAvailable: boolean; level: number }> => {
    const data = await this.bridge.send('VKWebAppFlashGetInfo', {});

    return {
      isAvailable: data.is_available,
      level: data.level
    };
  };

  /**
   * Sets device's flashlight level
   *
   * @category Flashlight
   * @event VKWebAppFlashSetLevel
   * @platform iOS, Android
   *
   * @param level The flashlight level from 0 to 1
   */
  public flashSetLevel = async (level: number): Promise<void> => {
    await this.bridge.send('VKWebAppFlashSetLevel', { level });
  };

  /**
   * Opens friends list for inviting to the app
   *
   * @category Direct Games
   * @event VKWebAppShowInviteBox
   * @platform iOS, Android
   */
  public showInviteBox = async () => {
    await this.bridge.send('VKWebAppShowInviteBox');
  };

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
  public showLeaderBoardBox = async (userResult: number) => {
    await this.bridge.send('VKWebAppShowLeaderBoardBox', {
      user_result: userResult
    });
  };

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
  public showOrderBox = async (itemName: string): Promise<VKBridge.OrderBoxShowingStatus> => {
    const data = await this.bridge.send('VKWebAppShowOrderBox', {
      type: 'item',
      item: itemName
    });

    return data.status;
  };

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
  public showRequestBox = async (userId: number, message: string, requestKey?: string) => {
    return this.bridge.send('VKWebAppShowRequestBox', { uid: userId, message, requestKey });
  };

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
  public storageGet = async (key: string): Promise<string> => {
    const data = await this.bridge.send('VKWebAppStorageGet', { keys: [key] });

    if (!data || !Array.isArray(data.keys) || data.keys.length === 0) {
      return '';
    }

    return data.keys[0].value;
  };

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
  public storageGetMultiple = async (keys: string[]): Promise<Record<string, string>> => {
    const data = await this.bridge.send('VKWebAppStorageGet', { keys });

    return data && Array.isArray(data.keys) && data.keys.length > 0
      ? data.keys.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>)
      : {};
  };

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
  public storageGetKeys = async (count: number, offset: number = 0): Promise<string[]> => {
    const data = await this.bridge.send('VKWebAppStorageGetKeys', { count, offset });

    return (data && data.keys) || [];
  };

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
  public storageSet = async (key: string, value: string) => {
    await this.bridge.send('VKWebAppStorageSet', { key, value });
  };

  /**
   * Triggers impact feedback in Taptic Engine
   *
   * @category Taptic Engine
   * @event VKWebAppTapticImpactOccurred
   * @platform iOS
   */
  public impactOccurred = async (power: VKBridge.TapticVibrationPowerType = 'medium') => {
    await this.bridge.send('VKWebAppTapticImpactOccurred', { style: power });
  };

  /**
   * Triggers notification feedback in Taptic Engine
   *
   * @category Taptic Engine
   * @event VKWebAppTapticNotificationOccurred
   * @platform iOS
   */
  public notificationOccurred = async (type: VKBridge.TapticNotificationType) => {
    await this.bridge.send('VKWebAppTapticNotificationOccurred', { type });
  };

  /**
   * Triggers selection feedback in Taptic Engine
   *
   * @category Taptic Engine
   * @event VKWebAppTapticSelectionChanged
   * @platform iOS
   */
  public selectionChanged = async () => {
    await this.bridge.send('VKWebAppTapticSelectionChanged');
  };

  /**
   * Calls `VKWebAppAccelerometerStart` method and subscribes a function for
   * listening the `VKWebAppAccelerometerChanged` event.
   *
   * @category Device sensors
   * @event VKWebAppAccelerometerChanged
   * @platform iOS
   *
   * @param callback Function to pass received data
   * @returns Function for unsubscribe
   */
  public onAccelerometerChanged = (callback: (data: VKBridge.ReceiveData<'VKWebAppAccelerometerChanged'>) => void) =>
    this.subscribeEvent(
      'VKWebAppAccelerometerChanged',
      callback,
      () => this.bridge.send('VKWebAppAccelerometerStart'),
      () => this.bridge.send('VKWebAppAccelerometerStop')
    );

  /**
   * Calls `VKWebAppGyroscopeStart` method and subscribes a function for
   * listening the `VKWebAppGyroscopeChanged` event.
   *
   * @category Device sensors
   * @event VKWebAppGyroscopeChanged
   * @platform iOS
   *
   * @param callback Function to pass received data
   * @returns Function for unsubscribe
   */
  public onGyroscopeChanged = (callback: (data: VKBridge.ReceiveData<'VKWebAppGyroscopeChanged'>) => void) =>
    this.subscribeEvent(
      'VKWebAppGyroscopeChanged',
      callback,
      () => this.bridge.send('VKWebAppGyroscopeStart'),
      () => this.bridge.send('VKWebAppGyroscopeStop')
    );

  /**
   * Calls `VKWebAppDeviceMotionStart` method and subscribes a function for
   * listening the `VKWebAppDeviceMotionChanged` event.
   *
   * @category Device sensors
   * @event VKWebAppDeviceMotionChanged
   * @platform iOS
   *
   * @param callback Function to pass received data
   * @returns Function for unsubscribe
   */
  public onDeviceMotionChanged = (callback: (data: VKBridge.ReceiveData<'VKWebAppDeviceMotionChanged'>) => void) =>
    this.subscribeEvent(
      'VKWebAppDeviceMotionChanged',
      callback,
      () => this.bridge.send('VKWebAppDeviceMotionStart'),
      () => this.bridge.send('VKWebAppDeviceMotionStop')
    );
}
