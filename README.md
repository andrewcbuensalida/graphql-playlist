From code along by the Net Ninja on youtube.
Check out my live site at http://books.anhonestobserver.com
Stack: graphql, mongodb atlas, react on aws amplify front end, node on ec2 backend,
I'm for hire. email andrewcbuensalida@gmail.com
trying https://www.youtube.com/watch?v=Buh3GjHPmjo for cicd from github to ec2
cors anywhere creator is having problems. had to click a button to temporarily enable it.
just realized node server had to have a running process for application stop to not crash
and theres a delay in the deploment logs
node adds another running server everytime i deploy without pkill
cicd goes all the way until the last step. had to manually go into ec2 and serve client
maybe try updating dependencies via npx npm-check-updates -u and npm install
no more need for amplify because of cors expiration.
so weird. the whole cicd works even though it says timeout during the application start phase
npm ci is the key, and old dependencies i guess.
the stdout logs for the deployment are not in order.
but overall its working.
had to put > app.out.log 2> app.err.log < /dev/null & at the end of application start
so that deployment succeeds. everything working now.
