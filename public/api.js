
class Api {
    constructor (){
    }
    fetch () {
      return   $.ajax({
            method: "GET",
            url: "/post"});
    };
}

const api = new Api() ; 
export default  api  ;