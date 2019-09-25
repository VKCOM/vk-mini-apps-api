[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Common](common.md)

# Class: Common

Common VK Mini App methods

## Hierarchy

* VKConnectProvider

  ↳ **Common**

## Index

### Methods

* [addToFavorites](common.md#addtofavorites)
* [callAPIMethod](common.md#callapimethod)
* [closeApp](common.md#closeapp)
* [denyNotifications](common.md#denynotifications)
* [getAuthToken](common.md#getauthtoken)
* [getClientVersion](common.md#getclientversion)
* [getEmail](common.md#getemail)
* [getFriends](common.md#getfriends)
* [getGeodata](common.md#getgeodata)
* [getPersonalCard](common.md#getpersonalcard)
* [getPhoneNumber](common.md#getphonenumber)
* [getUserInfo](common.md#getuserinfo)
* [initApp](common.md#initapp)
* [onUpdateConfig](common.md#onupdateconfig)
* [onViewHide](common.md#onviewhide)
* [onViewRestore](common.md#onviewrestore)
* [openApp](common.md#openapp)
* [openCodeReader](common.md#opencodereader)
* [openContacts](common.md#opencontacts)
* [postToWall](common.md#posttowall)
* [shareLink](common.md#sharelink)
* [showImages](common.md#showimages)
* [showMessageBox](common.md#showmessagebox)

## Methods

###  addToFavorites

▸ **addToFavorites**(): *Promise‹void›*

*Defined in [api/Common.ts:323](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L323)*

Requests adding the app to favorites

**Returns:** *Promise‹void›*

___

###  callAPIMethod

▸ **callAPIMethod**(`method`: string, `params`: Record‹string, string | number›): *Promise‹any[]›*

*Defined in [api/Common.ts:89](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L89)*

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

*Defined in [api/Common.ts:105](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L105)*

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

*Defined in [api/Common.ts:71](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L71)*

Disallows notifications

**Returns:** *Promise‹void›*

___

###  getAuthToken

▸ **getAuthToken**(`appId`: number, `scope?`: [UserAccessScope](../globals.md#useraccessscope)[]): *Promise‹object›*

*Defined in [api/Common.ts:123](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L123)*

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

*Defined in [api/Common.ts:146](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L146)*

Returns client's platform and version

**Returns:** *Promise‹object›*

___

###  getEmail

▸ **getEmail**(): *Promise‹object›*

*Defined in [api/Common.ts:174](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L174)*

Requests user email

**Returns:** *Promise‹object›*

User email and sign of received data

___

###  getFriends

▸ **getFriends**(`isMultiple?`: undefined | false | true): *Promise‹object[]›*

*Defined in [api/Common.ts:187](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L187)*

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

*Defined in [api/Common.ts:201](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L201)*

Requests user geodata

**Returns:** *Promise‹object›*

Object with current user geodata

___

###  getPersonalCard

▸ **getPersonalCard**(`types`: PersonalCardType[]): *Promise‹PersonalCardData›*

*Defined in [api/Common.ts:222](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L222)*

Requests user to enter some contact data. Depending on the specified
parameters, it is possible to request: phone, email, address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`types` | PersonalCardType[] | Array of required data types: `phone`, `email`, `address`  |

**Returns:** *Promise‹PersonalCardData›*

Entered user data

___

###  getPhoneNumber

▸ **getPhoneNumber**(): *Promise‹object›*

*Defined in [api/Common.ts:237](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L237)*

Requests user's phone number

**Returns:** *Promise‹object›*

Phone number and signature of received phone for server-side
validation. The signature is SHA256 checksum of concatenating next values
App ID, API secret (specified in the settings of your app), User ID,
field name (`phone_number`) and field value.

___

###  getUserInfo

▸ **getUserInfo**(): *Promise‹UserInfo›*

*Defined in [api/Common.ts:254](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L254)*

Requests the main user data

**Returns:** *Promise‹UserInfo›*

User data

___

###  initApp

▸ **initApp**(): *void*

*Defined in [api/Common.ts:28](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L28)*

Initializes the VK Mini App. Must be called before using any API method

**Returns:** *void*

___

###  onUpdateConfig

▸ **onUpdateConfig**(`callback`: function): *(Anonymous function)*

*Defined in [api/Common.ts:40](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L40)*

Subscribes a function for listening the `VKWebAppUpdateConfig` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppUpdateConfig"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppUpdateConfig"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onViewHide

▸ **onViewHide**(`callback`: function): *(Anonymous function)*

*Defined in [api/Common.ts:51](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L51)*

Subscribes a function for listening the `VKWebAppViewHide` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppViewHide"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppViewHide"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onViewRestore

▸ **onViewRestore**(`callback`: function): *(Anonymous function)*

*Defined in [api/Common.ts:62](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L62)*

Subscribes a function for listening the `VKWebAppViewRestore` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppViewRestore"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppViewRestore"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  openApp

▸ **openApp**(`appId`: number, `locationHash?`: undefined | string): *Promise‹void›*

*Defined in [api/Common.ts:159](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L159)*

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

*Defined in [api/Common.ts:266](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L266)*

Opens QR codes and barcodes reader

**Returns:** *Promise‹string›*

Read data

___

###  openContacts

▸ **openContacts**(): *Promise‹object›*

*Defined in [api/Common.ts:282](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L282)*

Opens a selecting contact from the contact list on the user's device.
If user has closed the contact list, called the `VKWebAppContactsClosed`
event.

**Returns:** *Promise‹object›*

Selected contact

___

###  postToWall

▸ **postToWall**(`message`: string, `attachments?`: string | string | object[], `options?`: [WallPostOptions](../globals.md#wallpostoptions)): *Promise‹number›*

*Defined in [api/Common.ts:345](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L345)*

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

*Defined in [api/Common.ts:301](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L301)*

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

*Defined in [api/Common.ts:313](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L313)*

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

*Defined in [api/Common.ts:376](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Common.ts#L376)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`peerId` | number | - |
`message` | string | - |
`attachments?` | string &#124; string &#124; object[] | - |
`lat?` | undefined &#124; number | - |
`long?` | undefined &#124; number |   |

**Returns:** *Promise‹object›*
