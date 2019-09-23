/**
 * User access scopes
 */
export declare type UserAccessScope = 'friends' | 'photos' | 'video' | 'pages' | 'status' | 'notes' | 'wall' | 'docs' | 'groups' | 'stats' | 'market';
/**
 * Community access scopes
 */
export declare type CommunityAccessScope = 'stories' | 'photos' | 'app_widget' | 'messages' | 'docs' | 'manage';
/**
 * Status of sub app closing
 */
export declare type CloseStatus = 'success' | 'failed';
/**
 * Options of wall post publish
 */
export declare type WallPostOptions = {
    /**
     * ID of the user or community on whose wall the post is to be
     * published
     */
    ownerId?: number;
    /**
     * `true` - the post posted on behalf of the community will have a
     * signature added (the name of the user who posted the post)
     * `false` - the signature will not be added. The parameter is taken
     * into account only when publishing on the community wall and
     * specifying the from_group parameter. By default, the signature is
     * not added
     */
    isSigned?: boolean;
    /** Latitude, specified in degrees (from -90 to 90) */
    lat?: number;
    /** Longitude, specified in degrees (from -180 to 180) */
    long?: number;
    /** The place ID where the user is marked */
    placeId?: number;
};
/**
 * Type of an attachment
 */
export declare type AttachmentType = 'photo' | 'video' | 'audio' | 'doc' | 'page' | 'note' | 'poll' | 'album' | 'market' | 'market_album' | 'audio_playlist';
/**
 * Attachment object interface
 */
export declare type Attachment = {
    /** Attachment type */
    type: AttachmentType;
    /**
     * The identifier of the owner of the attachment (note that if the object is
     * in the community, this parameter must be negative)
     */
    ownerId: number;
    /**
     * ID of the attachment
     */
    mediaId: number;
};
