[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Interface](interface.md)

# Class: Interface

## Hierarchy

* VKConnectProvider

  ↳ **Interface**

## Index

### Methods

* [resizeWindow](interface.md#resizewindow)
* [scrollTo](interface.md#scrollto)
* [setLocationHash](interface.md#setlocationhash)
* [setViewSettings](interface.md#setviewsettings)

## Methods

###  resizeWindow

▸ **resizeWindow**(`width`: number, `height`: number): *Promise‹object›*

*Defined in [api/Interface.ts:16](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Interface.ts#L16)*

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

*Defined in [api/Interface.ts:31](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Interface.ts#L31)*

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

*Defined in [api/Interface.ts:40](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Interface.ts#L40)*

Sets location hash to the app (vk.com/app123#hash)

**Parameters:**

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** *Promise‹void›*

___

###  setViewSettings

▸ **setViewSettings**(`statusBarStyle`: AppearanceType, `actionBarColor?`: undefined | string): *Promise‹void›*

*Defined in [api/Interface.ts:53](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Interface.ts#L53)*

Changes the appearance of the mini app interface in mobile clients

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`statusBarStyle` | AppearanceType | Status bar style type: `light` or `dark` |
`actionBarColor?` | undefined &#124; string | - |

**Returns:** *Promise‹void›*
