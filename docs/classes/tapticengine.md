[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [TapticEngine](tapticengine.md)

# Class: TapticEngine

Taptic Engine methods

## Hierarchy

* VKConnectProvider

  ↳ **TapticEngine**

## Index

### Methods

* [impactOccurred](tapticengine.md#impactoccurred)
* [notificationOccurred](tapticengine.md#notificationoccurred)
* [selectionChanged](tapticengine.md#selectionchanged)

## Methods

###  impactOccurred

▸ **impactOccurred**(`power`: TapticVibrationPowerType): *Promise‹void›*

*Defined in [api/TapticEngine.ts:14](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/TapticEngine.ts#L14)*

Triggers impact feedback in Taptic Engine

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`power` | TapticVibrationPowerType | "medium" |

**Returns:** *Promise‹void›*

___

###  notificationOccurred

▸ **notificationOccurred**(`type`: TapticNotificationType): *Promise‹void›*

*Defined in [api/TapticEngine.ts:24](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/TapticEngine.ts#L24)*

Triggers notification feedback in Taptic Engine

**Parameters:**

Name | Type |
------ | ------ |
`type` | TapticNotificationType |

**Returns:** *Promise‹void›*

___

###  selectionChanged

▸ **selectionChanged**(): *Promise‹void›*

*Defined in [api/TapticEngine.ts:34](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/TapticEngine.ts#L34)*

Triggers selection feedback in Taptic Engine

**Returns:** *Promise‹void›*
