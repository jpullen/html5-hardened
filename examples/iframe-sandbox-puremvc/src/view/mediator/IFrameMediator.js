/**
 * @class demo.view.IFrameMediator
 * @extends puremvc.Mediator
 */
puremvc.define
(
	// CLASS INFO
	{
		name: 'demo.view.mediator.IFrameMediator',
		parent: puremvc.Mediator
	},

	// INSTANCE MEMBERS
	{
		/** @override */
		listNotificationInterests: function ()
		{
			return [
					demo.AppConstants.SEND
					]
		},
		
		/** @override */
		handleNotification: function (note)
		{
			switch ( note.getName() )
			{
				case demo.AppConstants.SEND:
                     console.log('recived from iframe \n' + note.getBody());
                     var frame = document.getElementById("iframe");
                     frame.contentWindow.postMessage(note.getBody(), "*"); 
                    break;
			}
		},
	
		/** @override */
		onRegister: function ()
		{
                  console.log('Registed iframe proxy succesfully');
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        var that = this; 
        eventer(messageEvent,function(e) {
         console.log('recived msg:\n',e.data);
			that.sendNotification( demo.AppConstants.PROCESS_TEXT, e.data );
            },false);
		},					
		
		/** @override */
		onRemove: function ()
		{
                     frame.contentWindow.postMessage("PARENT_REMOVED", "*"); 
		},
		
	},
	
	// STATIC MEMBERS
	{
		/**
		 * @static
		 * @type {string}
		 */
		NAME: 'IFrameMediator'
	}
);