import { VKConnect, ReceiveMethodName, ReceiveData } from '@vkontakte/vk-connect';
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
    protected subscribeEvent<T extends ReceiveMethodName>(methodName: T, callback: (data: ReceiveData<T>) => void): () => void;
}
