const { dotenv, express, cors, argon2, mongoose, jwt, cookieParser, cryptr } = require('./utils/requirements');
const userRoutes = require('./controllers/UserRoutes');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error:', err));

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));
app.use('/', userRoutes);
app.use(express.json());
app.use(cookieParser()); 
const PORT = 5500;


app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
