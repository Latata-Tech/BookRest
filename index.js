//191110597-Rizky Kurniawan pakpahan
const { app } = require("./config");
const cors = require("cors");
const routerAuthor = require("./routes/author.route");
const routerBook = require("./routes/book.route");
const routerAuth = require("./routes/auth.route");
// enable cors
app.use(cors());
app.use("/auth", routerAuth);
app.use("/authors", routerAuthor);
app.use("/books", routerBook);
