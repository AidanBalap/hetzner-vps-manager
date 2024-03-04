export { HServer };

declare global {
    interface HServer {
        id: number;
        name: string;
        status: string;
        ipv4: string;
        type: string;
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
    }
}