[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Ads](ads.md)

# Class: Ads

## Hierarchy

* VKConnectProvider

  ↳ **Ads**

## Index

### Methods

* [onInitAds](ads.md#oninitads)
* [onLoadAds](ads.md#onloadads)

## Methods

###  onInitAds

▸ **onInitAds**(`callback`: function): *(Anonymous function)*

*Defined in [api/Ads.ts:13](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Ads.ts#L13)*

Subscribes a function for listening the `VKWebAppInitAds` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppInitAds"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppInitAds"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onLoadAds

▸ **onLoadAds**(`callback`: function): *(Anonymous function)*

*Defined in [api/Ads.ts:24](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Ads.ts#L24)*

Subscribes a function for listening the `VKWebAppLoadAds` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppLoadAds"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppLoadAds"› |

**Returns:** *(Anonymous function)*

function for unsubscribe
