[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Audio](audio.md)

# Class: Audio

Audio methods

## Hierarchy

* VKConnectProvider

  ↳ **Audio**

## Index

### Methods

* [onAudioPaused](audio.md#onaudiopaused)
* [onAudioStopped](audio.md#onaudiostopped)
* [onAudioTrackChanged](audio.md#onaudiotrackchanged)
* [onAudioUnpaused](audio.md#onaudiounpaused)

## Methods

###  onAudioPaused

▸ **onAudioPaused**(`callback`: function): *(Anonymous function)*

*Defined in [api/Audio.ts:16](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Audio.ts#L16)*

Subscribes a function for listening the `VKWebAppAudioPaused` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppAudioPaused"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppAudioPaused"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onAudioStopped

▸ **onAudioStopped**(`callback`: function): *(Anonymous function)*

*Defined in [api/Audio.ts:27](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Audio.ts#L27)*

Subscribes a function for listening the `VKWebAppAudioStopped` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppAudioStopped"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppAudioStopped"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onAudioTrackChanged

▸ **onAudioTrackChanged**(`callback`: function): *(Anonymous function)*

*Defined in [api/Audio.ts:38](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Audio.ts#L38)*

Subscribes a function for listening the `VKWebAppAudioTrackChanged` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppAudioTrackChanged"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppAudioTrackChanged"› |

**Returns:** *(Anonymous function)*

function for unsubscribe

___

###  onAudioUnpaused

▸ **onAudioUnpaused**(`callback`: function): *(Anonymous function)*

*Defined in [api/Audio.ts:49](https://github.com/VKCOM/vk-mini-apps-api/blob/434adad/src/api/Audio.ts#L49)*

Subscribes a function for listening the `VKWebAppAudioUnpaused` event.

**Parameters:**

▪ **callback**: *function*

Function to pass received data

▸ (`data`: ReceiveData‹"VKWebAppAudioUnpaused"›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ReceiveData‹"VKWebAppAudioUnpaused"› |

**Returns:** *(Anonymous function)*

function for unsubscribe
