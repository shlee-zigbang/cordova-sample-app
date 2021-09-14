/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

const URL = 'https://sp.dev.hogangnono.com/videoCall/player?channelId=be18cc1f529442499cf4737fcd9506e6'
const OPTION = 'zoom=no,hidenavigationbuttons=yes,location=no,toolbar=no,usewkwebview=yes,allowinlinemediaplayback=yes,disallowoverscroll=yes'

function openUrl(url) {
    if (window.cordova.InAppBrowser) {
        const win = window.cordova.InAppBrowser.open(url, '_blank', OPTION)

        win.addEventListener('message', (m) => {
            if (msg?.data?.action === 'close') {
                win.close()
            }
        })
    }
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

function checkPermission(callback) {
    if (window.cordova.platformId === 'android') {
        /*
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.BLUETOOTH" />
        */
        cordova.plugins.permissions.requestPermissions(
            [
                cordova.plugins.permissions.CAMERA,
                cordova.plugins.permissions.RECORD_AUDIO,
                cordova.plugins.permissions.MODIFY_AUDIO_SETTINGS,
                cordova.plugins.permissions.ACCESS_WIFI_STATE,
                cordova.plugins.permissions.ACCESS_NETWORK_STATE,
                cordova.plugins.permissions.BLUETOOTH,
            ],
            () => {
                console.log('permissions success')
                callback()
            },
            () => console.log('permissions error'),
        )
    } else {
        openAgora()
    }
}

window.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn-start')

    if (btn) {
        btn.addEventListener('click', function () {
            checkPermission(() => openUrl(URL))
        })
    }

    const btnOpen = document.getElementById('btn-open')

    if (btnOpen) {
        btnOpen.addEventListener('click', function (e) {
            const inputUrl = document.getElementById('text-input').value
            if (inputUrl) {
                checkPermission(() => {
                    openUrl(inputUrl)
                })
            }
        })
    }
})
