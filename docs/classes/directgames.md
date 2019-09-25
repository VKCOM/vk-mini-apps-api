[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [DirectGames](directgames.md)

# Class: DirectGames

DirectGames API

## Hierarchy

* VKConnectProvider

  ↳ **DirectGames**

## Index

### Methods

* [showInviteBox](directgames.md#showinvitebox)
* [showLeaderBoardBox](directgames.md#showleaderboardbox)
* [showOrderBox](directgames.md#showorderbox)
* [showRequestBox](directgames.md#showrequestbox)

## Methods

###  showInviteBox

▸ **showInviteBox**(): *Promise‹void›*

*Defined in [api/DirectGames.ts:14](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/DirectGames.ts#L14)*

Opens friends list for inviting to the app

**Returns:** *Promise‹void›*

___

###  showLeaderBoardBox

▸ **showLeaderBoardBox**(`userResult`: number): *Promise‹void›*

*Defined in [api/DirectGames.ts:31](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/DirectGames.ts#L31)*

Shows leaderboard

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userResult` | number | User result  |

**Returns:** *Promise‹void›*

___

###  showOrderBox

▸ **showOrderBox**(`itemName`: string): *Promise‹OrderBoxShowingStatus›*

*Defined in [api/DirectGames.ts:46](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/DirectGames.ts#L46)*

Shows item order box

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`itemName` | string | Name of product. Will be transmitted in the notification of receipt of product information |

**Returns:** *Promise‹OrderBoxShowingStatus›*

Status of ordering

___

###  showRequestBox

▸ **showRequestBox**(`userId`: number, `message`: string, `requestKey?`: undefined | string): *Promise‹object›*

*Defined in [api/DirectGames.ts:67](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/DirectGames.ts#L67)*

Shows box for sending request to the user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userId` | number | User Id |
`message` | string | Request test |
`requestKey?` | undefined &#124; string | - |

**Returns:** *Promise‹object›*

Success flag and request key
