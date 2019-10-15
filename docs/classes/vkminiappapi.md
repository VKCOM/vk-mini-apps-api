
# Class: VKMiniAppAPI

VK Mini apps API. Contains all VK Connect methods separated by categories

## Hierarchy

* VKConnectProvider

  ↳ **VKMiniAppAPI**

## Index

### Common Events

* [initApp](vkminiappapi.md#initapp)

### Common Methods

* [addToFavorites](vkminiappapi.md#addtofavorites)
* [allowNotifications](vkminiappapi.md#allownotifications)
* [callAPIMethod](vkminiappapi.md#callapimethod)
* [closeApp](vkminiappapi.md#closeapp)
* [denyNotifications](vkminiappapi.md#denynotifications)
* [getAuthToken](vkminiappapi.md#getauthtoken)
* [getClientVersion](vkminiappapi.md#getclientversion)
* [getEmail](vkminiappapi.md#getemail)
* [getFriends](vkminiappapi.md#getfriends)
* [getGeodata](vkminiappapi.md#getgeodata)
* [getPersonalCard](vkminiappapi.md#getpersonalcard)
* [getPhoneNumber](vkminiappapi.md#getphonenumber)
* [getUserInfo](vkminiappapi.md#getuserinfo)
* [openApp](vkminiappapi.md#openapp)
* [openCodeReader](vkminiappapi.md#opencodereader)
* [openContacts](vkminiappapi.md#opencontacts)
* [postToWall](vkminiappapi.md#posttowall)
* [shareLink](vkminiappapi.md#sharelink)
* [showImages](vkminiappapi.md#showimages)

### Community Methods

* [addAppToCommunity](vkminiappapi.md#addapptocommunity)
* [allowCommunityMessages](vkminiappapi.md#allowcommunitymessages)
* [getCommunityToken](vkminiappapi.md#getcommunitytoken)
* [joinCommunity](vkminiappapi.md#joincommunity)
* [sendPayloadToCommunity](vkminiappapi.md#sendpayloadtocommunity)
* [showCommunityWidgetPreviewBox](vkminiappapi.md#showcommunitywidgetpreviewbox)

### Direct Games Methods

* [showInviteBox](vkminiappapi.md#showinvitebox)
* [showLeaderBoardBox](vkminiappapi.md#showleaderboardbox)
* [showOrderBox](vkminiappapi.md#showorderbox)
* [showRequestBox](vkminiappapi.md#showrequestbox)

### Flashlight Methods

* [flashGetInfo](vkminiappapi.md#flashgetinfo)
* [flashSetLevel](vkminiappapi.md#flashsetlevel)

### Interface Methods

* [resizeWindow](vkminiappapi.md#resizewindow)
* [scrollTo](vkminiappapi.md#scrollto)
* [setLocationHash](vkminiappapi.md#setlocationhash)
* [setViewSettings](vkminiappapi.md#setviewsettings)

### Lifecycle Methods

* [onUpdateConfig](vkminiappapi.md#onupdateconfig)
* [onViewHide](vkminiappapi.md#onviewhide)
* [onViewRestore](vkminiappapi.md#onviewrestore)

### Storage Methods

* [storageGet](vkminiappapi.md#storageget)
* [storageGetKeys](vkminiappapi.md#storagegetkeys)
* [storageGetMultiple](vkminiappapi.md#storagegetmultiple)
* [storageSet](vkminiappapi.md#storageset)

### Taptic Engine Methods

* [impactOccurred](vkminiappapi.md#impactoccurred)
* [notificationOccurred](vkminiappapi.md#notificationoccurred)
* [selectionChanged](vkminiappapi.md#selectionchanged)

### VK Pay Methods

* [payToCommunity](vkminiappapi.md#paytocommunity)
* [payToUser](vkminiappapi.md#paytouser)
* [transferToCommunity](vkminiappapi.md#transfertocommunity)
* [transferToUser](vkminiappapi.md#transfertouser)

## Common Events

### <a id="initapp" name="initapp"></a>  initApp

• **initApp**(): *void*

Initializes the VK Mini App. Must be called before using any API method

**`platform`** iOS, Android, Web

**Returns:** *void*

## Common Methods

### <a id="addtofavorites" name="addtofavorites"></a>  addToFavorites

▸ **addToFavorites**(): *Promise‹void›*

Requests adding the app to favorites

**Returns:** *Promise‹void›*

___

### <a id="allownotifications" name="allownotifications"></a>  allowNotifications

▸ **allowNotifications**(): *Promise‹void›*

Asks user for permission to send notifications from app

**Returns:** *Promise‹void›*

___

### <a id="callapimethod" name="callapimethod"></a>  callAPIMethod

▸ **callAPIMethod**(`method`: string, `params`: Record‹string, string | number›): *Promise‹any[]›*

Allows you to call a VK API method on behalf of the application.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method` | string | API method name |
`params` | Record‹string, string &#124; number› | Parameters of the method, including access token  |

**Returns:** *Promise‹any[]›*

___

### <a id="closeapp" name="closeapp"></a>  closeApp

▸ **closeApp**(`status`: [CloseStatus](../globals.md#closestatus), `payload?`: any): *Promise‹void›*

Closes sub app opened via the `openApp` method. Sends data to the parent
app if needed.

**Parameters:**

Name | Type |
------ | ------ |
`status` | [CloseStatus](../globals.md#closestatus) |
`payload?` | any |

**Returns:** *Promise‹void›*

___

### <a id="denynotifications" name="denynotifications"></a>  denyNotifications

▸ **denyNotifications**(): *Promise‹void›*

Disallows notifications

**Returns:** *Promise‹void›*

___

### <a id="getauthtoken" name="getauthtoken"></a>  getAuthToken

▸ **getAuthToken**(`appId`: number, `scope?`: [UserAccessScope](../globals.md#useraccessscope)[]): *Promise‹object›*

Requests user's access.

**Parameters:**

Name | Type |
------ | ------ |
`appId` | number |
`scope?` | [UserAccessScope](../globals.md#useraccessscope)[] |

**Returns:** *Promise‹object›*

User's access token and list of accessed scopes

___

### <a id="getclientversion" name="getclientversion"></a>  getClientVersion

▸ **getClientVersion**(): *Promise‹object›*

Returns client's platform and version

**Returns:** *Promise‹object›*

___

### <a id="getemail" name="getemail"></a>  getEmail

▸ **getEmail**(): *Promise‹object›*

Requests user email

**Returns:** *Promise‹object›*

User email and sign of received data

___

### <a id="getfriends" name="getfriends"></a>  getFriends

▸ **getFriends**(`isMultiple?`: undefined | false | true): *Promise‹object[]›*

Displays modal with friend select

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`isMultiple?` | undefined &#124; false &#124; true | Multiple choice |

**Returns:** *Promise‹object[]›*

List of selected users data

___

### <a id="getgeodata" name="getgeodata"></a>  getGeodata

▸ **getGeodata**(): *Promise‹object›*

Requests user geodata

**Returns:** *Promise‹object›*

Object with current user geodata

___

### <a id="getpersonalcard" name="getpersonalcard"></a>  getPersonalCard

▸ **getPersonalCard**(`types`: VKConnect.PersonalCardType[]): *Promise‹VKConnect.PersonalCardData›*

Requests user to enter some contact data. Depending on the specified
parameters, it is possible to request: phone, email, address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`types` | VKConnect.PersonalCardType[] | Array of required data types: `phone`, `email`, `address`  |

**Returns:** *Promise‹VKConnect.PersonalCardData›*

Entered user data

___

### <a id="getphonenumber" name="getphonenumber"></a>  getPhoneNumber

▸ **getPhoneNumber**(): *Promise‹object›*

Requests user's phone number

**Returns:** *Promise‹object›*

Phone number and signature of received phone for server-side
validation. The signature is SHA256 checksum of concatenating next values
App ID, API secret (specified in the settings of your app), User ID,
field name (`phone_number`) and field value.

___

### <a id="getuserinfo" name="getuserinfo"></a>  getUserInfo

▸ **getUserInfo**(): *Promise‹VKConnect.UserInfo›*

Requests the main user data

**Returns:** *Promise‹VKConnect.UserInfo›*

User data

___

### <a id="openapp" name="openapp"></a>  openApp

▸ **openApp**(`appId`: number, `locationHash?`: undefined | string): *Promise‹void›*

Opens sub app

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`appId` | number | App id to open |
`locationHash?` | undefined &#124; string | String in location after `#`  |

**Returns:** *Promise‹void›*

___

### <a id="opencodereader" name="opencodereader"></a>  openCodeReader

▸ **openCodeReader**(): *Promise‹string›*

Opens QR codes and barcodes reader

**Returns:** *Promise‹string›*

Read data

___

### <a id="opencontacts" name="opencontacts"></a>  openContacts

▸ **openContacts**(): *Promise‹object›*

Opens a selecting contact from the contact list on the user's device.
If user has closed the contact list, called the `VKWebAppContactsClosed`

event.

**Returns:** *Promise‹object›*

Selected contact

___

### <a id="posttowall" name="posttowall"></a>  postToWall

▸ **postToWall**(`message`: string, `attachments?`: string | string | object[], `options?`: [WallPostOptions](../globals.md#wallpostoptions)): *Promise‹number›*

Requests the user to post to the wall

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Post message. If you want to publish only attachments, specify an empty string. |
`attachments?` | string &#124; string &#124; object[] | - |
`options?` | [WallPostOptions](../globals.md#wallpostoptions) | - |

**Returns:** *Promise‹number›*

Published post ID

___

### <a id="sharelink" name="sharelink"></a>  shareLink

▸ **shareLink**(`message`: string): *Promise‹object | object | object›*

Requests the user to share a link on their wall

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The link to share |

**Returns:** *Promise‹object | object | object›*

ID of the post with shared link

___

### <a id="showimages" name="showimages"></a>  showImages

▸ **showImages**(`images`: string[], `start_index?`: undefined | number): *Promise‹void›*

Shows specified photos to user

**Parameters:**

Name | Type |
------ | ------ |
`images` | string[] |
`start_index?` | undefined &#124; number |

**Returns:** *Promise‹void›*

___

## Community Methods

### <a id="addapptocommunity" name="addapptocommunity"></a>  addAppToCommunity

▸ **addAppToCommunity**(): *Promise‹number›*

Request to add the app to a community. Opens a community selection dialog

**Returns:** *Promise‹number›*

ID of group to which the app was added

___

### <a id="allowcommunitymessages" name="allowcommunitymessages"></a>  allowCommunityMessages

▸ **allowCommunityMessages**(`communityId`: number, `key?`: undefined | string): *Promise‹void›*

Asks user for permission to send messages from a community

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Id of a community to request permissions for |
`key?` | undefined &#124; string | - |

**Returns:** *Promise‹void›*

___

### <a id="getcommunitytoken" name="getcommunitytoken"></a>  getCommunityToken

▸ **getCommunityToken**(`communityId`: number, `appId`: number, `scope?`: [CommunityAccessScope](../globals.md#communityaccessscope)[]): *Promise‹object›*

Requests community access for working with API on behalf of the community.
The community access token can only be received by its admin.

For further work, get a user access key with the rights `scope=groups`
and make a request to the `groups.get` method with the `filter=admin`
parameter to get a list of identifiers of the administrated communities.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Community ID |
`appId` | number | App ID |
`scope?` | [CommunityAccessScope](../globals.md#communityaccessscope)[] | - |

**Returns:** *Promise‹object›*

Community access token

___

### <a id="joincommunity" name="joincommunity"></a>  joinCommunity

▸ **joinCommunity**(`communityId`: number): *Promise‹void›*

Requests for join a community

**Parameters:**

Name | Type |
------ | ------ |
`communityId` | number |

**Returns:** *Promise‹void›*

___

### <a id="sendpayloadtocommunity" name="sendpayloadtocommunity"></a>  sendPayloadToCommunity

▸ **sendPayloadToCommunity**(`communityId`: number, `payload`: any): *Promise‹void›*

Sends event to a community

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Community ID |
`payload` | any | Any data to send as JSON  |

**Returns:** *Promise‹void›*

___

### <a id="showcommunitywidgetpreviewbox" name="showcommunitywidgetpreviewbox"></a>  showCommunityWidgetPreviewBox

▸ **showCommunityWidgetPreviewBox**(`communityId`: number, `type`: VKConnect.WidgetType, `code`: string): *Promise‹void›*

Sens request to open a screen with a preview of the widget for a
community

**Parameters:**

Name | Type |
------ | ------ |
`communityId` | number |
`type` | VKConnect.WidgetType |
`code` | string |

**Returns:** *Promise‹void›*

___

## Direct Games Methods

### <a id="showinvitebox" name="showinvitebox"></a>  showInviteBox

▸ **showInviteBox**(): *Promise‹void›*

Opens friends list for inviting to the app

**Returns:** *Promise‹void›*

___

### <a id="showleaderboardbox" name="showleaderboardbox"></a>  showLeaderBoardBox

▸ **showLeaderBoardBox**(`userResult`: number): *Promise‹void›*

Shows leaderboard

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userResult` | number | User result  |

**Returns:** *Promise‹void›*

___

### <a id="showorderbox" name="showorderbox"></a>  showOrderBox

▸ **showOrderBox**(`itemName`: string): *Promise‹VKConnect.OrderBoxShowingStatus›*

Shows item order box

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`itemName` | string | Name of product. Will be transmitted in the notification of receipt of product information |

**Returns:** *Promise‹VKConnect.OrderBoxShowingStatus›*

Status of ordering

___

### <a id="showrequestbox" name="showrequestbox"></a>  showRequestBox

▸ **showRequestBox**(`userId`: number, `message`: string, `requestKey?`: undefined | string): *Promise‹object›*

Shows box for sending request to the user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userId` | number | User Id |
`message` | string | Request test |
`requestKey?` | undefined &#124; string | - |

**Returns:** *Promise‹object›*

Success flag and request key

___

## Flashlight Methods

### <a id="flashgetinfo" name="flashgetinfo"></a>  flashGetInfo

▸ **flashGetInfo**(): *Promise‹object›*

Requests device's flashlight information

**Returns:** *Promise‹object›*

Availability and level of the flashlight

___

### <a id="flashsetlevel" name="flashsetlevel"></a>  flashSetLevel

▸ **flashSetLevel**(`level`: number): *Promise‹void›*

Sets device's flashlight level

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | number | The flashlight level from 0 to 1  |

**Returns:** *Promise‹void›*

___

## Interface Methods

### <a id="resizewindow" name="resizewindow"></a>  resizeWindow

▸ **resizeWindow**(`width`: number, `height`: number): *Promise‹object›*

Resizes iframe size in web

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`width` | number | Width of iframe |
`height` | number | - |

**Returns:** *Promise‹object›*

Result size of the iframe

___

### <a id="scrollto" name="scrollto"></a>  scrollTo

▸ **scrollTo**(`offsetTop`: number, `speed`: number): *Promise‹object›*

Scrolls window to specified point

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`offsetTop` | number | - | Offset top |
`speed` | number | 0 | - |

**Returns:** *Promise‹object›*

Offset top and height of window after scroll

___

### <a id="setlocationhash" name="setlocationhash"></a>  setLocationHash

▸ **setLocationHash**(`hash`: string): *Promise‹void›*

Sets location hash to the app (vk.com/app123#hash)

**Parameters:**

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** *Promise‹void›*

___

### <a id="setviewsettings" name="setviewsettings"></a>  setViewSettings

▸ **setViewSettings**(`statusBarStyle`: VKConnect.AppearanceType, `actionBarColor?`: undefined | string): *Promise‹void›*

Changes the appearance of the mini app interface in mobile clients

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`statusBarStyle` | VKConnect.AppearanceType | Status bar style type: `light` or `dark` |
`actionBarColor?` | undefined &#124; string | - |

**Returns:** *Promise‹void›*

___

## Lifecycle Methods

### <a id="onupdateconfig" name="onupdateconfig"></a>  onUpdateConfig

▸ **onUpdateConfig**(`callback`: function): *(Anonymous function)*

Subscribes a function for listening the `VKWebAppUpdateConfig` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppUpdateConfig"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppUpdateConfig"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

### <a id="onviewhide" name="onviewhide"></a>  onViewHide

▸ **onViewHide**(`callback`: function): *(Anonymous function)*

Subscribes a function for listening the `VKWebAppViewHide` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppViewHide"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppViewHide"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

### <a id="onviewrestore" name="onviewrestore"></a>  onViewRestore

▸ **onViewRestore**(`callback`: function): *(Anonymous function)*

Subscribes a function for listening the `VKWebAppViewRestore` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppViewRestore"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppViewRestore"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

## Storage Methods

### <a id="storageget" name="storageget"></a>  storageGet

▸ **storageGet**(`key`: string): *Promise‹string›*

Requests a value from the storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Keys for getting ([a-zA-Z_\-0-9])  |

**Returns:** *Promise‹string›*

The stored value or empty string if the value is not found

___

### <a id="storagegetkeys" name="storagegetkeys"></a>  storageGetKeys

▸ **storageGetKeys**(`count`: number, `offset`: number): *Promise‹string[]›*

Request list of keys of some stored values

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`count` | number | - | Count of keys to get. Max value is 1000 |
`offset` | number | 0 | - |

**Returns:** *Promise‹string[]›*

___

### <a id="storagegetmultiple" name="storagegetmultiple"></a>  storageGetMultiple

▸ **storageGetMultiple**(`keys`: string[]): *Promise‹Record‹string, string››*

Requests multiple values from the storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`keys` | string[] | List of keys for getting ([a-zA-Z_\-0-9])  |

**Returns:** *Promise‹Record‹string, string››*

Map of key-value

___

### <a id="storageset" name="storageset"></a>  storageSet

▸ **storageSet**(`key`: string, `value`: string): *Promise‹void›*

Stores value in storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | The key of value ([a-zA-Z_\-0-9]) |
`value` | string | Value  |

**Returns:** *Promise‹void›*

___

## Taptic Engine Methods

### <a id="impactoccurred" name="impactoccurred"></a>  impactOccurred

▸ **impactOccurred**(`power`: VKConnect.TapticVibrationPowerType): *Promise‹void›*

Triggers impact feedback in Taptic Engine

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`power` | VKConnect.TapticVibrationPowerType | "medium" |

**Returns:** *Promise‹void›*

___

### <a id="notificationoccurred" name="notificationoccurred"></a>  notificationOccurred

▸ **notificationOccurred**(`type`: VKConnect.TapticNotificationType): *Promise‹void›*

Triggers notification feedback in Taptic Engine

**Parameters:**

Name | Type |
------ | ------ |
`type` | VKConnect.TapticNotificationType |

**Returns:** *Promise‹void›*

___

### <a id="selectionchanged" name="selectionchanged"></a>  selectionChanged

▸ **selectionChanged**(): *Promise‹void›*

Triggers selection feedback in Taptic Engine

**Returns:** *Promise‹void›*

___

## VK Pay Methods

### <a id="paytocommunity" name="paytocommunity"></a>  payToCommunity

▸ **payToCommunity**(`amount`: number, `communityId`: number, `appId`: number, `description?`: undefined | string, `data?`: undefined | string): *Promise‹object›*

Requests payment to a specified community of the specified amount
via VK Pay

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | number | The amount of payment in rubles. The minimum value is 1₽ |
`communityId` | number | Community ID |
`appId` | number | App ID |
`description?` | undefined &#124; string | - |
`data?` | undefined &#124; string | - |

**Returns:** *Promise‹object›*

Payment result data

___

### <a id="paytouser" name="paytouser"></a>  payToUser

▸ **payToUser**(`amount`: number, `userId`: number, `appId`: number, `description?`: undefined | string): *Promise‹object›*

Requests payment to a specified user of the specified amount via VK Pay

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | number | The amount of payment in rubles. The minimum value is 1₽ |
`userId` | number | User ID |
`appId` | number | App ID |
`description?` | undefined &#124; string | - |

**Returns:** *Promise‹object›*

Payment result data

___

### <a id="transfertocommunity" name="transfertocommunity"></a>  transferToCommunity

▸ **transferToCommunity**(`communityId`: number, `appId`: number): *Promise‹object›*

Requests transfer an arbitrary amount to a specified community

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Community ID |
`appId` | number | App ID |

**Returns:** *Promise‹object›*

Payment result data

___

### <a id="transfertouser" name="transfertouser"></a>  transferToUser

▸ **transferToUser**(`userId`: number, `appId`: number): *Promise‹object›*

Requests transfer an arbitrary amount to a specified user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userId` | number | User ID to transfer |
`appId` | number | App ID |

**Returns:** *Promise‹object›*

Payment result data
