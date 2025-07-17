
1.Build docker image
2.Push image  to artifactory 
3. increment the version in yaml file 
     - name: version
              value: "8"
4. deploy
npm run build
docker image build -t cxm-dev.common.repositories.cloud.sap/cxm/msteams/mschat .
Docker push cxm-dev.common.repositories.cloud.sap/cxm/msteams/mschat:latest  

kubectl apply -f k8s/mschat-service-dev2.yaml


port fwd
kubectl port-forward pods/mschat-deployment-654595bcc-nxqzs 48961:3500