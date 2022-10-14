//Use this file to reference application urls in your tests to avoid hard-coding values. Add your own as needed.

const TEST_ENVIRONMENT = {
    LOCAL: "LOCAL",
    DEV: "DEV",
    PROD: "PROD"
}

const env = process.env.TEST_ENVIRONMENT ?? 'DEV'; //default to dev server if null

let APP_URLS = {
    FELLOWSHIP: 'http://localhost:59816/Fellowship',
    AANDOTCOM: 'http://localhost:65200',
    MEMBER_PROFILE: 'http://localhost:52718/MemberProfile',
    MEMBERSHIP_APPLICATION: 'http://localhost:51719/MembershipApplication',
    BRAINANDLIFE: 'https://www.brainandlife.org/',
    MEMBER_SEARCH:'https://webdev.aan.com/membersearch'
}

if(env === TEST_ENVIRONMENT.DEV) {
    APP_URLS.FELLOWSHIP = 'https://webdev.aan.com/Fellowship'
    APP_URLS.AANDOTCOM = 'https://webdev.aan.com'
    APP_URLS.MEMBER_PROFILE = 'https://webdev.aan.com/MemberProfile'
    APP_URLS.MEMBERSHIP_APPLICATION = 'https://webdev.aan.com/MembershipApplication'
    APP_URLS.BRAINANDLIFE = 'https://webdev.brainandlife.org/'
    APP_URLS.MEMBER_SEARCH = 'https://webdev.aan.com/MemberSearch'

} else if(env === TEST_ENVIRONMENT.PROD) {
    APP_URLS.FELLOWSHIP = 'https://www.aan.com/Fellowship'
    APP_URLS.AANDOTCOM = 'https://www.aan.com'
    APP_URLS.MEMBER_PROFILE = 'https://www.aan.com/MemberProfile'
    APP_URLS.MEMBERSHIP_APPLICATION = 'https://www.aan.com/MembershipApplication'
    APP_URLS.BRAINANDLIFE = 'https://www.brainandlife.org/'
    APP_URLS.MEMBER_SEARCH = 'https://www.aan.com/membersearch'
}

module.exports = APP_URLS;


