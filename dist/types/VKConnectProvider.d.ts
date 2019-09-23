import { VKConnect, ReceiveMethodName } from '@vkontakte/vk-connect';
/** @ignore */
export declare abstract class VKConnectProvider {
    /** @ignore */
    protected connect: VKConnect;
    /** @ignore */
    constructor(
    /** @ignore */
    connect: VKConnect);
    /**
     * Subscribes to listen events and returns unsubscribe function
     */
    protected createEventListener<T extends ReceiveMethodName>(methodName: T): (callback: (data: import("@vkontakte/vk-connect").ReceiveDataMap[T]) => void) => () => void;
}
