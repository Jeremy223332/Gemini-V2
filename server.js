```javascript
const express = require("express");
const path = require("path");

const app = express();

// Render provides the PORT automatically
const PORT = process.env.PORT || 10000;

// Serve our website files
app.use(express.static(path.join(__dirname)));

// Basic API test
app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        name: "My AI",
        message: "My AI backend is running!"
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ My AI is running on port ${PORT}`);
});
```
