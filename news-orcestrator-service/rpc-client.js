import dnode from 'dnode'

class RPCClient {
    constructor(port, host, method) {
        this.port = port
        this.host = host || 'localhost'
        this.method = method
        this.send = this.send.bind(this)
    }

    send(data) {
        const self = this
        const d = dnode.connect(this.port, this.host)

        return new Promise((resolve, reject) => {
            d.on('remote', (remote) => {
                let input = typeof data === "object" ? JSON.stringify(data) : data
                remote[self.method](input, (result) => {
                    resolve(result)
                    d.end()
                })
            })
            d.on('error', (error) => {
                reject(error)
                d.end()
            })
        })
    }
}

export default RPCClient