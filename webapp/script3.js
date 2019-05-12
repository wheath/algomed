
$(function() {
  console.log("_dbg beginning jquery")
  window.atoken = "b967f37046bd85dae75ff1d50715f14f8928e8adcc3f3cc7869edeae9f98e578";
  window.aserver = "http://buidlboston.algorand.network";
  window.aport = 4181;
  
  
  
  window.kmdtoken = "b967f37046bd85dae75ff1d50715f14f8928e8adcc3f3cc7869edeae9f98e578";
  window.kmdserver = "http://buidlboston.algorand.network";
  window.kmdport = 4182;
  
  
  function createWalletName() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
  
  $('#block').click(function () { 
    console.log("_dbg Get Latest Block clicked"); 
    $('#ta').html("");
    
            const algodclient = new algosdk.Algod(window.atoken, window.aserver, window.aport);

            (async() => {
                let lastround = (await algodclient.status()).lastRound;
                let block = (await algodclient.block(lastround));
                $('#fround').val(lastround);
                $('#lround').val(lastround + 1000);
                var textedJson = JSON.stringify(block, undefined, 4);
                console.log(textedJson);
                $('#ta').html(textedJson);

                console.log(block);
            })().catch(e => {
                console.log(e);
            });
  });
  
  $('#adetails').click(function () { 
    console.log("_dbg Account Details clicked"); 
    $('#ta').html("");
    
    const algodclient = new algosdk.Algod(window.atoken, window.aserver, window.aport);
  

    (async() => {
      let tx = (await algodclient.accountInformation(account));
      var textedJson = JSON.stringify(tx, undefined, 4);
      console.log(textedJson);
      $('#ta').html(textedJson);
      })().catch(e => {
        console.log(e);
      });
            
  });
  
  $('#account').click(function () { 
    console.log("_dbg Generate Account clicked"); 
    $('#ta').html("");
  
    var acct = algosdk.generateAccount();
    window.account = acct.addr;
    console.log(window.account);
    $('#from').val(window.account);
    var mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
    $('#backup').val(mnemonic);
    console.log(mnemonic);
    var recovered_account = algosdk.mnemonicToSecretKey(mnemonic);
    console.log(recovered_account.addr);
    var isValid = algosdk.isValidAddress(recovered_account.addr);
    console.log("Is this a valid address: " + isValid);
    $('#ta').html("Account created. Save Mnemonic")
    window.signKey = acct.sk;

        
  });
  
 $('#transaction').click(function () { 
    console.log("_dbg submit transaction clicked"); 
    $('#ta').html(""); 
  var person = { firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" };
            var note = algosdk.encodeObj(person);

            //var note = algosdk.encodeObj("This is a string converted to a Uint8Array");
            //"note": new Uint8Array(0)
            // "note": note

            txn = {
                "from": window.account,
                "to": $('#to').val(),
                "fee": 1000,
                "amount": parseInt($('#algos').val()),
                "firstRound": parseInt($('#fround').val()),
                "lastRound": parseInt($('#lround').val()),
                "note": algosdk.encodeObj(person),
            };

            var signedTxn = algosdk.signTransaction(txn, window.signKey);
            console.log(signedTxn.txID);
            let algodclient = new algosdk.Algod(window.atoken, window.aserver, window.aport);
            (async() => {
                let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
                var textedJson = JSON.stringify(tx, undefined, 4);
                console.log(textedJson);
                $('#ta').html(textedJson);
                console.log(tx);
                console.log(tx.txId);
                $('#txid').val(tx.txId);
            })().catch(e => {
                $('#ta').html(e.text);
                console.log(e);
            });
  
 });
 
 $('#multisig').click(function () { 
    console.log("_dbg submit multisig transaction clicked"); 
    $('#ta').html(""); 
    
    window.walletID = "0eca8dc0e025be94adb2e0b8e7657bc2";
    const kmdclient = new algosdk.Kmd(window.kmdtoken, window.kmdserver, window.kmdport);
    //const algodclient = new algosdk.Algod(atoken, aserver, aport);
    
    
    (async() => {
                let r = (await kmdclient.initWalletHandle(window.walletID, ""));
                window.walletHandleToken = r.WalletHandleToken;
                let r2 = (await kmdclient.importKey(window.signKey));
                var textedJson = JSON.stringify(r, undefined, 4);
                console.log(textedJson);
                $('#ta').html(textedJson);
                
            })().catch(e => {
                $('#ta').html(e.text);
                console.log(e);
            });

    
  var person = { firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" };
            var note = algosdk.encodeObj(person);

            //var note = algosdk.encodeObj("This is a string converted to a Uint8Array");
            //"note": new Uint8Array(0)
            // "note": note
 
            txn = {
                "from": window.account,
                "to": $('#to').val(),
                "fee": 1000,
                "amount": parseInt($('#algos').val()),
                "firstRound": parseInt($('#fround').val()),
                "lastRound": parseInt($('#lround').val()),
                "note": algosdk.encodeObj(person),
            };
           
            (async() => {
              window.signedTxn = (await kmdclient.signMultisigTransaction(window.walletHandleToken, "", txn, window.account));
            })().catch(e => {
                $('#ta').html(e.text);
                console.log(e);
            });
            
            // var signedTxn = algosdk.signTransaction(txn, window.signKey);
            console.log("_dbg about log signedTxn.txID");
            console.log(window.signedTxn.txID);
            let algodclient = new algosdk.Algod(window.atoken, window.aserver, window.aport);
            (async() => {
                let tx = (await algodclient.sendRawTransaction(window.signedTxn.blob));
                var textedJson = JSON.stringify(tx, undefined, 4);
                console.log(textedJson);
                $('#ta').html(textedJson);
                console.log(tx);
                console.log(tx.txId);
                $('#txid').val(tx.txId);
            })().catch(e => {
                $('#ta').html(e.text);
                console.log(e);
            });
  
 });
 
  
  $('#trans').click(function () { 
    console.log("_dbg Get transaction note clicked"); 
    $('#ta').html("");
    
    let algodclient = new algosdk.Algod(window.atoken, window.aserver, window.aport);
    
       (async() => {
                //alert( txid.value );
                let tx = (await algodclient.transactionInformation(window.account,$('#txid').val() ));
                //alert(tx.noteb64);
                //alert( "got tx");
                var textedJson = JSON.stringify(tx, undefined, 4);
                console.log(textedJson);
                //alert("Note " + tx.noteb64);
                var encodednote = algosdk.decodeObj(tx.note);
                //alert(encodednote);
                $('#ta').html(JSON.stringify(encodednote, undefined, 4));

            })().catch(e => {
              $('#ta').html(e.text);
               
                if (e.text === undefined) {
                    // ta.innerHTML = "Tx not processed yet or is to old and not stored on your node";
                }
                console.log(e);
            });
            
  });
  
  
  $('#recover').click(function () { 
    console.log("_dbg Generate Account clicked"); 
    $('#ta').html("");
  
  
    var bu = $('#backup').val();
    var recovered_account = algosdk.mnemonicToSecretKey(bu);
    console.log(recovered_account.addr);
    $('#from').val(recovered_account.addr);
    var isValid = algosdk.isValidAddress(recovered_account.addr);
    console.log("Is this a valid address: " + isValid);
    $('#ta').html("Account created. Set value in the From Input box");
    window.account = recovered_account.addr;
    window.signKey = recovered_account.sk;
    let algodclient =  new algosdk.Algod(window.atoken, window.aserver, window.aport);
    (async() => {
       let tx = (await algodclient.accountInformation(recovered_account.addr));
       var textedJson = JSON.stringify(tx, undefined, 4);
       console.log(textedJson);
       $('#ta').html(textedJson);
    })().catch(e => {
       $('#ta').html(e.text);
       console.log(e);
    });
  
});


$('#createwallet').click(function () { 
    console.log("_dbg create wallet clicked"); 
    $('#ta').html("");
  
    const kmdclient = new algosdk.Kmd(window.kmdtoken, window.kmdserver, window.kmdport);
  
      
    (async() => {
       let r = (await kmdclient.createWallet("testAlgoMed2", ""));
       var textedJson = JSON.stringify(r, undefined, 4);
       window.walletID = r.walletID;
       console.log(textedJson);
       $('#ta').html(textedJson);
    })().catch(e => {
       $('#ta').html(e.text);
       console.log(e);
    });
  
});

});