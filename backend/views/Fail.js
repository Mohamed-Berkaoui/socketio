class FailRes{
        constructor(message){
        this.statusCode=400
        this.status="FAIL"
        this.message=message
    }
}

module.exports=FailRes