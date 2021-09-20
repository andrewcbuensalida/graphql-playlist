From code along by the Net Ninja on youtube.
Check out my live site at http://books.anhonestobserver.com
Stack: graphql, mongodb atlas, react on aws amplify front end, node on ec2 backend,
I'm for hire. email andrewcbuensalida@gmail.com

trying https://www.youtube.com/watch?v=Buh3GjHPmjo for cicd from github to ec2
cors anywhere creator is having problems. had to click a button to temporarily enable it.
just realized node server had to have a running process for application stop to not crash
and theres a delay in the deploment logs
pkill kills forever and serve
node adds another running server everytime i deploy without pkill
deployment stops at application stop if there is pkill but no running node
cicd goes all the way until the last step. had to manually go into ec2 and serve client
maybe try updating dependencies via npx npm-check-updates -u and npm install
no more need for amplify because of cors expiration.
so weird. the whole cicd works even though it says timeout during the application start phase
npm ci is the key, and old dependencies i guess.
the stdout logs for the deployment are not in order.
but overall its working.
had to put > app.out.log 2> app.err.log < /dev/null & at the end of application start
so that deployment succeeds. everything working now.
need to make timeout at least 300 seconds because application start takes around 4 minutes
just found out the application stop script is from the previous successful deployment
https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#appspec-hooks-server
it runs the application stop from /opt/codedeploy-agent/deployment-root/deployment-instructions
https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
to troubleshoot application stop troubles

trying https://www.youtube.com/watch?v=oykl1Ih9pMg to take out port at the end of url
amazon linux might be like centos
to install nginx on ec2, had to do sudo amazon-linux-extras install nginx1
had to do sudo systemctl start nginx to start nginx
if not found, check path by echo $PATH, check where nginx is by which nginx
if it's not in the path, add nginx to path by adding export PATH="/usr/sbin/nginx:$PATH" to nano ~/.bashrc
then load to current shell source ~/.bashrc
https://linuxize.com/post/how-to-add-directory-to-path-in-linux/
now when i go to ip address, nginx shows up
in etc/nginx/conf.d/ i made a file called books.config
i put this in it
server {
listen 80;
listen [::]:80;
server_name books.anhonestobserver.com www.books.anhonestobserver.com;
location / {
proxy_pass http://localhost:5000/;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
}
from https://medium.com/@ramavathvinayak/deploy-a-node-js-application-on-aws-ec2-with-nginx-as-a-reverse-proxy-e8f41f1edaef
then sudo service nginx restart
now it really works without the port at the end of the url
dont forget the .env or else it will just flash or crash.
very important, the client has to point to 13.250.105.63 instead of local host

now trying ubuntu because couldnt get nginx to run
just found out i cant copy paste into the terminal from vs code.
could work around by copy paste into somewhere else like the search bar, then copy paste into ec2 shell
https://www.youtube.com/watch?v=oykl1Ih9pMg
https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896
Check NGINX config sudo nginx -t
Restart NGINX sudo service nginx restart or should it be systemctl reload nginx
NOW IT'S REALLY REALLY WORKING. well not really. forever isnt starting. thats because my path was wrong.
now it's REALLY REALLY REALLY WORKING.
need to use ubuntu instance, not stupid amazon linux
then follow brad traversy
didnt do the firewall step though

now for enabling https
again following traversy video but certbot didnt work so looking in the comments in the git repo, trying this
"As I was using Ubuntu 18.04, I had to follow these instructions before using sudo add-apt-repository ppa:certbot/certbot.

sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update

And then, install certbot using:

sudo apt-get install certbot python-certbot-nginx"
still certbot command not found
the certificate manager in aws doesnt seem to do anything.
google cloud doesnt do anything when trying to create an ssl for books. maybe because i didnt buy the domain name from them.
trying to just put https in app.js but doesnt work. says POST https://54.169.202.39:4000/graphql net::ERR_SSL_PROTOCOL_ERROR
app engine, firebase, hostgator come with ssl certification, not amazon.
trying the free ssl https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx
other paid ssls cost $5 to hundreds per year.
certificate expires 2021-12-18 but theres auto renew.
it will be mixed content https from http so now you have to change client app to https
protocol error
