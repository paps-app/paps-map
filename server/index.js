const port = process.env.PORT || 5000;
/* eslint no-console: 0 */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

// UserId = 59858

const express = require("express");
const bodyParser = require("body-parser");
const RapidAPI = require("rapidapi-connect");

const app = express();
app.use(bodyParser.json({ type: "application/json" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const rapid = new RapidAPI("rapid-tookan-api", "522981c3-2b69-4eb9-a0a4-2a06174487b0");

const objetcToQueryString = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");

const queryToObject = string =>
  JSON.parse(
    `{"${decodeURI(string)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );

function rapidOnly(func, args = {}) {
  return rapid
    .call("Tookan", func, {
      apiKey: "5462658cf0144e1d4742293e5c1021451ee4c5f22ada7e3e5a15",
      ...args
    })
    .on("error", payload => {
      throw new Error("Api is not responding");
    });
}

app.get("/api/v1/tasks", (req, res) => {
  console.log(req.query);
  if (req.query.jobId) {
    rapidOnly("getTask", { jobId: req.query.jobId, userId: req.query.userId }).on(
      "success",
      payload => {
        res.json({ payload });
      }
    );
    console.info("Querying 1 task from jobId 😃");
  } else if (req.query.orderId) {
    rapidOnly("getTaskFromOrderID", {
      orderId: req.query.orderId,
      userId: req.query.userId
    }).on("success", payload => {
      res.json({ payload });
    });
    console.info("Querying 1 task from orderId 😃");
  } else {
    rapidOnly("getAllTasks", { jobType: 0 }).on("success", payload => {
      res.json({ payload });
    });
    console.info("Querying all tasks from eveywhere 😃");
  }
});

app.get("/api/v1/customers", (req, res) => {
  if (req.query.isPagination) {
    rapidOnly("getCustomer", { isPagination: 1 }).on("success", payload => {
      res.json({ payload });
    });
    console.info("Querying customer with pagination");
  } else {
    rapidOnly("getCustomer").on("success", payload => {
      res.json({ payload });
    });
    console.info("Querying customer without pagination");
  }
});

app.get("/api/v1/createPDTask", (req, res) => {
  rapidOnly("createPickupAndDeliveryTask", queryToObject(req.query)).on(
    "success",
    payload => {
      res.json({ payload });
    }
  );
  console.info("Creating a task with Pickup and Delivery infos");
});

app.listen(port, () => console.log("API is running on localhost:5000 🎉 "));
