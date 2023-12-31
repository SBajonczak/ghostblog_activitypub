exports.Inbox = async function (req, res, next) {
    const user = req.params.user;
    console.log("Got Inbox request for " + user);

    const inboxData = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        summary: 'Inbox for ' + user,
        type: 'OrderedCollection',
        totalItems: 0,
        orderedItems: [],
    };

    res.json(inboxData);
}