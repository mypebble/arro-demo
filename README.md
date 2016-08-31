# arro-demo
A read-only demo application for the Arro income generation system.

## Copyright
This application is Copyright &copy; SF Software limited t/a Pebble 2015 All Rights Reserved

## Vagrant

To get a Vagrant box with github pages jekyll installed, do the following:

    vagrant up
    vagrant ssh
    jekyll server --watch -P 8124

The first time `vagrant up` is ran this will take about 20 minutes while the VM
is downloaded and setup.

Now http://localhost:8124 on your machine will work :)
