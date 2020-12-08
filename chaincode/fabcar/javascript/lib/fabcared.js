'use strict';

const { Contract } = require('fabric-contract-api');

var Event = {
	EventID        :'',
	EventName      :'',      
	EventDetails   :'',   
	DonatedAmount  :0 ,
	EventDuration	:0,
	EventStartDate	:''	,
	DonationIDs     :[]    
	}

class FabCar extends Contract {

		


	async initLedger(ctx){
	 	Event.EventID='E1';
	 	Event.EventName='Project Funding';
        //await ctx.stub.putState("E1",Event);
        await ctx.stub.putState("test","hello world")
        return "success"
    }

    async queryEvent(ctx,EventID){
    	var response = await ctx.stub.getState(EventID)
    	return response.toString();
    }


    async donateMoney(ctx,_donatedQuantity,contactNumber,userName,email){
    var Contactnumber 
  	var existingVal 
  	var donatedQuantity 
	var donationIDArr []
	var userID 
	var donationID 
	var newDonationID 
	var numOfDonationsMade 

	donatedQuantity= _donatedQuantity;
	var event =await ctx.stub.GetState("E1")
	donationIDArr = event.DonationIDs
	numOfDonationsMade=donationIDArr.length
	if(numOfDonationsMade==0){
		newDonationID = 100
	}else{
		split_donation_id =donationIDArr[numOfDonationsMade-1].split("D")
		newDonationID=split_donation_id[1]
	}
	newDonationID = newDonationID + 1
	donationID = "D"+newDonationID 
	userID = "U"+newDonationID 

	existingVal = event.DonatedAmount
	
		event.DonatedAmount = existingVal + donatedQuantity
		event.DonationIDs.push(donationID)
		await ctx.stub.PutState("E1", event)
	var donate = {
		DonationID: donationID,
		EventID: "E1",
		UserID: userID,
		DonationAmount: donatedQuantity
		}

	await ctx.stub.PutState(donationID, donate)

	var user = {
		UserID: userID, 
		Username: userName, 
		ContactNumber: contactNumber, 
		EmailID:email
	}

	await ctx.stub.PutState(userID,user)

	return "success"



    }


}

module.exports = FabCar
