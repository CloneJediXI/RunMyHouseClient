function getServer(){
    let server = "localhost";
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      server = "10.0.2.2"
    }
    return server;
}
export default getServer;