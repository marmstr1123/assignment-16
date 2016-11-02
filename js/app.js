console.log('wired up!')
console.log($)
var putOnPage = document.querySelector("#app-container")

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}

///router

function router(){
   var selectedProfile = window.location.hash.slice(1)
   console.log(window.location.hash)

   if(selectedProfile.length === 0){
      showHomePage()
      return
   }
   console.log(selectedProfile)
   showUserPage(selectedProfile)
}
// console.log( selectedProfile)
// console.log(putOnPage)
var showHomePage=function(){
   var profileString = '<div class="row">'
      //  profileString +='<div class="home button> FA bars </div>"'
       profileString +="<h1 class='theWho'>Who's Watching</h1>"

       for(var prop in  userList){

          console.log(prop)
         profileString +='<div class = "col-xs-6 col-md-3">'
         profileString +='<a href="#' +prop+ '">'
         profileString +='<div class="thumbnail">'
         profileString +='<img src="http://flathash.com/' +prop+ ' ">'
         profileString +='<h4>' + userList[prop].username + '</h4>'
         profileString +='</div>'
         profileString +='</a>'
         profileString +='</div>'
   }
         profileString +='</div>'
         console.log(userList[prop].showIds)
         putOnPage.innerHTML = profileString
}

function showUserPage(usr){
   var userObject = userList[usr]

   var userPageHTML = '<h3 class="homebutton"> <a href="#"> HOME </a> </h3>'
      userPageHTML += '<h2 class="nameGreeting"><span class="bg-danger">' + userObject.username + '\'s </span> List </h2>'
      userPageHTML += '<div class="row show-list"> </div>'

      putOnPage.innerHTML = userPageHTML

   var firstShowId = userObject.showIds[0]
   console.log('showId[0]', firstShowId)



   forEach(userObject.showIds, function(elementIdNum){
      console.log(elementIdNum)

      $.getJSON("http://api.tvmaze.com/shows/" + elementIdNum).then(function(dataResponse){
         console.log(dataResponse)

         //console.log(userList[selectedProfile])
         var showsListContainer = document.querySelector('.show-list')

         var showsHtml = '<div class="col-sm-3">'
            showsHtml += '<img src="' + dataResponse.image.medium +  '" alt="">'
            showsHtml += '<h4>' +dataResponse.name+ '</h4>'
            showsHtml += '</div>'

         showsListContainer.innerHTML += showsHtml

      })

   })

}



var userList = {
   sarah: {username: "Sarah", showIds: [170,169,175,318,76,270, 255]},
   ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
   michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
   justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},

}


window.addEventListener('hashchange', router)
router()
