export type RootParamList = {
  welcomeScreen: undefined;
  dashboardScreen: undefined;
  createAdvertisingCategoryScreen: undefined;
  createAdvertisingTitleScreen: undefined;
  createAdvertisingSpecificationsScreen: undefined;
  createAdvertisingAuthorizeScreen: undefined;
  advertisingDetailScreen: {id: number};
  advertisingListScreen: undefined;
  chatListScreen: undefined;
  chatScreen: {
    adId: number;
    adTitle: string;
    adImage?: string;
    userId: number;
    userFirstName?: string;
    userLastName?: string;
  };
  userAdvertisingScreen: undefined;
  userBookmarksScreen: undefined;
};
