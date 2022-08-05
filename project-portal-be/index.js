require('dotenv').config();
const express = require('express');
const cors = require('cors'); //to acces backend api
const cookieParser = require('cookie-parser'); //parse all cookies
const session = require('express-session'); //creating a session and maintaining them
const bodyParser = require('body-parser'); //
const app = express();
const projects = require('./routes/project.routes');
const presentations = require('./routes/presentation.routes');
const proposal = require('./routes/proposal.routes');
const login = require('./routes/login.routes');
const staffD = require('./routes/dashboard.staff.routes');
const unitD = require('./routes/dashboard.unit.routes');
const proposalD = require('./routes/dashboard.proposal.routes');
const visitorD = require('./routes/dashboard.visitor.routes');
const reportD = require('./routes/dashboard.report.routes');
const projectD = require('./routes/dashboard.project.routes');
const presentationD = require('./routes/dashboard.presentation.routes');
const presenterD = require('./routes/dashboard.presenter.routes');

const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// enable CORS, credentials to true to allow cookies
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  })
);

app.use(
  session({
    key: 'userId',
    secret: 'KyqJDuvQwrRU4uHd',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 24 * 60 * 60 * 1000, // 24 hours,
    },
  })
);

app.use('/api', express.static('public')); // to serve static public files
app.use('/api/projects', projects);
app.use('/api/presentations', presentations);
app.use('/api/proposal', proposal);
app.use('/api/login', login);
app.use('/api/dashboard/staff', staffD);
app.use('/api/dashboard/unit', unitD);
app.use('/api/dashboard/proposal', proposalD);
app.use('/api/dashboard/visitor', visitorD);
app.use('/api/dashboard/report', reportD);
app.use('/api/dashboard/project', projectD);
app.use('/api/dashboard/presentation', presentationD);
app.use('/api/dashboard/presenter', presenterD);

//starts the server
app.listen(port, () => {
  console.log('Server started on: ' + port);
});
