#!/bin/bash
keytool -genkeypair -v -storetype PKCS12 -keystore android-release-key.keystore -alias android-key-alias -keyalg RSA -keysize 2048 -validity 10000
