const errorHandler = (error, request, response, next) => {
    //TODO: handle gracefully
    response.status(500).json(error)
}

export default errorHandler