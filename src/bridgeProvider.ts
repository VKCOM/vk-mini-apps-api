import bridge, { VKBridge, VKBridgeEvent, ReceiveMethodName, ReceiveData } from '@vkontakte/vk-bridge';

/** @ignore */
export abstract class VKBridgeProvider {
  /**
   * VK Bridge interface
   */
  public bridge: VKBridge;

  /** @ignore */
  constructor(customBridge?: VKBridge) {
    this.bridge = customBridge || bridge;
  }

  /**
   * Subscribes to listen events and returns unsubscribe function
   */
  protected subscribeEvent<T extends ReceiveMethodName>(
    methodName: T,
    callback: (data: ReceiveData<T>) => void,
    onSubscribe?: () => void,
    onUnsubscribe?: () => void
  ) {
    const fn = (event: VKBridgeEvent<ReceiveMethodName>) => {
      if (
        event.detail &&
        event.detail.data &&
        event.detail.type.indexOf(methodName) === 0 &&
        !event.detail.type.includes('Failed')
      ) {
        callback(event.detail.data as ReceiveData<T>);
      }
    };

    this.bridge.subscribe(fn);
    if (onSubscribe) {
      onSubscribe();
    }

    return () => {
      this.bridge.unsubscribe(fn);

      if (onUnsubscribe) {
        onUnsubscribe();
      }
    };
  }
}
