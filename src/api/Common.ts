import { PersonalCardType, PersonalCardData, UserInfo, RequestProps } from '@vkontakte/vk-connect';
import { CloseStatus, UserAccessScope, Attachment, WallPostOptions } from '../types';
import { VKConnectProvider } from '../VKConnectProvider';

/**
 * Converts attachment list to a attachments string.
 *
 * @param attachments List of attachments
 * @returns Comma-separated list of attachments in the above format
 */
const prepareAttachments = (attachments: (string | Attachment)[]): string =>
  attachments.map(item => (typeof item === 'string' ? item : item.type + item.ownerId + '_' + item.mediaId)).join(',');

/**
 * Common VK Mini App methods
 */
export class Common extends VKConnectProvider {
  /**
   * Initializes the VK Mini App. Must be called before using any API method
   */
  public initApp(): void {
    this.connect.send('VKWebAppInit', {});
  }

  /**
   * Subscribes a function for listening the `VKWebAppUpdateConfig` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onUpdateConfig = this.createEventListener('VKWebAppUpdateConfig');

  /**
   * Subscribes a function for listening the `VKWebAppViewHide` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onViewHide = this.createEventListener('VKWebAppViewHide');

  /**
   * Subscribes a function for listening the `VKWebAppViewRestore` event.
   *
   * @platform iOS, Android
   *
   * @param callback Function to pass received data
   * @returns function for unsubscribe
   */
  public onViewRestore = this.createEventListener('VKWebAppViewRestore');

  /**
   * Disallows notifications
   *
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
   * @event VKWebAppGetClientVersion
   * @platform iOS, Android, Web
   */
  public getClientVersion = async (): Promise<{ platform: string; version: string }> => {
    return this.connect.sendPromise('VKWebAppGetClientVersion');
  };

  /**
   * Opens sub app
   *
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
   * @event VKWebAppGetEmail
   * @platform iOS, Android, Web
   *
   * @returns User email
   */
  public getEmail = async (): Promise<string> => {
    return this.connect.sendPromise('VKWebAppGetEmail').then(data => data.email);
  };

  /**
   * Displays modal with friend select
   *
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
   * @event VKWebAppGetPersonalCard
   * @platform iOS >= 5.4, Android >= 5.24
   *
   * @returns Entered user data
   */
  public getPersonalCard = async (types: PersonalCardType[]): Promise<PersonalCardData> => {
    return this.connect.sendPromise('VKWebAppGetPersonalCard', { type: types });
  };

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
   * @event VKWebAppGetUserInfo
   * @platform iOS, Android, Web
   *
   * @returns User data
   */
  public getUserInfo = async (): Promise<UserInfo> => {
    return this.connect.sendPromise('VKWebAppGetUserInfo');
  };

  /**
   * Opens QR codes and barcodes reader
   *
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
   * event.
   *
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
   * @event VKWebAppShowImages
   * @platform iOS, Android
   */
  public showImages = async (images: string[], start_index?: number) => {
    await this.connect.sendPromise('VKWebAppShowImages', { images, start_index });
  };

  /**
   * Requests adding the app to favorites
   *
   * @event VKWebAppAddToFavorites
   * @platform iOS, Android
   */
  public addToFavorites = async () => {
    await this.connect.sendPromise('VKWebAppAddToFavorites');
  };

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
  public postToWall = async (
    message: string,
    attachments?: string | (string | Attachment)[],
    options?: WallPostOptions
  ): Promise<number> => {
    const params: RequestProps<'VKWebAppShowWallPostBox'> = {
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
}
