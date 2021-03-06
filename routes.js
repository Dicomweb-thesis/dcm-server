module.exports = function (express, app) {
    const router = express.Router();
    // const jsonParser = require('body-parser').json();
    const patientServices = require("./services/patient-services");
    const studyServices = require("./services/study-services");
    const instanceServices = require("./services/instance-services");

    var fetch = require("node-fetch");


    /*
    * Route for get request
    * */
    // Default - connect successfully
    router.get("/", function (request, response) {
        response.setHeader('Content-Type', 'text/html');
        response.status(200).send("Connected to server successfully!");
    })

    // Return list of patients
    router.get("/patients", function (request, response) {
        patientServices.getList().then(function (value) {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).json(value);
        }).catch(function (error) {
            response.send(error);
        })
    })

    // Return list of studies according to patientID
    router.get("/patients/:id/studies", function (request, response) {
        let patientID = request.params.id;
        studyServices.getListByPatientID(patientID).then(function (value) {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).json(value);
        }).catch(function (error) {
            response.send(error);
        })
    })

    ////==================================================================
    url = 'http://localhost:8042/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.2.9076.20051014125256000&seriesUID=1.3.12.2.1107.5.2.2.9076.20051014125635000002&objectUID=1.3.12.2.1107.5.8.1.12345.200510141312220835508&contentType=application/dicom'

    // router.get('/instances/getFile', function (request, response) {
    //     fetch(url).then(function (value) {
    //         response.setHeader('Content-Type','application/dicom');
    //         console.log(value);
    //         response.status(200).text(value);
    //     }).catch(function (error) {
    //         response.send(error);
    //     })
    //
    //
    // })

    router.get('/instances/getFile', function (request, response) {
        instanceServices.getFile().then(function (value) {
            // response.setHeader('Content-Type','arraybuffer');
            response.status(200).json(value);
            console.log(value);
        }).catch(function (error) {
            response.send(error);
        })

    })

///==============================================================================

    /*
    * Route for post request
    * */
    // // Post id to request study list of patient
    // router.post("/patients/:id/studies", jsonParser, function (request, response) {
    //     let patientID = request.body.PatientID;
    //     studyServices.getList(patientID).then(function (value) {
    //         response.setHeader('Content-Type', 'application/json');
    //         response.status(200).json(value);
    //         console.log(value);
    //     }).catch(function (error) {
    //         response.send(error);
    //     })
    // })


    app.use('/', router);
    app.use('/patients', router);
    app.use('/patients/:id/studies', router);
    app.use('/instances/getFile', router);

}