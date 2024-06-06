// Middleware pour gérer les erreurs
exports.handleError = (err, req, res, next) => {
    res.status(500).send({ message: err.message });
};
