const request = require('request')

var geocodeAddress  = (address, callback) => {
    var encodedAddress = encodeURIComponent(address)
    
    request({
        // url: 'https://geocoder.api.here.com/6.2/geocode.json?app_code=xhAvj-cIIK1ZVUXv7O0lgA&app_id=IeINVSkvdwN4JMUwgY6L&&searchtext=1301%20lombard%20street%20philadelphia',
        url: `https://geocoder.api.here.com/6.2/geocode.json?app_code=xhAvj-cIIK1ZVUXv7O0lgA&app_id=IeINVSkvdwN4JMUwgY6L&&searchtext=${encodedAddress}`,
        json: true
    }, (error, response, body) => {    
        if(error){
            callback('Unable to connect' )
            // console.log('Unable to connect' )
        }else if(body.type=='ApplicationError'){
            callback('Unable to find that address')
            // console.log('Unable to find that address')
        }else if(body.Response.View[0].Result[0].Relevance==1){
            lat1 = body.Response.View[0].Result[0].Location.DisplayPosition.Latitude
            lat2 = body.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude
            lat3 = body.Response.View[0].Result[0].Location.MapView.TopLeft.Latitude
            lat4 = body.Response.View[0].Result[0].Location.MapView.BottomRight.Latitude
            lat = (lat1 + lat2 + lat3 + lat4) / 4
            long1 = body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
            long2 = body.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude
            long3 = body.Response.View[0].Result[0].Location.MapView.TopLeft.Longitude
            long4 = body.Response.View[0].Result[0].Location.MapView.BottomRight.Longitude
            long = (long1 + long2 + long3 + long4) / 4

            callback(undefined, {
                address : body.Response.View[0].Result[0].Location.Address.Label,
                latitude: lat,
                longitude : long
            })
            // console.log(`Address is ${body.Response.View[0].Result[0].Location.Address.Label}`)
            // console.log(`Latitude is ${lat}`)
            // console.log(`Longitude is ${long}`)
        }
    })

}
//end of geocode

// var geocodeAddressAlias ; 
module.exports.geocodeAddress = geocodeAddress