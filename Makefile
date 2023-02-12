#!/bin/bash

APP_DIR=android/app/build/outputs/apk/release
APP_NANE=roge
DATE=`date "+%Y_%m_%d"`

foo:
	echo ${DATE}

install:
	npm install

start:
	npx react-native start

run:
	npx react-native run-android --active-arch-only

run-release:
	npx react-native run-android --variant=release --active-arch-only

build:
	cd android && ./gradlew assembleRelease && cd .. && cp ${APP_DIR}/app-release.apk ./${APP_NANE}_android_${DATE}.apk

app-install:
	adb install ${APP_DIR}/app-release.apk
