module.exports = {
  port: 8081,
  proxy: { "/": "http://localhost:8090/"},
  navigate: false,
  cache: "false",
  ignore: [/\.s[ac]ss$/i, /\.tsx?$/i],
  
  // mobile development settings
  // not working yet
  // useLocalIp: true,
  // remoteLogs: 'magenta',
  // host: '0.0.0.0',
}