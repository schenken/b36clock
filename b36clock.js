
window['KZ'] = window['KZ'] || {};

KZ.B36Clock = (function() {

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