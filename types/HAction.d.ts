export { HAction };

declare global {
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
}