import _ from 'lodash';
import commonConfig from './common';

const S3_HOST = 's3.amazonaws.com';
const CATALOG_HOST = 'mq2bsx6jae.execute-api.us-east-1.amazonaws.com';
const QUEUE_HOST = 'oc8208kdrk.execute-api.us-east-1.amazonaws.com';
const PROXY_HOST = 'stage.frontm.ai';

// Overwrite any property as desired.
const stageConfig = {
    bot: {
        baseProtocol: 'https://',
        baseUrl: S3_HOST,
        s3bucket: 'frontm-contentdelivery',
        s3ServiceApi: 's3',
        binaryS3Bucket: 'frontm-conversations',
        catalogHost: CATALOG_HOST,
        catalogPath: '/Development/items',
        catalogServiceApi: 'execute-api'
    },
    network: {
        queueProtocol: 'https://',
        queueHost: QUEUE_HOST,
        queuePath: '/Development/items',
        pingPath: '/ping',
        queueServiceApi: 'execute-api',
        contactsPath: '/contacts',
        channelsPath: '/channels',
        userDetailsPath: '/userDetails'
    },
    proxy: {
        enabled: true,
        host: PROXY_HOST,
        resource_host: '6uj792e685.execute-api.us-east-1.amazonaws.com/stage',
        protocol: 'https://',
        queuePath: '/queueLambda',
        pingPath: '/ping',
        catalogPath: '/catalog',
        authPath: '/auth',
        refreshPath: '/v2/refresh',
        conversationPath: '/conversation',
        signupPath: '/signup/frontm',
        signinPath: '/signin/frontm',
        updateSigninPath: '/v2/updateSignin/frontm',
        deleteUserPath: '/v2/deleteUser',
        newProvider: '/v2/subscribeDomain',
        searchCatalog: '/catalog',
        userInfo: '/user',
        profileImage: '/v2/file/profile-pics/',
        addFavourite: '/users/favourites',
        deleteContacts: '/contactsActions',
        filesAPI:
            'https://6uj792e685.execute-api.us-east-1.amazonaws.com/stage',
        contentURL: 'https://s3.amazonaws.com/frontm-contentdelivery/botLogos/',
        channelLogos: 'channelLogos/'
    },
    grpcURL: 'https://grpcprod.frontm.ai:8080'
};

let config = {};

_.merge(config, commonConfig, stageConfig);

export default config;
