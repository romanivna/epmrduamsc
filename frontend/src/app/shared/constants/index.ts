export const urls = {
  api: {
    mock: {
      credentials: 'api/credentials',
      dictionary: {
        uk: 'api/dictionary-ua',
        en: 'api/dictionary-en',
        ru: 'api/dictionary-ru'
      },
      elementaryEducation: 'api/general-education',
      generalEducation: 'api/general-education',
      musicalEducation: 'api/musical-education',
      schoolInfo: 'api/school',
      socialLinks: 'api/socialLinks',
    },
    prod: {
      applicants: 'applications', // goes through config.json
      albums: 'api/v1/albums',
      alumni: 'api/v1/alumni',
      alumniUpdate: 'api/v1/alumni/update',
      images: 'api/v1/images',
      departments: 'api/v1/departments',
      documents: 'api/v1/documents',
      education: 'api/v1/education',
      ensembles: 'api/v1/ensembles',
      events: 'api/v1/events',
      files: 'api/v1/admission',
      history: 'api/v1/history',
      modalAlbumImages: 'api/v1/serviceimages',
      news: 'api/v1/news',
      login: 'api/v1/login',
      register: 'api/v1/admin/register',
      teachers: 'api/v1/teachers',
      user_preview: 'api/v1/admin/preview',
      delete_user: 'api/v1/admin/remove/',
      update_user: 'api/v1/admin/update/', // put {login}
      get_user: 'api/v1/admin/update/',   //  get {id}
      laureates: 'api/v1/laureates',
      adminLogin: 'admin/login',
    },
  },
  statics: {
    carousel: [
      'assets/carousel/1.jpg',
      'assets/carousel/2.jpg',
      'assets/carousel/3.jpg',
      'assets/carousel/4.jpg'
    ],
  }
};

export const configurations = {
  newsPreview: {
    loadNewsItemsPerRequest: 4,
  },
  eventsPreview: {
    loadEventsItemsPerRequest: 4
  },
  albumsPreview: {
    loadAlbumsItemsPerFirstRequest: 9,
    loadAlbumsItemsPerRequest: 3
  },
  departmentsPreview: {
    loadItemsPerFirstRequest: 5,
    loadItemsPerRequest: 5
  },
  alumni: {
    loadItemsPerFirstRequest: 12,
    loadItemsPerRequest: 8
  },
  laureates: {
    loadItemsPerFirstRequest: 9,
    loadItemsPerRequest: 6
  },
  teachersPreview: {
    loadItemsPerFirstRequest: 6,
    loadItemsPerRequest: 6
  },
};

export const userRoles =  [
  {
    name: 'Content Manager',
    value: 'ROLE_CONTENT_MANAGER'
  },
  {
    name: 'Admin',
    value: 'ROLE_ADMIN'
  }
];

export const localStorageTokens = {
  role: 'role',
  token: 'auth-token',
  login: 'login'
};


export const configurationNewsPreview = {
  newsPreview: {
    loadNewsItemsPerRequest: 4
  }
};

export const configurationEventsPreview = {
  eventsPreview: {
    amountofelements: 8,
    loadEventsItemsPerRequest: 8
  }
};
export const googleApiKey = 'AIzaSyAnFkkWwYuktHed-2JdBnF1iSq_bTvsm2I';
export const channelPlaylistId = 'PLkvRluSKqYxtXk14xe5DjGuhXEZl84BHD';
export const googleMapsApiKey = 'AIzaSyDx6F_OUUjJHQOxdbezkV1a20MjMPkCIPE'; // todo: retrieve prod api key
export const googleMapsUkOptions = '&language=uk&region=UA';
export const googleMapsRuOptions = '&language=ru&region=RU';
export const googleMapsEnOptions = '&language=en&region=US';

export const ckEditorConfig = {
  extraPlugins: 'divarea',
  height: 300,
  autoGrow_maxHeight: 550,
  removeButtons: `Source,Save,NewPage,DocProps,Preview,Print,-,Templates,Copy,Paste,PasteText,PasteFromWord,Language,Undo,\
Redo,Replace,SelectAll,SpellChecker,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,\
CreateDiv,Anchor,BidiRtl,Flash,Iframe,Styles,About,Maximize,ShowBlocks,Font`,
  linkShowAdvancedTab: false,
  linkShowTargetTab: false,
  resize_enabled: false,
  removeDialogTabs: 'image:advanced;image:Link'
};
