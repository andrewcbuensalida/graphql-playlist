#!/bin/bash

#navigate into our working directory where we have all our github files
cd /home/ec2-user/express-app/server

#start our node app in the background, exchanged app with script
# node app.js > app.out.log 2> app.err.log < /dev/null & 
forever start app.js

cd /home/ec2-user/express-app/client
serve -s build > app.out.log 2> app.err.log < /dev/null &