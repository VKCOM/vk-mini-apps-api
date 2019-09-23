import { VKConnect } from '@vkontakte/vk-connect';
import { Common } from './api/Common';
import { VKPay } from './api/VKPay';
import { Flashlight } from './api/Flashlight';
import { DirectGames } from './api/DirectGames';
import { AppStorage } from './api/AppStorage';
import { TapticEngine } from './api/TapticEngine';
import { Communities } from './api/Community';
import { Interface } from './api/Interface';
import { Ads } from './api/Ads';
/**
 * VK Mini apps API. Contains all VK Connect methods separated by categories
 */
export declare class VKMiniAppAPI {
    private connect;
    constructor(connect: VKConnect);
    /** Common Mini App methods */
    common: Common;
    /** VK Pay methods */
    vkPay: VKPay;
    /** Flashlights methods */
    flashlight: Flashlight;
    /** DirectGames methods */
    directGames: DirectGames;
    /** Storage methods */
    storage: AppStorage;
    /** Taptic Engine methods */
    tapticEngine: TapticEngine;
    /** Interface methods */
    interface: Interface;
    /** Communities methods */
    communities: Communities;
    /** Advertisement methods */
    ads: Ads;
}
