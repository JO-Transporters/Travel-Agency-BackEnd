const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const axios = require('axios');
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;
const ATLAS_MONGO_DB = process.env.ATLAS_MONGO_DB 


mongoose.connect(`${ATLAS_MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect('mongodb://localhost:27017/travel', { useNewUrlParser: true, useUnifiedTopology: true });



const HotelSchema = new mongoose.Schema({
    hotelName: String,
    hotelRate: String,
    location: String,
    hotelimg: String,
    price: String,


})
const PlaceSchema = new mongoose.Schema({
    name: String,
    img: String,
    hotels: [HotelSchema],
    slideShow:Array,
    center : Array,
});

const AdminSchema = new mongoose.Schema({
    email: String,
    places: [PlaceSchema]
});

const BookedSchema = new mongoose.Schema({
    hotelName: String,
    checkInDate: String,
    checkOutDate: String,
    visitorsNum: String,
    roomsNum: String,
    kidsNum: String,
    price:String,
})

const UserSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    phoneNumber: String,
    bookedData: [BookedSchema]



});
const UsersSchema = new mongoose.Schema({
    usersList: String,
    users: [UserSchema]
});



const adminModel = mongoose.model('Admin', AdminSchema);
const userModel = mongoose.model('User', UsersSchema);
const bookedModel = mongoose.model('BookedRoom', UserSchema);

function seedplaceCollection() {

    const Ibrahim = new adminModel(

        {
            email: 'ibrahimkuderat@gmail.com',
            places: [
                {
                    name: 'Aqaba',


                    img: 'https://images.unsplash.com/photo-1613778916205-4834433f0047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXFhYmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',

                    hotels: [
                        {
                            hotelName: 'Movenpick',
                            hotelRate: '',
                            location: '',
                            hotelimg: 'data:image/jpeg;base64,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'

                        },
                        {
                            hotelName: 'inter continental',
                            hotelimg: 'data:image/jpeg;base64,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NO+t1iwMq54R/XfUltPxj30VNcLVRCkWTxaprZHaanM1U++KohYttez1q5co3Ae4UJzhrymaJFWN02iQIbK47HGb3HrDyIqznLL/AG7R7vpF9xhh72pJmiuh6LSiahucA51tslz/AE2180aG+FBXHdTDSDxDAg+41WlzXdRy7WcCGi4v2bgzj3nUeRFA4otSYvZ0PWQe4VzmbZ1yj3kVotm7PsYokKjWWH2XLKfusJH+6lWLwS27hTfB37p8qW3XAaRC2g4My+DH51aLpG8k9hND5ANYqfORu9aW1YxOgoXW4GPAV3Mx40E2JPZU0vGq0E1hBburxRT21E3J4VyarSXZPIP5R+Rqpl/6/wC6nXgalEs8l64vVd19lmX0NFrtjEAQbrEfthX/ABg0EdalFVVlWFNtGevYsN383lPvQioNiMOethivel1vRw1CGo1HCyag1beDO5sQniLbj4Qa4dn2W6mKTwuW3T46ihVWaqalvGEpBv8AcTnqXLFzuS4s+5ooPE2btpsj5kaAYDjcd3VNVnWuADsqtAWout466N11/Np9aJTbF4fWB8VX8qXg1OKBwXYSkw59qM2j20byI+dCXLyEn6Jf/wBjflVM6xUpqtCRHJs//9k='
                        }
                    ]
                },

                {
                    name: 'Petra',

                    img: 'https://images.unsplash.com/photo-1563177682-6af44e531038?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGV0cmF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',

                    hotels: [

                    ]
                }
            ]
        })

    Ibrahim.save();
}


// seedplaceCollection();

function seedUserCollection() {
    const user = new userModel({
        usersList: 'usersList',
        users: [
            {
                userName: "Mosaab Alhayek ???????? ????????????",
                userEmail: "alhayek214@gmail.com",
                phoneNumber: "0780374982",
                bookedData: [{
                    hotelName: "Royal",
                    checkInDate: "",
                    checkOutDate: "",
                    visitorsNum: "",
                    roomsNum: "",
                    kidsNum: ""
                }]
            }

        ]
    })
    user.save();
}
// seedUserCollection();

//http://localhost:3001/places?userEmail=ibrahimkuderat@gmail.com


// These requests for Places Information
server.get('/places', gettingPlaces);
server.post('/add', addPlace);
server.delete('/delete/:placeId', deletePlace)
server.put('/update/:placeId', updatePlace)

// These requests for Hotels Information
server.post('/addHotel/:Id', addHotel);
server.delete('/deletehotel/:placeId/:hotelIndex', deleteHotel)
server.put('/updatehotel/:placeId/:hotelIndex', updateHotel)

// // These requests for Booked Rooms Information

server.get('/mybooks/:email', myBooks)
server.post('/addnewbook', bookroom);
server.put('/updatebook/:id/:email', updateBookedData);
server.delete('/deletebook/:id/:email', deletebookedData);








function gettingPlaces(req, res) {
    // let userEmail = req.query.userEmail;

    adminModel.find({ email: 'ibrahimkuderat@gmail.com' }, function (error, userData) {
        if (error) {
            res.send('did not work')
        } else {
            res.send(userData[0].places)
        }
    })
}


function addPlace(req, res) {
    const { name, img ,slideShowimg ,center} = req.body;
   

    adminModel.find({ email: 'ibrahimkuderat@gmail.com' }, function (error, userData) {
        if (error) {
            res.send('did not work')
        } else {
            userData[0].places.push({
                name: name,
                img: img,
                slideShow:slideShowimg,
                center : center,
            })
            userData[0].save()
            res.send(userData[0].places)
        }
    })

}

function deletePlace(req, res) {
    let placeIndex = Number(req.params.placeId)

    adminModel.find({ email: 'ibrahimkuderat@gmail.com' }, function (error, userData) {
        if (error) {
            res.send('did not work')
        } else {
            let filterdPlaces = userData[0].places.filter((place, index) => {
                if (index !== placeIndex) { return place }
            })

            userData[0].places = filterdPlaces
            userData[0].save();
            res.send(userData[0].places)
        }
    })

}


function updatePlace(req, res) {
    let placeIndex = req.params.placeId;
    const { name, img, slideShowimg,hotels,center} = req.body;

    adminModel.findOne({ email: 'ibrahimkuderat@gmail.com' }, function (error, userData) {
        if (error) { res.send('did not work') }
        else {
            // let hotel=userData.places[placeIndex]
            userData.places.splice(placeIndex, 1, {
                name: name,
                img: img,
                slideShow:slideShowimg,
                hotels:hotels,
                center : center,
            })
            userData.save();
            res.send(userData.places)
        }
    })
}

function addHotel(req, res) {
    placeIndex = Number(req.params.Id);

    const { hotelName, hotelimg, hotelRate, location ,price} = req.body;

    adminModel.find({ email: 'ibrahimkuderat@gmail.com' }, function (error, userData) {
        if (error) {
            res.send('did not work')
        } else {
            userData[0].places[placeIndex].hotels.push({
                hotelName: hotelName,
                hotelRate: hotelRate,
                location: location,
                hotelimg: hotelimg,
                price: price

            })
            userData[0].save()
            res.send(userData[0].places)
        }
    })


}

function deleteHotel(req, res) {
    placeIndex = Number(req.params.placeId);
    hotelIndex = Number(req.params.hotelIndex);

    adminModel.find({ email: 'ibrahimkuderat@gmail.com' }, function (error, userData) {
        if (error) {
            res.send('did not work')
        } else {
            let filterdHotels = userData[0].places[placeIndex].hotels.filter((hotel, index) => {
                if (index !== hotelIndex) { return hotel }
            })

            userData[0].places[placeIndex].hotels = filterdHotels
            userData[0].save();
            res.send(userData[0].places)
        }
    })


}

function updateHotel(req, res) {
    let placeIndex = req.params.placeId;
    let hotelIndex = req.params.hotelIndex;
    const { hotelName, hotelRate, location, hotelimg ,price} = req.body


    adminModel.findOne({ email: 'ibrahimkuderat@gmail.com' }, function (error, userData) {
        if (error) { res.send('did not work') }
        else {
            userData.places[placeIndex].hotels.splice(hotelIndex, 1, {
                hotelName: hotelName,
                hotelRate: hotelRate,
                location: location,
                hotelimg: hotelimg,
                price: price
            })
            userData.save();
            res.send(userData.places)
        }
    })



}

// User Functionality :


function myBooks(req, res) {


    const userEmail = req.params.email;
    userModel.find({ usersList: "usersList" }, function (error, userData) {
        if (error) {
            res.send(error);
        } else {
            let returnedUser = userData[0].users.filter(user => {

                if (user.userEmail == userEmail) { return user }
            })
            res.send(returnedUser)
        }
    })
}

function bookroom(req, res) {
    const { hotelName, checkInDate, checkOutDate, visitorsNum, roomsNum, kidsNum, userName, userEmail, phoneNumber ,price} = req.body;


    userModel.find({ usersList: "usersList" }, function (error, userData) {
        if (error) {
            res.send(error);
        } else {
            let returnedUser = userData[0].users.filter(user => {
                // If the user existed 
                if (user.userEmail == userEmail) {

                    user.bookedData.push({
                        hotelName: hotelName,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        visitorsNum: visitorsNum,
                        roomsNum: roomsNum,
                        kidsNum: kidsNum,
                        price: price,
                    })
                    userData[0].save();
                    res.send(user);

                    return user
                }
            })
           
            //To ckeck if there in no user
            if (returnedUser.length == 0) {
                userData[0].users.push({
                    userName: userName,
                    userEmail: userEmail,
                    phoneNumber: phoneNumber,
                    bookedData: [{
                        hotelName: hotelName,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        visitorsNum: visitorsNum,
                        roomsNum: roomsNum,
                        kidsNum: kidsNum,
                        price: price,
                    }]
                })
                userData[0].save();

                let user = userData[0].users.filter(user => {
                    if (user.userEmail == userEmail) {
                        return user
                    }
                })

                res.send(user);

            }




        }

    })
}

function updateBookedData(req, res) {
    let bookedId = Number(req.params.id);
    let userEmail = req.params.email;

    const {hotelName, checkInDate, checkOutDate, visitorsNum, roomsNum, kidsNum ,price} = req.body;

    userModel.find({ usersList: "usersList" }, function (error, userData) {
        if (error) {
            res.send(error);
        } else {
            userData[0].users.filter((user, userIndex) => {

                if (user.userEmail == userEmail) {

                    let updatedBooks = userData[0].users[userIndex].bookedData.splice(bookedId,1,{
                        hotelName : hotelName,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        visitorsNum: visitorsNum,
                        roomsNum: roomsNum,
                        kidsNum: kidsNum,
                        price : price,
                    })
                    userData[0].save();

                    res.send(userData[0].users[userIndex]);

                }
            })
        }
    })




   
}

function deletebookedData(req, res) {
    let bookedIndex = Number(req.params.id);

    const userEmail = req.params.email;

    userModel.find({ usersList: "usersList" }, function (error, userData) {
        if (error) {
            res.send(error);
        } else {
            userData[0].users.filter((user, userIndex) => {

                if (user.userEmail == userEmail) {

                    let filteredBooks = userData[0].users[userIndex].bookedData.filter((book, index) => {
                        if (index !== bookedIndex) { return book }

                    })
                    userData[0].users[userIndex].bookedData = filteredBooks;
                    userData[0].save();
                    res.send(userData[0].users[userIndex].bookedData);

                }
            })
        }
    })
}




server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})