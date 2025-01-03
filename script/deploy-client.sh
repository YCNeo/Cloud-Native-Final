cd ~/Cloud-Native-Final/src/front-end/

pm2 delete groupup-client
pm2 start "npx expo start -w --non-interactive" --name groupup-client
