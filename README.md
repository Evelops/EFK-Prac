> EFK-Practice 

VPC 작업 이후, 서버 인프라 합칠 때, 참고 & 테스트용
<hr>

### Server Env

- Infra: EC2(t2.medium(2CPU, 4GB RAM)) 
- OS: Ubuntu 20.04LTS
- EBS: 20GB 
- java-version: openjdk.11 
- elastic-version: 8.x
- kibana-version: 8.x
- fluentd: 3.x

<hr>

### Check List

<br>

- 인스턴스는 위의 Server Env 환경으로 최소 3대 필요(권장사항) 
- 배포전 free tier 3대로 테스트해보기(ES,Kibana version 7.x 다운후 테스트)
- EFK->ymal 문법 작성시 들여쓰기 주의
    * yml 파일에 cluster,node 설정 추가로 해주기


<br>

### start elasticsearch
<br>

```bash
$ sudo systemctl start elasticsearch
$ curl "ip:9200" 
```
<br>

### start Kibana 
<br>

```bash
$ sudo systemctl start kibana
$ curl "ip:5601"
```

<br>

### start Fluentd
<br>

```bash
$ sudo systemctl start td-agent.service
```
