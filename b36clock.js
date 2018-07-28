
window['KZ'] = window['KZ'] || {};

KZ.B36Clock = (function() {

    /*
    Singleton App - Base36 Clock

    I wanted something that would give me a short, unique reference code
    that I could use as a filename suffix. Rather than using a longish
    traditional timestamp of the format YYMMDDHHMM (to the nearest minute),
    I wanted something shorter, so decided to use a Base36 encoding, using
    a table that comprises 0 - 9 and A - Z (uppercase).

    It uses an arbitrary epoch that starts on Jan 1, 2015. It converts the
    current date/time to a 5-character Base36 value, eg.

        2018-07-28 16:54 ---> 149MI

    Thus, I can use this value when exporting files to make them unique in
    a given series, eg. AKBASS_149MI.wav. As long as I don't particularly 
    need to be creating files at a rate of more than one a minute I should
    be fine.

    This five-character field, starting from Jan 1, 2015, is good enough
    for the next century at least!

    (c) 2018 Andrew Kendall
    */

    var epochStartDate; 
    var epochStartMs;
    var b36CharSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var b36dt = "";

    // Public
	var _Init = function() {
        epochStartDate = new Date("2015-01-01"); 
        epochStartMs = epochStartDate.valueOf();
        GetTime();
    };

    var _CvtTimeToB36 = function (n)
    {
        var base = 36; 
        var a = [];
    
        var i = 0;
    
        var x = n;
        while (x > 0)
        {
            var xx = x;
            var x = parseInt (xx / base);
            var y = parseInt (xx % base);
            a[i] = y;
            ++i;    
        }
    
        var s = "";
        for (var u = 4; u >= 0; --u)
        {
            s += b36CharSet.substr (a[u], 1);
        }

        if (s != b36dt)
        {
            b36dt = s;
            document.getElementById("B36Clock_dt").innerHTML = s;
        }
    
        return s;
    }

    // Private
    var GetTime = function() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();

        m = PadTime (m);
        s = PadTime (s);
        document.getElementById ("B36Clock_clock").innerHTML = h + ":" + m + ":" + s;

        // Calc number of minutes since start of epoch.
        var n = today.getTime();    // No. milliseconds since 1/1/70
        n -= epochStartMs;
        n = parseInt (n / 1000);    // Reduce to seconds.
        n = parseInt (n / 60);      // Reduce to minutes.
    
        _CvtTimeToB36 (n);
        setTimeout (function() { GetTime () }, 1000);
    }

    var PadTime = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    
	// Expose public functions/members.
	return {
        Init			:	_Init,
        CvtTimeToB36    :   _CvtTimeToB36
	}
})();

window.onload (KZ.B36Clock.Init());