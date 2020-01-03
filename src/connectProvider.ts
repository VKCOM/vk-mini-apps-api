import vkConnect, { VKConnect, VKConnectEvent, ReceiveMethodName, ReceiveData } from '@vkontakte/vk-connect';

/** @ignore */
export abstract class VKConnectProvider {
  /**
   * VK Connect interface
   */
  public connect: VKConnect;

  /** @ignore */
  constructor(customConnect?: VKConnect) {
    this.connect = customConnect || vkConnect;
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
    const fn = (event: VKConnectEvent<ReceiveMethodName>) => {
      if (
        event.detail &&
        event.detail.data &&
        event.detail.type.indexOf(methodName) === 0 &&
        !event.detail.type.includes('Failed')
      ) {
        callback(event.detail.data as ReceiveData<T>);
      }
    };

    this.connect.subscribe(fn);
    if (onSubscribe) {
      onSubscribe();
    }

    return () => {
      this.connect.unsubscribe(fn);

      if (onUnsubscribe) {
        onUnsubscribe();
      }
    };
  }
}
