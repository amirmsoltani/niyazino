export const createAdvertisingAfterUploadPhotosAction =
  'create advertising after upload photos [None]';

export type CreateAdvertisingAfterUploadPhotosActionType = {
  type: typeof createAdvertisingAfterUploadPhotosAction;
};
const createAdvertisingAfterUploadPhotos =
  (): CreateAdvertisingAfterUploadPhotosActionType => ({
    type: createAdvertisingAfterUploadPhotosAction,
  });

export default createAdvertisingAfterUploadPhotos;
