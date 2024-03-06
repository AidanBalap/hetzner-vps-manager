

export default function (server: HSServer): HServer {  
    
    if (server.public_net && server.public_net.ipv4 === null) {
        if (server.public_net.ipv6) {
            server.public_net.ipv4 = server.public_net.ipv6
        } else {
            server.public_net.ipv4 = {
                id: 0,
                ip: 'None'
            }
        }
    }

    return {
        id: server.id,
        name: server.name,
        status: server.status,
        ipv4: server.public_net.ipv4.ip || server.public_net.ipv6.ip,
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