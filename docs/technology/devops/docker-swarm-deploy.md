---
description: 轻量级的服务部署 Docker Swarm Deploy Service
---

# 轻量级的服务部署 Docker Swarm Deploy Service

对于大公司大项目，动辄几十上百个服务，使用 Kubernetes 或者云服务更好。对于小公司或个人项目，体量并不会很大。使用 Docker Swarm 更加轻量级，部署更加简单，同时成本也更低。我自己的个人项目就在使用 Docker Swarm 部署。

## Docker Swarm 是什么

`Docker Swarm` 是 `Docker` 官方提供的一个原生的集群管理和编排工具，它可以将多个 `Docker` 主机抽象为一个虚拟的 `Docker` 主机，以实现容器集群的管理和调度。

为了高效管理和部署应用程序，Docker Swarm 提供了以下功能：

-   **集群管理**：您可以创建节点集群来管理应用程序容器。节点可以是 manager 或 worker
-   **服务抽象**：Docker Swarm 引入了“Service”组件，它允许您设置网络配置、资源限制和容器副本数量。通过管理服务，Docker Swarm 确保维持应用程序所需的状态
-   **负载均衡**：Swarm 提供内置负载均衡，允许集群内的服务进行交互，而无需您手动定义负载均衡器文件
-   **回滚**：在部署失败的情况下，完全支持将特定服务回滚到其先前版本
-   **容错**：Docker Swarm 自动检查节点和容器中的失败错误并生成新的失败错误，以允许用户继续使用应用程序而不会注意到任何问题
-   **可扩展性**：借助 Docker Swarm，您可以灵活地轻松调整容器的副本数量。这使您可以根据工作负载不断变化的需求来扩展或缩小应用程序
-   **默认安全**：集群中的每个节点都强制执行 TLS 相互身份验证和加密，以确保其自身与所有其他节点之间的通信安全。还可以选择使用自签名根证书或来自自定义根 CA 的证书。

## 环境要求

只需要安装 `Docker`，安装 `Docker` 的方法可以参考 [Docker 安装](https://docs.docker.com/get-docker/)。

## 服务部署

### 超简单的服务部署

可以先不管上面的各种概念，先跑起来。

创建新的 `Swarm` 集群，将 `Docker` 切换到集群模式，`service` 需要在 `Swarm` 模式下才能使用。

```shell
docker swarm init
```

然后，使用 `docker service create` 命令来创建一个新的服务

```shell
docker service create --name web --replicas 3 --publish 8080:80 nginx
```

::: details 运行结果

```shell
➜  ~ docker service create --name web --replicas 3 -p 8080:80 nginx
m3sksh06tl7po97bo4d5tte21
overall progress: 3 out of 3 tasks
1/3: running   [==================================================>]
2/3: running   [==================================================>]
3/3: running   [==================================================>]
verify: Service converged
➜  ~ docker service ls
ID             NAME      MODE         REPLICAS   IMAGE          PORTS
m3sksh06tl7p   web       replicated   3/3        nginx:latest   *:8080->80/tcp
➜  ~ docker ps
CONTAINER ID   IMAGE          COMMAND                   CREATED          STATUS          PORTS     NAMES
b9441e6a1239   nginx:latest   "/docker-entrypoint.…"   29 seconds ago   Up 28 seconds   80/tcp    web.2.jlkbj4ybxd52bc9h4dqyh2kst
c3799333bc88   nginx:latest   "/docker-entrypoint.…"   29 seconds ago   Up 28 seconds   80/tcp    web.1.1hx7ihmnzqwz6a2v8rgz5fx16
9c05f8749ab8   nginx:latest   "/docker-entrypoint.…"   29 seconds ago   Up 28 seconds   80/tcp    web.3.33r34ijdvz9bymlyo85v80kz0
```

:::

🎉 **完成部署**。创建了一个名为 `web` 的服务，该服务包含 3 个 `nginx` 副本，并将容器的 `80` 端口映射到主机的 `8080` 端口。服务会自动在 `Swarm` 集群中的节点上创建容器，并负载均衡流量。

只需要一个命令，一台机器，就可以完成服务的部署。

访问 `http://localhost:8080` 就可以看到 `nginx` 的欢迎页面。

```shell
➜  ~ curl localhost:8080
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...truncated...
</html>
```

**更新服务**

一般来说，更新服务就是更新最新镜像

```shell
docker service update --image nginx:latest web
```

也可以配置更多的参数，常用的有：

-   `--replicas`: 设置服务的副本数量，默认值为 `1`
-   `--update-delay`: 更新服务的延迟时间，单位为秒，默认值为 `10s`
-   `--update-parallelism`: 更新服务的并行度，默认值为 `1`
-   `--update-failure-action`: 更新失败时的操作，可选值为 `pause`、`continue` 和 `rollback`，默认值为 `pause`
-   `--update-max-failure-ratio`: 更新失败的最大比率，默认值为 0。可以设置这个值为任何在 0 和 1 之间的浮点数。例如，如果你设置 `--update-max-failure-ratio 0.2`，那么如果超过 20% 的任务失败，更新就会被视为失败。
-   `--update-monitor`: 更新服务的监控时间，单位为秒，默认值为 5s。更新任务后等待多长时间再开始监视任务的健康状况

### 常用的服务部署

简单的部署方式是通过命令行的方式运行，常用的方式还是通过 `Docker Compose` 文件来部署服务。毕竟配置参数过多，命令行不方便，也容易出错。

创建一个 `docker-compose.yml` 文件

```yaml
version: '3'
services:
    web:
        image: nginx
        ports:
            - '8080:80'
        deploy:
            replicas: 3
            update_config:
                parallelism: 1
                delay: 10s
```

使用 `docker stack deploy` 命令来部署

```shell
docker stack deploy -c docker-compose.yml web
```

::: tip ⚠️ 注意
`Docker Compose` 和 `Docker Stack` 都使用 `docker-compose.yml` 文件来定义服务，但是它们之间存在一些关键的差异。主要区别在于 `Docker Compose` 用于在单个主机上运行多个容器，而 `Docker Stack` 用于在多个主机上运行多个容器。
:::

::: warning ⚠️ 注意
`docker stack` 使用 `docker-compose.yml` 不支持依赖，`depends_on` 不会生效。如果需要依赖，只可以使用 `docker-compose` 来部署。
:::

## 扩容

随着业务的发展，单台机器的性能可能无法满足需求，通过增加节点和服务的副本数量来扩容。

### 增加节点

通过 `docker swarm join-token` 命令来获取加入集群的命令

```shell
docker swarm join-token worker
```

将命令复制到新的节点上执行，就可以将新的节点加入到集群中。

### 增加服务副本

通过 `docker service scale` 命令来增加服务的副本数量

```shell
docker service scale web=5
```

::: details 运行结果

```shell
➜  ~ docker service scale web=5
web scaled to 5
overall progress: 5 out of 5 tasks
1/5: running   [==================================================>]
2/5: running   [==================================================>]
3/5: running   [==================================================>]
4/5: running   [==================================================>]
5/5: running   [==================================================>]
verify: Service converged
➜  ~ docker service ps web
ID             NAME      IMAGE          NODE       DESIRED STATE   CURRENT STATE           ERROR     PORTS
1hx7ihmnzqwz   web.1     nginx:latest   orbstack   Running         Running 3 hours ago
jlkbj4ybxd52   web.2     nginx:latest   orbstack   Running         Running 3 hours ago
33r34ijdvz9b   web.3     nginx:latest   orbstack   Running         Running 3 hours ago
ydjlrw6qps7y   web.4     nginx:latest   pi2        Running         Running 9 seconds ago
9aqvpy0ocgn7   web.5     nginx:latest   pi2        Running         Running 9 seconds ago
```

扩容完成，服务的副本数量变为 5。能看到新的节点 `pi2` 上也创建了 2 个容器。
:::

## 总结

`Docker Swarm` 是一个轻量级的服务部署工具，对于小公司或个人项目来说，是一个不错的选择。只需要一个命令，一台机器，就可以完成服务的部署。同时，也支持多节点、多服务、负载均衡等功能，可以满足一些小型项目甚至是中大项目的需求。成本更低，部署更简单，没必要上 `Kubernetes` 或者云服务。
