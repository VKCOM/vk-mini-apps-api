import { TapticVibrationPowerType, TapticNotificationType } from '@vkontakte/vk-connect';
import { VKConnectProvider } from '../VKConnectProvider';

/**
 * Taptic Engine methods
 */
export class TapticEngine extends VKConnectProvider {
  /**
   * Triggers impact feedback in Taptic Engine
   *
   * @event VKWebAppTapticImpactOccurred
   * @platform iOS
   */
  public impactOccurred = async (power: TapticVibrationPowerType = 'medium') => {
    await this.connect.sendPromise('VKWebAppTapticImpactOccurred', { style: power });
  };

  /**
   * Triggers notification feedback in Taptic Engine
   *
   * @event VKWebAppTapticNotificationOccurred
   * @platform iOS
   */
  public notificationOccurred = async (type: TapticNotificationType) => {
    await this.connect.sendPromise('VKWebAppTapticNotificationOccurred', { type });
  };

  /**
   * Triggers selection feedback in Taptic Engine
   *
   * @event VKWebAppTapticSelectionChanged
   * @platform iOS
   */
  public selectionChanged = async () => {
    await this.connect.sendPromise('VKWebAppTapticSelectionChanged');
  };
}
