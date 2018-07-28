# b36clock
My Base36 Timestamp Clock

Visit: http://akplus.net/b36clock

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
