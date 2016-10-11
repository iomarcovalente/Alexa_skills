var expect = require('chai').expect;
var bst = require('bespoken-tools');

var listOfIssues = require('../speechAssets/customSlotTypes/slotVariables.js');

var server = null;
var alexa = null;

beforeEach(function (done) {
  server = new bst.LambdaServer('./index.js', 10000, false);
  alexa = new bst.BSTAlexa('http://localhost:10000',
                           './speechAssets/IntentSchema.json',
                           './speechAssets/SampleUtterances.txt');
  //console.log(alexa);
  server.start(function() {
    alexa.start(function (error) {
      //console.log('Error: ' + error);
      done();
    });
  });
});

afterEach(function(done) {
    alexa.stop(function () {
        server.stop(function () {
            done();
        });
    });
});

describe('| User Interaction Flow Testing |', () => {

  // it('Should show the list and record the intents on the database', function (done) {
  //
  //   alexa.spoken('show me the list', function(error, payload) {
  //     console.log(' + + + PAYLOAD : + + + ' +  JSON.stringify(payload));
  //     expect(payload.response.outputSpeech.type).to.equal('SSML');
  //
  //     alexa.intended('AMAZON.StopIntent', null, function (error, payload) {
  //       expect(payload.response.outputSpeech.ssml).to.have.string("Would you like to quit?");
  //
  //       alexa.intended('AMAZON.YesIntent', null, function (error, payload) {
  //         expect(payload.response.outputSpeech.ssml).to.have.string("Ok, see you");
  //         done();
  //       });
  //     });
  //   });
  // });

  it('Should request N remedies and record the voice events on the database', function (done) {
    var i = 0;
    var callNext = () => {
      var r = Math.floor(Math.random()*listOfIssues.length);

      var issue = listOfIssues[r];
      alexa.intended('RecipeReqIntent',{"Issue":issue}, function(error, payload) {
        console.log('\n' + i + '\n');
        //console.log(' + + + PAYLOAD : + + + ' +  JSON.stringify(payload));
        expect(payload.response.outputSpeech.type).to.equal('SSML');
        i++;
        if (i<3) {
          callNext();
        } else {
          alexa.intended('AMAZON.CancelIntent', null, function (error, payload) {
            expect(payload.response.outputSpeech.ssml).to.have.string("Ok, see you");
            done();
          });
        }
      });
    }
    callNext();
  });

  // it('Should show the list and record the intents on the database', function (done) {

  //   var i = 0;
  //   var callNext = () => {
  //     alexa.intended('AMAZON.NextIntent', null, function (error, payload) {
  //         // Ensures the track with next token is returned
  //         if(i+1===headlines[i].headline) expect(payload.response.outputSpeech.text).to.have.string("That's all of today's Channel 4 headlines.");
  //           else expect(payload.response.outputSpeech.ssml).to.have.string(headlines[i].headline);
  //         i++;
  //
  //         if (i < headlines[i].headline) {
  //           callNext();
  //         } else {
  //           done();
  //         }
  //
  //     });
  //   };
  //
  //   callNext();
  //
  // });
});
