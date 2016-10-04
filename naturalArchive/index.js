'use strict';

var APP_NAME = 'Natural Archive'; 
var APP_ID = 'amzn1.ask.skill.1ac0ee01-707a-4600-ab35-238842c6c7eb';
var APP_STATES = {
    START: '_STARTMODE', // Entry point, start the app.
    RECIPE: '_RECIPEMODE', // Q and A for selecting a recipe.
    HELP: '_HELPMODE' // Help for users.
};

var DISCLAIMER = "Please note that the following advices are for informational purposes only.";

var APP_LOGO;
var remedies = [
    {
        'sore throat': [
            'Gargle twice daily with a solution of six pressed garlic cloves mixed into a glass of warm (not hot) water. Follow the regimen for 3 days. ',
            'Drink Licorice Root Tea. Prepare it by adding one cup of dry Licorice root to two cup of water and, after bringing it to boil, let it simmer for ten minutes. ',
            'Drink warm milk with a teaspoon, or two, of honey, to soothe dry or raw sore throat. '
        ],
        'desc': [
            'Garlic is a natural remedy that can get rid of sore throat quickly. The reason lies in the garlic’s allicin, a compound that can kill the bacteria that causes strep and fight the germs causing pain and irritation.',
            'With licorice root tea you can get some relief for your sore throat, this thanks to the anti-viral and anti-inflammatory properties of licorice root that help reduce swelling and irritation, and soothe the mucus membranes in your throat.',
            'Milk is perfect to help reliefing the soreness of a raw or dry throat because it will naturally increase mucus production and coat your throat, making it less irritated.'
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/garlic.jpg'],//garlic
            ['https://s3.amazonaws.com/herbalist-bucket/licorice.jpg'],//licorice
            ['https://s3.amazonaws.com/herbalist-bucket/milk-glass.jpg'] //milkhoney
        ]    
    },
    {
        'skin burns': [
            'To soothe the pain, apply aloe vera gel to the burn as needed. ',
            'Cut a slice of raw potato and rub it on the burn, making sure the juice from the potato is releasing over the area. ',
            'Take coconut oil and add a little lemon juice to it. Mix it properly and apply it on the affected area to facilitate healing. '
        ],
        'desc': [
            'With its natural properties, Aloe is probably one of the most well known home remedy for burns. That is, it will stop pain and inflammation, reduce swelling, and stimulate skin growth and repair.',
            'Apparently the juices of this stem vegetable help the healing process after a minor skin burn. Before applying it washing the part with cold water will help a burn from spreading. ',
            'Coconut oil is an perfect source of skin-healing vitamin E and it also contains fatty acids that are anti-fungal and anti-bacterial, which help keep your burn from becoming infected.'
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/aloe.jpg'],//aloe
            ['https://s3.amazonaws.com/herbalist-bucket/potatoes.jpg'],//halfpotato
            ['https://s3.amazonaws.com/herbalist-bucket/coconut.jpg'] //coconoil
        ] 
    },
    {
        'nausea':[
            'Thinly slice fresh ginger and infuse in hot water. Strain and then freeze the concoction in ice cube trays. Crush the cubes and suck the icy ginger slices throughout the day. ',
            'Dip a cotton swab, or use your fingers, to apply a few drops of peppermint oil directly to your gums, and reapply if necessary. '
        ],
        'desc': [
            'Ginger promotes the secretion of various digestive juices/enzymes that help neutralize stomach acid. It also contains phenols that relax stomach muscles and act similar to a sedative on irritated stomach tissue, reducing over activity of the stomach.',
            'Peppermint fresh scents have the remarkable ability to tame an upset stomach. It has several forms that lend themselves to natural remedies, such as tea or oil.'
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/ginger.jpg'],//ginger
            ['https://s3.amazonaws.com/herbalist-bucket/mint.jpg'],//peppermintoil
        ] 
    },
    {
        'hiccups': [
            'Eat 1 spoonful of peanut butter and hold it in your mouth for ten seconds, before swallowing it. Alternatively try to swallow 1 teaspoon of salt followed by a small sip of water.'
        ],
        'desc': [
            'The reasons behind the remedies to cure hiccups are that the breathing need resetting so any weird breathing pattern would do the trick. Breathe in as much as possibe, without letting any air out and swallowing afterward seems to do the job as well.'
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/sugar.jpg']//sugar
        ]
    },
    {
        'cough': [
            'Breathe the steam from a bowl halfway filled with boiling water, 2 drops of tea tree oil, and 2 of eucalyptus oil. ',
            'This method is not for kids under 2 years of age. Take 2 teaspoons of organic raw honey, 30 minutes before bed. '
        ],
        'desc': [
            'The steam with the infused essential oils quickly and effectively loosen mucous and phlegm almost immediately, and will impart wonderful healing benefits: anti-viral, anti-bacterial and anti-inflammatory. Those become airborne, so you inhale them while you breathe in the steam.',
            'Honey is a rich demulcent, with a high viscosity and stickiness that does an incredible job of coating and soothing those irritated mucous membranes, and thanks to its natural antibacterial properties may help shorten how long the cough will last. '
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/steam.jpg'],//darkchoco
            ['https://s3.amazonaws.com/herbalist-bucket/honey.jpg'] //honey
        ]
    },
    {
        'fever': [
            'Steep 1 tablespoon of dried elderflowers in a cup of hot water for 15 minutes, then sip. Drink three to four cups a day. '   
        ],
        'desc': [
            'Elderflower happens to be good for other problems associated with flu and colds, like overproduction of mucus. It also helps you sweat which is said to help move a fever toward its end.',
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/linden-tree.jpg'],//lindenflowers
        ]
    },
    {
        'chapped lips': [
            'Rub on Evo olive oil two or three times a day to soothe, soften, and lubricate. '
        ],
        'desc': [
            'Rubbing oil on your lips will sooth and moisturize your lips while also protecting them from further damage. Use natural moisturizers made from nut oils and seed butters.',
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/olive-oil.jpg'],//oliveoil
        ]
    },
    {
        'gas and bloating': [
            'Start preparing some pumpkin by taking off the seeds, cut it in cubes, and then bake it, steam it, or use your preferred recipe. Have it with your meal to ward off gas. ',
            'Try with a diet low in dietary fibre. Avoiding high in fiber foods will diminish the chances of dealing with improper food digestion. For example you could eat well cooked vegetables or fruits without skin or seed, white bread over whole grain one, and eggs and fish. ',
            'Have a glass of warm lemon water every morning before breakfast. Lemon is good for you in multiple ways, including helping when it comes to easing your gas pain. '
        ],
        'desc': [
            'Pumpkin contains a good amount of vitamin A, potassium and fiber that help in digestion. Adding just one cup of pumpkin to your meals can help create a smooth digestive flow and reduce gas.',
            'Here is a list of low-fiber foods and lists of higher-fiber foods you should avoid. Remember to always choose foods that you would normally eat. Do not try any foods that caused you discomfort or allergic reactions in the past.\n EAT:\n - Tender cuts of meat, Ground meat, Tofu, Fish and Shellfish, Eggs, Rice, Noodles, White bread\n AVOID:\n - All beans, Nuts, Peas, Lentils, Legumes, Processed meats, Hot dogs, Sausage, Whole grains, Cracked grains, Whole wheat products, All raw or steamed vegetables or fruits',
            'The acidity in lemon stimulates the production of HCL (hydrochloric acid) which is what breaks down our food. More HCL = food breaking down more efficiently = less bloating and gas. The water flushes your system and keeps your digesting tract moving along smoothly. This mixture also works as a mighty fine way to detoxify your entire body, because the lemon helps the livers enzymes work more efficiently.'
        ],
        'imgs': [   
            ['https://s3.amazonaws.com/herbalist-bucket/pumpkin.jpg'],//pumpkin
            ['https://s3.amazonaws.com/herbalist-bucket/tuna.jpg'],//lowfibre
            ['https://s3.amazonaws.com/herbalist-bucket/lemonade.jpg']//lemonade
        ]
    },
    {
        'dandruff': [
            'Boil a handful of neem leaves in four cups of water. Cool and strain the solution and use it as a hair rinse two or three times a week. ',
            'Mix some coconut oil to the juice of half lemon. Rub it on your scalp and massage for a few minutes. Let it rest and after 20 minutes rinse it off. Follow this method two or three times a week. ',
            'Wet your hair and rub a handful of baking soda onto your scalp. After a couple of minutes, rinse your hair well with warm water, remembering not to shampoo afterward. Repeat once or twice a week for a few weeks. '
        ],
        'desc': [
            'The antifungal and antibacterial properties of Indian lilac, also known as neem, help treat dandruff as well as many other hair problems like scalp acne, itchy scalp, and hair fall efficiently.',
            'Coconut oil helps eliminate dandruff due to its antifungal properties. It also moisturizes dry scalp and provides relief from itching.',
            'Being a mild exfoliant, baking soda helps remove dead skin cells and absorbs excess oil. It can also help balance pH levels on the scalp and reduce the growth of fungi that cause dandruff.'
        ],
        'imgs': [
            ['https://s3.amazonaws.com/herbalist-bucket/neem.jpg'],//neem
            ['https://s3.amazonaws.com/herbalist-bucket/coconut.jpg'],//coconoil
            ['https://s3.amazonaws.com/herbalist-bucket/baking-soda.jpg']//bakingsoda
        ]
    },
    {
        'bruises': [
            'Apply arnica ointment or gel to the bruise daily. ',
            'To speed the paling process, apply ice as soon as possible, and take it off after 10 minutes and wait 20 minutes before reapplying. Wrapping an elasting bandage around the bruised part could help as well. ',
        ],  'An all natural remedy involves in taking an handful of fresh parsley leaves, crushing them, and spreading them over the bruise, and wrapping the part with a bandage. '
        'desc': [
            'Arnica is an herb that has long been recommended for bruises. It contains a compound that reduces inflammation and swelling.',
            'By cooling the blod vessels around the bruised area less blood will leak out into the surrounding tissue. The same applies for bandaging the part.',
            'Some experts claim that parsley decreases inflammation, reduces pain, and can make the bruise fade more quickly.'
        ],
        'imgs': [
            ['https://s3.amazonaws.com/herbalist-bucket/arnica.jpg'],//neem
            ['https://s3.amazonaws.com/herbalist-bucket/ice.jpg'],//coconoil
            ['https://s3.amazonaws.com/herbalist-bucket/parsley.jpg']//bakingsoda
        ]
    },
    {
        'dry hands': [
            'Apply arnica ointment or gel to the bruise daily. ',
            'To speed the paling process, apply ice as soon as possible, and take it off after 10 minutes and wait 20 minutes before reapplying. Wrapping an elasting bandage around the bruised part could help as well. ',
        ],  'An all natural remedy involves in taking an handful of fresh parsley leaves, crushing them, and spreading them over the bruise, and wrapping the part with a bandage. '
        'desc': [
            'Arnica is an herb that has long been recommended for bruises. It contains a compound that reduces inflammation and swelling.',
            'By cooling the blod vessels around the bruised area less blood will leak out into the surrounding tissue. The same applies for bandaging the part.',
            'Some experts claim that parsley decreases inflammation, reduces pain, and can make the bruise fade more quickly.'
        ],
        'imgs': [
            ['https://s3.amazonaws.com/herbalist-bucket/arnica.jpg'],//neem
            ['https://s3.amazonaws.com/herbalist-bucket/ice.jpg'],//coconoil
            ['https://s3.amazonaws.com/herbalist-bucket/parsley.jpg']//bakingsoda
        ]
    }
];

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, recipeStateHandlers, helpStateHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    /**
     * Entry point. Start a new session. Handle any setup logic here.
     */
    'NewSession': function () {
        console.log(this.event.request.type);
        if (this.event.request.type !== "IntentRequest") {
            this.handler.state = APP_STATES.START;
            this.emitWithState('StartApp');
        }
        else {
            if (this.event.request.intent.name === "ListReqIntent") {this.handler.state = APP_STATES.RECIPE; this.emitWithState('browseList');}
            if (this.event.request.intent.name === "AMAZON.HelpIntent") {this.handler.state = APP_STATES.HELP; this.emitWithState('helpTheUser');}
            else {
                this.handler.state = APP_STATES.RECIPE; 
                Object.assign(this.attributes, {
                    'solutionNum': 0,
                    'quit': false,
                    'idx': 0
                });
                handleUserRequest.call(this,this.attributes['solutionNum']);
            }  
        }
    }
};

var startStateHandlers = Alexa.CreateStateHandler(APP_STATES.START, {
    'StartApp': function () { 
        //need to insert a welcoming sound
        
        // if (this.event.request.type !== "LaunchRequest"){
        //     this.handler.state = APP_STATES.RECIPE;
        //     this.attributes['solutionNum']=0;
        //     
        // }

        var speechOutput = this.event.session['new'] ? 'Welcome to '  + APP_NAME + ', your personal guide to natural remedies. ' : '';
        speechOutput += 'Ask me for a remedy. ';

        // Select a random remedy to suggest to the user
        var randRemedy = Math.floor(Math.random() * remedies.length);
        
        var repromptText = 'Ask me for a remedy. You could ask me a remedy for '+ Object.keys(remedies[randRemedy])[0] + ' for example. ';

        Object.assign(this.attributes, {
            'speechOutput': speechOutput,
            'repromptText': repromptText,
            'selectedRemedy': randRemedy,
            'solutionNum': 0,
            'quit': false,
            'idx': 0
        });

        // Set the current state to recipe mode. The skill will now use handlers defined in recipeStateHandlers
        this.handler.state = APP_STATES.RECIPE;
        this.emit(':askWithCard', speechOutput, repromptText, APP_NAME, repromptText);

    }
});

var recipeStateHandlers = Alexa.CreateStateHandler(APP_STATES.RECIPE, {
    'browseList': function(){ 
        var cardTitle = APP_NAME + " - List of available remedies";
        var cardContent = "";
        var speechOutput = 'Here is a list of issues you could ask a remedy for. ';
        var repromptText ;
        for (var i=0, j=remedies.length, temp=-1;i<remedies.length;i++){
          // do{var index = Math.floor(Math.random() * j);}while (index===temp);
          // var temp = index;
          var index = i;
          cardContent += " - " + Object.keys(remedies[index])[0] + "\n";
          if (i+1===remedies.length) speechOutput = speechOutput.slice(0,-2) + ", and, " + Object.keys(remedies[index])[0] + ". ";
          else speechOutput = speechOutput + Object.keys(remedies[index])[0] + ", ";
        }// TODO pull different list with random elements every time
        speechOutput += "Now, what you want me to help you with?";
        repromptText = "Now, what you want me to help you with?";

        Object.assign(this.attributes, {
        "speechOutput": "Access the list of available remedies by saying, list, or ask for a remedy.",
        "repromptText": "Access the list, ask for a remedy, or quit by saying, stop."
        });

        this.emit(':askWithCard', speechOutput, repromptText, cardTitle, cardContent.toUpperCase());
    },
    'RecipeReqIntent': function () { 
        this.attributes['solutionNum']=0;
        handleUserRequest.call(this, 0,false);
    },
    'AMAZON.NextIntent': function () {
        handleUserRequest.call(this, this.attributes['solutionNum'],true);
    },
    'ListReqIntent':function () {
        this.attributes['solutionNum']=0;
        this.emitWithState('browseList');
    },
    'AMAZON.StartOverIntent': function () { 
        this.handler.state = APP_STATES.START;
        this.emitWithState('StartApp');
    },
    'AMAZON.RepeatIntent': function () { 
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptText']);
    },
    'AMAZON.HelpIntent': function () { 
        this.handler.state = APP_STATES.HELP;
        this.emitWithState('helpTheUser');
    },
    'AMAZON.StopIntent': function () { 
        this.handler.state = APP_STATES.HELP;
        this.attributes['quit']=true;
        this.emit(':ask', 'Would you like to quit?', 'Do you want to quit?');
    },
    'AMAZON.CancelIntent': function () { 
        this.emit(':tell', 'Ok, see you soon, and take care. Goodbye.');
    },
    'Unhandled': function () {
        var speechOutput = 'I did not get what you said. Do you mind to repeat, please? ';
        var repromptText = 'You could ask me a remedy for '+ this.attributes['selectedRemedy'] + ' for example. '
        this.emit(':ask', speechOutput, this.attributes['repromptText']);
    },
    'SessionEndedRequest': function () {
        console.log('Session ended in recipe state: ' + this.event.request.reason);
    }
});

var helpStateHandlers = Alexa.CreateStateHandler(APP_STATES.HELP, {
    'helpTheUser': function () {
        var speechOutput = APP_NAME + " is your collection of natural home remedies. " 
            + "Access the list of available remedies by saying, list, or " //
            + "ask for a different remedy at any time. " //handled
            + "After having listened to a recipe, to listen to it again say repeat, to listen to an alternative say next. " //
            + "Now, what would you like to do? ";
        var repromptText = "Browse the list of remedies by saying, list, or start over by saying, restart. "
            + "What would you like to do? ";

        Object.assign(this.attributes, {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "quit": false
        });

        this.emit(':ask', speechOutput, repromptText);
    },
    'RecipeReqIntent': function () { 
        this.attributes['solutionNum']=0;
        handleUserRequest.call(this, 0);
    },
    'ListReqIntent':function (){
        this.handler.state = APP_STATES.RECIPE;
        this.emitWithState('browseList');
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptText);
    },
    'AMAZON.HelpIntent': function() {
        this.emitWithState('helpTheUser');
    },
    'AMAZON.YesIntent': function() {
        if (this.attributes['quit']){
            var speechOutput = 'Ok, see you soon, and take care. Goodbye! ';
            this.emit(':tell', speechOutput);
        } else {
            this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptText);
        }
    },
    'AMAZON.NoIntent': function() {
        //this.handler.state = APP_STATES.RECIPE;
        this.emitWithState('Unhandled');
    },
    'AMAZON.StopIntent': function () {
        this.attributes['quit']=true;
        this.emit(':ask', 'Would you like to quit?')
    },
    'AMAZON.CancelIntent': function () { 
        this.emit(':tell', 'Ok, see you soon, and take care. Goodbye.');
    },
    'Unhandled': function () {
        var repromptText = "Browse the list of remedies by saying, list, or start over by saying, restart. "
            + "What would you like to do? ";
        this.attributes['quit']=false;
        this.emit(':ask', repromptText, repromptText);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = APP_STATES.START;
        this.emitWithState('StartApp');
    },
    'SessionEndedRequest': function () {
        console.log('Session ended in help state: ' + this.event.request.reason);
    }
});

var reqRemedy;
var idx;

function handleUserRequest(userSession,nextIntent) {
    var isRequestValid = false;
    if (!nextIntent) isRequestValid = isIntentSlotValid(this.event.request.intent);
    var speechOutput = '';
    var repromptText = '';
    var cardTitle;
    var cardContent = '';
    var cardImage;
    var s = userSession;//the index of the remedy solution
    var oneAndOnly;

    var i = this.attributes['idx'];

    if (isRequestValid||s>0) {
        if (isRequestValid) { this.attributes['idx'] = idx; i = idx;}
        if (s===0){
            this.attributes['selectedRemedy'] = reqRemedy;
            speechOutput =  DISCLAIMER + ' Here is a remedy for ' + reqRemedy + '. ';
        }

        else speechOutput = 'Another remedy for ' + this.attributes['selectedRemedy'] + ', is this. ';

        var term = (Object.keys(remedies[i])[0]);

        oneAndOnly = remedies[i][term].length === 1 ? true : false;
        if (s===remedies[i][term].length) {s=0;this.attributes['solutionNum']=0;}
        speechOutput+=remedies[i][term][s];
        cardContent = cardContent + remedies[i][term][s] + "\n" + remedies[i].desc[s];
        cardImage = {
            'smallImageUrl' : remedies[i].imgs[s][0],
            'largeImageUrl' : remedies[i].imgs[s][0]
        }


        this.attributes['solutionNum']++;
        repromptText+='To listen to it again, say, repeat, if you want ';
        repromptText+='another solution for '+ reqRemedy +' say, next. ';
        if (oneAndOnly){speechOutput+='This was the only remedy available for '+ reqRemedy + '. '
                        speechOutput+='Say repeat to listen to it again, or ask me for another remedy. ';
                        Object.assign(this.attributes, {
                            'solutionNum' : 0
                        });
        }
        else speechOutput+=repromptText;
        cardTitle= APP_NAME + ' - ' + reqRemedy;

    } else {
        speechOutput = "Sorry. This is not a valid request. Ask for the list of available remedies ";
        speechOutput+= "by saying, list. Ask for help by saying, help."
        repromptText = "Ask for help by saying, help."
    }

    Object.assign(this.attributes, {
        "speechOutput": speechOutput,
        "repromptText": repromptText
    });

    this.emit(':askWithCard', speechOutput, repromptText, cardTitle, cardContent, cardImage);
}


function isIntentSlotValid(intent) {
    var reqSlotFilled = false;
    if (intent.slots.Issue && intent.slots.Issue.value){

        reqRemedy = intent.slots.Issue.value;

        for (var i=0; i<remedies.length; i++){
            var term = (Object.keys(remedies[i])[0]);
            if(reqRemedy===term) {
                idx = i;
                reqSlotFilled = true;
                break;
            } 
        }
    }
    
    return reqSlotFilled;
}