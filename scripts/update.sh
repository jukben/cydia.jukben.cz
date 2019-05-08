#!/bin/sh

./scripts/remove.sh
./scripts/packages.sh

dpkg-scanpackages -m debs/ /dev/null >Packages
bzip2 Packages
