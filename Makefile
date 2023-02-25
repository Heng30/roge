#!/bin/bash

APP_DIR=android/app/build/outputs/apk/release
APP_NANE=roge
DATE=`date "+%Y_%m_%d"`
VERSION=`git tag | tail -n 1`

install:
	npm install

start:
	npx react-native start

run:
	npx react-native run-android --active-arch-only

run-release:
	npx react-native run-android --variant=release --active-arch-only

build: clean
	cd android && ./gradlew assembleRelease && cd .. && cp ${APP_DIR}/app-release.apk ./${APP_NANE}_android_${VERSION}_${DATE}.apk

app-install:
	adb install ${APP_DIR}/app-release.apk

copy-action-file:
	cp -rf ./actionfile/android-release-key.keystore ./android/app/ && cp -rf ./actionfile/gradle.properties ./android/

clean:
	rm -f ./roge_android_*.apk
