<div class="navbar navbar-inverse navbar-static-top" role="navigation">
    <div class="container-fluid">
        <p class="navbar-text" style="margin-top: 3%!important;">
            <button id="goHome" class="btn btn-link pull-left"><span class="glyphicon glyphicon-chevron-left" style="color:#fff;"></span></button>
            <button id="saveOnServer" class="btn btn-link pull-right"><span class="glyphicon glyphicon-cloud-upload" style="color:#fff;"></span></button>
        </p>
    </div>
</div>
<div class="container" style="margin-bottom: 25px;">
    <div class="row">
        <div class="col-xs-12">

<div class="formSubmit">
            <div class="row">
                <div class="col-xs-6 col-xs-offset-3">
                    <div style="text-align: center">
                        <img id="myImage" src="./img/noimage.png" class="img-thumbnail" />
                    </div>
                </div>
            </div>

                    <label for="title">Title:</label>
                    <input type="text" class="form-control input-sm" id="title" value="" placeholder="title..." />
                    <label for="description">Description:</label>
                    <textarea class="form-control input-sm" id="description" placeholder="description..." rows="3"></textarea>
                    <label for="points">Points:</label>
                    <input type="text" class="form-control input-sm" id="points" placeholder="points..." />

                <div class="row">
                    <div class="col-xs-4">
                        <strong style="display: block;">Lat:</strong>
                        <button class="btn btn-block btn-link text-center" id="fLat" disabled="disabled" style="color:#32cd32!important;">Loading...</button>
                    </div>

                    <div class="col-xs-4">
                        <strong style="display: block;">Lng:</strong>
                        <button class="btn btn-block btn-link text-center" id="fLng" disabled="disabled" style="color:#32cd32!important;">Loading...</button>
                    </div>

                    <div class="col-xs-4">
                        <strong style="display: block;text-align: center">Reload:</strong>
                        <button class="btn btn-block btn-warning text-center" id="reloadGeo"><span class="fa fa-refresh" id="relIcon"></span></button>
                    </div>

                </div>

</div>
            <div class="progress progress-striped active" id="progressWrapper" style="display: none;margin-top: 50px">
                <div id="progressBar" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;display: none;">
                </div>
            </div>



        </div>
    </div>
</div>
