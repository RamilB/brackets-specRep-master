/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/* jPARK - SpecRep v 0.1 */
/* A Special Character Replacement Extension */
/* Written by James Park 2013 */
/* Extension that searches through and replaces any special characters with relevant code equivalent. */
/* Mainly useful for email templates if created via Brackets */

/** Extension that searches through and replaces any special characters with relevant code equivalent. */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
		EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");



		
    // Function to run when the menu item is clicked
    function replaceSpecials() {

        var mainWindow = EditorManager.getActiveEditor(),
            activeText = mainWindow.document;

        if (activeText) {

            var htmlContent = activeText.getText();

            var replaceIn=[
				[/¡/g,	"&iexcl;"]
				,[/¢/g,	"&cent;"]
				,[/£/g,	"&pound;"]
				,[/¤/g,	"&curren;"]
				,[/¥/g,	"&yen;"]
				,[/¦/g,	"&brvbar;"]
				,[/§/g,	"&sect;"]
				,[/¨/g,	"&uml;"]
				,[/©/g,	"&copy;"]
				,[/ª/g,	"&ordf;"]
				,[/«/g,	"&laquo;"]
				,[/¬/g,	"&not;"]
				,[/®/g,	"&reg;"]
				,[/¯/g,	"&macr;"]
				,[/°/g,	"&deg;"]
				,[/±/g,	"&plusmn;"]
				,[/²/g,	"&sup2;"]
				,[/³/g,	"&sup3;"]
				,[/µ/g,	"&micro;"]
				,[/¸/g,	"&cedil;"]
				,[/¹/g,	"&sup1;"]
				,[/º/g,	"&ordm;"]
				,[/¼/g,	"&frac14;"]
				,[/½/g,	"&frac12;"]
				,[/¾/g,	"&frac34;"]
				,[/¿/g,	"&iquest;"]
				,[/À/g,	"&Agrave;"]
				,[/Á/g,	"&Aacute;"]
				,[/Â/g,	"&Acirc;"]
				,[/Ã/g,	"&Atilde;"]
				,[/Ä/g,	"&Auml;"]
				,[/Å/g,	"&Aring;"]
				,[/Æ/g,	"&AElig;"]
				,[/Ç/g,	"&Ccedil;"]
				,[/È/g,	"&Egrave;"]
				,[/É/g,	"&Eacute;"]
				,[/Ê/g,	"&Ecirc;"]
				,[/Ë/g,	"&Euml;"]
				,[/Ì/g,	"&Igrave;"]
				,[/Í/g,	"&Iacute;"]
				,[/Î/g,	"&Icirc;"]
				,[/Ï/g,	"&Iuml;"]
				,[/Ð/g,	"&ETH;"]
				,[/Ñ/g,	"&Ntilde;"]
				,[/Ò/g,	"&Ograve;"]
				,[/Ó/g,	"&Oacute;"]
				,[/Ô/g,	"&Ocirc;"]
				,[/Õ/g,	"&Otilde;"]
				,[/Ö/g,	"&Ouml;"]
				,[/×/g,	"&times;"]
				,[/Ø/g,	"&Oslash;"]
				,[/Ù/g,	"&Ugrave;"]
				,[/Ú/g,	"&Uacute;"]
				,[/Û/g,	"&Ucirc;"]
				,[/Ü/g,	"&Uuml;"]
				,[/Ý/g,	"&Yacute;"]
				,[/Þ/g,	"&THORN;"]
				,[/ß/g,	"&szlig;"]
				,[/à/g,	"&agrave;"]
				,[/á/g,	"&aacute;"]
				,[/â/g,	"&acirc;"]
				,[/ã/g,	"&atilde;"]
				,[/ä/g,	"&auml;"]
				,[/å/g,	"&aring;"]
				,[/æ/g,	"&aelig;"]
				,[/ç/g,	"&ccedil;"]
				,[/è/g,	"&egrave;"]
				,[/é/g,	"&eacute;"]
				,[/ê/g,	"&ecirc;"]
				,[/ë/g,	"&euml;"]
				,[/ì/g,	"&igrave;"]
				,[/í/g,	"&iacute;"]
				,[/î/g,	"&icirc;"]
				,[/ï/g,	"&iuml;"]
				,[/ð/g,	"&eth;"]
				,[/ñ/g,	"&ntilde;"]
				,[/ò/g,	"&ograve;"]
				,[/ó/g,	"&oacute;"]
				,[/ô/g,	"&ocirc;"]
				,[/õ/g,	"&otilde;"]
				,[/ö/g,	"&ouml;"]
				,[/÷/g,	"&divide;"]
				,[/ø/g,	"&oslash;"]
				,[/ù/g,	"&ugrave;"]
				,[/ú/g,	"&uacute;"]
				,[/û/g,	"&ucirc;"]
				,[/ü/g,	"&uuml;"]
				,[/ý/g,	"&yacute;"]
				,[/þ/g,	"&thorn;"]
				,[/ÿ/g,	"&yuml;"]
				,[/Œ/g,	"&OElig;"]
				,[/œ/g,	"&oelig;"]
				,[/Š/g,	"&Scaron;"]
				,[/š/g,	"&scaron;"]
				,[/Ÿ/g,	"&Yuml;"]
				,[/ƒ/g,	"&fnof;"]
				,[/ˆ/g,	"&circ;"]
				,[/—/g,	"&mdash;"]
				,[/†/g,	"&dagger;"]
				,[/‡/g,	"&Dagger;"]
				,[/•/g,	"&bull;"]
				,[/…/g,	"&hellip;"]
				,[/‰/g,	"&permil;"]
				,[/‾/g,	"&oline;"]
				,[/€/g,	"&euro;"]
				,[/™/g,	"&trade;"]
				,[/←/g,	"&larr;"]
				,[/↑/g,	"&uarr;"]
				,[/→/g,	"&rarr;"]
				,[/↓/g,	"&darr;"]
				,[/↔/g,	"&harr;"]
				,[/∂/g,	"&part;"]
				,[/∏/g,	"&prod;"]
				,[/∑/g,	"&sum;"]
				,[/√/g,	"&radic;"]
				,[/∞/g,	"&infin;"]
				,[/∩/g,	"&cap;"]
				,[/∫/g,	"&int;"]
				,[/≈/g,	"&asymp;"]
				,[/≠/g,	"&ne;"]
				,[/≡/g,	"&equiv;"]
				,[/≤/g,	"&le;"]
				,[/≥/g,	"&ge;"]
				]
			// store current cursor and scroll positions
            var cursorPos = mainWindow.getCursorPos(),
                scrollPos = mainWindow.getScrollPos();

			
			for (var i=0;i<replaceIn.length;i++)
			{
				htmlContent = htmlContent.replace(replaceIn[i][0],replaceIn[i][1]);
			}
	
				
			activeText.setText(htmlContent);

            // restore cursor and scroll positions
            mainWindow.setCursorPos(cursorPos);
            mainWindow.setScrollPos(scrollPos.x, scrollPos.y);

            return true;
        }

        return false;
	}
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "replace.specials";   // package-style naming to avoid collisions
    CommandManager.register("Replace Specials", MY_COMMAND_ID, replaceSpecials);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    //menu.addMenuItem(MY_COMMAND_ID);
    
    // We could also add a key binding at the same time:
    menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Shift-0");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)

    exports.replaceSpecials = replaceSpecials;
});
