import urllib2
import simplejson
import datetime

req = urllib2.Request("https://api-dev.bugzilla.mozilla.org/latest/bug?cf_blocking_fennec10=beta%2B&resolution=",
                      None,
                      {'user-agent':'dougt/rocks', 'Content-Type': 'application/json'})
opener = urllib2.build_opener()
f = opener.open(req)
result = simplejson.load(f)

betabugcount = len(result['bugs'])


req = urllib2.Request("https://api-dev.bugzilla.mozilla.org/latest/bug?cf_blocking_fennec10=%2B&resolution=",
                      None,
                      {'user-agent':'dougt/rocks', 'Content-Type': 'application/json'})
opener = urllib2.build_opener()
f = opener.open(req)
result = simplejson.load(f)

finalbugcount = len(result['bugs'])

print str(datetime.datetime.now().strftime("%m/%d/%y %I:%M:%S")) +', ' + str(betabugcount) +', ' + str(finalbugcount)

