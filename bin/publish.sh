#!/bin/bash
set -e

PAGES_DIR=./gh-pages
REPO="git@github.com:contentful/contentful-react-discovery.git"

echo "Publishing"

# get the gh-pages branch of the repo
if [ ! -d $PAGES_DIR ] ; then
  git clone --single-branch --branch gh-pages $REPO $PAGES_DIR
fi

cp index.html *.svg *.png *.css dist/*.js $PAGES_DIR

#sed -e "s/<base href='\/'/<base href='\/discovery-app-react\/'/g" index.html > $PAGES_DIR/index.html
cp $PAGES_DIR/index.html $PAGES_DIR/404.html

pushd $PAGES_DIR
git add .
git commit -a -m "Docs update"
if [ $? -eq 1 ] ; then
  echo "Nothing to update"
else
  git push origin gh-pages
fi
popd
