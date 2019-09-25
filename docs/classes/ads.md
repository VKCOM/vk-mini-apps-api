[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Ads](ads.md)

# Class: Ads

## Hierarchy

* VKConnectProvider

  ↳ **Ads**

## Index

### Properties

* [onInitAds](ads.md#oninitads)
* [onLoadAds](ads.md#onloadads)

## Properties

###  onInitAds

• **onInitAds**: *(Anonymous function)* =  this.createEventListener('VKWebAppInitAds')

*Defined in [api/Ads.ts:12](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Ads.ts#L12)*

Subscribes a function for listening the `VKWebAppInitAds` event.

**`platform`** iOS, Android, Web

**`param`** Function to pass received data

**`returns`** function for unsubscribe

___

###  onLoadAds

• **onLoadAds**: *(Anonymous function)* =  this.createEventListener('VKWebAppLoadAds')

*Defined in [api/Ads.ts:22](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Ads.ts#L22)*

Subscribes a function for listening the `VKWebAppInitAds` event.

**`platform`** iOS, Android, Web

**`param`** Function to pass received data

**`returns`** function for unsubscribe
