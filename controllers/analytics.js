module.exports.overview = function (req, res) {
  res.status(200).json({
    overview: 'overview here'
  })
}

module.exports.analytics = function (req, res) {
  res.status(200).json({
    analytics: 'analytics here'
  })
}
