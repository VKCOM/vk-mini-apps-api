[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [VKPay](vkpay.md)

# Class: VKPay

VK Pay methods

## Hierarchy

* VKConnectProvider

  ↳ **VKPay**

## Index

### Methods

* [payToCommunity](vkpay.md#paytocommunity)
* [payToUser](vkpay.md#paytouser)
* [transferToCommunity](vkpay.md#transfertocommunity)
* [transferToUser](vkpay.md#transfertouser)

## Methods

###  payToCommunity

▸ **payToCommunity**(`amount`: number, `communityId`: number, `appId`: number, `description?`: undefined | string, `data?`: undefined | string): *Promise‹object›*

*Defined in [api/VKPay.ts:50](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/VKPay.ts#L50)*

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

*Defined in [api/VKPay.ts:21](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/VKPay.ts#L21)*

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

*Defined in [api/VKPay.ts:101](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/VKPay.ts#L101)*

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

*Defined in [api/VKPay.ts:81](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/VKPay.ts#L81)*

Requests transfer an arbitrary amount to a specified user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`userId` | number | User ID to transfer |
`appId` | number | App ID |

**Returns:** *Promise‹object›*

Payment result data
