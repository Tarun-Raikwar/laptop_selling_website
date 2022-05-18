const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect } = require("statuses");
const { json } = require("body-parser");
const { reject, concatSeries } = require("async");
const { string } = require("optimist");
const { query } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {google} = require("googleapis");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

let i = 0;

var Storage = multer.diskStorage({
    destination: "./public/upload",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + i + path.extname(file.originalname));
        i++;
    }
});

var upload = multer({
    storage: Storage
});

var multipleUpload = upload.fields([{ name: "file1", maxCount: 7 }, { name: "file2", maxCount: 15 }]);


var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());


// ******************* database *****************************

mongoose.connect("mongodb://localhost:27017/MPSERVICES");

const membersSchema = new mongoose.Schema({
    name: String,
    PhNo: Number,
    Email: String,
    pass: String
});

const members = mongoose.model("members", membersSchema);


const laptop_schema = new mongoose.Schema({
    link: [String],
    length: Number,
    overview: String,
    detail: String,
    price: Number,
    series: String,
    brand: String,
    cpu: String,
    color: String,
    about: String,
    graphic_card: String
})

const laptops = mongoose.model("laptops", laptop_schema);

const qeury_schema = new mongoose.Schema({
    date: String,
    time: String,
    name: String,
    PhNo: String,
    Email: String,
    message: String
})

const queries = mongoose.model("queries", qeury_schema);

// ******************* database end *************************



// ******************************* web page endpoints ********************************


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/home/home.html");
});

app.get('/laptop', (req, res) => {
    laptops.find(function (err, All_Laptops) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(All_Laptops);
        }
    })
})

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/home/signup.html");
})

app.get("/contact", function (req, res) {
    res.sendFile(__dirname + "/home/contact.html");
})


app.get('/Admin', (req, res) => {
    res.sendFile(__dirname + "/Admin/Admin.html");
})

app.get("/product", (req, res) => {
    res.sendFile(__dirname + "/home/product.html");
})

app.get('/customer_query', (req, res) => {
    res.sendFile(__dirname + "/Admin/customer_query.html");
})

app.get("/query", (req, res) => {
    queries.find((err, all_query) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(all_query);
        }
    })
})


app.get('/search', (req, res) => {

    res.sendFile(__dirname + "/home/search.html");
})

app.get("/buy_now", (req, res)=>{
    res.sendFile(__dirname + "/home/index.html");
})

// ******************************* web page endpoints ********************************

const d = new Date();

app.post("/query", (req, res) => {
    // console.log(req.body);
    const query = new queries({
        date: "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "",
        time: "" + d.getHours() + ":" + d.getMinutes + "",
        name: req.body.name_cust,
        PhNo: req.body.phone,
        Email: req.body.email,
        message: req.body.message
    })
    query.save();
    res.redirect('/contact');
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    members.findOne({ Email: req.body.user_id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            if (data == null) {
                res.send(false);
            }
            else {
                if (data.pass == req.body.password) {
                    res.cookie("userdata", req.body);
                    res.send(data);
                }
                else {
                    res.send(false);
                }
            }
        }
    })
})

app.get("/check_login", (req, res) => {
    members.findOne({ Email: req.cookies.userdata.user_id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            if (data == null) {
                res.send(false);
            }
            else {
                res.send(data);
            }
        }
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie("userdata");
    res.redirect('/');
})


app.post('/signup_data', function (req, res) {
    const member = new members({
        name: req.body.name_cust,
        PhNo: req.body.Phone_number,
        Email: req.body.Email,
        pass: req.body.password
    })
    member.save();
    res.redirect("/signup");
})


app.get("/product_data", function (req, res) {
    res.send(req.cookies.product);
})

app.post("/product", function (req, res) {
    res.cookie("product", req.body);
    res.send(req.body);
})


// ******************** drvie ***********************

const CLIENT_ID = "461770036166-fj3mlrvmmiao1frc29552k63nnn3k50j.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//0480uiIcS-mOLCgYIARAAGAQSNwF-L9IrPuMZAfIMscDYaOWI_SVyOUWIoGAUqi0oQy7XpCyF4YSHaKuI3fnoJoBcuu-Hmr2Tkog";

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: "v3",
    auth: oauth2Client
})

// const filepath = path.join(__dirname, "1.jpg");


async function upload_drive(filename, filepath){
    try {
    
        const response = await drive.files.create({
            requestBody:{
                name: filename,
                mimeType: "image/jpg"
            },
            media: {
                mimeType: "image/jpg",
                body: fs.createReadStream(filepath)
            }

        });

        return response.data.id;

    } catch (error) {
        console.log(error);
    }
}


// upload();

async function link(filelink){
    try {
        const fileId = "1Q_npXrJNgSUY4AyUjG08s--PNJR-a3me";
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        })
        const result = await drive.files.get({
            fileId: fileId,
            fields: "webViewLink, webContentLink"
        })
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

function upload_to_drive(){

}

// ******************** drvie ***********************

app.post('/upload_product', multipleUpload, async function (req, res) {
    console.log(req.body);
    var link_array = new Array;

    let temp = await upload_drive("file10", "./public/upload/file10" + ".jpg");
    link_array.push(temp);
    for(let i=1; i<req.body.length; i++){
        temp = await upload_drive("file2"+i, "./public/upload/file2" + i + ".jpg");
        link_array.push(temp)
    }
    const laptop = new laptops({
        link: link_array,
        length: req.body.length,
        overview: req.body.overview,
        detail: req.body.detail,
        price: req.body.price,
        series: req.body.series,
        brand: req.body.brand,
        cpu: req.body.cpu_manufacture,
        color: req.body.color,
        about: req.body.about,
        graphic_card: req.body.graphic_card
    })
    i = 0;
    console.log(link_array);
    // fs.promises.rmdir("./public/upload", {
    //     recursive: true
    // })
    laptop.save();
    res.redirect('/Admin');
})


app.post("/search", (req, res) => {
    console.log(req.body);
    res.cookie("search", req.body);
    res.send(req.body);
})

app.get("/search_product", (req, res) => {
    res.send(req.cookies.search);
})


// *************************** payment ***************************

const https = require("https");
const qs = require("querystring");

const checksum_lib = require("./Paytm/checksum");
const config = require("./Paytm/config");

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

app.post("/paynow", [parseUrl, parseJson], (req, res) => {
    // Route for making payment
  
    var paymentDetails = {
      amount: req.body.amount,
      customerId: req.body.name.replace(/\s/g,''),
      customerEmail: req.body.email,
      customerPhone: req.body.phone
  }
  if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
      res.status(400).send('Payment failed')
  } else {
      var params = {};
      params['MID'] = config.PaytmConfig.mid;
      params['WEBSITE'] = config.PaytmConfig.website;
      params['CHANNEL_ID'] = 'WEB';
      params['INDUSTRY_TYPE_ID'] = 'Retail';
      params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
      params['CUST_ID'] = paymentDetails.customerId;
      params['TXN_AMOUNT'] = paymentDetails.amount;
      params['CALLBACK_URL'] = 'http://localhost:3000/callback';
      params['EMAIL'] = paymentDetails.customerEmail;
      params['MOBILE_NO'] = paymentDetails.customerPhone;
  
  
      checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
          var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        //   var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
  
          var form_fields = "";
          for (var x in params) {
              form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
          }
          form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
  
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
          res.end();
      });
  }
});

app.post("/callback", (req, res) => {
    // Route for verifiying payment
  
    var body = '';
  
    req.on('data', function (data) {
       body += data;
    });
  
     req.on('end', function () {
       var html = "";
       var post_data = qs.parse(body);
  
       // received params in callback
       console.log('Callback Response: ', post_data, "\n");
  
  
       // verify the checksum
       var checksumhash = post_data.CHECKSUMHASH;
       // delete post_data.CHECKSUMHASH;
       var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
       console.log("Checksum Result => ", result, "\n");
  
  
       // Send Server-to-Server request to verify Order Status
       var params = {"MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID};
  
       checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
  
         params.CHECKSUMHASH = checksum;
         post_data = 'JsonData='+JSON.stringify(params);
  
         var options = {
           hostname: 'securegw-stage.paytm.in', // for staging
           // hostname: 'securegw.paytm.in', // for production
           port: 443,
           path: '/merchant-status/getTxnStatus',
           method: 'POST',
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
             'Content-Length': post_data.length
           }
         };
  
  
         // Set up the request
         var response = "";
         var post_req = https.request(options, function(post_res) {
           post_res.on('data', function (chunk) {
             response += chunk;
           });
  
           post_res.on('end', function(){
             console.log('S2S Response: ', response, "\n");
  
             var _result = JSON.parse(response);
               if(_result.STATUS == 'TXN_SUCCESS') {
                   res.send('payment sucess')
               }else {
                   res.send('payment failed')
               }
             });
         });
  
         // post the data
         post_req.write(post_data);
         post_req.end();
        });
       });
});




app.listen(process.env.PORT || 3000, function () {
    console.log("srever is running at 3000");
});