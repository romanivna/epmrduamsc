export interface ResourceData {
    kind: string;
    videoId: string;
}
export interface ThumbnailsItem {
    height: number;
    width: number;
    url: string;
}
export interface ThumbnailsCollection {
    default: ThumbnailsItem;
    standart: ThumbnailsItem;
}
export interface VideoDetails {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId;
    position: number;
    publishedAt: string;
    resourceId: ResourceData;
    thumbnails: ThumbnailsCollection;
}
