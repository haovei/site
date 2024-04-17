---
description: bun 运行时的 EACCES 错误
---

# bun 运行时的 EACCES 错误

这两天原有的 `bun` 项目突然出现了 `EACCES` 错误，导致项目无法正常运行。

## 问题描述

项目使用 `docker` 构建并生成镜像，服务端运行镜像。错误信息如下：

```shell
bun ./dist/index.js
error: EACCES reading "/app/node_modules/proxy-from-env/index.js"
error: script "start" exited with code 1
```

## 问题分析

字面错误信息是无法读取 `proxy-from-env` 模块，但是这个模块是存在的，而且在本地运行时也没有问题。
查看模块下的文件，也都是存在的，那会不会是权限原因呢？查看权限

```shell
> ls -lh
total 58
-rw-r-----  2 root  wheel   1.1K  4 17 00:52 LICENSE
-rw-r-----  2 root  wheel   5.1K  4 17 00:52 README.md
-rw-r-----  2 root  wheel   3.3K  4 17 00:52 index.js
-rw-r-----  2 root  wheel   956B  4 17 00:52 package.json
-rw-r-----  2 root  wheel    17K  4 17 00:52 test.js
```

果然这个包的权限不对。

查看 `proxy-from-env` 的依赖关系，是 `axios` 的需要的。这个包应用十分广泛，应该不会有太大问题，不然其他平台早保留出来了。
看来应该是其他运行时会忽略这个权限问题，而 `bun` 不会忽略这个

## 两种解决方案

### 1、修改权限

既然是权限问题，那就在构建时修改权限。

```dockerfile
# ...
RUN bun install --production
RUN chmod 644 /app/node_modules/proxy-from-env/
```

构建时安装依赖后，讲 `proxy-from-env` 的权限修改为 644。

### 2、修改 build 配置

在 `build.ts` 中修改配置

```typescript
await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'bun',
    // external: ['hono', 'axios'],
    external: ['hono'], // external 字段里去掉 axios
});
```

在 `external` 字段，将 `axios` 移除，这样 `bun build` 时就会将 `axios` 打包进运行代码里面，也就不会出现权限问题。

## 总结

`bun` 是一个很好的工具，但还是比较新，在一些细节处理上还有待完善。这次的问题也是一个小问题，但是要花时间解决，希望后续版本能够更加完善。
