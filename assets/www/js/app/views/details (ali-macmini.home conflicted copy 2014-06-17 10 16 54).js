var DetailsView = Backbone.View.extend({
    el: $("#appPage"),
    template: function(data) {
        var tpl_page = Handlebars.compile(loadTemplate("details.tpl"));
        return tpl_page(data);
    },
    gPos: {
        status: false,
        lat: 0,
        lng: 0
    },
    filePath: "",
    btnSend: false,
    events: {
        "click #goHome": "goHome",
        "click #saveOnServer": "upLoad",
        "click #reloadGeo": "getGeoPos"
    },
    render: function () {
        /*
             Camera.EncodingType = {
                 JPEG : 0,               // Return JPEG encoded image
                 PNG : 1                 // Return PNG encoded image
             };
         */
        var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: false,
                allowEdit : true,
                correctOrientation: true,
                encodingType: 1
            },
            self = this;

        this.getGeoPos();

        this.btnSend = false;

        navigator.camera.getPicture(function(imageData) {

            self.filePath = imageData;

            window.resolveLocalFileSystemURL(imageData, function onSuccess(fileEntry) {

                fileEntry.file(function(file) {

                    var reader = new FileReader();

                    reader.onloadend = function (evt) {
                        var image = document.getElementById('myImage');
                        image.src = evt.target.result;
                    };

                    reader.readAsDataURL(file);

                }, function (error) {
                    Log.printObject(error);
                    navigator.notification.alert("Error: can not read file.", function() {
                        appGQM.navigate("!/homeActivity", {trigger: true});
                        return false;
                    }, "Create Image", "Ok");
                });

            }, function(error) {
                Log.printObject(error);
                navigator.notification.alert("Error: can not find file.", function() {
                    appGQM.navigate("!/homeActivity", {trigger: true});
                    return false;
                }, "Create Image", "Ok");
            });

        }, function(error) {
            Log.printObject(error);
            navigator.notification.alert("Error: can not create image.", function() {
                appGQM.navigate("!/homeActivity", {trigger: true});
                return false;
            }, "Create Image", "Ok");
        }, options);

        this.$el.html(this.template(null));

        this.$("#formSubmit").show();
        this.$("#progressBar, #progressWrapper").hide();

        return this;
    },
    goHome: function() {
        appGQM.navigate("!/homeActivity", {trigger: true});
        return false;
    },
    upLoad: function(e) {
        e.preventDefault();
        var self = this;

        if (!self.btnSend) {
            navigator.notification.confirm("Want to upload?", function(btnIndex) {

                if (btnIndex == 1) {

                    self.btnSend = true;
                    self.send2Server();

                }

            }, "Upload", ["Yes", "No"]);
        }
        return false;
    },
    send2Server: function() {

        if (!checkIfDeviceOnline()) {
            navigator.notification.alert("no network connection");
            this.btnSend = false;
            return false;
        }

        this.$("#formSubmit").hide();
        this.$("#progressBar, #progressWrapper").show();

        var options = new FileUploadOptions(),
            img = this.filePath,
            params,
            ft,
            self = this;

        options.fileKey = "file";
        options.fileName = img.substr(img.lastIndexOf('/') + 1);
        options.mimeType = "image/png";

        params = {
            title : self.$("#title").val(),
            descr: self.$("#description").val(),
            points: self.$("#points").val(),
            lat: self.gPos.lat,
            lng: self.gPos.lng
        };


        options.params = params;

        ft = new FileTransfer();

        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var prg = (progressEvent.loaded / progressEvent.total) * 100,
                    pos = prg.toFixed(2);

                Log.print("UPLOAD: " + pos + "%");

                self.$("#progressBar").css("width", pos + "%");
                self.$("#progressBar").html(pos + "%");
                self.$("#progressBar").attr("aria-valuenow", pos);
            }
        };


        ft.upload(encodeURI(img), uploadURL, function(res) {

            Log.print("ft.upload - result:");
            Log.print(JSON.stringify(res));

            if (res) {
                var json;

                try {
                    json = JSON.parse(res.response);
                } catch (exeption) {
                    json = null;
                }

                if (json.status == "ok") {
                    navigator.notification.alert("Upload completed!", function() {
                        appGQM.navigate("!/homeActivity", {trigger: true});
                        return false;
                    }, "Upload", "Ok");
                } else {
                    navigator.notification.confirm("Error: " + json.msg + "\n Repeat upload?", function(btnIndex) {
                        if (btnIndex == 1) {
                            self.send2Server();
                        } else {
                            appGQM.navigate("!/homeActivity", {trigger: true});
                        }
                        return false;
                    }, "Upload", ["Yes", "No"]);
                }
            }//if (res)

        }, function(e) {
            console.log(JSON.stringify(e));
            if (e.status == "ok") return;
            navigator.notification.confirm("Error by upload\n Repeat upload?", function(btnIndex) {
                if (btnIndex == 1) {
                    self.send2Server();
                } else {
                    appGQM.navigate("!/homeActivity", {trigger: true});
                    return false;
                }
            }, "Upload error", ["Yes", "No"]);
        }, options);

        return false;
    },
    getGeoPos: function() {
        var self = this;

        this.$("#relIcon").addClass("fa-spin");

        navigator.geolocation.getCurrentPosition(function(position) {
            /*
                {
                    "timestamp": "2014-05-17T21:58:42.210Z",
                    "coords": {
                        "heading": null,
                        "altitude": null,
                        "latitude": 48.1981169,
                        "accuracy": 30,
                        "longitude": 11.5839229,
                        "speed": null,
                        "altitudeAccuracy": null
                    }
                }
             */

            self.gPos.status = true;
            self.gPos.lat = position.coords.latitude;
            self.gPos.lng = position.coords.longitude;

            if (self.gPos.lng) {
                self.$("#fLng").html(self.gPos.lng);
            } else {
                self.$("#fLng").html("Not found");
            }

            if (self.gPos.lat) {
                self.$("#fLat").html(self.gPos.lat);
            } else {
                self.$("#fLat").html("Not found");
            }

            self.$("#relIcon").removeClass("fa-spin");

        }, function(error) {
            Log.showWithObject(error);
            self.gPos.status = false;
            self.$("#fLng").html("Error...");
            self.$("#fLat").html("Error...");
            self.$("#relIcon").removeClass("fa-spin");
        });

        return false;
    }
});
