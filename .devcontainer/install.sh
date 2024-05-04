#!/bin/bash
set -e

apt update
apt install -y wget pkg-config build-essential git guile-2.2 guile-2.2-dev locales

wget https://github.com/OrangeShark/guile-commonmark/releases/download/v0.1.2/guile-commonmark-0.1.2.tar.gz
tar xf guile-commonmark-0.1.2.tar.gz
cd guile-commonmark-0.1.2
./configure
make
make install
cd ..

wget https://files.dthompson.us/releases/haunt/haunt-0.3.0.tar.gz
tar xf haunt-0.3.0.tar.gz
cd haunt-0.3.0
./configure
make
make install
