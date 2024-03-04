

export default function (server: any): HServer {
    return {
        id: server.id,
        name: server.name,
        status: server.status,
        ipv4: server.public_net.ipv4.ip,
        type: server.server_type.name,
        specs: {
            cores: server.server_type.cores,
            memory: server.server_type.memory,
            disk: server.server_type.disk
        },
        price: {
            hourly: server.server_type.prices[0].price_hourly.net,
            monthly: server.server_type.prices[0].price_monthly.net
        },
        created: server.created
    }
}