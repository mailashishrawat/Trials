export interface SamlConfig {
    entityId: string;
    assertionConsumerServiceUrl: string;
    singleLogoutServiceUrl: string;
    certificate: string;
    privateKey: string;
}

export const samlConfig: SamlConfig = {
    entityId: 'your-entity-id',
    assertionConsumerServiceUrl: 'https://your-app.com/saml/acs',
    singleLogoutServiceUrl: 'https://your-app.com/saml/sls',
    certificate: 'your-certificate',
    privateKey: 'your-private-key',
};