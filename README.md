> EFK-Practice 

VPC 작업 이후, 서버 인프라 합칠 때, 참고용.
<hr>

### Set UP 

- Infra: EC2(t2.medium(2CPU, 4GB RAM))
- OS: Ubuntu 20.04LTS
- EBS: 20GB 
- java-verdion: openjdk.11 

<br>
 

### start elasticsearch
<br>

```bash
$ sudo systemctl start elasticsearch
```
<br>

### start Kibana 
<br>

```bash
$ sudo systemctl start kibana
```

<br>

### start Fluentd
<br>

```bash
$ sudo systemctl start td-agent.service
```
