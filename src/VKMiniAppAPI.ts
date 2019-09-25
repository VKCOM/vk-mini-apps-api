import * as VKConnect from '@vkontakte/vk-connect';
import { CloseStatus, UserAccessScope, Attachment, WallPostOptions, CommunityAccessScope } from './types';
import { VKConnectProvider } from './VKConnectProvider';

/**
 * Converts attachment list to a attachments string.
 *
 * @param attachments List of attachments
 * @returns Comma-separated list of attachments in the above format
 */
const prepareAttachments = (attachments: (string | Attachment)[]): string =>
  attachments.map(item => (typeof item === 'string' ? item : item.type + item.ownerId + '_' + item.mediaId)).join(',');

/**
 * VK Mini apps API. Contains all VK Connect methods separated by categories
 */
export class VKMiniAppAPI extends VKConnectProvider {
  /**
   * Initializes the VK Mini App. Must be called before using any API method
   *
   * @category Common
   * @event VKWebAppInit
   * @platform iOS, Android, Web
   */
  public initApp(): void {
    this.connect.send('VKWebAppInit', {});
  }

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
  public onUpdateConfig = (callback: (data: VKConnect.ReceiveData<'VKWebAppUpdateConfig'>) => void) =>
    this.subscribeEvent('VKWebAppUpdateConfig', callback);

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
  public onViewHide = (callback: (data: VKConnect.ReceiveData<'VKWebAppViewHide'>) => void) =>
    this.subscribeEvent('VKWebAppViewHide', callback);

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
  public onViewRestore = (callback: (data: VKConnect.ReceiveData<'VKWebAppViewRestore'>) => void) =>
    this.subscribeEvent('VKWebAppViewRestore', callback);

  /**
   * Disallows notifications
   *
   * @category Common
   * @event VKWebAppDenyNotifications
   * @platform iOS, Android, Web
   */
  public denyNotifications = async (): Promise<void> => {
    await this.connect.sendPromise('VKWebAppDenyNotifications');
  };

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
  public callAPIMethod = async (method: string, params: Record<string, string | number>): Promise<any[]> => {
    const data = await this.connect.sendPromise('VKWebAppCallAPIMethod', {
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
    await this.connect.sendPromise('VKWebAppClose', { status, payload });
  };

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
  public getAuthToken = async (
    appId: number,
    scope?: UserAccessScope[]
  ): Promise<{ accessToken: string; scope?: string[] }> => {
    const strScope = Array.isArray(scope) ? scope.join(',') : '';

    const data = await this.connect.sendPromise('VKWebAppGetAuthToken', {
      app_id: appId,
      scope: strScope
    });

    return {
      accessToken: data.access_token,
      scope: data.scope.split(',')
    };
  };

  /**
   * Returns client's platform and version
   *
   * @category Common
   * @event VKWebAppGetClientVersion
   * @platform iOS, Android, Web
   */
  public getClientVersion = async (): Promise<{ platform: string; version: string }> => {
    return this.connect.sendPromise('VKWebAppGetClientVersion');
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
    await this.connect.sendPromise('VKWebAppOpenApp', {
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
    return this.connect.sendPromise('VKWebAppGetEmail');
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
    const data = await this.connect.sendPromise('VKWebAppGetFriends', { multi: isMultiple });

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
    const data = await this.connect.sendPromise('VKWebAppGetGeodata');

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
  public getPersonalCard = async (types: VKConnect.PersonalCardType[]): Promise<VKConnect.PersonalCardData> => {
    return this.connect.sendPromise('VKWebAppGetPersonalCard', { type: types });
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
    const data = await this.connect.sendPromise('VKWebAppGetPhoneNumber');

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
  public getUserInfo = async (): Promise<VKConnect.UserInfo> => {
    return this.connect.sendPromise('VKWebAppGetUserInfo');
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
    const data = await this.connect.sendPromise('VKWebAppOpenCodeReader');

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
    const data = await this.connect.sendPromise('VKWebAppOpenContacts');

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
    const data = await this.connect.sendPromise('VKWebAppShare', { link: message });

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
    await this.connect.sendPromise('VKWebAppShowImages', { images, start_index });
  };

  /**
   * Requests adding the app to favorites
   *
   * @category Common
   * @event VKWebAppAddToFavorites
   * @platform iOS, Android
   */
  public addToFavorites = async () => {
    await this.connect.sendPromise('VKWebAppAddToFavorites');
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
    const params: VKConnect.RequestProps<'VKWebAppShowWallPostBox'> = {
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

    const data = await this.connect.sendPromise('VKWebAppShowWallPostBox', params);

    return data.post_id;
  };

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
  public showMessageBox = async (
    peerId: number,
    message: string,
    attachments?: string | (string | Attachment)[],
    lat?: number,
    long?: number
  ) => {
    return this.connect.sendPromise('VKWebAppShowMessageBox', {
      peer_id: peerId,
      message,
      attachment: Array.isArray(attachments) ? prepareAttachments(attachments) : attachments,
      lat,
      lng: long
    });
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
    const data = await this.connect.sendPromise('VKWebAppAddToCommunity');

    return data.group_id;
  };

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
  public allowCommunityMessages = async (communityId: number, key?: string): Promise<void> => {
    await this.connect.sendPromise('VKWebAppAllowMessagesFromGroup', {
      group_id: communityId,
      key
    });
  };

  /**
   * Asks the user for permission to send messages from a the community
   *
   * @category Community
   * @event VKWebAppAllowNotifications
   * @platform iOS, Android, Web
   */
  public allowCommunityNotifications = async (): Promise<void> => {
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
   * @category Community
   * @event VKWebAppJoinGroup
   * @platform iOS, Android, Web
   */
  public joinCommunity = async (communityId: number): Promise<void> => {
    await this.connect.sendPromise('VKWebAppJoinGroup', { group_id: communityId });
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
    await this.connect.sendPromise('VKWebAppSendPayload', {
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
  public showCommunityWidgetPreviewBox = async (communityId: number, type: VKConnect.WidgetType, code: string) => {
    const data = await this.connect.sendPromise('VKWebAppShowCommunityWidgetPreviewBox', {
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
    return this.connect.sendPromise('VKWebAppResizeWindow', { width, height });
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
    return this.connect.sendPromise('VKWebAppScroll', { top: offsetTop, speed });
  };

  /**
   * Sets location hash to the app (vk.com/app123#hash)
   *
   * @category Interface
   * @event VKWebAppSetLocation
   */
  public setLocationHash = async (hash: string): Promise<void> => {
    await this.connect.sendPromise('VKWebAppSetLocation', { location: hash });
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
   */
  public setViewSettings = async (statusBarStyle: VKConnect.AppearanceType, actionBarColor?: string) => {
    await this.connect.sendPromise('VKWebAppSetViewSettings', {
      status_bar_style: statusBarStyle,
      action_bar_color: actionBarColor
    });
  };

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
  public onInitAds = (callback: (data: VKConnect.ReceiveData<'VKWebAppInitAds'>) => void) =>
    this.subscribeEvent('VKWebAppInitAds', callback);

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
  public onLoadAds = (callback: (data: VKConnect.ReceiveData<'VKWebAppLoadAds'>) => void) =>
    this.subscribeEvent('VKWebAppLoadAds', callback);

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
    const props: VKConnect.VKPayProps<'pay-to-user'> = {
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
    const props: VKConnect.VKPayProps<'pay-to-group'> = {
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
    const props: VKConnect.VKPayProps<'transfer-to-user'> = {
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
    const props: VKConnect.VKPayProps<'transfer-to-group'> = {
      action: 'transfer-to-group',
      app_id: appId,
      params: { group_id: communityId }
    };

    return this.connect.sendPromise('VKWebAppOpenPayForm', props);
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
    const data = await this.connect.sendPromise('VKWebAppFlashGetInfo', {});

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
    await this.connect.sendPromise('VKWebAppFlashSetLevel', { level });
  };

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
  public onAudioPaused = (callback: (data: VKConnect.ReceiveData<'VKWebAppAudioPaused'>) => void) =>
    this.subscribeEvent('VKWebAppAudioPaused', callback);

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
  public onAudioStopped = (callback: (data: VKConnect.ReceiveData<'VKWebAppAudioStopped'>) => void) =>
    this.subscribeEvent('VKWebAppAudioStopped', callback);

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
  public onAudioTrackChanged = (callback: (data: VKConnect.ReceiveData<'VKWebAppAudioTrackChanged'>) => void) =>
    this.subscribeEvent('VKWebAppAudioTrackChanged', callback);

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
  public onAudioUnpaused = (callback: (data: VKConnect.ReceiveData<'VKWebAppAudioUnpaused'>) => void) =>
    this.subscribeEvent('VKWebAppAudioUnpaused', callback);

  /**
   * Opens friends list for inviting to the app
   *
   * @category Direct Games
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
   * @category Direct Games
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
   * @category Direct Games
   * @event VKWebAppShowOrderBox
   *
   * @param itemName Name of product. Will be transmitted in the notification
   * of receipt of product information
   * @returns Status of ordering
   */
  public showOrderBox = async (itemName: string): Promise<VKConnect.OrderBoxShowingStatus> => {
    const data = await this.connect.sendPromise('VKWebAppShowOrderBox', {
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
    return this.connect.sendPromise('VKWebAppShowRequestBox', { uid: userId, message, requestKey });
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
    const data = await this.connect.sendPromise('VKWebAppStorageGet', { keys: [key] });

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
    const data = await this.connect.sendPromise('VKWebAppStorageGet', { keys });

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
    const data = await this.connect.sendPromise('VKWebAppStorageGetKeys', { count, offset });

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
    await this.connect.sendPromise('VKWebAppStorageSet', { key, value });
  };

  /**
   * Triggers impact feedback in Taptic Engine
   *
   * @category Taptic Engine
   * @event VKWebAppTapticImpactOccurred
   * @platform iOS
   */
  public impactOccurred = async (power: VKConnect.TapticVibrationPowerType = 'medium') => {
    await this.connect.sendPromise('VKWebAppTapticImpactOccurred', { style: power });
  };

  /**
   * Triggers notification feedback in Taptic Engine
   *
   * @category Taptic Engine
   * @event VKWebAppTapticNotificationOccurred
   * @platform iOS
   */
  public notificationOccurred = async (type: VKConnect.TapticNotificationType) => {
    await this.connect.sendPromise('VKWebAppTapticNotificationOccurred', { type });
  };

  /**
   * Triggers selection feedback in Taptic Engine
   *
   * @category Taptic Engine
   * @event VKWebAppTapticSelectionChanged
   * @platform iOS
   */
  public selectionChanged = async () => {
    await this.connect.sendPromise('VKWebAppTapticSelectionChanged');
  };
}
