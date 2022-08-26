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
const app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        $('#veryfi_response').append('<hr><hr>*** onDeviceReady ***');

        // [1] Setup Event Listeners
        // NOTE: Important to only register this once (onDeviceReady) otherwise strange behaviors will occur.


        // [2] Initialize Veryfi Lens
        const isDebug = true;
        const vUrl = "XXXX";
        const vClientId = "XXXX";
        const vUserName = "XXXX";
        const vApiKey = "XXXX";
        const settings = {
            "blurDetectionIsOn": true,
            "autoLightDetectionIsOn": false,
            "autoCaptureIsOn": false,
            "backupDocsToGallery": true,
            "autoDocDetectionAndCropIsOn": true,
            "showDocumentTypes": true,
            "documentTypes": ['long_receipt', 'receipt', 'bill', 'other'],
            "moreMenuIsOn": true,
            "moreSettingsMenuIsOn": true,
            "rotateDocIsOn": true,
            "closeCameraOnSubmit": true,
            "stitchIsOn": false,
            "locationServicesIsOn": true,
            "dictateIsOn": true,
            "emailCCIsOn": true,
            "emailCCDomain": "veryfi.cc",
            "browseIsOn": true,
            "galleryIsOn": true,
            "returnStitchedPDF": true,
            // "categories": ['Reproduction', 'Blueprints', 'Travel', 'Mileage', 'Telephone', 'Postage', 'Shipping & Delivery', 'Photos', 'Models', 'Photocopies', 'Fees & Permits', 'Personal Expense'],
            "categories": ['Car Rental', 'Entertainment', 'Lodging', 'Meals', 'Mileage', 'Transportation', 'Other'],
            "shareLogsIsOn": true,
            "saveLogsIsOn": true,
            "originalImageMaxSizeInMB": 2.0,
            "stitchedPDFPixelDensityMultiplier": 2.0,
            "dataExtractionEngine": "api"
        };

        cordova.plugins.Veryfi.Lens.init(isDebug, vUrl, vClientId, vUserName, vApiKey, settings);

        // [3] Bind Camera/Collect button event, which starts Veryfi Lens
        // NOTE: This is bound once and user-initiated. Do not call showCamera before setting up broadcaster listeners (see above).
        $("#btn-launch-veryfi-camera").click(function (e) {
            e.preventDefault();
            $('#veryfi_response').append('<hr>*** pressed: #btn-launch-veryfi-camera ***');
            cordova.plugins.Veryfi.Lens.showCamera(
                function (response) {
                    const jsonObject = JSON.parse(response);
                    if (jsonObject.event === "veryfi_lens_close") {
                        $('#veryfi_response').append("<hr>*** veryfi_lens_close response = " + response);
                    }
                    if (jsonObject.event === "veryfi_lens_update") {
                        $('#veryfi_response').append("<hr>*** veryfi_lens_update response = " + response);
                        if (jsonObject.msg === "img_thumbnail_path") {
                            cordova.plugins.Veryfi.Lens.getFileBase64(jsonObject,
                                function (response) {
                                    $('#veryfi_response').append("<hr>*** THUMBNAIL:<br><img src=\"data:image/jpg;base64, " + response + "\" style=\"width: 50px\" alt=\"\"/><br>");
                                }, function (error) {
                                    $('#veryfi_response').append("<hr>*** cordova.plugins.Veryfi.Lens.getImgThumbnailBase64 error = " + error);
                                }
                            );
                        }

                        if (jsonObject.msg === "img_original_path") {
                            cordova.plugins.Veryfi.Lens.getFileBase64(jsonObject,
                                function (response) {
                                    $('#veryfi_response').append("<hr>*** ORIGINAL:<br><img src=\"data:image/jpg;base64, " + response + "\" style=\"width: 200px\" alt=\"\" /><br>");
                                }, function (error) {
                                    $('#veryfi_response').append("<hr>*** cordova.plugins.Veryfi.Lens.getImgOriginalBase64 error = " + error);
                                }
                            );
                        }

                        if (jsonObject.msg === "img_stitched_pdf_path") {
                            cordova.plugins.Veryfi.Lens.getFileBase64(jsonObject,
                                function (response) {
                                    $('#veryfi_response').append("<hr>*** PDF BASE64:<br>" + response.substr(0, 250) + "...<br>");
                                }, function (error) {
                                    $('#veryfi_response').append("<hr>*** cordova.plugins.Veryfi.Lens.getImgStitchedPDFBase64 error = " + error);
                                }
                            );
                        }
                    }
                    if (jsonObject.event === "veryfi_lens_error") {
                        $('#veryfi_response').append("<hr>*** veryfi_lens_error response = " + response);
                    }
                    if (jsonObject.event === "veryfi_lens_success") {
                        $('#veryfi_response').append("<hr>*** veryfi_lens_success response = " + response);
                    }
                    console.log("JSON:", response);

                }, function (error) {
                    $('#veryfi_response').append("<hr>*** cordova.plugins.Veryfi.Lens.showCamera error = " + error);
                }
            );
        });

        $("#btn-set-none").click(function (e) {
            e.preventDefault();
            $('#veryfi_response').append('<hr>*** pressed: #btn-set-none ***');
            settings.dataExtractionEngine = 'none';
            cordova.plugins.Veryfi.Lens.init(isDebug, vUrl, vClientId, vUserName, vApiKey, settings);
        });
        $("#btn-set-api").click(function (e) {
            e.preventDefault();
            $('#veryfi_response').append('<hr>*** pressed: #btn-set-api ***');
            settings.dataExtractionEngine = 'api';
            cordova.plugins.Veryfi.Lens.init(isDebug, vUrl, vClientId, vUserName, vApiKey, settings);
        });
        $("#btn-set-mobile").click(function (e) {
            e.preventDefault();
            $('#veryfi_response').append('<hr>*** pressed: #btn-set-mobile ***');
            settings.dataExtractionEngine = 'mobile';
            cordova.plugins.Veryfi.Lens.init(isDebug, vUrl, vClientId, vUserName, vApiKey, settings);
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        const parentElement = document.getElementById(id);
        const listeningElement = parentElement.querySelector('.listening');
        const receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    }
};

app.initialize();
