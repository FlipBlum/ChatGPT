// An express server, which will handle api requests coming in and responding back with a JSON object, 
// it will use body parser as well as cors

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-zOSWEeMVy9mC1fNd86druzhD",
    apiKey: "sk - KCzSY1AMeoICSjmkURz5T3BlbkFJWMVktCbcl5as8oDx8OS8",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        maxTokens: 10,
        temperature: 0.9,
    });
    console.log(response.data);
    if (response.data.choices[0].text) {
        res.json({ message: response.data.choices[0].text });
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
