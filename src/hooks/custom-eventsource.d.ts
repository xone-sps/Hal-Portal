export default class AuthenticationEventSource {
    constructor(url: any, accessToken: any, options?: {});
    connect(): void;
    parseEvent(eventString: any): {
        data: string;
        type: string;
    };
    addEventListener(type: any, callback: any): void;
    dispatchEvent(event: any): void;
    close(): void;
}
