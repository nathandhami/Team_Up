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

# package "nginx"
# cookbook_file "nginx-default" do
#   path "/etc/nginx/sites-available/default"
# end

# service "nginx" do
# 	action :restart
# end


######## Nodejs Config ########

execute 'curl-npm' do
  command 'curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -'
end

package "nodejs"


bash 'npm_global_installation' do
  code <<-EOH
  sudo npm install -g bower
  EOH
end

bash 'install_dependencies' do
  cwd '/home/ubuntu/project/TeamUp/'
  code <<-EOH
  sudo npm --no-bin-links install
  bower install --allow-root
  EOH
end

# bash 'install_npm_dependencies' do
#   cwd '/home/ubuntu/project/TeamUp/'
#   code <<-EOH
#   sudo npm --no-bin-links install
#   sudo npm install bcrypt --no-bin-links
#   sudo npm install -g bower --allow-root
#   sudo bower install --allow-root
#   EOH
# end


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



######## Supervisor Config ########

# bash 'supervisord_config' do
#   code <<-EOH
#   sudo mkdir -p /etc/supervisor.d
#   sudo pip install supervisor
#   EOH
# end

# cookbook_file "supervisord.conf" do
#   path "/etc/supervisord.conf"
# end

# cookbook_file "server.conf" do
#   path "/etc/supervisor.d/server.conf"
# end

# bash 'supervisord_start' do
#   ignore_failure true
#   code <<-EOH
#   sudo supervisord
#   EOH
# end

# bash 'supervisord_kill_ifexists' do
#   code <<-EOH
#   sudo supervisorctl update
#   sudo supervisorctl restart all
#   EOH
# end
