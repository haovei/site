#!/bin/bash

if [ ! -x /usr/sbin/nginx ]; then
  echo "Please install Nginx prior to execute this script."
else
  nginxVersion=$(/usr/sbin/nginx -v |& sed 's/nginx version: nginx\///') && \
  echo "Nginx found with version: $nginxVersion" && \
  sudo apt -qq install build-essential cmake git libpcre3-dev tar wget -y && \
  git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli && \
  cd ngx_brotli/deps/brotli && \
  mkdir out && cd out && \
  cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_C_FLAGS="-Ofast -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" -DCMAKE_INSTALL_PREFIX=./installed .. && \
  cmake --build . --config Release --target brotlienc && \
  cd ../../../.. && \
  wget https://nginx.org/download/nginx-${nginxVersion}.tar.gz && \
  tar xzf nginx-${nginxVersion}.tar.gz && rm nginx-${nginxVersion}.tar.gz && \
  cd nginx-${nginxVersion} && \
  ./configure --with-compat --add-dynamic-module=../ngx_brotli && \
  make modules && \
  cd objs && \
  mv *.so ../../ && cd ../.. && \
  rm -rf ngx_brotli && rm -rf nginx-${nginxVersion}
fi