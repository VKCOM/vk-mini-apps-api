[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [VKMiniAppAPI](vkminiappapi.md)

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
* [onUpdateConfig](vkminiappapi.md#onupdateconfig)
* [onViewHide](vkminiappapi.md#onviewhide)
* [onViewRestore](vkminiappapi.md#onviewrestore)
* [openApp](vkminiappapi.md#openapp)
* [openCodeReader](vkminiappapi.md#opencodereader)
* [openContacts](vkminiappapi.md#opencontacts)
* [postToWall](vkminiappapi.md#posttowall)
* [shareLink](vkminiappapi.md#sharelink)
* [showImages](vkminiappapi.md#showimages)
* [showMessageBox](vkminiappapi.md#showmessagebox)

### Advertisement Methods

* [onInitAds](vkminiappapi.md#oninitads)
* [onLoadAds](vkminiappapi.md#onloadads)

### Audio Methods

* [onAudioPaused](vkminiappapi.md#onaudiopaused)
* [onAudioStopped](vkminiappapi.md#onaudiostopped)
* [onAudioTrackChanged](vkminiappapi.md#onaudiotrackchanged)
* [onAudioUnpaused](vkminiappapi.md#onaudiounpaused)

### Community Methods

* [addAppToCommunity](vkminiappapi.md#addapptocommunity)
* [allowCommunityMessages](vkminiappapi.md#allowcommunitymessages)
* [allowCommunityNotifications](vkminiappapi.md#allowcommunitynotifications)
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

###  initApp

• **initApp**(): *void*

*Defined in [VKMiniAppAPI.ts:25](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L25)*

Initializes the VK Mini App. Must be called before using any API method

**`platform`** iOS, Android, Web

**Returns:** *void*

## Common Methods

###  addToFavorites

▸ **addToFavorites**(): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:343](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L343)*

Requests adding the app to favorites

**Returns:** *Promise‹void›*

___

###  callAPIMethod

▸ **callAPIMethod**(`method`: string, `params`: Record‹string, string | number›): *Promise‹any[]›*

*Defined in [VKMiniAppAPI.ts:94](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L94)*

Allows you to call a VK API method on behalf of the application.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method` | string | API method name |
`params` | Record‹string, string &#124; number› | Parameters of the method, including access token  |

**Returns:** *Promise‹any[]›*

___

###  closeApp

▸ **closeApp**(`status`: [CloseStatus](../globals.md#closestatus), `payload?`: any): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:111](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L111)*

Closes sub app opened via the `openApp` method. Sends data to the parent
app if needed.

**Parameters:**

Name | Type |
------ | ------ |
`status` | [CloseStatus](../globals.md#closestatus) |
`payload?` | any |

**Returns:** *Promise‹void›*

___

###  denyNotifications

▸ **denyNotifications**(): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:75](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L75)*

Disallows notifications

**Returns:** *Promise‹void›*

___

###  getAuthToken

▸ **getAuthToken**(`appId`: number, `scope?`: [UserAccessScope](../globals.md#useraccessscope)[]): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:130](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L130)*

Requests user's access.

**Parameters:**

Name | Type |
------ | ------ |
`appId` | number |
`scope?` | [UserAccessScope](../globals.md#useraccessscope)[] |

**Returns:** *Promise‹object›*

User's access token and list of accessed scopes

___

###  getClientVersion

▸ **getClientVersion**(): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:154](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L154)*

Returns client's platform and version

**Returns:** *Promise‹object›*

___

###  getEmail

▸ **getEmail**(): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:184](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L184)*

Requests user email

**Returns:** *Promise‹object›*

User email and sign of received data

___

###  getFriends

▸ **getFriends**(`isMultiple?`: undefined | false | true): *Promise‹object[]›*

*Defined in [VKMiniAppAPI.ts:198](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L198)*

Displays modal with friend select

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`isMultiple?` | undefined &#124; false &#124; true | Multiple choice |

**Returns:** *Promise‹object[]›*

List of selected users data

___

###  getGeodata

▸ **getGeodata**(): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:213](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L213)*

Requests user geodata

**Returns:** *Promise‹object›*

Object with current user geodata

___

###  getPersonalCard

▸ **getPersonalCard**(`types`: VKConnect.PersonalCardType[]): *Promise‹VKConnect.PersonalCardData›*

*Defined in [VKMiniAppAPI.ts:235](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L235)*

Requests user to enter some contact data. Depending on the specified
parameters, it is possible to request: phone, email, address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`types` | VKConnect.PersonalCardType[] | Array of required data types: `phone`, `email`, `address`  |

**Returns:** *Promise‹VKConnect.PersonalCardData›*

Entered user data

___

###  getPhoneNumber

▸ **getPhoneNumber**(): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:251](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L251)*

Requests user's phone number

**Returns:** *Promise‹object›*

Phone number and signature of received phone for server-side
validation. The signature is SHA256 checksum of concatenating next values
App ID, API secret (specified in the settings of your app), User ID,
field name (`phone_number`) and field value.

___

###  getUserInfo

▸ **getUserInfo**(): *Promise‹VKConnect.UserInfo›*

*Defined in [VKMiniAppAPI.ts:269](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L269)*

Requests the main user data

**Returns:** *Promise‹VKConnect.UserInfo›*

User data

___

###  onUpdateConfig

▸ **onUpdateConfig**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:39](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L39)*

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

###  onViewHide

▸ **onViewHide**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:52](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L52)*

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

###  onViewRestore

▸ **onViewRestore**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:65](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L65)*

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

###  openApp

▸ **openApp**(`appId`: number, `locationHash?`: undefined | string): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:168](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L168)*

Opens sub app

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`appId` | number | App id to open |
`locationHash?` | undefined &#124; string | String in location after `#`  |

**Returns:** *Promise‹void›*

___

###  openCodeReader

▸ **openCodeReader**(): *Promise‹string›*

*Defined in [VKMiniAppAPI.ts:282](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L282)*

Opens QR codes and barcodes reader

**Returns:** *Promise‹string›*

Read data

___

###  openContacts

▸ **openContacts**(): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:299](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L299)*

Opens a selecting contact from the contact list on the user's device.
If user has closed the contact list, called the `VKWebAppContactsClosed`

event.

**Returns:** *Promise‹object›*

Selected contact

___

###  postToWall

▸ **postToWall**(`message`: string, `attachments?`: string | string | object[], `options?`: [WallPostOptions](../globals.md#wallpostoptions)): *Promise‹number›*

*Defined in [VKMiniAppAPI.ts:366](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L366)*

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

###  shareLink

▸ **shareLink**(`message`: string): *Promise‹object | object | object›*

*Defined in [VKMiniAppAPI.ts:319](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L319)*

Requests the user to share a link on their wall

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The link to share |

**Returns:** *Promise‹object | object | object›*

ID of the post with shared link

___

###  showImages

▸ **showImages**(`images`: string[], `start_index?`: undefined | number): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:332](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L332)*

Shows specified photos to user

**Parameters:**

Name | Type |
------ | ------ |
`images` | string[] |
`start_index?` | undefined &#124; number |

**Returns:** *Promise‹void›*

___

###  showMessageBox

▸ **showMessageBox**(`peerId`: number, `message`: string, `attachments?`: string | string | object[], `lat?`: undefined | number, `long?`: undefined | number): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:400](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L400)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`peerId` | number | - |
`message` | string | - |
`attachments?` | string &#124; string &#124; object[] | - |
`lat?` | undefined &#124; number | - |
`long?` | undefined &#124; number |   |

**Returns:** *Promise‹object›*

___

## Advertisement Methods

###  onInitAds

▸ **onInitAds**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:637](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L637)*

Subscribes a function for listening the `VKWebAppInitAds` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppInitAds"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppInitAds"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onLoadAds

▸ **onLoadAds**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:650](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L650)*

Subscribes a function for listening the `VKWebAppLoadAds` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppLoadAds"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppLoadAds"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

## Audio Methods

###  onAudioPaused

▸ **onAudioPaused**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:801](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L801)*

Subscribes a function for listening the `VKWebAppAudioPaused` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppAudioPaused"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppAudioPaused"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onAudioStopped

▸ **onAudioStopped**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:814](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L814)*

Subscribes a function for listening the `VKWebAppAudioStopped` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppAudioStopped"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppAudioStopped"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onAudioTrackChanged

▸ **onAudioTrackChanged**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:827](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L827)*

Subscribes a function for listening the `VKWebAppAudioTrackChanged` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppAudioTrackChanged"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppAudioTrackChanged"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onAudioUnpaused

▸ **onAudioUnpaused**(`callback`: function): *(Anonymous function)*

*Defined in [VKMiniAppAPI.ts:840](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L840)*

Subscribes a function for listening the `VKWebAppAudioUnpaused` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: VKConnect.ReceiveData‹"VKWebAppAudioUnpaused"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | VKConnect.ReceiveData‹"VKWebAppAudioUnpaused"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

## Community Methods

###  addAppToCommunity

▸ **addAppToCommunity**(): *Promise‹number›*

*Defined in [VKMiniAppAPI.ts:430](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L430)*

Request to add the app to a community. Opens a community selection dialog

**Returns:** *Promise‹number›*

ID of group to which the app was added

___

###  allowCommunityMessages

▸ **allowCommunityMessages**(`communityId`: number, `key?`: undefined | string): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:448](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L448)*

Asks user for permission to send messages from a the community

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Id of a community to request permissions for |
`key?` | undefined &#124; string | - |

**Returns:** *Promise‹void›*

___

###  allowCommunityNotifications

▸ **allowCommunityNotifications**(): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:462](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L462)*

Asks the user for permission to send messages from a the community

**Returns:** *Promise‹void›*

___

###  getCommunityToken

▸ **getCommunityToken**(`communityId`: number, `appId`: number, `scope?`: [CommunityAccessScope](../globals.md#communityaccessscope)[]): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:486](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L486)*

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

###  joinCommunity

▸ **joinCommunity**(`communityId`: number): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:527](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L527)*

Requests for join a community

**Parameters:**

Name | Type |
------ | ------ |
`communityId` | number |

**Returns:** *Promise‹void›*

___

###  sendPayloadToCommunity

▸ **sendPayloadToCommunity**(`communityId`: number, `payload`: any): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:546](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L546)*

Sends event to a community

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Community ID |
`payload` | any | Any data to send as JSON  |

**Returns:** *Promise‹void›*

___

###  showCommunityWidgetPreviewBox

▸ **showCommunityWidgetPreviewBox**(`communityId`: number, `type`: VKConnect.WidgetType, `code`: string): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:560](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L560)*

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

###  showInviteBox

▸ **showInviteBox**(): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:850](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L850)*

Opens friends list for inviting to the app

**Returns:** *Promise‹void›*

___

###  showLeaderBoardBox

▸ **showLeaderBoardBox**(`userResult`: number): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:868](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L868)*

Shows leaderboard

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userResult` | number | User result  |

**Returns:** *Promise‹void›*

___

###  showOrderBox

▸ **showOrderBox**(`itemName`: string): *Promise‹VKConnect.OrderBoxShowingStatus›*

*Defined in [VKMiniAppAPI.ts:884](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L884)*

Shows item order box

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`itemName` | string | Name of product. Will be transmitted in the notification of receipt of product information |

**Returns:** *Promise‹VKConnect.OrderBoxShowingStatus›*

Status of ordering

___

###  showRequestBox

▸ **showRequestBox**(`userId`: number, `message`: string, `requestKey?`: undefined | string): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:906](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L906)*

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

###  flashGetInfo

▸ **flashGetInfo**(): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:769](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L769)*

Requests device's flashlight information

**Returns:** *Promise‹object›*

Availability and level of the flashlight

___

###  flashSetLevel

▸ **flashSetLevel**(`level`: number): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:787](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L787)*

Sets device's flashlight level

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | number | The flashlight level from 0 to 1  |

**Returns:** *Promise‹void›*

___

## Interface Methods

###  resizeWindow

▸ **resizeWindow**(`width`: number, `height`: number): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:580](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L580)*

Resizes iframe size in web

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`width` | number | Width of iframe |
`height` | number | - |

**Returns:** *Promise‹object›*

Result size of the iframe

___

###  scrollTo

▸ **scrollTo**(`offsetTop`: number, `speed`: number): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:596](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L596)*

Scrolls window to specified point

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`offsetTop` | number | - | Offset top |
`speed` | number | 0 | - |

**Returns:** *Promise‹object›*

Offset top and height of window after scroll

___

###  setLocationHash

▸ **setLocationHash**(`hash`: string): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:606](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L606)*

Sets location hash to the app (vk.com/app123#hash)

**Parameters:**

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** *Promise‹void›*

___

###  setViewSettings

▸ **setViewSettings**(`statusBarStyle`: VKConnect.AppearanceType, `actionBarColor?`: undefined | string): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:620](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L620)*

Changes the appearance of the mini app interface in mobile clients

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`statusBarStyle` | VKConnect.AppearanceType | Status bar style type: `light` or `dark` |
`actionBarColor?` | undefined &#124; string | - |

**Returns:** *Promise‹void›*

___

## Storage Methods

###  storageGet

▸ **storageGet**(`key`: string): *Promise‹string›*

*Defined in [VKMiniAppAPI.ts:921](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L921)*

Requests a value from the storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Keys for getting ([a-zA-Z_\-0-9])  |

**Returns:** *Promise‹string›*

The stored value or empty string if the value is not found

___

###  storageGetKeys

▸ **storageGetKeys**(`count`: number, `offset`: number): *Promise‹string[]›*

*Defined in [VKMiniAppAPI.ts:961](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L961)*

Request list of keys of some stored values

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`count` | number | - | Count of keys to get. Max value is 1000 |
`offset` | number | 0 | - |

**Returns:** *Promise‹string[]›*

___

###  storageGetMultiple

▸ **storageGetMultiple**(`keys`: string[]): *Promise‹Record‹string, string››*

*Defined in [VKMiniAppAPI.ts:942](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L942)*

Requests multiple values from the storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`keys` | string[] | List of keys for getting ([a-zA-Z_\-0-9])  |

**Returns:** *Promise‹Record‹string, string››*

Map of key-value

___

###  storageSet

▸ **storageSet**(`key`: string, `value`: string): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:977](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L977)*

Stores value in storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | The key of value ([a-zA-Z_\-0-9]) |
`value` | string | Value  |

**Returns:** *Promise‹void›*

___

## Taptic Engine Methods

###  impactOccurred

▸ **impactOccurred**(`power`: VKConnect.TapticVibrationPowerType): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:988](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L988)*

Triggers impact feedback in Taptic Engine

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`power` | VKConnect.TapticVibrationPowerType | "medium" |

**Returns:** *Promise‹void›*

___

###  notificationOccurred

▸ **notificationOccurred**(`type`: VKConnect.TapticNotificationType): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:999](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L999)*

Triggers notification feedback in Taptic Engine

**Parameters:**

Name | Type |
------ | ------ |
`type` | VKConnect.TapticNotificationType |

**Returns:** *Promise‹void›*

___

###  selectionChanged

▸ **selectionChanged**(): *Promise‹void›*

*Defined in [VKMiniAppAPI.ts:1010](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L1010)*

Triggers selection feedback in Taptic Engine

**Returns:** *Promise‹void›*

___

## VK Pay Methods

###  payToCommunity

▸ **payToCommunity**(`amount`: number, `communityId`: number, `appId`: number, `description?`: undefined | string, `data?`: undefined | string): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:697](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L697)*

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

###  payToUser

▸ **payToUser**(`amount`: number, `userId`: number, `appId`: number, `description?`: undefined | string): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:667](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L667)*

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

###  transferToCommunity

▸ **transferToCommunity**(`communityId`: number, `appId`: number): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:750](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L750)*

Requests transfer an arbitrary amount to a specified community

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Community ID |
`appId` | number | App ID |

**Returns:** *Promise‹object›*

Payment result data

___

###  transferToUser

▸ **transferToUser**(`userId`: number, `appId`: number): *Promise‹object›*

*Defined in [VKMiniAppAPI.ts:729](https://github.com/VKCOM/vk-mini-apps-api/blob/0cedf89/src/VKMiniAppAPI.ts#L729)*

Requests transfer an arbitrary amount to a specified user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userId` | number | User ID to transfer |
`appId` | number | App ID |

**Returns:** *Promise‹object›*

Payment result data
