# Server Setup

### Update the system
```sh
sudo apt update && sudo apt -y upgrade && sudo apt -y autoremove
```

### Change user password
```sh
sudo passwd {username}
```

### Create sudo user
```sh
sudo adduser {user}
sudo adduser {user} sudo
```

Create user without home
```sh
sudo adduser --system --no-create-home USERNAME
```

### Install Open SSH server
```sh
sudo apt install openssh-server
```

### Install basic server software
```sh
sudo apt install supervisor htop ufw python3 snapd curl unzip
sudo snap install core && sudo snap refresh core
```

### Generate SSH key
```sh
# Ed25519 algorithm
ssh-keygen -t ed25519 -C christopher.guzman.monsalvo@gmail.com

# 4096 bits
ssh-keygen -t rsa -b 4096 -C christopher.guzman.monsalvo@gmail.com
```

Show ssh key
```sh
# Ed25519 algorithm
cat ~/.ssh/id_ed25519.pub

# 4096 bits
cat ~/.ssh/id_rsa.pub
```

Add git credentials

```sh
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
git config --global core.editor "vim"
```

### Copy SSH ID identity to server
```sh
ssh-copy-id christopher@host.com
```

### Installing Git Prompt
[Repository](https://github.com/magicmonty/bash-git-prompt)
```sh
git clone https://github.com/magicmonty/bash-git-prompt.git ~/.bash-git-prompt --depth=1
```

Edit ~/.bashrc file:
```sh
vim ~/.bashrc
```

Add:
```sh
if [ -f "$HOME/.bash-git-prompt/gitprompt.sh" ]; then
    GIT_PROMPT_ONLY_IN_REPO=1
    source $HOME/.bash-git-prompt/gitprompt.sh
fi
```

Reload the bash:
```sh
. ~/.bashrc
```

# Installing Docker
```sh
sudo apt install docker.io
sudo systemctl enable docker
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

Installing docker-compose
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### Install docker multi-arch support

[Reference](https://www.stereolabs.com/docs/docker/building-arm-container-on-x86/)

```sh
sudo apt-get install qemu binfmt-support qemu-user-static 
```

```sh
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
```

### Install docker registry

```sh
docker run -d -p 5000:5000 --name registry registry:2

or

docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

### Add insecure docker registry
```sh
sudo vim /etc/docker/daemon.json
```

Add:
```sh
{
  "insecure-registries" : [
    "myregistrydomain.com:5000"
  ]
}
```

Restart docker:
```sh
sudo service docker restart
```

# Installing Microk8s

[Microk8s](https://microk8s.io/)

Install microk8s in the master and worker nodes
```sh
sudo snap install microk8s --classic
```

Grant privileges
```sh
sudo usermod -a -G microk8s christopher
sudo chown -f -R christopher ~/.kube
newgrp microk8s
```

Enable DNS
```sh
microk8s enable ingress dns dashboard
```

Allow K8s port
```
sudo ufw allow 16443
```

Add a worker node
```sh
microk8s add-node
```

Export Kubeconfig
```
sudo microk8s kubectl config view --raw > $HOME/.kube/config
```

Copying kubeconfig to local machine
```
scp user@$SERVERIP:~/.kube/config ~/.kube/config
sed -ie "s/127.0.0.1/SERVER_IP_ADDRESS/g" ~/.kube/config
```

Add Ingress for K8s dashboard
```
kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: k8s-dashboard
  namespace: kube-system
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
spec:
  tls:
  - hosts:
    - k8s.iguzman.com.mx
    secretName: k8s-dashboard-cert
  rules:
    - host: k8s.iguzman.com.mx
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: kubernetes-dashboard
                port:
                  number: 443
EOF
```

Get ingress information
```
kubectl -n kube-system get ingress 
```

Delete k8s ingress
```
kubectl delete ingress k8s-dashboard -n kube-system
```


# Install Kubectl
[Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

Get installer
```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Validation
```
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256" && \
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
```

Install Kubectl
```
chmod +x kubectl && \
mkdir -p ~/.local/bin && \
mv ./kubectl ~/.local/bin/kubectl
```

Add kubectl to $PATH
```
vim ~/.bashrc
```

Add:
```
export PATH="~/.local/bin:$PATH"
```


# Install HELM
[HELM](https://helm.sh/docs/intro/install/)
```
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 && \
chmod 700 get_helm.sh && \
./get_helm.sh
```

# Install Cert Manager

Get repo
```
kubectl create namespace cert-manager && \
helm repo add jetstack https://charts.jetstack.io && \
helm repo update
```

Install Cert Manager
```
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.9.1 \
  --set installCRDs=true
```

Deploy Cluster Issuer
```
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
  namespace: cert-manager
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: christopher.guzman.monsalvo@gmail.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
       ingress:
         class: public
EOF
```

# Installing Minikube
```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Install Kubectl
```sh
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

# Installing Open JDK
```sh
sudo apt install -y openjdk-11-jre-headless openjdk-11-jdk-headless
```

View java alternatives
```sh
sudo update-alternatives --display java
```

Uninstall Open Java
```sh
sudo apt-get purge openjdk-*
```

# Installing Java Oracle

[Reference](https://docs.datastax.com/en/jdk-install/doc/jdk-install/installOracleJdkDeb.html)

Create the JDK directory
```sh
sudo mkdir -p /usr/lib/jvm
```

Go to [Oracle web page](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html) and download the JDK file "Linux x64 Compressed Archive" - **jdk-11.0.16_linux-x64_bin.tar.gz**.

Uncompress the JDK file:
```sh
sudo tar zxfv jdk-11.0.16_linux-x64_bin.tar.gz -C /usr/lib/jvm
```

Install the new alternative
```sh
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk-11.0.16/bin/java" 1

sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk-11.0.16/bin/javac" 1
```

Set the new alternative as default
```sh
sudo update-alternatives --set java /usr/lib/jvm/jdk-11.0.16/bin/java
sudo update-alternatives --set javac /usr/lib/jvm/jdk-11.0.16/bin/javac
```

# Installing Gradle

[Reference](https://gradle.org/install/)

Download and unzip gradle from [here](https://gradle.org/install/)

```sh
sudo mkdir /opt/gradle
sudo unzip -d /opt/gradle gradle-7.5.1-bin.zip
```

Add gradle to the PATH environment variable in `.bashrc` file
```sh
vim ~/.bashrc
```

Add:
```sh
export PATH=${PATH}:/opt/gradle/gradle-7.5.1/bin
```

Reload the bash
```sh
. ~/.bashrc
```


# Installing Android SDK

Create the `android-sdk` folder into `/opt` directory
```sh
sudo mkdir /opt/android-sdk
sudo chmod 777 -R /opt/android-sdk
```

Get the android SDK from [here](https://developer.android.com/studio#downloads)

Navigate to 'Command line tools only' and download it.

Unzip and copy it into `/opt/android-sdk/`

```sh
unzip -d /opt/android-sdk commandlinetools-linux-7302050_latest.zip
```

Got to Android SDK and create the latest folder
```sh
cd /opt/android-sdk/cmdline-tools
sudo mkdir latest
```

Move files into latest folder
```sh
sudo mv NOTICE.txt bin/ lib/ source.properties latest/
```

Add env variables to `~/.bashrc` file
```sh
vim ~/.bashrc
```

Add at the end:
```sh
#export ANDROID_SDK_ROOT=/opt/android-sdk #Deprecated
export ANDROID_HOME=/opt/android-sdk
export JAVA_HOME=/usr/lib/jvm/jdk-11.0.16
export PATH=${PATH}:/opt/android-sdk/cmdline-tools/latest/bin
```

Reload the bash
```sh
. ~/.bashrc
```

Install Android SDK

[sdkmanager reference](https://developer.android.com/studio/command-line/sdkmanager)
```sh
sdkmanager "platform-tools" "platforms;android-32" "build-tools;30.0.3"
```

On Windows
```sh
sdkmanager.bat --install "build-tools;32.0.3"
```

Display installed packages
```sh
sdkmanager --list_installed
```

Remove packages
```sh
sdkmanager --uninstall "platforms;android-32" "build-tools;32.0.3"
```

# Data Bases

### Install MySQL
```sh
sudo apt install mysql-server
```

Maria DB
```sh
sudo apt-get install mariadb-server mariadb-client

sudo systemctl stop mariadb.service
sudo systemctl start mariadb.service
sudo systemctl enable mariadb.service

sudo mysql_secure_installation
```

MariaDB configurations
* Enter current password for root (enter for none): Just press the Enter
* Set root password? [Y/n]: Y
* New password: Enter password
* Re-enter new password: Repeat password
* Remove anonymous users? [Y/n]: Y
* Disallow root login remotely? [Y/n]: Y
* Remove test database and access to it? [Y/n]:  Y
* Reload privilege tables now? [Y/n]:  Y

To verify installation:
```sh
sudo mysql -u root -p
```

### Install PHP 7.4 and Related Modules
```sh
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php

sudo apt update

sudo apt install php7.4-fpm php7.4-common php7.4-mysql php7.4-gmp php7.4-curl php7.4-intl php7.4-mbstring php7.4-xmlrpc php7.4-gd php7.4-xml php7.4-cli php7.4-zip
```

# OwnCloud

[Reference](https://websiteforstudents.com/setup-owncloud-on-ubuntu-20-04-18-04-with-nginx-and-lets-encrypt/)

Prepare PHP config for OwnCloud
```sh
sudo vim /etc/php/7.4/fpm/php.ini
```

Enter / update the next configurations:

```sh
file_uploads = On
allow_url_fopen = On
short_open_tag = On
memory_limit = 8G
cgi.fix_pathinfo = 0
upload_max_filesize = 100G
max_execution_time = 360
date.timezone = America/Chicago
```

### Create OwnCloud Database
```sh
sudo mysql -u root -p

CREATE DATABASE owncloud;
CREATE USER 'ownclouduser'@'localhost' IDENTIFIED BY 'new_password_here';
GRANT ALL ON owncloud.* TO 'ownclouduser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

### Download OwnCloud

> See https://owncloud.org/download/

See file [owncloud.conf](./owncloud.conf)

```sh
cd /tmp
wget https://download.owncloud.org/community/owncloud-10.4.1.zip 
unzip owncloud-10.4.1.zip 
sudo mv owncloud /var/www/owncloud

sudo chown -R www-data:www-data /var/www/owncloud/
sudo chmod -R 755 /var/www/owncloud/

# Configure Nginx for OwnCloud
sudo vim /etc/nginx/sites-available/owncloud.conf 
# See owncloud.conf file for configurations

sudo ln -s /etc/nginx/sites-available/owncloud.conf /etc/nginx/sites-enabled/
sudo service nginx restart
sudo systemctl reload php7.4-fpm
```

### Install PostgreSQL
```sh
sudo apt install postgresql postgresql-contrib postgis
```
# Web Servers

### Nginx
```sh
sudo apt install nginx
```

Create app folder and deploy folders
```sh
sudo mkdir /var/www/apps
sudo chmod -R 777 /var/www/apps
cd /var/www/apps
mkdir qa staging master
```

# Apache
```sh
sudo apt install apache2
sudo a2enmod rewrite
sudo a2enmod ssl
sudo apt install php php-cli php-mcrypt libapache2-mod-php php-mysql
sudo apt-get install php-xml
sudo apt-get install php-mbstring
sudo apt-get install php-curl
```

# Python & VirtualEnvs
```sh
sudo apt install libpq-dev python3-dev python3.10-venv build-essential python-setuptools python3-distutils
sudo apt install postgresql-server-dev-all
```

Installing PIP

```sh
wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py
sudo python3 -m pip install virtualenv virtualenvwrapper
```

Create env folder
```sh
sudo mkdir /var/virtualenvs -p && sudo chmod -R 777 /var/virtualenvs
```

Add env variables

```sh
vim ~/.bashrc
```
Add:
```sh
# alias python=python3
# alias pip=pip3
VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export WORKON_HOME=/var/virtualenvs
source /usr/local/bin/virtualenvwrapper.sh
```
Reload the bash:
```sh
. ~/.bashrc
```

### Create virtualenv

Linux
```sh
virtualenv venv
source venv/bin/activate
```

Windows
```sh
virtualenv.exe venv
source ./venv/Scripts/activate
```

### Installing NodeJS

[NodeJS](https://github.com/nodesource/distributions/blob/master/README.md)

[Fix watchers](https://www.nicesnippets.com/blog/solved-system-limit-for-number-of-file-watchers-reached-reactjs)

```sh
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fix watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

# Installing Jenkins

[Reference](https://www.jenkins.io/doc/book/installing/linux/)

```sh
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -

# Or

wget -qO - https://pkg.jenkins.io/debian-stable/jenkins.io.key |
  sudo gpg --no-default-keyring --keyring gnupg-ring:/etc/apt/trusted.gpg.d/jenkins.gpg --import -
  
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt update && sudo apt -y install jenkins
```

## Installing Jenkins via Docker

Use the docker-compose file in the jenkins folder

```sh
docker-compose -f jenkins-docker-compose.yaml up -d
```

[Configure Nginx for jenkins](https://www.jenkins.io/doc/book/system-administration/reverse-proxy-configuration-nginx/)


Create SSH key for jenkins

See file [jenkins.conf](./jenkins.conf)

[Reference](https://devops4solutions.medium.com/setup-ssh-between-jenkins-and-github-6ec7c7933244)

```sh
sudo -su jenkins
ssh-keygen
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
```

Get public Key to be set in Github

```sh
sudo cat /var/lib/jenkins/.ssh/id_rsa.pub
```

Get private key to be set in Jenkins

```sh
sudo cat /var/lib/jenkins/.ssh/id_rsa
```

Run sudo on Jenkins without password

[Reference](https://sgoyal.net/2016/11/18/run-a-shell-from-jenkins-using-sudo-ubuntu/)

```sh
sudo visudo -f /etc/sudoers
```

Add:

```sh
jenkins ALL=(ALL) NOPASSWD: ALL
```

Save and run sudo commands with Jenkins and not pass any password


# Apache Cordova

[Reference](https://cordova.apache.org/)

Install Apache Cordova globally
```sh
sudo npm install -g cordova
```

Create Cordova App
```sh
cordova create cordova-app
```

Add platforms
```sh
cd cordova-app
cordova platform add browser
cordova platform add android@11.0.0
```

Run in the browser
```sh
cordova run browser
```

Build android App
```sh
cordova build android
```


### Production Android App build

Set env variables
```sh
export KEYSTORE_PASSWORD=<PASSWORD>
```

Generate app.keystore
```sh
$JAVA_HOME/bin/keytool -genkey -v \
  -keystore app.keystore \
  -alias app \
  -keyalg RSA \
  -keysize 4096 \
  -storepass $KEYSTORE_PASSWORD \
  -validity 10000
```

Build
```sh
cordova build android --release -- \
  --keystore=app.keystore \
  --storePassword=$KEYSTORE_PASSWORD \
  --password=$KEYSTORE_PASSWORD \
  --alias=app \
  --packageType=bundle
```

Sign build
```sh
$JAVA_HOME/bin/jarsigner -verbose \
  -sigalg SHA256withRSA -digestalg SHA \
  -keystore app.keystore \
  -storepass $KEYSTORE_PASSWORD \
  platforms/android/app/build/outputs/bundle/release/app-release.aab \
  app
```

Copy build
```sh
cp android/platforms/android/app/build/outputs/bundle/release/app-release.aab .
```



# Create a React App with TypeScript

[Reference to create React App](https://create-react-app.dev/docs/adding-typescript/)

[Reference to add Sass](https://www.cluemediator.com/how-to-add-sass-or-scss-in-react)

Create the app and add Sass

```sh
npx create-react-app my-app --template typescript
npm i node-sass
```


# Working with MySQL

Login into the shell
```sh
mysql -h localhost -u root -p
```
Switch to DB
```sh
mysql> use mysql;
```
Change user password
```sh
mysql> SET PASSWORD FOR 'user'@'hostname' = PASSWORD('new-password');
mysql> FLUSH PRIVILEGES;
```

Create MySQL user
```sh
mysql> CREATE USER 'user'@'localhost' IDENTIFIED BY 'password'
mysql> GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost';
mysql> FLUSH PRIVILEGES;
```
Delete user
```sh
mysql> DROP USER 'user@'localhost';
```


# Working with PostgreSQL

Login into the shell
```sh
sudo -su postgres
psql
```

Common actions:
```sh
# Connect to DB
\c DBNAME

# List tables
\dt

# Create user
CREATE USER root PASSWORD 'root';

# Create Database
CREATE DATABASE sample WITH OWNER root;
GRANT ALL PRIVILEGES ON DATABASE sample TO root;

#Delete database
DROP DATABASE sample;
```

### Backup database
[Reference](https://www.digitalocean.com/community/tutorials/how-to-backup-postgresql-databases-on-an-ubuntu-vps)
```sh
sudo su - postgres
pg_dump postgres > postgres_db.bak
createdb -T template0 restored_database
psql restored_database < database.bak
```

Postgres backup from Docker
```
docker exec -it DOCKER-CONTAINER /usr/local/bin/pg_dump DATA-BASE-NAME -U DATA-BASE-USER > backup.bak
```

### Restore DB in docker container

First we need to enter into the docker container

List docker containers
```sh
docker ps
```

Copy the backup DB into the docker container
```sh
docker cp my-backup-file.sql [docker-container-id]:/
```

Enter into a docker container
```sh
docker exec -it [docker-container-id] /bin/bash
```

Restore the DB
```sh
cat my-backup-file.sql | psql -U my-db-user
```

### Using PostGIS
[Reference](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postgis-on-ubuntu-14-04)
```sh
sudo -su postgres
psql -d DATABASE_NAME
CREATE EXTENSION postgis;
SELECT PostGIS_version();
```

# MongoDB

Dump Mongo DB
```sh
sudo mongodump --db newdb
```

DB backups

[Reference](https://www.digitalocean.com/community/tutorials/how-to-back-up-restore-and-migrate-a-mongodb-database-on-ubuntu-14-04)

```sh
sudo mkdir /var/backups/mongobackups
```

Single backup
```sh
sudo mongodump --db newdb --out /var/backups/mongobackups/`date +"%m-%d-%y"`

```

MongoDB backups with crontab
```sh
sudo crontab -e
```

Add:
```sh
3 3 * * * mongodump --out /var/backups/mongobackups/`date +"%m-%d-%y"`
```

Restore Mongo DB
```sh
sudo mongorestore --db newdb --drop /var/backups/mongobackups/01-20-16/newdb/
```

# Installing Postfix

Check hostname
```sh
hostname -f
```

Update hostname with FQDN:
```sh
sudo hostnamectl set-hostname mail.iguzman.com.mx
```

Add subdomain and MX record to DNS
```sh
# A
A mail 51.222.9.15

# MX
MX record @ mail.iguzman.com.mx
```

Add SPF record
```sh
TXT	mail	v=spf1 a:mail.iguzman.com.mx ip4:51.222.9.15 ~all 1 Hour
```

Update reverse DNS in VPS provider

Check reverse DNS
```sh
dig -x 51.222.9.15 +short
```

Install Postfix
[Reference](https://www.linuxbabe.com/mail-server/setup-basic-postfix-mail-sever-ubuntu)
```sh
sudo apt update && \
sudo apt -y install postfix
```

System mail name: iguzman.com.mx

Unblock port 25
```sh
sudo ufw allow 25/tcp
```

Install DKIM
[Reference](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy)
[Reference](https://easydmarc.com/blog/how-to-configure-dkim-opendkim-with-postfix/)
```sh
sudo apt -y install opendkim opendkim-tools postfix-policyd-spf-python mailutils
```

Edit the Postfix master process configuration file
```sh
sudo vim /etc/postfix/master.cf
```

Add the following lines at the end of the file
```sh
policyd-spf  unix  -       n       n       -       0       spawn
  user=policyd-spf argv=/usr/bin/policyd-spf
```

Edit Postfix main configuration file
```sh
sudo vim /etc/postfix/main.cf
```

Append the following lines at the end of the file
```sh
policyd-spf_time_limit = 3600
smtpd_recipient_restrictions =
  permit_mynetworks,
  permit_sasl_authenticated,
  reject_unauth_destination,
  check_policy_service unix:private/policyd-spf
```

Restart Postfix
```sh
sudo service postfix restart
```

Edit the opendkim config file and replace every instance of example.com with iguzman.com.mx
```sh
sudo vim /etc/opendkim.conf
```

Append the following lines to the end of the config file
```sh
AutoRestart             Yes
AutoRestartRate         10/1h
UMask                   002
Syslog                  yes
SyslogSuccess           Yes
LogWhy                  Yes

Canonicalization        relaxed/simple

ExternalIgnoreList      refile:/etc/opendkim/TrustedHosts
InternalHosts           refile:/etc/opendkim/TrustedHosts
KeyTable                refile:/etc/opendkim/KeyTable
SigningTable            refile:/etc/opendkim/SigningTable

Mode                    sv
PidFile                 /var/run/opendkim/opendkim.pid
SignatureAlgorithm      rsa-sha256

UserID                  opendkim:opendkim

Socket                  inet:12301@localhost
```

Add Socket
```sh
sudo vim /etc/default/opendkim
```

Add the following line
```sh
SOCKET="inet:12301@localhost"
```

Configure postfix to use this milter:
```sh
sudo nano /etc/postfix/main.cf
```

Add:
```sh
milter_protocol = 2
milter_default_action = accept
smtpd_milters = unix:/spamass/spamass.sock, inet:localhost:12301
non_smtpd_milters = unix:/spamass/spamass.sock, inet:localhost:12301
smtpd_milters = inet:localhost:12301
non_smtpd_milters = inet:localhost:12301
```

Create cert directories
```sh
sudo mkdir /etc/opendkim /etc/opendkim/keys
```

Specify trusted hosts:
```sh
sudo vim /etc/opendkim/TrustedHosts
```

Add:
```sh
127.0.0.1
localhost
192.168.0.1/24
::1
*.iguzman.com.mx
```

Create a key table:
```sh
sudo vim /etc/opendkim/KeyTable
```

Add:
```sh
mail._domainkey.iguzman.com.mx iguzman.com.mx:mail:/etc/opendkim/keys/iguzman.com.mx/mail.private
```

Create a signing table:
```sh
sudo vim /etc/opendkim/SigningTable
```

Add:
```sh
*@iguzman.com.mx mail._domainkey.iguzman.com.mx
```

Create a separate folder for the domain to hold the keys:
```sh
cd /etc/opendkim/keys && sudo mkdir iguzman.com.mx && cd iguzman.com.mx
```

Generate keys using opendkim-genkey tool
```sh
sudo opendkim-genkey -b 2048 -d iguzman.com.mx -D /etc/opendkim/keys/iguzman.com.mx -s mail -v
```

Make opendkim the key owner
```sh
sudo chown opendkim:opendkim /etc/opendkim/keys -R
```

Get and display the Public Key
```sh
sudo cat /etc/opendkim/keys/iguzman.com.mx/mail.txt
```

Restart OpenDKIM and Postfix
```sh
sudo service opendkim restart && sudo service postfix restart
```

Send email
```sh
sendmail christopher.guzman.monsalvo@gmail.com
```

See logs
```sh
sudo cat /var/log/mail.log
```

Creating Email Alias
```sh
sudo vim /etc/aliases
```

Add christopher alias
```sh
root:   christopher
```

Rebuild aliases
```sh
sudo newaliases
```

DKIM record checker
```sh
https://easydmarc.com/tools/dkim-lookup
```

SPF checker
```sh
https://mxtoolbox.com/SuperTool.aspx?action=spf%3aiguzman.com.mx&run=toolpage
```

Open Ports in Firewall
```sh
sudo ufw allow 80,443,587,465,143,993/tcp
```

Install certbot
```sh
sudo apt update && sudo apt install snapd && \
sudo snap install --classic certbot && \
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Install Nginx
```sh
sudo apt -y install nginx
```

Create the virtual host file:
```sh
sudo vim /etc/nginx/sites-available/mail.iguzman.com.mx.conf
```

Add:
```sh
server {
  listen 80;
  listen [::]:80;
  server_name mail.iguzman.com.mx;

  root /usr/share/nginx/html/;

  location ~ /.well-known/acme-challenge {
    allow all;
  }
}
```

Add html folder
```sh
sudo mkdir -p /usr/share/nginx/html/
```

Create link
```sh
sudo ln -s /etc/nginx/sites-available/mail.iguzman.com.mx.conf \
/etc/nginx/sites-enabled
```

Restart Nginx
```sh
sudo nginx -t
sudo service nginx restart
```

Get certificate
```sh
sudo certbot certonly -a nginx --agree-tos \
--no-eff-email --staple-ocsp \
--email christopher.guzman.monsalvo@gmail.com \
-d mail.iguzman.com.mx
```

Edit the master.cf file
```sh
sudo vim /etc/postfix/master.cf
```

In submission section, uncomment or add the following lines
```sh
submission     inet     n    -    y    -    -    smtpd
  -o syslog_name=postfix/submission
  -o smtpd_tls_security_level=encrypt
  -o smtpd_tls_wrappermode=no
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o smtpd_recipient_restrictions=permit_mynetworks,permit_sasl_authenticated,reject
  -o smtpd_sasl_type=dovecot
  -o smtpd_sasl_path=private/auth
```
And
```sh
smtps     inet  n       -       y       -       -       smtpd
  -o syslog_name=postfix/smtps
  -o smtpd_tls_wrappermode=yes
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o smtpd_recipient_restrictions=permit_mynetworks,permit_sasl_authenticated,reject
  -o smtpd_sasl_type=dovecot
  -o smtpd_sasl_path=private/auth
```

Edit main.cf file
```sh
sudo vim /etc/postfix/main.cf
```

Replace  mail.your-domain.com with mail.iguzman.com.mx
```sh
smtpd_tls_cert_file=/etc/letsencrypt/live/mail.iguzman.com.mx/fullchain.pem
smtpd_tls_key_file=/etc/letsencrypt/live/mail.iguzman.com.mx/privkey.pem
```

Restart postfix
```sh
sudo service postfix restart
```

Installing Dovecot IMAP Server
```sh
sudo apt -y install dovecot-core dovecot-imapd
```

Check Dovecot version
```sh
dovecot --version
```

Enabling IMAP Protocol
```sh
sudo vim /etc/dovecot/dovecot.conf
```

Add the following line to enable IMAP protocol.
```sh
protocols = imap
```

Edit dovecot config file
```sh
sudo vim /etc/dovecot/conf.d/10-mail.conf
```

Change it to the following to make Dovecot use the Maildir format.
Email messages will be stored under the Maildir directory under each
user’s home directory.
```sh
mail_location = maildir:~/Maildir
```

Then add dovecot to the mail group so that Dovecot can read the INBOX.
```sh
sudo adduser dovecot mail
```

Using Dovecot to Deliver Email to Message Store
Install the Dovecot LMTP Server.
```sh
sudo apt install dovecot-lmtpd
```

Edit the Dovecot main configuration file.
```sh
sudo vim /etc/dovecot/dovecot.conf
```

Add lmtp to the supported protocols.
```sh
protocols = imap lmtp
```

Edit the Dovecot 10-master.conf file.
```sh
sudo vim /etc/dovecot/conf.d/10-master.conf
```

Change the lmtp service definition to the following.
```sh
service lmtp {
 unix_listener /var/spool/postfix/private/dovecot-lmtp {
   mode = 0600
   user = postfix
   group = postfix
  }
}
```

Edit the Postfix main configuration file.
```sh
sudo vim /etc/postfix/main.cf
```

Add the following lines at the end of the file
```sh
mailbox_transport = lmtp:unix:private/dovecot-lmtp
smtputf8_enable = no
```

Configuring Authentication Mechanism
Edit the authentication config file.
```sh
sudo vim /etc/dovecot/conf.d/10-auth.conf
```
# Working with Supervisor

Create a file
```sh
sudo vim /etc/supervisor/conf.d/long_script.conf
```

Add:
```sh
[program:long_script]
directory=/home/user/
command=long.sh
autostart=true
autorestart=true
stderr_logfile=/var/log/long.err.log
stdout_logfile=/var/log/long.out.log
```

Reload the system
```sh
sudo supervisorctl reread
sudo supervisorctl update
```

Status, stop and start workers
```sh
sudo supervisorctl status
sudo supervisorctl stop <name>
sudo supervisorctl start <name>
sudo supervisorctl restart <name>
```

# Google email SMTP server

[DisplayUnlockCaptcha](https://accounts.google.com/DisplayUnlockCaptcha)

[lesssecureapps](https://www.google.com/settings/security/lesssecureapps)


# Setting up UWF firewall

[Reference](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)

```sh
sudo ufw status
```

Allow or deny ports or apps
```sh
sudo ufw allow ssh
sudo ufw allow 22/tcp
sudo ufw allow 443/tcp
sudo ufw allow 80/tc
sudo ufw deny 80/tcp
sudo ufw delete allow ssh
sudo ufw delete allow 80/tcp
sudo ufw status numbered
```

See the list of apps
```sh
sudo ufw app list
```

Enable / disable firewall
```sh
sudo ufw disable
sudo ufw enable
```

# Backup and install PIP requirements

```sh
pip freeze -l > requiriments.txt
pip install -r requiriments.txt
```

# Working with VirtualEnv

Use a virtualenv
```sh
workon <name>
```

List all virtualenv
```sh
workon
```

Create a virtualenv
```sh
mkvirtualenv -p /usr/bin/python3 <name>
```

Delete a virtualenv
```sh
rmvirtualenv <name>
```

# Supervisor + GUInicorn + Django

```sh
[program:app]
command=/home/${user}/.virtualenvs/app/bin/gunicorn --bind 0.0.0.0:4001 --workers 1 --reload  webpage.wsgi:application
directory=/var/www/apps/app/webpage/
autostart=true
autorestart=true
stderr_logfile=/var/log/apps/app/error.log
stdout_logfile=/var/log/apps/app/output.log
```


# Adding GZIP to Nginx

[Reference](https://www.digitalocean.com/community/tutorials/how-to-add-the-gzip-module-to-nginx-on-ubuntu-14-04)

```sh
sudo nano /etc/nginx/nginx.conf
```

Add:
```sh
gzip on;
gzip_disable "msie6";

gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;
```


# Nginx proxy configuration
```sh
server {
  listen   80;

  server_name iguzman.com www.iguzman.com.mx;

  location /static/ {
    autoindex on;
    expires 30d;
    add_header Vary Accept-Encoding;
    access_log off;
    alias /var/www/apps/iguzman/webpage/static/;
  }

  location / {
    proxy_pass http://127.0.0.1:4000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```


# SSL Free certificates

Installing Certbot on Nginx

[Reference](https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx)


Verifying Snap
```sh
sudo apt update && sudo apt install snapd
```

Installing certbot
```sh
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Adding certificate to Apache server:
```sh
sudo certbot --apache -d example.com -d www.example.com
sudo service apahce2 restart
```

Adding certificate to Nginx server
``` sh
sudo certbot --nginx -d example.com -d www.example.com
sudo service nginx restart
```

Renewing certificates automatically

```sh
sudo certbot renew --dry-run
```

```sh
sudo crontab -e
```

Add:
```sh
15 3 * * * /usr/bin/certbot renew --quiet
```


### Battery information from command line
[Reference](https://www.linuxjournal.com/content/how-check-battery-status-using-linux-command-line)

```sh
upower -i `upower -e | grep 'BAT'`
```

State, time to empty and percentage
```sh
upower -i $(upower -e | grep BAT) | grep --color=never -E "state|to\ full|to\ empty|percentage"
```

### Linux server laptop lid behavior
Edit the `/etc/systemd/logind.conf` file and modify the line:

```sh
#HandleLidSwitch=suspend
```
to
```sh
HandleLidSwitch=ignore
```

Additionally, ensure that the file also has this line:

```sh
LidSwitchIgnoreInhibited=no
```

Then restart the OS via:

```sh
sudo service systemd-logind restart
```

### Mount drive in Linux
[Reference](https://confluence.jaytaala.com/display/TKB/Mount+drive+in+linux+and+set+auto-mount+at+boot)

List drives
```sh
lsblk
```

Create folder to mount drive
```sh
sudo mkdir /media/data
```

Mount drive
```sh
sudo mount /dev/sdb1 /media/data
```

### Auto-mount drivers at boot

Find the drive's UUID do

```sh
ls -al /dev/disk/by-uuid/
```

Edit the fstab file and add the new record

```sh
sudo vim /etc/fstab
```

Add
```sh
UUID=<DRIVE-UUID> /media/data ext4 defaults 0 0
```

Test fstab changes before reboot
```sh
findmnt --verify
```

Unmounting drive with umount
```sh
sudo umount /media/data
```

### Create disk partition
[Reference](https://recoverit.wondershare.com/harddrive-tips/format-and-wipe-linux-disk.html)
List drives
```sh
lsblk
```

Use `fdisk` to create the new partition
```sh
sudo fdisk /dev/sdb
```

* m -> get help
* n -> new partition
* d -> delete partition
* p -> check partition table
* w -> write changes

Format disk
```sh
sudo mkfs.ext4 /dev/sdb
```

# Raspberry


### To Share Wifi - Ethernet Connetion

```sh
nm-connection-editor
```

### Get IP
```sh
sudo dhclient -r
```

### Enable SSH Interface
```sh
sudo raspi-config
```
> Interfacing Options -> SSH -> YES -> OK

### Some libraries
```sh
sudo apt install software-properties-common zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.5-dev tk8.5-dev python-tk
```

### Install docker

[Reference](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)

```sh
curl -sSL https://get.docker.com | sh
sudo systemctl enable docker
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

Installing docker-compose
```sh
sudo apt -y install docker-compose
```

### Install portainer
[Reference](https://docs.portainer.io/v/ce-2.11/start/install/server/docker/linux#deployment)

```sh
docker volume create portainer_data && \
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.14.2
```

### Install NodeJS

[Reference](https://nodejs.org/download/release/v11.15.0/node-v11.15.0-linux-arm64.tar.gz)

Un-tar node js
```sh
VERSION=v11.15.0 \
DISTRO=linux-arm64 \
sudo mkdir -p /usr/local/lib/nodejs \
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
```

Copy files
```sh
sudo tar -xJvf node-v11.15.0-linux-armv6l.tar.xz -C /usr/local/lib/nodejs
```

Open .profile file
```sh
vim ~/.profile
```

Add NodeJS bin to .profile
```sh
export PATH=/usr/local/lib/nodejs/node-v11.15.0-linux-armv6l/bin:$PATH
```

Reload profile
```sh
. ~/.profile
```

# Bluetooth

```sh
sudo bluetoothctl power on

# Scan to discover other devices
sudo bluetoothctl scan on

# See devices
sudo bluetoothctl devices

# Pair new device
sudo bluetoothctl pair [address]

# Connect new device
sudo bluetoothctl connect [address]
```

### Attach bluetooth

[Reference](https://velog.io/@kitsunetic/Serial-Communication-using-Python-Linux-through-BLE-with-Arduino-HC-06)
```sh
sudo rfcomm bind 0 00:14:03:05:0C:5D
```

### AT Commands

[Reference](https://www.linux-magazine.com/Issues/2017/197/Command-Line-bluetoothctl)
