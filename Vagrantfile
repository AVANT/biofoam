# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "moonrakr"

  # The url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system.
  config.vm.box_url = "http://vagrant:EbuphyidOu@vagrant.moonrakr.co/base.box"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP. Use ENV variables to allow for multiple setups to run at the same time.
  config.vm.network :private_network, ip: "192.168.33.130"

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--memory", "512"]
    v.customize ["modifyvm", :id, "--cpus", "1"]
  end

   config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = [ "chef/site-cookbooks" ]
    chef.add_recipe "moonrakr::frontend-dev"
  end

end
