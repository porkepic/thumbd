aws-vault exec ccube-shared-resources -- aws ecr get-login-password | docker login --username AWS --password-stdin 905418466842.dkr.ecr.ca-central-1.amazonaws.com
docker tag thumbd:latest 905418466842.dkr.ecr.ca-central-1.amazonaws.com/thumbd:latest
docker push 905418466842.dkr.ecr.ca-central-1.amazonaws.com/thumbd:latest
