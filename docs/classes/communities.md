[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Communities](communities.md)

# Class: Communities

Communities interactions methods

## Hierarchy

* VKConnectProvider

  ↳ **Communities**

## Index

### Methods

* [addApp](communities.md#addapp)
* [allowMessages](communities.md#allowmessages)
* [allowNotifications](communities.md#allownotifications)
* [getToken](communities.md#gettoken)
* [join](communities.md#join)
* [sendPayload](communities.md#sendpayload)
* [showWidgetPreviewBox](communities.md#showwidgetpreviewbox)

## Methods

###  addApp

▸ **addApp**(): *Promise‹number›*

*Defined in [api/Community.ts:22](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Community.ts#L22)*

Request to add the app to a community. Opens a community selection dialog

**Returns:** *Promise‹number›*

ID of group to which the app was added

___

###  allowMessages

▸ **allowMessages**(`communityId`: number, `key?`: undefined | string): *Promise‹void›*

*Defined in [api/Community.ts:39](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Community.ts#L39)*

Asks user for permission to send messages from a the community

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Id of a community to request permissions for |
`key?` | undefined &#124; string | - |

**Returns:** *Promise‹void›*

___

###  allowNotifications

▸ **allowNotifications**(): *Promise‹void›*

*Defined in [api/Community.ts:52](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Community.ts#L52)*

Asks the user for permission to send messages from a the community

**Returns:** *Promise‹void›*

___

###  getToken

▸ **getToken**(`communityId`: number, `appId`: number, `scope?`: [CommunityAccessScope](../globals.md#communityaccessscope)[]): *Promise‹object›*

*Defined in [api/Community.ts:79](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Community.ts#L79)*

Requests community access for working with API on behalf of the community.
The community access token can only be received by its admin.

For further work, get a user access key with the rights `scope=groups`
and make a request to the `groups.get` method with the `filter=admin`
parameter to get a list of identifiers of the administrated communities.

New universal event

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Community ID |
`appId` | number | App ID |
`scope?` | [CommunityAccessScope](../globals.md#communityaccessscope)[] | - |

**Returns:** *Promise‹object›*

Community access token

___

###  join

▸ **join**(`communityId`: number): *Promise‹void›*

*Defined in [api/Community.ts:119](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Community.ts#L119)*

Requests for join a community

**Parameters:**

Name | Type |
------ | ------ |
`communityId` | number |

**Returns:** *Promise‹void›*

___

###  sendPayload

▸ **sendPayload**(`communityId`: number, `payload`: any): *Promise‹void›*

*Defined in [api/Community.ts:137](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Community.ts#L137)*

Sends event to a community.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`communityId` | number | Community ID |
`payload` | any | Any data to send as JSON  |

**Returns:** *Promise‹void›*

___

###  showWidgetPreviewBox

▸ **showWidgetPreviewBox**(`communityId`: number, `type`: WidgetType, `code`: string): *Promise‹void›*

*Defined in [api/Community.ts:150](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Community.ts#L150)*

Sens request to open a screen with a preview of the widget for a
community

**Parameters:**

Name | Type |
------ | ------ |
`communityId` | number |
`type` | WidgetType |
`code` | string |

**Returns:** *Promise‹void›*
