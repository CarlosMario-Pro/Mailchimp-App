import "dotenv/config"

export default{
  "expo": {
    "name": "Mailchimp App Nest",
    "slug": "Mailchimp App Nest",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/Mailchimp.png",
    "userInterfaceStyle": "auto",
    "splash": {
      "image": "./assets/Mailchimp.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/Mailchimp.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.myapp"
    },
    "web": {
      "favicon": "./assets/Mailchimp.png"
    },
    "scheme": "myapp",
    "extra": {
      LIST_ID: process.env.LIST_ID
    },
  }
}
