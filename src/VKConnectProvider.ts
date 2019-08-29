import { VKConnect, VKConnectEvent, ReceiveMethodName, ReceiveData } from '@vkontakte/vk-connect';

/** @ignore */
export abstract class VKConnectProvider {
  /** @ignore */
  constructor(
    /** @ignore */
    protected connect: VKConnect
  ) {}

  /**
   * Subscribes to listen events and returns unsubscribe function
   */
  protected createEventListener<T extends ReceiveMethodName>(methodName: T) {
    return (callback: (data: ReceiveData<T>) => void) => {
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

      return () => this.connect.unsubscribe(fn);
    };
  }
}
