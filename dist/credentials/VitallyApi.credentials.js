"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitallyApi = void 0;
class VitallyApi {
    constructor() {
        this.name = 'vitallyApi';
        this.displayName = 'Vitally API';
        this.documentationUrl = 'https://docs.vitally.io/';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
            {
                displayName: 'API URL',
                name: 'apiUrl',
                type: 'string',
                default: 'https://api.vitally.io/v1',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiKey}}',
                },
            },
        };
    }
}
exports.VitallyApi = VitallyApi;
//# sourceMappingURL=VitallyApi.credentials.js.map