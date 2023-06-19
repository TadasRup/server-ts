type Server = {
    init: () => void;
}

const server = {} as Server;

server.init = () => {
    console.log('Inicijuojame serveri...')
}

export { server };
