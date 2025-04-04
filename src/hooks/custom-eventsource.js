import { useUserStore } from '@/stores/useUserStore';
const userStore = useUserStore();
export default class AuthenticationEventSource {
    constructor(url, accessToken, options = {}) {
        this.url = url;
        this.accessToken = accessToken;
        this.options = options;
        this.listeners = new Map();
        this.connect();
    }

    connect() {
        fetch(this.url, {
            headers: {
                'Authorization': `Bearer ${userStore.token}`,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'text/event-stream'
            },
            ...this.options
        }).then(response => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const processStream = ({done, value}) => {
                if (done) return;

                const chunk = decoder.decode(value);
                const events = chunk.split('\n\n');

                events.forEach(event => {
                    if (event) {
                        const parsedEvent = this.parseEvent(event);
                        this.dispatchEvent(parsedEvent);
                    }
                });

                return reader.read().then(processStream);
            };

            return reader.read().then(processStream);
        });
    }

    parseEvent(eventString) {
        const lines = eventString.split('\n');
        const event = {
            data: '',
            type: 'message'
        };

        lines.forEach(line => {
            if (line.startsWith('data: ')) {
                event.data = line.slice(6);
            } else if (line.startsWith('event: ')) {
                event.type = line.slice(7);
            }
        });

        return event;
    }

    addEventListener(type, callback) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, new Set());
        }
        this.listeners.get(type).add(callback);
    }

    dispatchEvent(event) {
        const callbacks = this.listeners.get(event.type);
        if (callbacks) {
            callbacks.forEach(callback => callback(event));
        }
    }

    close() {
        this.listeners.clear();
    }
}
