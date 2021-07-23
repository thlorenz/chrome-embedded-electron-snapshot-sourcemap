$ROOT=Join-Path -Path $PSScriptRoot -ChildPath ".."
$ENV:DEBUG='(packherd|snapgen):*'
$ENV:PROJECT_BASE_DIR=$Root

node $ROOT/scripts/install-snapshot.js

 cd $ROOT
 ./node_modules/.bin/electron --inspect-brk -r ./lib/hook-require.js ./lib/main.js
