export { HMeta, HAction, HServerList, HRServer, HSServer, HSnapshotList, HSnapshot };

declare global {
    interface HMeta {
        pagination: {
            page: number;
            per_page: number;
            previous_page: number;
            next_page: number;
            last_page: number;
            total_entries: number;
        };
    }

    interface HActionList {
        actions: HAction[];
        meta: HMeta;
    }

    interface HRAction {
        action: HAction;
    }

    interface HAction {
        id: number;
        command: string;
        status: string;
        progress: number;
        started: string;
        finished: string;
        resources: {
            id: number;
            type: string;
        };
        error: {
            code: string;
            message: string;
        }
    }

    interface HServerList {
        servers: HSServer[];
        meta: HMeta;
    }

    // When we fetch a single server, we get a response like this:
    interface HRServer {
        server: HSServer;
    }

    // Most of the data from the server object (the most important imo)
    interface HSServer {
        id: number;
        name: string;
        status: string;
        created: string;
        public_net: {
            ipv4: {
                id: number;
                ip: string;
            };
            ipv6: {
                id: number;
                ip: string;
            };
        };
        server_type: {
            id: number;
            name: string;
            description: string;
            cores: number;
            memory: number;
            disk: number;
            prices: {
                id: number;
                location: string;
                price_hourly: {
                    net: number;
                };
                price_monthly: {
                    net: number;
                };
            }[];
        }
        datacenter: {
            description: string;
            id: number;
            location: {
                id: number;
                name: string;
                description: string;
                country: string;
                city: string;
                latitude: number;
                longitude: number;
                network_zone: string;
            };
        }
        labels: {
            [key: string]: string;
        };
    }

    // Data sent to the client
    interface HServer {
        id: number;
        name: string;
        status: string;
        ipv4: string;
        type: string;
        location: string;
        specs: {
            cores: number;
            memory: number;
            disk: number;
        };
        price: {
            hourly: number;
            monthly: number;
        };
        created: string;
        labels: {
            [key: string]: string;
        };
    }

    interface HSnapshotList {
        images: HSnapshot[];
        meta: HMeta;
    }

    interface HSnapshot {
        id: number;
        description: string;
        image_size: number;
        disk_size: number;
        status: string;
        created_from: {
            id: number;
            name: string;
        };
        os_flavor: string;
        architecture: string;
        labels: {
            [key: string]: string;
        };
    }
}