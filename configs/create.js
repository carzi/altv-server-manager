const cfg = `name = 'alt:V Server'
host = '0.0.0.0'
port = 7788
players = 128
# password = 'ultra-password'
announce = false
# token = 'YOUR_TOKEN'
gamemode = 'Freeroam'
website = 'example.com'
language = 'en'
description = 'alt:V Sample Server'
resources = [ 'main' ]
modules = [ 'js-module' ]
`;

const resource = `type = 'js'
main = 'server/index.js'
client-main = 'client/index.js'
client-files = [ 'client/*', 'shared/*' ]`;

const package = `{
	"type": "module"
}`

module.exports = { cfg, resource, package }