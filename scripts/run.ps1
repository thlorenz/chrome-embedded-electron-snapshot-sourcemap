$ROOT=Join-Path -Path $PSScriptRoot -ChildPath ".."
$ENV:DEBUG='(packherd|snapgen):*'
$ENV:PROJECT_BASE_DIR=$Root

 cd $ROOT
 ./node_modules/.bin/electron -r ./lib/hook-require.js ./lib/main.js
