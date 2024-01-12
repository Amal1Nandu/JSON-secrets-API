import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//3 types of auth.
const yourUsername = "amal";
const yourPassword = "kaTTachira";
const yourAPIKey = "de23c71b-d00b-4ac8-9dad-678c973e8cc1";
const yourBearerToken = "ba358f20-8a0f-438a-8b0c-d544439df33d";

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "API Response." });
});

// no Autherisation
app.get("/noAuth", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "random");
        const result = response.data;
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

// basicAutharisation
app.get("/basicAuth", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "all?page=2", {
            auth: {
                username: yourUsername,
                password: yourPassword,
            },
        });
        const result = response.data;
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

// API key
app.get("/apiKey", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "filter", {
            params: {
                score: 5,
                apiKey: yourAPIKey,
            },
        });
        const result = response.data;
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

// bearerToken
app.get("/bearerToken", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "secrets/42", {
            headers: { Authorization: `Bearer ${yourBearerToken}` },
        });
        const result = response.data;
        res.render("index.ejs", { content: JSON.stringify(result) });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
