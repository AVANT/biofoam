# Biofoam
Frontend of AVANT.org

> Biofoam is a self-sealing, space-filling coagulant and also an antibacterial, tissue-regenerative foam polymer used by the United Nations Space Command as a form of medical first aid.
> -- Halo wiki

## Getting Started (depreciated soon)
- uses nodejs with gulp and bower for development and package management
- in a shell located at the root directory run `npm start`

## Getting Started Docker

### Download Local Dependencies
- download [brew](http://brew.sh/)
- download brew cask `brew install caskroom/cask/brew-cask`
- download virtualbox with brew `brew cask install virtualbox`
- download docker with brew `brew install docker`
- download docker-compose (formally fig) with brew **NOT IN BREW YET**
  - can get the docker-compose binary [here](https://github.com/docker/fig/releases)

### Start Up VM and Containers
- from anywhere in bash `boot2docker up`
- from root folder in bash `docker-compose up`

## Deploying
- need awscli tools `brew install awscli`
- need to create a `.env` file at the root with all the necessary creds
- commands `make staging` and `make prod` deploy to their respective environments

## TODOs
