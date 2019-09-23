import { TapticVibrationPowerType, TapticNotificationType } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';
/**
 * Taptic Engine methods
 */
export declare class TapticEngine extends VKConnectProvider {
    /**
     * Triggers impact feedback in Taptic Engine
     *
     * @event VKWebAppTapticImpactOccurred
     * @platform iOS
     */
    impactOccurred: (power?: TapticVibrationPowerType) => Promise<void>;
    /**
     * Triggers notification feedback in Taptic Engine
     *
     * @event VKWebAppTapticNotificationOccurred
     * @platform iOS
     */
    notificationOccurred: (type: TapticNotificationType) => Promise<void>;
    /**
     * Triggers selection feedback in Taptic Engine
     *
     * @event VKWebAppTapticSelectionChanged
     * @platform iOS
     */
    selectionChanged: () => Promise<void>;
}
