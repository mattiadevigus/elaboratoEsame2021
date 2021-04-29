exports.getIp = () => {
    let ip = (window.location.host).split(":");
    return ip[0];
}

exports.getPort = () => {
    return 9000;
}