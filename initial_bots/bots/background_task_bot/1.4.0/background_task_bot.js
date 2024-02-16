(function(){var BG_TASKS={MSG_USAGE_UPDATE:'MessageUsageUpdate'};var CAPABILITIES={MSG_USG_UPDATE_CAP:'MessageQuotaCapability'};var DELTA_PUSH_CONTENT_TYPE={ADD_CONTACT:'10001',DELETE_CONTACT:'10002',IGNORE_CONTACT:'10003',UPDATE_LOCAL_CONTACTS:'10004'};var greeting=function greeting(state,previousMessages,botContext){var conversationContext=botContext.getCapability('ConversationContext');var authContext=botContext.getCapability('authContext');authContext.getAuthUser(botContext).then(function(user){return conversationContext.getConversationContext(botContext,user);}).then(function(conversation){var BackgroundTaskQueue=botContext.getCapability('BackgroundTaskQueue');var bgTaskOptions={key:BG_TASKS.MSG_USAGE_UPDATE,botId:botContext.botManifest.botId,timeInterval:15*60000,conversationId:conversation.conversationId};BackgroundTaskQueue.enqueue(bgTaskOptions);}).catch(function(err){console.log('error occurred scheduling job: ',err);});};var updateMessageUsage=function updateMessageUsage(botContext){var MessageQuota=botContext.getCapability('MessageQuota');var messageCount=MessageQuota.getUsedMessageQuota();var _=botContext.getCapability('Utils').Lodash;if(_.isEmpty(messageCount)){return;}var authContext=botContext.getCapability('authContext');return authContext.getAuthUser(botContext).then(function(user){var agentGuardService=botContext.getCapability('agentGuardService');botContext.wait(true);var params={action:'updateUsedGetAvailQuota',stats:messageCount};return agentGuardService.executeCustomCapability(CAPABILITIES.MSG_USG_UPDATE_CAP,params,true,undefined,botContext,user);}).then(function(response){MessageQuota.setQuota(response[0],messageCount);});};var next=function next(message,state,previousMessages,botContext){var _=botContext.getCapability('Utils').Lodash;var MessageTypeConstants=botContext.getCapability('MessageTypeConstants');var msgType=message.getMessageType();switch(msgType){case MessageTypeConstants.MESSAGE_TYPE_BACKGROUND_EVENT:var bgTaskKey=_.get(message.getMessageOptions(),'key');if(bgTaskKey===BG_TASKS.MSG_USAGE_UPDATE){updateMessageUsage(botContext);}break;case MessageTypeConstants.MESSAGE_TYPE_UPDATE_CALL_QUOTA:var CallQuota=botContext.getCapability('UpdateCallQuota');var authContext=botContext.getCapability('authContext');authContext.getAuthUser(botContext).then(function(user){var agentGuardService=botContext.getCapability('agentGuardService');botContext.wait(true);var params={action:'getSpecificQuota',botId:'pstn-balance'};return agentGuardService.executeCustomCapability('MessageQuotaCapability',params,true,undefined,botContext,user);}).then(function(data){var _=botContext.getCapability('Utils').Lodash;var pstndata=_.get(data,'[0].pstn-balance');var available=pstndata.available||0;available=Math.ceil(available*1000)/1000;CallQuota({error:null,callQuota:available});}).catch(function(err){CallQuota({error:err,callQuota:null});});break;default:console.log('Unknown message type '+msgType);break;}};var debug=function debug(){};var farewell=function farewell(msg,state,previousMessages,botContext){};var asyncResult=function asyncResult(result,state,previousMessages,botContext){var Contact=botContext.getCapability('Contact');var utils=botContext.getCapability('Utils');var _=utils.Lodash;var content=_.get(result,'details[0].message');var contentType=_.toString(_.get(result,'contentType'));console.log('back ground task bot content:',content);var promise=Promise.resolve();switch(contentType){case DELTA_PUSH_CONTENT_TYPE.ADD_CONTACT:var contactToAdd=content;console.log('Contact added:',contactToAdd);if(contactToAdd.isLocalContact){delete contactToAdd.isLocalContact;promise=Contact.addLocalContacts(contactToAdd);}else if(contactToAdd.waitingForConfirmation){promise=Contact.addContacts(contactToAdd);}else{promise=Contact.addAcceptedContacts(contactToAdd);}break;case DELTA_PUSH_CONTENT_TYPE.UPDATE_LOCAL_CONTACTS:var localContactForUpdate=content;console.log('Contact updated:',localContactForUpdate);delete localContactForUpdate.isLocalContact;promise=Contact.updateLocalContacts(localContactForUpdate);break;case DELTA_PUSH_CONTENT_TYPE.DELETE_CONTACT:var contactToDelete=content;console.log('Contact deleted:',contactToDelete);promise=Contact.deleteContacts(contactToDelete);break;case DELTA_PUSH_CONTENT_TYPE.IGNORE_CONTACT:var contactToIgnore=content;console.log('Contact ignored:',contactToIgnore);promise=Contact.ignoreContact(contactToIgnore);break;}return promise.then(function(){console.log('background task bot completed action');});};return{done:farewell,init:greeting,next:next,debug:debug,asyncResult:asyncResult,version:'1.0.0'};})();