const errorHandler = (error, request, response, next) => {
    //TODO: handle gracefully
    console.log('err', error)
    response.status(500).json(error)
}

export default errorHandler