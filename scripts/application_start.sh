#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/express-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/express-app/server

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm ci

#start our node app in the background, exchanged app with script
# node app.js > app.out.log 2> app.err.log < /dev/null & 
forever start app.js

cd /home/ec2-user/express-app/client
npm ci
npm run build
npm install -g server
echo "Finished installing server"
serve -s build
echo "Now serving to 5000"