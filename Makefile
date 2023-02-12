#!/bin/bash

install:
	npm install

start:
	npx react-native start

run:
	npx react-native run-android --active-arch-only

run-release:
	npx react-native run-android --variant=release --active-arch-only

build:
	cd android && ./gradlew assembleRelease

app-install:
	adb install android/app/build/outputs/apk/release/app-release.apk
