/* eslint-disable */

const blockOptions = {
    visible: true,
    secure: false,
    title: true,
    subtitle: true,
    multiline: false
};

const note = {
    salt: 'SKBgR4j28GQdJ5vojaA9MQ',
    icon: {
        type: 'uri',
        data: 'https://cdn.iconscout.com/tch-2-569226.png'
    },
    icon: {
        type: 'file',
        fileId: 456
    },
    icon: {
        type: 'icon',
        data: 'mdi:star',
        color: 'green'
    },
    icon: {
        type: 'figure',
        shape: 'square',
        color: '#fff',
        //bgColor: '#aaa'
    },
    color: '#00ffaa',
    //bgColor: '#aaa',
    blocks: [
        {
            type: 'email',
            name: 'email',
            data: 'qwe@rty.com',
            options: blockOptions
        },
        {
            type: 'file',
            name: 'readme.md',
            // external data
            codeId: 34563,
            size: 46863,
            options: blockOptions
        },
        {
            type: 'file',
            name: 'passwords.txt',
            // embedded data
            data: 'some plain text or base64 encoded binary string',
            size: 345
        },
        {
            type: 'text',
            name: 'description',
            data: 'sdfgjk;l sdf gjk;lsdfg jk;sdf gj',
            options: blockOptions
        },
        {
            type: 'totp',
            name: 'totp',
            data: {
                key: 'dfgh6yhwrru6qqw4et',
                digits: 6,
                interval: 30,
                algorithm: 'sha1'
            },
            options: blockOptions
        },

        {
            type: 'text',
            name: 'id',
            data: '46745320',
            options: blockOptions,
            multiline: false
        },
        {
            type: 'uri',
            name: 'address',
            data: 'https://kap.minjust.gov.ua/',
            options: blockOptions
        },
        {
            type: 'login',
            name: 'login',
            data: 'john',
            options: blockOptions
        },
        {
            type: 'phone',
            name: 'phone',
            data: '+380987009000',
            options: blockOptions
        },
        {
            type: 'password',
            name: 'password',
            data: 'eY9hhfQuEW1O74ofqkXS',
            hidden: true
        },
        {
            type: 'text',
            name: 'description',
            data: 'some long long multiline text',
            format: 'plain',
            multiline: true,
            hidden: true
        },
        {
            type: 'text',
            name: 'markdown',
            data: '# _formatted text_ #',
            multiline: true,
            format: 'markdown',
            hidden: true
        },
        {
            type: 'text',
            name: 'html',
            data: '<b>formatted text</b>',
            multiline: true,
            format: 'html',
            hidden: true
        },
        {
            type: 'card',
            name: 'credit card',
            data: {
                'number': '0000 0000 0000 0000'
            },
            size: 345
        }
    ]
};
