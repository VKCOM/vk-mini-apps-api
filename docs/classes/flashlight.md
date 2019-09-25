[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Flashlight](flashlight.md)

# Class: Flashlight

Device's flashlight API

## Hierarchy

* VKConnectProvider

  ↳ **Flashlight**

## Index

### Methods

* [flashGetInfo](flashlight.md#flashgetinfo)
* [flashSetLevel](flashlight.md#flashsetlevel)

## Methods

###  flashGetInfo

▸ **flashGetInfo**(): *Promise‹object›*

*Defined in [api/Flashlight.ts:15](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/Flashlight.ts#L15)*

Requests device's flashlight information

**Returns:** *Promise‹object›*

Availability and level of the flashlight

___

###  flashSetLevel

▸ **flashSetLevel**(`level`: number): *Promise‹void›*

*Defined in [api/Flashlight.ts:32](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/Flashlight.ts#L32)*

Sets device's flashlight level

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | number | The flashlight level from 0 to 1  |

**Returns:** *Promise‹void›*
