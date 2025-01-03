# check path
cd ~/Cloud-Native-Final/src/front-end/
echo "pwd: $(pwd)"

# ensure the latest version of the code
echo "git pull"
git pull

# install dependencies and start the server
echo "npm install"
npm install
clear

# start the server
pm2 delete groupup-client
pm2 start "npx expo start -w --non-interactive" --name groupup-client
