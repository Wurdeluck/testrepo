const app = require('./app')
const port = process.env.PORT || 5000

// Only for testing purposes
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Working'
//   })
// })

app.listen(port, () => console.log(`Server has been started on port ${port}`))
