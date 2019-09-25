[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Storage](storage.md)

# Class: Storage

Storage API

## Hierarchy

* VKConnectProvider

  ↳ **Storage**

## Index

### Methods

* [get](storage.md#get)
* [getKeys](storage.md#getkeys)
* [getMultiple](storage.md#getmultiple)
* [set](storage.md#set)

## Methods

###  get

▸ **get**(`key`: string): *Promise‹string›*

*Defined in [api/Storage.ts:17](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Storage.ts#L17)*

Requests a value from the storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Keys for getting ([a-zA-Z_\-0-9])  |

**Returns:** *Promise‹string›*

The stored value or empty string if the value is not found

___

###  getKeys

▸ **getKeys**(`count`: number, `offset`: number): *Promise‹string[]›*

*Defined in [api/Storage.ts:55](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Storage.ts#L55)*

Request list of keys of some stored values

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`count` | number | - | Count of keys to get. Max value is 1000 |
`offset` | number | 0 | - |

**Returns:** *Promise‹string[]›*

___

###  getMultiple

▸ **getMultiple**(`keys`: string[]): *Promise‹Record‹string, string››*

*Defined in [api/Storage.ts:37](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Storage.ts#L37)*

Requests multiple values from the storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`keys` | string[] | List of keys for getting ([a-zA-Z_\-0-9])  |

**Returns:** *Promise‹Record‹string, string››*

Map of key-value

___

###  set

▸ **set**(`key`: string, `value`: string): *Promise‹void›*

*Defined in [api/Storage.ts:70](https://github.com/VKCOM/vk-mini-apps-api/blob/aa96c54/src/api/Storage.ts#L70)*

Stores value in storage

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | The key of value ([a-zA-Z_\-0-9]) |
`value` | string | Value  |

**Returns:** *Promise‹void›*
