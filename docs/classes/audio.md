[vk-mini-apps-api](../README.md) › [Globals](../globals.md) › [Audio](audio.md)

# Class: Audio

Audio methods

## Hierarchy

* VKConnectProvider

  ↳ **Audio**

## Index

### Properties

* [onAudioPaused](audio.md#onaudiopaused)
* [onAudioStopped](audio.md#onaudiostopped)
* [onAudioTrackChanged](audio.md#onaudiotrackchanged)
* [onAudioUnpaused](audio.md#onaudiounpaused)

## Properties

###  onAudioPaused

• **onAudioPaused**: *(Anonymous function)* =  this.createEventListener('VKWebAppAudioPaused')

*Defined in [api/Audio.ts:15](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/Audio.ts#L15)*

Subscribes a function for listening the `VKWebAppAudioPaused` event.

**`platform`** iOS, Android

**`param`** Function to pass received data

**`returns`** function for unsubscribe

___

###  onAudioStopped

• **onAudioStopped**: *(Anonymous function)* =  this.createEventListener('VKWebAppAudioStopped')

*Defined in [api/Audio.ts:25](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/Audio.ts#L25)*

Subscribes a function for listening the `VKWebAppAudioStopped` event.

**`platform`** iOS, Android

**`param`** Function to pass received data

**`returns`** function for unsubscribe

___

###  onAudioTrackChanged

• **onAudioTrackChanged**: *(Anonymous function)* =  this.createEventListener('VKWebAppAudioTrackChanged')

*Defined in [api/Audio.ts:35](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/Audio.ts#L35)*

Subscribes a function for listening the `VKWebAppAudioTrackChanged` event.

**`platform`** iOS, Android

**`param`** Function to pass received data

**`returns`** function for unsubscribe

___

###  onAudioUnpaused

• **onAudioUnpaused**: *(Anonymous function)* =  this.createEventListener('VKWebAppAudioUnpaused')

*Defined in [api/Audio.ts:45](https://github.com/VKCOM/vk-mini-apps-api/blob/b7a8e9b/src/api/Audio.ts#L45)*

Subscribes a function for listening the `VKWebAppAudioUnpaused` event.

**`platform`** iOS, Android

**`param`** Function to pass received data

**`returns`** function for unsubscribe
