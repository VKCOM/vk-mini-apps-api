/**
 * User access scopes
 */
export type UserAccessScope =
  | 'friends' // Access to user's friend list
  | 'photos' // Access to user photos
  | 'video' // Access to user videos
  | 'pages' // Access to wiki-pages
  | 'status' // Access to user status
  | 'notes' // Access to user notes
  | 'wall' // Access to methods of working with user's wall
  | 'docs' // Access to user documents
  | 'groups' // Access to user communities
  | 'stats' // Access to statistics of user groups and applications that they admin
  | 'market'; // Access to market

/**
 * Community access scopes
 */
export type CommunityAccessScope =
  | 'stories' // Access to community stories
  | 'photos' // Access to community photos
  | 'app_widget' // Access to community widgets
  | 'messages' // Access to community messages
  | 'docs' // Access to community documents
  | 'manage'; // Community administration access

/**
 * Status of sub app closing
 */
export type CloseStatus = 'success' | 'failed';

/**
 * Options of wall post publish
 */
export type WallPostOptions = {
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
export type AttachmentType =
  | 'photo' // Photo
  | 'video' // Video
  | 'audio' // Audio
  | 'doc' // Document
  | 'page' // Wiki-page
  | 'note' // Note
  | 'poll' // Poll
  | 'album' // Album
  | 'market' // Market item
  | 'market_album' // Market items
  | 'audio_playlist'; // Playlist with audio

/**
 * Attachment object interface
 */
export type Attachment = {
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
