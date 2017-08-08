# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
end


######## Base configuration recipe in Chef ########

package "wget"
package "ntp"
package "python-software-properties"
package "python-pip"


######## NTP Config ########

cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end

execute 'ntp_restart' do
  command 'service ntp restart'
end

######## NGINX Config ########

package "nginx"
cookbook_file "nginx-default" do
  path "/etc/nginx/sites-available/default"
end

service "nginx" do
	action :restart
end


######## Nodejs Config ########

execute 'curl-npm' do
  command 'curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -'
end

package "nodejs"


bash 'npm_global_installation' do
  code <<-EOH
  sudo npm install -g node-pre-gyp 
  sudo npm install -g bower
  sudo npm install -g pm2
  EOH
end


bash 'install_dependencies' do
  cwd '/home/ubuntu/project/TeamUp/'
  code <<-EOH
  sudo npm --no-bin-links install bcrypt
  sudo npm --no-bin-links install body-parser
  sudo npm --no-bin-links install connect-flash
  sudo npm --no-bin-links install connect-mongo
  sudo npm --no-bin-links install cookie-parser
  sudo npm --no-bin-links install csurf
  sudo npm --no-bin-links install express
  sudo npm --no-bin-links install express-session
  sudo npm --no-bin-links install express-validator
  sudo npm --no-bin-links install helmet
  sudo npm --no-bin-links install lodash
  sudo npm --no-bin-links install moment
  sudo npm --no-bin-links install mongoose
  sudo npm --no-bin-links install mongoose-auto-increment
  sudo npm --no-bin-links install multer
  sudo npm --no-bin-links install nconf
  sudo npm --no-bin-links install nodemailer
  sudo npm --no-bin-links install passport
  sudo npm --no-bin-links install passport-facebook
  sudo npm --no-bin-links install passport-google-oauth
  sudo npm --no-bin-links install passport-local
  sudo npm --no-bin-links install passport-twitter
  sudo npm --no-bin-links install pug
  sudo npm --no-bin-links install serve-favicon
  sudo npm --no-bin-links install shortid
  sudo npm --no-bin-links install socket.io
  sudo npm --no-bin-links install system-sleep
  sudo npm --no-bin-links install winston
  sudo npm --no-bin-links install xss-filters
  bower install --allow-root
  EOH
end


######## MongoDB Config ########

bash 'install_mongodb_and_start' do
  code <<-EOH
  mkdir -p /data/db
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
  echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  sudo service mongod start
  EOH
end


bash 'run-server' do
  cwd '/home/ubuntu/project/TeamUp/'
  ignore_failure true
  code <<-EOH
  sudo pm2 stop all
  sudo pm2 start ./bin/www -p 8080
  EOH
end