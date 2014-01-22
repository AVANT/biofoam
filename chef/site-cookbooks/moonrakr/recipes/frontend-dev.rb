execute "apt-get update" do
	action :run
end

package "nginx" do
  action :install
end

service "nginx" do
	 action [ :enable, :start ]
end

cookbook_file "/etc/nginx/sites-available/default" do
	action :create
	source "proxy"
	notifies :restart, resources(:service => "nginx")
end